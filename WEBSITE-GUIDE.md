# Digital Dobby website — guide

## What a visitor sees, in order

Each section answers the next question a client has, in the order they ask it: *Who are you? → Can you solve my problem? → Show me proof → How do you work? → Have you done my kind of business? → Who am I trusting? → What about cost and timing? → OK, how do I start?* There is a way to get in touch at every stage.

| # | Section | The client's question it answers |
|---|---|---|
| — | **Hero** | *Who are you?* One-line promise, the doodle girl climbing the growth stairs, three headline results and the **Start a project** button, which stays on the first screen even on small laptops. |
| — | **Client strip** | *Are they legit?* ISKCON, Design Letters, Jollywell, InterFace, Rioga Premium. |
| — | **About** | *What do they believe?* The positioning statement (words light up on scroll) and four quick facts. |
| 01 | **Services** + goal picker | *Can they solve my problem?* Visitors tap a goal ("Get more leads", "Rank on Google"…) and the matching services light up and move to the top. **Get a plan for this →** opens the form with those services already ticked. |
| 02 | **Selected work** | *Show me proof.* Four results cards → the full case study deck. |
| — | **Call to action strip** | Right after the proof, for visitors who are already convinced: "Your brand could be *next*." |
| 03 | **Our approach** | *How do they work?* What · Where · How, acted out by doodle characters. Links to the full How it works story. |
| 04 | **Industries + tools** | *Have they done my kind of business?* Eight industries and the platforms you run, as brand icons. |
| 05 | **FAQ** | *What about cost, timing, measurement?* Handles the last objections. |
| — | **All of it, in one swing** | The final recap before the form: a reel where Maya swings on a thread spool and each swing wipes to the next service, each in its own style. It ends on the logo and "Let's talk". To change the words, edit the `<ol class="sw-words">` list in `index.html`. |
| — | **Contact** | *How do I start?* The form (sends to Monika's inbox), with a reply-time promise next to the button. |

The **case study deck** (`case-studies.html`) is the deeper proof: 5 brands, each with the challenge, approach, results and an animated chart slide. Visitors can download it as a PDF.

**How it works** (`how-it-works.html`, in the main menu) explains digital marketing to clients who are new to it. It's a scroll-driven story with three doodle characters: Maya (your strategist), Riya (a brand owner) and Arjun (her customer). Across 8 scenes the stage stays pinned and each scene plays as you scroll: the problem, strategy, awareness, search, website, conversion, loyalty and growth. Each scene's caption lists the services involved. A "funnel at a glance" summary and a call to action follow. To change a caption, edit the `<article class="hiw-cap">` blocks in that file.

## What changed in the fine-tune

- **Fixed:** hero stat cards showed "NaN" instead of their numbers; About counters showed "0" without JavaScript.
- **Better order:** results moved from the 9th screen to the 4th; a call to action added mid-page.
- **Less repetition:** removed the 5-step Process (it repeated "Our approach") and the three founder quotes (they repeated About). The page is about 13% shorter.
- **Each number appears once per place:** About shows agency facts; the approach section uses different results (3x, +50%, 200+) from the hero cards.
- **FAQ:** added "How much does it cost?" and "How soon will we see results?", answered with real case-study figures.
- **Phones and tablets:** the approach section's text no longer hides behind the pinned drawing.
- **Sharing:** links now show a preview image (`assets/og-image.png`) on WhatsApp, LinkedIn, X and Slack, and the site has an iPhone home-screen icon.
- **Smaller fixes:** the loader is faster (0.9s), screen readers no longer read the client strip twice, and old Process/quote code and styles are deleted.

## Where to edit things

| To change… | Edit |
|---|---|
| Any text on the homepage | `index.html` (each section is marked with a `<!-- ==== NAME ==== -->` comment) |
| Case studies, numbers and charts | `js/deck.js` — the `CASES` list (text) and `VIZ` (chart numbers) at the top |
| Where the form sends | `js/main.js` — `FORM_ENDPOINT` (the Apps Script Web app URL) at the top |
| Which inbox gets the enquiry emails | `NOTIFY_EMAIL` in the Apps Script editor (then redeploy, see below) |
| Tool & platform icons | `js/icons.js` |
| Colours and fonts | `css/style.css` — the `:root` block at the top |
| Drawing style (ink-wash lines, grey washes, character glows, handwritten labels) | `css/ink.css` (ink and wash colours, handwriting font in its `:root` block) and `js/ink.js` (the brush filter and each character's glow colour: Maya lavender, Riya gold, Arjun teal) |
| Handwritten labels on the homepage drawings | `<text class="hand">` lines inside the hero and "Our approach" scenes in `index.html` |

**After changing a CSS or JS file**, raise its version number in the `<link>` / `<script>` tag (for example `style.css?v=20` → `?v=21`) in `index.html` and `case-studies.html`, so visitors' browsers load the new file.

## Before going live — checklist

1. **Connect the contact form** (see *Contact form setup* below), then send one test from the live site.
2. **Hosting.** Drag the whole folder onto [app.netlify.com/drop](https://app.netlify.com/drop) (or Vercel / GitHub Pages / cPanel). `404.html` and `robots.txt` are already in place.
3. **Domain.** Connect your domain (e.g. digitaldobby.in) in the host's settings.
4. **Share image URL.** Once the domain is live, change `content="assets/og-image.png"` to the full address (e.g. `https://yourdomain/assets/og-image.png`) in both HTML files. Some apps only show previews for full addresses.
5. **Google Search Console.** ✅ Done: `https://digitaldobby.com/` is verified (signed in as vkprasad2810@gmail.com) and `sitemap.xml` is submitted. **Don't delete `google7c6fb4da80c21fda.html`**: Search Console checks it to keep the site verified.
6. **Google Analytics.** ✅ Done: the Google tag `GTM-WK9DX77G` (GA4 property "Digital Dobby", measurement ID `G-26RMJXTR8T`) is at the top of every page. Each successful contact-form enquiry is recorded as a `generate_lead` event. Mark it as a key event in GA (Admin → Events) to count leads in reports.

## What clients look for, and where the site answers it

- *"Can they get results for a business like mine?"* → client strip, Selected work, case study deck, Industries.
- *"What exactly will they do?"* → Services and Our approach.
- *"What will it cost and how long?"* → FAQ.
- *"How do I start?"* → buttons in the hero, header, mid-page strip, floating message button and the contact form, all within one tap on any screen.

## Contact form setup (Google Sheets + email)

Every enquiry is saved as a row in a Google Sheet and emailed to `monika@digitaldobby.com`. Pressing **Reply** on that email replies straight to the client. It's free, and a normal Gmail account can send about 100 of these emails a day.

Do this once, signed in as **vkprasad2810@gmail.com** (the account that owns the sheet and the script). On Google's permission screen, tick both boxes before clicking Continue:

1. Go to [sheets.new](https://sheets.new) and name the sheet **Digital Dobby — Enquiries**.
2. Open **Extensions → Apps Script**. Delete the sample code, paste in all of `setup/google-apps-script.gs`, and save.
3. Choose **setup** in the function menu at the top and press **▶ Run**. Google asks for permission: **Review permissions** → pick the account → **Advanced** → **Go to (project name)** → **Allow**. An **Enquiries** tab appears in the sheet.
4. Press **Deploy → New deployment**. Click the gear icon, choose **Web app**, and set:
   - *Execute as:* **Me**
   - *Who has access:* **Anyone**
   
   Press **Deploy** and copy the **Web app URL** (it ends in `/exec`).
5. In `js/main.js`, paste that URL between the quotes in `const FORM_ENDPOINT = '';`. Then raise `main.js?v=` by one in `index.html`.
6. Send a test from the website. A new row appears in the sheet and an email arrives.

**If you change the script later**, use **Deploy → Manage deployments → ✏️ Edit → Version: New version → Deploy**. That keeps the same URL. Choosing *New deployment* instead creates a new URL, which you would have to paste into `main.js` again.

Until `FORM_ENDPOINT` is filled in, the form opens the visitor's email app with their message already written, so no enquiry is lost.

## Sales pipeline (the Google Sheet)

The enquiries sheet is also your sales pipeline. Both tabs have dropdowns, and stages are colour-coded: orange for waiting on a call or proposal, green for won, grey for lost.

**Enquiries tab** (website leads, filled in automatically):
- Columns A–I come from the form. Don't edit or move them.
- Columns J–O are yours: **Stage**, **Source**, **Next action**, **Next action date**, **Value (₹/month)** and **Notes**.
- New website leads arrive as Stage = New, Source = Website form.
- Stages: New → Contacted → Call booked → Call done → Proposal sent → Negotiation → Won / Lost / Nurture.

**Outreach tab** (people you contact yourself, from LinkedIn, Instagram, RERA lists and so on):
- Add one row per prospect: name, company, role, how to reach them, niche and where you found them.
- Stages: To contact → Contacted → Replied → Audit sent → Call booked → Proposal sent → Won / Lost / Not interested / Do not contact.
- Honour "Do not contact" every time.

**Weekly habit (Monday, 15 minutes):** sort both tabs by Next action date, do anything that's due, and give every open lead a next action.

If the pipeline columns ever need setting up again, run `setupPipeline` from the Apps Script editor. It only adds what's missing.

## Generated pages (case studies and niche pages)

These pages are built by small scripts, so edit the source and rebuild instead of editing the HTML directly:

| Pages | Edit | Then run |
|---|---|---|
| `case-studies/<name>/` (one page per case study) | The `CASES` list in `js/deck.js` | `node setup/build-case-pages.mjs` |
| `real-estate-digital-marketing/`, `shopify-seo-agency/`, `d2c-marketing-agency/`, plus the service pages `seo-services-mumbai/`, `performance-marketing-agency-mumbai/`, `social-media-marketing-agency-mumbai/`, `email-marketing-agency-india/` | The `NICHES` list at the top of `setup/build-niche-pages.mjs` | `node setup/build-niche-pages.mjs` |

After adding a new page, add its address to `sitemap.xml`, push, then use **URL inspection → Request indexing** in Search Console.
