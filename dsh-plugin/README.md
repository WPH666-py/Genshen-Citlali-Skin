# 茜特拉莉（Citlali）动态皮肤插件 · 独立版

一个**自包含**的原神茜特拉莉动态皮肤插件，适用于任何 [DeepSeek Harness](https://www.deepseek.com/)（DSH）环境（桌面版 / 网页版均可）。功能与操作**对标丝柯克动态皮肤**：任何拿到本文件夹的人都能直接安装使用。

> 注：角色官方简中名写作「茜特菈莉」，本插件沿用玩家常见写法「茜特拉莉」。

## 效果

- 页面右下角出现 320px 茜特拉莉皮肤挂件，可拖拽、可收起（× → “茜特拉莉 ✦”胶囊），常态轻微浮动
- **点击皮肤**：播放元素爆发「诸曜饬令」中文大招语音（其一「**灭口交给你们俩了！**」），同时播放爆发动作动画——紫粉闪光、冲击波、星光飞散、三道斩光、冰晶碎屑、技能名与台词字幕
- **右键皮肤/胶囊**：菜单（释放元素爆发 / **切换壁纸** / 收起 / **一键卸载**）；一键卸载需二次确认，确认后立即移除全部 UI 与素材路由（彻底删除插件记录可对 AI 说 `cordis_undefine`）
- **切换壁纸**：三张壁纸自由切换——壁纸·其一（立绘 800×1159）/ 壁纸·其二（600×877）/ 壁纸·其三（1152×1850），当前壁纸带 ✓ 标记
- 连续点击可重复触发；语音每次只播一条

## 文件说明

```
茜特拉莉动态皮肤插件（独立版）/
├── client-standalone.js  ← 零配置版：壁纸+语音全部内嵌，只粘贴它即可 ★推荐
├── client.js             ← 主用版：语音内嵌；加载 host.js 后壁纸自动用原图路由
├── host.js               ← 可选 Host：全画质模式用（原图壁纸 2560×1440 / 立绘 800×1159）
├── README.md             ← 本说明
└── 素材/
    ├── 茜特拉莉.png                   立绘原图（800×1159，全画质模式使用）
    ├── 茜特拉莉-壁纸2.jpg             壁纸原图（600×877，全画质模式使用）
    ├── 茜特拉莉-壁纸3.jpg             壁纸原图（1152×1850，全画质模式使用）
    ├── 茜特拉莉-web.jpg              立绘网页优化图（640×927，已内嵌进 client-standalone.js）
    ├── 茜特拉莉-壁纸2-web.jpg         壁纸网页优化图（640×935，已内嵌进 client-standalone.js）
    ├── 茜特拉莉-壁纸3-web.jpg         壁纸网页优化图（640×1028，已内嵌进 client-standalone.js）
    └── 语音-元素爆发·灭口交给你们俩了.mp3 中文大招语音（OGG 容器，已内嵌）
```

## 安装方式 A：零配置（推荐，只需 client-standalone.js）

1. 打开任意一个 DSH 会话（保证当前就是可运行动态插件的 Cordis 环境）。
2. 新建动态插件：`cordis_define`，`plugin.kind: "new"`，`idPrefix` 填 `citlali`（或任意 3–6 位小写字母），把 `client-standalone.js` 的**全部内容**粘贴到 `code.client`。
3. `cordis_run`（mode: `run`），在弹出的授权卡片上点击允许。
4. 完成：右下角即出现皮肤挂件，点击即可听语音看大招，右键即可切换壁纸。

> 如果你更习惯“说一句话让 AI 助手来做”：把本文件夹发给助手，并说：
> “把 client-standalone.js 的内容用 cordis_define 定义为新插件并 cordis_run 运行”。

## 安装方式 B：全画质模式（client.js + host.js，可选）

想用原图壁纸（而非内嵌的 640px 优化图）时：

1. 编辑 `host.js` 第一段中的 `ASSET_DIR`，改成素材文件夹在你机器上的绝对路径，例如：
   `const ASSET_DIR = 'C:/Users/你的名字/Downloads/茜特拉莉动态皮肤插件（独立版）/素材'`
2. `cordis_define` 时把 `host.js` 粘贴到 `code.host`、`client.js` 粘贴到 `code.client`，然后 `cordis_run`。
3. 客户端会自动检测到 Host 并切换到路由原图素材；壁纸加载失败时当前壁纸会显示 ⚠ 角标（通常说明 `ASSET_DIR` 路径不对）。

## 自定义

| 想改什么 | 改哪里 |
| --- | --- |
| 挂件尺寸（默认 320px） | client.js 中 CSS 的 `.citlali-card` / `.citlali-img` 宽高（特效可按比例缩放） |
| 默认位置（右下角） | `CitlaliWidget` 里 `pos` 的初始 x/y |
| 语音台词 | `client.js` 中 `VOICE_TEXT`；替换语音见下 |
| 技能名文案 | `client.js` 中 `SKILL_TEXT`（默认“元素爆发 · 诸曜饬令”） |
| 壁纸名称/顺序 | `client.js` 中 `WALLS` 数组 |
| 收起后胶囊文案 | `.citlali-pill` 渲染的文本“茜特拉莉 ✦” |

### 更换大招语音（一条）

把新 mp3/ogg 转成 base64（PowerShell，MIME 按新文件实际格式选：MP3 用 `audio/mpeg`，OGG 用 `audio/ogg`；本插件自带语音实际是 OGG 容器）：

```powershell
$b = [Convert]::ToBase64String([System.IO.File]::ReadAllBytes('新语音.mp3'))
"data:audio/ogg;base64,$b"
```

把输出整行替换 `client.js` 开头的 `const BURST_DATA_URI = '...'` 即可。茜特拉莉其余 2 条中文大招语音（元素爆发「诸曜饬令」其二、其三，来自原神BWIKI）：

- 其二「茜特菈琳、伊兹帕帕，给我上！」 https://patchwiki.biligame.com/images/ys/1/18/rr6pfelsbq95ttkt59wsefzbvu7xbn6.mp3
- 其三「让你见识见识恶曜伤人！」 https://patchwiki.biligame.com/images/ys/f/f9/8l9ziizg8sqq3gp68wqgu2pbqv21f8e.mp3

## 常见问题

- **重启后插件没了？** 动态插件只存在于进程内，重启后按安装方式 A/B 重新 define/run 一次即可（可以让 AI 助手代劳）。
- **点了没声音？** 确认浏览器没有全局静音；语音由点击手势触发，一般不受自动播放策略限制。若仍无声，检查 `client.js` 里 `BURST_DATA_URI` 是否完整。
- **全画质模式壁纸不显示？** 检查 `ASSET_DIR` 路径与文件名（含中文括号），并确认 Host 与 Client 是同一个插件包的同一版本。
- **壁纸切换没反应？** 确认右击的是皮肤或胶囊（会弹出菜单），菜单里“切换壁纸”下选择其一/其二/其三。

## 版权说明

茜特拉莉立绘、壁纸与语音素材版权归米哈游（miHoYo/HoYoverse）所有，语音台词与音频来自原神BWIKI（wiki.biligame.com）。本插件仅供个人学习与娱乐使用，请勿用于商业用途。
