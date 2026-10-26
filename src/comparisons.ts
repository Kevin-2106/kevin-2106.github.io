export type Alternative = {
  name: string; url?: string; strength: string; consider: string; current?: boolean;
};
export type ProjectComparison = {
  summary: string; rows: Alternative[]; note?: string;
  sources?: { name: string; url: string }[];
};

/** Positioning, not a performance ranking. External facts checked 2026-10-26. */
export const comparisons: Record<string, ProjectComparison> = {
  lyrscape: {
    summary: '想直接获得现成的歌词体验，可以选 Lyricify；我更想把歌词做成可替换、可编写的视觉演出。',
    rows: [
      { name: 'Lyricify 4', url: 'https://lyricify.app/lyricify-4/', strength: '围绕 Spotify 的整套歌词与曲目管理体验，适合主要使用 Spotify、希望开箱即用的人。', consider: '4 的播放接入面向 Spotify；使用其他播放器时，应看 Fusion 或其他对应版本。' },
      { name: 'Lyricify Fusion', url: 'https://docs.lyricify.app/lyricify-fusion/', strength: '接入 Windows SMTC，已有灵动词岛、桌面 / 任务栏歌词、Apple Music 歌词和歌词舞台等视图。', consider: '具体播放器能提供哪些曲目与时间轴信息，需要查 App 支持列表。它也有多种视觉界面，桌面歌词并非 Lyrscape 独有。' },
      { name: 'Lyrscape', current: true, strength: '把接入、时间轴与视觉分别做成插件；用 AMLL 或 SMTC 获取播放信息，再选择普通文字、Aurora 或文字 PV，也能自己编写渲染器。', consider: '适合愿意调样式和做视觉实验的人。当前是可信插件显式注册，未提供任意第三方插件包的隔离安装；现成桌面发行包为 Windows。' },
    ],
    note: '平台也要按产品分别看：Lyricify Mobile 另有 Android、iOS、iPadOS、macOS 版本。Lyrscape 的浏览器渲染层不绑定 Windows，原生桌面能力仍取决于宿主。',
    sources: [{ name: 'Lyricify 官方版本说明', url: 'https://lyricify.app/' }, { name: 'Fusion 官方使用指南', url: 'https://docs.lyricify.app/lyricify-fusion/' }, { name: 'Lyrscape 架构与边界', url: 'https://github.com/Kevin-2106/Lyrscape#all-is-plugin' }],
  },
  betop: {
    summary: '完整设备管理用官方游戏厅；只想按游戏启停智控模块时，用轻智控减少常驻负担。',
    rows: [
      { name: '北通官方游戏厅', strength: '把游戏入口与设备功能放在一起，适合需要官方完整设备配置流程的人。', consider: '本机空闲实例会同时带起大厅与智控子进程；不只承担按需启动游戏适配模块这一件事。' },
      { name: '北通轻智控', current: true, strength: '保留官方游戏适配模块，精简日常管理界面；按需下载、启停和回退。本机空闲私有内存中位数为 31.5 MiB，官方为 237.7 MiB。', consider: '主要针对 KP70C1，不能代替官方全部设备管理功能。数据是各自空闲管理开销，并非同一游戏效果的等价测试。' },
    ],
    sources: [{ name: '本次空闲测量条件与数据', url: '/betop-memory.json' }],
  },
  openlistfs: {
    summary: '多种网盘统一管理选 RaiDrive，跨平台脚本工作流选 rclone；我聚焦 OpenList 原生接入与视频读取调校。',
    rows: [
      { name: 'RaiDrive', url: 'https://docs.raidrive.com/', strength: '图形化连接多种云存储与 NAS，支持 WebDAV、SFTP、S3 等服务，统一挂成盘符。适合管理多种远端存储。', consider: '它也提供读写缓存；不能把“有缓存”算成 OpenListFS 的独家优势。通过 OpenList WebDAV 接入时，应按该协议路径比较。' },
      { name: 'rclone mount', url: 'https://rclone.org/commands/rclone_mount/', strength: '支持多种后端与操作系统，挂载可与复制、同步和脚本自动化组合；VFS 缓存与分块读取参数丰富。', consider: '需要配置 remote、挂载参数和缓存策略；更适合习惯命令行、想把存储纳入自动化的人。' },
      { name: 'OpenListFS', current: true, strength: '围绕 OpenList 原生 API → 直链 / HTTP Range → WinFsp 的专用路径，把缓存、预读和视频 seek 的调校集中在同一实现里，并提供桌面连接管理。', consider: '适合已有 OpenList、愿意试验读取策略的人。默认只读；WebDAV / S3 和写入仍有实验边界，不能替代通用生产文件系统。' },
    ],
    note: '这是实现取向的区别，未作统一速度排名。网络、OpenList 后端和缓存配置都会影响读取与拖动；不宣称全面快于 RaiDrive 或 rclone。',
    sources: [{ name: 'RaiDrive 官方连接文档', url: 'https://docs.raidrive.com/' }, { name: 'RaiDrive 缓存说明', url: 'https://docs.raidrive.com/gui/settings/cache/' }, { name: 'rclone mount 官方文档', url: 'https://rclone.org/commands/rclone_mount/' }, { name: 'OpenListFS 实现与研究目标', url: 'https://github.com/Kevin-2106/OpenlistFS' }],
  },
  door: {
    summary: '门钥聚焦每天重复的开门动作；需要账户、门锁的完整业务流程时，仍使用原服务。',
    rows: [
      { name: '住理生活原有入口', strength: '继续使用原服务提供的账户与门锁业务流程，适合不想另行配置门锁凭证的人。', consider: '如果需求主要是每天高频开门，可以再考虑把已授权开门动作放到更直接的入口。' },
      { name: '门钥', current: true, strength: '集中提供点击、小组件与自写 NFC 标签入口，手机本地保存自己的凭证，减少每天找 App、找门锁的步骤。', consider: '面向已有授权的住理生活 BLE 门锁；不是通用门禁客户端，也不替代原服务的完整管理功能。' },
    ],
  },
  ntqlean: {
    summary: '看整块盘被谁占满，用通用空间分析器；要判断 NTQQ 媒体与会话的关系，再用 NTQlean。',
    rows: [
      { name: 'WizTree', url: 'https://diskanalyzer.com/', strength: '用树状图快速看清全盘文件和目录的空间分布，适合先找出占用大户，不必专门分析 QQ 数据库。', consider: '通用文件大小视图不能直接代替 NTQQ 会话与媒体引用分析。' },
      { name: 'NTQlean', current: true, strength: '基于本机 QQ 数据库副本建立媒体关联，按会话、时间和类型筛选；清理前预演，执行时移入回收站并记录清单。', consider: '需要自己的 NTQQ 数据及可读取的数据库，分析范围和版本适配更窄；关系分析也不能保证每项数据都可放心删除。' },
    ],
    sources: [{ name: 'WizTree 官方功能说明', url: 'https://diskanalyzer.com/' }, { name: 'NTQlean 安全模型', url: 'https://github.com/Kevin-2106/NTQlean' }],
  },
  fltwink: {
    summary: '跨品牌设备统一灯光用 OpenRGB；围绕一把 MK870 做逐键画面和媒体映射，是 FLTwink 的重点。',
    rows: [
      { name: 'OpenRGB', url: 'https://openrgb.org/', strength: '统一控制已支持的多品牌 RGB 设备，提供 SDK 和插件，可做音乐、游戏等联动，也支持 Windows、Linux 与 macOS。', consider: '使用前核对具体设备及固件的支持情况；这里没有验证它与这把 MK870 的兼容性。' },
      { name: 'FLTwink', current: true, strength: '针对 MK870 的真实键位做逐键画布、图层、封面取色、音乐与视频映射；把预览和 HID 输出分开，先看效果再发送。', consider: '只面向已适配键盘，不提供跨品牌设备生态；持续输出的长时稳定性仍待实机验证。' },
    ],
    sources: [{ name: 'OpenRGB 官方功能与设备列表入口', url: 'https://openrgb.org/' }],
  },
  bakopacker: {
    summary: '画素材仍用熟悉的图像工具；需要把素材变成能用的 Phira / prpr 资源包时，再交给 BakoPacker。',
    rows: [
      { name: '图像编辑器 + 手写配置 / ZIP', strength: '绘图、修图和素材组织的自由度高；熟悉资源包格式时，可以完全掌控配置和目录。', consider: '需要自行对齐文件命名、hold atlas 与 info.yml；效果通常还要导入游戏检查。' },
      { name: 'BakoPacker', current: true, strength: '把素材槽位、长条切片、判定色和下落预览放在一起，导出 ZIP 前就能发现一部分配置问题，普通编辑不用上传素材。', consider: '它负责组装与预览，不取代绘图工具；最终游戏内效果仍需实际检查。' },
    ],
  },
  coldshelf: {
    summary: '想把内容压得更小可用 7-Zip；我的重点是 SSD 与 HDD 之间可校验、能记住原路径的整目录迁移。',
    rows: [
      { name: '手动移动 / 复制到 HDD', strength: '最直接，目录在 HDD 上仍然可以浏览和访问；偶尔搬少量目录时无需新工具。', consider: '原路径、搬迁清单、内容校验和恢复步骤需要自己维护。从 HDD 直接运行，仍受它的随机读写性能影响。' },
      { name: '7-Zip', url: 'https://www.7-zip.org/', strength: '通用归档与压缩能力强，支持多种格式；想节省归档体积或交换压缩包时更合适。', consider: 'SSD / HDD 冷热迁移中的原路径记录、何时移除源目录和恢复后检查，仍需要另行组织。' },
      { name: 'ColdShelf', current: true, strength: '为暂时不用、使用时又需要 SSD 的项目、SDK、虚拟机和工具链保存逐文件校验与原路径；归档到 HDD，需要时恢复到原 SSD 目录。', consider: '由用户显式 cold / hot，需要等待迁移并预留恢复空间。TAR 默认不压缩，主要节省 SSD 占用，不减少两块盘上的数据总量。' },
    ],
    note: '这是我在 SSD 扩容成本较高时采用的分层使用方式。ColdShelf 不会按访问热度自动搬文件；使用前停止相关应用，归档也不替代多副本备份。',
    sources: [{ name: '7-Zip 官方功能说明', url: 'https://www.7-zip.org/' }, { name: 'ColdShelf 场景与迁移流程', url: 'https://github.com/Kevin-2106/ColdShelf#预期使用场景' }],
  },
};
