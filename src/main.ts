import './style.css';
import { projects, type Project } from './projects';

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
      <div class="hero-edge" aria-hidden="true"><span>DESIGN / BUILD / ITERATE</span><span>KEVIN'S PERSONAL FIELD</span></div>
      <div class="hero-content">
        <p class="eyebrow"><span class="small-cross">+</span> INDEPENDENT TOOLS / SELECTED WORKS</p>
        <h1 id="hero-title">把日常，<br>做得<span class="hero-highlight">顺手</span>一点<span class="title-dot">.</span></h1>
        <p class="hero-description">你好，我是 <strong>Kevin_2016</strong>。<br>折腾桌面、音乐和文件，也把遇到的小麻烦，<br class="desktop-only">做成自己想用的工具。</p>
        <div class="hero-actions"><a class="button button-yellow" href="#projects">探索我的作品${arrow}</a><a class="hero-secondary" href="https://github.com/Kevin-2106" target="_blank" rel="noopener noreferrer">在 GitHub 见${arrow}</a></div>
      </div>
      <div class="field-label" aria-hidden="true"><span class="field-cross">+</span><span>PERSONAL FIELD<br><b>IDEAS IN MOTION</b></span><i></i></div>
      <div class="hero-bottom"><a href="#projects" class="scroll-cue">${down}<span>向下探索<span>SCROLL TO DISCOVER</span></span></a><div class="motion-control"><span class="motion-dot"></span><button id="motion-toggle" type="button" aria-pressed="true">动态背景：开启</button><span class="motion-hint">MOVE YOUR CURSOR</span></div><span class="hero-index">PORTFOLIO <b>001—008</b></span></div>
    </section>
    <div class="ticker" aria-hidden="true"><div>${Array.from({ length: 3 }, () => '<span>SMALL TOOLS</span><i>✳</i><span>MADE FOR REAL LIFE</span><i>✳</i><span>BUILT BY KEVIN_2016</span><i>✳</i>').join('')}</div></div>
    <section id="projects" class="projects section-pad" aria-labelledby="projects-title">
      <div class="section-top"><p class="section-index"><span>01 /</span> SELECTED WORKS</p><span class="section-caption">从一个需求，到一个能用的工具。</span></div>
      <div class="section-heading"><h2 id="projects-title">我的工具箱<span class="heading-dot">.</span></h2><div class="project-total"><strong>08</strong><span>个小工具<br>各有用处</span></div></div>
      <div class="project-toolbar"><div class="filters" role="group" aria-label="按用途筛选作品">${['全部', '桌面', '硬件', '文件', '创作'].map((c, i) => `<button type="button" data-filter="${c}" class="filter ${i === 0 ? 'active' : ''}" aria-pressed="${i === 0}">${c}<span>${i === 0 ? '08' : String(projects.filter(p => p.category === c).length).padStart(2, '0')}</span></button>`).join('')}</div><span class="toolbar-note">按个人推荐顺序排列</span></div>
      <div class="project-grid" id="project-grid"></div><p id="filter-status" class="sr-only" aria-live="polite"></p>
    </section>
    <section class="guide section-pad" id="guide" aria-labelledby="guide-title"><div class="section-top"><p class="section-index"><span>02 /</span> GET STARTED</p><span class="section-caption">找到它，然后让它帮上忙。</span></div><div class="guide-layout"><div><h2 id="guide-title">从这里，<br>开始使用<span class="heading-dot">.</span></h2><p>每个工具的环境和入口都不同。<br>在作品档案里，找到适合你的那一个。</p><a class="button button-outline" href="#projects">打开作品档案${arrow}</a></div><ol class="guide-steps"><li><span class="step-number">01</span><div><h3>先看看，它能做什么</h3><p>点击任意作品的「了解与使用」，查看功能、支持平台与当前边界。</p></div>${arrow}</li><li><span class="step-number">02</span><div><h3>选择适合的入口</h3><p>在线工具直接打开；桌面工具通过项目仓库或 Releases 获取。未公开的本地作品会明确标注。</p></div>${arrow}</li><li><span class="step-number">03</span><div><h3>让它真正用起来</h3><p>按档案里的步骤开始。遇到问题，在对应 GitHub 仓库留下 Issue，也欢迎把改进带回来。</p></div>${arrow}</li></ol></div></section>
    <section id="about" class="about section-pad" aria-labelledby="about-title"><div class="section-top"><p class="section-index"><span>03 /</span> BEHIND THE TOOLS</p><span class="section-caption">KEEP CURIOUS. KEEP BUILDING.</span></div><div class="about-layout"><div class="about-emblem" aria-hidden="true">${mark}<span>K/16</span><i></i></div><div><p class="eyebrow">HELLO AGAIN,</p><h2 id="about-title">我是 Kevin_2016<span class="heading-dot">.</span></h2><p class="about-lead">从「要是能这样就好了」，<br>到「现在真的可以了」。</p><p class="about-copy">这里收集我自己做的小工具：让歌词更自由，让设备更顺手，让文件更有秩序。它们来自具体的需求，也会随着实际使用继续生长。</p><p class="about-copy">喜欢能看明白、能自己掌控的软件。也喜欢把折腾的过程留下来，和同样好奇的人分享。</p>${external('https://github.com/Kevin-2106', '看看我最近在做什么', 'button button-dark')}</div></div></section>
  </main>
  <footer class="footer"><a href="#home" class="footer-brand">Kevin_2016<span>PERSONAL WORKSHOP</span></a><p>做些小东西。把日常变好一点。</p><div><span>© ${new Date().getFullYear()} Kevin_2016</span><a href="/credits.html">设计与开源致谢${arrow}</a><a href="#home" aria-label="回到顶部">BACK TO TOP ${arrow}</a></div></footer>
  <dialog id="project-dialog" class="project-dialog" aria-labelledby="dialog-title"><button class="dialog-close" type="button" aria-label="关闭作品档案"><span>关闭</span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 6 12 12M6 18 18 6" fill="none" stroke="currentColor" stroke-width="1.5"/></svg></button><div id="dialog-content"></div></dialog>
  <div class="toast" role="status" aria-live="polite"></div>
`;

function visual(p: Project) {
  if (p.id === 'lyrscape') return `<div class="lyric-art" aria-hidden="true"><div class="lyric-top"><span>LYRSCAPE / VISUAL STUDY</span><span>♪</span></div><div class="lyric-orbit"></div><div class="lyrics"><span class="lyric-previous">让每一个字</span><span class="lyric-current">都找到自己的节奏</span><span class="lyric-next">你的歌词，你的风景</span></div><div class="lyric-progress"><i></i></div><div class="lyric-bottom"><span>DESKTOP LYRICS</span><span>AMLL + SMTC</span></div></div>`;
  if (p.id === 'betop') return `<div class="device-art" aria-hidden="true"><div class="device-grid"></div><svg viewBox="0 0 360 220" class="controller-visual"><path d="M105 65C71 60 65 92 46 155c-12 41 10 54 33 29l38-37h126l38 37c23 25 45 12 33-29-19-63-25-95-59-90Z" fill="#242925" stroke="#dfe5d9" stroke-width="1.5"/><path d="M125 65c12 8 98 8 110 0M94 78l-16 39M267 78l16 39" fill="none" stroke="#637367"/><circle cx="137" cy="113" r="21" fill="#161a17" stroke="#fffa00"/><circle cx="220" cy="151" r="21" fill="#161a17" stroke="#b1baad"/><path d="M126 151h20m-10-10v20" stroke="#c5ccbf" stroke-width="5"/><circle cx="252" cy="103" r="5" fill="#fffa00"/><circle cx="268" cy="118" r="5" fill="#777f72"/><circle cx="236" cy="118" r="5" fill="#777f72"/><circle cx="252" cy="133" r="5" fill="#777f72"/><path d="M177 101h6m-14 24h22" stroke="#a7b29f" stroke-width="2"/></svg><span class="device-callout">LIGHTER CONTROL</span><div class="signal-track"><i></i><i></i><i></i><i></i><i></i></div><span class="art-footnote">原创示意 / 非产品截图</span></div>`;
  if (p.id === 'openlistfs') return `<div class="file-art" aria-hidden="true"><div class="file-flow"><span>CLOUD</span><i></i><b>O:</b><i></i><span>DESKTOP</span></div><div class="file-window"><div><span>OpenListFS</span><i></i><i></i><i></i></div><p><span>▸</span> Movies <small>NETWORK DRIVE</small></p><p><span>▸</span> Archive <small>READ ONLY</small></p><p><span>▸</span> Workspace <small>ON DEMAND</small></p><footer><i></i> REMOTE FILES, FAMILIAR PLACE.</footer></div><span class="art-footnote">原创示意 / 非产品截图</span></div>`;
  return '';
}

function renderProjects(category = '全部') {
  const list = projects.filter(p => category === '全部' || p.category === category);
  document.querySelector('#project-grid')!.innerHTML = list.map(p => {
    const i = projects.indexOf(p);
    return `<article class="project ${i === 0 ? 'project-featured' : i < 3 ? 'project-spotlight' : 'project-row'}" data-project="${p.id}">
      <div class="project-body"><div class="project-meta"><span class="project-number">${number(p)}<i>/</i></span><span>${p.platform}</span><span class="project-category">${p.category}</span></div>
      <div class="project-name">${i > 2 ? `<span class="project-icon">${icon(p.id)}</span>` : ''}<div><h3>${p.name}</h3><p class="project-subtitle">${p.subtitle}</p></div></div><h4>${p.tagline}</h4><p class="project-description">${p.description}</p><div class="project-tags">${p.tags.map(t => `<span>${t}</span>`).join('')}</div><div class="project-actions"><button type="button" class="project-open" data-open="${p.id}">了解与使用${arrow}<span class="sr-only"> ${p.name}</span></button>${p.local ? '<span class="local-status">本地作品 / 尚未公开</span>' : external(p.live || `https://github.com/Kevin-2106/${p.repo}`, p.live ? (p.liveLabel || '在线打开') : 'GitHub', 'project-source')}</div></div>
      ${i < 3 ? `<div class="project-visual">${visual(p)}</div>` : `<button class="row-open" data-open="${p.id}" type="button" aria-label="查看 ${p.name} 的介绍与使用">${arrow}</button>`}</article>`;
  }).join('');
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
  document.querySelector('#dialog-content')!.innerHTML = `<div class="dialog-header"><p class="eyebrow">PROJECT FILE / ${number(p)}</p><span class="dialog-platform">${p.platform}</span><h2 id="dialog-title">${p.name}</h2><p class="dialog-tagline">${p.tagline}</p><p class="dialog-description">${p.description}</p></div><div class="dialog-grid"><section><h3><span>01</span> 它能做什么</h3><ul>${p.features.map(f => `<li>${f}</li>`).join('')}</ul></section><section><h3><span>02</span> 怎么开始</h3><ol>${p.steps.map(s => `<li>${s}</li>`).join('')}</ol></section></div>${p.command ? `<div class="command-block"><div><span>本机运行 / ${p.local ? '已取得源码时' : '命令示例'}</span><button type="button" id="copy-command">复制命令</button></div><pre><code>${esc(p.command)}</code></pre></div>` : ''}<p class="project-note"><span>使用前了解</span>${p.note}</p><div class="dialog-actions">${p.live ? external(p.live, p.liveLabel || '打开在线工具', 'button button-yellow') : ''}${p.download ? external(p.download, '前往 Releases', 'button button-yellow') : ''}${p.repo ? external(`https://github.com/Kevin-2106/${p.repo}`, '项目源码与完整说明', 'button button-outline') : '<span class="dialog-local">本地作品 · 暂无公开下载</span>'}</div>`;
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
window.addEventListener('pagehide', event => { if (!event.persisted) fieldController?.dispose(); });
