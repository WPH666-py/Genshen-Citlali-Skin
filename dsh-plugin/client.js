// ============================================================
// 茜特拉莉（Citlali）动态皮肤插件 · Client（独立版）
// ------------------------------------------------------------
// 功能（对标丝柯克动态皮肤）：
//   - 右下角 320px 茜特拉莉皮肤挂件，可拖拽、可收起（× → 胶囊）
//   - 点击皮肤：播放元素爆发「诸曜饬令」中文大招语音
//     「灭口交给你们俩了！」+ 爆发动画（紫粉闪光、冲击波、星光、
//     三道斩光、冰晶碎屑、技能名与台词字幕）
//   - 右键皮肤/胶囊：菜单（释放元素爆发 / 切换壁纸 / 收起 / 一键卸载）
//   - 三张壁纸自由切换：壁纸·其一（立绘）/ 壁纸·其二 / 壁纸·其三
// ------------------------------------------------------------
// 素材说明：
//   - 语音与壁纸由 host.js 的 /citlali-skin/ 路由提供（全画质原图）。
//     未加载 host.js 时：壁纸显示占位图，点击只播动画不播语音。
//   - 想要单文件零配置（壁纸+语音内嵌），请使用 client-standalone.js。
// ============================================================
// 语音 data URI：本文件为 null（走 Host 路由）；client-standalone.js
// 会把这一行替换为内嵌语音（OGG 容器，来自原神BWIKI「茜特菈莉/语音」）。
const BURST_DATA_URI = null

// 三张壁纸的默认素材地址（占位图）。
// client-standalone.js 会把这三项替换为内嵌高清壁纸 data URI，
// 实现「只粘贴 client.js 即可用」的零配置安装。
const WALL_DEFAULT_URIS = [
  /*WALL1*/ 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPSc2NDAnIGhlaWdodD0nOTI3Jz48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9J2cnIHgxPScwJyB5MT0nMCcgeDI9JzAnIHkyPScxJz48c3RvcCBvZmZzZXQ9JzAnIHN0b3AtY29sb3I9JyMzYjFkN2EnLz48c3RvcCBvZmZzZXQ9JzEnIHN0b3AtY29sb3I9JyMxMjA4MmUnLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0nNjQwJyBoZWlnaHQ9JzkyNycgZmlsbD0ndXJsKCNnKScvPjx0ZXh0IHg9JzMyMCcgeT0nNDMwJyBmb250LXNpemU9Jzc2JyBmaWxsPScjZjBiOGZmJyB0ZXh0LWFuY2hvcj0nbWlkZGxlJyBmb250LWZhbWlseT0nTWljcm9zb2Z0IFlhSGVpLCBzYW5zLXNlcmlmJz7inKY8L3RleHQ+PHRleHQgeD0nMzIwJyB5PSc1MTYnIGZvbnQtc2l6ZT0nNDInIGZpbGw9JyNmM2RkZmYnIHRleHQtYW5jaG9yPSdtaWRkbGUnIGZvbnQtZmFtaWx5PSdNaWNyb3NvZnQgWWFIZWksIHNhbnMtc2VyaWYnPuiMnOeJueaLieiOiTwvdGV4dD48dGV4dCB4PSczMjAnIHk9JzU2NicgZm9udC1zaXplPScyMicgZmlsbD0nI2I4OTNkOCcgdGV4dC1hbmNob3I9J21pZGRsZScgZm9udC1mYW1pbHk9J01pY3Jvc29mdCBZYUhlaSwgc2Fucy1zZXJpZic+5aOB57q4wrflhbbkuIDvvIjljaDkvY3vvIk8L3RleHQ+PC9zdmc+',
  /*WALL2*/ 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPScxMjgwJyBoZWlnaHQ9JzcyMCc+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSdnJyB4MT0nMCcgeTE9JzAnIHgyPScxJyB5Mj0nMSc+PHN0b3Agb2Zmc2V0PScwJyBzdG9wLWNvbG9yPScjMmIxNjYwJy8+PHN0b3Agb2Zmc2V0PScxJyBzdG9wLWNvbG9yPScjMGQwNjIwJy8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PHJlY3Qgd2lkdGg9JzEyODAnIGhlaWdodD0nNzIwJyBmaWxsPSd1cmwoI2cpJy8+PHRleHQgeD0nNjQwJyB5PSczNTAnIGZvbnQtc2l6ZT0nNzYnIGZpbGw9JyNmNWE4ZTgnIHRleHQtYW5jaG9yPSdtaWRkbGUnIGZvbnQtZmFtaWx5PSdNaWNyb3NvZnQgWWFIZWksIHNhbnMtc2VyaWYnPuKcpjwvdGV4dD48dGV4dCB4PSc2NDAnIHk9JzQzMCcgZm9udC1zaXplPSc0MicgZmlsbD0nI2YzZGRmZicgdGV4dC1hbmNob3I9J21pZGRsZScgZm9udC1mYW1pbHk9J01pY3Jvc29mdCBZYUhlaSwgc2Fucy1zZXJpZic+6Iyc54m55ouJ6I6JPC90ZXh0Pjx0ZXh0IHg9JzY0MCcgeT0nNDgwJyBmb250LXNpemU9JzIyJyBmaWxsPScjYzg5ZWUwJyB0ZXh0LWFuY2hvcj0nbWlkZGxlJyBmb250LWZhbWlseT0nTWljcm9zb2Z0IFlhSGVpLCBzYW5zLXNlcmlmJz7lo4HnurjCt+WFtuS6jO+8iOWNoOS9je+8iTwvdGV4dD48L3N2Zz4=',
  /*WALL3*/ 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPScxMjgwJyBoZWlnaHQ9JzcyMCc+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSdnJyB4MT0nMCcgeTE9JzAnIHgyPScxJyB5Mj0nMSc+PHN0b3Agb2Zmc2V0PScwJyBzdG9wLWNvbG9yPScjNGExZDVlJy8+PHN0b3Agb2Zmc2V0PScxJyBzdG9wLWNvbG9yPScjMTUwNzI2Jy8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PHJlY3Qgd2lkdGg9JzEyODAnIGhlaWdodD0nNzIwJyBmaWxsPSd1cmwoI2cpJy8+PHRleHQgeD0nNjQwJyB5PSczNTAnIGZvbnQtc2l6ZT0nNzYnIGZpbGw9JyNkOGI0ZmUnIHRleHQtYW5jaG9yPSdtaWRkbGUnIGZvbnQtZmFtaWx5PSdNaWNyb3NvZnQgWWFIZWksIHNhbnMtc2VyaWYnPuKcpjwvdGV4dD48dGV4dCB4PSc2NDAnIHk9JzQzMCcgZm9udC1zaXplPSc0MicgZmlsbD0nI2YzZGRmZicgdGV4dC1hbmNob3I9J21pZGRsZScgZm9udC1mYW1pbHk9J01pY3Jvc29mdCBZYUhlaSwgc2Fucy1zZXJpZic+6Iyc54m55ouJ6I6JPC90ZXh0Pjx0ZXh0IHg9JzY0MCcgeT0nNDgwJyBmb250LXNpemU9JzIyJyBmaWxsPScjYzg5ZWUwJyB0ZXh0LWFuY2hvcj0nbWlkZGxlJyBmb250LWZhbWlseT0nTWljcm9zb2Z0IFlhSGVpLCBzYW5zLXNlcmlmJz7lo4HnurjCt+WFtuS4ie+8iOWNoOS9je+8iTwvdGV4dD48L3N2Zz4=',
]

const CSS = `
.citlali-root { position: fixed; z-index: 99990; pointer-events: auto; user-select: none; -webkit-user-select: none; touch-action: none; }
.citlali-card { position: relative; width: 320px; height: auto; cursor: pointer; border-radius: 30px; }
.citlali-img { display: block; width: 100%; height: 100%; object-fit: cover; border-radius: 30px;
  border: 1px solid rgba(240, 170, 252, .45); background: #160b2e;
  box-shadow: 0 14px 48px rgba(0, 0, 0, .5), 0 0 0 1px rgba(226, 168, 255, .14) inset;
  animation: citlali-bob 3.6s ease-in-out infinite; }
.citlali-card:hover .citlali-img { box-shadow: 0 14px 54px rgba(216, 130, 255, .5), 0 0 30px rgba(240, 171, 252, .35); }
@keyframes citlali-bob { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-7px); } }
.citlali-is-bursting .citlali-img { animation: citlali-shake .55s ease-in-out; }
@keyframes citlali-shake {
  0% { transform: translate(0, 0) rotate(0deg); }
  15% { transform: translate(-12px, 4px) rotate(-2.5deg); }
  30% { transform: translate(12px, -5px) rotate(2.5deg); }
  45% { transform: translate(-10px, 3px) rotate(-1.8deg); }
  60% { transform: translate(9px, -3px) rotate(1.8deg); }
  80% { transform: translate(-4px, 0) rotate(-.6deg); }
  100% { transform: translate(0, 0) rotate(0deg); }
}
.citlali-burst { position: absolute; inset: 0; border-radius: 30px; pointer-events: none; overflow: visible; }
.citlali-flash { position: absolute; inset: 0; border-radius: 30px;
  background: radial-gradient(circle at 50% 40%, rgba(250, 208, 255, .95), rgba(192, 132, 252, .5) 45%, rgba(88, 28, 135, .16) 75%, transparent 100%);
  animation: citlali-flash .6s ease-out forwards; }
@keyframes citlali-flash { 0% { opacity: 0; } 12% { opacity: 1; } 100% { opacity: 0; } }
.citlali-shock { position: absolute; left: 50%; top: 50%; width: 230px; height: 230px; margin: -115px 0 0 -115px; border-radius: 50%;
  border: 5px solid rgba(226, 168, 255, .9); animation: citlali-shock .7s cubic-bezier(.1, .7, .3, 1) forwards; }
@keyframes citlali-shock { 0% { transform: scale(.2); opacity: .95; } 100% { transform: scale(2.1); opacity: 0; } }
.citlali-slash { position: absolute; height: 5px; border-radius: 4px; opacity: 0;
  background: linear-gradient(90deg, transparent, rgba(255, 224, 248, .95) 30%, rgba(240, 171, 252, .9) 60%, transparent);
  filter: drop-shadow(0 0 10px rgba(232, 150, 255, .9)); }
.citlali-slash-1 { left: -30%; top: 30%; width: 160%; transform: rotate(-14deg); animation: citlali-slash-a .55s ease-out .05s forwards; }
.citlali-slash-2 { left: -30%; top: 62%; width: 160%; transform: rotate(9deg); animation: citlali-slash-b .55s ease-out .12s forwards; }
.citlali-slash-3 { left: 10%; top: -20%; width: 5px; height: 140%; transform: rotate(18deg); animation: citlali-slash-c .6s ease-out .18s forwards; }
@keyframes citlali-slash-a { 0% { opacity: 0; transform: translateX(0) rotate(-14deg) scaleX(.4); } 15% { opacity: 1; } 100% { opacity: 0; transform: translateX(170px) rotate(-14deg) scaleX(1.1); } }
@keyframes citlali-slash-b { 0% { opacity: 0; transform: translateX(0) rotate(9deg) scaleX(.4); } 15% { opacity: 1; } 100% { opacity: 0; transform: translateX(-170px) rotate(9deg) scaleX(1.1); } }
@keyframes citlali-slash-c { 0% { opacity: 0; transform: translateY(80px) rotate(18deg) scaleY(.3); } 15% { opacity: 1; } 100% { opacity: 0; transform: translateY(-150px) rotate(18deg) scaleY(1.2); } }
.citlali-stars { position: absolute; inset: 0; }
.citlali-star { position: absolute; left: 50%; top: 50%; width: 18px; height: 18px; margin: -9px 0 0 -9px;
  color: #ffe1f8; font-size: 18px; line-height: 18px; text-align: center; opacity: 0;
  text-shadow: 0 0 12px rgba(255, 190, 240, .95), 0 0 24px rgba(216, 150, 255, .8);
  animation: citlali-star-fly .95s ease-out forwards; }
@keyframes citlali-star-fly {
  0% { opacity: 0; transform: translate(0, 0) scale(.3) rotate(0deg); }
  14% { opacity: 1; }
  100% { opacity: 0; transform: translate(var(--dx), var(--dy)) scale(1.25) rotate(200deg); }
}
.citlali-shards { position: absolute; inset: 0; }
.citlali-shard { position: absolute; left: 50%; top: 50%; width: 10px; height: 10px; margin: -5px 0 0 -5px; border-radius: 2px;
  background: linear-gradient(135deg, #fde8ff, #f0abfc 60%, #a855f7);
  box-shadow: 0 0 12px rgba(240, 171, 252, .95); opacity: 0;
  animation: citlali-shard-fly .8s ease-out forwards; }
@keyframes citlali-shard-fly {
  0% { opacity: 0; transform: translate(0, 0) scale(.4); }
  12% { opacity: 1; }
  100% { opacity: 0; transform: translate(var(--dx), var(--dy)) scale(1.15) rotate(220deg); }
}
.citlali-skill { position: absolute; left: 0; right: 0; top: -48px; text-align: center; white-space: nowrap;
  color: #f0d6ff; font: 700 19px/1 'Microsoft YaHei', sans-serif; text-shadow: 0 0 14px rgba(216, 150, 255, .95), 0 1px 2px #000;
  animation: citlali-text .95s ease-out forwards; }
.citlali-line { position: absolute; left: 0; right: 0; bottom: -58px; text-align: center; white-space: nowrap;
  color: #fbeefd; font: 700 24px/1 'Microsoft YaHei', sans-serif; letter-spacing: 4px; text-shadow: 0 0 16px rgba(240, 171, 252, .95), 0 1px 3px #000;
  animation: citlali-line-in 1.9s ease-out forwards; }
@keyframes citlali-text { 0% { opacity: 0; transform: translateY(8px); } 20% { opacity: 1; transform: translateY(0); } 70% { opacity: 1; } 100% { opacity: 0; transform: translateY(-6px); } }
@keyframes citlali-line-in { 0% { opacity: 0; transform: scale(.85); } 12% { opacity: 1; transform: scale(1); } 80% { opacity: 1; } 100% { opacity: 0; } }
.citlali-close { position: absolute; right: -12px; top: -12px; width: 30px; height: 30px; border: none; border-radius: 50%;
  background: rgba(24, 10, 44, .85); color: #f0c8ff; font: 700 17px/30px sans-serif; cursor: pointer; padding: 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .5); }
.citlali-close:hover { background: rgba(120, 60, 200, .9); color: #fff; }
.citlali-warn { position: absolute; left: -12px; top: -12px; width: 26px; height: 26px; border-radius: 50%; background: #b3402e; color: #fff; text-align: center; font: 700 14px/26px sans-serif; box-shadow: 0 2px 8px rgba(0, 0, 0, .5); }
.citlali-pill { position: fixed; z-index: 99990; pointer-events: auto; border: 1px solid rgba(226, 168, 255, .55); border-radius: 999px; padding: 10px 22px;
  background: rgba(24, 12, 48, .9); color: #f3ddff; font: 700 16px/1.4 'Microsoft YaHei', sans-serif; cursor: pointer; user-select: none;
  box-shadow: 0 6px 18px rgba(0, 0, 0, .5); }
.citlali-pill:hover { background: rgba(88, 40, 160, .95); }
.citlali-menu-backdrop { position: fixed; inset: 0; z-index: 99998; }
.citlali-menu { position: fixed; z-index: 99999; min-width: 210px; padding: 6px; border-radius: 12px;
  background: rgba(20, 10, 40, .96); border: 1px solid rgba(226, 168, 255, .4); box-shadow: 0 10px 30px rgba(0, 0, 0, .55);
  color: #f3ddff; font: 13px/1.3 'Microsoft YaHei', sans-serif; }
.citlali-menu-item { padding: 9px 14px; border-radius: 8px; cursor: pointer; white-space: nowrap; }
.citlali-menu-item:hover { background: rgba(120, 60, 200, .55); }
.citlali-menu-item.danger { color: #ffb4a8; }
.citlali-menu-item.danger:hover { background: rgba(200, 60, 60, .6); color: #fff; }
.citlali-menu-label { padding: 7px 14px 3px; font-size: 11px; letter-spacing: 1px; color: rgba(240, 214, 255, .5); cursor: default; }
.citlali-menu-sep { height: 1px; background: rgba(226, 168, 255, .18); margin: 4px 6px; }
`

return {
  apply(ctx) {
    const slots = ctx.get('slots')
    if (slots === undefined) return
    const disposeStyle = styles.insert(CSS)
    ctx.effect(() => disposeStyle)
    const VOICE_TEXT = '灭口交给你们俩了！'
    const SKILL_TEXT = '元素爆发 · 诸曜饬令'
    const PARTICLE_COUNT = 18
    const STAR_COUNT = 10
    const CARD_W = 320
    const MAX_CARD_H = 560
    const WALLS = [
      { name: '壁纸·其二', uri: WALL_DEFAULT_URIS[1], aspect: 877 / 600 },
      { name: '壁纸·其一', uri: WALL_DEFAULT_URIS[0], aspect: 1159 / 800 },
      { name: '壁纸·其三', uri: WALL_DEFAULT_URIS[2], aspect: 1850 / 1152 },
    ]
    const cardHeightFor = (aspect) => Math.min(MAX_CARD_H, Math.round(CARD_W * aspect))
    let disposeSlot = null

    const uninstallAll = async () => {
      try { await host.call('citlali-uninstall', null) } catch (e) { console.warn('citlali-skin: host uninstall call failed', e) }
      try { if (disposeSlot !== null) disposeSlot() } catch (e) { console.warn('citlali-skin: slot dispose failed', e) }
      try { disposeStyle() } catch (e) { console.warn('citlali-skin: style dispose failed', e) }
      console.log('citlali-skin: 皮肤已卸载（UI 与素材路由已移除）。如需彻底删除插件记录，请对 AI 说：cordis_undefine <插件ID>')
    }

    function CitlaliWidget() {
      // 素材地址：默认占位图（或 client-standalone 的内嵌壁纸）；
      // 若加载了 host.js 全画质模式，自动切换为 /citlali-skin/ 路由素材。
      const [assets, setAssets] = React.useState({ walls: WALLS.map((w) => w.uri), burst: BURST_DATA_URI })
      const [wallIndex, setWallIndex] = React.useState(0)
      const [cardH, setCardH] = React.useState(() => cardHeightFor(WALLS[0].aspect))
      const [failedWalls, setFailedWalls] = React.useState({})
      const [bursting, setBursting] = React.useState(false)
      const [burstKey, setBurstKey] = React.useState(0)
      const [hidden, setHidden] = React.useState(false)
      const [menu, setMenu] = React.useState(null)
      const [confirmUninstall, setConfirmUninstall] = React.useState(false)
      const [pos, setPos] = React.useState(() => ({
        x: Math.max(8, window.innerWidth - 360),
        y: Math.max(8, window.innerHeight - 620),
      }))
      const posRef = React.useRef(pos)
      posRef.current = pos
      const audioRef = React.useRef(null)
      const movedRef = React.useRef(false)

      React.useEffect(() => {
        const protocol = window.location.protocol
        if (protocol !== 'http:' && protocol !== 'https:') return
        host.call('citlali-urls', null).then((r) => {
          if (r && Array.isArray(r.walls) && r.walls.length >= 3 && typeof r.burst === 'string') {
            const origin = window.location.origin
            setAssets({
              walls: r.walls.map((u) => origin + u),
              burst: origin + r.burst,
            })
          }
        }).catch(() => {})
      }, [])

      React.useEffect(() => () => {
        if (audioRef.current) { try { audioRef.current.pause() } catch (e) {} }
      }, [])

      const triggerBurst = () => {
        setBurstKey((k) => k + 1)
        setBursting(true)
        try {
          if (typeof assets.burst !== 'string') {
            console.warn('citlali-skin: 未检测到 host.js 语音路由，跳过语音（动画照常）')
            return
          }
          if (audioRef.current) { try { audioRef.current.pause() } catch (e) {} }
          const audio = new Audio(assets.burst)
          audioRef.current = audio
          const playing = audio.play()
          if (playing !== undefined && playing.catch) playing.catch((err) => console.warn('citlali-skin: voice play failed', err))
        } catch (err) {
          console.error('citlali-skin: audio failed', err)
        }
      }

      const onPointerDown = (e) => {
        if (e.pointerType === 'mouse' && e.button !== 0) return
        movedRef.current = false
        const startX = e.clientX
        const startY = e.clientY
        const startPos = posRef.current
        const move = (ev) => {
          const dx = ev.clientX - startX
          const dy = ev.clientY - startY
          if (Math.abs(dx) + Math.abs(dy) > 6) movedRef.current = true
          setPos({
            x: Math.max(-180, Math.min(window.innerWidth - 90, startPos.x + dx)),
            y: Math.max(-180, Math.min(window.innerHeight - 90, startPos.y + dy)),
          })
        }
        const up = () => {
          window.removeEventListener('pointermove', move)
          window.removeEventListener('pointerup', up)
        }
        window.addEventListener('pointermove', move)
        window.addEventListener('pointerup', up)
      }

      const openMenu = (e, mode) => {
        e.preventDefault()
        e.stopPropagation()
        setConfirmUninstall(false)
        setMenu({
          x: Math.min(e.clientX, window.innerWidth - 240),
          y: Math.min(e.clientY, window.innerHeight - 260),
          mode,
        })
      }

      const menuItem = (label, onClick, danger) => React.createElement('div', {
        className: 'citlali-menu-item' + (danger ? ' danger' : ''),
        onClick: (e) => { e.stopPropagation(); onClick() },
      }, label)

      const menuLabel = (label) => React.createElement('div', {
        key: 'label-' + label,
        className: 'citlali-menu-label',
        onClick: (e) => e.stopPropagation(),
      }, label)

      const renderMenu = () => {
        if (menu === null) return null
        const items = []
        if (menu.mode === 'card') {
          items.push(menuItem('释放元素爆发「诸曜饬令」', () => { setMenu(null); triggerBurst() }))
          items.push(menuLabel('切换壁纸'))
          for (let i = 0; i < WALLS.length; i++) {
            const idx = i
            items.push(menuItem(WALLS[i].name + (wallIndex === i ? ' ✓' : ''), () => {
              setMenu(null)
              setWallIndex(idx)
              setCardH(cardHeightFor(WALLS[idx].aspect))
              setFailedWalls((prev) => {
                const next = Object.assign({}, prev)
                delete next[idx]
                return next
              })
            }))
          }
          items.push(menuItem('收起皮肤', () => { setMenu(null); setHidden(true) }))
        } else {
          items.push(menuItem('显示皮肤', () => { setMenu(null); setHidden(false) }))
        }
        items.push(React.createElement('div', { key: 'sep', className: 'citlali-menu-sep' }))
        items.push(menuItem(
          confirmUninstall ? '再次点击：确认卸载' : '一键卸载',
          () => {
            if (confirmUninstall) { setMenu(null); uninstallAll() }
            else setConfirmUninstall(true)
          },
          true,
        ))
        return React.createElement('div', {
          className: 'citlali-menu-backdrop',
          onClick: () => setMenu(null),
          onContextMenu: (e) => { e.preventDefault(); setMenu(null) },
        },
          React.createElement('div', { className: 'citlali-menu', style: { left: menu.x, top: menu.y }, onClick: (e) => e.stopPropagation() }, items))
      }

      const pill = React.createElement('button', {
        className: 'citlali-pill',
        style: { left: pos.x, top: pos.y },
        onPointerDown: onPointerDown,
        onClick: () => setHidden(false),
        onContextMenu: (e) => openMenu(e, 'pill'),
        title: '茜特拉莉皮肤（右键菜单）',
      }, '茜特拉莉 ✦')

      const burstLayer = bursting
        ? React.createElement('div', { className: 'citlali-burst', key: 'burst-' + burstKey },
            React.createElement('div', { className: 'citlali-flash' }),
            React.createElement('div', { className: 'citlali-shock' }),
            React.createElement('div', { className: 'citlali-slash citlali-slash-1' }),
            React.createElement('div', { className: 'citlali-slash citlali-slash-2' }),
            React.createElement('div', { className: 'citlali-slash citlali-slash-3' }),
            React.createElement('div', { className: 'citlali-stars' },
              Array.from({ length: STAR_COUNT }, (_, i) => React.createElement('span', {
                key: 'star-' + i,
                className: 'citlali-star',
                style: {
                  '--dx': ((i % 5) - 2) * 84 + ((i * 11) % 17) - 8 + 'px',
                  '--dy': ((Math.floor(i / 5) % 2) === 0 ? -1 : 1) * (90 + (i % 4) * 22) + 'px',
                  animationDelay: (i % 5) * 0.04 + 's',
                },
              }), '✦')),
            React.createElement('div', { className: 'citlali-shards' },
              Array.from({ length: PARTICLE_COUNT }, (_, i) => React.createElement('span', {
                key: i,
                className: 'citlali-shard',
                style: {
                  '--dx': ((i % 5) - 2) * 100 + ((i * 13) % 19) - 9 + 'px',
                  '--dy': ((Math.floor(i / 5) % 3) - 1) * 118 - 70 + 'px',
                  animationDelay: (i % 4) * 0.03 + 's',
                },
              }))),
            React.createElement('div', { className: 'citlali-skill' }, SKILL_TEXT),
            React.createElement('div', { className: 'citlali-line', onAnimationEnd: () => setBursting(false) }, '“' + VOICE_TEXT + '”'),
          )
        : null

      const card = React.createElement('div', {
        className: 'citlali-root',
        style: { left: pos.x, top: pos.y },
        onPointerDown: onPointerDown,
      },
        React.createElement('div', {
          className: 'citlali-card' + (bursting ? ' citlali-is-bursting' : ''),
          style: { width: CARD_W, height: cardH },
          onClick: () => { if (!movedRef.current) triggerBurst() },
          onContextMenu: (e) => openMenu(e, 'card'),
          title: '点击：释放元素爆发「诸曜饬令」；右键：菜单（当前壁纸：' + WALLS[wallIndex].name + '）',
        },
          React.createElement('img', {
            className: 'citlali-img',
            src: assets.walls[wallIndex],
            draggable: false,
            alt: '茜特拉莉',
            onLoad: (e) => {
              const el = e.currentTarget
              if (el.naturalWidth > 0) setCardH(cardHeightFor(el.naturalHeight / el.naturalWidth))
            },
            onError: () => setFailedWalls((prev) => {
              const next = Object.assign({}, prev)
              next[wallIndex] = true
              return next
            }),
          }),
          burstLayer,
          failedWalls[wallIndex]
            ? React.createElement('div', { className: 'citlali-warn', title: '当前壁纸加载失败' }, '⚠')
            : null,
          React.createElement('button', {
            className: 'citlali-close',
            title: '收起皮肤',
            onClick: (e) => { e.stopPropagation(); setHidden(true) },
          }, '×'),
        ))

      return React.createElement(React.Fragment, null, hidden ? pill : card, renderMenu())
    }

    slots.inject('shell.overlay', () => {
      disposeSlot = slots.register(
        { name: 'shell.overlay', id: 'citlali-skin-widget', order: 100, label: '茜特拉莉动态皮肤' },
        () => React.createElement(CitlaliWidget),
      )
      return disposeSlot
    })
  },
}
