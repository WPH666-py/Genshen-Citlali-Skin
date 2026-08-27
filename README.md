# 原神 · 茜特拉莉（Citlali）动态皮肤插件

茜特拉莉动态皮肤插件 —— 适用于 [DeepSeek Harness](https://www.deepseek.com/)（DSH）的动态 Cordis 插件，功能与操作**对标「丝柯克（Skirk）动态皮肤」**：

- 🖼️ 右下角 320px 茜特拉莉皮肤挂件，可拖拽、可收起（× → “茜特拉莉 ✦”胶囊）
- 🎵 **点击皮肤**：播放元素爆发「诸曜饬令」中文大招语音「**灭口交给你们俩了！**」+ 爆发特效（紫粉闪光、冲击波、星光、三道斩光、冰晶碎屑、技能名与台词字幕）
- 🖥️ **右键菜单**：释放元素爆发 / **切换壁纸（其一/其二/其三）** / 收起 / 一键卸载（二次确认）
- 📦 两种安装：单文件零配置（`client-standalone.js`）或全画质原图（`host.js` + `client.js`）

> 角色官方简中名为「茜特菈莉」，本仓库沿用玩家常见写法「茜特拉莉」。

## 目录结构

```
Genshen-Citlali-Skin/
├── README.md              ← 本说明
├── 版权说明.md
└── dsh-plugin/            ← DSH 动态皮肤插件（独立版，自包含）
    ├── client-standalone.js  零配置版：壁纸+语音全部内嵌 ★推荐
    ├── client.js            主用版：与 host.js 搭配（全画质原图路由）
    ├── host.js              可选 Host：/citlali-skin/ 素材路由
    ├── README.md            安装与自定义说明
    └── 素材/                立绘、壁纸原图与网页优化图、大招语音
```

## 快速安装（DSH 会话内）

**方式 A（零配置）**：`cordis_define`（plugin.kind: "new"，idPrefix 填 `citla`），把 `dsh-plugin/client-standalone.js` 全部内容粘贴到 `code.client`，然后 `cordis_run` 并允许授权。

**方式 B（全画质）**：`host.js` 粘贴到 `code.host`、`client.js` 粘贴到 `code.client`（记得把 `host.js` 里的 `ASSET_DIR` 改成你机器上的素材路径）。

详细说明、自定义（台词/壁纸/尺寸）与常见问题见 [dsh-plugin/README.md](dsh-plugin/README.md)。

## 版权说明

茜特拉莉立绘、壁纸与语音素材版权归米哈游（miHoYo/HoYoverse）所有；语音台词与音频来自[原神BWIKI](https://wiki.biligame.com/ys/茜特菈莉语音)。本插件仅供个人学习与娱乐使用，请勿用于商业用途。
