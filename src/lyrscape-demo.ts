import { activeLine } from './vendor/lyrscape/renderer';
import { createPvStage } from './vendor/lyrscape/pv/stage';
import { halo3Style } from './vendor/lyrscape/pv/halo3';
import { pvFields, pvProfiles } from './vendor/lyrscape/pv-presets';
import './halo3-fonts.css';
import { parseLyrics } from './vendor/lyrscape/parsers';
import { timeline } from './vendor/lyrscape/timeline';
import type { AppState, Timeline } from './vendor/lyrscape/types';
import './lyrscape-demo.css';

export const HEAVENLY = {
  id: '2699629221', duration: 191327,
  page: 'https://music.163.com/song?id=2699629221',
  stream: 'https://music.163.com/song/media/outer/url?id=2699629221.mp3',
};
const playIcon = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m8 5 11 7-11 7V5Z" fill="currentColor"/></svg>';
const pauseIcon = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 5h4v14H6zm8 0h4v14h-4z" fill="currentColor"/></svg>';
const timeLabel = (ms: number) => `${Math.floor(ms / 60000)}:${String(Math.floor(ms / 1000) % 60).padStart(2, '0')}`;

export function lyricDemoMarkup() {
  return `<div class="lyrscape-demo" data-mode="idle">
    <div class="demo-top"><span><i></i> LYRSCAPE / 晴空终端 III</span><a href="${HEAVENLY.page}" target="_blank" rel="noopener noreferrer">网易云收听 ↗</a></div>
    <div class="demo-track"><span class="demo-track-icon" aria-hidden="true">↗</span><div><p>Heavenly Me</p><span>AIYUE blessed : 理名 / 塞壬唱片-MSR</span></div><span class="demo-track-type">LRC<br>LIVE</span></div>
    <div class="demo-stage" role="region" aria-label="Lyrscape 实时歌词" tabindex="0"><p class="demo-waiting">正在准备歌词…</p></div>
    <div class="demo-options"><label>构图<select class="demo-layout" aria-label="歌词构图"><option value="auto">自动</option><option value="hero">副歌大字</option><option value="caption">主歌窗口</option></select></label><label class="demo-size-label">舞台<input class="demo-size" type="range" min="36" max="60" step="1" value="48" aria-label="舞台大小"></label><button type="button" class="demo-restart" aria-label="回到歌曲开头">↺</button></div>
    <div class="demo-scrub"><input class="demo-position" type="range" min="0" max="${HEAVENLY.duration}" step="100" value="0" aria-label="歌曲播放位置"><div><output class="demo-elapsed">0:00</output><span class="demo-timing">逐行歌词 · 真实时间轴</span><span class="demo-duration">3:11</span></div></div>
    <div class="demo-controls"><button type="button" class="demo-play" aria-label="试听 Heavenly Me" disabled>${playIcon}<span>网易云试听</span></button><button type="button" class="demo-silent" disabled>无声预览</button><label class="demo-file-label" tabindex="0" role="button" aria-label="选择本地音频">本地音频<input class="demo-file" type="file" accept="audio/*,.mp3,.m4a,.flac,.ogg,.wav" tabindex="-1" hidden></label></div>
    <p class="demo-status" role="status">点击试听《Heavenly Me》，体验晴空终端 III。歌词来自塞壬唱片官网。</p>
  </div>`;
}

export function mountLyrscapeDemo(root: HTMLElement) {
  const stage = root.querySelector<HTMLElement>('.demo-stage')!;
  const play = root.querySelector<HTMLButtonElement>('.demo-play')!;
  const silent = root.querySelector<HTMLButtonElement>('.demo-silent')!;
  const positionInput = root.querySelector<HTMLInputElement>('.demo-position')!;
  const status = root.querySelector<HTMLElement>('.demo-status')!;
  const audio = new Audio(); audio.preload = 'none'; audio.hidden = true;
  audio.className = 'demo-audio'; audio.setAttribute('aria-hidden', 'true'); root.append(audio);
  const request = new AbortController();
  let mode: 'idle' | 'audio' | 'silent' = 'idle';
  let source: 'netease' | 'local' = 'netease';
  let objectUrl: string | undefined;
  let disposed = false, initialized = false, generation = 0;
  let frame = 0, visible = true;
  let disposeRenderer: (() => void) | undefined;
  const state: AppState = {
    settings: { color: '#fffa00', inactiveColor: '#8c9a82', gradientEnabled: false, gradientStart: '#c3b5ff', gradientEnd: '#ff9fd4', gradientAngle: 90, fontFamily: 'Noto, sans-serif', fontSize: 48, fontWeight: 700, textAlign: 'left', lineHeight: 1.5, shadow: 0, backgroundOpacity: 0, showTranslation: true, showNextLine: true },
    plugins: { rendererId: 'official.renderer.pv-halo3', enabled: {}, configs: { 'official.renderer.pv-halo3': { layout: 'auto', flash: false } } } as AppState['plugins'],
    track: { title: 'Heavenly Me', artists: ['AIYUE blessed : 理名'], durationMs: HEAVENLY.duration },
    playback: { positionMs: 0, playing: false, observedAtMonoMs: performance.now(), rate: 1 },
    lyrics: { timingMode: 'line', lines: [] },
    connection: { status: 'stopped', clients: 0, port: 0 }, adapterId: 'demo',
    overlay: { visible: false, clickthrough: false, alwaysOnTop: false }, isDesktop: false,
  };
  const clock: Timeline = { position() {
    // Media currentTime is the single authority, including while buffering.
    if (mode === 'audio' && audio.readyState > 0) return audio.currentTime * 1000;
    return timeline.position(state);
  } };
  const profile = pvProfiles.find(profile => profile.style === 'halo3')!;
  const renderer = createPvStage(halo3Style, profile.id, pvFields(profile));
  const isPlaying = () => mode === 'audio' ? !audio.paused && !audio.ended && audio.readyState > 0 : mode === 'silent' && state.playback.playing;
  function sample(position = clock.position(state), playing = false) {
    state.playback = { ...state.playback, positionMs: position, observedAtMonoMs: performance.now(), playing };
  }
  function controls() {
    root.dataset.mode = mode;
    root.dataset.audioSource = source;
    const playing = mode === 'audio' && isPlaying();
    play.innerHTML = `${playing ? pauseIcon : playIcon}<span>${playing ? '暂停' : source === 'local' ? '播放本地' : '网易云试听'}</span>`;
    play.setAttribute('aria-label', playing ? '暂停 Heavenly Me' : source === 'local' ? '播放本地 Heavenly Me' : '试听 Heavenly Me');
    silent.textContent = mode === 'silent' && isPlaying() ? '暂停预览' : '无声预览';
    silent.setAttribute('aria-pressed', String(mode === 'silent' && isPlaying()));
    root.classList.toggle('demo-is-playing', isPlaying());
  }
  function draw() {
    frame = 0;
    if (disposed) return;
    const at = clock.position(state);
    stage.dataset.activeLine = String(activeLine(state.lyrics.lines, at));
    if (mode === 'silent' && state.playback.playing && at >= (state.track.durationMs || HEAVENLY.duration)) {
      sample(at, false); status.textContent = '预览已结束，可以拖动时间轴或回到开头。'; controls();
    }
    positionInput.value = String(at);
    root.querySelector('output')!.textContent = timeLabel(at);
    positionInput.style.setProperty('--position', `${at / (state.track.durationMs || HEAVENLY.duration) * 100}%`);
    if (visible && !document.hidden) frame = requestAnimationFrame(draw);
  }
  function schedule() { if (!frame && !disposed && visible && !document.hidden) frame = requestAnimationFrame(draw); }
  function mountRenderer() { if (initialized && !disposeRenderer && visible && !document.hidden) disposeRenderer = renderer.mount(stage, () => state, clock); }
  function externalError() {
    if (mode !== 'audio' || disposed) return;
    sample(audio.readyState > 0 ? audio.currentTime * 1000 : state.playback.positionMs, false);
    mode = 'idle';
    status.textContent = source === 'netease' ? '这首歌暂不支持网易云外链试听。可在网易云收听，或选择本地音频同步歌词。' : '浏览器无法播放这个文件，请换一个可播放的音频文件。';
    controls(); schedule();
  }
  audio.addEventListener('error', externalError);
  audio.addEventListener('loadedmetadata', () => {
    if (mode !== 'audio') return;
    if (Number.isFinite(audio.duration) && audio.duration > 0) {
      state.track.durationMs = audio.duration * 1000;
      positionInput.max = String(state.track.durationMs);
      root.querySelector('.demo-duration')!.textContent = timeLabel(state.track.durationMs);
      audio.currentTime = Math.min(state.playback.positionMs / 1000, audio.duration);
    }
  });
  audio.addEventListener('playing', () => { if (mode === 'audio') { status.textContent = source === 'local' ? '正在播放本地音频 · 文件只在浏览器中使用，不会上传。' : '网易云外链播放中 · 歌词跟随实际音频进度。'; controls(); } });
  audio.addEventListener('pause', () => { if (mode === 'audio') { controls(); if (!audio.ended) status.textContent = '已暂停 · 歌词与音频停在同一位置。'; } });
  audio.addEventListener('waiting', () => { if (mode === 'audio') status.textContent = '音频正在缓冲，歌词会等待音频进度。'; });
  audio.addEventListener('ended', () => { if (mode === 'audio') { sample(audio.currentTime * 1000, false); status.textContent = '播放结束。'; controls(); } });
  play.addEventListener('click', async () => {
    if (!initialized) return;
    if (mode === 'audio' && !audio.paused) { audio.pause(); return; }
    const at = clock.position(state); sample(at, false);
    mode = 'audio'; const epoch = ++generation;
    if (!audio.src) audio.src = objectUrl || HEAVENLY.stream;
    if (audio.readyState > 0) audio.currentTime = at / 1000;
    status.textContent = source === 'netease' ? '正在连接网易云音源…' : '正在打开本地音频…';
    controls(); schedule();
    try { await audio.play(); if (!disposed && epoch === generation) controls(); }
    catch { if (!disposed && epoch === generation && mode === 'audio') externalError(); }
  });
  silent.addEventListener('click', () => {
    if (!initialized) return;
    const at = clock.position(state), shouldPlay = !(mode === 'silent' && state.playback.playing);
    mode = 'silent'; ++generation; audio.pause(); sample(at, shouldPlay);
    status.textContent = shouldPlay ? '无声预览 · 使用官网 LRC 的原始逐行时间轴，不播放音频。' : '无声预览已暂停。';
    controls(); schedule();
  });
  positionInput.addEventListener('input', () => {
    const at = Number(positionInput.value);
    if (mode === 'audio' && audio.readyState > 0) audio.currentTime = at / 1000;
    else sample(at, mode === 'silent' && state.playback.playing);
    root.dataset.seekMs = String(at); schedule();
  });
  root.querySelector('.demo-restart')!.addEventListener('click', () => {
    if (mode === 'audio' && audio.readyState > 0) audio.currentTime = 0;
    sample(0, mode === 'silent' && state.playback.playing); schedule();
  });
  root.querySelector<HTMLSelectElement>('.demo-layout')!.addEventListener('change', event => {
    state.plugins.configs[profile.id] = { ...state.plugins.configs[profile.id], layout: (event.target as HTMLSelectElement).value };
  });
  root.querySelector<HTMLInputElement>('.demo-size')!.addEventListener('input', event => { state.settings.fontSize = Number((event.target as HTMLInputElement).value); });
  const fileInput = root.querySelector<HTMLInputElement>('.demo-file')!;
  root.querySelector('.demo-file-label')!.addEventListener('keydown', event => {
    const key = event as KeyboardEvent;
    if (key.key === 'Enter' || key.key === ' ') { key.preventDefault(); fileInput.click(); }
  });
  fileInput.addEventListener('change', () => {
    const file = fileInput.files?.[0]; if (!file) return;
    mode = 'idle'; ++generation; audio.pause(); audio.removeAttribute('src'); audio.load();
    if (objectUrl) URL.revokeObjectURL(objectUrl);
    objectUrl = URL.createObjectURL(file); source = 'local'; audio.src = objectUrl; sample(0, false);
    status.textContent = '本地音频已就绪，点击「播放本地」。文件不会上传。'; controls(); schedule();
  });
  const observer = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (visible) { mountRenderer(); schedule(); }
    else { disposeRenderer?.(); disposeRenderer = undefined; }
  }); observer.observe(root);
  function visibility() { if (document.hidden) { disposeRenderer?.(); disposeRenderer = undefined; } else { mountRenderer(); schedule(); } }
  document.addEventListener('visibilitychange', visibility);
  fetch('https://web.hycdn.cn/siren/lyric/20250430/cfd84e70b19dc9a47fdf3d4c00341a63.lrc', { signal: request.signal, referrerPolicy: 'no-referrer' }).then(response => { if (!response.ok) throw new Error('Lyric file unavailable'); return response.text(); }).then(text => {
    if (disposed) return;
    state.lyrics = parseLyrics(text, 'Heavenly Me.lrc'); initialized = true;
    root.dataset.lyricLines = String(state.lyrics.lines.length); root.dataset.lyricMode = state.lyrics.timingMode; root.dataset.ready = 'true';
    play.disabled = silent.disabled = false;
    mountRenderer(); schedule(); controls();
    void document.fonts.load('900 48px "Noto Sans JP"', text).catch(() => {});
  }).catch(() => { if (!disposed) status.textContent = '歌词暂时无法载入，请刷新页面再试。'; });
  return { dispose() {
    if (disposed) return;
    disposed = true; ++generation; request.abort(); cancelAnimationFrame(frame);
    disposeRenderer?.(); observer.disconnect(); document.removeEventListener('visibilitychange', visibility);
    mode = 'idle'; audio.pause(); audio.removeAttribute('src'); audio.load();
    if (objectUrl) URL.revokeObjectURL(objectUrl);
  } };
}
