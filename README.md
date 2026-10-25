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
