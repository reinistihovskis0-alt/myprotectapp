<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover">
  <meta name="theme-color" content="#020617">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
  <link rel="manifest" href="/manifest.json">
  <title>AEGIS TERMINAL</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&family=Orbitron:wght@400;700&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet">
  <style>
    body {
      font-family: 'JetBrains Mono', monospace;
      background-color: #020617;
      color: #f8fafc;
      overscroll-behavior-y: contain;
      user-select: none;
      -webkit-tap-highlight-color: transparent;
      margin: 0;
      padding: 0;
    }
    #root {
      min-height: 100vh;
    }
    .font-orbitron { font-family: 'Orbitron', sans-serif; }
    .glass {
      background: rgba(15, 23, 42, 0.8);
      backdrop-filter: blur(12px);
      border: 1px solid rgba(255, 255, 255, 0.05);
    }
    ::-webkit-scrollbar { display: none; }
    
    .glitch {
      position: relative;
    }
    .glitch::before {
      content: attr(data-text);
      position: absolute;
      left: -2px;
      text-shadow: 2px 0 #f43f5e;
      clip: rect(44px, 450px, 56px, 0);
      animation: glitch-anim 5s infinite linear alternate-reverse;
    }
    
    @keyframes glitch-anim {
      0% { clip: rect(10px, 9999px, 11px, 0); }
      100% { clip: rect(80px, 9999px, 90px, 0); }
    }
  </style>
<script type="importmap">
{
  "imports": {
    "react": "https://esm.sh/react@^19.2.4",
    "react-dom/": "https://esm.sh/react-dom@^19.2.4/",
    "react/": "https://esm.sh/react@^19.2.4/",
    "@google/genai": "https://esm.sh/@google/genai@^1.41.0",
    "vite": "https://esm.sh/vite@^7.3.1",
    "@vitejs/plugin-react": "https://esm.sh/@vitejs/plugin-react@^5.1.4"
  }
}
</script>
</head>
<body>
  <div id="root"></div>
  <script type="module" src="/index.tsx"></script>
</body>
</html>
