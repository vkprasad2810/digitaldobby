// Builds the blog: /blog/ (index) and one page per article at /blog/<slug>/.
// To add an article, add an entry to POSTS (newest first) and run from the project folder:
//   node setup/build-blog.mjs
// Then add the new URL to sitemap.xml, push, and request indexing in Search Console.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';

const BASE = 'https://digitaldobby.com';

const POSTS = [
  {
    slug: 'shopify-seo-checklist-india',
    title: 'Shopify SEO Checklist for Indian Stores (2026)',
    description: 'A practical Shopify SEO checklist for Indian stores: duplicate URLs, collection pages, product titles, speed, images and Search Console.',
    date: '2026-11-17',
    minutes: 7,
    tag: 'Shopify SEO',
    related: { href: '/shopify-seo-agency/', label: 'Shopify SEO services' },
    body: `
<p>Most Shopify stores in India rely on paid ads for almost every sale. That works until ad costs rise. Organic search is the cheapest customer you’re not getting, and on Shopify a handful of fixable issues usually hold stores back.</p>
<p>This is the checklist we work through when we start on a Shopify store. It’s the same approach we used for <a href="/case-studies/design-letters/">Design Letters</a>, a Shopify jewellery brand, where organic traffic grew 45% and the conversion rate rose 20%.</p>

<h2>1. Connect Google Search Console first</h2>
<p>Before changing anything, add your store to <a href="https://search.google.com/search-console" rel="noopener">Google Search Console</a> and submit your sitemap. Shopify creates it for you at <code>yourstore.com/sitemap.xml</code>. Search Console shows which pages Google has indexed, which searches you appear for and what’s broken. Without it you’re guessing.</p>

<h2>2. Check for duplicate product URLs</h2>
<p>Shopify can show the same product at two addresses: <code>/products/gold-hoops</code> and <code>/collections/earrings/products/gold-hoops</code>. Shopify adds a canonical tag that tells Google the <code>/products/</code> version is the main one, but many themes still link to the longer collection URL from collection pages.</p>
<p><strong>What to do:</strong> in your theme’s product card, link to <code>product.url</code> rather than the collection-aware URL, so Google crawls one clean address per product.</p>

<h2>3. Give every collection page real words</h2>
<p>Collection pages are often the pages that should rank for searches like “silver anklets for women” or “plant protein powder”. Most stores leave them as a grid of products with no text, so Google has nothing to understand.</p>
<p><strong>What to do:</strong> write 100–200 helpful words for each important collection (who it’s for, materials, how to choose) and use the words buyers actually search. Put a short version above the products and the rest below.</p>

<h2>4. Write product titles people search for</h2>
<p>“The Aurora” means something to you. “Gold-plated silver hoop earrings for women” is what a shopper types into Google. You can keep the brand name, but lead with what the product is.</p>
<ul>
  <li>Edit the <strong>SEO title</strong> and <strong>meta description</strong> under “Search engine listing” on each product.</li>
  <li>Keep titles under about 60 characters and descriptions under about 155, so they aren’t cut off.</li>
  <li>Write a unique description for every product. Copying the manufacturer’s text gives Google no reason to choose you.</li>
</ul>

<h2>5. Make the store fast on mobile</h2>
<p>Most Indian shoppers browse on phones, often on mobile data. A slow store loses them before the page loads, and Google uses page experience as a ranking signal.</p>
<ul>
  <li>Run your homepage and a product page through <a href="https://pagespeed.web.dev/" rel="noopener">PageSpeed Insights</a> on mobile.</li>
  <li>Remove apps you don’t use. Each one can add scripts to every page, even after you stop using it, so check the theme code too.</li>
  <li>Compress images before uploading, and avoid autoplaying videos above the fold.</li>
</ul>
<p>For Design Letters, cleaning up apps and assets made pages load 25% faster.</p>

<h2>6. Describe your images</h2>
<p>Add descriptive alt text to product images (“oxidised silver jhumka earrings with pearl drops”), not file names. It helps Google Images, which is a real source of traffic for fashion and jewellery, and it helps visually impaired shoppers.</p>

<h2>7. Check your product structured data</h2>
<p>Most modern Shopify themes add product structured data (price, availability, reviews) automatically. Test a product page with Google’s <a href="https://search.google.com/test/rich-results" rel="noopener">Rich Results Test</a>. If reviews or price are missing, your theme or review app may need a setting turned on.</p>

<h2>8. Redirect old URLs when you change them</h2>
<p>Renamed a product or deleted a collection? Add a redirect under <strong>Online Store → Navigation → URL redirects</strong> so the old address sends visitors and Google to the new one, instead of a 404 page.</p>

<h2>9. Link your pages to each other</h2>
<p>Link from blog posts and collection descriptions to your best products and collections. Internal links help Google find pages and understand which ones matter most.</p>

<h2>10. Fix “Crawled – currently not indexed” pages</h2>
<p>In Search Console, open <strong>Pages</strong> and look at pages Google found but didn’t index. They’re often thin pages (empty collections, tag pages, near-duplicate products). Improve them, merge them, or stop linking to them.</p>

<h2>How long does Shopify SEO take?</h2>
<p>Technical and speed fixes can show results within weeks. Rankings for competitive searches usually build over three to six months, and keep compounding after that. It’s slower than ads, but you stop paying per click for every visitor.</p>

<h2>Want us to check your store?</h2>
<p>We’ll run this checklist on your Shopify store for free and send you a short video with the three fixes we’d make first. <a href="/#contact">Ask for a free audit</a>, or see our <a href="/shopify-seo-agency/">Shopify SEO services</a>.</p>
`
  },
  {
    slug: 'real-estate-digital-marketing-cost-india',
    title: 'How Much Does Digital Marketing Cost for a Real Estate Project in India?',
    seoTitle: 'Real Estate Digital Marketing Cost in India (2026 Guide)',
    description: 'What a real-estate launch campaign costs in India: agency fees, ad budgets, cost per lead and how to set a realistic budget for your project.',
    date: '2026-11-17',
    minutes: 6,
    tag: 'Real estate',
    related: { href: '/real-estate-digital-marketing/', label: 'Real estate marketing services' },
    body: `
<p>“How much should we spend on digital marketing for this launch?” is usually the first question developers and brokers ask us. The honest answer is that it depends, but it depends on a small number of things you can estimate before you spend a rupee.</p>
<p>This guide breaks the cost into its two parts, shows how to work backwards from your sales target, and lists the mistakes that waste budget.</p>

<h2>The two parts of the cost</h2>
<p>Every digital campaign for a project has two separate costs:</p>
<ol>
  <li><strong>Ad spend:</strong> what you pay Google, Meta (Facebook and Instagram) and other platforms for your ads to be shown. You should pay this directly to the platforms from accounts you own.</li>
  <li><strong>Management fee:</strong> what you pay an agency or freelancer to plan, build and run the campaigns, landing pages, creatives and reporting.</li>
</ol>
<p>Keep the two apart in every proposal you compare. A low fee with no ad budget won’t generate leads, and a large ad budget run badly wastes money quickly.</p>

<h2>What drives the ad budget</h2>
<p>Your ad budget depends mainly on how many leads you need and what each lead costs. Cost per lead varies widely with:</p>
<ul>
  <li><strong>City and micro-market:</strong> competitive areas in Mumbai, Thane or Pune cost more per click than smaller cities.</li>
  <li><strong>Price segment:</strong> luxury buyers are fewer and more expensive to reach than buyers of affordable homes.</li>
  <li><strong>Channel:</strong> Google Search reaches people actively looking (“2 BHK in Thane West”), usually at a higher cost per lead but with stronger intent. Meta reaches people earlier and often costs less per lead, but needs better qualification.</li>
  <li><strong>Landing page and follow-up:</strong> a fast page and a reply within minutes can halve your effective cost per lead.</li>
</ul>

<h2>Work backwards from your sales target</h2>
<p>The most reliable way to set a budget is to start from units sold and work back. Here’s an example with illustrative numbers. Replace them with your own.</p>
<div class="bp-calc">
  <p><strong>Example:</strong> you want to sell <strong>20 units</strong> in the launch phase.</p>
  <ul>
    <li>If about <strong>1 in 10 site visits</strong> becomes a booking, you need about <strong>200 site visits</strong>.</li>
    <li>If about <strong>1 in 8 qualified leads</strong> visits the site, you need about <strong>1,600 leads</strong>.</li>
    <li>At an assumed <strong>₹600 per lead</strong>, that’s an ad budget of about <strong>₹9.6 lakh</strong> over the launch period.</li>
  </ul>
  <p class="bp-note">These ratios and the cost per lead are examples only. Your own past launches, sales team and market will give you better numbers.</p>
</div>
<p>Run the same sum with a lower and a higher cost per lead to get a realistic range, then decide which number you can live with.</p>

<h2>What the management fee covers</h2>
<p>A good agency fee should cover more than “running ads”. For a launch, expect:</p>
<ul>
  <li>Market and keyword research for the micro-market</li>
  <li>Campaign set-up on Google and Meta, with tracking that counts leads and site visits, not just clicks</li>
  <li>A fast, mobile-first landing page with RERA details and one clear enquiry action</li>
  <li>Creatives and ad copy, refreshed during the campaign</li>
  <li>Lead qualification and an instant WhatsApp or email reply</li>
  <li>Weekly optimisation and a clear monthly report</li>
</ul>
<p>Our own plans start from ₹30,000 a month for management, with ad spend paid directly by you to the platforms.</p>

<h2>Five mistakes that waste budget</h2>
<ol>
  <li><strong>Sending ads to the homepage</strong> instead of a project landing page.</li>
  <li><strong>A one-field form</strong> that anyone fills in. Add one qualifying question, such as budget or timeline.</li>
  <li><strong>Slow follow-up.</strong> A lead that waits hours is often lost.</li>
  <li><strong>Targeting too widely</strong> (“Mumbai, 25–55”) instead of the micro-market and buyer intent.</li>
  <li><strong>Judging by cost per lead alone.</strong> Cheap leads that never visit cost more in the end. Track site visits and bookings.</li>
</ol>

<h2>What results can you expect?</h2>
<p>It depends on the project, price and market, so be wary of anyone who guarantees a number. As one example, our work with <a href="/case-studies/rioga-premium/">Rioga Premium</a>, a Mumbai real-estate consultancy, generated 200+ potential leads in two months for most of its residential launches, with 40% more website traffic and a 50% better site score from faster landing pages.</p>

<h2>Get a budget for your project</h2>
<p>Tell us about your project and we’ll send a free audit of your current ads or landing page, with a suggested budget range. <a href="/#contact">Ask for a free audit</a>, or see our <a href="/real-estate-digital-marketing/">real estate marketing services</a>.</p>
`
  }
];

const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const nice = d => new Date(d + 'T00:00:00Z').toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
const head404 = readFileSync('404.html', 'utf8').split('<style>')[0]
  .replace(/<title>[^<]*<\/title>\n/, '')
  .replace('  <meta name="robots" content="noindex" />\n', '');

const STYLE = `
    .bp-bar { display: flex; justify-content: space-between; align-items: center; gap: 16px; padding: 20px 0; flex-wrap: wrap; }
    .bp-bar a { text-decoration: none; color: var(--ink); font-weight: 600; }
    .bp-bar .logo-word { font-family: var(--font-display); font-size: 18px; letter-spacing: .14em; text-transform: uppercase; }
    .bp-wrap { max-width: 760px; margin: 0 auto; padding: 40px 0 60px; }
    .bp-crumbs { font-size: 14px; color: var(--muted); margin-bottom: 20px; }
    .bp-crumbs a { color: var(--muted); }
    .bp-tag { display: inline-block; font-size: 13px; letter-spacing: .1em; text-transform: uppercase; font-weight: 600; color: var(--accent-ink); margin-bottom: 14px; }
    .bp-wrap h1 { font-size: clamp(34px, 5.4vw, 56px); font-weight: 800; letter-spacing: -.035em; line-height: 1.04; margin: 0 0 16px; }
    .bp-meta { color: var(--muted); font-size: 15px; margin-bottom: 36px; }
    .bp-body { font-size: 18px; line-height: 1.7; color: var(--ink-2); }
    .bp-body h2 { font-size: clamp(24px, 3vw, 30px); letter-spacing: -.02em; color: var(--ink); margin: 44px 0 12px; line-height: 1.2; }
    .bp-body p { margin: 0 0 18px; }
    .bp-body ul, .bp-body ol { margin: 0 0 18px; padding-left: 1.3em; display: grid; gap: 8px; }
    .bp-body a { color: var(--accent-ink); }
    .bp-body code { font-size: .88em; background: var(--paper-2); padding: 2px 6px; border-radius: 6px; }
    .bp-calc { background: var(--paper-2); border-radius: 18px; padding: 22px 24px; margin: 8px 0 24px; }
    .bp-calc p:last-child { margin-bottom: 0; }
    .bp-note { font-size: 15px; color: var(--muted); }
    .bp-cta { margin-top: 48px; background: var(--dark); color: var(--paper); border-radius: 24px; padding: 32px; display: grid; gap: 14px; justify-items: start; }
    .bp-cta h2 { margin: 0; font-size: clamp(24px, 3vw, 32px); letter-spacing: -.02em; }
    .bp-cta p { margin: 0; color: rgba(244,239,230,.75); font-size: 17px; }
    .bp-list { display: grid; gap: 16px; }
    .bp-card { text-decoration: none; color: var(--ink); border: 1px solid var(--line); border-radius: 22px; padding: 26px; display: grid; gap: 10px; transition: border-color .2s; }
    .bp-card:hover { border-color: var(--ink); }
    .bp-card h2 { font-size: clamp(22px, 2.6vw, 28px); letter-spacing: -.02em; margin: 0; line-height: 1.2; }
    .bp-card p { margin: 0; color: var(--ink-2); font-size: 16px; line-height: 1.55; }
    .bp-card span { color: var(--muted); font-size: 14px; }
    .bp-foot { padding: 30px 0 50px; border-top: 1px solid var(--line); color: var(--muted); font-size: 15px; display: flex; gap: 18px; flex-wrap: wrap; justify-content: space-between; }
    .bp-foot a { color: var(--muted); }
`;

const shell = ({ title, description, url, type, ld, main }) => `${head404}  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}" />
  <link rel="canonical" href="${url}" />
  <meta property="og:title" content="${esc(title)}" />
  <meta property="og:description" content="${esc(description)}" />
  <meta property="og:type" content="${type}" />
  <meta property="og:url" content="${url}" />
  <meta property="og:image" content="${BASE}/assets/og-image.png" />
  <meta name="twitter:card" content="summary_large_image" />
  <script type="application/ld+json">${JSON.stringify(ld)}</script>
  <style>${STYLE}  </style>
</head>
<body>
  <div class="container">
    <header class="bp-bar">
      <a href="/" class="logo-word">Digital Dobby</a>
      <a href="/#contact">Get a free audit →</a>
    </header>
    <main class="bp-wrap">
${main}
    </main>
    <footer class="bp-foot">
      <span>© ${new Date().getFullYear()} Digital Dobby · Mumbai, India</span>
      <span><a href="/blog/">Blog</a> · <a href="/privacy.html">Privacy</a> · <a href="/terms.html">Terms</a></span>
    </footer>
  </div>
</body>
</html>
`;

const org = { '@type': 'Organization', name: 'Digital Dobby', url: `${BASE}/`, logo: `${BASE}/assets/logo.png` };

for (const p of POSTS) {
  const url = `${BASE}/blog/${p.slug}/`;
  const main = `      <nav class="bp-crumbs"><a href="/">Home</a> › <a href="/blog/">Blog</a></nav>
      <article>
        <span class="bp-tag">${esc(p.tag)}</span>
        <h1>${esc(p.title)}</h1>
        <p class="bp-meta">By Digital Dobby · ${nice(p.date)} · ${p.minutes} min read</p>
        <div class="bp-body">${p.body}</div>
        <section class="bp-cta">
          <h2>Get a free marketing audit</h2>
          <p>Send us your website or Instagram and we’ll reply within one business day with the three things we’d fix first.</p>
          <a href="/#contact" class="btn btn-accent">Get a free audit <span class="arrow">→</span></a>
        </section>
      </article>`;
  const ld = { '@context': 'https://schema.org', '@graph': [
    { '@type': 'BlogPosting', headline: p.title, description: p.description, datePublished: p.date, dateModified: p.date,
      url, mainEntityOfPage: url, image: `${BASE}/assets/og-image.png`, author: org, publisher: org },
    { '@type': 'BreadcrumbList', itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE}/` },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${BASE}/blog/` },
      { '@type': 'ListItem', position: 3, name: p.title, item: url } ] }
  ] };
  mkdirSync(`blog/${p.slug}`, { recursive: true });
  writeFileSync(`blog/${p.slug}/index.html`, shell({ title: p.seoTitle || `${p.title} — Digital Dobby`, description: p.description, url, type: 'article', ld, main }));
  console.log(`blog/${p.slug}/  title ${(p.seoTitle || p.title + ' — Digital Dobby').length} chars, description ${p.description.length} chars`);
}

const indexMain = `      <nav class="bp-crumbs"><a href="/">Home</a> › Blog</nav>
      <h1>Marketing guides</h1>
      <p class="bp-meta">Practical answers on ads, SEO, social and growth for Indian brands, from the Digital Dobby team.</p>
      <div class="bp-list">
${POSTS.map(p => `        <a class="bp-card" href="/blog/${p.slug}/"><span>${esc(p.tag)} · ${nice(p.date)} · ${p.minutes} min read</span><h2>${esc(p.title)}</h2><p>${esc(p.description)}</p></a>`).join('\n')}
      </div>`;
mkdirSync('blog', { recursive: true });
writeFileSync('blog/index.html', shell({
  title: 'Marketing Guides for Indian Brands — Digital Dobby Blog',
  description: 'Practical guides on real-estate marketing, Shopify SEO, D2C growth, ads and social media for Indian brands.',
  url: `${BASE}/blog/`, type: 'website', main: indexMain,
  ld: { '@context': 'https://schema.org', '@type': 'Blog', name: 'Digital Dobby Blog', url: `${BASE}/blog/`, publisher: org }
}));
console.log('blog/index.html');
