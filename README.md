# Kevin_2016 · Personal Workshop

个人主页与原创小工具索引。Vite + TypeScript + Three.js，部署到 [kevin-2106.github.io](https://kevin-2106.github.io/)。

## 本地运行

```sh
npm ci
npm run dev
```

生产构建：`npm run build`。本地查看生产版本：`npm run preview`。

## 内容与交互

- 作品顺序和介绍维护在 `src/projects.ts`。
- 分类筛选、支持键盘和 Esc 的作品档案、可复制命令、可分享的 `#project/<id>` 深链接。
- 原创 Three.js 线框与地形背景，支持关闭、减少动态偏好；滚出视口或切换标签时停止持续渲染。
- 未公开的本地作品不提供虚构仓库或下载链接。
- 中文按本站文本使用 Noto Sans SC 子集，新增文字后运行 `npm run fonts`，默认读取相邻的 ReEndfield 开放字体目录；也可用 `npm run fonts -- --source <路径>` 指定素材库。字体脚本需要 uv；部署只使用已提交的 WOFF2 文件。
- 不包含分析脚本、登录、追踪器或远端字体服务。

## 发布

推送 `main` 自动运行 GitHub Pages 工作流：安装锁定依赖、构建、上传 `dist`，部署到仓库对应的用户主页。GitHub Pages 发布源使用 GitHub Actions。

## 验证

`npm test` 使用已安装的 Edge 或通过 `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH` 指定 Chromium，验证响应式布局、作品顺序、分类、档案关闭、深链接、动画开关与减少动态偏好。

设计采用 ReEndfield 的开放设计关系；独立实现动效和图形，未发布研究用游戏资产。完整致谢和原始字体许可见 `public/credits.html` 与 `public/licenses/`。

## 可运行的作品体验

Lyrscape 卡片复用生产版晴空终端 III（halo3）、PV stage、绘制依赖、LRC parser 与 timeline。按语言选字体、逐帧进退场与副歌构图均保留原逻辑；来源、hash 和 Web 适配见 `src/vendor/lyrscape/PROVENANCE.json`。

《Heavenly Me》使用网易云匿名外链 id=2699629221，HTMLAudioElement.currentTime 为播放时钟；没有打包音频。歌词运行时从塞壬唱片官方 CDN 载入（无 Referer，CDN 公开允许 CORS），不打包歌词全文。外链失败会如实提示；可选本地音频或明确标注的无声预览。本地音频不会上传，切换作品筛选时释放资源。

BakoPacker 作品档案可主动载入真实在线编辑器并导出资源包，首页不预加载 iframe。

`npm test` 包含真实外链播放、seek 与 Halo3 构图切换。`LOCAL_HEAVENLY_AUDIO` 可指定拥有者本机音频，做可选的额外播放检查。

北通卡片展示官方启动器到精简管理器的关系示意，非软件截图。`public/betop-memory.json` 记录 2026-10-26 的本机空闲采样条件、13 次中位数、完整进程树 Private Bytes 与单独的 Working Set；不把空闲管理开销解释为游戏效果等价或长时间稳定性。

界面中文字体通过 `npm run fonts` 重建。Halo3 字体来自相邻 Lyrscape 安装的 @fontsource，静态注册其原始 family 与 unicode-range，许可随文件发布。
