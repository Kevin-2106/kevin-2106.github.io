import { test, expect } from '@playwright/test';
import { parseLyrics } from '../src/vendor/lyrscape/parsers';

const lyricUrl = 'https://web.hycdn.cn/siren/lyric/20250430/cfd84e70b19dc9a47fdf3d4c00341a63.lrc';
let lyrics: ReturnType<typeof parseLyrics>;
test.beforeAll(async ({ request }) => {
  const response = await request.get(lyricUrl);
  expect(response.ok()).toBe(true);
  lyrics = parseLyrics(await response.text(), 'Heavenly Me.lrc');
});
function expectedLine(at: number) { return lyrics.lines.findLastIndex(line => (line.startMs ?? Infinity) <= at && (line.endMs === undefined || at < line.endMs)); }
function silentWav(seconds = 45) {
  const samples = seconds * 8000;
  const data = Buffer.alloc(44 + samples * 2);
  data.write('RIFF'); data.writeUInt32LE(data.length - 8, 4); data.write('WAVEfmt ', 8);
  data.writeUInt32LE(16, 16); data.writeUInt16LE(1, 20); data.writeUInt16LE(1, 22);
  data.writeUInt32LE(8000, 24); data.writeUInt32LE(16000, 28); data.writeUInt16LE(2, 32); data.writeUInt16LE(16, 34);
  data.write('data', 36); data.writeUInt32LE(samples * 2, 40);
  return data;
}
test('official LRC uses production Halo3 canvas and accurate line selection', async ({ page }) => {
  await page.goto('/#projects');
  const demo = page.locator('.lyrscape-demo');
  await expect(demo).toHaveAttribute('data-ready', 'true');
  await expect(demo).toHaveAttribute('data-lyric-lines', String(lyrics.lines.length));
  await expect(demo).toHaveAttribute('data-lyric-mode', 'line');
  await demo.scrollIntoViewIfNeeded();
  await demo.locator('.demo-position').evaluate((input: HTMLInputElement) => { input.value = '60000'; input.dispatchEvent(new Event('input', { bubbles: true })); });
  await expect(demo.locator('.demo-stage')).toHaveAttribute('data-active-line', String(expectedLine(60000)));
  await expect(demo.locator('.demo-stage')).toHaveAttribute('data-pv-style', 'halo3');
  await expect(demo.locator('.pv-canvas')).toBeVisible();
  await expect(demo.locator('.demo-stage')).toHaveCSS('background-color', 'rgb(29, 35, 30)');
  await demo.getByLabel('歌词构图', { exact: true }).selectOption('hero');
  await expect(demo.locator('.demo-stage')).toHaveAttribute('data-pv-mode', 'hero');
  await demo.getByLabel('歌词构图', { exact: true }).selectOption('caption');
  await expect(demo.locator('.demo-stage')).toHaveAttribute('data-pv-mode', 'caption');
});
test('silent preview advances, pauses and remains distinct from audio', async ({ page }) => {
  await page.goto('/#projects');
  const demo = page.locator('.lyrscape-demo');
  await expect(demo).toHaveAttribute('data-ready', 'true');
  await demo.getByRole('button', { name: '无声预览', exact: true }).click();
  await expect(demo).toHaveAttribute('data-mode', 'silent');
  await expect(demo.locator('.demo-status')).toContainText('不播放音频');
  await expect.poll(async () => Number(await demo.locator('.demo-position').inputValue())).toBeGreaterThan(100);
  await demo.getByRole('button', { name: '暂停预览', exact: true }).click();
  const at = Number(await demo.locator('.demo-position').inputValue());
  await page.waitForTimeout(150);
  expect(Math.abs(Number(await demo.locator('.demo-position').inputValue()) - at)).toBeLessThan(110);
});
test('blocked external stream reports the real failure without fake playback', async ({ page }) => {
  await page.route('https://music.163.com/song/media/outer/**', route => route.fulfill({ status: 404, body: 'Not available' }));
  await page.goto('/#projects');
  const demo = page.locator('.lyrscape-demo');
  await expect(demo).toHaveAttribute('data-ready', 'true');
  await demo.getByRole('button', { name: '试听 Heavenly Me', exact: true }).click();
  await expect(demo.locator('.demo-status')).toContainText('暂不支持网易云外链');
  await expect(demo).toHaveAttribute('data-mode', 'idle');
  await expect(demo.locator('audio')).toHaveJSProperty('paused', true);
});
test('local media drives lyrics, supports seeking and stops on filtering', async ({ page }) => {
  await page.goto('/#projects');
  const demo = page.locator('.lyrscape-demo');
  await expect(demo).toHaveAttribute('data-ready', 'true');
  await demo.locator('input[type=file]').setInputFiles({ name: 'synchronization-fixture.wav', mimeType: 'audio/wav', buffer: silentWav() });
  await demo.getByRole('button', { name: '播放本地 Heavenly Me', exact: true }).click();
  const audio = demo.locator('audio');
  await expect.poll(() => audio.evaluate((el: HTMLAudioElement) => el.currentTime)).toBeGreaterThan(0.1);
  await demo.locator('.demo-position').evaluate((input: HTMLInputElement) => { input.value = '20000'; input.dispatchEvent(new Event('input', { bubbles: true })); });
  await expect.poll(() => audio.evaluate((el: HTMLAudioElement) => el.currentTime)).toBeGreaterThan(19.9);
  await demo.getByRole('button', { name: '暂停 Heavenly Me', exact: true }).click();
  const time = await audio.evaluate((el: HTMLAudioElement) => el.currentTime * 1000);
  await page.waitForTimeout(180);
  expect(Math.abs(Number(await demo.locator('.demo-position').inputValue()) - time)).toBeLessThan(110);
  await expect(demo.locator('.demo-stage')).toHaveAttribute('data-active-line', String(expectedLine(time)));
  await demo.getByRole('button', { name: '播放本地 Heavenly Me', exact: true }).click();
  const oldAudio = await audio.elementHandle();
  await page.getByRole('button', { name: '硬件 03', exact: true }).click();
  expect(await oldAudio!.evaluate((el: HTMLAudioElement) => el.paused)).toBe(true);
  await expect(page.locator('.lyrscape-demo')).toHaveCount(0);
});
test('BakoPacker opens its real editor only after explicit activation', async ({ page }) => {
  await page.goto('/#project/bakopacker');
  await expect(page.getByRole('dialog')).toBeVisible();
  await expect(page.locator('.interactive-frame')).toHaveCount(0);
  await page.getByRole('button', { name: '启动在线编辑器' }).click();
  await expect(page.locator('#load-bakopacker')).toBeHidden();
  await expect(page.locator('.interactive-frame')).toHaveAttribute('src', 'https://kevin-2106.github.io/BakoPacker/');
  await expect(page.getByTitle('BakoPacker 在线资源包编辑器')).toBeVisible();
});
test('owner-selected Heavenly Me audio works without any media upload', async ({ page }) => {
  test.skip(!process.env.LOCAL_HEAVENLY_AUDIO, 'Optional physical test with the owner-selected local song.');
  const uploads: string[] = [];
  page.on('request', request => { if (request.method() === 'POST' || request.method() === 'PUT') uploads.push(request.url()); });
  await page.goto('/#projects');
  const demo = page.locator('.lyrscape-demo');
  await expect(demo).toHaveAttribute('data-ready', 'true');
  await demo.locator('input[type=file]').setInputFiles(process.env.LOCAL_HEAVENLY_AUDIO!);
  await demo.getByRole('button', { name: '播放本地 Heavenly Me', exact: true }).click();
  await expect.poll(() => demo.locator('audio').evaluate((el: HTMLAudioElement) => el.currentTime)).toBeGreaterThan(0.15);
  await demo.locator('.demo-position').evaluate((input: HTMLInputElement) => { input.value = '90000'; input.dispatchEvent(new Event('input', { bubbles: true })); });
  await demo.getByRole('button', { name: '暂停 Heavenly Me', exact: true }).click();
  const at = await demo.locator('audio').evaluate((el: HTMLAudioElement) => el.currentTime * 1000);
  await expect(demo.locator('.demo-stage')).toHaveAttribute('data-active-line', String(expectedLine(at)));
  expect(uploads).toEqual([]);
});

test('Heavenly Me anonymous external audio really plays and seeks', async ({ page }) => {
  await page.goto('/#projects');
  const demo = page.locator('.lyrscape-demo');
  await expect(demo).toHaveAttribute('data-ready', 'true');
  await demo.getByRole('button', { name: '试听 Heavenly Me', exact: true }).click();
  const audio = demo.locator('audio');
  await expect.poll(() => audio.evaluate((el: HTMLAudioElement) => el.currentTime), { timeout: 20000 }).toBeGreaterThan(.15);
  await demo.locator('.demo-position').evaluate((input: HTMLInputElement) => { input.value = '28000'; input.dispatchEvent(new Event('input', { bubbles: true })); });
  await expect.poll(() => audio.evaluate((el: HTMLAudioElement) => el.currentTime)).toBeGreaterThan(27.9);
  await demo.getByRole('button', { name: '暂停 Heavenly Me', exact: true }).click();
  const at = await audio.evaluate((el: HTMLAudioElement) => el.currentTime * 1000);
  await expect(demo.locator('.demo-stage')).toHaveAttribute('data-active-line', String(expectedLine(at)));
  await expect(demo.locator('.demo-stage')).toHaveAttribute('data-pv-style', 'halo3');
});
