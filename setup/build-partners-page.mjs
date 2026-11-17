// Builds /partners/ — the referral and partner programme page with its own referral form.
// The form posts to the same Google Apps Script as the contact form (setup/google-apps-script.gs),
// marked Source: Partner, so referrals land in the Enquiries tab of the sheet and in the inbox.
// Change the reward or rules below, then run from the project folder:
//   node setup/build-partners-page.mjs
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';

const BASE = 'https://digitaldobby.com';
const URL = `${BASE}/partners/`;
const WA = '919819861621';
const ENDPOINT = readFileSync('js/main.js', 'utf8').match(/const FORM_ENDPOINT = '([^']*)'/)[1];

const REWARD = { pct: 10, months: 3 };            // 10% of the client's monthly fee for their first 3 months
const EXAMPLE_FEE = 30000;                         // the starting plan, used for the worked example
const perMonth = EXAMPLE_FEE * REWARD.pct / 100;
const inr = n => '₹' + n.toLocaleString('en-IN');

const title = `Partner & Referral Programme — Earn ${REWARD.pct}% | Digital Dobby`;
const description = `Refer a business that needs digital marketing and earn ${REWARD.pct}% of their monthly fee for ${REWARD.months} months. For clients, developers, consultants and partners.`;

const WHO = [
  { t: 'Clients and friends', d: 'Know a business owner who keeps asking how to get more leads or sales online? Send them our way.' },
  { t: 'Web developers and designers', d: 'You build the website, we bring the traffic. Your clients get marketing that works with what you built, and you keep the relationship.' },
  { t: 'Consultants and CAs', d: 'Your clients trust your advice. When growth comes up, point them to a team that reports in plain numbers.' },
  { t: 'Real-estate channel partners', d: 'Know a developer planning a launch? We run the campaigns, landing pages and lead follow-up for project launches.' }
];

const STEPS = [
  { t: 'Tell us about the business', d: 'Fill in the form below or message us on WhatsApp. Only share their details if they’re happy for us to get in touch.' },
  { t: 'We take it from there', d: 'We contact them, run a free audit and send a proposal. We keep you updated, and you don’t need to sell anything.' },
  { t: 'They sign up, you earn', d: `You get ${REWARD.pct}% of their monthly fee for their first ${REWARD.months} months, paid by bank transfer within 7 days of each payment they make to us.` }
];

const RULES = [
  'The business must be new to us: not already a client, and not already talking to us about a project.',
  `The reward is ${REWARD.pct}% of the monthly fee the client pays us, for their first ${REWARD.months} paid months. Ad spend, which clients pay directly to Google or Meta, is not included.`,
  'The referral counts if the business signs up within 90 days of you introducing them.',
  'We pay within 7 days of receiving each monthly payment from the client. If they cancel or don’t pay, there’s nothing to pay on that month.',
  'There’s no limit on how many businesses you can refer.',
  'If two people refer the same business, the first referral we receive counts.',
  'We can keep your name private from the business if you prefer. Just say so in the form.'
];

const FAQ = [
  { q: 'How much can I earn?', a: `On our starting plan of ${inr(EXAMPLE_FEE)} a month, you’d earn ${inr(perMonth)} a month for ${REWARD.months} months: ${inr(perMonth * REWARD.months)} in total. Bigger plans earn more.` },
  { q: 'Do I need to sign anything?', a: 'No. Send a referral and we’ll confirm the terms with you by email. When the client signs up, we’ll ask for your bank details to pay you.' },
  { q: 'What kind of businesses can I refer?', a: 'Any business that wants more leads or sales online: real-estate developers and brokers, D2C and Shopify brands, B2B and SaaS companies, and service businesses. They can be anywhere in India.' },
  { q: 'I’m a web developer or agency. Can we work together on projects?', a: 'Yes. Besides referrals, we can work alongside you on a client: you handle the website, we handle SEO, ads and social. Mention it in the form and we’ll talk.' },
  { q: 'Will you tell me how it’s going?', a: 'Yes. We’ll let you know when we’ve spoken to them, when a proposal is sent and when they sign up.' }
];

const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const head404 = readFileSync('404.html', 'utf8').split('<style>')[0]
  .replace(/<title>[^<]*<\/title>\n/, '')
  .replace('  <meta name="robots" content="noindex" />\n', '');

const ld = {
  '@context': 'https://schema.org',
  '@graph': [
    { '@type': 'WebPage', name: title, description, url: URL, isPartOf: { '@id': `${BASE}/#website` } },
    { '@type': 'FAQPage', mainEntity: FAQ.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
    { '@type': 'BreadcrumbList', itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE}/` },
      { '@type': 'ListItem', position: 2, name: 'Partners', item: URL } ] }
  ]
};

const wa = `https://wa.me/${WA}?text=${encodeURIComponent("Hi Digital Dobby, I'd like to refer a business to you.")}`;

const html = `${head404}  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}" />
  <link rel="canonical" href="${URL}" />
  <meta property="og:title" content="${esc(title)}" />
  <meta property="og:description" content="${esc(description)}" />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="${URL}" />
  <meta property="og:image" content="${BASE}/assets/og-image.png" />
  <meta name="twitter:card" content="summary_large_image" />
  <script type="application/ld+json">${JSON.stringify(ld)}</script>
  <style>
    .pp-bar { display: flex; justify-content: space-between; align-items: center; gap: 16px; padding: 20px 0; flex-wrap: wrap; }
    .pp-bar a { text-decoration: none; color: var(--ink); font-weight: 600; }
    .pp-bar .logo-word { font-family: var(--font-display); font-size: 18px; letter-spacing: .14em; text-transform: uppercase; }
    .pp-hero { background: var(--dark); color: var(--paper); border-radius: 28px; padding: clamp(32px, 6vw, 72px); display: grid; gap: 22px; }
    .pp-hero .eyebrow-t { font-size: 13px; letter-spacing: .12em; text-transform: uppercase; font-weight: 600; color: rgba(244,239,230,.6); }
    .pp-hero h1 { font-size: clamp(36px, 6vw, 72px); font-weight: 800; letter-spacing: -.035em; line-height: 1; max-width: 900px; }
    .pp-hero h1 em { font-family: var(--font-serif); font-style: italic; font-weight: 400; color: var(--accent); letter-spacing: 0; }
    .pp-hero .lead { font-size: clamp(18px, 2vw, 21px); line-height: 1.5; color: rgba(244,239,230,.78); max-width: 680px; }
    .pp-actions { display: flex; flex-wrap: wrap; gap: 12px; }
    .pp-wa { border: 1px solid rgba(244,239,230,.35); color: var(--paper); }
    .pp-wa:hover { border-color: var(--paper); }
    .pp-body { display: grid; gap: 64px; padding: 64px 0 40px; }
    .pp-body h2 { font-size: clamp(26px, 3.4vw, 40px); letter-spacing: -.02em; margin-bottom: 20px; }
    .pp-steps { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 14px; counter-reset: step; }
    .pp-steps li { padding: 22px; border-top: 3px solid var(--ink); display: grid; gap: 8px; align-content: start; }
    .pp-steps li::before { counter-increment: step; content: "Step " counter(step); font-size: 13px; letter-spacing: .1em; text-transform: uppercase; font-weight: 600; color: var(--accent-ink); }
    .pp-steps b { font-family: var(--font-display); font-size: 20px; }
    .pp-steps span { color: var(--ink-2); font-size: 16px; line-height: 1.55; }
    .pp-calc { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 14px; }
    .pp-calc div { border: 1px solid var(--line); border-radius: 20px; padding: 24px; display: grid; gap: 6px; }
    .pp-calc b { font-family: var(--font-display); font-size: clamp(32px, 4vw, 46px); letter-spacing: -.03em; line-height: 1; color: var(--accent-ink); }
    .pp-calc span { color: var(--ink-2); }
    .pp-note { color: var(--muted); font-size: 15px; margin-top: 12px; }
    .pp-who { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 14px; }
    .pp-who div { padding: 24px; background: var(--paper-2); border-radius: 20px; display: grid; gap: 8px; align-content: start; }
    .pp-who b { font-family: var(--font-display); font-size: 20px; }
    .pp-who span { color: var(--ink-2); font-size: 16px; line-height: 1.55; }
    .pp-form-wrap { background: var(--dark); color: var(--paper); border-radius: 28px; padding: clamp(28px, 5vw, 56px); display: grid; gap: 10px; }
    .pp-form-wrap h2 { margin-bottom: 4px; }
    .pp-form-wrap > p { color: rgba(244,239,230,.7); font-size: 17px; max-width: 620px; margin: 0 0 18px; }
    .pp-form { display: grid; gap: 18px; }
    .pp-row { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }
    .pp-form label { display: grid; gap: 6px; font-size: 14px; color: rgba(244,239,230,.7); }
    .pp-form input[type=text], .pp-form input[type=email], .pp-form input[type=tel], .pp-form textarea {
      font: inherit; font-size: 16px; color: var(--paper); background: rgba(244,239,230,.06); border: 1px solid rgba(244,239,230,.2);
      border-radius: 12px; padding: 12px 14px; outline: none; transition: border-color .2s; }
    .pp-form textarea { min-height: 110px; resize: vertical; }
    .pp-form input:focus, .pp-form textarea:focus { border-color: var(--accent); }
    .pp-form .invalid input, .pp-form .invalid textarea { border-color: #ff8a73; }
    .pp-form .invalid { color: #ff8a73; }
    .pp-form fieldset { border: 0; padding: 0; margin: 8px 0 0; display: grid; gap: 18px; }
    .pp-form legend { font-family: var(--font-display); font-size: 18px; font-weight: 600; color: var(--paper); margin-bottom: 12px; }
    .pp-check { display: flex !important; grid-template-columns: none; align-items: flex-start; gap: 10px !important; font-size: 15px !important; line-height: 1.45; }
    .pp-check input { margin-top: 3px; width: 18px; height: 18px; accent-color: var(--accent); flex: none; }
    .pp-honey { position: absolute; left: -9999px; }
    .pp-form button { justify-self: start; border: 0; cursor: pointer; font: inherit; }
    .pp-form button[disabled] { opacity: .6; cursor: wait; }
    .pp-msg { min-height: 1.4em; font-size: 15px; color: rgba(244,239,230,.8); }
    .pp-msg a { color: var(--paper); }
    .pp-done { display: none; gap: 10px; }
    .pp-done h3 { font-size: 28px; letter-spacing: -.02em; }
    .pp-done p { color: rgba(244,239,230,.75); font-size: 17px; margin: 0; }
    .pp-form-wrap.sent .pp-form { display: none; }
    .pp-form-wrap.sent .pp-done { display: grid; }
    .pp-rules { margin: 0; padding-left: 20px; display: grid; gap: 10px; max-width: 820px; }
    .pp-rules li { font-size: 16px; line-height: 1.55; color: var(--ink-2); }
    .pp-faq { display: grid; gap: 10px; max-width: 820px; }
    .pp-faq details { border: 1px solid var(--line); border-radius: 16px; padding: 18px 22px; }
    .pp-faq summary { cursor: pointer; font-family: var(--font-display); font-size: 18px; font-weight: 600; }
    .pp-faq p { margin: 12px 0 0; font-size: 16px; line-height: 1.6; color: var(--ink-2); }
    .pp-foot { padding: 30px 0 50px; border-top: 1px solid var(--line); color: var(--muted); font-size: 15px; display: flex; gap: 18px; flex-wrap: wrap; justify-content: space-between; }
    .pp-foot a { color: var(--muted); }
    @media (max-width: 640px) { .pp-row { grid-template-columns: 1fr; } }
  </style>
</head>
<body>
  <div class="container">
    <header class="pp-bar">
      <a href="/" class="logo-word">Digital Dobby</a>
      <a href="#refer">Refer a business →</a>
    </header>

    <main>
      <section class="pp-hero">
        <span class="eyebrow-t">Partner &amp; referral programme</span>
        <h1>Know a business that needs growth? <em>Earn ${REWARD.pct}%.</em></h1>
        <p class="lead">Introduce us to a business that needs digital marketing. If they become a client, you earn ${REWARD.pct}% of their monthly fee for their first ${REWARD.months} months. We do all the selling.</p>
        <div class="pp-actions">
          <a href="#refer" class="btn btn-accent">Refer a business <span class="arrow">→</span></a>
          <a href="${wa}" class="btn pp-wa" target="_blank" rel="noopener" data-whatsapp>Refer on WhatsApp</a>
        </div>
      </section>

      <div class="pp-body">
        <section>
          <h2>How it works</h2>
          <ol class="pp-steps">
${STEPS.map(s => `            <li><b>${esc(s.t)}</b><span>${esc(s.d)}</span></li>`).join('\n')}
          </ol>
        </section>

        <section>
          <h2>What you could earn</h2>
          <div class="pp-calc">
            <div><b>${inr(EXAMPLE_FEE)}</b><span>client’s monthly plan (our starting plan)</span></div>
            <div><b>${inr(perMonth)}</b><span>to you each month (${REWARD.pct}%)</span></div>
            <div><b>${inr(perMonth * REWARD.months)}</b><span>in total over ${REWARD.months} months</span></div>
          </div>
          <p class="pp-note">Bigger plans earn more. Ad spend that clients pay directly to Google or Meta isn’t included.</p>
        </section>

        <section>
          <h2>Who it’s for</h2>
          <div class="pp-who">
${WHO.map(w => `            <div><b>${esc(w.t)}</b><span>${esc(w.d)}</span></div>`).join('\n')}
          </div>
        </section>

        <section class="pp-form-wrap" id="refer">
          <h2>Refer a business</h2>
          <p>Tell us who you are and who you’re referring. We’ll confirm we’ve received it within one business day.</p>
          <form class="pp-form" novalidate data-clarity-mask="true">
            <fieldset>
              <legend>About you</legend>
              <div class="pp-row">
                <label>Your name *<input type="text" name="name" autocomplete="name" required /></label>
                <label>Your email *<input type="email" name="email" autocomplete="email" required /></label>
              </div>
              <div class="pp-row">
                <label>Your phone or WhatsApp<input type="tel" name="phone" autocomplete="tel" /></label>
                <label>You are a…<input type="text" name="partnerType" placeholder="Client, web developer, consultant, channel partner…" /></label>
              </div>
            </fieldset>
            <fieldset>
              <legend>The business you’re referring</legend>
              <div class="pp-row">
                <label>Business name *<input type="text" name="business" required /></label>
                <label>Website or Instagram<input type="text" name="site" /></label>
              </div>
              <div class="pp-row">
                <label>Contact person<input type="text" name="contact" /></label>
                <label>Their phone or email<input type="text" name="contactInfo" /></label>
              </div>
              <label>What do they need help with? *<textarea name="needs" required placeholder="For example: launching a new real-estate project in Pune and needs leads."></textarea></label>
            </fieldset>
            <label class="pp-check"><input type="checkbox" name="consent" required /> They know I’m referring them and are happy for Digital Dobby to contact them. *</label>
            <label class="pp-check"><input type="checkbox" name="private" /> Please keep my name private when you contact them.</label>
            <input type="text" name="_honey" class="pp-honey" tabindex="-1" autocomplete="off" aria-hidden="true" />
            <button type="submit" class="btn btn-accent">Send referral <span class="arrow">→</span></button>
            <p class="pp-msg" aria-live="polite"></p>
          </form>
          <div class="pp-done" role="status">
            <h3>Thank you, referral received!</h3>
            <p>We’ll email you within one business day to confirm, and keep you posted as we talk to them.</p>
          </div>
        </section>

        <section>
          <h2>The rules, in plain words</h2>
          <ul class="pp-rules">
${RULES.map(r => `            <li>${esc(r)}</li>`).join('\n')}
          </ul>
          <p class="pp-note">Full terms are in our <a href="/terms.html#referrals">terms of use</a>.</p>
        </section>

        <section>
          <h2>Questions</h2>
          <div class="pp-faq">
${FAQ.map(f => `            <details><summary>${esc(f.q)}</summary><p>${esc(f.a)}</p></details>`).join('\n')}
          </div>
        </section>
      </div>
    </main>

    <footer class="pp-foot">
      <span>© ${new Date().getFullYear()} Digital Dobby · Mumbai, India</span>
      <span><a href="/blog/">Blog</a> · <a href="/privacy.html">Privacy</a> · <a href="/terms.html">Terms</a></span>
    </footer>
  </div>
  <script>
    (function () {
      var ENDPOINT = '${ENDPOINT}';
      var EMAIL = 'monika@digitaldobby.com';
      var wrap = document.querySelector('.pp-form-wrap');
      var form = wrap.querySelector('form');
      var msg = form.querySelector('.pp-msg');
      var btn = form.querySelector('button');

      document.querySelectorAll('[data-whatsapp]').forEach(function (a) {
        a.addEventListener('click', function () {
          if (typeof window.gtag === 'function') window.gtag('event', 'whatsapp_click', { link_location: 'partners' });
        });
      });

      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var ok = true;
        form.querySelectorAll('[required]').forEach(function (input) {
          var v = input.type === 'checkbox' ? input.checked
            : input.type === 'email' ? /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(input.value.trim())
            : input.value.trim().length > 0;
          input.closest('label').classList.toggle('invalid', !v);
          if (!v) ok = false;
        });
        if (!ok) { msg.textContent = 'Please fill in the highlighted fields.'; return; }

        var f = new FormData(form);
        if (f.get('_honey')) { wrap.classList.add('sent'); return; }
        var g = function (k) { return String(f.get(k) || '').trim(); };
        var lines = [
          'PARTNER REFERRAL',
          'Referred business: ' + g('business'),
          g('site') && ('Website / Instagram: ' + g('site')),
          g('contact') && ('Contact person: ' + g('contact')),
          g('contactInfo') && ('Their phone / email: ' + g('contactInfo')),
          'Needs: ' + g('needs'),
          '--',
          'Partner type: ' + (g('partnerType') || 'not given'),
          'Business knows about the referral: yes',
          'Keep partner name private: ' + (f.get('private') ? 'YES' : 'no')
        ].filter(Boolean);
        var data = {
          Name: g('name'), Email: g('email'), Phone: g('phone'),
          Company: 'Referral: ' + g('business'),
          Services: 'Partner referral', Budget: '',
          Message: lines.join('\\n'),
          Source: 'Partner', Page: location.href
        };
        var mailto = 'mailto:' + EMAIL + '?subject=' + encodeURIComponent('Partner referral — ' + g('business')) + '&body=' + encodeURIComponent(data.Message + '\\n\\nFrom: ' + data.Name + ' (' + data.Email + ', ' + data.Phone + ')');

        btn.disabled = true; msg.textContent = 'Sending…';
        fetch(ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body: JSON.stringify(data) })
          .then(function (r) { return r.json().catch(function () { return {}; }).then(function (j) { if (!r.ok || String(j.success) !== 'true') throw new Error(j.message || r.status); }); })
          .then(function () {
            if (typeof window.gtag === 'function') window.gtag('event', 'generate_lead', { form_name: 'partner_referral' });
            wrap.classList.add('sent');
          })
          .catch(function () {
            msg.innerHTML = 'Sorry, the referral couldn’t be sent right now. <a href="' + mailto + '">Send it from your email app instead</a>; it’s already filled in.';
          })
          .finally(function () { btn.disabled = false; if (!wrap.classList.contains('sent')) return; msg.textContent = ''; });
      });
    })();
  </script>
</body>
</html>
`;

mkdirSync('partners', { recursive: true });
writeFileSync('partners/index.html', html);
console.log(`partners/index.html  (${title.length} char title, ${description.length} char description)`);
