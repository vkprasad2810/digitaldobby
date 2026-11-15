// Builds one plain HTML page per case study from the CASES list in js/deck.js,
// so Google can read each case and it can be shared on its own.
// Run from the project folder after changing a case study:
//   node setup/build-case-pages.mjs
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';

const BASE = 'https://digitaldobby.com';
const deck = readFileSync('js/deck.js', 'utf8');
const src = deck.match(/const CASES = (\[[\s\S]*?\n\]);/);
if (!src) throw new Error('CASES list not found in js/deck.js');
const CASES = Function(`return ${src[1]}`)();

const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
// shared <head> pieces (Google tag, favicon, fonts, stylesheet) come from 404.html
const head404 = readFileSync('404.html', 'utf8').split('<style>')[0]
  .replace(/<title>[^<]*<\/title>\n/, '')
  .replace('  <meta name="robots" content="noindex" />\n', '');

const page = (c, i) => {
  const url = `${BASE}/case-studies/${c.id}/`;
  const others = CASES.filter(o => o.id !== c.id);
  const desc = `${c.name} case study: ${c.results.map(r => `${r.v} ${r.l.toLowerCase()}`).join(', ')}. How Digital Dobby did it.`.slice(0, 158);
  return `${head404.replace('<head>\n', '<head>\n')}  <title>${esc(c.name)} case study — Digital Dobby</title>
  <meta name="description" content="${esc(desc)}" />
  <link rel="canonical" href="${url}" />
  <meta property="og:title" content="${esc(c.name)} case study — Digital Dobby" />
  <meta property="og:description" content="${esc(desc)}" />
  <meta property="og:type" content="article" />
  <meta property="og:url" content="${url}" />
  <meta property="og:image" content="${BASE}/assets/og-image.png" />
  <meta name="twitter:card" content="summary_large_image" />
  <script type="application/ld+json">${JSON.stringify({
    '@context': 'https://schema.org', '@type': 'Article',
    headline: `${c.name} case study`, description: desc, url,
    image: `${BASE}/assets/og-image.png`,
    author: { '@type': 'Organization', name: 'Digital Dobby', url: `${BASE}/` },
    publisher: { '@id': `${BASE}/#organization` }
  })}</script>
  <style>
    .cs-bar { display: flex; justify-content: space-between; align-items: center; gap: 16px; padding: 20px 0; }
    .cs-bar a { text-decoration: none; color: var(--ink); font-weight: 600; }
    .cs-bar .logo-word { font-family: var(--font-display); font-size: 18px; letter-spacing: .14em; text-transform: uppercase; }
    .cs-hero { background: var(--c); color: var(--cfg); border-radius: 28px; padding: clamp(32px, 6vw, 64px); display: grid; gap: 18px; }
    .cs-hero .eyebrow-t { font-size: 13px; letter-spacing: .12em; text-transform: uppercase; font-weight: 600; opacity: .75; }
    .cs-hero h1 { font-size: clamp(40px, 7vw, 80px); font-weight: 800; letter-spacing: -.04em; line-height: .95; }
    .cs-hero .lead { font-size: clamp(18px, 2vw, 22px); max-width: 640px; line-height: 1.45; }
    .cs-chips { display: flex; flex-wrap: wrap; gap: 8px; }
    .cs-chips span { border: 1px solid currentColor; border-radius: 999px; padding: 5px 13px; font-size: 14px; opacity: .85; }
    .cs-body { display: grid; gap: 56px; padding: 64px 0 40px; }
    .cs-body h2 { font-size: clamp(26px, 3.4vw, 38px); letter-spacing: -.02em; margin-bottom: 18px; }
    .cs-body p { font-size: 18px; line-height: 1.65; max-width: 720px; color: var(--ink-2); }
    .cs-results { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; }
    .cs-results div { border: 1px solid var(--line); border-radius: 20px; padding: 26px; display: grid; gap: 8px; align-content: start; }
    .cs-results b { font-family: var(--font-display); font-size: clamp(40px, 5vw, 58px); letter-spacing: -.03em; line-height: 1; color: var(--accent-ink); }
    .cs-results span { color: var(--ink-2); }
    .cs-steps { list-style: none; margin: 0; padding: 0; display: grid; gap: 14px; }
    .cs-steps li { display: grid; gap: 4px; padding: 20px 24px; background: var(--paper-2); border-radius: 18px; }
    .cs-steps b { font-family: var(--font-display); font-size: 20px; }
    .cs-steps span { color: var(--ink-2); font-size: 17px; }
    .cs-tags { display: flex; flex-wrap: wrap; gap: 8px; }
    .cs-tags span { background: var(--paper-2); border-radius: 999px; padding: 6px 14px; font-size: 15px; }
    .cs-cta { background: var(--dark); color: var(--paper); border-radius: 28px; padding: clamp(32px, 6vw, 56px); display: grid; gap: 18px; justify-items: start; }
    .cs-cta h2 { font-size: clamp(28px, 4vw, 44px); letter-spacing: -.03em; }
    .cs-cta p { color: rgba(244,239,230,.7); font-size: 18px; max-width: 560px; }
    .cs-actions { display: flex; flex-wrap: wrap; gap: 12px; }
    .cs-wa { border: 1px solid rgba(244,239,230,.35); color: var(--paper); }
    .cs-wa:hover { border-color: var(--paper); }
    .cs-more { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 14px; }
    .cs-more a { text-decoration: none; color: var(--ink); border: 1px solid var(--line); border-radius: 18px; padding: 20px; display: grid; gap: 6px; }
    .cs-more a:hover { border-color: var(--ink); }
    .cs-more b { font-family: var(--font-display); font-size: 20px; }
    .cs-more span { color: var(--muted); font-size: 15px; }
    .cs-foot { padding: 30px 0 50px; border-top: 1px solid var(--line); color: var(--muted); font-size: 15px; display: flex; gap: 18px; flex-wrap: wrap; justify-content: space-between; }
    .cs-foot a { color: var(--muted); }
  </style>
</head>
<body>
  <div class="container">
    <header class="cs-bar">
      <a href="/" class="logo-word">Digital Dobby</a>
      <a href="/case-studies.html">All case studies →</a>
    </header>

    <main>
      <section class="cs-hero" style="--c:${esc(c.color)}; --cfg:${esc(c.fg)}">
        <span class="eyebrow-t">Case study · ${esc(c.industry)}</span>
        <h1>${esc(c.name)}</h1>
        <p class="lead">${esc(c.challenge)}</p>
        <div class="cs-chips"><span>Timeline: ${esc(c.timeline)}</span><span>Goal: ${esc(c.objective)}</span></div>
      </section>

      <div class="cs-body">
        <section>
          <h2>The results</h2>
          <div class="cs-results">
${c.results.map(r => `            <div><b>${esc(r.v)}</b><span>${esc(r.l)}</span></div>`).join('\n')}
          </div>
        </section>

        <section>
          <h2>The challenge</h2>
          <p>${esc(c.challenge)}</p>
        </section>

        <section>
          <h2>What we did</h2>
          <ul class="cs-steps">
${c.approach.map(a => `            <li><b>${esc(a.t)}</b><span>${esc(a.d)}</span></li>`).join('\n')}
          </ul>
        </section>

        <section>
          <h2>Services involved</h2>
          <div class="cs-tags">${c.tags.map(t => `<span>${esc(t)}</span>`).join('')}</div>
        </section>

        <section class="cs-cta">
          <h2>Want results like ${esc(c.name)}'s?</h2>
          <p>Tell us about your brand and goals. We'll reply within one business day with ideas for your situation.</p>
          <div class="cs-actions">
            <a href="/#contact" class="btn btn-accent">Start a project <span class="arrow">→</span></a>
            <a href="https://wa.me/919819861621?text=${encodeURIComponent(`Hi Digital Dobby, I saw the ${c.name} case study and I'd like to grow my brand.`)}" class="btn cs-wa" target="_blank" rel="noopener" data-whatsapp>Chat on WhatsApp</a>
          </div>
        </section>

        <section>
          <h2>More case studies</h2>
          <div class="cs-more">
${others.map(o => `            <a href="/case-studies/${o.id}/"><b>${esc(o.name)}</b><span>${esc(o.results[0].v)} ${esc(o.results[0].l.toLowerCase())}</span></a>`).join('\n')}
          </div>
        </section>
      </div>
    </main>

    <footer class="cs-foot">
      <span>© ${new Date().getFullYear()} Digital Dobby</span>
      <span><a href="/privacy.html">Privacy</a> · <a href="/terms.html">Terms</a></span>
    </footer>
  </div>
  <script>
    document.querySelectorAll('[data-whatsapp]').forEach(function (a) {
      a.addEventListener('click', function () {
        if (typeof window.gtag === 'function') window.gtag('event', 'whatsapp_click', { link_location: 'case_study' });
      });
    });
  </script>
</body>
</html>
`;
};

for (const [i, c] of CASES.entries()) {
  mkdirSync(`case-studies/${c.id}`, { recursive: true });
  writeFileSync(`case-studies/${c.id}/index.html`, page(c, i));
  console.log(`case-studies/${c.id}/index.html`);
}
