const fs = require('fs');
const path = require('path');

const http = require('http');
const PORT = process.env.PORT || 3000;
const iconPath = path.join(__dirname, 'generated-icon.png');
const iconBuffer = fs.existsSync(iconPath) ? fs.readFileSync(iconPath) : null;

const server = http.createServer((req, res) => {
  if (req.url === '/favicon.ico' || req.url === '/generated-icon.png') {
    if (iconBuffer) {
      res.writeHead(200, { 'Content-Type': 'image/png' });
      res.end(iconBuffer);
    } else {
      res.writeHead(404);
      res.end();
    }
    return;
  }

  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(renderPage());
});

server.listen(PORT, () => {
  console.log(`Buy & Sell gateway ready on http://localhost:${PORT}`);
});

function renderPage() {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>FlowCart Gateway | Buy & Sell Online</title>
  <link rel="icon" href="/favicon.ico" />
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg: #0b1021;
      --card: #111630;
      --muted: #c5c9e8;
      --primary: #5be0c4;
      --accent: #6c7bff;
      --warning: #f7c948;
      --border: rgba(255, 255, 255, 0.08);
      --shadow: 0 18px 40px rgba(0, 0, 0, 0.28);
    }

    * { box-sizing: border-box; }

    body {
      margin: 0;
      font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      background: radial-gradient(circle at 20% 20%, rgba(91, 224, 196, 0.12), transparent 35%),
                  radial-gradient(circle at 80% 10%, rgba(108, 123, 255, 0.14), transparent 32%),
                  radial-gradient(circle at 50% 70%, rgba(247, 201, 72, 0.12), transparent 40%),
                  var(--bg);
      color: #f6f7fb;
      line-height: 1.6;
      min-height: 100vh;
    }

    header {
      position: sticky;
      top: 0;
      z-index: 10;
      backdrop-filter: blur(14px);
      background: rgba(11, 16, 33, 0.85);
      border-bottom: 1px solid var(--border);
    }

    nav {
      max-width: 1100px;
      margin: 0 auto;
      padding: 16px 18px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
    }

    .brand {
      display: flex;
      align-items: center;
      gap: 10px;
      font-weight: 700;
      letter-spacing: 0.4px;
      color: #fff;
      text-decoration: none;
    }

    .brand-badge {
      width: 38px;
      height: 38px;
      border-radius: 12px;
      background: linear-gradient(135deg, var(--accent), var(--primary));
      display: grid;
      place-items: center;
      font-weight: 800;
      color: #0b1021;
      box-shadow: var(--shadow);
    }

    .pill {
      padding: 10px 14px;
      border-radius: 999px;
      border: 1px solid var(--border);
      background: rgba(255, 255, 255, 0.04);
      color: var(--muted);
      font-weight: 600;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      gap: 10px;
      transition: transform 120ms ease, border-color 120ms ease;
    }

    .pill:hover { transform: translateY(-1px); border-color: rgba(91, 224, 196, 0.6); }

    main { max-width: 1100px; margin: 0 auto; padding: 32px 18px 64px; }

    .hero {
      display: grid;
      gap: 22px;
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid var(--border);
      border-radius: 24px;
      padding: 28px;
      box-shadow: var(--shadow);
    }

    .hero h1 { margin: 0; font-size: clamp(30px, 6vw, 46px); line-height: 1.1; }
    .hero p { margin: 10px 0 0; color: var(--muted); font-size: 16px; }

    .actions { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 18px; }

    .btn {
      border: none;
      border-radius: 14px;
      padding: 12px 16px;
      font-weight: 700;
      cursor: pointer;
      transition: transform 120ms ease, box-shadow 120ms ease;
      display: inline-flex;
      align-items: center;
      gap: 8px;
    }

    .btn.primary { background: linear-gradient(135deg, var(--primary), var(--accent)); color: #0b1021; box-shadow: var(--shadow); }
    .btn.secondary { background: rgba(255, 255, 255, 0.08); color: #fff; border: 1px solid var(--border); }
    .btn:hover { transform: translateY(-1px); }

    .stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(170px, 1fr)); gap: 12px; margin-top: 20px; }
    .stat-card { padding: 14px; border-radius: 18px; background: rgba(17, 22, 48, 0.8); border: 1px solid var(--border); }
    .stat-card strong { display: block; font-size: 22px; margin-bottom: 4px; }
    .stat-card span { color: var(--muted); }

    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 18px;
      margin-top: 28px;
    }

    .card {
      background: rgba(17, 22, 48, 0.8);
      border: 1px solid var(--border);
      border-radius: 18px;
      padding: 18px;
      box-shadow: var(--shadow);
    }

    .card h3 { margin-top: 0; margin-bottom: 8px; }
    .card p { margin: 0; color: var(--muted); }

    .badge { display: inline-flex; align-items: center; gap: 6px; padding: 6px 10px; border-radius: 999px; background: rgba(91, 224, 196, 0.12); color: var(--primary); font-weight: 700; font-size: 13px; }

    .product-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(190px, 1fr)); gap: 14px; margin-top: 14px; }

    .product {
      border: 1px solid var(--border);
      border-radius: 16px;
      padding: 14px;
      background: rgba(255, 255, 255, 0.02);
    }

    .product .tag { font-size: 12px; color: var(--muted); }
    .product .price { font-weight: 800; font-size: 18px; margin: 6px 0 0; }

    .steps {
      display: grid;
      gap: 12px;
      margin-top: 12px;
    }

    .step {
      padding: 12px;
      border-radius: 14px;
      background: rgba(255, 255, 255, 0.03);
      border: 1px dashed var(--border);
    }

    .cta {
      margin-top: 28px;
      padding: 22px;
      border-radius: 20px;
      background: linear-gradient(135deg, rgba(91, 224, 196, 0.18), rgba(108, 123, 255, 0.26));
      color: #0b1021;
      display: grid;
      gap: 12px;
      border: 1px solid rgba(255, 255, 255, 0.45);
    }

    footer { text-align: center; color: var(--muted); margin-top: 32px; }

    @media (max-width: 640px) {
      nav { padding: 14px; }
      .hero { padding: 22px; }
      .actions { flex-direction: column; }
    }
  </style>
</head>
<body>
  <header>
    <nav>
      <a href="#" class="brand" aria-label="FlowCart home">
        <span class="brand-badge">FC</span>
        <span>FlowCart Gateway</span>
      </a>
      <a href="#pricing" class="pill" aria-label="View pricing">
        <span class="dot" style="width: 8px; height: 8px; background: var(--primary); border-radius: 999px;"></span>
        Live in 5 minutes
      </a>
    </nav>
  </header>

  <main>
    <section class="hero">
      <div>
        <div class="badge">Mobile-first checkout</div>
        <h1>Buy & sell online with a gateway built for speed.</h1>
        <p>Launch a seamless storefront, accept secure payments, and manage orders from a single responsive hub. Optimized for mobile so your customers never pinch-to-zoom again.</p>
        <div class="actions">
          <button class="btn primary" aria-label="Start selling">Start selling</button>
          <button class="btn secondary" aria-label="Preview buyer experience">Preview buyer experience</button>
        </div>
      </div>
      <div class="grid stats">
        <div class="stat-card">
          <strong>1.2s</strong>
          <span>Average mobile load with edge caching.</span>
        </div>
        <div class="stat-card">
          <strong>99.99%</strong>
          <span>Uptime backed by redundant gateways.</span>
        </div>
        <div class="stat-card">
          <strong>+18%</strong>
          <span>Lift in checkout completion on small screens.</span>
        </div>
      </div>
    </section>

    <section class="grid" aria-label="Gateway advantages">
      <article class="card">
        <h3>Unified checkout</h3>
        <p>Card, wallets, and BNPL in one interface with adaptive fields that resize for every device.</p>
      </article>
      <article class="card">
        <h3>Trust & security</h3>
        <p>PCI-ready vaulting, 3D Secure, and fraud signals to protect every order.</p>
      </article>
      <article class="card">
        <h3>Merchant command</h3>
        <p>Real-time dashboards, payouts, and stock syncing across channels.</p>
      </article>
    </section>

    <section class="card" aria-label="Showcase products">
      <div class="actions" style="justify-content: space-between; align-items: center;">
        <h3 style="margin: 0;">Mobile-ready product grid</h3>
        <span class="badge">Tap-to-cart</span>
      </div>
      <div class="product-grid">
        <div class="product">
          <div class="tag">Digital</div>
          <strong>AI Course Bundle</strong>
          <p class="price">$49.00</p>
          <p>Instant delivery with license keys auto-issued at checkout.</p>
        </div>
        <div class="product">
          <div class="tag">Physical</div>
          <strong>Minimalist Backpack</strong>
          <p class="price">$86.00</p>
          <p>Inventory-aware with low-stock prompts on mobile.</p>
        </div>
        <div class="product">
          <div class="tag">Subscription</div>
          <strong>Pro Commerce Suite</strong>
          <p class="price">$29.00 / mo</p>
          <p>Recurring billing with customer self-serve management.</p>
        </div>
      </div>
    </section>

    <section class="card" id="pricing" aria-label="Getting started">
      <h3>Launch in three steps</h3>
      <div class="steps">
        <div class="step"><strong>Connect payments.</strong> Plug in your processor or enable FlowCart Vault in one click.</div>
        <div class="step"><strong>Design your gateway.</strong> Drag-and-drop sections or drop the embed script into your app.</div>
        <div class="step"><strong>Go live everywhere.</strong> Share a mobile landing link or embed on web, native, and POS.</div>
      </div>
      <div class="actions" style="margin-top: 16px;">
        <button class="btn primary" aria-label="Create free store">Create free store</button>
        <button class="btn secondary" aria-label="View API docs">View API docs</button>
      </div>
    </section>

    <section class="cta" aria-label="Global gateway promo">
      <div>
        <h3 style="margin: 0;">Built for every screen, ready for global sales.</h3>
        <p style="margin: 4px 0 0;">Localized currencies, smart tax, and adaptive layouts give buyers a fast, trustworthy checkout from their phone.</p>
      </div>
      <div class="actions">
        <button class="btn secondary" style="background: rgba(255,255,255,0.2); color: #0b1021;" aria-label="Talk to sales">Talk to sales</button>
        <button class="btn primary" aria-label="Get sandbox keys">Get sandbox keys</button>
      </div>
    </section>

    <footer>
      FlowCart Gateway · Mobile-first commerce rails · Secure. Fast. Global.
    </footer>
  </main>
</body>
</html>`;
}
