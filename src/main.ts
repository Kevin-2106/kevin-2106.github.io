import './style.css';
import { projects, type Project } from './projects';
import { lyricDemoMarkup, mountLyrscapeDemo } from './lyrscape-demo';

const arrow = '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 19 19 5M5 5h14v14" stroke="currentColor" stroke-width="1.7"/></svg>';
const down = '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 4v16m-6-6 6 6 6-6" stroke="currentColor" stroke-width="1.5"/></svg>';
const github = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.86c-2.78.6-3.37-1.18-3.37-1.18-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.53 2.34 1.09 2.91.83.09-.64.35-1.09.64-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.1.39-1.99 1.03-2.69-.1-.26-.45-1.28.1-2.66 0 0 .84-.27 2.75 1.03A9.6 9.6 0 0 1 12 6.82c.85 0 1.71.11 2.51.33 1.91-1.3 2.75-1.03 2.75-1.03.55 1.38.2 2.4.1 2.66.64.7 1.03 1.59 1.03 2.69 0 3.84-2.33 4.68-4.56 4.93.36.31.68.92.68 1.85v2.76c0 .27.18.58.69.48A10 10 0 0 0 12 2Z"/></svg>';
const mark = '<svg viewBox="0 0 44 44" fill="none" aria-hidden="true"><path d="M5 5h11v14L32 5h8L22 22l18 17H27L16 28v11H5V5Z" fill="currentColor"/><path d="M33 26v13h7" stroke="currentColor" stroke-width="2"/></svg>';
const iconPaths: Record<string, string> = {
  lyrscape: '<path d="M8 9h3v14H8zm8-5h3v23h-3zm8 8h3v11h-3z" fill="currentColor"/>',
  betop: '<path d="M10 10h14c5 0 9 14 5 15-3 1-5-5-7-5h-10c-2 0-4 6-7 5-4-1 0-15 5-15Z"/><path d="M9 13v6m-3-3h6m11-2h.1m3 4h.1"/>',
  openlistfs: '<path d="M4 10h10l3 4h13v13H4V10Z"/><path d="M9 5h18v9M8 21h16m-3-3 3 3-3 3"/>',
  door: '<path d="M8 29V5h16v24M4 29h24m-8-12h.1M12 5v24"/>',
  ntqlean: '<path d="M5 25V14h5v11m5 0V7h5v18m5 0v-9h5v9M3 29h28"/>',
  fltwink: '<path d="M3 9h28v17H3V9Zm4 4h2m3 0h2m3 0h2m3 0h2m-17 4h2m3 0h2m3 0h2m3 0h4M9 22h16"/>',
  bakopacker: '<path d="m17 3 13 7-13 7-13-7 13-7Zm-13 7v15l13 7 13-7V10M17 17v15M10 7l13 7"/>',
  coldshelf: '<path d="M5 4h24v26H5V4Zm0 13h24M11 10h12m-12 14h12"/>',
};
const icon = (id: string) => `<svg viewBox="0 0 34 34" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="miter" aria-hidden="true">${iconPaths[id]}</svg>`;
const esc = (text: string) => text.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);
const number = (p: Project) => String(projects.indexOf(p) + 1).padStart(2, '0');
const external = (url: string, label: string, cls = 'text-link') => `<a href="${url}" class="${cls}" target="_blank" rel="noopener noreferrer">${label}${arrow}</a>`;

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <header class="header">
    <a href="#home" class="brand" aria-label="Kevin_2016 首页">${mark}<span>Kevin_2016<span class="brand-sub">PERSONAL WORKSHOP</span></span></a>
    <nav aria-label="主导航"><a href="#projects">作品<span>01</span></a><a href="#guide">使用指南<span>02</span></a><a href="#about">关于<span>03</span></a></nav>
    <a class="header-github" href="https://github.com/Kevin-2106" target="_blank" rel="noopener noreferrer" aria-label="在新标签页打开 GitHub">${github}<span>GitHub</span>${arrow}</a>
  </header>
  <main>
    <section class="hero" id="home" aria-labelledby="hero-title">
      <div class="hero-grid" aria-hidden="true"></div><div id="field" class="field" aria-hidden="true"></div>
      <div class="hero-edge" aria-hidden="true"><span>KEVIN_2016 / 2026</span><span>PROJECT INDEX / 08</span></div>
      <div class="hero-content">
        <p class="eyebrow"><span class="small-cross">+</span> 个人工具与实验</p>
        <h1 id="hero-title">我做的<br><span class="hero-highlight">小工具</span><span class="title-dot">.</span></h1>
        <p class="hero-description">你好，我是 <strong>Kevin_2016</strong>。<br>这里记录我遇到的问题、做出的工具，<br class="desktop-only">以及它们为什么这样设计。</p>
        <div class="hero-actions"><a class="button button-yellow" href="#projects">浏览作品${arrow}</a><a class="hero-secondary" href="https://github.com/Kevin-2106" target="_blank" rel="noopener noreferrer">GitHub${arrow}</a></div>
      </div>
      <div class="field-label" aria-hidden="true"><span class="field-cross">+</span><span>PROJECTS<br><b>001 — 008</b></span><i></i></div>
      <div class="hero-bottom"><a href="#projects" class="scroll-cue">${down}<span>向下探索<span>PROJECT INDEX</span></span></a><div class="motion-control"><span class="motion-dot"></span><button id="motion-toggle" type="button" aria-pressed="true">动态背景：开启</button><span class="motion-hint">MOVE YOUR CURSOR</span></div><span class="hero-index">PORTFOLIO <b>001—008</b></span></div>
    </section>
    <div class="ticker" aria-hidden="true"><div>${Array.from({ length: 3 }, () => '<span>LYRSCAPE</span><i>✳</i><span>北通轻智控</span><i>✳</i><span>OPENLISTFS</span><i>✳</i>').join('')}</div></div>
    <section id="projects" class="projects section-pad" aria-labelledby="projects-title">
      <div class="section-top"><p class="section-index"><span>01 /</span> SELECTED WORKS</p><span class="section-caption">按推荐顺序，记录问题与实现。</span></div>
      <div class="section-heading"><h2 id="projects-title">我的工具箱<span class="heading-dot">.</span></h2><div class="project-total"><strong>08</strong><span>个小工具<br>各有用处</span></div></div>
      <div class="project-toolbar"><div class="filters" role="group" aria-label="按用途筛选作品">${['全部', '桌面', '硬件', '文件', '创作'].map((c, i) => `<button type="button" data-filter="${c}" class="filter ${i === 0 ? 'active' : ''}" aria-pressed="${i === 0}">${c}<span>${i === 0 ? '08' : String(projects.filter(p => p.category === c).length).padStart(2, '0')}</span></button>`).join('')}</div><span class="toolbar-note">按个人推荐顺序排列</span></div>
      <div class="project-grid" id="project-grid"></div><p id="filter-status" class="sr-only" aria-live="polite"></p>
    </section>
    <section class="guide section-pad" id="guide" aria-labelledby="guide-title"><div class="section-top"><p class="section-index"><span>02 /</span> GET STARTED</p><span class="section-caption">环境、下载和使用步骤。</span></div><div class="guide-layout"><div><h2 id="guide-title">使用方式<span class="heading-dot">.</span></h2><p>每个工具的环境和入口都不同。<br>在作品档案里，找到适合你的那一个。</p><a class="button button-outline" href="#projects">打开作品档案${arrow}</a></div><ol class="guide-steps"><li><span class="step-number">01</span><div><h3>先看它解决的问题</h3><p>点击任意作品的「了解与使用」，查看设计原因、支持平台和使用步骤。</p></div>${arrow}</li><li><span class="step-number">02</span><div><h3>选择适合的入口</h3><p>在线工具直接打开；桌面工具通过项目仓库或 Releases 获取。未公开的本地作品会明确标注。</p></div>${arrow}</li><li><span class="step-number">03</span><div><h3>按说明开始</h3><p>按档案里的步骤开始。遇到问题，在对应 GitHub 仓库留下 Issue，也欢迎把改进带回来。</p></div>${arrow}</li></ol></div></section>
    <section id="about" class="about section-pad" aria-labelledby="about-title"><div class="section-top"><p class="section-index"><span>03 /</span> BEHIND THE TOOLS</p><span class="section-caption">Kevin_2016 / GitHub: Kevin-2106</span></div><div class="about-layout"><div class="about-emblem" aria-hidden="true">${mark}<span>K/16</span><i></i></div><div><p class="eyebrow">HELLO AGAIN,</p><h2 id="about-title">我是 Kevin_2016<span class="heading-dot">.</span></h2><p class="about-lead">开发者，也在用这些工具。</p><p class="about-copy">我主要折腾音乐可视化、Windows 设备和文件工具。大多数项目从自己的使用需求开始，有些已经开源，有些还留在本机迭代。</p><p class="about-copy">喜欢能看明白、能自己掌控的软件。也喜欢把折腾的过程留下来，和同样好奇的人分享。</p>${external('https://github.com/Kevin-2106', '看看我最近在做什么', 'button button-dark')}</div></div></section>
  </main>
  <footer class="footer"><a href="#home" class="footer-brand">Kevin_2016<span>PERSONAL WORKSHOP</span></a><p>个人项目与使用记录</p><div><span>© ${new Date().getFullYear()} Kevin_2016</span><a href="/credits.html">设计与开源致谢${arrow}</a><a href="#home" aria-label="回到顶部">BACK TO TOP ${arrow}</a></div></footer>
  <dialog id="project-dialog" class="project-dialog" aria-labelledby="dialog-title"><button class="dialog-close" type="button" aria-label="关闭作品档案"><span>关闭</span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 6 12 12M6 18 18 6" fill="none" stroke="currentColor" stroke-width="1.5"/></svg></button><div id="dialog-content"></div></dialog>
  <div class="toast" role="status" aria-live="polite"></div>
`;

function visual(p: Project) {
  if (p.id === 'lyrscape') return lyricDemoMarkup();
  if (p.id === 'betop') return `<div class="betop-comparison" role="img" aria-label="北通官方游戏厅与轻智控的精简关系及本机空闲内存对比">
    <div class="comparison-label"><span>北通游戏厅 → 北通轻智控</span><span>空闲实测</span></div>
    <div class="launcher-flow"><div class="launcher-shell"><div class="mini-title">北通游戏厅 <small>2.6.2</small></div><div class="mini-nav">大厅 · 游戏 · 设备 · 智控</div><div class="mini-promo"><i></i><i></i><i></i></div><div class="mini-modules">官方游戏适配模块</div></div><span class="launcher-arrow" aria-hidden="true">→</span><div class="lite-shell"><div class="mini-title">北通轻智控 <small>精简管理</small></div><div class="mini-game"><i></i> 游戏列表 <span>按需启停</span></div><div class="mini-game"><i></i> 官方适配模块 <span>复用</span></div><div class="mini-game"><i></i> 下载 / 更新 / 回退</div></div></div>
    <div class="memory-comparison"><div><span>官方游戏厅</span><b>237.7<small> MiB</small></b><i class="memory-bar official-bar"></i></div><div><span>北通轻智控</span><b>31.5<small> MiB</small></b><i class="memory-bar lite-bar"></i></div></div>
    <p class="memory-caption">私有内存 · 完整进程树 · 13 次采样中位数</p><details class="memory-method"><summary>测量条件与边界</summary><p>2026-10-26，本机新启动的空闲界面，无游戏。官方 5 个进程，含默认启动的 aipan70 / newAIPan；轻智控 2 个进程，使用 61 款游戏目录，关闭自动启停和更新。每约 5 秒采样一次，共 13 次。</p><p>统计 Private Bytes 总和。工作集分别为 532.3 / 59.4 MiB，可能重复计入共享页。此对比衡量空闲管理开销，不代表游戏运行中效果相同，也不是长时间稳定性测试。</p><a href="/betop-memory.json" target="_blank" rel="noopener">查看测量数据 ↗</a></details><span class="comparison-footnote">界面结构示意 / 非截图</span>
  </div>`;
  if (p.id === 'openlistfs') return `<div class="file-art" aria-hidden="true"><div class="file-flow"><span>CLOUD</span><i></i><b>O:</b><i></i><span>DESKTOP</span></div><div class="file-window"><div><span>OpenListFS</span><i></i><i></i><i></i></div><p><span>▸</span> Movies <small>NETWORK DRIVE</small></p><p><span>▸</span> Archive <small>READ ONLY</small></p><p><span>▸</span> Workspace <small>ON DEMAND</small></p><footer><i></i> HTTP RANGE / READ-AHEAD</footer></div><span class="art-footnote">原创示意 / 非产品截图</span></div>`;
  return '';
}

let lyricDemo: ReturnType<typeof mountLyrscapeDemo> | undefined;
function renderProjects(category = '全部') {
  lyricDemo?.dispose(); lyricDemo = undefined;
  const list = projects.filter(p => category === '全部' || p.category === category);
  document.querySelector('#project-grid')!.innerHTML = list.map(p => {
    const i = projects.indexOf(p);
    return `<article class="project ${i === 0 ? 'project-featured' : i < 3 ? 'project-spotlight' : 'project-row'}" data-project="${p.id}">
      <div class="project-body"><div class="project-meta"><span class="project-number">${number(p)}<i>/</i></span><span>${p.platform}</span><span class="project-category">${p.category}</span></div>
      <div class="project-name">${i > 2 ? `<span class="project-icon">${icon(p.id)}</span>` : ''}<div><h3>${p.name}</h3><p class="project-subtitle">${p.subtitle}</p></div></div><h4>${p.tagline}</h4><p class="project-description">${p.description}</p><div class="project-tags">${p.tags.map(t => `<span>${t}</span>`).join('')}</div><div class="project-actions"><button type="button" class="project-open" data-open="${p.id}">了解与使用${arrow}<span class="sr-only"> ${p.name}</span></button>${p.id === 'bakopacker' ? `<button type="button" class="project-inline-demo" data-open="bakopacker">站内体验${arrow}</button>` : ''}${p.local ? '<span class="local-status">本地作品 / 尚未公开</span>' : external(p.live || `https://github.com/Kevin-2106/${p.repo}`, p.live ? (p.liveLabel || '在线打开') : 'GitHub', 'project-source')}</div></div>
      ${i < 3 ? `<div class="project-visual">${visual(p)}</div>` : `<button class="row-open" data-open="${p.id}" type="button" aria-label="查看 ${p.name} 的介绍与使用">${arrow}</button>`}</article>`;
  }).join('');
  const demoRoot = document.querySelector<HTMLElement>('.lyrscape-demo');
  if (demoRoot) lyricDemo = mountLyrscapeDemo(demoRoot);
  document.querySelector('#filter-status')!.textContent = `显示${category}作品，共 ${list.length} 个。`;
}
renderProjects();

document.querySelectorAll<HTMLButtonElement>('[data-filter]').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('[data-filter]').forEach(b => { b.classList.remove('active'); b.setAttribute('aria-pressed', 'false'); });
  button.classList.add('active'); button.setAttribute('aria-pressed', 'true'); renderProjects(button.dataset.filter);
}));

const dialog = document.querySelector<HTMLDialogElement>('#project-dialog')!;
let previousFocus: HTMLElement | null = null;
function openProject(id: string) {
  const p = projects.find(p => p.id === id);
  if (!p) return;
  previousFocus = document.activeElement as HTMLElement;
  document.querySelector('#dialog-content')!.innerHTML = `<div class="dialog-header"><p class="eyebrow">PROJECT FILE / ${number(p)}</p><span class="dialog-platform">${p.platform}</span><h2 id="dialog-title">${p.name}</h2><p class="dialog-tagline">${p.tagline}</p><p class="dialog-description">${p.description}</p></div><div class="dialog-grid"><section><h3><span>01</span> 为什么这样做</h3><ul>${p.features.map(f => `<li>${f}</li>`).join('')}</ul></section><section><h3><span>02</span> 怎么开始</h3><ol>${p.steps.map(s => `<li>${s}</li>`).join('')}</ol></section></div>${p.command ? `<div class="command-block"><div><span>本机运行 / ${p.local ? '已取得源码时' : '命令示例'}</span><button type="button" id="copy-command">复制命令</button></div><pre><code>${esc(p.command)}</code></pre></div>` : ''}<p class="project-note"><span>使用前了解</span>${p.note}</p>${p.id === 'bakopacker' ? `<section class="interactive-entry"><h3>在这里，真的做一个资源包</h3><p>载入 BakoPacker 的完整网页编辑器。可拖入素材、调整预览并导出 ZIP，素材在浏览器内处理。</p><button type="button" id="load-bakopacker" class="button button-dark">启动在线编辑器${arrow}</button><div id="bakopacker-frame-slot"></div></section>` : ''}<div class="dialog-actions">${p.live ? external(p.live, p.liveLabel || '打开在线工具', 'button button-yellow') : ''}${p.download ? external(p.download, '前往 Releases', 'button button-yellow') : ''}${p.repo ? external(`https://github.com/Kevin-2106/${p.repo}`, '项目源码与完整说明', 'button button-outline') : '<span class="dialog-local">本地作品 · 暂无公开下载</span>'}</div>`;
  document.querySelector('#load-bakopacker')?.addEventListener('click', event => {
    const frame = document.createElement('iframe'); frame.src = 'https://kevin-2106.github.io/BakoPacker/'; frame.title = 'BakoPacker 在线资源包编辑器'; frame.className = 'interactive-frame'; frame.setAttribute('tabindex', '0');
    document.querySelector('#bakopacker-frame-slot')!.replaceChildren(frame);
    (event.currentTarget as HTMLButtonElement).hidden = true;
    frame.scrollIntoView({ block: 'start', behavior: 'instant' }); frame.focus();
  });
  if (!dialog.open) dialog.showModal();
  document.body.classList.add('dialog-is-open');
  dialog.scrollTop = 0;
  document.querySelector<HTMLButtonElement>('#copy-command')?.addEventListener('click', async event => {
    const button = event.currentTarget as HTMLButtonElement;
    try { await navigator.clipboard.writeText(p.command!); button.textContent = '已复制'; } catch { button.textContent = '请选择命令手动复制'; }
  });
}
function navigateProject(id: string) {
  if (location.hash === `#project/${id}`) openProject(id); else location.hash = `project/${id}`;
}
document.querySelector('#project-grid')!.addEventListener('click', event => {
  const button = (event.target as Element).closest<HTMLElement>('[data-open]');
  if (button) navigateProject(button.dataset.open!);
});
function closeDialog() { if (dialog.open) dialog.close(); }
document.querySelector('.dialog-close')!.addEventListener('click', closeDialog);
dialog.addEventListener('keydown', event => {
  if (event.key !== 'Tab') return;
  const controls = Array.from(dialog.querySelectorAll<HTMLElement>('button:not([disabled]), a[href], [tabindex="0"]')).filter(el => el.getClientRects().length > 0);
  const first = controls[0], last = controls.at(-1);
  if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
  else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
});
dialog.addEventListener('click', event => { if (event.target === dialog) { const r = dialog.getBoundingClientRect(); if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) closeDialog(); } });
dialog.addEventListener('close', () => {
  document.body.classList.remove('dialog-is-open');
  if (location.hash.startsWith('#project/')) history.replaceState(null, '', '#projects');
  previousFocus?.focus({ preventScroll: true });
});
function syncHash() {
  if (location.hash.startsWith('#project/')) openProject(location.hash.slice(9));
  else if (dialog.open) dialog.close();
}
window.addEventListener('hashchange', syncHash); syncHash();

const media = matchMedia('(prefers-reduced-motion: reduce)');
let saved: string | null = null;
try { saved = localStorage.getItem('kevin-workshop-motion'); } catch { /* storage can be unavailable */ }
let motion = !media.matches && saved !== 'off';
let fieldController: { setMotion: (value: boolean) => void; dispose: () => void } | undefined;
const motionButton = document.querySelector<HTMLButtonElement>('#motion-toggle')!;
function setMotion(value: boolean) {
  motion = value;
  document.documentElement.dataset.motion = motion ? 'on' : 'off';
  motionButton.textContent = `动态背景：${motion ? '开启' : '关闭'}`;
  motionButton.setAttribute('aria-pressed', String(motion));
  fieldController?.setMotion(motion);
}
setMotion(motion);
motionButton.addEventListener('click', () => { setMotion(!motion); try { localStorage.setItem('kevin-workshop-motion', motion ? 'on' : 'off'); } catch { /* no persistence */ } });
media.addEventListener('change', e => { if (e.matches) setMotion(false); });
const startField = () => import('./field').then(({ createField }) => { fieldController = createField(document.querySelector('#field')!, motion); }).catch(() => document.documentElement.classList.add('field-unavailable'));
if ('requestIdleCallback' in window) window.requestIdleCallback(startField, { timeout: 1200 }); else setTimeout(startField, 80);

const navLinks = document.querySelectorAll<HTMLAnchorElement>('nav a');
new IntersectionObserver(entries => { entries.forEach(entry => { if (entry.isIntersecting) navLinks.forEach(a => { const active = a.hash === `#${entry.target.id}`; a.classList.toggle('current', active); if (active) a.setAttribute('aria-current', 'location'); else a.removeAttribute('aria-current'); }); }); }, { rootMargin: '-15% 0px -55% 0px' }).observe(document.querySelector('#projects')!);
['guide', 'about'].forEach(id => new IntersectionObserver(entries => { if (entries[0].isIntersecting) navLinks.forEach(a => { const active = a.hash === `#${id}`; a.classList.toggle('current', active); if (active) a.setAttribute('aria-current', 'location'); else a.removeAttribute('aria-current'); }); }, { rootMargin: '-15% 0px -40% 0px' }).observe(document.getElementById(id)!));
window.addEventListener('pagehide', event => { if (!event.persisted) { fieldController?.dispose(); lyricDemo?.dispose(); } });
