/* ==========================================================================
   Digital Dobby — "How digital marketing works" story page
   The stage is pinned while you scroll; each scroll step plays one scene.
   Scenes are declared in the HTML with data attributes (see the comment at
   the top of the stage SVG); this file only plays them back.
   ========================================================================== */

const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

document.documentElement.classList.remove('no-js');
$('.year').textContent = new Date().getFullYear();
requestAnimationFrame(() => document.body.classList.add('loaded'));

/* ---------- Header + mobile menu ---------- */
const header = $('.header');
let lastY = scrollY;
const toggle = $('.menu-toggle');
const mobileMenu = $('.mobile-menu');
function setMenu(open) {
  document.body.classList.toggle('menu-open', open);
  toggle.setAttribute('aria-expanded', open);
  toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  mobileMenu.setAttribute('aria-hidden', !open);
  header.classList.remove('hide');
}
toggle.addEventListener('click', () => setMenu(!document.body.classList.contains('menu-open')));
$$('a', mobileMenu).forEach(a => a.addEventListener('click', () => setMenu(false)));
window.addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });

/* ---------- Reveal on enter ---------- */
const revealIO = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.classList.add('in');
    revealIO.unobserve(e.target);
  });
}, { rootMargin: '0px 0px -8% 0px' });
$$('.funnel-grid, .cast').forEach(g => [...g.children].forEach((c, i) => c.style.setProperty('--d', `${i * 0.1}s`)));
$$('.reveal').forEach(el => revealIO.observe(el));

/* ---------- The story ---------- */
const story = $('.hiw-story');
const chapters = $$('.ch', story);
const captions = $$('.hiw-cap', story);
const N = chapters.length;
story.style.setProperty('--n', N);

const range = s => s.split(',').map(Number);
const prog = (t, [a, b]) => clamp((t - a) / (b - a || 1));
const ease = u => 1 - (1 - u) ** 3;
const back = u => 1 + 2.7 * (u - 1) ** 3 + 1.7 * (u - 1) ** 2; // slight overshoot for pops

function prep(el) {
  const d = el.dataset, it = { el };
  ['show', 'hide', 'dim', 'pop', 'move', 'from', 'to'].forEach(k => { if (d[k]) it[k] = range(d[k]); });
  it.walk = el.hasAttribute('data-walk');
  if (d.draw) {
    it.draw = range(d.draw);
    it.shapes = $$('path, circle, rect, line, polyline, ellipse', el).map(s => {
      const len = Math.ceil(s.getTotalLength()) + 2;
      s.style.strokeDasharray = len;
      return { s, len };
    });
    it.texts = $$('text', el);
  }
  if (d.count) { const [n, a, b] = range(d.count); it.count = { n, r: [a, b] }; }
  if (d.type) { it.type = range(d.type); it.text = d.text; }
  return it;
}
const scenes = chapters.map(g => $$('[data-show], [data-hide], [data-dim], [data-pop], [data-move], [data-draw], [data-count], [data-type]', g).map(prep));

// put one element where it should be at scene progress t (0..1)
function apply(it, t) {
  const { el } = it;
  let o = 1, x = 0, y = 0, s = 1;
  const fades = it.show || it.hide || it.dim || it.pop;
  const moves = it.show || it.pop || it.move;
  if (it.show) { const e = ease(prog(t, it.show)); o *= e; y += (1 - e) * 14; }
  if (it.hide) o *= 1 - prog(t, it.hide);
  if (it.dim) o *= 1 - 0.65 * prog(t, it.dim);
  if (it.pop) { const p = prog(t, it.pop); s = p > 0 ? back(p) : 0.001; if (p <= 0) o = 0; }
  if (it.move) {
    const m = ease(prog(t, it.move));
    if (it.from) { x += it.from[0] * (1 - m); y += it.from[1] * (1 - m); }
    if (it.to) { x += it.to[0] * m; y += it.to[1] * m; }
    // walkers turn side-on and step while they're on the move, then face the viewer again
    if (it.walk) el.classList.toggle('walking', m > 0.002 && m < 0.998);
  }
  if (fades) {
    el.style.opacity = o.toFixed(3);
    // things soak in like ink on wet paper: soft while they fade, crisp once they're there
    el.style.filter = o > 0.01 && o < 0.99 ? `blur(${((1 - o) * 4).toFixed(2)}px)` : '';
  }
  if (moves) el.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px) scale(${s.toFixed(3)})`;
  if (it.draw) {
    const p = prog(t, it.draw), n = it.shapes.length;
    const stagger = n > 1 ? Math.min(0.15, 0.5 / (n - 1)) : 0, dur = 1 - stagger * (n - 1);
    it.shapes.forEach(({ s: sh, len }, i) => {
      const q = clamp((p - i * stagger) / dur);
      sh.style.strokeDashoffset = len * (1 - q);
      sh.style.opacity = q > 0.01 ? 1 : 0;
    });
    it.texts.forEach(tx => { tx.style.opacity = p > 0.7 ? 1 : 0; });
  }
  if (it.count) {
    const p = ease(prog(t, it.count.r));
    el.textContent = (el.dataset.prefix || '') + Math.round(it.count.n * p).toLocaleString('en-IN') + (p > 0 ? el.dataset.suffix || '' : '');
  }
  if (it.type) {
    const p = prog(t, it.type), k = Math.round(it.text.length * p);
    el.textContent = it.text.slice(0, k) + (p > 0 && p < 1 ? '|' : '');
  }
}

const counter = $('.hiw-count'), bar = $('.hiw-bar i');
const dots = $$('.hiw-dots button');
let current = -1;
let storyH = 0;
function update() {
  const r = story.getBoundingClientRect();
  const total = (storyH || (storyH = story.offsetHeight)) - innerHeight;
  const p = clamp(-r.top / total);
  const x = p * N;
  const active = Math.min(N - 1, Math.floor(x));
  const t = reduceMotion ? 1 : clamp((x - active) / 0.82); // each scene finishes a little before the next one starts
  if (active !== current) {
    current = active;
    chapters.forEach((c, i) => c.classList.toggle('on', i === active));
    captions.forEach((c, i) => c.classList.toggle('on', i === active));
    dots.forEach((d, i) => d.classList.toggle('on', i === active));
    counter.textContent = String(active + 1).padStart(2, '0');
  }
  scenes[active].forEach(it => apply(it, t));
  bar.style.transform = `scaleX(${p.toFixed(4)})`;
}

dots.forEach((d, i) => d.addEventListener('click', () => {
  const top = story.getBoundingClientRect().top + scrollY;
  const total = story.offsetHeight - innerHeight;
  window.scrollTo({ top: top + (i / N) * total + 2, behavior: reduceMotion ? 'auto' : 'smooth' });
}));

/* ---------- Scroll loop ---------- */
// walk cycles only run while the page is actually scrolling, so pausing the
// scroll pauses the movie instead of leaving characters stepping on the spot
let ticking = false, stillTimer;
function frame() {
  ticking = false;
  update(); // measures first, so the class changes below don't force an extra layout
  story.classList.add('is-scrolling');
  clearTimeout(stillTimer);
  stillTimer = setTimeout(() => story.classList.remove('is-scrolling'), 160);
  const y = scrollY;
  header.classList.toggle('scrolled', y > 20);
  if (!document.body.classList.contains('menu-open')) header.classList.toggle('hide', y > lastY && y > innerHeight * 0.8);
  lastY = y;
}
const requestFrame = () => { if (!ticking) { ticking = true; requestAnimationFrame(frame); } };
window.addEventListener('scroll', requestFrame, { passive: true });
window.addEventListener('resize', () => { storyH = 0; requestFrame(); });
frame();
