import { test, expect } from '@playwright/test';

const order = ['Lyrscape', '北通轻智控', 'OpenListFS', '门钥', 'NTQlean', 'FLTwink', 'BakoPacker', 'ColdShelf'];
for (const width of [390, 768, 1440]) {
  test(`usable layout at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 960 });
    const errors: string[] = [];
    page.on('pageerror', e => errors.push(e.message));
    await page.goto('/');
    await expect(page.locator('.project-name h3')).toHaveText(order);
    await page.evaluate(() => document.fonts.ready);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
    const contained = await page.locator('.lyrscape-demo').evaluate(root => {
      const panel = root.getBoundingClientRect(), status = root.querySelector('.demo-status')!.getBoundingClientRect();
      return status.bottom <= panel.bottom;
    });
    expect(contained).toBe(true);
    await page.getByRole('button', { name: '了解与使用 Lyrscape', exact: true }).click();
    await expect(page.getByRole('dialog')).toBeVisible();
    await expect(page.getByRole('dialog').getByRole('heading', { name: 'Lyrscape', exact: true })).toBeVisible();
    await page.getByRole('button', { name: '关闭作品档案' }).click();
    await expect(page.getByRole('dialog')).not.toBeVisible();
    expect(errors).toEqual([]);
  });
}
test('category filter keeps priority order and actual public links', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: '硬件 03', exact: true }).click();
  await expect(page.locator('.project-name h3')).toHaveText(['北通轻智控', '门钥', 'FLTwink']);
  const local = page.locator('[data-project="betop"]');
  await expect(local.locator('a')).toHaveCount(1);
  await expect(local.locator('a')).toHaveAttribute('href', '/betop-memory.json');
  await expect(local).toContainText('尚未公开');
  await page.getByRole('button', { name: '全部 08', exact: true }).click();
  await expect(page.locator('.project-name h3')).toHaveText(order);
});
test('deep links, focus restoration and Escape', async ({ page }) => {
  await page.goto('/#project/openlistfs');
  await expect(page.getByRole('dialog')).toBeVisible();
  await expect(page.getByRole('dialog')).toContainText('openlistfs mount O:');
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).not.toBeVisible();
  await page.getByRole('button', { name: '了解与使用 BakoPacker', exact: true }).click();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('button', { name: '了解与使用 BakoPacker', exact: true })).toBeFocused();
});
test('motion choice persists and reduced motion defaults to static', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await expect(page.locator('#motion-toggle')).toHaveAttribute('aria-pressed', 'false');
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.getByRole('button', { name: '动态背景：关闭' }).click();
  await expect(page.locator('#motion-toggle')).toHaveAttribute('aria-pressed', 'true');
  await page.getByRole('button', { name: '动态背景：开启' }).click();
  await page.reload();
  await expect(page.locator('#motion-toggle')).toHaveAttribute('aria-pressed', 'false');
});
test('keyboard focus is contained in the project dialog', async ({ page }) => {
  await page.goto('/#project/lyrscape');
  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();
  for (let i = 0; i < 12; i++) {
    await page.keyboard.press('Tab');
    expect(await page.evaluate(() => document.querySelector('dialog')!.contains(document.activeElement))).toBe(true);
  }
});

test('project context and idle memory evidence remain visible', async ({ page }) => {
  await page.goto('/#projects');
  await expect(page.locator('[data-project="lyrscape"]')).toContainText('Web · Windows 桌面版');
  const comparison = page.locator('.betop-comparison');
  await expect(comparison).toContainText('237.7');
  await expect(comparison).toContainText('31.5');
  await comparison.locator('summary').click();
  await expect(comparison).toContainText('关闭自动启停和更新');
  await expect(comparison).toContainText('不代表游戏运行中效果相同');
});
