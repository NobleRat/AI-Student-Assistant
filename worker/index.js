const page = `<!doctype html>
<html lang="ka">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
    <meta name="theme-color" content="#07101f">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
    <meta name="description" content="Studia AI — ქართული AI სასწავლო ასისტენტი უნივერსიტეტის სტუდენტებისთვის.">
    <link rel="manifest" href="/manifest.webmanifest">
    <link rel="icon" href="/icon.svg" type="image/svg+xml">
    <title>Studia AI — შენი სასწავლო სივრცე</title>
    <style>
      :root {
        color-scheme: dark;
        --bg: #07101f;
        --bg-soft: #091528;
        --panel: rgba(11, 21, 48, .88);
        --panel-2: rgba(14, 28, 58, .92);
        --line: rgba(133, 151, 194, .19);
        --line-bright: rgba(102, 92, 255, .58);
        --text: #f5f7ff;
        --muted: #8f9bb5;
        --primary: #665cff;
        --primary-2: #8b7cff;
        --mint: #44e4b5;
        --cyan: #59d8ff;
        --warning: #ffcf6a;
        --danger: #ff7b93;
        --shadow: 0 24px 60px rgba(0, 0, 0, .22);
        --radius: 18px;
        --sidebar: 232px;
        --ease: cubic-bezier(.2,.75,.25,1);
        font-family: system-ui, -apple-system, BlinkMacSystemFont, "Noto Sans Georgian", "Segoe UI", sans-serif;
      }
      * { box-sizing: border-box; }
      html { min-width: 320px; background: var(--bg); }
      body { min-height: 100vh; margin: 0; color: var(--text); background:
        radial-gradient(circle at 78% -8%, rgba(102, 92, 255, .23), transparent 31rem),
        radial-gradient(circle at 103% 18%, rgba(46, 202, 214, .10), transparent 25rem),
        linear-gradient(145deg, #06101e 0%, #07101f 46%, #081428 100%);
      }
      button, input, textarea, select { font: inherit; }
      button, a { -webkit-tap-highlight-color: transparent; }
      button { color: inherit; }
      .skip-link { position: fixed; left: 1rem; top: -4rem; z-index: 99; padding: .75rem 1rem; border-radius: .7rem; background: var(--text); color: var(--bg); transition: top .2s; }
      .skip-link:focus { top: 1rem; }
      .icon { width: 1.25rem; height: 1.25rem; flex: 0 0 auto; stroke: currentColor; fill: none; stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; }
      .app-shell { min-height: 100vh; display: grid; grid-template-columns: var(--sidebar) minmax(0, 1fr); }
      .sidebar { position: sticky; top: 0; height: 100vh; display: flex; flex-direction: column; padding: 1.5rem 1rem; border-right: 1px solid var(--line); background: rgba(5, 13, 28, .70); backdrop-filter: blur(18px); z-index: 20; }
      .brand { display: flex; align-items: center; gap: .8rem; padding: .25rem .45rem 1.75rem; color: var(--text); text-decoration: none; }
      .brand-mark { position: relative; display: grid; place-items: center; width: 2.15rem; height: 2.15rem; border-radius: .75rem; color: white; background: linear-gradient(145deg, #7368ff, #4938ea); box-shadow: 0 0 28px rgba(102, 92, 255, .38); }
      .brand-mark::after { content: ""; position: absolute; width: .45rem; height: .45rem; right: -.1rem; bottom: .15rem; border: 2px solid var(--bg); border-radius: 50%; background: var(--mint); }
      .brand strong { font-size: 1.04rem; letter-spacing: -.02em; }
      .brand em { color: var(--primary-2); font-style: normal; }
      .nav { display: grid; gap: .35rem; }
      .nav-button { width: 100%; min-height: 48px; display: flex; align-items: center; gap: .82rem; padding: .78rem .85rem; border: 1px solid transparent; border-radius: .85rem; color: var(--muted); background: transparent; cursor: pointer; text-align: left; transition: .2s var(--ease); }
      .nav-button:hover { color: var(--text); background: rgba(255,255,255,.035); }
      .nav-button.active { color: var(--text); border-color: rgba(115, 104, 255, .48); background: linear-gradient(115deg, rgba(102, 92, 255, .25), rgba(102, 92, 255, .10)); box-shadow: inset 3px 0 0 var(--primary-2); }
      .nav-button .nav-dot { width: .42rem; height: .42rem; margin-left: auto; border-radius: 50%; background: var(--mint); box-shadow: 0 0 12px rgba(68, 228, 181, .58); }
      .sidebar-foot { margin-top: auto; padding-top: 1rem; border-top: 1px solid var(--line); }
      .profile-chip { width: 100%; display: grid; grid-template-columns: 2.5rem minmax(0,1fr) auto; align-items: center; gap: .7rem; padding: .6rem; border: 0; border-radius: .9rem; color: inherit; background: transparent; cursor: pointer; text-align: left; }
      .avatar { display: grid; place-items: center; width: 2.5rem; height: 2.5rem; border-radius: 50%; font-weight: 750; background: linear-gradient(145deg, #7a6eff, #4c3de7); box-shadow: 0 0 20px rgba(102, 92, 255, .28); }
      .profile-copy strong, .profile-copy span { display: block; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
      .profile-copy strong { font-size: .86rem; }
      .profile-copy span { margin-top: .18rem; color: var(--muted); font-size: .72rem; }
      .main { width: 100%; min-width: 0; padding: 1.55rem clamp(1rem, 2.3vw, 2.25rem) 2.5rem; }
      .topbar { display: flex; justify-content: space-between; align-items: flex-start; gap: 1rem; margin-bottom: 1.15rem; }
      .eyebrow { margin: 0 0 .32rem; color: var(--muted); font-size: .78rem; }
      h1 { margin: 0; font-size: clamp(1.65rem, 2.4vw, 2.35rem); line-height: 1.18; letter-spacing: -.045em; }
      .date-chip, .status-chip { display: inline-flex; align-items: center; gap: .5rem; padding: .6rem .78rem; border: 1px solid var(--line); border-radius: .78rem; color: var(--muted); background: rgba(255,255,255,.025); font-size: .8rem; white-space: nowrap; }
      .mobile-menu { display: none; width: 44px; height: 44px; place-items: center; border: 1px solid var(--line); border-radius: .8rem; background: var(--panel); cursor: pointer; }
      .ai-composer { position: relative; display: grid; grid-template-columns: auto minmax(0,1fr) auto; align-items: center; gap: 1rem; min-height: 112px; margin-bottom: 1.15rem; padding: 1.2rem; border: 1px solid var(--line-bright); border-radius: 20px; background:
        radial-gradient(circle at 78% 0%, rgba(60, 138, 255, .18), transparent 40%),
        linear-gradient(125deg, rgba(17, 33, 69, .92), rgba(11, 23, 52, .86));
        box-shadow: var(--shadow), inset 0 1px 0 rgba(255,255,255,.035); overflow: hidden;
      }
      .ai-composer::before { content: ""; position: absolute; width: 14rem; height: 5rem; right: 2rem; top: -3.8rem; border-radius: 50%; background: var(--primary); filter: blur(52px); opacity: .34; }
      .spark-badge { position: relative; display: grid; place-items: center; width: 3.25rem; height: 3.25rem; border: 1px solid rgba(139,124,255,.7); border-radius: 50%; color: #d9d5ff; background: rgba(102,92,255,.18); box-shadow: 0 0 28px rgba(102,92,255,.23); }
      .composer-copy { min-width: 0; }
      .composer-copy label { display: block; margin-bottom: .28rem; font-weight: 720; }
      .composer-copy input { width: 100%; padding: .3rem 0; border: 0; outline: 0; color: var(--text); background: transparent; font-size: .92rem; }
      .composer-copy input::placeholder { color: #8491ae; }
      .send-button { position: relative; min-height: 44px; display: inline-flex; align-items: center; justify-content: center; gap: .48rem; padding: .72rem 1rem; border: 0; border-radius: .8rem; color: white; background: linear-gradient(135deg, #756aff, #5546f2); box-shadow: 0 10px 24px rgba(82, 66, 237, .28); cursor: pointer; transition: transform .18s var(--ease), box-shadow .18s; }
      .send-button:hover { transform: translateY(-2px); box-shadow: 0 14px 30px rgba(82, 66, 237, .38); }
      .send-button:active { transform: translateY(0) scale(.98); }
      .quick-prompts { display: flex; gap: .45rem; margin: -.35rem 0 1.15rem; overflow-x: auto; scrollbar-width: none; }
      .quick-prompts::-webkit-scrollbar { display: none; }
      .prompt-pill { flex: 0 0 auto; padding: .5rem .72rem; border: 1px solid var(--line); border-radius: 999px; color: var(--muted); background: rgba(255,255,255,.025); font-size: .76rem; cursor: pointer; transition: .18s; }
      .prompt-pill:hover { color: var(--text); border-color: rgba(139,124,255,.5); background: rgba(102,92,255,.1); }
      .dashboard-grid { display: grid; grid-template-columns: minmax(230px, .92fr) minmax(230px, .88fr) minmax(360px, 1.5fr); gap: 1rem; }
      .card { position: relative; min-width: 0; border: 1px solid var(--line); border-radius: var(--radius); background: linear-gradient(145deg, rgba(13, 27, 55, .94), rgba(8, 20, 42, .94)); box-shadow: 0 16px 40px rgba(0,0,0,.12); overflow: hidden; transition: transform .2s var(--ease), border-color .2s; }
      .card:hover { transform: translateY(-2px); border-color: rgba(139,124,255,.3); }
      .card-header { min-height: 3.2rem; display: flex; align-items: center; gap: .65rem; padding: .95rem 1rem .7rem; }
      .card-header .icon { color: var(--cyan); }
      .card-header h2 { margin: 0; font-size: .9rem; letter-spacing: -.015em; }
      .card-header .more { margin-left: auto; width: 2rem; height: 2rem; display: grid; place-items: center; border: 0; border-radius: .6rem; color: var(--muted); background: transparent; cursor: pointer; }
      .tasks { display: grid; gap: .55rem; padding: .25rem .85rem 1rem; }
      .task { display: grid; grid-template-columns: 1.55rem minmax(0,1fr) auto; align-items: center; gap: .65rem; padding: .72rem; border: 1px solid var(--line); border-radius: .85rem; background: rgba(255,255,255,.018); }
      .task-index { display: grid; place-items: center; width: 1.55rem; height: 1.55rem; border-radius: 50%; color: white; background: var(--primary); font-size: .7rem; font-weight: 700; }
      .task strong, .task small { display: block; }
      .task strong { font-size: .77rem; }
      .task small { margin-top: .2rem; color: var(--muted); font-size: .66rem; }
      .task-state { display: grid; place-items: center; width: 1.8rem; height: 1.8rem; border: 2px solid rgba(68,228,181,.5); border-radius: 50%; color: var(--mint); font-size: .65rem; font-weight: 750; }
      .task-state.done { border: 0; color: #062118; background: var(--mint); }
      .card-link { width: calc(100% - 1.7rem); display: flex; justify-content: center; align-items: center; gap: .4rem; margin: -.25rem .85rem .85rem; padding: .65rem; border: 0; border-radius: .7rem; color: var(--primary-2); background: transparent; font-weight: 650; font-size: .75rem; cursor: pointer; }
      .exam-content { padding: .45rem 1rem 1rem; text-align: center; }
      .subject-orb { display: grid; place-items: center; width: 4.7rem; height: 4.7rem; margin: .1rem auto .8rem; border: 1px solid rgba(102,92,255,.55); border-radius: 50%; color: var(--primary-2); background: radial-gradient(circle at 40% 35%, rgba(102,92,255,.4), rgba(102,92,255,.08)); box-shadow: 0 0 30px rgba(102,92,255,.12); }
      .subject-orb .icon { width: 2rem; height: 2rem; }
      .exam-content h3 { margin: 0 0 .35rem; font-size: .94rem; }
      .exam-content > p { margin: 0 0 .9rem; color: var(--muted); font-size: .7rem; }
      .countdown { display: grid; grid-template-columns: repeat(4,1fr); padding: .8rem 0; border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); }
      .countdown span { border-right: 1px solid var(--line); }
      .countdown span:last-child { border: 0; }
      .countdown strong, .countdown small { display: block; }
      .countdown strong { font-size: .9rem; }
      .countdown small { margin-top: .15rem; color: var(--muted); font-size: .58rem; }
      .outline-button { width: 100%; margin-top: .9rem; padding: .65rem; border: 1px solid var(--line); border-radius: .7rem; color: var(--primary-2); background: rgba(102,92,255,.035); cursor: pointer; font-size: .74rem; font-weight: 650; }
      .chart-card { padding-bottom: .8rem; }
      .chart-select { margin-left: auto; padding: .45rem .6rem; border: 1px solid var(--line); border-radius: .65rem; color: var(--muted); background: #0c1b36; font-size: .68rem; }
      .chart-wrap { padding: 0 .8rem; }
      .chart-wrap svg { width: 100%; height: auto; display: block; overflow: visible; }
      .grid-line { stroke: rgba(143,155,181,.14); stroke-width: 1; stroke-dasharray: 4 5; }
      .axis-label { fill: #7e8ba8; font-size: 9px; }
      .chart-area { fill: url(#areaGradient); }
      .chart-line { fill: none; stroke: #756aff; stroke-width: 3; stroke-linecap: round; stroke-linejoin: round; filter: drop-shadow(0 0 7px rgba(102,92,255,.55)); }
      .chart-dot { fill: #f6f7ff; stroke: #665cff; stroke-width: 2; }
      .chart-value { fill: #cfd3df; font-size: 9px; font-weight: 700; }
      .chart-summary { display: grid; grid-template-columns: 1fr 1fr; margin: .15rem .85rem 0; padding: .75rem; border: 1px solid var(--line); border-radius: .82rem; background: rgba(255,255,255,.018); }
      .summary-stat { display: grid; grid-template-columns: auto 1fr; align-items: center; gap: .6rem; min-width: 0; }
      .summary-stat + .summary-stat { padding-left: .75rem; border-left: 1px solid var(--line); }
      .stat-icon { display: grid; place-items: center; width: 2rem; height: 2rem; border-radius: 50%; color: var(--cyan); background: rgba(89,216,255,.08); }
      .summary-stat small, .summary-stat strong { display: block; }
      .summary-stat small { color: var(--muted); font-size: .58rem; }
      .summary-stat strong { margin-top: .15rem; font-size: .88rem; }
      .summary-stat strong.positive { color: var(--mint); }
      .mastery { grid-column: 1 / -1; }
      .mastery-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; padding: .2rem 1rem 1rem; }
      .mastery-item { min-width: 0; display: grid; grid-template-columns: auto minmax(0,1fr) auto; align-items: center; gap: .65rem; }
      .mastery-icon { display: grid; place-items: center; width: 2.2rem; height: 2.2rem; border: 1px solid rgba(102,92,255,.35); border-radius: 50%; color: var(--primary-2); background: rgba(102,92,255,.08); }
      .mastery-copy strong { display: block; font-size: .72rem; }
      .progress-track { height: 4px; margin-top: .45rem; border-radius: 999px; background: rgba(255,255,255,.08); overflow: hidden; }
      .progress-track i { display: block; width: var(--value); height: 100%; border-radius: inherit; background: linear-gradient(90deg, var(--mint), #78f0cf); box-shadow: 0 0 12px rgba(68,228,181,.35); }
      .mastery-item > b { color: var(--mint); font-size: .72rem; }
      .page { display: none; animation: pageIn .28s var(--ease); }
      .page.active { display: block; }
      @keyframes pageIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
      .page-head { display: flex; align-items: flex-end; justify-content: space-between; gap: 1rem; margin-bottom: 1.2rem; }
      .page-head h1 { font-size: clamp(1.45rem, 2vw, 2rem); }
      .page-head p { max-width: 42rem; margin: .38rem 0 0; color: var(--muted); font-size: .82rem; line-height: 1.55; }
      .primary-button, .secondary-button, .icon-button { min-height: 44px; border-radius: .78rem; cursor: pointer; transition: .18s var(--ease); }
      .primary-button { display: inline-flex; align-items: center; justify-content: center; gap: .5rem; padding: .68rem .95rem; border: 0; color: #fff; background: linear-gradient(135deg, #756aff, #5546f2); box-shadow: 0 10px 24px rgba(82,66,237,.24); font-weight: 650; font-size: .78rem; }
      .primary-button:hover { transform: translateY(-2px); }
      .secondary-button { display: inline-flex; align-items: center; justify-content: center; gap: .45rem; padding: .64rem .85rem; border: 1px solid var(--line); color: var(--text); background: rgba(255,255,255,.025); font-size: .75rem; }
      .secondary-button:hover { border-color: rgba(139,124,255,.45); background: rgba(102,92,255,.08); }
      .icon-button { width: 44px; display: grid; place-items: center; border: 1px solid var(--line); color: var(--muted); background: rgba(255,255,255,.025); }
      .assistant-layout { min-height: calc(100vh - 8.2rem); display: grid; grid-template-columns: minmax(0,1fr) 270px; gap: 1rem; }
      .chat-panel { min-height: 650px; display: grid; grid-template-rows: auto minmax(0,1fr) auto; }
      .chat-toolbar { display: flex; align-items: center; gap: .45rem; padding: .8rem; border-bottom: 1px solid var(--line); overflow-x: auto; }
      .mode-button { flex: 0 0 auto; padding: .55rem .72rem; border: 1px solid transparent; border-radius: 999px; color: var(--muted); background: transparent; font-size: .7rem; cursor: pointer; }
      .mode-button.active { border-color: rgba(102,92,255,.48); color: #fff; background: rgba(102,92,255,.16); }
      .ai-status { margin-left: auto; display: inline-flex; align-items: center; gap: .4rem; color: var(--muted); font-size: .65rem; white-space: nowrap; }
      .ai-status::before { content: ""; width: .45rem; height: .45rem; border-radius: 50%; background: var(--mint); box-shadow: 0 0 10px rgba(68,228,181,.5); }
      .messages { min-height: 0; display: flex; flex-direction: column; gap: 1rem; padding: 1.2rem; overflow: auto; scroll-behavior: smooth; }
      .message { max-width: min(46rem, 88%); display: grid; grid-template-columns: 2rem minmax(0,1fr); gap: .65rem; align-self: flex-start; }
      .message.user { grid-template-columns: minmax(0,1fr) 2rem; align-self: flex-end; }
      .message-avatar { display: grid; place-items: center; width: 2rem; height: 2rem; border-radius: .7rem; color: #fff; background: rgba(102,92,255,.2); }
      .message.user .message-avatar { grid-column: 2; background: linear-gradient(145deg,#7a6eff,#4c3de7); font-size: .72rem; font-weight: 750; }
      .bubble { padding: .78rem .9rem; border: 1px solid var(--line); border-radius: .25rem .9rem .9rem .9rem; color: #dfe5f7; background: rgba(255,255,255,.025); font-size: .79rem; line-height: 1.65; white-space: pre-wrap; }
      .message.user .bubble { grid-row: 1; border-color: rgba(102,92,255,.3); border-radius: .9rem .25rem .9rem .9rem; background: rgba(102,92,255,.12); }
      .message-meta { margin-top: .34rem; color: #72809d; font-size: .6rem; }
      .typing-dots { display: inline-flex; gap: .3rem; }
      .typing-dots i { width: .35rem; height: .35rem; border-radius: 50%; background: var(--muted); animation: typing 1.1s infinite alternate; }
      .typing-dots i:nth-child(2) { animation-delay: .2s; }.typing-dots i:nth-child(3) { animation-delay: .4s; }
      @keyframes typing { to { transform: translateY(-4px); background: var(--primary-2); } }
      .chat-compose { padding: .8rem; border-top: 1px solid var(--line); }
      .attachment-chip { display: none; align-items: center; gap: .45rem; width: max-content; max-width: 100%; margin-bottom: .55rem; padding: .42rem .58rem; border: 1px solid rgba(68,228,181,.25); border-radius: .55rem; color: var(--mint); background: rgba(68,228,181,.06); font-size: .65rem; }
      .attachment-chip.show { display: flex; }
      .attachment-chip span { max-width: 16rem; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
      .attachment-chip button { border: 0; color: var(--muted); background: transparent; cursor: pointer; }
      .compose-row { display: grid; grid-template-columns: auto minmax(0,1fr) auto; gap: .55rem; align-items: end; }
      .compose-row textarea { width: 100%; min-height: 46px; max-height: 150px; resize: none; padding: .75rem .85rem; border: 1px solid var(--line); border-radius: .8rem; outline: 0; color: var(--text); background: rgba(255,255,255,.025); line-height: 1.5; }
      .compose-row textarea:focus { border-color: rgba(102,92,255,.6); box-shadow: 0 0 0 3px rgba(102,92,255,.08); }
      .compose-note { margin: .48rem 0 0; color: #6f7d99; text-align: center; font-size: .58rem; }
      .context-panel { display: flex; flex-direction: column; gap: 1rem; }
      .context-card { padding: 1rem; }
      .context-card h3 { margin: 0 0 .8rem; font-size: .82rem; }
      .context-card p { margin: 0; color: var(--muted); font-size: .7rem; line-height: 1.55; }
      .source-item { display: flex; align-items: center; gap: .6rem; padding: .68rem 0; border-top: 1px solid var(--line); }
      .source-item:first-of-type { border-top: 0; }
      .file-icon { display: grid; place-items: center; width: 2rem; height: 2rem; flex: 0 0 auto; border-radius: .6rem; color: var(--cyan); background: rgba(89,216,255,.08); font-size: .63rem; font-weight: 750; }
      .source-item strong, .source-item span { display: block; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
      .source-item strong { font-size: .68rem; }.source-item span { margin-top: .18rem; color: var(--muted); font-size: .58rem; }
      .coach-tip { border-color: rgba(68,228,181,.2); background: linear-gradient(145deg, rgba(12,47,51,.75), rgba(8,28,43,.9)); }
      .coach-tip .tip-label { color: var(--mint); font-size: .64rem; font-weight: 750; }
      .metric-grid { display: grid; grid-template-columns: repeat(4, minmax(0,1fr)); gap: .8rem; margin-bottom: 1rem; }
      .metric-card { padding: 1rem; }
      .metric-card small, .metric-card strong, .metric-card span { display: block; }
      .metric-card small { color: var(--muted); font-size: .65rem; }.metric-card strong { margin-top: .5rem; font-size: 1.35rem; }.metric-card span { margin-top: .25rem; color: var(--mint); font-size: .62rem; }
      .planner-layout { display: grid; grid-template-columns: minmax(300px,.82fr) minmax(420px,1.35fr); gap: 1rem; }
      .panel-pad { padding: 1rem; }
      .panel-title { display: flex; align-items: center; justify-content: space-between; gap: .75rem; margin-bottom: .85rem; }
      .panel-title h2 { margin: 0; font-size: .9rem; }.panel-title span { color: var(--muted); font-size: .65rem; }
      .planner-task { display: grid; grid-template-columns: auto minmax(0,1fr) auto; align-items: center; gap: .7rem; padding: .78rem 0; border-top: 1px solid var(--line); }
      .planner-task:first-child { border-top: 0; }
      .task-check { width: 1.45rem; height: 1.45rem; display: grid; place-items: center; border: 1px solid rgba(68,228,181,.42); border-radius: 50%; color: transparent; background: transparent; cursor: pointer; }
      .planner-task.done .task-check { color: #05241a; background: var(--mint); }.planner-task.done .task-title { text-decoration: line-through; opacity: .55; }
      .task-title { display: block; font-size: .73rem; }.task-details { display: block; margin-top: .22rem; color: var(--muted); font-size: .6rem; }
      .task-tag { padding: .35rem .48rem; border-radius: .45rem; color: var(--primary-2); background: rgba(102,92,255,.1); font-size: .58rem; }
      .week-grid { display: grid; grid-template-columns: repeat(7, minmax(48px,1fr)); gap: .45rem; min-height: 330px; }
      .day-column { padding: .65rem .45rem; border: 1px solid var(--line); border-radius: .8rem; background: rgba(255,255,255,.015); }
      .day-column.today { border-color: rgba(102,92,255,.48); background: rgba(102,92,255,.06); }
      .day-column b, .day-column small { display: block; text-align: center; }.day-column b { font-size: .68rem; }.day-column small { margin-top: .16rem; color: var(--muted); font-size: .58rem; }
      .schedule-block { margin-top: .7rem; padding: .5rem .35rem; border-left: 2px solid var(--primary); border-radius: .3rem; background: rgba(102,92,255,.11); font-size: .55rem; line-height: 1.45; }
      .schedule-block.mint { border-color: var(--mint); background: rgba(68,228,181,.08); }.schedule-block.cyan { border-color: var(--cyan); background: rgba(89,216,255,.07); }
      .analytics-grid { display: grid; grid-template-columns: .8fr 1.35fr; gap: 1rem; }
      .analytics-grid .wide { grid-column: 1 / -1; }
      .donut-wrap { display: grid; grid-template-columns: 9rem minmax(0,1fr); align-items: center; gap: 1rem; }
      .donut { position: relative; display: grid; place-items: center; width: 8.5rem; height: 8.5rem; border-radius: 50%; background: rgba(255,255,255,.08); }
      .donut::after { content: ""; position: absolute; inset: 1.05rem; border-radius: 50%; background: #0b1932; }
      .donut strong { position: relative; z-index: 1; font-size: 1.25rem; }.donut strong small { display: block; margin-top: .15rem; color: var(--muted); font-size: .52rem; font-weight: 500; text-align: center; }
      .legend { display: grid; gap: .65rem; }.legend-row { display: grid; grid-template-columns: auto minmax(0,1fr) auto; gap: .5rem; align-items: center; font-size: .65rem; }.legend-dot { width: .48rem; height: .48rem; border-radius: 50%; }.legend-row span { color: var(--muted); }.legend-row b { font-size: .65rem; }
      .bar-chart { min-height: 190px; display: flex; align-items: flex-end; justify-content: space-around; gap: .65rem; padding: 1rem .4rem 0; border-bottom: 1px solid var(--line); background: repeating-linear-gradient(to top, transparent 0 43px, rgba(143,155,181,.1) 44px); }
      .bar-item { height: 170px; flex: 1; display: flex; flex-direction: column; justify-content: flex-end; align-items: center; gap: .45rem; }
      .bar { width: min(2rem, 60%); height: var(--h); border-radius: .45rem .45rem .1rem .1rem; background: linear-gradient(to top, #5042d8, #8176ff); box-shadow: 0 0 18px rgba(102,92,255,.18); }
      .bar-item:nth-child(6) .bar { background: linear-gradient(to top,#28aa85,#59e4be); }.bar-item small { color: var(--muted); font-size: .56rem; }
      .heatmap { display: grid; grid-template-columns: 3.2rem repeat(12, 1fr); gap: .32rem; align-items: center; }
      .heat-label { color: var(--muted); font-size: .58rem; }.heat-cell { aspect-ratio: 1; border-radius: .25rem; background: rgba(102,92,255,var(--heat)); }.heat-cell:hover { outline: 1px solid var(--primary-2); transform: scale(1.08); }
      .weak-topic { display: grid; grid-template-columns: minmax(0,1fr) auto; gap: .65rem; align-items: center; padding: .7rem 0; border-top: 1px solid var(--line); }.weak-topic:first-of-type { border: 0; }.weak-topic strong { display: block; font-size: .7rem; }.weak-topic span { display: block; margin-top: .2rem; color: var(--muted); font-size: .58rem; }.weak-topic b { color: var(--warning); font-size: .68rem; }
      .upload-zone { display: grid; place-items: center; min-height: 180px; padding: 1.3rem; border: 1px dashed rgba(102,92,255,.45); border-radius: var(--radius); color: var(--muted); background: rgba(102,92,255,.035); text-align: center; cursor: pointer; transition: .2s; }
      .upload-zone:hover, .upload-zone.drag { border-color: var(--primary-2); background: rgba(102,92,255,.08); }.upload-zone .spark-badge { margin-bottom: .7rem; }.upload-zone strong { color: var(--text); font-size: .82rem; }.upload-zone span { margin-top: .35rem; font-size: .65rem; }
      .file-grid { display: grid; grid-template-columns: repeat(3, minmax(0,1fr)); gap: .8rem; margin-top: 1rem; }
      .file-card { min-width: 0; padding: 1rem; }.file-card-top { display: flex; align-items: center; justify-content: space-between; gap: .5rem; }.file-card h3 { margin: .85rem 0 .35rem; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: .74rem; }.file-card p { margin: 0; color: var(--muted); font-size: .6rem; }.file-actions { display: flex; gap: .4rem; margin-top: .8rem; }.file-actions button { flex: 1; min-height: 36px; padding: .4rem; border: 1px solid var(--line); border-radius: .55rem; color: var(--muted); background: transparent; font-size: .6rem; cursor: pointer; }.file-actions button:hover { color: var(--text); border-color: rgba(102,92,255,.4); }
      .privacy-note { display: flex; align-items: center; gap: .55rem; margin-top: .75rem; color: var(--muted); font-size: .62rem; }.privacy-note .icon { color: var(--mint); }
      .settings-layout { display: grid; grid-template-columns: minmax(0,1fr) minmax(250px,.6fr); gap: 1rem; }.settings-section { padding: 1rem; }.settings-section h2 { margin: 0 0 1rem; font-size: .9rem; }.form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: .8rem; }.field { display: grid; gap: .35rem; }.field.full { grid-column: 1 / -1; }.field label { color: var(--muted); font-size: .64rem; }.field input, .field select, .field textarea { width: 100%; min-height: 44px; padding: .68rem .75rem; border: 1px solid var(--line); border-radius: .7rem; outline: 0; color: var(--text); background: #0a1831; }.field input:focus, .field select:focus { border-color: rgba(102,92,255,.58); }.setting-row { display: flex; align-items: center; justify-content: space-between; gap: 1rem; padding: .8rem 0; border-top: 1px solid var(--line); }.setting-row:first-of-type { border: 0; }.setting-row strong { display: block; font-size: .72rem; }.setting-row span { display: block; margin-top: .2rem; color: var(--muted); font-size: .6rem; line-height: 1.4; }.switch { position: relative; width: 2.65rem; height: 1.45rem; flex: 0 0 auto; }.switch input { position: absolute; opacity: 0; }.switch i { position: absolute; inset: 0; border-radius: 999px; background: rgba(255,255,255,.12); cursor: pointer; transition: .2s; }.switch i::after { content:""; position:absolute; width:1.05rem; height:1.05rem; left:.2rem; top:.2rem; border-radius:50%; background:#8b96ad; transition:.2s; }.switch input:checked + i { background: rgba(68,228,181,.22); }.switch input:checked + i::after { transform: translateX(1.2rem); background: var(--mint); }
      dialog { width: min(32rem, calc(100vw - 2rem)); padding: 0; border: 1px solid var(--line); border-radius: 1rem; color: var(--text); background: #0a1830; box-shadow: 0 30px 90px rgba(0,0,0,.5); }.dialog-inner { padding: 1rem; }dialog::backdrop { background: rgba(0,0,0,.68); backdrop-filter: blur(4px); }.dialog-head { display:flex; align-items:center; justify-content:space-between; gap:1rem; margin-bottom:1rem; }.dialog-head h2 { margin:0; font-size: .95rem; }.dialog-actions { display:flex; justify-content:flex-end; gap:.55rem; margin-top:1rem; }
      .toast { position: fixed; right: 1.25rem; bottom: 1.25rem; z-index: 60; max-width: min(23rem, calc(100vw - 2rem)); display: flex; align-items: flex-start; gap: .65rem; padding: .8rem 1rem; border: 1px solid rgba(68,228,181,.28); border-radius: .85rem; color: var(--text); background: rgba(9,24,42,.96); box-shadow: var(--shadow); opacity: 0; transform: translateY(1rem); pointer-events: none; transition: .25s var(--ease); }
      .toast.show { opacity: 1; transform: translateY(0); }
      .toast .icon { color: var(--mint); margin-top: .05rem; }
      .toast span { color: var(--muted); font-size: .78rem; line-height: 1.5; }
      .account-loading { position: fixed; inset: 0; z-index: 80; display: grid; place-items: center; padding: 1.5rem; background: rgba(5,13,28,.96); backdrop-filter: blur(18px); transition: opacity .25s; }
      .account-loading.hidden { opacity: 0; pointer-events: none; }
      .loading-card { width: min(26rem,100%); padding: 1.5rem; text-align: center; }
      .loading-orb { width: 3rem; height: 3rem; margin: 0 auto 1rem; border: 3px solid rgba(139,124,255,.18); border-top-color: var(--primary-2); border-radius: 50%; animation: spin .8s linear infinite; }
      .account-card { display: grid; gap: .55rem; }
      .account-card strong { font-size: .84rem; }
      .account-card > span { color: var(--muted); font-size: .68rem; word-break: break-all; }
      @keyframes spin { to { transform: rotate(360deg); } }
      .mobile-overlay { display: none; }
      @media (max-width: 1050px) {
        .dashboard-grid { grid-template-columns: repeat(2, minmax(0,1fr)); }
        .chart-card { grid-column: 1 / -1; }
        .assistant-layout { grid-template-columns: 1fr; }.context-panel { display: grid; grid-template-columns: 1fr 1fr; }.chat-panel { min-height: 620px; }
        .metric-grid { grid-template-columns: repeat(2,1fr); }.planner-layout, .settings-layout { grid-template-columns: 1fr; }.file-grid { grid-template-columns: repeat(2,minmax(0,1fr)); }
      }
      @media (max-width: 760px) {
        :root { --sidebar: 0px; }
        .app-shell { display: block; }
        .sidebar { position: fixed; left: 0; top: 0; width: min(82vw, 280px); transform: translateX(-105%); transition: transform .25s var(--ease); box-shadow: 30px 0 70px rgba(0,0,0,.38); }
        body.menu-open .sidebar { transform: translateX(0); }
        .mobile-overlay { position: fixed; inset: 0; z-index: 15; display: block; border: 0; background: rgba(0,0,0,.5); opacity: 0; pointer-events: none; transition: opacity .2s; }
        body.menu-open .mobile-overlay { opacity: 1; pointer-events: auto; }
        .main { padding: 1rem 1rem 5.5rem; }
        .mobile-menu { display: grid; }
        .topbar { align-items: center; }
        .topbar > div:first-child { display: flex; align-items: center; gap: .7rem; }
        .eyebrow { display: none; }
        .date-chip { width: 44px; height: 44px; justify-content: center; padding: 0; }
        .date-chip span { display: none; }
        .ai-composer { grid-template-columns: auto minmax(0,1fr); min-height: 136px; padding: 1rem; }
        .spark-badge { width: 2.7rem; height: 2.7rem; }
        .send-button { grid-column: 1 / -1; width: 100%; }
        .dashboard-grid { grid-template-columns: 1fr; }
        .chart-card, .mastery { grid-column: auto; }
        .mastery-grid { grid-template-columns: 1fr; }
        .page-head { align-items: flex-start; }.page-head .primary-button { flex: 0 0 auto; }.context-panel { grid-template-columns: 1fr; }.metric-grid { grid-template-columns: 1fr 1fr; }.planner-layout { display: block; }.planner-layout > * + * { margin-top: 1rem; }.week-grid { overflow-x: auto; grid-template-columns: repeat(7, 76px); }.analytics-grid { grid-template-columns: 1fr; }.analytics-grid .wide { grid-column: auto; }.file-grid { grid-template-columns: 1fr; }.form-grid { grid-template-columns: 1fr; }.field.full { grid-column: auto; }
      }
      @media (max-width: 430px) {
        h1 { font-size: 1.45rem; }
        .main { padding-inline: .75rem; }
        .ai-composer { border-radius: 16px; }
        .chart-summary { grid-template-columns: 1fr; gap: .65rem; }
        .summary-stat + .summary-stat { padding: .65rem 0 0; border-left: 0; border-top: 1px solid var(--line); }
        .page-head { display: block; }.page-head .primary-button { width: 100%; margin-top: .8rem; }.metric-grid { grid-template-columns: 1fr; }.donut-wrap { grid-template-columns: 1fr; justify-items: center; }.legend { width:100%; }.heatmap { grid-template-columns: 2.8rem repeat(12, 1fr); gap: .2rem; }.compose-row { grid-template-columns: auto minmax(0,1fr); }.compose-row .primary-button { grid-column:1/-1; }.context-panel { display:none; }
      }
      @media (prefers-reduced-motion: reduce) {
        *, *::before, *::after { scroll-behavior: auto !important; animation-duration: .01ms !important; transition-duration: .01ms !important; }
      }
    </style>
  </head>
  <body>
    <a class="skip-link" href="#main">მთავარ კონტენტზე გადასვლა</a>
    <svg width="0" height="0" aria-hidden="true" style="position:absolute">
      <symbol id="i-home" viewBox="0 0 24 24"><path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z"/></symbol>
      <symbol id="i-chat" viewBox="0 0 24 24"><path d="M20 15a4 4 0 0 1-4 4H8l-5 3 1.5-5A8 8 0 1 1 20 15Z"/></symbol>
      <symbol id="i-calendar" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/></symbol>
      <symbol id="i-chart" viewBox="0 0 24 24"><path d="M4 20V10M10 20V4M16 20v-7M22 20V7"/></symbol>
      <symbol id="i-book" viewBox="0 0 24 24"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V4H6.5A2.5 2.5 0 0 0 4 6.5z"/><path d="M4 6.5v13M8 8h8"/></symbol>
      <symbol id="i-settings" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06-2.83 2.83-.06-.06a1.7 1.7 0 0 0-1.88-.34 1.7 1.7 0 0 0-1.03 1.56V21h-4v-.08A1.7 1.7 0 0 0 9 19.37a1.7 1.7 0 0 0-1.88.34l-.06.06-2.83-2.83.06-.06A1.7 1.7 0 0 0 4.63 15 1.7 1.7 0 0 0 3.07 14H3v-4h.08A1.7 1.7 0 0 0 4.63 9a1.7 1.7 0 0 0-.34-1.88l-.06-.06 2.83-2.83.06.06A1.7 1.7 0 0 0 9 4.63h.01A1.7 1.7 0 0 0 10 3.07V3h4v.08A1.7 1.7 0 0 0 15 4.63a1.7 1.7 0 0 0 1.88-.34l.06-.06 2.83 2.83-.06.06A1.7 1.7 0 0 0 19.37 9v.01A1.7 1.7 0 0 0 20.93 10H21v4h-.08A1.7 1.7 0 0 0 19.4 15Z"/></symbol>
      <symbol id="i-spark" viewBox="0 0 24 24"><path d="m12 3 1.2 3.8L17 8l-3.8 1.2L12 13l-1.2-3.8L7 8l3.8-1.2zM18 13l.8 2.2L21 16l-2.2.8L18 19l-.8-2.2L15 16l2.2-.8zM6 14l.7 1.8 1.8.7-1.8.7L6 19l-.7-1.8-1.8-.7 1.8-.7z"/></symbol>
      <symbol id="i-send" viewBox="0 0 24 24"><path d="m22 2-7 20-4-9-9-4zM22 2 11 13"/></symbol>
      <symbol id="i-brain" viewBox="0 0 24 24"><path d="M9.5 4.5A3.5 3.5 0 0 0 6 8v.3A3.5 3.5 0 0 0 4 14a3.5 3.5 0 0 0 5.5 3V5ZM14.5 4.5A3.5 3.5 0 0 1 18 8v.3A3.5 3.5 0 0 1 20 14a3.5 3.5 0 0 1-5.5 3V5ZM9.5 9H7M14.5 9H17M9.5 14H7.5M14.5 14h2"/></symbol>
      <symbol id="i-more" viewBox="0 0 24 24"><circle cx="12" cy="5" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="12" cy="19" r="1"/></symbol>
      <symbol id="i-check" viewBox="0 0 24 24"><path d="m5 12 4 4L19 6"/></symbol>
      <symbol id="i-database" viewBox="0 0 24 24"><ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6"/></symbol>
      <symbol id="i-clock" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></symbol>
      <symbol id="i-trend" viewBox="0 0 24 24"><path d="m3 17 6-6 4 4 8-9M15 6h6v6"/></symbol>
      <symbol id="i-menu" viewBox="0 0 24 24"><path d="M4 7h16M4 12h16M4 17h16"/></symbol>
    </svg>
    <div class="app-shell">
      <aside class="sidebar" id="sidebar" aria-label="მთავარი ნავიგაცია">
        <a class="brand" href="#dashboard" aria-label="Studia AI მთავარი">
          <span class="brand-mark"><svg class="icon"><use href="#i-brain"/></svg></span>
          <strong>Studia <em>AI</em></strong>
        </a>
        <nav class="nav">
          <button class="nav-button active" data-page="dashboard"><svg class="icon"><use href="#i-home"/></svg><span>მთავარი</span></button>
          <button class="nav-button" data-page="assistant"><svg class="icon"><use href="#i-chat"/></svg><span>AI ასისტენტი</span><i class="nav-dot"></i></button>
          <button class="nav-button" data-page="planner"><svg class="icon"><use href="#i-calendar"/></svg><span>სასწავლო გეგმა</span></button>
          <button class="nav-button" data-page="analytics"><svg class="icon"><use href="#i-chart"/></svg><span>პროგრესი</span></button>
          <button class="nav-button" data-page="library"><svg class="icon"><use href="#i-book"/></svg><span>ჩემი მასალები</span></button>
          <button class="nav-button" data-page="settings"><svg class="icon"><use href="#i-settings"/></svg><span>პარამეტრები</span></button>
        </nav>
        <div class="sidebar-foot">
          <button class="profile-chip" type="button" data-page="settings">
            <span class="avatar">ნ</span>
            <span class="profile-copy"><strong>ნინო მაისურაძე</strong><span>კომპიუტერული მეცნიერება</span></span>
            <span aria-hidden="true">⌄</span>
          </button>
        </div>
      </aside>
      <button class="mobile-overlay" type="button" aria-label="მენიუს დახურვა"></button>
      <main class="main" id="main">
        <section class="page active" id="page-dashboard" data-title="მთავარი">
        <header class="topbar">
          <div>
            <button class="mobile-menu" type="button" aria-label="მენიუს გახსნა" aria-controls="sidebar"><svg class="icon"><use href="#i-menu"/></svg></button>
            <div><p class="eyebrow">მშვიდი ტემპი, მკაფიო პროგრესი</p><h1>გამარჯობა, ნინო <span aria-hidden="true">👋</span></h1></div>
          </div>
          <div class="date-chip"><svg class="icon"><use href="#i-calendar"/></svg><span id="currentDate"></span></div>
        </header>

        <section class="ai-composer" aria-labelledby="ask-title">
          <div class="spark-badge"><svg class="icon"><use href="#i-spark"/></svg></div>
          <div class="composer-copy">
            <label id="ask-title" for="quickQuestion">რას ვისწავლით დღეს?</label>
            <input id="quickQuestion" autocomplete="off" placeholder="დამიწერე კითხვა ან ატვირთე სასწავლო მასალა">
          </div>
          <button class="send-button" id="quickSend" type="button"><svg class="icon"><use href="#i-send"/></svg><span>დაწყება</span></button>
        </section>
        <div class="quick-prompts" aria-label="სწრაფი მოქმედებები">
          <button class="prompt-pill" type="button">📖 თემის ახსნა</button>
          <button class="prompt-pill" type="button">✦ კონსპექტის შექმნა</button>
          <button class="prompt-pill" type="button">✓ ტესტის გენერირება</button>
          <button class="prompt-pill" type="button">🗓 კვირის დაგეგმვა</button>
        </div>

        <div class="dashboard-grid">
          <section class="card" aria-labelledby="today-title">
            <header class="card-header"><svg class="icon"><use href="#i-calendar"/></svg><h2 id="today-title">დღევანდელი გეგმა</h2><button class="more" type="button" data-page="planner" aria-label="სასწავლო გეგმის ნახვა"><svg class="icon"><use href="#i-more"/></svg></button></header>
            <div class="tasks" id="dashboardTasks"></div>
            <button class="card-link" type="button" data-page="planner">გეგმის ნახვა <span>→</span></button>
          </section>

          <section class="card" aria-labelledby="exam-title">
            <header class="card-header"><svg class="icon" style="color:var(--primary-2)"><use href="#i-book"/></svg><h2 id="exam-title">მომავალი გამოცდა</h2><button class="more" type="button" data-page="planner" aria-label="გამოცდების გეგმის ნახვა"><svg class="icon"><use href="#i-more"/></svg></button></header>
            <div class="exam-content">
              <div class="subject-orb"><svg class="icon"><use href="#i-database"/></svg></div>
              <h3 id="examSubject">გამოცდა არ არის დამატებული</h3>
              <p id="examDateText">დაამატე გამოცდის თარიღი სასწავლო გეგმაში</p>
              <div class="countdown" id="examCountdown" aria-label="გამოცდამდე დარჩენილი დრო"><span><strong>—</strong><small>დღე</small></span><span><strong>—</strong><small>საათი</small></span><span><strong>—</strong><small>წუთი</small></span><span><strong>—</strong><small>წამი</small></span></div>
              <button class="outline-button" type="button" id="examAction">გამოცდის დამატება</button>
            </div>
          </section>

          <section class="card chart-card" aria-labelledby="chart-title">
            <header class="card-header"><svg class="icon" style="color:var(--primary-2)"><use href="#i-trend"/></svg><h2 id="chart-title">კვირის პროგრესი</h2><select class="chart-select" id="dashboardPeriod" aria-label="პერიოდი"><option value="current">ეს კვირა</option><option value="previous">წინა კვირა</option></select></header>
            <div class="chart-wrap">
              <svg id="weeklyChartSvg" viewBox="0 0 430 190" role="img" aria-label="კვირის სწავლის დრო">
              </svg>
            </div>
            <div class="chart-summary"><div class="summary-stat"><span class="stat-icon"><svg class="icon"><use href="#i-clock"/></svg></span><span><small id="chartTotalLabel">სულ ამ კვირაში · ცოცხალი</small><strong id="chartTotal">0 წმ</strong></span></div><div class="summary-stat"><span class="stat-icon"><svg class="icon"><use href="#i-trend"/></svg></span><span><small>წინა კვირასთან შედარებით</small><strong class="positive" id="chartDelta">ჯერ მონაცემი არ არის</strong></span></div></div>
          </section>

          <section class="card mastery" aria-labelledby="mastery-title">
            <header class="card-header"><svg class="icon" style="color:var(--primary-2)"><use href="#i-chart"/></svg><h2 id="mastery-title">საგნების შესრულების პროგრესი</h2><button class="card-link" style="width:auto;margin:0 0 0 auto" type="button" data-page="analytics">ყველას ნახვა →</button></header>
            <div class="mastery-grid" id="masteryGrid"></div>
          </section>
        </div>
        </section>

        <section class="page" id="page-assistant" data-title="AI ასისტენტი">
          <header class="page-head">
            <div><h1>AI ასისტენტი</h1><p>მიიღე ახსნა, იმუშავე საკუთარ მასალებზე და შეამოწმე ცოდნა ქართულად.</p></div>
            <span class="status-chip"><span style="width:.45rem;height:.45rem;border-radius:50%;background:var(--mint)"></span> უსაფრთხო სესია</span>
          </header>
          <div class="assistant-layout">
            <section class="card chat-panel" aria-label="AI ჩატი">
              <div class="chat-toolbar" role="tablist" aria-label="ასისტენტის რეჟიმი">
                <button class="mode-button active" type="button" data-mode="explain">ახსნა</button>
                <button class="mode-button" type="button" data-mode="tutor">ტუტორი</button>
                <button class="mode-button" type="button" data-mode="quiz">ტესტი</button>
                <button class="mode-button" type="button" data-mode="summary">კონსპექტი</button>
                <span class="ai-status" id="aiStatus">დემო რეჟიმი</span>
              </div>
              <div class="messages" id="messages" aria-live="polite">
                <div class="message">
                  <span class="message-avatar"><svg class="icon"><use href="#i-spark"/></svg></span>
                  <div><div class="bubble">გამარჯობა! მე ვარ შენი AI სასწავლო პარტნიორი. შემიძლია რთული თემა მარტივად აგიხსნა, კითხვებით მიგიყვანო პასუხამდე, შეგიქმნა ტესტი ან შენს მასალაზე დაყრდნობით მოვამზადო კონსპექტი. რით დავიწყოთ?</div><div class="message-meta">Studia AI · ახლა</div></div>
                </div>
              </div>
              <div class="chat-compose">
                <div class="attachment-chip" id="attachmentChip"><svg class="icon"><use href="#i-book"/></svg><span></span><button type="button" id="removeAttachment" aria-label="ფაილის მოცილება">×</button></div>
                <div class="compose-row">
                  <button class="icon-button" type="button" id="attachButton" aria-label="ფაილის ატვირთვა"><svg class="icon"><use href="#i-book"/></svg></button>
                  <textarea id="chatInput" rows="1" maxlength="8000" placeholder="დაწერე კითხვა ქართულად..."></textarea>
                  <button class="primary-button" type="button" id="chatSend"><svg class="icon"><use href="#i-send"/></svg> გაგზავნა</button>
                </div>
                <input id="chatFile" type="file" hidden accept=".pdf,.docx,.pptx,.txt,.md,.csv,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.openxmlformats-officedocument.presentationml.presentation,text/plain,text/markdown,text/csv">
                <p class="compose-note">AI შეიძლება შეცდეს — მნიშვნელოვანი ინფორმაცია გადაამოწმე პირველწყაროში.</p>
              </div>
            </section>
            <aside class="context-panel" aria-label="სასწავლო კონტექსტი">
              <section class="card context-card"><h3>აქტიური მასალა</h3><div class="source-item"><span class="file-icon" id="activeMaterialType">—</span><span><strong id="activeMaterialName">მასალა არ არის არჩეული</strong><span id="activeMaterialMeta">მიამაგრე PDF, DOCX, PPTX ან ტექსტური ფაილი</span></span></div><button class="secondary-button" type="button" id="contextUpload" style="width:100%;margin-top:.6rem">მასალის არჩევა</button></section>
              <section class="card context-card coach-tip"><span class="tip-label">AI COACH-ის რჩევა</span><h3 id="coachTitle" style="margin-top:.65rem">ერთი პატარა ნაბიჯით დაიწყე</h3><p id="coachText">დაამატე პირველი დავალება და დასრულების შემდეგ აქ პერსონალური რჩევა გამოჩნდება.</p><button class="secondary-button" type="button" id="coachAction" data-prompt="დამეხმარე პირველი სასწავლო დავალების დაგეგმვაში" style="width:100%;margin-top:.8rem">დაგეგმვაში დახმარება</button></section>
              <section class="card context-card"><h3>ამ კვირის მიზანი</h3><div style="display:flex;align-items:end;justify-content:space-between"><strong style="font-size:1.25rem" id="weeklyGoalValue">0 / 10 სთ</strong><span style="color:var(--mint);font-size:.7rem" id="weeklyGoalPercent">0%</span></div><span class="progress-track" style="height:6px;margin-top:.7rem"><i id="weeklyGoalBar" style="--value:0%"></i></span><p style="margin-top:.7rem" id="weeklyGoalNote">დაიწყე პირველი სასწავლო დავალებით.</p></section>
            </aside>
          </div>
        </section>

        <section class="page" id="page-planner" data-title="სასწავლო გეგმა">
          <header class="page-head"><div><h1>სასწავლო გეგმა</h1><p>დაალაგე დავალებები, დრო და გამოცდების ვადები ერთ სივრცეში.</p></div><div style="display:flex;gap:.55rem;flex-wrap:wrap"><button class="secondary-button" id="addExamButton" type="button">გამოცდის დამატება</button><button class="primary-button" id="addTaskButton" type="button">＋ ახალი დავალება</button></div></header>
          <div class="metric-grid">
            <section class="card metric-card"><small>დღეს დაგეგმილი</small><strong id="todayPlanned">0 წთ</strong><span id="todayCompleted">0 წთ შესრულებულია</span></section>
            <section class="card metric-card"><small>აქტიური დავალება</small><strong id="openTaskCount">0</strong><span id="taskCompletionNote">დაამატე პირველი დავალება</span></section>
            <section class="card metric-card"><small>შემდეგი გამოცდა</small><strong id="nextExamDays">—</strong><span id="nextExamSubject">გამოცდა არ არის დამატებული</span></section>
            <section class="card metric-card"><small>კვირის დატვირთვა</small><strong id="weeklyLoad">0%</strong><span id="weeklyLoadNote">გეგმა ჯერ ცარიელია</span></section>
          </div>
          <div class="planner-layout">
            <section class="card panel-pad"><div class="panel-title"><h2>პრიორიტეტული დავალებები</h2><span>დღეს</span></div><div id="plannerTasks"></div></section>
            <section class="card panel-pad"><div class="panel-title"><h2>კვირის განრიგი</h2><span id="weekRange"></span></div><div class="week-grid" id="weekGrid" aria-label="კვირის სასწავლო განრიგი"></div></section>
          </div>
        </section>

        <section class="page" id="page-analytics" data-title="პროგრესი">
          <header class="page-head"><div><h1>სწავლის ანალიტიკა</h1><p>ნახე სად იხარჯება დრო, რომელი საგნები საჭიროებს ყურადღებას და როგორ სრულდება გეგმა.</p></div><select class="chart-select" id="analyticsPeriod" aria-label="ანალიტიკის პერიოდი"><option value="30">ბოლო 30 დღე</option><option value="semester">ეს სემესტრი</option></select></header>
          <div class="metric-grid"><section class="card metric-card"><small>სწავლის დრო</small><strong id="analyticsTime">0 წმ</strong><span id="analyticsTimeNote">ხილულ ტაბში გატარებული დრო</span></section><section class="card metric-card"><small>დასრულებული დავალება</small><strong id="analyticsDone">0</strong><span id="analyticsDoneNote">ჯერ არცერთი</span></section><section class="card metric-card"><small>აქტიური დღე</small><strong id="analyticsDays">0</strong><span id="analyticsDaysNote">ბოლო 30 დღეში</span></section><section class="card metric-card"><small>გეგმის შესრულება</small><strong id="analyticsCompletion">0%</strong><span id="analyticsCompletionNote">დაიწყე პირველი დავალებით</span></section></div>
          <div class="analytics-grid">
            <section class="card panel-pad"><div class="panel-title"><h2>დრო საგნების მიხედვით</h2><span id="subjectTimeTotal">0 წთ</span></div><div class="donut-wrap"><div class="donut" id="subjectDonut"><strong id="donutValue">0%<small>გეგმა</small></strong></div><div class="legend" id="subjectLegend"></div></div></section>
            <section class="card panel-pad"><div class="panel-title"><h2>დღიური აქტივობა</h2><span id="dailyAverage">საშუალოდ 0 წთ</span></div><div class="bar-chart" id="activityBars" role="img" aria-label="ბოლო შვიდი დღის აქტივობის სვეტოვანი დიაგრამა"></div></section>
            <section class="card panel-pad wide"><div class="panel-title"><h2>სწავლის რიტმი</h2><span>საათები × კვირები</span></div><div class="heatmap" id="heatmap" aria-label="სწავლის აქტივობის სითბური რუკა"></div></section>
            <section class="card panel-pad"><div class="panel-title"><h2>გასაუმჯობესებელი საგნები</h2><span>გეგმის მიხედვით</span></div><div id="weakTopics"></div></section>
            <section class="card context-card coach-tip"><span class="tip-label">შემდეგი რეკომენდებული მოქმედება</span><h3 id="nextActionTitle" style="margin-top:.7rem">შექმენი პირველი სასწავლო მიზანი</h3><p id="nextActionText">რეკომენდაცია შენს რეალურ დავალებებსა და დასრულების მაჩვენებელზე დაყრდნობით განახლდება.</p><button class="primary-button" type="button" id="nextActionButton" data-prompt="დამეხმარე პირველი სასწავლო მიზნის ჩამოყალიბებაში" style="width:100%;margin-top:1rem">AI-სთან დაგეგმვა</button></section>
          </div>
        </section>

        <section class="page" id="page-library" data-title="ჩემი მასალები">
          <header class="page-head"><div><h1>ჩემი მასალები</h1><p>დაამატე ლექციები, სლაიდები და ჩანაწერები; AI პასუხს ატვირთულ კონტექსტზე დააფუძნებს.</p></div><button class="primary-button" type="button" id="libraryUploadButton"><svg class="icon"><use href="#i-book"/></svg> ფაილის დამატება</button></header>
          <label class="upload-zone" id="uploadZone" for="libraryFile"><span class="spark-badge"><svg class="icon"><use href="#i-book"/></svg></span><strong>ჩააგდე ფაილი აქ ან აირჩიე მოწყობილობიდან</strong><span>PDF, DOCX, PPTX, TXT · მაქსიმუმ 8 MB</span></label>
          <input id="libraryFile" type="file" hidden multiple accept=".pdf,.docx,.pptx,.txt,.md,.csv">
          <div class="privacy-note"><svg class="icon"><use href="#i-check"/></svg> ფაილი უსაფრთხოდ ინახება შენს ანგარიშზე; Gemini-ს მხოლოდ „ჰკითხე AI-ს“ ან ჩატში გაგზავნისას გადაეცემა.</div>
          <div class="file-grid" id="fileGrid"></div>
        </section>

        <section class="page" id="page-settings" data-title="პარამეტრები">
          <header class="page-head"><div><h1>პარამეტრები</h1><p>მოარგე პროფილი, AI-ის პასუხები და კონფიდენციალურობის არჩევანი.</p></div><button class="primary-button" type="button" id="saveSettings">ცვლილებების შენახვა</button></header>
          <div class="settings-layout">
            <section class="card settings-section"><h2>სტუდენტის პროფილი</h2><div class="form-grid"><div class="field"><label for="profileName">სახელი და გვარი</label><input id="profileName" placeholder="შენი სახელი"></div><div class="field"><label for="profileUniversity">უნივერსიტეტი</label><input id="profileUniversity" placeholder="უნივერსიტეტი"></div><div class="field"><label for="profileProgram">პროგრამა</label><input id="profileProgram" placeholder="სასწავლო პროგრამა"></div><div class="field"><label for="profileSemester">სემესტრი</label><select id="profileSemester"><option>I სემესტრი</option><option>II სემესტრი</option><option>III სემესტრი</option><option>IV სემესტრი</option><option>V სემესტრი</option><option>VI სემესტრი</option><option>VII სემესტრი</option><option>VIII სემესტრი</option></select></div><div class="field full"><label for="weeklyGoalInput">კვირის სასწავლო მიზანი — საათი</label><input id="weeklyGoalInput" type="number" min="1" max="80" step="0.5" value="10"></div><div class="field full"><label for="responseStyle">AI-ის პასუხის სტილი</label><select id="responseStyle"><option value="balanced">დაბალანსებული — მოკლე ახსნა და მაგალითი</option><option value="brief">მოკლე — მხოლოდ მთავარი</option><option value="deep">დეტალური — ნაბიჯ-ნაბიჯ</option></select></div></div></section>
            <section class="card settings-section"><h2>ქცევა და კონფიდენციალურობა</h2><div class="setting-row"><span><strong>სოკრატული ტუტორი</strong><span>ტუტორის რეჟიმში კითხვებით გეხმარება.</span></span><label class="switch"><input type="checkbox" id="socraticDefault" checked><i></i></label></div><div class="setting-row"><span><strong>ოფლაინ ქეშის შენახვა</strong><span>ანგარიშის მონაცემების ასლს ამ მოწყობილობაზეც ინახავს.</span></span><label class="switch"><input type="checkbox" id="saveProgress" checked><i></i></label></div><div class="setting-row"><span><strong>გამოცდის შეხსენება</strong><span>მთავარ გვერდზე გაჩვენებს მოახლოებულ ვადას.</span></span><label class="switch"><input type="checkbox" id="examReminder" checked><i></i></label></div><div class="setting-row"><span><strong>ქართული ენა</strong><span>ინტერფეისი და AI პასუხები ქართულად.</span></span><span class="status-chip">მთავარი</span></div></section>
            <section class="card settings-section account-card"><h2>Google ანგარიში</h2><strong id="accountName">ანგარიში იტვირთება…</strong><span id="accountEmail"></span><p style="margin:.35rem 0;color:var(--muted);font-size:.66rem;line-height:1.55">გამოცდები, სწავლის დრო, დავალებები და მასალები მხოლოდ ამ დადასტურებულ ელფოსტასთანაა დაკავშირებული.</p><button class="secondary-button" type="button" id="accountSignOut">ანგარიშიდან გასვლა</button></section>
          </div>
        </section>
      </main>
    </div>
    <dialog id="taskDialog"><form method="dialog" class="dialog-inner" id="taskForm"><div class="dialog-head"><h2>ახალი დავალება</h2><button class="icon-button" type="button" data-close-dialog aria-label="დახურვა">×</button></div><div class="form-grid"><div class="field full"><label for="taskName">დავალების სახელი</label><input id="taskName" required maxlength="80" placeholder="მაგ. SQL პრაქტიკული სამუშაო"></div><div class="field"><label for="taskSubject">საგანი</label><input id="taskSubject" required maxlength="40" placeholder="მონაცემთა ბაზები"></div><div class="field"><label for="taskDate">დაგეგმილი დღე</label><input id="taskDate" type="date" required></div><div class="field"><label for="taskTime">ხანგრძლივობა</label><select id="taskTime"><option value="25">25 წუთი</option><option value="45">45 წუთი</option><option value="60">1 საათი</option><option value="90">1.5 საათი</option></select></div></div><div class="dialog-actions"><button class="secondary-button" type="button" data-close-dialog>გაუქმება</button><button class="primary-button" value="default" id="createTask">დამატება</button></div></form></dialog>
    <dialog id="examDialog"><form method="dialog" class="dialog-inner" id="examForm"><div class="dialog-head"><h2>გამოცდის დამატება</h2><button class="icon-button" type="button" data-close-dialog aria-label="დახურვა">×</button></div><div class="form-grid"><div class="field full"><label for="examNameInput">საგანი</label><input id="examNameInput" required maxlength="60" placeholder="მაგ. მონაცემთა ბაზები"></div><div class="field"><label for="examDateInput">თარიღი</label><input id="examDateInput" type="date" required></div><div class="field"><label for="examTimeInput">დრო</label><input id="examTimeInput" type="time" value="10:00" required></div></div><div class="dialog-actions"><button class="secondary-button" type="button" data-close-dialog>გაუქმება</button><button class="primary-button" value="default">შენახვა</button></div></form></dialog>
    <dialog id="migrationDialog"><div class="dialog-inner"><div class="dialog-head"><h2>ძველი მონაცემების გადატანა</h2></div><p style="margin:0;color:var(--muted);font-size:.75rem;line-height:1.65">ამ მოწყობილობაზე არსებული გეგმა და მასალები შეგიძლია დაუკავშირო შენს Google ანგარიშს. ეს არჩევანი მხოლოდ პირველ შესვლაზეა საჭირო.</p><div class="dialog-actions"><button class="secondary-button" type="button" id="startFreshAccount">სუფთად დაწყება</button><button class="primary-button" type="button" id="importDeviceData">ამ მოწყობილობიდან გადატანა</button></div></div></dialog>
    <div class="account-loading" id="accountLoading"><section class="card loading-card"><div class="loading-orb"></div><strong>შენი სასწავლო სივრცე იტვირთება</strong><p style="margin:.6rem 0 0;color:var(--muted);font-size:.72rem">მონაცემები შენს ანგარიშთან უსაფრთხოდ სინქრონდება.</p></section></div>
    <div class="toast" role="status" aria-live="polite"><svg class="icon"><use href="#i-check"/></svg><span></span></div>
    <script>
      (function () {
        var body = document.body;
        var toast = document.querySelector('.toast');
        var toastTimer;
        var currentPage = 'dashboard';
        var currentMode = 'explain';
        var attachment = null;
        var chatHistory = [];
        var sessionFileBlobs = new Map();
        var fileDbPromise = null;
        var serverReady = false;
        var account = null;
        var serverSyncTimer = null;
        var serverSyncInFlight = false;
        var serverSyncDirty = false;
        var storage = {
          get: function (key, fallback) { try { var value = localStorage.getItem(key); return value ? JSON.parse(value) : fallback; } catch (error) { return fallback; } },
          set: function (key, value) { try { localStorage.setItem(key, JSON.stringify(value)); } catch (error) { /* device storage may be disabled */ } },
          remove: function (key) { try { localStorage.removeItem(key); } catch (error) { /* device storage may be disabled */ } }
        };
        function showToast(message) {
          toast.querySelector('span').textContent = message;
          toast.classList.add('show');
          clearTimeout(toastTimer);
          toastTimer = setTimeout(function () { toast.classList.remove('show'); }, 2600);
        }
        function escapeHtml(value) {
          return String(value).replace(/[&<>"']/g, function (character) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }[character]; });
        }
        function openFileDb() {
          if (fileDbPromise) return fileDbPromise;
          fileDbPromise = new Promise(function (resolve) {
            if (!('indexedDB' in window)) { resolve(null); return; }
            var request = indexedDB.open('studia-materials', 1);
            request.onupgradeneeded = function () { if (!request.result.objectStoreNames.contains('files')) request.result.createObjectStore('files', { keyPath: 'id' }); };
            request.onsuccess = function () { resolve(request.result); };
            request.onerror = function () { resolve(null); };
          });
          return fileDbPromise;
        }
        async function storeFileContent(id, file) {
          sessionFileBlobs.set(String(id), file);
          if (profile && profile.progress === false) return false;
          var db = await openFileDb(); if (!db) return false;
          return new Promise(function (resolve) { var tx = db.transaction('files', 'readwrite'); tx.objectStore('files').put({ id: String(id), name: file.name, type: file.type || 'application/octet-stream', blob: file }); tx.oncomplete = function () { resolve(true); }; tx.onerror = function () { resolve(false); }; });
        }
        async function getFileContent(id) {
          var memoryFile = sessionFileBlobs.get(String(id)); if (memoryFile) return memoryFile;
          var db = await openFileDb();
          var localFile = db ? await new Promise(function (resolve) { var tx = db.transaction('files', 'readonly'); var request = tx.objectStore('files').get(String(id)); request.onsuccess = function () { var record = request.result; if (!record || !record.blob) { resolve(null); return; } var file = record.blob instanceof File ? record.blob : new File([record.blob], record.name, { type: record.type }); resolve(file); }; request.onerror = function () { resolve(null); }; }) : null;
          if (localFile) { sessionFileBlobs.set(String(id), localFile); return localFile; }
          if (!serverReady) return null;
          try {
            var response = await fetch('/api/materials/' + encodeURIComponent(String(id)));
            if (!response.ok) return null;
            var metadata = files.find(function (item) { return String(item.id) === String(id); }) || {};
            var remoteFile = new File([await response.blob()], metadata.name || 'მასალა', { type: metadata.mime || response.headers.get('content-type') || 'application/octet-stream' });
            sessionFileBlobs.set(String(id), remoteFile);
            if (profile.progress !== false) await storeFileContent(id, remoteFile);
            return remoteFile;
          } catch (error) { return null; }
        }
        async function removeFileContent(id) {
          sessionFileBlobs.delete(String(id)); var db = await openFileDb(); if (!db) return;
          await new Promise(function (resolve) { var tx = db.transaction('files', 'readwrite'); tx.objectStore('files').delete(String(id)); tx.oncomplete = tx.onerror = function () { resolve(); }; });
        }
        async function clearStoredFileContents() {
          var db = await openFileDb(); if (!db) return;
          await new Promise(function (resolve) { var tx = db.transaction('files', 'readwrite'); tx.objectStore('files').clear(); tx.oncomplete = tx.onerror = function () { resolve(); }; });
        }
        function navigate(page, writeHash) {
          var target = document.querySelector('#page-' + page);
          if (!target) page = 'dashboard';
          currentPage = page;
          document.querySelectorAll('.page').forEach(function (item) { item.classList.toggle('active', item.id === 'page-' + page); });
          document.querySelectorAll('.nav-button').forEach(function (item) { item.classList.toggle('active', item.getAttribute('data-page') === page); });
          body.classList.remove('menu-open');
          if (writeHash !== false && location.hash !== '#' + page) history.pushState(null, '', '#' + page);
          document.title = (document.querySelector('#page-' + page).getAttribute('data-title') || 'Studia AI') + ' — Studia AI';
          document.querySelector('#main').scrollTop = 0;
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        document.querySelectorAll('[data-page]').forEach(function (button) {
          button.addEventListener('click', function () {
            var page = button.getAttribute('data-page');
            navigate(page);
          });
        });
        window.addEventListener('hashchange', function () { navigate(location.hash.slice(1) || 'dashboard', false); });
        document.querySelector('.mobile-menu').addEventListener('click', function () { body.classList.add('menu-open'); });
        document.querySelector('.mobile-overlay').addEventListener('click', function () { body.classList.remove('menu-open'); });
        document.querySelectorAll('.prompt-pill').forEach(function (pill) {
          pill.addEventListener('click', function () { document.querySelector('#quickQuestion').value = pill.textContent.slice(pill.textContent.indexOf(' ') + 1) + ': '; document.querySelector('#quickQuestion').focus(); });
        });
        function submitQuickQuestion() {
          var input = document.querySelector('#quickQuestion');
          if (!input.value.trim()) { input.focus(); showToast('ჯერ დაწერე კითხვა.'); return; }
          navigate('assistant');
          document.querySelector('#chatInput').value = input.value.trim();
          input.value = '';
          document.querySelector('#chatInput').focus();
        }
        document.querySelector('#quickSend').addEventListener('click', submitQuickQuestion);
        document.querySelector('#quickQuestion').addEventListener('keydown', function (event) { if (event.key === 'Enter') submitQuickQuestion(); });

        document.querySelectorAll('.mode-button').forEach(function (button) {
          button.addEventListener('click', function () {
            currentMode = button.getAttribute('data-mode');
            document.querySelectorAll('.mode-button').forEach(function (item) { item.classList.toggle('active', item === button); });
          });
        });
        document.querySelectorAll('[data-prompt]').forEach(function (button) {
          button.addEventListener('click', function () { navigate('assistant'); document.querySelector('#chatInput').value = button.getAttribute('data-prompt'); document.querySelector('#chatInput').focus(); });
        });

        function addMessage(role, text, pending) {
          var messages = document.querySelector('#messages');
          var item = document.createElement('div');
          item.className = 'message' + (role === 'user' ? ' user' : '');
          if (pending) item.id = 'typingMessage';
          var avatar = document.createElement('span');
          avatar.className = 'message-avatar';
          avatar.innerHTML = role === 'user' ? 'ნ' : '<svg class="icon"><use href="#i-spark"/></svg>';
          var content = document.createElement('div');
          var bubble = document.createElement('div');
          bubble.className = 'bubble';
          if (pending) bubble.innerHTML = '<span class="typing-dots"><i></i><i></i><i></i></span>';
          else bubble.textContent = text;
          var meta = document.createElement('div');
          meta.className = 'message-meta';
          meta.textContent = role === 'user' ? 'შენ · ახლა' : 'Studia AI · ახლა';
          content.appendChild(bubble); content.appendChild(meta);
          if (role === 'user') { item.appendChild(content); item.appendChild(avatar); } else { item.appendChild(avatar); item.appendChild(content); }
          messages.appendChild(item);
          messages.scrollTop = messages.scrollHeight;
          return item;
        }
        async function setAttachment(file) {
          if (!file) { attachment = null; document.querySelector('#attachmentChip').classList.remove('show'); document.querySelector('#chatFile').value = ''; renderActiveMaterial(); return true; }
          if (file.size > 8 * 1024 * 1024) { showToast('ფაილი 8 MB-ზე ნაკლები უნდა იყოს.'); return false; }
          var reader = new FileReader();
          return new Promise(function (resolve) {
            reader.onload = function () { attachment = { name: file.name, type: file.type || 'application/octet-stream', data: reader.result }; var chip = document.querySelector('#attachmentChip'); chip.querySelector('span').textContent = file.name; chip.classList.add('show'); renderActiveMaterial(); showToast('მასალა მზადაა AI-სთან გამოსაყენებლად.'); resolve(true); };
            reader.onerror = function () { showToast('ფაილის წაკითხვა ვერ მოხერხდა.'); resolve(false); };
            reader.readAsDataURL(file);
          });
        }
        document.querySelector('#attachButton').addEventListener('click', function () { document.querySelector('#chatFile').click(); });
        document.querySelector('#contextUpload').addEventListener('click', function () { document.querySelector('#chatFile').click(); });
        document.querySelector('#chatFile').addEventListener('change', function (event) { setAttachment(event.target.files[0]); });
        document.querySelector('#removeAttachment').addEventListener('click', function () { setAttachment(null); });

        async function sendChat() {
          var input = document.querySelector('#chatInput');
          var message = input.value.trim();
          if (!message) { input.focus(); return; }
          var send = document.querySelector('#chatSend');
          input.value = ''; input.style.height = 'auto'; send.disabled = true;
          addMessage('user', message);
          var pending = addMessage('assistant', '', true);
          try {
            var response = await fetch('/api/chat', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ message: message, mode: currentMode, history: chatHistory.slice(-8), attachment: attachment, style: profile.style, socratic: profile.socratic }) });
            var result = await response.json();
            if (!response.ok) throw new Error(result.error || 'AI პასუხი ვერ მივიღეთ');
            pending.remove();
            addMessage('assistant', result.text);
            chatHistory.push({ role: 'user', content: message }, { role: 'assistant', content: result.text });
            document.querySelector('#aiStatus').textContent = result.demo ? 'დემო რეჟიმი' : 'Gemini დაკავშირებულია';
            if (result.demo) showToast(result.warning || 'საიტი დემო პასუხს იყენებს. რეალური AI ჩაირთვება API გასაღების დამატებისას.');
            setAttachment(null);
          } catch (error) {
            pending.remove();
            addMessage('assistant', error.message || 'პასუხის მიღება დროებით ვერ მოხერხდა. სცადე ხელახლა რამდენიმე წამში.');
            showToast(error.message);
          } finally { send.disabled = false; input.focus(); }
        }
        document.querySelector('#chatSend').addEventListener('click', sendChat);
        document.querySelector('#chatInput').addEventListener('keydown', function (event) { if (event.key === 'Enter' && !event.shiftKey) { event.preventDefault(); sendChat(); } });
        document.querySelector('#chatInput').addEventListener('input', function () { this.style.height = 'auto'; this.style.height = Math.min(this.scrollHeight, 150) + 'px'; });

        if (storage.get('studia-data-version', 0) < 2) {
          storage.set('studia-tasks', []); storage.set('studia-files', []); storage.set('studia-exams', []);
          storage.set('studia-profile', { name: 'სტუდენტი', university: '', program: '', semester: 'I სემესტრი', goalMinutes: 600, style: 'balanced', socratic: true, progress: true, reminder: true });
          storage.set('studia-data-version', 2);
        }
        if (storage.get('studia-data-version', 0) < 3) {
          var upgradedProfile = storage.get('studia-profile', { name: 'სტუდენტი' });
          if (typeof upgradedProfile.reminder !== 'boolean') upgradedProfile.reminder = true;
          storage.set('studia-profile', upgradedProfile); storage.set('studia-data-version', 3);
        }
        if (storage.get('studia-data-version', 0) < 4) { storage.set('studia-study-seconds', storage.get('studia-study-seconds', {})); storage.set('studia-data-version', 4); }
        function defaultProfile(name) { return { name: name || 'სტუდენტი', university: '', program: '', semester: 'I სემესტრი', goalMinutes: 600, style: 'balanced', socratic: true, progress: true, reminder: true }; }
        var tasks = storage.get('studia-tasks', []);
        var files = storage.get('studia-files', []);
        var exams = storage.get('studia-exams', []);
        var studySeconds = storage.get('studia-study-seconds', {});
        if (!studySeconds || typeof studySeconds !== 'object' || Array.isArray(studySeconds)) studySeconds = {};
        var profile = Object.assign(defaultProfile(), storage.get('studia-profile', {}));
        var dayNames = ['ორშ','სამ','ოთხ','ხუთ','პარ','შაბ','კვ'];

        function pad(value) { return String(value).padStart(2, '0'); }
        function dateKey(date) { return date.getFullYear() + '-' + pad(date.getMonth() + 1) + '-' + pad(date.getDate()); }
        function startOfWeek(date) { var result = new Date(date); result.setHours(0,0,0,0); result.setDate(result.getDate() - ((result.getDay() + 6) % 7)); return result; }
        function addDays(date, days) { var result = new Date(date); result.setDate(result.getDate() + days); return result; }
        function formatDuration(minutes) { var value = Math.max(0, Math.round(Number(minutes) || 0)); if (value < 60) return value + ' წთ'; var hours = Math.floor(value / 60); var rest = value % 60; return hours + ' სთ' + (rest ? ' ' + rest + ' წთ' : ''); }
        function formatElapsed(seconds) { var value = Math.max(0, Math.floor(Number(seconds) || 0)); if (value < 60) return value + ' წმ'; var minutes = Math.floor(value / 60); var restSeconds = value % 60; if (minutes < 60) return minutes + ' წთ' + (restSeconds ? ' ' + restSeconds + ' წმ' : ''); var hours = Math.floor(minutes / 60); var restMinutes = minutes % 60; return hours + ' სთ' + (restMinutes ? ' ' + restMinutes + ' წთ' : ''); }
        function shortElapsed(seconds) { var value = Math.max(0, Math.floor(Number(seconds) || 0)); if (value < 60) return value + 'წმ'; if (value < 3600) return Math.floor(value / 60) + 'წთ'; return (value / 3600).toFixed(value < 36000 ? 1 : 0) + 'სთ'; }
        function taskMinutes(task) { if (Number(task.minutes)) return Number(task.minutes); var text = String(task.time || ''); if (text.indexOf('1.5') >= 0) return 90; if (text.indexOf('1 საათ') >= 0) return 60; return Number.parseInt(text, 10) || 25; }
        function currentStatePayload() { return { profile: profile, tasks: tasks, exams: exams, studySeconds: studySeconds }; }
        function cacheAccountData() {
          if (profile.progress === false) { storage.remove('studia-profile'); storage.remove('studia-tasks'); storage.remove('studia-files'); storage.remove('studia-exams'); storage.remove('studia-study-seconds'); return; }
          storage.set('studia-profile', profile); storage.set('studia-tasks', tasks); storage.set('studia-files', files); storage.set('studia-exams', exams); storage.set('studia-study-seconds', studySeconds);
        }
        async function putServerState(useBeacon) {
          if (!serverReady) return;
          var payload = JSON.stringify(currentStatePayload());
          if (useBeacon && navigator.sendBeacon) { navigator.sendBeacon('/api/state', new Blob([payload], { type: 'application/json' })); return; }
          var response = await fetch('/api/state', { method: 'PUT', headers: { 'content-type': 'application/json' }, body: payload });
          if (!response.ok) { var errorBody = await response.json().catch(function () { return {}; }); throw new Error(errorBody.error || 'ანგარიშთან სინქრონიზაცია ვერ მოხერხდა.'); }
        }
        async function flushServerState() {
          if (!serverReady || serverSyncInFlight) { serverSyncDirty = true; return; }
          serverSyncInFlight = true; serverSyncDirty = false;
          try { await putServerState(false); }
          catch (error) { showToast(error.message); }
          finally { serverSyncInFlight = false; if (serverSyncDirty) queueServerSync(200); }
        }
        function queueServerSync(delay) { if (!serverReady) return; serverSyncDirty = true; clearTimeout(serverSyncTimer); serverSyncTimer = setTimeout(flushServerState, typeof delay === 'number' ? delay : 650); }
        function persistData(key, value) { if (profile.progress !== false) storage.set(key, value); else storage.remove(key); queueServerSync(); }
        function saveTasks() { persistData('studia-tasks', tasks); }
        function completedTasks() { return tasks.filter(function (task) { return task.done && task.completedAt; }); }
        function sumMinutes(list) { return list.reduce(function (sum, item) { return sum + taskMinutes(item); }, 0); }
        function tasksInRange(start, end, completedOnly) { return tasks.filter(function (task) { var source = completedOnly ? task.completedAt : task.date; if (!source || (completedOnly && !task.done)) return false; var date = new Date(source); return date >= start && date < end; }); }

        function renderDashboardTasks() {
          var selected = tasks.slice().sort(function (a, b) { return Number(a.done) - Number(b.done) || String(a.date || '').localeCompare(String(b.date || '')); }).slice(0, 3);
          document.querySelector('#dashboardTasks').innerHTML = selected.length ? selected.map(function (task, index) { return '<div class="task"><span class="task-index">' + (index + 1) + '</span><span><strong>' + escapeHtml(task.name) + '</strong><small>' + escapeHtml(task.subject) + ' · ' + escapeHtml(formatDuration(taskMinutes(task))) + '</small></span><span class="task-state' + (task.done ? ' done' : '') + '">' + (task.done ? '<svg class="icon"><use href="#i-check"/></svg>' : escapeHtml(formatDuration(taskMinutes(task)))) + '</span></div>'; }).join('') : '<div class="context-card" style="padding:.75rem;color:var(--muted);font-size:.7rem">დავალებები ჯერ არ დაგიმატებია.</div>';
        }
        function renderTasks() {
          var container = document.querySelector('#plannerTasks');
          container.innerHTML = tasks.length ? tasks.map(function (task) { return '<div class="planner-task' + (task.done ? ' done' : '') + '" data-id="' + task.id + '"><button class="task-check" type="button" aria-label="შესრულებულად მონიშვნა"><svg class="icon"><use href="#i-check"/></svg></button><span><strong class="task-title">' + escapeHtml(task.name) + '</strong><span class="task-details">' + escapeHtml(task.subject) + ' · ' + escapeHtml(formatDuration(taskMinutes(task))) + ' · ' + escapeHtml(task.date || 'თარიღის გარეშე') + '</span></span><span class="task-tag">' + (task.done ? 'მზადაა' : 'დაგეგმილი') + '</span></div>'; }).join('') : '<p style="color:var(--muted);font-size:.72rem;line-height:1.6">გეგმა ცარიელია. დაამატე პირველი დავალება და მისი დასრულებისას ანალიტიკა ავტომატურად განახლდება.</p>';
          renderDashboardTasks();
        }
        document.querySelector('#plannerTasks').addEventListener('click', function (event) {
          var row = event.target.closest('.planner-task'); if (!row || !event.target.closest('.task-check')) return;
          var id = String(row.getAttribute('data-id')); tasks = tasks.map(function (task) { if (String(task.id) === id) { task.done = !task.done; task.completedAt = task.done ? new Date().toISOString() : null; } return task; }); saveTasks(); renderAll();
        });
        var taskDialog = document.querySelector('#taskDialog');
        document.querySelectorAll('[data-close-dialog]').forEach(function (button) { button.addEventListener('click', function () { var dialog = button.closest('dialog'); if (dialog && dialog.open) { dialog.close('cancel'); var form = dialog.querySelector('form'); if (form) form.reset(); } }); });
        document.querySelector('#addTaskButton').addEventListener('click', function () { document.querySelector('#taskDate').value = dateKey(new Date()); taskDialog.showModal(); setTimeout(function () { document.querySelector('#taskName').focus(); }, 50); });
        document.querySelector('#taskForm').addEventListener('submit', function (event) {
          var submitter = event.submitter; if (submitter && submitter.value === 'cancel') return;
          event.preventDefault(); var name = document.querySelector('#taskName').value.trim(); var subject = document.querySelector('#taskSubject').value.trim(); var taskDate = document.querySelector('#taskDate').value; if (!name || !subject || !taskDate) return;
          tasks.unshift({ id: String(Date.now()) + '-' + Math.random().toString(36).slice(2,8), name: name, subject: subject, date: taskDate, minutes: Number(document.querySelector('#taskTime').value), done: false, completedAt: null }); saveTasks(); renderAll(); taskDialog.close(); event.target.reset(); showToast('დავალება გეგმაში დაემატა.');
        });

        function renderSchedule() {
          var start = startOfWeek(new Date()); var end = addDays(start, 7); var today = dateKey(new Date());
          document.querySelector('#weekRange').textContent = start.toLocaleDateString('ka-GE', { day: 'numeric', month: 'short' }) + ' – ' + addDays(end, -1).toLocaleDateString('ka-GE', { day: 'numeric', month: 'short' });
          document.querySelector('#weekGrid').innerHTML = dayNames.map(function (name, index) { var day = addDays(start, index); var key = dateKey(day); var dailyTasks = tasks.filter(function (task) { return task.date === key; }); var dailyExams = exams.filter(function (exam) { return exam.date === key; }); var blocks = dailyTasks.map(function (task, taskIndex) { return '<div class="schedule-block ' + (taskIndex % 2 ? 'mint' : '') + '">' + escapeHtml(task.name) + '<br>' + escapeHtml(formatDuration(taskMinutes(task))) + '</div>'; }).join('') + dailyExams.map(function (exam) { return '<div class="schedule-block cyan">გამოცდა<br>' + escapeHtml(exam.subject) + '</div>'; }).join(''); return '<div class="day-column' + (key === today ? ' today' : '') + '"><b>' + name + '</b><small>' + day.getDate() + '</small>' + (blocks || '<div style="margin-top:.7rem;text-align:center;color:var(--muted);font-size:.55rem">თავისუფალი</div>') + '</div>'; }).join('');
        }

        function nextExam() { var now = new Date(); return exams.map(function (exam) { return Object.assign({}, exam, { moment: new Date(exam.date + 'T' + (exam.time || '10:00')) }); }).filter(function (exam) { return exam.moment > now; }).sort(function (a, b) { return a.moment - b.moment; })[0] || null; }
        function renderExam() {
          var exam = nextExam(); var subject = document.querySelector('#examSubject'); var dateText = document.querySelector('#examDateText'); var action = document.querySelector('#examAction');
          if (!exam) { subject.textContent = 'გამოცდა არ არის დამატებული'; dateText.textContent = 'დაამატე გამოცდის თარიღი სასწავლო გეგმაში'; action.textContent = 'გამოცდის დამატება'; document.querySelector('#nextExamDays').textContent = '—'; document.querySelector('#nextExamSubject').textContent = 'გამოცდა არ არის დამატებული'; return; }
          var days = Math.max(0, Math.ceil((exam.moment - new Date()) / 86400000)); document.querySelector('#nextExamDays').textContent = days + ' დღე'; document.querySelector('#nextExamSubject').textContent = exam.subject;
          if (profile.reminder === false) { subject.textContent = 'შეხსენებები გამორთულია'; dateText.textContent = 'გამოცდა გეგმაში შენახულია'; action.textContent = 'შეხსენების ჩართვა'; return; }
          subject.textContent = exam.subject; dateText.textContent = exam.moment.toLocaleDateString('ka-GE', { weekday: 'long', day: 'numeric', month: 'long' }) + ' · ' + (exam.time || '10:00'); action.textContent = 'მოსამზადებელი ტესტი';
        }
        function updateCountdown() {
          var exam = nextExam(); var values = document.querySelectorAll('#examCountdown strong'); if (!exam || profile.reminder === false) { values.forEach(function (item) { item.textContent = '—'; }); return; }
          var seconds = Math.max(0, Math.floor((exam.moment - new Date()) / 1000)); var days = Math.floor(seconds / 86400); seconds -= days * 86400; var hours = Math.floor(seconds / 3600); seconds -= hours * 3600; var minutes = Math.floor(seconds / 60); seconds -= minutes * 60; [days,hours,minutes,seconds].forEach(function (value, index) { values[index].textContent = pad(value); });
        }
        var examDialog = document.querySelector('#examDialog');
        function openExamDialog() { document.querySelector('#examDateInput').min = dateKey(new Date()); examDialog.showModal(); setTimeout(function () { document.querySelector('#examNameInput').focus(); }, 50); }
        document.querySelector('#addExamButton').addEventListener('click', openExamDialog);
        document.querySelector('#examAction').addEventListener('click', function () { var exam = nextExam(); if (!exam) { openExamDialog(); return; } if (profile.reminder === false) { navigate('settings'); document.querySelector('#examReminder').focus(); return; } navigate('assistant'); document.querySelector('#chatInput').value = 'შემიქმენი მოსამზადებელი ტესტი საგანში: ' + exam.subject; document.querySelector('#chatInput').focus(); });
        document.querySelector('#examForm').addEventListener('submit', function (event) { var submitter = event.submitter; if (submitter && submitter.value === 'cancel') return; event.preventDefault(); var subject = document.querySelector('#examNameInput').value.trim(); var date = document.querySelector('#examDateInput').value; var time = document.querySelector('#examTimeInput').value; if (!subject || !date) return; exams.push({ id: String(Date.now()) + '-' + Math.random().toString(36).slice(2,8), subject: subject, date: date, time: time }); persistData('studia-exams', exams); renderAll(); examDialog.close(); event.target.reset(); showToast('გამოცდა გეგმაში დაემატა.'); });
        setInterval(updateCountdown, 1000);

        function studySecondsInRange(start, end) { return Object.keys(studySeconds).reduce(function (total, key) { var day = new Date(key + 'T00:00:00'); return day >= start && day < end ? total + Math.max(0, Number(studySeconds[key]) || 0) : total; }, 0); }
        function studyActiveDays(start, end) { return Object.keys(studySeconds).filter(function (key) { var day = new Date(key + 'T00:00:00'); return day >= start && day < end && Number(studySeconds[key]) > 0; }).length; }
        function periodValues(start) { return dayNames.map(function (_, index) { var key = dateKey(addDays(start, index)); return Math.max(0, Number(studySeconds[key]) || 0); }); }
        function renderWeeklyChart(values) {
          var max = Math.max.apply(null, values.concat([60])); var points = values.map(function (value, index) { return { x: 38 + index * 62.5, y: 145 - (value / max) * 110, value: value }; }); var pointString = points.map(function (point) { return point.x + ',' + point.y; }).join(' '); var area = 'M' + points[0].x + ' 145 L' + pointString.replaceAll(',', ' ') + ' L' + points[points.length - 1].x + ' 145Z';
          document.querySelector('#weeklyChartSvg').innerHTML = '<defs><linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#665cff" stop-opacity=".42"/><stop offset="1" stop-color="#665cff" stop-opacity="0"/></linearGradient></defs><path class="grid-line" d="M35 35H416M35 90H416M35 145H416"/><text class="axis-label" x="5" y="38">' + shortElapsed(max) + '</text><text class="axis-label" x="14" y="148">0</text><path class="chart-area" d="' + area + '"/><polyline class="chart-line" points="' + pointString + '"/>' + points.map(function (point) { return '<circle class="chart-dot" cx="' + point.x + '" cy="' + point.y + '" r="4"><title>' + formatElapsed(point.value) + '</title></circle><text class="chart-value" x="' + (point.x - 8) + '" y="' + Math.max(16, point.y - 10) + '">' + shortElapsed(point.value) + '</text>'; }).join('') + dayNames.map(function (name, index) { return '<text class="axis-label" x="' + (30 + index * 62.5) + '" y="168">' + name + '</text>'; }).join('');
        }
        function subjectStats() {
          var map = {};
          tasks.forEach(function (task) { var key = task.subject || 'სხვა'; if (!map[key]) map[key] = { subject: key, total: 0, done: 0, minutes: 0 }; map[key].total += 1; if (task.done) { map[key].done += 1; map[key].minutes += taskMinutes(task); } });
          return Object.values(map).map(function (item) { item.progress = item.total ? Math.round(item.done / item.total * 100) : 0; return item; });
        }
        function renderMastery() {
          var stats = subjectStats().sort(function (a, b) { return b.total - a.total; }).slice(0, 3); document.querySelector('#masteryGrid').innerHTML = stats.length ? stats.map(function (item, index) { return '<div class="mastery-item"><span class="mastery-icon">' + (index === 0 ? '◈' : index === 1 ? '⌁' : '▣') + '</span><span class="mastery-copy"><strong>' + escapeHtml(item.subject) + '</strong><span class="progress-track"><i style="--value:' + item.progress + '%"></i></span></span><b>' + item.progress + '%</b></div>'; }).join('') : '<p style="grid-column:1/-1;color:var(--muted);font-size:.7rem">საგნების პროგრესი დავალებების შესრულების შემდეგ გამოჩნდება.</p>';
        }
        function renderActiveMaterial() {
          var type = document.querySelector('#activeMaterialType'); var name = document.querySelector('#activeMaterialName'); var meta = document.querySelector('#activeMaterialMeta'); var button = document.querySelector('#contextUpload');
          if (!attachment) { type.textContent = '—'; name.textContent = 'მასალა არ არის არჩეული'; meta.textContent = 'მიამაგრე PDF, DOCX, PPTX ან ტექსტური ფაილი'; button.textContent = 'მასალის არჩევა'; return; }
          type.textContent = (attachment.name.split('.').pop() || 'FILE').toUpperCase().slice(0,5); name.textContent = attachment.name; meta.textContent = 'მზადაა შემდეგ მოთხოვნასთან გასაგზავნად'; button.textContent = 'მასალის შეცვლა';
        }
        function renderRecommendations(stats) {
          var weakest = stats.slice().sort(function (a,b) { return a.progress - b.progress || b.total - a.total; })[0]; var coachTitle = document.querySelector('#coachTitle'); var coachText = document.querySelector('#coachText'); var coachAction = document.querySelector('#coachAction'); var nextTitle = document.querySelector('#nextActionTitle'); var nextText = document.querySelector('#nextActionText'); var nextButton = document.querySelector('#nextActionButton');
          if (!weakest) { coachTitle.textContent = 'ერთი პატარა ნაბიჯით დაიწყე'; coachText.textContent = 'დაამატე პირველი დავალება და დასრულების შემდეგ აქ პერსონალური რჩევა გამოჩნდება.'; coachAction.textContent = 'დაგეგმვაში დახმარება'; coachAction.setAttribute('data-prompt', 'დამეხმარე პირველი სასწავლო დავალების დაგეგმვაში'); nextTitle.textContent = 'შექმენი პირველი სასწავლო მიზანი'; nextText.textContent = 'რეკომენდაცია შენს რეალურ დავალებებსა და დასრულების მაჩვენებელზე დაყრდნობით განახლდება.'; nextButton.textContent = 'AI-სთან დაგეგმვა'; nextButton.setAttribute('data-prompt', 'დამეხმარე პირველი სასწავლო მიზნის ჩამოყალიბებაში'); return; }
          coachTitle.textContent = 'ყურადღება დაუთმე: ' + weakest.subject; coachText.textContent = 'ამ საგანში დასრულებულია ' + weakest.done + ' / ' + weakest.total + ' დავალება. მაჩვენებელი მხოლოდ შენს შესრულებულ გეგმას ეფუძნება.'; coachAction.textContent = 'თემის გამეორება'; coachAction.setAttribute('data-prompt', 'დამეხმარე საგნის გამეორებაში: ' + weakest.subject); nextTitle.textContent = weakest.progress < 100 ? '25-წუთიანი პრაქტიკა: ' + weakest.subject : 'შემდეგი დონის თვითშემოწმება'; nextText.textContent = weakest.progress < 100 ? 'პირველ რიგში დაასრულე ამ საგნის დარჩენილი დავალებები ან გაიარე მოკლე სავარჯიშო.' : 'ყველა მიმდინარე დავალება დასრულებულია — შეამოწმე ცოდნა ახალი ტესტით.'; nextButton.textContent = 'ტესტის დაწყება'; nextButton.setAttribute('data-prompt', 'შემიქმენი 25-წუთიანი ადაპტური ტესტი საგანში: ' + weakest.subject);
        }
        function renderHeatmap() {
          var heatmap = document.querySelector('#heatmap'); heatmap.innerHTML = ''; var now = new Date(); var start = addDays(startOfWeek(now), -77); var buckets = [[],[],[]]; for (var row = 0; row < 3; row += 1) for (var week = 0; week < 12; week += 1) buckets[row][week] = 0;
          completedTasks().forEach(function (task) { var date = new Date(task.completedAt); var weekIndex = Math.floor((startOfWeek(date) - start) / 604800000); if (weekIndex < 0 || weekIndex > 11) return; var hour = date.getHours(); var row = hour < 12 ? 0 : hour < 18 ? 1 : 2; buckets[row][weekIndex] += taskMinutes(task); }); var maximum = Math.max.apply(null, buckets.flat().concat([1]));
          ['დილა','შუადღე','საღამო'].forEach(function (label, row) { var name = document.createElement('span'); name.className = 'heat-label'; name.textContent = label; heatmap.appendChild(name); buckets[row].forEach(function (value, index) { var cell = document.createElement('i'); cell.className = 'heat-cell'; cell.style.setProperty('--heat', value ? Math.max(.15, value / maximum) : .04); cell.title = (index + 1) + ' კვირა · ' + formatDuration(value); heatmap.appendChild(cell); }); });
        }
        function renderStats() {
          var now = new Date(); var weekStart = startOfWeek(now); var weekEnd = addDays(weekStart, 7); var previousStart = addDays(weekStart, -7); var previousValues = periodValues(previousStart); var currentValues = periodValues(weekStart); var currentSeconds = currentValues.reduce(function (a,b) { return a+b; }, 0); var previousSeconds = previousValues.reduce(function (a,b) { return a+b; }, 0); var selectedPrevious = document.querySelector('#dashboardPeriod').value === 'previous'; var displayed = selectedPrevious ? previousValues : currentValues; var displayedTotal = displayed.reduce(function (a,b) { return a+b; }, 0); renderWeeklyChart(displayed);
          document.querySelector('#chartTotalLabel').textContent = selectedPrevious ? 'სულ წინა კვირაში' : 'სულ ამ კვირაში · ცოცხალი'; document.querySelector('#chartTotal').textContent = formatElapsed(displayedTotal); var delta = document.querySelector('#chartDelta'); delta.textContent = previousSeconds ? (currentSeconds >= previousSeconds ? '↗ ' : '↘ ') + Math.abs(Math.round((currentSeconds - previousSeconds) / previousSeconds * 100)) + '%' : (currentSeconds ? 'ახალი აქტივობა' : 'ჯერ მონაცემი არ არის'); delta.style.color = currentSeconds >= previousSeconds ? 'var(--mint)' : 'var(--warning)';
          var goal = Number(profile.goalMinutes) || 600; var goalSeconds = goal * 60; var percent = Math.min(100, Math.round(currentSeconds / goalSeconds * 100)); document.querySelector('#weeklyGoalValue').textContent = formatElapsed(currentSeconds) + ' / ' + formatDuration(goal); document.querySelector('#weeklyGoalPercent').textContent = percent + '%'; document.querySelector('#weeklyGoalBar').style.setProperty('--value', percent + '%'); document.querySelector('#weeklyGoalNote').textContent = currentSeconds ? (currentSeconds >= goalSeconds ? 'კვირის მიზანი შესრულებულია.' : 'მიზნამდე დარჩა ' + formatElapsed(goalSeconds - currentSeconds) + '.') : 'ტაიმერი საიტის გახსნისთანავე დაიწყება.';
          var today = dateKey(now); var todayTasks = tasks.filter(function (task) { return task.date === today; }); var todayDone = todayTasks.filter(function (task) { return task.done; }); document.querySelector('#todayPlanned').textContent = formatDuration(sumMinutes(todayTasks)); document.querySelector('#todayCompleted').textContent = formatDuration(sumMinutes(todayDone)) + ' შესრულებულია'; var open = tasks.filter(function (task) { return !task.done; }).length; var done = tasks.length - open; document.querySelector('#openTaskCount').textContent = open; document.querySelector('#taskCompletionNote').textContent = tasks.length ? done + ' დასრულებული · ' + tasks.length + ' სულ' : 'დაამატე პირველი დავალება';
          var plannedWeek = sumMinutes(tasksInRange(weekStart, weekEnd, false)); var load = Math.min(100, Math.round(plannedWeek / goal * 100)); document.querySelector('#weeklyLoad').textContent = load + '%'; document.querySelector('#weeklyLoadNote').textContent = plannedWeek ? formatDuration(plannedWeek) + ' არის დაგეგმილი' : 'გეგმა ჯერ ცარიელია';
          var period = document.querySelector('#analyticsPeriod').value; var periodStart = period === 'semester' ? new Date(now.getFullYear(), now.getMonth() < 6 ? 0 : 6, 1) : addDays(now, -30); var periodTasks = tasks.filter(function (task) { return task.date && new Date(task.date + 'T00:00:00') >= periodStart; }); var periodStudySeconds = studySecondsInRange(periodStart, addDays(now, 1)); var activeDays = studyActiveDays(periodStart, addDays(now, 1)); var periodDone = periodTasks.filter(function (task) { return task.done; }).length; var completion = periodTasks.length ? Math.round(periodDone / periodTasks.length * 100) : 0; document.querySelector('#analyticsTime').textContent = formatElapsed(periodStudySeconds); document.querySelector('#analyticsTimeNote').textContent = (period === 'semester' ? 'მიმდინარე სემესტრში' : 'ბოლო 30 დღეში') + ' · ხილული ტაბი'; document.querySelector('#analyticsDone').textContent = periodDone; document.querySelector('#analyticsDoneNote').textContent = periodDone ? 'პერიოდის ' + periodTasks.length + ' დავალებიდან' : 'ჯერ არცერთი'; document.querySelector('#analyticsDays').textContent = activeDays; document.querySelector('#analyticsDaysNote').textContent = period === 'semester' ? 'მიმდინარე სემესტრში' : 'ბოლო 30 დღეში'; document.querySelector('#analyticsCompletion').textContent = completion + '%'; document.querySelector('#analyticsCompletionNote').textContent = periodTasks.length ? periodDone + ' / ' + periodTasks.length + ' დასრულებული' : 'დაიწყე პირველი დავალებით';
          var stats = subjectStats().sort(function (a,b) { return b.minutes - a.minutes; }); var subjectTotal = stats.reduce(function (sum,item) { return sum + item.minutes; }, 0); var colors = ['#665cff','#44e4b5','#59d8ff','#ffcf6a']; var cursor = 0; var segments = stats.slice(0,4).map(function (item,index) { var start = cursor; var share = subjectTotal ? item.minutes / subjectTotal * 100 : 0; cursor += share; return colors[index] + ' ' + start + '% ' + cursor + '%'; }); document.querySelector('#subjectDonut').style.background = subjectTotal ? 'conic-gradient(' + segments.join(',') + ')' : 'rgba(255,255,255,.08)'; document.querySelector('#donutValue').childNodes[0].nodeValue = completion + '%'; document.querySelector('#subjectTimeTotal').textContent = formatDuration(subjectTotal); document.querySelector('#subjectLegend').innerHTML = stats.length ? stats.slice(0,4).map(function (item,index) { var share = subjectTotal ? Math.round(item.minutes / subjectTotal * 100) : 0; return '<div class="legend-row"><i class="legend-dot" style="background:' + colors[index] + '"></i><span>' + escapeHtml(item.subject) + '</span><b>' + share + '%</b></div>'; }).join('') : '<p style="color:var(--muted);font-size:.65rem">დროის განაწილება ჯერ არ არის.</p>';
          var maxDay = Math.max.apply(null, currentValues.concat([1])); document.querySelector('#activityBars').innerHTML = currentValues.map(function (value,index) { return '<div class="bar-item"><div class="bar" style="--h:' + (value ? Math.max(6, value / maxDay * 100) : 0) + '%" title="' + escapeHtml(formatElapsed(value)) + '"></div><small>' + dayNames[index] + '</small></div>'; }).join(''); document.querySelector('#dailyAverage').textContent = 'საშუალოდ ' + formatElapsed(currentSeconds / 7);
          document.querySelector('#weakTopics').innerHTML = stats.length ? stats.slice().sort(function (a,b) { return a.progress - b.progress; }).slice(0,3).map(function (item) { return '<div class="weak-topic"><span><strong>' + escapeHtml(item.subject) + '</strong><span>' + item.done + ' / ' + item.total + ' დავალება დასრულებულია</span></span><b>' + item.progress + '%</b></div>'; }).join('') : '<p style="color:var(--muted);font-size:.7rem">საგნის დასამატებლად შექმენი დავალება.</p>'; renderMastery(); renderHeatmap(); renderRecommendations(stats);
        }
        document.querySelector('#dashboardPeriod').addEventListener('change', renderStats);
        document.querySelector('#analyticsPeriod').addEventListener('change', renderStats);

        function formatSize(bytes) { return bytes > 1048576 ? (bytes / 1048576).toFixed(1) + ' MB' : Math.max(1, Math.round(bytes / 1024)) + ' KB'; }
        function fileAsDataUrl(file) { return new Promise(function (resolve, reject) { var reader = new FileReader(); reader.onload = function () { resolve(String(reader.result)); }; reader.onerror = function () { reject(new Error('ფაილის წაკითხვა ვერ მოხერხდა.')); }; reader.readAsDataURL(file); }); }
        async function uploadMaterialFile(id, file) { var response = await fetch('/api/materials', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ id: String(id), name: file.name, type: file.type || 'application/octet-stream', data: await fileAsDataUrl(file) }) }); var result = await response.json().catch(function () { return {}; }); if (!response.ok) throw new Error(result.error || 'მასალის ანგარიშზე შენახვა ვერ მოხერხდა.'); return result.material; }
        function renderFiles() { document.querySelector('#fileGrid').innerHTML = files.length ? files.map(function (file, index) { var status = file.remoteStored ? 'ანგარიშზე შენახული' : file.contentStored ? 'მხოლოდ მოწყობილობაზე' : 'ხელახლა ატვირთე'; return '<article class="card file-card"><div class="file-card-top"><span class="file-icon">' + escapeHtml(file.type) + '</span><span class="status-chip">' + status + '</span></div><h3 title="' + escapeHtml(file.name) + '">' + escapeHtml(file.name) + '</h3><p>' + escapeHtml(file.size) + ' · ' + escapeHtml(file.date) + '</p><div class="file-actions"><button type="button" data-file-ask="' + index + '">ჰკითხე AI-ს</button><button type="button" data-file-delete="' + index + '">წაშლა</button></div></article>'; }).join('') : '<div class="card context-card" style="grid-column:1/-1"><h3>მასალები ჯერ არ არის</h3><p>ატვირთე PDF, DOCX, PPTX ან ტექსტური ფაილი. შემდეგ „ჰკითხე AI-ს“ თავად ფაილს მიამაგრებს ჩატში.</p></div>'; }
        async function addLibraryFiles(fileList) { var added = 0; var rejected = 0; var allowed = ['PDF','DOCX','PPTX','TXT','MD','CSV']; for (var file of Array.from(fileList)) { var extension = (file.name.split('.').pop() || '').toUpperCase(); if (file.size > 8 * 1024 * 1024 || !allowed.includes(extension)) { rejected += 1; continue; } var id = String(Date.now()) + '-' + added + '-' + Math.random().toString(36).slice(2,8); try { await uploadMaterialFile(id, file); var stored = await storeFileContent(id, file); files.unshift({ id: id, name: file.name, size: formatSize(file.size), type: extension.slice(0,5), mime: file.type || 'application/octet-stream', date: new Date().toLocaleDateString('ka-GE'), contentStored: stored || profile.progress === false, remoteStored: true }); added += 1; } catch (error) { rejected += 1; showToast(error.message); } } persistData('studia-files', files); renderFiles(); showToast(added ? added + ' მასალა ანგარიშზე შეინახა.' + (rejected ? ' ' + rejected + ' ფაილი ვერ დაემატა.' : '') : 'გამოიყენე მხარდაჭერილი ფაილი, მაქსიმუმ 8 MB.'); }
        document.querySelector('#libraryUploadButton').addEventListener('click', function () { document.querySelector('#libraryFile').click(); }); document.querySelector('#libraryFile').addEventListener('change', function (event) { addLibraryFiles(event.target.files); event.target.value = ''; }); var uploadZone = document.querySelector('#uploadZone'); ['dragenter','dragover'].forEach(function (name) { uploadZone.addEventListener(name, function (event) { event.preventDefault(); uploadZone.classList.add('drag'); }); }); ['dragleave','drop'].forEach(function (name) { uploadZone.addEventListener(name, function (event) { event.preventDefault(); uploadZone.classList.remove('drag'); if (name === 'drop') addLibraryFiles(event.dataTransfer.files); }); });
        document.querySelector('#fileGrid').addEventListener('click', async function (event) { var ask = event.target.getAttribute('data-file-ask'); var remove = event.target.getAttribute('data-file-delete'); if (ask !== null) { var selected = files[Number(ask)]; var storedFile = selected && selected.id ? await getFileContent(selected.id) : null; if (!storedFile) { showToast('ფაილის მიღება ვერ მოხერხდა — სცადე ხელახლა.'); return; } navigate('assistant'); if (!await setAttachment(storedFile)) return; document.querySelector('#chatInput').value = 'შეისწავლე მიმაგრებული მასალა „' + selected.name + '“ და შემომთავაზე მოკლე კონსპექტი.'; document.querySelector('#chatInput').focus(); showToast('ფაილი რეალურად მიემაგრა ჩატს. დაწერე კითხვა და გაგზავნე.'); } if (remove !== null) { var selectedForRemoval = files[Number(remove)]; if (!selectedForRemoval) return; try { var response = await fetch('/api/materials/' + encodeURIComponent(String(selectedForRemoval.id)), { method: 'DELETE' }); if (!response.ok) throw new Error('ანგარიშიდან წაშლა ვერ მოხერხდა.'); files.splice(Number(remove), 1); await removeFileContent(selectedForRemoval.id); persistData('studia-files', files); renderFiles(); showToast('მასალა ანგარიშიდან წაიშალა.'); } catch (error) { showToast(error.message); } } });

        function loadProfile() { profile.goalMinutes = Number(profile.goalMinutes) || 600; document.querySelector('#profileName').value = profile.name; document.querySelector('#profileUniversity').value = profile.university; document.querySelector('#profileProgram').value = profile.program; document.querySelector('#profileSemester').value = profile.semester; document.querySelector('#weeklyGoalInput').value = profile.goalMinutes / 60; document.querySelector('#responseStyle').value = profile.style; document.querySelector('#socraticDefault').checked = profile.socratic; document.querySelector('#saveProgress').checked = profile.progress !== false; document.querySelector('#examReminder').checked = profile.reminder !== false; var firstName = profile.name.trim().split(' ')[0] || 'სტუდენტო'; document.querySelector('#page-dashboard h1').childNodes[0].nodeValue = 'გამარჯობა, ' + firstName + ' '; document.querySelector('.profile-copy strong').textContent = profile.name || 'სტუდენტი'; document.querySelector('.profile-copy span').textContent = profile.program || 'პროგრამა არ არის მითითებული'; document.querySelector('.avatar').textContent = firstName.charAt(0) || 'ს'; }
        document.querySelector('#saveSettings').addEventListener('click', async function () { profile = { name: document.querySelector('#profileName').value.trim() || 'სტუდენტი', university: document.querySelector('#profileUniversity').value.trim(), program: document.querySelector('#profileProgram').value.trim(), semester: document.querySelector('#profileSemester').value, goalMinutes: Math.max(60, Number(document.querySelector('#weeklyGoalInput').value || 10) * 60), style: document.querySelector('#responseStyle').value, socratic: document.querySelector('#socraticDefault').checked, progress: document.querySelector('#saveProgress').checked, reminder: document.querySelector('#examReminder').checked }; if (profile.progress) { for (var item of files) { var currentFile = item.id ? sessionFileBlobs.get(String(item.id)) : null; if (currentFile) item.contentStored = await storeFileContent(item.id, currentFile); } cacheAccountData(); } else { cacheAccountData(); await clearStoredFileContents(); } queueServerSync(0); loadProfile(); renderFiles(); renderAll(); showToast(profile.progress ? 'პარამეტრები ანგარიშზე და ამ მოწყობილობაზე შენახულია.' : 'პარამეტრები ანგარიშზეა; ადგილობრივი ქეში წაიშალა.'); });

        function serverMaterial(item) { return { id: String(item.id), name: item.name, size: formatSize(Number(item.size) || 0), type: String(item.type || item.name.split('.').pop() || 'FILE').toUpperCase().slice(0,5), mime: item.mime || 'application/octet-stream', date: item.createdAt ? new Date(item.createdAt).toLocaleDateString('ka-GE') : new Date().toLocaleDateString('ka-GE'), contentStored: false, remoteStored: true }; }
        function applyAccountState(state, materials) { var safe = state && typeof state === 'object' ? state : {}; profile = Object.assign(defaultProfile(account && account.name), safe.profile || {}); tasks = Array.isArray(safe.tasks) ? safe.tasks : []; exams = Array.isArray(safe.exams) ? safe.exams : []; studySeconds = safe.studySeconds && typeof safe.studySeconds === 'object' && !Array.isArray(safe.studySeconds) ? safe.studySeconds : {}; files = Array.isArray(materials) ? materials.map(serverMaterial) : []; }
        function hasDeviceData() { return tasks.length > 0 || files.length > 0 || exams.length > 0 || Object.keys(studySeconds).some(function (key) { return Number(studySeconds[key]) > 0; }) || Boolean(profile.university || profile.program || (profile.name && profile.name !== 'სტუდენტი')); }
        async function clearDeviceData() { storage.remove('studia-profile'); storage.remove('studia-tasks'); storage.remove('studia-files'); storage.remove('studia-exams'); storage.remove('studia-study-seconds'); sessionFileBlobs.clear(); await clearStoredFileContents(); }
        function chooseAccountStart() { return new Promise(function (resolve) { var dialog = document.querySelector('#migrationDialog'); document.querySelector('#importDeviceData').onclick = function () { dialog.close(); resolve('import'); }; document.querySelector('#startFreshAccount').onclick = function () { dialog.close(); resolve('fresh'); }; dialog.showModal(); }); }
        async function bootstrapAccount() {
          var response = await fetch('/api/bootstrap'); if (!response.ok) throw new Error('ანგარიშის ჩატვირთვა ვერ მოხერხდა.'); var result = await response.json(); account = result.user; document.querySelector('#accountName').textContent = account.name || 'Google მომხმარებელი'; document.querySelector('#accountEmail').textContent = account.email; var lastAccount = storage.get('studia-last-account', ''); var switchedAccount = Boolean(lastAccount && lastAccount !== account.email); if (switchedAccount) { await clearDeviceData(); tasks = []; files = []; exams = []; studySeconds = {}; profile = defaultProfile(account.name); }
          var localImport = result.isNew && !switchedAccount && hasDeviceData();
          if (result.isNew) {
            var choice = localImport ? await chooseAccountStart() : 'fresh';
            if (choice === 'fresh') { await clearDeviceData(); tasks = []; files = []; exams = []; studySeconds = {}; profile = defaultProfile(account.name); serverReady = true; await putServerState(false); }
            else { var deviceFiles = files.slice(); serverReady = true; await putServerState(false); var importedFiles = []; for (var item of deviceFiles) { var content = item.id ? await getFileContent(item.id) : null; if (!content) continue; try { await uploadMaterialFile(item.id, content); item.remoteStored = true; importedFiles.push(item); } catch (error) { showToast('მასალა „' + item.name + '“ ვერ გადაიტანა.'); } } files = importedFiles; }
          } else { applyAccountState(result.state, result.materials); serverReady = true; }
          storage.set('studia-last-account', account.email); cacheAccountData(); loadProfile(); renderFiles(); renderActiveMaterial(); renderAll(); navigate(location.hash.slice(1) || 'dashboard', false); document.querySelector('#accountLoading').classList.add('hidden');
        }

        function renderAll() { renderTasks(); renderSchedule(); renderExam(); updateCountdown(); renderStats(); }
        var lastStudyTick = Date.now(); var unsavedStudyTicks = 0;
        function saveStudyTime(useBeacon) { if (profile.progress !== false) storage.set('studia-study-seconds', studySeconds); else storage.remove('studia-study-seconds'); if (serverReady) { if (useBeacon) putServerState(true); else queueServerSync(0); } }
        function tickStudyTime() { var now = Date.now(); var elapsed = Math.min(2, Math.max(0, (now - lastStudyTick) / 1000)); lastStudyTick = now; if (!serverReady || document.visibilityState !== 'visible') return; var key = dateKey(new Date(now)); studySeconds[key] = Math.max(0, Number(studySeconds[key]) || 0) + elapsed; unsavedStudyTicks += 1; if (unsavedStudyTicks >= 10) { saveStudyTime(false); unsavedStudyTicks = 0; } if (currentPage === 'dashboard' || currentPage === 'analytics' || currentPage === 'assistant') renderStats(); }
        document.addEventListener('visibilitychange', function () { lastStudyTick = Date.now(); if (document.visibilityState === 'hidden') saveStudyTime(true); });
        window.addEventListener('pagehide', function () { saveStudyTime(true); }); setInterval(tickStudyTime, 1000);
        document.querySelector('#currentDate').textContent = new Date().toLocaleDateString('ka-GE', { weekday: 'long', day: 'numeric', month: 'long' });
        fetch('/api/status').then(function (response) { return response.json(); }).then(function (status) { document.querySelector('#aiStatus').textContent = status.connected ? status.provider + ' დაკავშირებულია' : 'დემო რეჟიმი'; }).catch(function () {});
        document.querySelector('#accountSignOut').addEventListener('click', async function () { this.disabled = true; try { await fetch('/api/auth/logout', { method: 'POST' }); } finally { location.href = '/'; } });
        if ('serviceWorker' in navigator) window.addEventListener('load', function () { navigator.serviceWorker.register('/sw.js').catch(function () {}); });
        bootstrapAccount().catch(function (error) { var loading = document.querySelector('#accountLoading .loading-card'); loading.innerHTML = '<strong>ანგარიშის ჩატვირთვა ვერ მოხერხდა</strong><p style="color:var(--muted);font-size:.72rem;line-height:1.6">' + escapeHtml(error.message) + ' განაახლე გვერდი ან თავიდან შედი ანგარიშში.</p><a class="secondary-button" href="/">თავიდან შესვლა</a>'; });
      }());
    </script>
  </body>
</html>`;

const signInPage = `<!doctype html><html lang="ka"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="theme-color" content="#07101f"><title>Studia AI — Google-ით შესვლა</title><style>:root{color-scheme:dark;font-family:system-ui,-apple-system,"Noto Sans Georgian",sans-serif}*{box-sizing:border-box}body{min-height:100vh;margin:0;display:grid;place-items:center;padding:1.25rem;color:#f5f7ff;background:radial-gradient(circle at 75% 0,rgba(102,92,255,.28),transparent 28rem),linear-gradient(145deg,#06101e,#081428)}main{width:min(32rem,100%);padding:clamp(1.4rem,5vw,2.5rem);border:1px solid rgba(133,151,194,.22);border-radius:1.4rem;background:rgba(11,21,48,.9);box-shadow:0 30px 80px rgba(0,0,0,.3)}.brand{display:flex;align-items:center;gap:.75rem;font-weight:750}.mark{display:grid;place-items:center;width:2.6rem;height:2.6rem;border-radius:.85rem;background:linear-gradient(145deg,#7368ff,#4938ea);box-shadow:0 0 28px rgba(102,92,255,.4)}h1{margin:2rem 0 .8rem;font-size:clamp(1.8rem,6vw,2.65rem);line-height:1.12;letter-spacing:-.045em}p{color:#9ca8c2;line-height:1.7}.google-wrap{min-height:3.25rem;display:grid;place-items:center;margin-top:1.5rem}.auth-error{min-height:1.3rem;margin:.7rem 0 0;color:#ff9aac;font-size:.75rem;text-align:center}ul{display:grid;gap:.6rem;margin:1rem 0 0;padding:1rem 0 0;list-style:none;border-top:1px solid rgba(133,151,194,.18);color:#aab4ca;font-size:.82rem}li:before{content:"✓";margin-right:.55rem;color:#44e4b5}</style><script src="https://accounts.google.com/gsi/client" async defer></script></head><body><main><div class="brand"><span class="mark">✦</span><span>Studia AI</span></div><h1>შენი სასწავლო სივრცე, შენს Google ანგარიშზე</h1><p>აირჩიე Google ანგარიში. Studia AI მიიღებს მხოლოდ დადასტურებულ ელფოსტასა და სახელს — Gmail-ზე ან Drive-ზე წვდომის გარეშე.</p><div class="google-wrap" id="googleButton"></div><p class="auth-error" id="authError" role="alert" aria-live="polite"></p><ul><li>ცალკე მონაცემები თითოეული Google ელფოსტისთვის</li><li>Google პაროლი Studia AI-ს არ გადაეცემა</li><li>იგივე ელფოსტაზე არსებული პროგრესი შენარჩუნდება</li></ul></main><script>(function(){var clientId='__GOOGLE_CLIENT_ID__';var error=document.querySelector('#authError');async function finish(response){error.textContent='';try{var result=await fetch('/api/auth/google',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({credential:response.credential})});var body=await result.json().catch(function(){return {};});if(!result.ok)throw new Error(body.error||'Google-ით შესვლა ვერ მოხერხდა.');location.replace('/');}catch(problem){error.textContent=problem.message||'Google-ით შესვლა ვერ მოხერხდა.';}}window.addEventListener('load',function(){if(!clientId||clientId.indexOf('.apps.googleusercontent.com')<0){error.textContent='Google ავტორიზაცია ჯერ არ არის კონფიგურირებული.';return;}if(!window.google||!google.accounts){error.textContent='Google-ის შესვლის მოდული ვერ ჩაიტვირთა. განაახლე გვერდი.';return;}google.accounts.id.initialize({client_id:clientId,callback:finish,auto_select:false,cancel_on_tap_outside:true});google.accounts.id.renderButton(document.querySelector('#googleButton'),{theme:'outline',size:'large',shape:'pill',text:'continue_with',logo_alignment:'left',width:340});});}());</script></body></html>`;

const jsonHeaders = {
  "content-type": "application/json; charset=utf-8",
  "cache-control": "no-store",
  "x-content-type-options": "nosniff",
};

function json(data, status = 200) {
  return new Response(JSON.stringify(data), { status, headers: jsonHeaders });
}

let storageSchemaPromise = null;
let googleKeyCache = { expiresAt: 0, keys: [] };

async function ensureStorage(env) {
  if (!env.DB || !env.BUCKET) throw new Error("STORAGE_NOT_CONFIGURED");
  if (!storageSchemaPromise) {
    storageSchemaPromise = env.DB.batch([
      env.DB.prepare("CREATE TABLE IF NOT EXISTS users (email TEXT PRIMARY KEY NOT NULL, full_name TEXT, state_json TEXT NOT NULL DEFAULT '{}', initialized INTEGER NOT NULL DEFAULT 0, created_at TEXT NOT NULL, updated_at TEXT NOT NULL)"),
      env.DB.prepare("CREATE TABLE IF NOT EXISTS materials (user_email TEXT NOT NULL, id TEXT NOT NULL, name TEXT NOT NULL, size INTEGER NOT NULL, type TEXT NOT NULL, mime TEXT NOT NULL, r2_key TEXT NOT NULL, created_at TEXT NOT NULL, PRIMARY KEY (user_email, id), FOREIGN KEY (user_email) REFERENCES users(email) ON DELETE CASCADE)"),
      env.DB.prepare("CREATE INDEX IF NOT EXISTS materials_user_created_idx ON materials(user_email, created_at DESC)"),
      env.DB.prepare("CREATE TABLE IF NOT EXISTS auth_sessions (token_hash TEXT PRIMARY KEY NOT NULL, email TEXT NOT NULL, google_sub TEXT NOT NULL, full_name TEXT, created_at TEXT NOT NULL, expires_at TEXT NOT NULL, FOREIGN KEY (email) REFERENCES users(email) ON DELETE CASCADE)"),
      env.DB.prepare("CREATE INDEX IF NOT EXISTS auth_sessions_email_idx ON auth_sessions(email)"),
      env.DB.prepare("CREATE INDEX IF NOT EXISTS auth_sessions_expiry_idx ON auth_sessions(expires_at)"),
    ]).catch((error) => { storageSchemaPromise = null; throw error; });
  }
  await storageSchemaPromise;
}

function renderSignInPage(clientId) {
  const safeClientId = /^[0-9a-zA-Z._-]+\.apps\.googleusercontent\.com$/.test(clientId || "") ? clientId : "";
  return signInPage.replace("__GOOGLE_CLIENT_ID__", safeClientId);
}

function base64UrlBytes(value) {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
  const padded = normalized + "=".repeat((4 - normalized.length % 4) % 4);
  const binary = atob(padded);
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index += 1) bytes[index] = binary.charCodeAt(index);
  return bytes;
}

function base64UrlJson(value) {
  return JSON.parse(new TextDecoder().decode(base64UrlBytes(value)));
}

function bytesToBase64Url(bytes) {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

async function sha256Hex(value) {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

function cookieValue(request, name) {
  const cookie = request.headers.get("cookie") || "";
  for (const item of cookie.split(";")) {
    const separator = item.indexOf("=");
    if (separator > 0 && item.slice(0, separator).trim() === name) return item.slice(separator + 1).trim();
  }
  return "";
}

async function googleJwks() {
  if (googleKeyCache.expiresAt > Date.now() && googleKeyCache.keys.length) return googleKeyCache.keys;
  const response = await fetch("https://www.googleapis.com/oauth2/v3/certs", { headers: { accept: "application/json" } });
  if (!response.ok) throw new Error("GOOGLE_KEYS_UNAVAILABLE");
  const payload = await response.json();
  if (!Array.isArray(payload.keys) || !payload.keys.length) throw new Error("GOOGLE_KEYS_INVALID");
  const maxAge = Number((response.headers.get("cache-control") || "").match(/max-age=(\d+)/)?.[1] || 1800);
  googleKeyCache = { expiresAt: Date.now() + Math.min(21600, Math.max(300, maxAge)) * 1000, keys: payload.keys };
  return googleKeyCache.keys;
}

async function verifyGoogleCredential(credential, clientId) {
  if (typeof credential !== "string" || credential.length > 10000) throw new Error("GOOGLE_TOKEN_INVALID");
  if (!/^[0-9a-zA-Z._-]+\.apps\.googleusercontent\.com$/.test(clientId || "")) throw new Error("GOOGLE_CLIENT_NOT_CONFIGURED");
  const parts = credential.split(".");
  if (parts.length !== 3) throw new Error("GOOGLE_TOKEN_INVALID");
  let header;
  let payload;
  try { header = base64UrlJson(parts[0]); payload = base64UrlJson(parts[1]); } catch { throw new Error("GOOGLE_TOKEN_INVALID"); }
  if (header.alg !== "RS256" || typeof header.kid !== "string") throw new Error("GOOGLE_TOKEN_INVALID");
  let jwk = (await googleJwks()).find((key) => key.kid === header.kid && key.kty === "RSA");
  if (!jwk) {
    googleKeyCache.expiresAt = 0;
    jwk = (await googleJwks()).find((key) => key.kid === header.kid && key.kty === "RSA");
  }
  if (!jwk) throw new Error("GOOGLE_KEY_NOT_FOUND");
  const key = await crypto.subtle.importKey("jwk", jwk, { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" }, false, ["verify"]);
  const validSignature = await crypto.subtle.verify("RSASSA-PKCS1-v1_5", key, base64UrlBytes(parts[2]), new TextEncoder().encode(parts[0] + "." + parts[1]));
  const now = Math.floor(Date.now() / 1000);
  const expires = Number(payload.exp);
  const issuedAt = Number(payload.iat);
  const audienceValid = payload.aud === clientId || (Array.isArray(payload.aud) && payload.aud.includes(clientId));
  const authorizedPartyValid = !payload.azp || payload.azp === clientId;
  if (!validSignature || !["https://accounts.google.com", "accounts.google.com"].includes(payload.iss) || !audienceValid || !authorizedPartyValid || !Number.isFinite(expires) || !Number.isFinite(issuedAt) || expires <= now || issuedAt > now + 300 || payload.email_verified !== true) throw new Error("GOOGLE_TOKEN_INVALID");
  const email = cleanString(payload.email, 320).toLowerCase();
  const subject = cleanString(payload.sub, 160);
  if (!email || !email.includes("@") || !subject) throw new Error("GOOGLE_TOKEN_INVALID");
  return { email, name: cleanString(payload.name, 120) || email.split("@")[0], sub: subject };
}

async function getAuthenticatedUser(request, env) {
  const token = cookieValue(request, "__Host-studia_session");
  if (!token || token.length > 200) return null;
  await ensureStorage(env);
  const tokenHash = await sha256Hex(token);
  const row = await env.DB.prepare("SELECT email, full_name, expires_at FROM auth_sessions WHERE token_hash = ?").bind(tokenHash).first();
  if (!row) return null;
  if (Date.parse(row.expires_at) <= Date.now()) {
    await env.DB.prepare("DELETE FROM auth_sessions WHERE token_hash = ?").bind(tokenHash).run();
    return null;
  }
  return { email: row.email, name: row.full_name || "სტუდენტი" };
}

async function handleGoogleSignIn(request, env) {
  const length = Number(request.headers.get("content-length") || 0);
  if (length > 12000) return json({ error: "Google-ის პასუხი ზედმეტად დიდია." }, 413);
  let body;
  try { body = await request.json(); } catch { return json({ error: "Google-ის პასუხი არასწორია." }, 400); }
  let identity;
  try { identity = await verifyGoogleCredential(body.credential, env.GOOGLE_CLIENT_ID); }
  catch (error) {
    console.error("Google sign-in rejected", error instanceof Error ? error.message : error);
    return json({ error: "Google ანგარიშის დადასტურება ვერ მოხერხდა." }, 401);
  }
  await ensureStorage(env);
  await ensureUser(env, identity);
  const random = new Uint8Array(32);
  crypto.getRandomValues(random);
  const token = bytesToBase64Url(random);
  const tokenHash = await sha256Hex(token);
  const createdAt = new Date().toISOString();
  const expiresAt = new Date(Date.now() + 7 * 86400000).toISOString();
  await env.DB.batch([
    env.DB.prepare("DELETE FROM auth_sessions WHERE expires_at <= ?").bind(createdAt),
    env.DB.prepare("INSERT INTO auth_sessions (token_hash, email, google_sub, full_name, created_at, expires_at) VALUES (?, ?, ?, ?, ?, ?)").bind(tokenHash, identity.email, identity.sub, identity.name, createdAt, expiresAt),
  ]);
  const headers = new Headers(jsonHeaders);
  headers.set("set-cookie", `__Host-studia_session=${token}; Path=/; Max-Age=604800; HttpOnly; Secure; SameSite=Lax`);
  return new Response(JSON.stringify({ ok: true, user: { email: identity.email, name: identity.name } }), { status: 200, headers });
}

async function handleGoogleSignOut(request, env) {
  const token = cookieValue(request, "__Host-studia_session");
  if (token) {
    await ensureStorage(env);
    await env.DB.prepare("DELETE FROM auth_sessions WHERE token_hash = ?").bind(await sha256Hex(token)).run();
  }
  const headers = new Headers(jsonHeaders);
  headers.set("set-cookie", "__Host-studia_session=; Path=/; Max-Age=0; HttpOnly; Secure; SameSite=Lax");
  return new Response(JSON.stringify({ ok: true }), { status: 200, headers });
}

function cleanString(value, maximum = 120) {
  return typeof value === "string" ? value.trim().slice(0, maximum) : "";
}

function sanitizeState(input, accountName) {
  const source = input && typeof input === "object" && !Array.isArray(input) ? input : {};
  const rawProfile = source.profile && typeof source.profile === "object" ? source.profile : {};
  const style = ["brief", "balanced", "deep"].includes(rawProfile.style) ? rawProfile.style : "balanced";
  const semester = cleanString(rawProfile.semester, 30) || "I სემესტრი";
  const profile = {
    name: cleanString(rawProfile.name, 120) || accountName || "სტუდენტი",
    university: cleanString(rawProfile.university, 120),
    program: cleanString(rawProfile.program, 120),
    semester,
    goalMinutes: Math.min(4800, Math.max(60, Number(rawProfile.goalMinutes) || 600)),
    style,
    socratic: rawProfile.socratic !== false,
    progress: rawProfile.progress !== false,
    reminder: rawProfile.reminder !== false,
  };
  const tasks = (Array.isArray(source.tasks) ? source.tasks : []).slice(0, 500).map((task) => ({
    id: cleanString(task?.id, 120) || crypto.randomUUID(),
    name: cleanString(task?.name, 80),
    subject: cleanString(task?.subject, 60),
    date: /^\d{4}-\d{2}-\d{2}$/.test(task?.date || "") ? task.date : "",
    minutes: Math.min(600, Math.max(1, Number(task?.minutes) || 25)),
    done: Boolean(task?.done),
    completedAt: task?.done && !Number.isNaN(Date.parse(task?.completedAt)) ? new Date(task.completedAt).toISOString() : null,
  })).filter((task) => task.name && task.subject);
  const exams = (Array.isArray(source.exams) ? source.exams : []).slice(0, 200).map((exam) => ({
    id: cleanString(exam?.id, 120) || crypto.randomUUID(),
    subject: cleanString(exam?.subject, 60),
    date: /^\d{4}-\d{2}-\d{2}$/.test(exam?.date || "") ? exam.date : "",
    time: /^\d{2}:\d{2}$/.test(exam?.time || "") ? exam.time : "10:00",
  })).filter((exam) => exam.subject && exam.date);
  const studySeconds = {};
  if (source.studySeconds && typeof source.studySeconds === "object" && !Array.isArray(source.studySeconds)) {
    for (const [key, value] of Object.entries(source.studySeconds).slice(-1500)) {
      if (/^\d{4}-\d{2}-\d{2}$/.test(key)) studySeconds[key] = Math.min(86400, Math.max(0, Number(value) || 0));
    }
  }
  const state = { profile, tasks, exams, studySeconds };
  if (JSON.stringify(state).length > 512 * 1024) throw new Error("STATE_TOO_LARGE");
  return state;
}

async function ensureUser(env, user) {
  const now = new Date().toISOString();
  await env.DB.prepare("INSERT INTO users (email, full_name, state_json, initialized, created_at, updated_at) VALUES (?, ?, '{}', 0, ?, ?) ON CONFLICT(email) DO UPDATE SET full_name = CASE WHEN excluded.full_name <> '' THEN excluded.full_name ELSE users.full_name END, updated_at = excluded.updated_at").bind(user.email, user.name, now, now).run();
}

async function handleBootstrap(env, user) {
  await ensureStorage(env);
  await ensureUser(env, user);
  const row = await env.DB.prepare("SELECT full_name, state_json, initialized FROM users WHERE email = ?").bind(user.email).first();
  const materialResult = await env.DB.prepare("SELECT id, name, size, type, mime, created_at AS createdAt FROM materials WHERE user_email = ? ORDER BY created_at DESC").bind(user.email).all();
  let state = null;
  try { state = row?.initialized ? JSON.parse(row.state_json) : null; } catch { state = null; }
  return json({ user: { email: user.email, name: row?.full_name || user.name || "სტუდენტი" }, isNew: !row?.initialized, state, materials: materialResult.results || [] });
}

async function handleState(request, env, user) {
  const length = Number(request.headers.get("content-length") || 0);
  if (length > 600 * 1024) return json({ error: "მონაცემები ზედმეტად დიდია." }, 413);
  let body;
  try { body = await request.json(); } catch { return json({ error: "არასწორი მონაცემებია." }, 400); }
  let state;
  try { state = sanitizeState(body, user.name); } catch { return json({ error: "მონაცემების მოცულობა დასაშვებს აღემატება." }, 413); }
  await ensureStorage(env);
  await ensureUser(env, user);
  const now = new Date().toISOString();
  await env.DB.prepare("UPDATE users SET state_json = ?, initialized = 1, updated_at = ? WHERE email = ?").bind(JSON.stringify(state), now, user.email).run();
  return json({ ok: true });
}

async function accountHash(email) {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(email));
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

async function handleMaterialUpload(request, env, user) {
  const length = Number(request.headers.get("content-length") || 0);
  if (length > 12 * 1024 * 1024) return json({ error: "ფაილი 8 MB-ს აღემატება." }, 413);
  let body;
  try { body = await request.json(); } catch { return json({ error: "ფაილის მონაცემები არასწორია." }, 400); }
  const id = cleanString(body.id, 120);
  const name = cleanString(body.name, 180);
  const extension = name.toLowerCase().split(".").pop();
  if (!id || !/^[a-zA-Z0-9._-]+$/.test(id) || !["pdf", "docx", "pptx", "txt", "md", "csv"].includes(extension)) return json({ error: "ფაილის ფორმატი არ არის მხარდაჭერილი." }, 400);
  if (typeof body.data !== "string" || body.data.length > 11.5 * 1024 * 1024) return json({ error: "ფაილი 8 MB-ს აღემატება." }, 413);
  const encoded = body.data.includes(",") ? body.data.slice(body.data.indexOf(",") + 1) : body.data;
  let bytes;
  try { bytes = base64Bytes(encoded); } catch { return json({ error: "ფაილის წაკითხვა ვერ მოხერხდა." }, 400); }
  if (!bytes.length || bytes.length > 8 * 1024 * 1024) return json({ error: "ფაილი ცარიელია ან 8 MB-ს აღემატება." }, 413);
  await ensureStorage(env);
  await ensureUser(env, user);
  const existing = await env.DB.prepare("SELECT r2_key FROM materials WHERE user_email = ? AND id = ?").bind(user.email, id).first();
  const key = `${await accountHash(user.email)}/${id}`;
  const mime = cleanString(body.type, 120) || "application/octet-stream";
  await env.BUCKET.put(key, bytes, { httpMetadata: { contentType: mime } });
  const now = new Date().toISOString();
  await env.DB.prepare("INSERT INTO materials (user_email, id, name, size, type, mime, r2_key, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?) ON CONFLICT(user_email, id) DO UPDATE SET name = excluded.name, size = excluded.size, type = excluded.type, mime = excluded.mime, r2_key = excluded.r2_key, created_at = excluded.created_at").bind(user.email, id, name, bytes.length, extension.toUpperCase(), mime, key, now).run();
  if (existing?.r2_key && existing.r2_key !== key) await env.BUCKET.delete(existing.r2_key);
  return json({ material: { id, name, size: bytes.length, type: extension.toUpperCase(), mime, createdAt: now } }, 201);
}

async function handleMaterial(request, env, user, id) {
  await ensureStorage(env);
  const row = await env.DB.prepare("SELECT name, mime, r2_key FROM materials WHERE user_email = ? AND id = ?").bind(user.email, id).first();
  if (!row) return json({ error: "მასალა ვერ მოიძებნა." }, 404);
  if (request.method === "DELETE") {
    await env.BUCKET.delete(row.r2_key);
    await env.DB.prepare("DELETE FROM materials WHERE user_email = ? AND id = ?").bind(user.email, id).run();
    return json({ ok: true });
  }
  const object = await env.BUCKET.get(row.r2_key);
  if (!object) return json({ error: "ფაილი საცავში ვერ მოიძებნა." }, 404);
  return new Response(object.body, { headers: { "content-type": row.mime || "application/octet-stream", "content-disposition": `inline; filename*=UTF-8''${encodeURIComponent(row.name)}`, "cache-control": "private, no-store", "x-content-type-options": "nosniff" } });
}

function demoReply(message, mode) {
  const topic = message.length > 120 ? message.slice(0, 117) + "…" : message;
  const replies = {
    explain: `მოდი, თემა მარტივად დავშალოთ: „${topic}“\n\n1. ჯერ განსაზღვრე მთავარი ცნება ერთი წინადადებით.\n2. შემდეგ ნახე ერთი კონკრეტული მაგალითი.\n3. ბოლოს საკუთარი სიტყვებით ახსენი, რატომ მუშაობს ეს მაგალითი.\n\nსავარჯიშო: ჩამოწერე რა უკვე იცი ამ თემაზე და რომელი ნაბიჯი გეჩვენება გაუგებარი — შემდეგ ზუსტად იმ ნაწილს გავარჩევთ.`,
    tutor: `პირდაპირ პასუხს ჯერ არ გეტყვი — ერთად მივიდეთ.\n\nშენი კითხვა იყო: „${topic}“\n\nპირველი მინიშნება: რა არის ამ ამოცანის საწყისი მონაცემი და რა შედეგის მიღება გვინდა? დაწერე ეს ორი ნაწილი ცალ-ცალკე.`,
    quiz: `მოკლე ტესტი თემაზე „${topic}“\n\n1. ახსენი მთავარი ცნება ერთი წინადადებით.\n2. მოიყვანე ერთი სწორი და ერთი არასწორი მაგალითი.\n3. რა შეიცვლება, თუ საწყის პირობას შევცვლით?\n\nმომწერე პასუხები 1–3 ნომრებით და თითოეულს ცალ-ცალკე შეგიფასებ.`,
    summary: `კონსპექტის ჩარჩო თემაზე „${topic}“\n\n• მთავარი იდეა — ერთი ზუსტი წინადადება\n• ძირითადი ტერმინები — 3–5 ცნება\n• მუშაობის პრინციპი — ნაბიჯების მოკლე ჯაჭვი\n• პრაქტიკული მაგალითი — ერთი რეალური შემთხვევა\n• ხშირი შეცდომა — რა უნდა ავირიდოთ\n• თვითშემოწმება — ორი მოკლე კითხვა\n\nრეალურ AI რეჟიმში ამ ჩარჩოს შენი ატვირთული მასალის მიხედვით შევავსებ.`,
  };
  return replies[mode] || replies.explain;
}

function extractResponseText(payload) {
  if (typeof payload.output_text === "string" && payload.output_text.trim()) return payload.output_text.trim();
  const parts = [];
  for (const step of payload.steps || []) {
    for (const content of step.content || []) {
      if ((content.type === "text" || content.type === "output_text") && typeof content.text === "string") parts.push(content.text);
    }
  }
  return parts.join("\n").trim();
}

function base64Bytes(value) {
  const binary = atob(value);
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index += 1) bytes[index] = binary.charCodeAt(index);
  return bytes;
}

function findZipEntries(bytes, selector) {
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  let eocd = -1;
  for (let offset = bytes.length - 22; offset >= Math.max(0, bytes.length - 65557); offset -= 1) {
    if (view.getUint32(offset, true) === 0x06054b50) { eocd = offset; break; }
  }
  if (eocd < 0) throw new Error("ZIP_END_NOT_FOUND");
  const entryCount = view.getUint16(eocd + 10, true);
  let offset = view.getUint32(eocd + 16, true);
  const entries = [];
  for (let index = 0; index < entryCount; index += 1) {
    if (offset + 46 > bytes.length || view.getUint32(offset, true) !== 0x02014b50) throw new Error("ZIP_DIRECTORY_INVALID");
    const flags = view.getUint16(offset + 8, true);
    const compression = view.getUint16(offset + 10, true);
    const compressedSize = view.getUint32(offset + 20, true);
    const uncompressedSize = view.getUint32(offset + 24, true);
    const nameLength = view.getUint16(offset + 28, true);
    const extraLength = view.getUint16(offset + 30, true);
    const commentLength = view.getUint16(offset + 32, true);
    const localOffset = view.getUint32(offset + 42, true);
    const name = new TextDecoder().decode(bytes.subarray(offset + 46, offset + 46 + nameLength));
    if (selector(name)) entries.push({ name, flags, compression, compressedSize, uncompressedSize, localOffset });
    offset += 46 + nameLength + extraLength + commentLength;
  }
  return entries;
}

async function readZipEntry(bytes, entry) {
  if (entry.flags & 1) throw new Error("ZIP_ENCRYPTED");
  if (entry.uncompressedSize > 2.5 * 1024 * 1024) throw new Error("ZIP_ENTRY_TOO_LARGE");
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  const offset = entry.localOffset;
  if (offset + 30 > bytes.length || view.getUint32(offset, true) !== 0x04034b50) throw new Error("ZIP_ENTRY_INVALID");
  const nameLength = view.getUint16(offset + 26, true);
  const extraLength = view.getUint16(offset + 28, true);
  const start = offset + 30 + nameLength + extraLength;
  const end = start + entry.compressedSize;
  if (start < 0 || end > bytes.length) throw new Error("ZIP_ENTRY_BOUNDS");
  const compressed = bytes.subarray(start, end);
  if (entry.compression === 0) return compressed;
  if (entry.compression !== 8) throw new Error("ZIP_COMPRESSION_UNSUPPORTED");
  const stream = new Blob([compressed]).stream().pipeThrough(new DecompressionStream("deflate-raw"));
  const output = new Uint8Array(await new Response(stream).arrayBuffer());
  if (output.length > 2.5 * 1024 * 1024) throw new Error("ZIP_ENTRY_TOO_LARGE");
  return output;
}

function xmlText(xml) {
  return xml.replace(/<w:tab\b[^>]*\/>/g, "\t").replace(/<w:br\b[^>]*\/>/g, "\n").replace(/<a:br\b[^>]*\/>/g, "\n").replace(/<\/w:p>/g, "\n").replace(/<\/a:p>/g, "\n").replace(/<[^>]+>/g, "").replace(/&#x([0-9a-f]+);/gi, (_, value) => String.fromCodePoint(parseInt(value, 16))).replace(/&#([0-9]+);/g, (_, value) => String.fromCodePoint(parseInt(value, 10))).replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&apos;/g, "'").replace(/&amp;/g, "&").replace(/[ \t]+\n/g, "\n").replace(/\n{3,}/g, "\n\n").trim();
}

async function extractOfficeText(base64, extension) {
  const bytes = base64Bytes(base64);
  const isDocx = extension === "docx";
  const entries = findZipEntries(bytes, (name) => isDocx ? name === "word/document.xml" : /^ppt\/slides\/slide[0-9]+\.xml$/.test(name));
  if (!entries.length) throw new Error("OFFICE_CONTENT_NOT_FOUND");
  entries.sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }));
  const chunks = [];
  let totalLength = 0;
  for (const entry of entries) {
    const content = await readZipEntry(bytes, entry);
    const text = xmlText(new TextDecoder().decode(content));
    if (text) { chunks.push(isDocx ? text : `სლაიდი ${chunks.length + 1}:\n${text}`); totalLength += text.length; }
    if (totalLength > 220000) break;
  }
  const result = chunks.join("\n\n").slice(0, 220000).trim();
  if (!result) throw new Error("OFFICE_TEXT_EMPTY");
  return result;
}

async function handleChat(request, env) {
  const length = Number(request.headers.get("content-length") || 0);
  if (length > 12 * 1024 * 1024) return json({ error: "მოთხოვნა ზედმეტად დიდია." }, 413);
  let body;
  try { body = await request.json(); } catch { return json({ error: "არასწორი მოთხოვნა." }, 400); }
  const message = typeof body.message === "string" ? body.message.trim() : "";
  const mode = ["explain", "tutor", "quiz", "summary"].includes(body.mode) ? body.mode : "explain";
  const style = ["brief", "balanced", "deep"].includes(body.style) ? body.style : "balanced";
  if (!message || message.length > 8000) return json({ error: "კითხვა უნდა შეიცავდეს 1–8000 სიმბოლოს." }, 400);
  if (!env.GEMINI_API_KEY) return json({ text: demoReply(message, mode), demo: true });

  const modeRules = {
    explain: "Explain the topic clearly, using a concrete example and a short self-check question.",
    tutor: "Use Socratic tutoring. Ask one useful question at a time and do not reveal the complete answer immediately.",
    quiz: "Create an adaptive short quiz. Ask one question first, then wait for the student's answer before grading.",
    summary: "Create a structured study note with core ideas, terms, examples, common mistakes, and review questions.",
  };
  const history = Array.isArray(body.history) ? body.history.slice(-8).filter((item) => item && ["user", "assistant"].includes(item.role) && typeof item.content === "string") : [];
  const conversation = history.map((item) => `${item.role === "user" ? "სტუდენტი" : "ასისტენტი"}: ${item.content.slice(0, 8000)}`).join("\n\n");
  const prompt = `${conversation ? `წინა საუბარი:\n${conversation}\n\n` : ""}სტუდენტის ახალი კითხვა: ${message}`;
  let interactionInput = [{ type: "text", text: prompt }];
  const file = body.attachment;
  if (file) {
    if (typeof file.name !== "string" || typeof file.data !== "string" || file.data.length >= 11 * 1024 * 1024) return json({ error: "მიმაგრებული ფაილი არასწორია ან 8 MB-ს აღემატება." }, 413);
    const base64 = file.data.includes(",") ? file.data.slice(file.data.indexOf(",") + 1) : file.data;
    const extension = file.name.toLowerCase().split(".").pop();
    try {
      if (extension === "pdf") {
        interactionInput = [{ type: "document", data: base64, mime_type: "application/pdf" }, { type: "text", text: prompt }];
      } else if (extension === "csv") {
        interactionInput = [{ type: "document", data: base64, mime_type: "text/csv" }, { type: "text", text: prompt }];
      } else if (["docx", "pptx"].includes(extension)) {
        const officeText = await extractOfficeText(base64, extension);
        interactionInput = [{ type: "text", text: `${prompt}\n\n--- მიმაგრებული ფაილი: ${file.name} ---\n${officeText}\n--- ფაილის დასასრული ---` }];
      } else if (["txt", "md"].includes(extension)) {
        const plainText = new TextDecoder().decode(base64Bytes(base64)).slice(0, 220000).trim();
        if (!plainText) return json({ error: "მიმაგრებულ ტექსტურ ფაილში წასაკითხი ტექსტი არ არის." }, 400);
        interactionInput = [{ type: "text", text: `${prompt}\n\n--- მიმაგრებული ფაილი: ${file.name} ---\n${plainText}\n--- ფაილის დასასრული ---` }];
      } else {
        return json({ error: "ამ ფაილის ფორმატი ჯერ არ არის მხარდაჭერილი. გამოიყენე PDF, DOCX, PPTX, TXT, MD ან CSV." }, 400);
      }
    } catch {
      return json({ error: "ფაილის შიგთავსის წაკითხვა ვერ მოხერხდა. გადაამოწმე, რომ ფაილი დაზიანებული არ არის, ან შეინახე PDF ფორმატში." }, 400);
    }
  }
  const styleRules = { brief: "Keep the response concise and focused on the essentials.", balanced: "Give a concise explanation plus one useful example.", deep: "Explain step by step in greater depth, with examples and a short recap." };
  const socraticRule = body.socratic && mode === "tutor" ? "Prefer guiding questions and reveal hints progressively." : "";
  const instructions = `You are Studia AI, a Georgian-first university study assistant. Respond in natural, correct Georgian unless the student explicitly asks for another language. ${modeRules[mode]} ${styleRules[style]} ${socraticRule} Be accurate, direct, supportive, and pedagogical. Preserve academic integrity: help the student understand and practice, but do not facilitate cheating in an active exam. When an uploaded document is present, ground the answer in it and clearly distinguish document-grounded claims from general knowledge. Never invent a page number, quotation, citation, or source. State uncertainty plainly. Use compact formatting suited to a student dashboard.`;
  let upstream;
  try {
    upstream = await fetch("https://generativelanguage.googleapis.com/v1beta/interactions", {
      method: "POST",
      headers: { "x-goog-api-key": env.GEMINI_API_KEY, "content-type": "application/json" },
      body: JSON.stringify({
        model: env.GEMINI_MODEL || "gemini-3.5-flash",
        system_instruction: instructions,
        input: interactionInput,
        generation_config: { thinking_level: "low", temperature: 0.45 },
        store: false,
      }),
    });
  } catch {
    return json({ text: demoReply(message, mode), demo: true, warning: "AI სერვერთან კავშირი დროებით ვერ დამყარდა — პასუხი დემო რეჟიმში მომზადდა." });
  }
  if (!upstream.ok) {
    let upstreamError = null;
    try { upstreamError = await upstream.json(); } catch { /* malformed upstream response */ }
    const status = upstreamError?.error?.status;
    const messageText = upstreamError?.error?.message || "";
    if (upstream.status === 429 || status === "RESOURCE_EXHAUSTED") return json({ text: demoReply(message, mode), demo: true, warning: "Gemini-ის უფასო მოთხოვნების ლიმიტი ამოიწურა — პასუხი დემო რეჟიმში მომზადდა." });
    if (upstream.status === 401 || upstream.status === 403 || messageText.includes("API key")) return json({ text: demoReply(message, mode), demo: true, warning: "Gemini API გასაღების დადასტურება ვერ მოხერხდა — პასუხი დემო რეჟიმში მომზადდა." });
    if (upstream.status === 400 && messageText.toLowerCase().includes("model")) return json({ text: demoReply(message, mode), demo: true, warning: "არჩეული Gemini მოდელი მიუწვდომელია — პასუხი დემო რეჟიმში მომზადდა." });
    return json({ text: demoReply(message, mode), demo: true, warning: "AI სერვისი დროებით მიუწვდომელია — პასუხი დემო რეჟიმში მომზადდა." });
  }
  const payload = await upstream.json();
  const text = extractResponseText(payload);
  if (!text) return json({ error: "AI-მ ცარიელი პასუხი დააბრუნა." }, 502);
  return json({ text, demo: false });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === "/manifest.webmanifest") return new Response(JSON.stringify({ name: "Studia AI", short_name: "Studia", lang: "ka", start_url: "/", display: "standalone", background_color: "#07101f", theme_color: "#07101f", description: "ქართული AI სასწავლო ასისტენტი უნივერსიტეტის სტუდენტებისთვის.", icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any maskable" }] }), { headers: { "content-type": "application/manifest+json; charset=utf-8", "cache-control": "public, max-age=86400" } });
    if (url.pathname === "/icon.svg") return new Response(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#7a6eff"/><stop offset="1" stop-color="#4434dc"/></linearGradient></defs><rect width="512" height="512" rx="128" fill="#07101f"/><path d="M256 92c-40-42-120-19-120 48-49 14-57 84-15 110-30 55 24 111 79 91 12 45 79 53 101 15V156c-5-22-18-45-45-64Zm0 0c40-42 120-19 120 48 49 14 57 84 15 110 30 55-24 111-79 91-12 45-79 53-101 15" fill="none" stroke="url(#g)" stroke-width="28" stroke-linecap="round"/><circle cx="392" cy="394" r="40" fill="#44e4b5"/></svg>`, { headers: { "content-type": "image/svg+xml; charset=utf-8", "cache-control": "public, max-age=86400" } });
    if (url.pathname === "/favicon.ico") return Response.redirect(new URL("/icon.svg", url), 302);
    if (url.pathname === "/sw.js") return new Response(`const CACHE="studia-ai-v6";const ASSETS=["/icon.svg","/manifest.webmanifest"];self.addEventListener("install",e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS))));self.addEventListener("activate",e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))))));self.addEventListener("fetch",e=>{const u=new URL(e.request.url);if(e.request.method!=="GET"||!ASSETS.includes(u.pathname))return;e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(n=>{const copy=n.clone();caches.open(CACHE).then(c=>c.put(e.request,copy));return n}))) });`, { headers: { "content-type": "application/javascript; charset=utf-8", "cache-control": "no-cache", "service-worker-allowed": "/" } });
    if (url.pathname === "/api/auth/google" && request.method === "POST") {
      try { return await handleGoogleSignIn(request, env); }
      catch (error) { console.error("Google sign-in error", error instanceof Error ? error.message : error); return json({ error: "Google-ით შესვლა დროებით ვერ მოხერხდა." }, 500); }
    }
    if (url.pathname === "/api/auth/logout" && request.method === "POST") {
      try { return await handleGoogleSignOut(request, env); }
      catch (error) { console.error("Google sign-out error", error instanceof Error ? error.message : error); return json({ error: "ანგარიშიდან გასვლა დროებით ვერ მოხერხდა." }, 500); }
    }
    let user = null;
    try { user = await getAuthenticatedUser(request, env); }
    catch (error) { console.error("Session lookup error", error instanceof Error ? error.message : error); }
    if (url.pathname.startsWith("/api/")) {
      if (!user) return json({ error: "Google ანგარიშით შესვლაა საჭირო." }, 401);
      try {
        if (url.pathname === "/api/status" && request.method === "GET") return json({ connected: Boolean(env.GEMINI_API_KEY), provider: env.GEMINI_API_KEY ? "Gemini" : "Demo" });
        if (url.pathname === "/api/bootstrap" && request.method === "GET") return handleBootstrap(env, user);
        if (url.pathname === "/api/state" && ["PUT", "POST"].includes(request.method)) return handleState(request, env, user);
        if (url.pathname === "/api/materials" && request.method === "POST") return handleMaterialUpload(request, env, user);
        const materialMatch = url.pathname.match(/^\/api\/materials\/([^/]+)$/);
        if (materialMatch && ["GET", "DELETE"].includes(request.method)) {
          let materialId;
          try { materialId = decodeURIComponent(materialMatch[1]); } catch { return json({ error: "მასალის მისამართი არასწორია." }, 400); }
          return handleMaterial(request, env, user, materialId);
        }
        if (url.pathname === "/api/chat" && request.method === "POST") return handleChat(request, env);
        return json({ error: "მისამართი ვერ მოიძებნა." }, 404);
      } catch (error) {
        console.error("Studia API error", error instanceof Error ? error.message : error);
        return json({ error: "სერვერზე დროებითი შეცდომაა. სცადე ხელახლა." }, 500);
      }
    }
    if (url.pathname !== "/" || request.method !== "GET") return new Response("Not found", { status: 404 });
    const headers = {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "private, no-store",
      "x-content-type-options": "nosniff",
      "referrer-policy": "strict-origin-when-cross-origin",
      "content-security-policy": user ? "default-src 'self'; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'self'; base-uri 'none'; frame-ancestors 'none'; form-action 'self'" : "default-src 'self'; style-src 'self' 'unsafe-inline' https://accounts.google.com/gsi/style; script-src 'self' 'unsafe-inline' https://accounts.google.com/gsi/client; img-src 'self' data: https://lh3.googleusercontent.com; connect-src 'self' https://accounts.google.com/gsi/; frame-src https://accounts.google.com/gsi/; base-uri 'none'; frame-ancestors 'none'; form-action 'self'",
    };
    if (!user) headers["cross-origin-opener-policy"] = "same-origin-allow-popups";
    return new Response(user ? page : renderSignInPage(env.GOOGLE_CLIENT_ID), {
      headers,
    });
  },
};
