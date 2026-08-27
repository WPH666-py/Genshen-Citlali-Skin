# 原神 · 茜特拉莉（Citlali）动态皮肤插件

茜特拉莉动态皮肤——**一套素材，多平台安装**，功能与操作**对标「丝柯克（Skirk）动态皮肤」**：

- 🖼️ 320px 茜特拉莉皮肤挂件，可拖拽、可收起（× / “茜特拉莉 ✦”胶囊）
- 🎵 **点击皮肤**：播放元素爆发「诸曜饬令」中文大招语音「**灭口交给你们俩了！**」+ 紫粉爆发特效（闪光、冲击波、星光✦、三道斩光、冰晶碎屑、技能名与台词字幕）
- 🖥️ **右键菜单**：释放元素爆发 / **切换壁纸（其一/其二/其三，比例自适应完整显示）** / 收起 / 一键卸载（二次确认）
- 📦 **多平台**：DSH 动态插件 / VSCode·Trae·CodeX 扩展 / Windows 桌面置顶桌宠（覆盖所有 IDE）

> 角色官方简中名为「茜特菈莉」，本仓库沿用玩家常见写法「茜特拉莉」。素材版权归米哈游（miHoYo/HoYoverse），仅供个人学习娱乐。

## 目录结构

```
Genshen-Citlali-Skin/
├── AGENTS.md              ← 给 AI 助手的“按环境自动安装”指引（必读）
├── README.md              ← 本说明
├── 版权说明.md
├── dsh-plugin/            ← DeepSeek Harness 动态皮肤插件
│   ├── client-standalone.js  零配置：壁纸+语音内嵌 ★推荐
│   ├── client.js            主用版：与 host.js 搭配（全画质原图路由）
│   ├── host.js              可选 Host：/citlali-skin/ 素材路由
│   ├── README.md            安装与自定义说明
│   └── 素材/
├── vscode-extension/       ← VSCode / Trae-IDE / CodeX 扩展
│   ├── genshen-citlali-skin-1.0.0.vsix  已打包，直接安装
│   └── (package.json / extension.js / README.md / build.bat / icon / LICENSE)
└── desktop/                ← Windows 桌面置顶桌宠（覆盖所有 IDE/终端/网页）
    ├── 茜特拉莉皮肤.ps1
    ├── 启动-茜特拉莉皮肤.bat
    ├── README.md
    └── 素材/
```

## 给 AI 助手安装（推荐）

把本仓库地址发给任意一个有本机权限的 AI 助手（claude-code、kimi-code、CodeX、VSCode 内的 agent、DeepSeek Harness 等），并说“安装茜特拉莉皮肤”。AI 会读 `AGENTS.md` 自动识别环境并安装对应版本。

## 手动安装

### A. DeepSeek Harness（动态插件）
`cordis_define`（plugin.kind: "new"，idPrefix: `citla`），把 `dsh-plugin/client-standalone.js` 全文粘贴到 `code.client`，再 `cordis_run` 并允许授权。

### B. VSCode / Trae / CodeX（扩展）
把 `vscode-extension/genshen-citlali-skin-1.0.0.vsix` 拖到编辑器安装（或 `code --install-extension`）。命令面板运行「茜特拉莉皮肤：显示」。

### C. 任意 Windows（桌面桌宠 · 覆盖所有 IDE）
双击 `desktop/启动-茜特拉莉皮肤.bat`；置顶透明悬浮，悬浮于 VSCode / PyCharm / Trae / WebStorm / claude-code / CodeX / kimi-code / Harness **全部之上**。

## 各平台详细说明

- DSH：见 [dsh-plugin/README.md](dsh-plugin/README.md)
- VSCode：见 [vscode-extension/README.md](vscode-extension/README.md)
- 桌面：见 [desktop/README.md](desktop/README.md)

## 版权说明

立绘、壁纸与语音素材版权归米哈游（miHoYo/HoYoverse）；语音台词与音频来自[原神BWIKI](https://wiki.biligame.com/ys/茜特菈莉语音)。本插件仅供个人学习与娱乐使用，请勿用于商业用途。
