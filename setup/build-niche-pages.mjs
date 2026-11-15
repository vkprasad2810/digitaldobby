// Builds the niche landing pages (real estate, Shopify SEO, D2C) as plain HTML,
// so each can rank on Google for its own searches and be shared in outreach.
// Edit the NICHES list below, then run from the project folder:
//   node setup/build-niche-pages.mjs
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';

const BASE = 'https://digitaldobby.com';
const WA = '919819861621';

const NICHES = [
  {
    slug: 'real-estate-digital-marketing',
    nav: 'Real estate',
    title: 'Real Estate Digital Marketing Agency in India — Digital Dobby',
    description: 'Launch campaigns, lead ads and fast landing pages for real-estate developers and brokers. 200+ leads in 2 months for Rioga Premium.',
    eyebrow: 'Real estate · Developers · Brokers',
    h1: 'More site visits from every <em>project launch.</em>',
    lead: 'Launch windows are short, and junk leads waste your sales team’s time. We run locally targeted campaigns, fast landing pages and quick follow-up, so more enquiries turn into site visits.',
    whatsapp: "Hi Digital Dobby, I'd like help with marketing for a real-estate project.",
    pains: [
      'Leads that never pick up the phone, or were never really looking',
      'A launch window of a few weeks, and campaigns that take too long to get going',
      'Portals sending the same buyers to every developer in town',
      'Ads, website and sales follow-up that don’t talk to each other'
    ],
    services: [
      { t: 'Launch campaigns', d: 'Google Search and Meta lead campaigns, locally targeted to each project and micro-market, with keywords built from buyer searches.' },
      { t: 'Landing pages that convert', d: 'Fast, mobile-first project pages with floor plans, pricing cues and one clear enquiry form or WhatsApp button.' },
      { t: 'Lead quality and follow-up', d: 'Qualifying questions, instant WhatsApp and email replies, and tracking that shows which campaigns bring buyers who visit.' },
      { t: 'Brand and credibility', d: 'Social media, SEO and content that make your brand the one buyers already recognise when they compare projects.' },
      { t: 'Proptech and SaaS', d: 'For real-estate software companies: Google Ads, landing pages and email nurture that bring in demo requests.' }
    ],
    proof: [
      { id: 'rioga-premium', name: 'Rioga Premium', kind: 'Real estate consultancy', stats: [['200+', 'leads in 2 months for most residential launches'], ['+40%', 'website traffic'], ['+50%', 'better site score with faster landing pages']] },
      { id: 'interface', name: 'InterFace', kind: 'Real-estate SaaS', stats: [['+40%', 'ad conversions'], ['+30%', 'website engagement and lead capture'], ['+25%', 'email open rates']] }
    ],
    steps: [
      { t: 'Before launch', d: 'We study the micro-market, competing projects and buyer searches, then set targets for leads, cost per lead and site visits.' },
      { t: 'Launch week', d: 'Landing page, tracking and campaigns go live together, with WhatsApp and email replies set up so no enquiry waits.' },
      { t: 'During the launch', d: 'We shift budget daily towards the campaigns and areas that bring real site visits, and pause what brings junk leads.' },
      { t: 'After each month', d: 'You get a plain report: leads, cost per lead, site visits and what we’re changing next.' }
    ],
    faq: [
      { q: 'How much does digital marketing for a real-estate project cost?', a: 'Our plans start from ₹30,000 a month for management, plus ad spend that you pay directly to Google and Meta. Ad budgets for a launch depend on the city, project size and how many leads you need. We’ll suggest a realistic budget after a free audit.' },
      { q: 'How quickly can a launch campaign start?', a: 'Usually within one to two weeks, once we have the project details, creatives and RERA registration. Campaigns, landing page and tracking go live together.' },
      { q: 'Do your ads follow RERA rules?', a: 'Yes. We make sure ads and landing pages carry the project’s RERA registration details and avoid claims the rules don’t allow.' },
      { q: 'Do you work with brokers and channel partners too?', a: 'Yes. Rioga Premium, one of our case studies, is a real-estate consultancy. We also work with developers and real-estate software companies.' }
    ]
  },
  {
    slug: 'shopify-seo-agency',
    nav: 'Shopify SEO',
    title: 'Shopify SEO and Google Ads Agency in India — Digital Dobby',
    description: 'Shopify SEO, site speed and Google Ads for Indian stores. Organic traffic +45% and conversions +20% for Design Letters, a Shopify jewellery brand.',
    eyebrow: 'Shopify · E-commerce · D2C stores',
    h1: 'Shopify SEO that brings buyers, <em>not just visitors.</em>',
    lead: 'If your store depends on paid ads for every sale, organic search is the cheapest customer you’re not getting. We fix the technical SEO, speed and product pages, then use Google Ads to fill the gaps profitably.',
    whatsapp: "Hi Digital Dobby, I'd like help with SEO for my Shopify store.",
    pains: [
      'Product and collection pages that don’t show up on Google',
      'Rising ad costs and falling return on ad spend',
      'A slow store that loses mobile shoppers before the page loads',
      'Traffic that browses but doesn’t buy'
    ],
    services: [
      { t: 'Technical Shopify SEO', d: 'Fixing duplicate URLs, structured data, site structure and indexing issues that hold Shopify stores back.' },
      { t: 'Collection and product pages', d: 'Keyword research and rewritten titles, descriptions and collection copy that match what buyers search for.' },
      { t: 'Speed optimisation', d: 'Trimming heavy apps, images and scripts so pages load fast on mobile data.' },
      { t: 'Google Ads and Shopping', d: 'Restructured Search and Shopping campaigns focused on profitable products and cost-effective conversions.' },
      { t: 'Off-page SEO', d: 'Earning relevant links and mentions that lift your rankings for competitive terms.' }
    ],
    proof: [
      { id: 'design-letters', name: 'Design Letters', kind: 'Shopify jewellery store', stats: [['+45%', 'organic traffic'], ['+20%', 'conversion rate'], ['25%', 'faster page loads']] },
      { id: 'jollywell', name: 'Jollywell', kind: 'Wellness D2C', stats: [['+45%', 'organic traffic'], ['+25%', 'ad conversion rates'], ['−25%', 'bounce rate']] }
    ],
    steps: [
      { t: 'SEO and speed audit', d: 'We crawl the store, check Search Console and Analytics, and list what’s blocking rankings and sales, in priority order.' },
      { t: 'Fix the foundations', d: 'Technical fixes and speed improvements first, because they lift every page at once.' },
      { t: 'Grow the pages that sell', d: 'Collection and product page content, internal links and off-page work for the terms that bring buyers.' },
      { t: 'Report every month', d: 'Organic traffic, rankings for target terms, revenue from search and what we’re working on next.' }
    ],
    faq: [
      { q: 'How long does Shopify SEO take to work?', a: 'Technical and speed fixes can show results within weeks. Rankings for competitive terms usually build over three to six months. For Design Letters, organic traffic grew 45% over eight months.' },
      { q: 'How much does Shopify SEO cost?', a: 'Our plans start from ₹30,000 a month. Google Ads spend, if you add it, is paid directly to Google. A free audit will show where the quickest wins are for your store.' },
      { q: 'Do you need access to my Shopify admin?', a: 'Yes, staff access with limited permissions is enough, plus Google Search Console and Analytics. You stay the owner of every account.' },
      { q: 'Do you work with other platforms, like WooCommerce?', a: 'Yes. Most of what we do applies to any store, but Shopify is where we see the most stores held back by fixable issues.' }
    ]
  },
  {
    slug: 'd2c-marketing-agency',
    nav: 'D2C brands',
    title: 'D2C Marketing Agency for Wellness Brands — Digital Dobby',
    description: 'SEO, A/B-tested Meta and Google ads, email and social for Indian D2C brands. +45% organic traffic for Jollywell, a wellness brand.',
    eyebrow: 'D2C · Wellness · Beauty · Lifestyle',
    h1: 'Grow your D2C brand <em>without renting every customer.</em>',
    lead: 'Paid ads get expensive fast. We build the channels you own (search, email and social) alongside smarter, A/B-tested ads, so each new customer costs less over time.',
    whatsapp: "Hi Digital Dobby, I'd like help growing my D2C brand.",
    pains: [
      'Customer acquisition cost creeping up every quarter',
      'Almost all sales depending on Meta ads',
      'Shoppers who buy once and never come back',
      'Wellness and supplement claims that ad platforms keep rejecting'
    ],
    services: [
      { t: 'Performance ads', d: 'Meta and Google campaigns with continuous A/B testing of creatives, audiences and offers to lift return on ad spend.' },
      { t: 'SEO and content', d: 'Product, category and blog content that brings in shoppers searching for what you sell.' },
      { t: 'Email and retention', d: 'Welcome, abandoned-cart, post-purchase and win-back flows that turn first orders into repeat customers.' },
      { t: 'Social media and influencers', d: 'A content plan and creator partnerships that build trust before shoppers ever click an ad.' },
      { t: 'Website and conversion', d: 'UX and page-speed improvements so more visitors turn into orders.' }
    ],
    proof: [
      { id: 'jollywell', name: 'Jollywell', kind: 'Plant-based supplements', stats: [['+45%', 'organic traffic'], ['+25%', 'ad conversion rates'], ['−25%', 'bounce rate']] },
      { id: 'design-letters', name: 'Design Letters', kind: 'Shopify jewellery', stats: [['+45%', 'organic traffic'], ['+30%', 'ad performance'], ['+20%', 'conversion rate']] },
      { id: 'iskcon', name: 'ISKCON', kind: 'Social and community growth', stats: [['200K', 'Instagram followers in 8 months'], ['3x', 'share of voice'], ['+25%', 'donation fund']] }
    ],
    steps: [
      { t: 'Growth audit', d: 'We look at your ads, store, email and social together and find where money is leaking.' },
      { t: 'Quick wins', d: 'Fixing tracking, landing pages and email flows that pay back within weeks.' },
      { t: 'Test and scale', d: 'A steady rhythm of ad and creative tests, scaling what lowers acquisition cost.' },
      { t: 'Build owned channels', d: 'SEO, content and retention that keep paying off after the ad spend stops.' }
    ],
    faq: [
      { q: 'How much does D2C marketing cost?', a: 'Our plans start from ₹30,000 a month for one ad channel, plus ad spend paid directly to the platforms. Plans with SEO, email and social cost more. A free audit will show where to start.' },
      { q: 'Can you help with supplement and wellness ad rules?', a: 'Yes. We write ads and pages that stay within Meta, Google, ASCI and FSSAI guidelines, so campaigns aren’t rejected and claims stay honest.' },
      { q: 'Should we start with ads or SEO?', a: 'Usually both, weighted differently. Ads bring sales now while SEO and email build up over months. We’ll recommend a split based on your margins and goals.' },
      { q: 'Do you work with brands on Shopify?', a: 'Yes, most D2C brands we work with run on Shopify. See our Shopify SEO page for what we do there.' }
    ]
  }
];

const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const strip = s => s.replace(/<[^>]+>/g, '');
const head404 = readFileSync('404.html', 'utf8').split('<style>')[0]
  .replace(/<title>[^<]*<\/title>\n/, '')
  .replace('  <meta name="robots" content="noindex" />\n', '');

const STYLE = `
    .np-bar { display: flex; justify-content: space-between; align-items: center; gap: 16px; padding: 20px 0; flex-wrap: wrap; }
    .np-bar a { text-decoration: none; color: var(--ink); font-weight: 600; }
    .np-bar .logo-word { font-family: var(--font-display); font-size: 18px; letter-spacing: .14em; text-transform: uppercase; }
    .np-hero { background: var(--dark); color: var(--paper); border-radius: 28px; padding: clamp(32px, 6vw, 72px); display: grid; gap: 22px; }
    .np-hero .eyebrow-t { font-size: 13px; letter-spacing: .12em; text-transform: uppercase; font-weight: 600; color: rgba(244,239,230,.6); }
    .np-hero h1 { font-size: clamp(36px, 6vw, 72px); font-weight: 800; letter-spacing: -.035em; line-height: 1; max-width: 900px; }
    .np-hero h1 em { font-family: var(--font-serif); font-style: italic; font-weight: 400; color: var(--accent); letter-spacing: 0; }
    .np-hero .lead { font-size: clamp(18px, 2vw, 21px); line-height: 1.5; color: rgba(244,239,230,.78); max-width: 680px; }
    .np-actions { display: flex; flex-wrap: wrap; gap: 12px; }
    .np-wa { border: 1px solid rgba(244,239,230,.35); color: var(--paper); }
    .np-wa:hover { border-color: var(--paper); }
    .np-body { display: grid; gap: 64px; padding: 64px 0 40px; }
    .np-body h2 { font-size: clamp(26px, 3.4vw, 40px); letter-spacing: -.02em; margin-bottom: 20px; }
    .np-pains { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 12px; }
    .np-pains li { padding: 20px 22px; border: 1px solid var(--line); border-radius: 18px; font-size: 17px; line-height: 1.45; color: var(--ink-2); }
    .np-services { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 14px; }
    .np-services div { padding: 24px; background: var(--paper-2); border-radius: 20px; display: grid; gap: 8px; align-content: start; }
    .np-services b { font-family: var(--font-display); font-size: 20px; letter-spacing: -.01em; }
    .np-services span { color: var(--ink-2); font-size: 16px; line-height: 1.55; }
    .np-proof { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px; }
    .np-proof a { text-decoration: none; color: var(--ink); border: 1px solid var(--line); border-radius: 22px; padding: 26px; display: grid; gap: 14px; transition: border-color .2s; }
    .np-proof a:hover { border-color: var(--ink); }
    .np-proof .who b { font-family: var(--font-display); font-size: 22px; display: block; }
    .np-proof .who span { color: var(--muted); font-size: 15px; }
    .np-proof ul { list-style: none; margin: 0; padding: 0; display: grid; gap: 8px; }
    .np-proof li { display: flex; gap: 10px; align-items: baseline; font-size: 15px; color: var(--ink-2); }
    .np-proof li strong { font-family: var(--font-display); font-size: 24px; color: var(--accent-ink); min-width: 74px; }
    .np-proof .more { font-weight: 600; font-size: 15px; }
    .np-steps { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 14px; counter-reset: step; }
    .np-steps li { padding: 22px; border-top: 3px solid var(--ink); display: grid; gap: 8px; align-content: start; }
    .np-steps li::before { counter-increment: step; content: "Step " counter(step); font-size: 13px; letter-spacing: .1em; text-transform: uppercase; font-weight: 600; color: var(--accent-ink); }
    .np-steps b { font-family: var(--font-display); font-size: 19px; }
    .np-steps span { color: var(--ink-2); font-size: 16px; line-height: 1.55; }
    .np-faq { display: grid; gap: 10px; max-width: 820px; }
    .np-faq details { border: 1px solid var(--line); border-radius: 16px; padding: 18px 22px; }
    .np-faq summary { cursor: pointer; font-family: var(--font-display); font-size: 18px; font-weight: 600; }
    .np-faq p { margin: 12px 0 0; font-size: 16px; line-height: 1.6; color: var(--ink-2); }
    .np-cta { background: var(--dark); color: var(--paper); border-radius: 28px; padding: clamp(32px, 6vw, 56px); display: grid; gap: 18px; justify-items: start; }
    .np-cta h2 { font-size: clamp(28px, 4vw, 44px); letter-spacing: -.03em; margin: 0; }
    .np-cta p { color: rgba(244,239,230,.7); font-size: 18px; max-width: 560px; margin: 0; }
    .np-other { display: flex; flex-wrap: wrap; gap: 10px; }
    .np-other a { text-decoration: none; color: var(--ink); border: 1px solid var(--line); border-radius: 999px; padding: 10px 18px; font-weight: 600; }
    .np-other a:hover { border-color: var(--ink); }
    .np-foot { padding: 30px 0 50px; border-top: 1px solid var(--line); color: var(--muted); font-size: 15px; display: flex; gap: 18px; flex-wrap: wrap; justify-content: space-between; }
    .np-foot a { color: var(--muted); }
`;

const page = n => {
  const url = `${BASE}/${n.slug}/`;
  const wa = `https://wa.me/${WA}?text=${encodeURIComponent(n.whatsapp)}`;
  const others = NICHES.filter(o => o.slug !== n.slug);
  const ld = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'Service', name: strip(n.h1), serviceType: n.nav + ' digital marketing', description: n.description, url,
        areaServed: { '@type': 'Country', name: 'India' }, provider: { '@id': `${BASE}/#organization` } },
      { '@type': 'FAQPage', mainEntity: n.faq.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE}/` },
        { '@type': 'ListItem', position: 2, name: n.nav, item: url } ] }
    ]
  };
  return `${head404}  <title>${esc(n.title)}</title>
  <meta name="description" content="${esc(n.description)}" />
  <link rel="canonical" href="${url}" />
  <meta property="og:title" content="${esc(n.title)}" />
  <meta property="og:description" content="${esc(n.description)}" />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="${url}" />
  <meta property="og:image" content="${BASE}/assets/og-image.png" />
  <meta name="twitter:card" content="summary_large_image" />
  <script type="application/ld+json">${JSON.stringify(ld)}</script>
  <style>${STYLE}  </style>
</head>
<body>
  <div class="container">
    <header class="np-bar">
      <a href="/" class="logo-word">Digital Dobby</a>
      <a href="/#contact">Get a free audit →</a>
    </header>

    <main>
      <section class="np-hero">
        <span class="eyebrow-t">${esc(n.eyebrow)}</span>
        <h1>${n.h1}</h1>
        <p class="lead">${esc(n.lead)}</p>
        <div class="np-actions">
          <a href="/#contact" class="btn btn-accent">Get a free audit <span class="arrow">→</span></a>
          <a href="${wa}" class="btn np-wa" target="_blank" rel="noopener" data-whatsapp>Chat on WhatsApp</a>
        </div>
      </section>

      <div class="np-body">
        <section>
          <h2>Sound familiar?</h2>
          <ul class="np-pains">
${n.pains.map(p => `            <li>${esc(p)}</li>`).join('\n')}
          </ul>
        </section>

        <section>
          <h2>What we do</h2>
          <div class="np-services">
${n.services.map(s => `            <div><b>${esc(s.t)}</b><span>${esc(s.d)}</span></div>`).join('\n')}
          </div>
        </section>

        <section>
          <h2>Results we’ve delivered</h2>
          <div class="np-proof">
${n.proof.map(p => `            <a href="/case-studies/${p.id}/">
              <div class="who"><b>${esc(p.name)}</b><span>${esc(p.kind)}</span></div>
              <ul>${p.stats.map(([v, l]) => `<li><strong>${esc(v)}</strong>${esc(l)}</li>`).join('')}</ul>
              <span class="more">Read the case study →</span>
            </a>`).join('\n')}
          </div>
        </section>

        <section>
          <h2>How it works</h2>
          <ol class="np-steps">
${n.steps.map(s => `            <li><b>${esc(s.t)}</b><span>${esc(s.d)}</span></li>`).join('\n')}
          </ol>
        </section>

        <section>
          <h2>Questions people ask</h2>
          <div class="np-faq">
${n.faq.map(f => `            <details><summary>${esc(f.q)}</summary><p>${esc(f.a)}</p></details>`).join('\n')}
          </div>
        </section>

        <section class="np-cta">
          <h2>Get a free marketing audit</h2>
          <p>Send us your website or Instagram. We’ll reply within one business day with a short review of what’s working and what to fix first. Plans start from ₹30,000 a month.</p>
          <div class="np-actions">
            <a href="/#contact" class="btn btn-accent">Get a free audit <span class="arrow">→</span></a>
            <a href="${wa}" class="btn np-wa" target="_blank" rel="noopener" data-whatsapp>Chat on WhatsApp</a>
          </div>
        </section>

        <section>
          <h2>We also help</h2>
          <div class="np-other">
${others.map(o => `            <a href="/${o.slug}/">${esc(o.nav)}</a>`).join('\n')}
            <a href="/case-studies.html">All case studies</a>
          </div>
        </section>
      </div>
    </main>

    <footer class="np-foot">
      <span>© ${new Date().getFullYear()} Digital Dobby · Mumbai, India</span>
      <span><a href="/privacy.html">Privacy</a> · <a href="/terms.html">Terms</a></span>
    </footer>
  </div>
  <script>
    document.querySelectorAll('[data-whatsapp]').forEach(function (a) {
      a.addEventListener('click', function () {
        if (typeof window.gtag === 'function') window.gtag('event', 'whatsapp_click', { link_location: '${n.slug}' });
      });
    });
  </script>
</body>
</html>
`;
};

for (const n of NICHES) {
  mkdirSync(n.slug, { recursive: true });
  writeFileSync(`${n.slug}/index.html`, page(n));
  console.log(`${n.slug}/index.html  (${n.title.length} char title, ${n.description.length} char description)`);
}
