/* ==========================================================================
   Digital Dobby — case study deck
   Edit the CASES list below to change the deck. Each case becomes two slides:
   an overview (challenge, services, art) and an approach & results slide.
   ========================================================================== */

const CONTACT_EMAIL = 'digital.dobbyy@gmail.com';

const CASES = [
  {
    id: 'iskcon',
    name: 'ISKCON',
    industry: 'Spirituality, tourism & hospitality',
    tags: ['Content strategy', 'Social media', 'Website', 'Performance ads', 'SEO'],
    color: '#E8B13A', fg: '#121212',
    timeline: '8 months',
    objective: 'Spread the word of spirituality through different modes',
    challenge: 'Conceptualise a campaign to inspire a disconnected, unassociated youth — and reignite their connection with, and immersion in, the teachings of ISKCON.',
    approach: [
      { t: 'Inspiration-led strategy', d: 'Built the whole campaign around "inspirations" rather than instruction.' },
      { t: 'Stories that resonate', d: 'Content drawn from inspiring Bhagavad Gita stories and yoga stories from the monk leader.' },
      { t: 'A website with three flows', d: 'A convergence point for Inner Thoughts, Teachings and the State of Wellbeing.' }
    ],
    results: [
      { v: '200K', l: 'New Instagram followers in 8 months' },
      { v: '3x', l: 'Share of voice for the monk leader (Social Chatter)' },
      { v: '+25%', l: 'Growth in the ISKCON donation fund' }
    ],
    platforms: ['googleads', 'facebook', 'youtube', 'instagram', 'brevo', 'googleanalytics', 'googlesearchconsole', 'googlemaps'],
    art: `<circle cx="200" cy="130" r="40"/><path d="M200 60V30M200 230v-30M130 130h-30M300 130h-30M150 80l-21-21M271 201l-21-21M150 180l-21 21M271 59l-21 21"/><path d="M60 240c60-30 220-30 280 0"/>`
  },
  {
    id: 'interface',
    name: 'InterFace',
    industry: 'SaaS · Automation · Analytics for real estate',
    tags: ['Google Ads', 'Landing pages', 'Email marketing', 'Lead nurturing'],
    color: '#3B5BFF', fg: '#FFFFFF',
    timeline: '8–9 months',
    objective: 'Bring more leads into the business',
    challenge: 'A WordPress-based real estate software website facing low lead generation, underperforming Google Ads campaigns, and weak engagement and conversion across its digital touchpoints.',
    approach: [
      { t: 'Data-driven Google Ads', d: 'Rebuilt campaigns around performance data to bring in better-quality leads.' },
      { t: 'Landing page optimisation', d: 'Optimised landing pages for a smoother user experience and higher lead capture.' },
      { t: 'Email nurture workflows', d: 'Targeted email workflows to nurture new leads and re-engage existing users.' }
    ],
    results: [
      { v: '+40%', l: 'Increase in ad conversions' },
      { v: '+25%', l: 'Boost in email open rates' },
      { v: '+30%', l: 'Website engagement & lead capture' }
    ],
    platforms: ['googleads', 'facebook', 'linkedin', 'hubspot', 'mailchimp', 'semrush', 'hootsuite', 'googleanalytics'],
    art: `<path d="M30 220V160M80 220V130M130 220V150M180 220V100M230 220V110M280 220V70M330 220V40"/><path d="M30 150L80 120 130 140 180 90 230 100 280 60 360 30"/><circle cx="360" cy="30" r="8"/>`
  },
  {
    id: 'rioga-premium',
    name: 'Rioga Premium',
    industry: 'Real estate consultancy',
    tags: ['Brand building', 'Website', 'Social influence', 'SEO', 'Performance ads'],
    color: '#121212', fg: '#F4EFE6',
    timeline: '10 months',
    objective: 'Generate maximum leads through every digital channel',
    challenge: 'In a cluttered category of developers, sellers and resellers, reposition a large, acclaimed broker — generating leads while magnifying its credibility and lifting how the market perceives it.',
    approach: [
      { t: 'Locally targeted launches', d: 'Every unit was locally targeted, with insight-driven keywords across the campaign period.' },
      { t: 'A 360° offering', d: 'Brand building, website, social influence, SEO and performance ads working in tandem.' },
      { t: 'Faster landing pages', d: 'Quicker, better-scoring landing pages that turn visits into enquiries.' }
    ],
    results: [
      { v: '200+', l: 'Potential leads in 2 months for most residential launches' },
      { v: '+40%', l: 'Improvement in website traffic' },
      { v: '+50%', l: 'Better site score with faster landing pages' }
    ],
    platforms: ['googleads', 'facebook', 'youtube', 'instagram', 'zapier', 'semrush'],
    art: `<path d="M40 230h320"/><path d="M70 230V120h50v110M130 230V70h60v160M200 230V140h45v90M255 230V95h55v135"/><path d="M88 145h14M88 170h14M88 195h14M150 95h20M150 125h20M150 155h20M150 185h20M272 120h22M272 150h22M272 180h22"/>`
  },
  {
    id: 'jollywell',
    name: 'Jollywell',
    industry: 'Wellness · Plant-based supplements',
    tags: ['SEO', 'Google & social ads', 'Email automation', 'Website redesign', 'Influencer marketing'],
    color: '#2E6B4F', fg: '#FFFFFF',
    timeline: '11 months',
    objective: 'Boost sales and promote the brand',
    challenge: 'Despite a functional website and quality products, Jollywell struggled in the competitive wellness and nutrition space with weak organic rankings, low traffic, high bounce rates and limited conversions.',
    approach: [
      { t: 'SEO & content', d: 'Optimised website content and metadata to boost organic visibility.' },
      { t: 'A/B-tested ads', d: 'Targeted Google and social media ads, improving ROI through continuous A/B testing.' },
      { t: 'Email & website optimisation', d: 'Automated re-engagement emails (+20% engagement) plus a UX and page-speed redesign.' }
    ],
    results: [
      { v: '+45%', l: 'Increase in organic traffic' },
      { v: '+25%', l: 'Improvement in ad conversion rates' },
      { v: '−25%', l: 'Reduction in bounce rates' }
    ],
    platforms: ['googleads', 'facebook', 'youtube', 'instagram', 'zapier', 'figma', 'brevo'],
    art: `<path d="M200 230C120 180 90 120 120 70c25-40 70-30 80 10 10-40 55-50 80-10 30 50 0 110-80 160z"/><path d="M200 80v150M140 140c30 0 50 20 60 40M260 140c-30 0-50 20-60 40"/>`
  },
  {
    id: 'design-letters',
    name: 'Design Letters',
    industry: 'E-commerce · Jewellery (Shopify)',
    tags: ['On-page & off-page SEO', 'Google Ads', 'Shopify optimisation'],
    color: '#E8DFD0', fg: '#121212',
    timeline: '8 months',
    objective: 'Build digital presence and boost monthly conversions',
    challenge: 'A Shopify-based jewellery store struggling to grow organic traffic, rank higher in search, optimise site performance and generate cost-effective conversions through Google Ads.',
    approach: [
      { t: 'On-page & off-page SEO', d: 'A full SEO programme that earned page-one rankings for key search terms.' },
      { t: 'Google Ads for ROI', d: 'Restructured campaigns to drive cost-effective conversions.' },
      { t: 'Faster, smoother site', d: 'Performance optimisations that made pages load 25% faster.' }
    ],
    results: [
      { v: '+45%', l: 'Increase in organic traffic' },
      { v: '+30%', l: 'Improvement in ad performance' },
      { v: '+20%', l: 'Boost in conversion rate' }
    ],
    platforms: ['googleads', 'youtube', 'instagram', 'zapier', 'semrush', 'shopify'],
    art: `<circle cx="165" cy="150" r="70"/><circle cx="235" cy="150" r="70"/><path d="M180 30h40l16 20-36 38-36-38z"/>`
  }
];

// Charts for each case's "results in numbers" slide. Every figure comes from the case study.
// compare: before → after bars, either raw numbers or indexed to 100 at kick-off (tag = the change).
// side: rings for headline results, or a snapshot of where the numbers stand today.
const VIZ = {
  iskcon: {
    compare: { note: 'Indexed: kick-off = 100', rows: [
      { l: 'Monk leader share of voice', b: 100, a: 300, bl: '1x', al: '3x', tag: '3x' },
      { l: 'ISKCON donation fund', b: 100, a: 125, bl: '100', al: '125', tag: '+25%' }
    ] },
    side: { type: 'rings', title: 'Headline results', items: [
      { v: '200K', l: 'New Instagram followers in 8 months' },
      { v: '3x', l: 'Share of voice' },
      { v: '+25%', l: 'Donation fund' }
    ] }
  },
  interface: {
    compare: { note: 'Source: Semrush & Google Analytics', rows: [
      { l: 'Organic search traffic', b: 410, a: 3200, bl: '410', al: '3,200' },
      { l: 'Active users', b: 1000, a: 6400, bl: '1,000', al: '6,400' },
      { l: 'Backlinks', b: 156, a: 6731, bl: '156', al: '6,731' },
      { l: 'Authority score', b: 3, a: 17, bl: '3', al: '17' }
    ] },
    side: { type: 'rings', title: 'Headline results', items: [
      { v: '+40%', l: 'Ad conversions' },
      { v: '+25%', l: 'Email open rates' },
      { v: '+30%', l: 'Engagement & lead capture' }
    ] }
  },
  'rioga-premium': {
    compare: { note: 'Source: Semrush', rows: [
      { l: 'Organic search traffic', b: 7, a: 5400, bl: '7', al: '5,400' },
      { l: 'Backlinks', b: 101, a: 6100, bl: '101', al: '6,100' },
      { l: 'Authority score', b: 3, a: 12, bl: '3', al: '12' }
    ] },
    side: { type: 'rings', title: 'Headline results', items: [
      { v: '200+', l: 'Leads in 2 months per launch' },
      { v: '+40%', l: 'Website traffic' },
      { v: '+50%', l: 'Site score' }
    ] }
  },
  jollywell: {
    compare: { note: 'Indexed: kick-off = 100', rows: [
      { l: 'Organic traffic', b: 100, a: 145, bl: '100', al: '145', tag: '+45%' },
      { l: 'Ad conversion rate', b: 100, a: 125, bl: '100', al: '125', tag: '+25%' },
      { l: 'Email engagement', b: 100, a: 120, bl: '100', al: '120', tag: '+20%' },
      { l: 'Bounce rate (lower is better)', b: 100, a: 75, bl: '100', al: '75', tag: '−25%' }
    ] },
    side: { type: 'rings', title: 'Headline results', items: [
      { v: '+45%', l: 'Organic traffic' },
      { v: '+25%', l: 'Ad conversion rate' },
      { v: '+20%', l: 'Email engagement' },
      { v: '−25%', l: 'Bounce rate' }
    ] }
  },
  'design-letters': {
    compare: { note: 'Indexed: kick-off = 100', rows: [
      { l: 'Organic traffic', b: 100, a: 145, bl: '100', al: '145', tag: '+45%' },
      { l: 'Ad performance', b: 100, a: 130, bl: '100', al: '130', tag: '+30%' },
      { l: 'Conversion rate', b: 100, a: 120, bl: '100', al: '120', tag: '+20%' },
      { l: 'Page load time (lower is better)', b: 100, a: 75, bl: '100', al: '75', tag: '25% faster' }
    ] },
    side: { type: 'snapshot', title: 'Semrush snapshot after the project', items: [
      { v: '31', l: 'Authority score' },
      { v: '7.3K', l: 'Organic search traffic' },
      { v: '3.6K', l: 'Ranking keywords' },
      { v: '9K', l: 'Backlinks' }
    ] }
  }
};

const INDUSTRIES = ['FMCG / Food & Beverage', 'Technology / SaaS', 'Real Estate', 'E-commerce', 'Healthcare & Wellness', 'Spirituality & Tourism', 'Ed-Tech', 'Entertainment'];
const CAPABILITIES = ['Performance marketing', 'Search engine marketing', 'SEO', 'Social media', 'Email marketing', 'Research & strategy', 'Content & copywriting', 'Funnels & CRO'];

/* ---------- Helpers ---------- */
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const pad = n => String(n).padStart(2, '0');
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- Slide templates ---------- */
// platform slug -> brand icon (paths in js/icons.js); name shows on hover
const platformIcon = slug => {
  const ic = (window.DD_ICONS || {})[slug];
  if (!ic) return '';
  return `<li data-name="${esc(ic.t)}" style="--brand:${ic.hex}"><svg viewBox="0 0 24 24" role="img" aria-label="${esc(ic.t)}"><path d="${ic.d}"/></svg></li>`;
};
function weaveArt() {
  // a small woven patch: ink horizontals, accent verticals
  let h = '', v = '';
  for (let i = 0; i < 7; i++) {
    const y = 140 + i * 40;
    const hw = Math.sqrt(196 * 196 - (y - 260) ** 2);
    let d = '';
    for (let x = Math.ceil(260 - hw); x <= 260 + hw; x += 4) {
      d += (d ? 'L' : 'M') + x + ' ' + (y + 7 * Math.cos(Math.PI * (x - 120) / 40 + i * Math.PI)).toFixed(1);
    }
    h += `<path d="${d}" style="--dd:${(i * 0.08).toFixed(2)}"/>`;
  }
  for (let j = 0; j < 8; j++) {
    const x = 120 + j * 40;
    const hh = Math.sqrt(196 * 196 - (x - 260) ** 2);
    v += `<path d="M${x} ${(260 - hh).toFixed(1)}V${(260 + hh).toFixed(1)}" style="--dd:${(0.2 + j * 0.07).toFixed(2)}"/>`;
  }
  return `<svg class="art cover-art" viewBox="0 0 520 520" aria-hidden="true">
    <circle cx="260" cy="260" r="236" style="opacity:.3"/>
    <g>${h}</g><g class="acc" stroke-width="2.4">${v}</g></svg>`;
}

const coverSlide = () => `
  <section class="slide s-cover" id="cover" data-title="Cover">
    <div class="slide-inner cover-grid">
      <div>
        <p class="kicker anim">Digital Dobby · Case Study Deck · ${new Date().getFullYear()}</p>
        <h1 class="anim">Results, <em class="serif">woven in.</em></h1>
        <p class="lead anim">${CASES.length} brands across spirituality, SaaS, real estate, wellness and e-commerce — and how data, strategy and creativity turned their marketing into measurable growth.</p>
        <div class="cover-meta anim">${['Strategy', 'Performance', 'SEO', 'Social', 'Content'].map(t => `<span>${t}</span>`).join('')}</div>
        <button type="button" class="btn btn-accent btn-lg anim" data-go="1">Start the deck <span class="arrow">↓</span></button>
      </div>
      ${weaveArt()}
    </div>
  </section>`;

const aboutSlide = () => `
  <section class="slide s-about dark" id="who-we-are" data-title="Who we are">
    <div class="slide-inner about-grid">
      <div>
        <p class="kicker anim">Who we are</p>
        <h2 class="anim">Digital strategies that <em class="serif">connect the dots.</em></h2>
        <p class="lead anim">Digital Dobby is led by founder Monika Saha, with 8+ years across performance marketing, SEO, social media, content and digital strategy for B2B and B2C brands. Good marketing isn't just about getting attention — it's about knowing what to do with it.</p>
        <svg class="art dots-art" viewBox="0 0 400 70" aria-hidden="true">
          <path d="M10 50L90 18 170 44 250 12 330 40 390 20"/>
          ${[[10, 50], [90, 18], [170, 44], [250, 12], [330, 40], [390, 20]].map(([x, y], k) => `<circle cx="${x}" cy="${y}" r="5" style="--dd:${(0.3 + k * 0.12).toFixed(2)}"/>`).join('')}
        </svg>
        <div class="about-stats anim">
          <div><b>8+</b><span>Years of experience</span></div>
          <div><b>8</b><span>Industries</span></div>
          <div><b>B2B + B2C</b><span>Brands</span></div>
        </div>
      </div>
      <div class="about-lists">
        <h4 class="anim">Industries we've worked across</h4>
        <ul class="pill-list anim">${INDUSTRIES.map(t => `<li>${esc(t)}</li>`).join('')}</ul>
        <h4 class="anim">Capabilities</h4>
        <ul class="pill-list anim">${CAPABILITIES.map(t => `<li>${esc(t)}</li>`).join('')}</ul>
      </div>
    </div>
  </section>`;

const indexSlide = () => `
  <section class="slide s-index" id="contents" data-title="Contents">
    <div class="slide-inner">
      <div class="idx-head">
        <div>
          <p class="kicker anim">Contents</p>
          <h2 class="anim">Selected <em class="serif">work.</em></h2>
        </div>
        <p class="lead anim" style="margin:0">Click any project to jump straight to it, or use the arrow keys to move through the deck.</p>
      </div>
      <div class="idx-list">
        ${CASES.map((c, i) => `
          <a class="idx-row anim" href="#${c.id}" style="--c:${c.color};--fg:${c.fg}">
            <span class="idx-no">${pad(i + 1)}</span>
            <span class="idx-name">${esc(c.name)}</span>
            <span class="idx-tag">${esc(c.industry)}</span>
            <span class="idx-res"><b>${esc(c.results[0].v)}</b>${esc(c.results[0].l)}</span>
            <span class="arrow" aria-hidden="true">→</span>
          </a>`).join('')}
      </div>
    </div>
  </section>`;

const caseSlide = (c, i) => `
  <section class="slide s-case${isDarkColor(c.color) ? ' dark' : ''}" id="${c.id}" data-title="${esc(c.name)}" style="--bg:${c.color};--fg:${c.fg}">
    <div class="slide-inner case-grid">
      <div class="case-text">
        <p class="kicker anim">Case ${pad(i + 1)} — ${esc(c.industry)}</p>
        <h2 class="anim">${esc(c.name)}</h2>
        <div class="case-block anim">
          <h4>The challenge</h4>
          <p>${esc(c.challenge)}</p>
        </div>
        <div class="case-tags anim">${c.tags.map(t => `<span>${esc(t)}</span>`).join('')}</div>
        <dl class="facts anim">
          <div><dt>Duration</dt><dd>${esc(c.timeline)}</dd></div>
          <div><dt>Objective</dt><dd>${esc(c.objective)}</dd></div>
        </dl>
      </div>
      <div class="case-art">
        <span class="case-no anim">${pad(i + 1)}</span>
        <svg class="art" viewBox="0 0 400 260" aria-hidden="true">${c.art}</svg>
      </div>
    </div>
  </section>`;

const resultsSlide = c => `
  <section class="slide s-results" id="${c.id}-results" data-title="${esc(c.name)} — results">
    <div class="slide-inner results-grid">
      <div>
        <p class="kicker anim">${esc(c.name)} — the approach</p>
        <h2 class="anim">How we <em class="serif">did it.</em></h2>
        <ol class="steps">
          <svg class="art steps-line" viewBox="0 0 2 100" preserveAspectRatio="none" aria-hidden="true"><path d="M1 0V100" style="--dd:.3"/></svg>
          ${c.approach.map((a, k) => `
            <li class="anim">
              <span>${pad(k + 1)}</span>
              <div><h4>${esc(a.t)}</h4><p>${esc(a.d)}</p></div>
            </li>`).join('')}
        </ol>
      </div>
      <div class="results">
        <p class="kicker anim" style="margin-bottom:0">${esc(c.resultsLabel || 'The results')}</p>
        ${c.results.map((r, k) => `
          <div class="result anim">
            <b>${esc(r.v)}</b>
            <svg class="art uline" viewBox="0 0 380 14" preserveAspectRatio="none" aria-hidden="true"><path d="M2 10C90 3 250 2 378 7" style="--dd:${(0.5 + k * 0.2).toFixed(1)}"/></svg>
            <span>${esc(r.l)}</span>
          </div>`).join('')}
        ${c.platforms ? `<div class="platforms anim"><h4>Platforms used</h4><ul>${c.platforms.map(platformIcon).join('')}</ul></div>` : ''}
      </div>
    </div>
  </section>`;

const vizHead = (c, title, note) => `
      <div class="viz-head">
        <div>
          <p class="kicker anim">${esc(c.name)} — results in numbers</p>
          <h2 class="anim">${title}</h2>
        </div>
        ${note ? `<p class="viz-note anim">${esc(note)}</p>` : ''}
      </div>`;

// For a case with no published numbers: VIZ[id] = { loop: [4 steps] } draws how an always-on programme works
function loopArt(steps) {
  const cx = 320, cy = 180, R = 120, rad = d => d * Math.PI / 180;
  const pt = d => [cx + R * Math.cos(rad(d)), cy + R * Math.sin(rad(d))].map(n => n.toFixed(1));
  let arcs = '', nodes = '', labels = '';
  const pos = [[320, 24, 'middle'], [480, 186, 'start'], [320, 348, 'middle'], [160, 186, 'end']];
  steps.forEach((s, k) => {
    const a0 = -90 + k * 90 + 14, a1 = a0 + 62;
    const [x0, y0] = pt(a0), [x1, y1] = pt(a1);
    const tx = -Math.sin(rad(a1)), ty = Math.cos(rad(a1));
    const head = sgn => {
      const ang = Math.atan2(-ty, -tx) + sgn * Math.PI / 6;
      return [(+x1 + 11 * Math.cos(ang)).toFixed(1), (+y1 + 11 * Math.sin(ang)).toFixed(1)];
    };
    const [hx1, hy1] = head(1), [hx2, hy2] = head(-1);
    arcs += `<path d="M${x0} ${y0}A${R} ${R} 0 0 1 ${x1} ${y1}" style="--dd:${(0.2 + k * 0.25).toFixed(2)}"/>`
          + `<path d="M${hx1} ${hy1}L${x1} ${y1}L${hx2} ${hy2}" style="--dd:${(0.6 + k * 0.25).toFixed(2)}"/>`;
    const [nx, ny] = pt(-90 + k * 90);
    nodes += `<circle class="node" cx="${nx}" cy="${ny}" r="24" style="--dd:${(0.1 + k * 0.25).toFixed(2)}"/>`
           + `<text class="num anim" x="${nx}" y="${(+ny + 8).toFixed(1)}" text-anchor="middle">${k + 1}</text>`;
    const [lx, ly, anchor] = pos[k];
    labels += `<text class="anim" x="${lx}" y="${ly}" text-anchor="${anchor}">${esc(s)}</text>`;
  });
  return `<svg class="art loop-art" viewBox="0 0 640 360" role="img" aria-label="${esc(steps.join(' → '))}, repeated every quarter">
    ${arcs}${nodes}${labels}
    <text class="center-1 anim" x="${cx}" y="${cy - 2}" text-anchor="middle">Every quarter</text>
    <text class="center-2 anim" x="${cx}" y="${cy + 22}" text-anchor="middle">a fresh UGC contest</text>
  </svg>`;
}

const RING_C = 326.73; // circumference of r = 52
function ringPct(v) {
  const m = String(v).match(/([\d.]+)\s*%/);
  return m ? Math.min(100, parseFloat(m[1])) : 100;
}

const vizSlide = c => {
  const v = VIZ[c.id];
  if (!v) return '';
  if (v.loop) return `
  <section class="slide s-viz" id="${c.id}-numbers" data-title="${esc(c.name)} — how it works">
    <div class="slide-inner">
      ${vizHead(c, 'An always-on <em class="serif">loop.</em>', v.note)}
      ${loopArt(v.loop)}
    </div>
  </section>`;

  const rows = v.compare.rows.map((r, k) => {
    const max = Math.max(r.b, r.a);
    return `
          <div class="cmp-row anim" style="--k:${k}">
            <div class="cmp-label"><span>${esc(r.l)}</span><b>${esc(r.tag || `${r.bl} → ${r.al}`)}</b></div>
            <div class="cmp-bars">
              <div class="bar before" style="--w:${(r.b / max * 100).toFixed(1)}%"><i></i><em>${esc(r.bl)}</em></div>
              <div class="bar after" style="--w:${(r.a / max * 100).toFixed(1)}%"><i></i><em>${esc(r.al)}</em></div>
            </div>
          </div>`;
  }).join('');

  const side = v.side.type === 'rings'
    ? `<div class="rings">${v.side.items.map(it => `
          <div class="ring anim">
            <div class="ring-dial">
              <svg viewBox="0 0 120 120" aria-hidden="true"><circle class="ring-bg" cx="60" cy="60" r="52"/><circle class="ring-fg" cx="60" cy="60" r="52" style="--pct:${ringPct(it.v)}"/></svg>
              <b data-count>${esc(it.v)}</b>
            </div>
            <span>${esc(it.l)}</span>
          </div>`).join('')}</div>`
    : `<div class="snaps">${v.side.items.map((it, k) => `
          <div class="snap anim">
            <b data-count>${esc(it.v)}</b>
            <svg class="art uline" viewBox="0 0 200 10" preserveAspectRatio="none" aria-hidden="true"><path d="M2 7C50 2 140 2 198 5" style="--dd:${(0.5 + k * 0.15).toFixed(2)}"/></svg>
            <span>${esc(it.l)}</span>
          </div>`).join('')}</div>`;

  return `
  <section class="slide s-viz" id="${c.id}-numbers" data-title="${esc(c.name)} — numbers">
    <div class="slide-inner">
      ${vizHead(c, 'The numbers, <em class="serif">visualised.</em>', v.compare.note)}
      <div class="viz-grid">
        <div class="viz-panel">
          <h4 class="anim">Before → after <span class="legend"><span><i class="lg-before"></i>Before</span><span><i class="lg-after"></i>After</span></span></h4>
          ${rows}
        </div>
        <div class="viz-panel">
          <h4 class="anim">${esc(v.side.title)}</h4>
          ${side}
        </div>
      </div>
    </div>
  </section>`;
};

const ctaSlide = () => `
  <section class="slide s-cta dark" id="next" data-title="Work with us">
    <div class="slide-inner cta-inner">
      <svg class="art cta-art" viewBox="0 0 220 120" aria-hidden="true">
        <path d="M8 110C50 100 70 70 110 74s60 20 80-10"/>
        <path d="M150 20l62-12-30 58-14-20z M168 46l44-38" style="--dd:.6"/>
      </svg>
      <p class="kicker anim">Let's work together</p>
      <h2 class="anim">Want results <em class="serif">like these?</em></h2>
      <p class="lead anim">Tell us where you want to grow. We'll come back within one business day with ideas, not a sales pitch.</p>
      <div class="cta-actions anim">
        <a href="index.html#contact" class="btn btn-accent btn-lg">Start a project <span class="arrow">→</span></a>
        <a href="mailto:${CONTACT_EMAIL}" class="btn btn-ghost light btn-lg">${CONTACT_EMAIL}</a>
      </div>
      <p class="cta-contact anim">
        <a href="https://www.linkedin.com/company/digital-dobbyy/about/" target="_blank" rel="noopener">LinkedIn</a> ·
        <a href="https://www.instagram.com/digital.dobbyy/" target="_blank" rel="noopener">Instagram</a> ·
        <a href="index.html">Back to the website</a>
      </p>
    </div>
  </section>`;

function isDarkColor(hex) {
  const n = parseInt(hex.slice(1), 16);
  const lum = 0.299 * (n >> 16) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255);
  return lum < 150;
}

/* ---------- Render ---------- */
const deck = $('.deck');
deck.innerHTML = coverSlide() + aboutSlide() + indexSlide()
  + CASES.map((c, i) => caseSlide(c, i) + resultsSlide(c) + vizSlide(c)).join('')
  + ctaSlide();

const slides = $$('.slide', deck);

// stagger the fade-ups inside each slide
slides.forEach(s => $$('.anim', s).forEach((el, i) => el.style.setProperty('--i', i)));

// measure every line so it can draw itself
$$('.art path, .art circle, .art line, .art rect', deck).forEach(el => {
  let len = 0;
  try { len = el.getTotalLength(); } catch (e) { /* ignore */ }
  el.classList.add('ln');
  el.style.setProperty('--len', Math.ceil(len) + 2 || 1000);
});

/* ---------- Navigation ---------- */
const total = slides.length;
$('.deck-total').textContent = pad(total);
const countEl = $('.deck-count b');
const progress = $('.deck-progress i');
const prevBtn = $('.deck-prev');
const nextBtn = $('.deck-next');
const dotsWrap = $('.deck-dots');
const dots = slides.map((s, i) => {
  const b = document.createElement('button');
  b.type = 'button';
  b.title = s.dataset.title;
  b.setAttribute('aria-label', `Go to slide ${i + 1}: ${s.dataset.title}`);
  b.addEventListener('click', () => go(i));
  dotsWrap.appendChild(b);
  return b;
});

let current = 0;
function setActive(i) {
  current = i;
  slides.forEach((s, k) => s.classList.toggle('active', k === i));
  dots.forEach((d, k) => d.classList.toggle('on', k === i));
  countEl.textContent = pad(i + 1);
  progress.style.transform = `scaleX(${(i + 1) / total})`;
  prevBtn.disabled = i === 0;
  nextBtn.disabled = i === total - 1;
  document.body.classList.toggle('on-dark', slides[i].classList.contains('dark'));
  $$('[data-count]', slides[i]).forEach(countUp);
  history.replaceState(null, '', '#' + slides[i].id);
}

// numbers like +40%, 6,731, 134.2K or 3x count up from zero when their slide opens
function countUp(el) {
  const final = el.dataset.final || (el.dataset.final = el.textContent);
  const m = final.match(/^([^\d]*)([\d.,]+)(.*)$/);
  if (!m || reduceMotion) return;
  const target = parseFloat(m[2].replace(/,/g, ''));
  const decimals = (m[2].split('.')[1] || '').length;
  const t0 = performance.now();
  const tick = now => {
    const t = clamp01((now - t0) / 1400);
    const n = target * (1 - Math.pow(1 - t, 3));
    const txt = m[2].includes(',') ? Math.round(n).toLocaleString('en-US') : n.toFixed(decimals);
    el.textContent = m[1] + txt + m[3];
    if (t < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}
const clamp01 = v => Math.min(1, Math.max(0, v));

// while a button/key jump is scrolling, ignore the slides it passes on the way
let lockUntil = 0;
function go(i) {
  i = Math.max(0, Math.min(total - 1, i));
  setActive(i);
  lockUntil = performance.now() + 1000;
  slides[i].scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
}

// whichever slide fills most of the screen is the active one
const ratios = new Map();
function pickActive() {
  if (performance.now() < lockUntil) return;
  let best = current, bestR = 0;
  slides.forEach((s, k) => { const r = ratios.get(s) || 0; if (r > bestR) { bestR = r; best = k; } });
  if (bestR > 0.35 && best !== current) setActive(best);
}
const io = new IntersectionObserver(entries => {
  entries.forEach(e => ratios.set(e.target, e.intersectionRatio));
  pickActive();
}, { threshold: [0, 0.2, 0.35, 0.5, 0.65, 0.8, 1] });
slides.forEach(s => io.observe(s));
window.addEventListener('scrollend', () => { lockUntil = 0; pickActive(); });

prevBtn.addEventListener('click', () => go(current - 1));
nextBtn.addEventListener('click', () => go(current + 1));
deck.addEventListener('click', e => {
  const btn = e.target.closest('[data-go]');
  if (btn) go(+btn.dataset.go);
  const row = e.target.closest('.idx-row');
  if (row) {
    e.preventDefault();
    go(slides.findIndex(s => '#' + s.id === row.getAttribute('href')));
  }
});

window.addEventListener('keydown', e => {
  if (e.metaKey || e.ctrlKey || e.altKey) return;
  const next = ['ArrowDown', 'ArrowRight', 'PageDown', ' '];
  const prev = ['ArrowUp', 'ArrowLeft', 'PageUp'];
  if (next.includes(e.key) && !e.shiftKey) { e.preventDefault(); go(current + 1); }
  else if (prev.includes(e.key) || (e.key === ' ' && e.shiftKey)) { e.preventDefault(); go(current - 1); }
  else if (e.key === 'Home') { e.preventDefault(); go(0); }
  else if (e.key === 'End') { e.preventDefault(); go(total - 1); }
});

window.addEventListener('hashchange', () => {
  const i = slides.findIndex(s => '#' + s.id === location.hash);
  if (i >= 0 && i !== current) go(i);
});

/* ---------- Download PDF (browser "Save as PDF") ---------- */
$('.deck-pdf').addEventListener('click', () => window.print());

/* ---------- Start on the slide in the URL, if any ---------- */
const startIdx = Math.max(0, slides.findIndex(s => '#' + s.id === location.hash));
setActive(startIdx);
if (startIdx > 0) {
  lockUntil = performance.now() + 1500;
  const jump = () => slides[startIdx].scrollIntoView({ behavior: 'instant', block: 'start' });
  jump();
  if (document.fonts) document.fonts.ready.then(() => { if (current === startIdx) jump(); });
}
