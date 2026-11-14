/* ==========================================================================
   Digital Dobby — interactions & scroll line-draw animations
   ========================================================================== */

// Contact form submissions go to a Google Apps Script web app (setup/google-apps-script.gs),
// which saves each one as a row in a Google Sheet and emails it to the inbox.
// Paste the Web app URL (ends in /exec) below. Left empty, the form opens the
// visitor's email app with the message filled in, addressed to CONTACT_EMAIL.
const CONTACT_EMAIL = 'digital.dobbyy@gmail.com';
const FORM_ENDPOINT = '';

const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

document.documentElement.classList.remove('no-js');

/* ---------- Loader ---------- */
(() => {
  const start = performance.now();
  const minTime = reduceMotion ? 0 : 900;
  const done = () => {
    const wait = Math.max(0, minTime - (performance.now() - start));
    setTimeout(() => document.body.classList.add('loaded'), wait);
  };
  const fonts = document.fonts ? document.fonts.ready : Promise.resolve();
  Promise.race([fonts, new Promise(r => setTimeout(r, 2000))]).then(done);
})();

$('.year').textContent = new Date().getFullYear();

// run a callback once the intro loader has finished (body gets .loaded)
function onLoaded(cb) {
  if (document.body.classList.contains('loaded')) return cb();
  new MutationObserver((_, o) => {
    if (document.body.classList.contains('loaded')) { o.disconnect(); cb(); }
  }).observe(document.body, { attributes: true, attributeFilter: ['class'] });
}

/* ---------- Hero: a doodle girl hops up the growth staircase ----------
   Each step is one channel; its icon lights up when she lands on it. At the top
   she jumps for joy, then the climb starts again. */
(() => {
  const svg = $('.climb-scene');
  if (!svg) return;
  const X0 = 170, Y0 = 470, W = 46, R = 30, N = 6;   // staircase: first step x, ground y, tread width, riser
  const HOP = 0.75, PARTY = 2.4, FADE = 0.6;          // seconds per hop, celebrate at top, fade out
  const CLIMB = N * HOP, LOOP = CLIMB + PARTY + FADE;
  const girl = $('.cb-climber', svg);
  const q = s => $(s, girl);
  const squash = q('.cb-squash'), legs = q('.cb-legs'), armL = q('.cb-arm-l'), armR = q('.cb-arm-r'), head = q('.cb-head');
  const icons = $$('.cl-icon', svg), burst = $('.cb-burst', svg);
  const lerp = (a, b, u) => a + (b - a) * u;
  const ease = u => (u < 0.5 ? 2 * u * u : 1 - (-2 * u + 2) ** 2 / 2);
  const f2 = n => n.toFixed(2);
  const tread = j => [X0 + j * W + W / 2, Y0 - (j + 1) * R]; // where her feet land on step j (-1 = ground)

  // s = hops done (0..N), c = progress of the celebration at the top (0..1)
  function pose(s, c) {
    let x, y, sx = 1, sy = 1, tuck = 1, arms = 6, tilt = 0, landed;
    if (c === 0) {
      const k = Math.min(Math.floor(s), N - 1), u = s - k;
      const a = tread(k - 1), b = tread(k);
      landed = u >= 0.78 ? k + 1 : k;
      if (u < 0.18) {                       // crouch
        const e = Math.sin((Math.PI / 2) * (u / 0.18));
        [x, y] = a; sy = 1 - 0.13 * e; sx = 1 + 0.07 * e;
      } else if (u < 0.78) {                // in the air
        const v = (u - 0.18) / 0.6, arc = Math.sin(Math.PI * v), m = ease(v);
        x = lerp(a[0], b[0], m); y = lerp(a[1], b[1], m) - 34 * arc;
        sy = 1 + 0.06 * arc; sx = 1 - 0.04 * arc; tuck = 1 - 0.4 * arc; arms = 6 + 70 * arc; tilt = 6 * arc;
      } else {                              // land
        const w = Math.sin(Math.PI * (u - 0.78) / 0.22);
        [x, y] = b; sy = 1 - 0.11 * w; sx = 1 + 0.06 * w;
      }
    } else {                                // two little jumps for joy
      [x, y] = tread(N - 1);
      landed = N;
      const hop = c < 2 / 3 ? Math.abs(Math.sin(Math.PI * c * 3)) : 0;
      y -= 18 * hop; tuck = 1 - 0.3 * hop;
      arms = lerp(6, 150, Math.min(1, c * 5));
    }
    girl.setAttribute('transform', `translate(${f2(x)} ${f2(y)})`);
    squash.setAttribute('transform', `scale(${f2(sx)} ${f2(sy)})`);
    legs.setAttribute('transform', `translate(0 -20) scale(1 ${f2(tuck)}) translate(0 20)`);
    armL.setAttribute('transform', `rotate(${f2(arms)} -11 -57)`);
    armR.setAttribute('transform', `rotate(${f2(-arms)} 11 -57)`);
    head.setAttribute('transform', `rotate(${f2(tilt)} 0 -63)`);
    icons.forEach((icon, j) => icon.classList.toggle('lit', j < landed));
    burst.classList.toggle('show', c > 0.05 && c < 0.85);
  }

  pose(0, 0);
  if (reduceMotion) { pose(N, 1); girl.style.opacity = 1; burst.classList.remove('show'); return; }

  let start = null, raf = 0, running = false;
  function frame(now) {
    if (start === null) start = now;
    const t = ((now - start) / 1000) % LOOP;
    pose(Math.min(t / HOP, N), t > CLIMB ? Math.min(1, (t - CLIMB) / PARTY) : 0);
    const fade = t > CLIMB + PARTY ? 1 - (t - CLIMB - PARTY) / FADE : Math.min(1, t / 0.35);
    girl.style.opacity = fade.toFixed(3);
    raf = requestAnimationFrame(frame);
  }
  const run = on => {
    if (on === running) return;
    running = on;
    if (on) { start = null; raf = requestAnimationFrame(frame); } else cancelAnimationFrame(raf);
  };
  // start once the stairs have drawn in, and only animate while the hero is on screen
  onLoaded(() => setTimeout(() => new IntersectionObserver(([e]) => run(e.isIntersecting)).observe(svg), 1500));
})();

/* ---------- Hero stat cards: each number counts up as its card pops in ---------- */
(() => {
  const nums = $$('.float-card [data-tick]');
  if (!nums.length || reduceMotion) return;
  onLoaded(() => nums.forEach(el => {
    const m = el.textContent.match(/^([^\d]*)([\d.,]+)(.*)$/);
    if (!m) return;
    const target = parseFloat(m[2].replace(/,/g, ''));
    const decimals = (m[2].split('.')[1] || '').length;
    const show = n => { el.textContent = m[1] + n.toFixed(decimals) + m[3]; };
    const delay = parseFloat(getComputedStyle(el.closest('.float-card')).getPropertyValue('--cd')) || 0;
    show(0);
    setTimeout(() => {
      const t0 = performance.now();
      const tick = now => {
        const t = clamp((now - t0) / 1200);
        show(target * (1 - (1 - t) ** 3));
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, delay * 1000 + 200);
  }));
})();

/* ---------- Swing: Maya rides a thread spool like a pendulum ----------
   Every swing wipes the headline to the next service (the word behind the thread
   is the new one), then the swing settles, she hops off, the spool is pulled up
   and the logo draws in. Plays like a reel while the section is on screen. */
(() => {
  const stage = $('.swing-stage');
  if (!stage) return;
  // words come from the list in the HTML; letters inside .sp get their own span (with --i)
  // so each word's entrance can play letter by letter
  const esc = ch => (ch === ' ' ? '&nbsp;' : ch.replace('&', '&amp;').replace('<', '&lt;'));
  const words = $$('.sw-words li').map(li => {
    const copy = li.cloneNode(true);
    $$('.sp', copy).forEach(sp => {
      sp.innerHTML = [...sp.textContent].map((ch, i) => `<span class="ch" style="--i:${i}">${esc(ch)}</span>`).join('');
    });
    return { html: copy.innerHTML, tone: li.className };
  });
  // two text layers take turns: word i always lives in layer i % 2, so a word that is
  // already showing never gets re-inserted (which would replay its entrance)
  const layers = $$('.sw-layer', stage);
  const [la] = layers;
  const svg = $('.swing-svg', stage), line = $('.sw-line', svg), ground = $('.sw-ground', svg);
  const spool = $('.sw-spool', svg), maya = $('.sw-maya', svg), end = $('.swing-end', stage);
  const INTRO = 0.9, SWING = 1.15, SETTLE = 1, HOP = 0.9, HOLD = 3.6, OUT = 0.6;  // seconds
  const SWINGS = words.length - 1;
  const T_SWING = INTRO, T_SETTLE = T_SWING + SWINGS * SWING, T_HOP = T_SETTLE + SETTLE;
  const T_END = T_HOP + HOP, T_OUT = T_END + HOLD, LOOP = T_OUT + OUT;
  const ease = u => (u < 0.5 ? 2 * u * u : 1 - (-2 * u + 2) ** 2 / 2);
  const deg = r => r * 180 / Math.PI;
  const f1 = n => n.toFixed(1);
  let W, H, P, L, A, S;

  function measure() {
    W = stage.clientWidth; H = stage.clientHeight;
    svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
    // tall (phone) stages hang the thread from higher up, like a long pendulum
    const narrow = W / H < 1.1;
    P = [W / 2, (narrow ? -0.5 : -0.12) * H];                // pivot, above the stage
    L = (narrow ? 0.7 : 0.76) * H - P[1];                     // thread length: where the spool rests
    // swing just far enough that the thread clears the widest word...
    let half = 0, top = H, mid = H;
    words.forEach(w => {
      la.innerHTML = `<div class="sw-in">${w.html}</div>`;
      const r = la.firstChild.getBoundingClientRect(), s = stage.getBoundingClientRect();
      half = Math.max(half, r.width / 2);
      top = Math.min(top, r.top - s.top);
      mid = Math.min(mid, r.top - s.top + r.height / 2);
    });
    la.word = undefined;
    A = Math.atan2(half + 0.05 * W, (narrow ? mid : top) - P[1]);
    // ...but never so far that the spool leaves the stage
    A = clamp(Math.min(A, Math.asin(Math.min(1, 0.4 * W / L))), 0.3, 1.1);
    S = 0.22 * H / 131;                                     // Maya is ~22% of the stage tall
    ground.setAttribute('x1', f1(0.05 * W)); ground.setAttribute('x2', f1(0.95 * W));
    ground.setAttribute('y1', f1(0.92 * H)); ground.setAttribute('y2', f1(0.92 * H));
  }

  function setLayer(el, w) {
    if (el.word === w) return;
    el.word = w;
    el.innerHTML = w ? `<div class="sw-in">${w.html}</div>` : '';
    el.className = 'sw-layer' + (w && w.tone ? ' ' + w.tone : '');
  }
  // keep only one side of the thread: side 1 = right of it, -1 = left
  function clipSide(el, theta, side) {
    const d = [Math.sin(theta), Math.cos(theta)], n = [Math.cos(theta), -Math.sin(theta)], K = 4 * (W + H);
    const a = [P[0] - d[0] * K, P[1] - d[1] * K], b = [P[0] + d[0] * K, P[1] + d[1] * K];
    const pts = [a, b, [b[0] + side * n[0] * K, b[1] + side * n[1] * K], [a[0] + side * n[0] * K, a[1] + side * n[1] * K]];
    el.style.clipPath = `polygon(${pts.map(([x, y]) => `${f1(x)}px ${f1(y)}px`).join(', ')})`;
  }

  // the thread, the spool and (unless she has hopped off) Maya standing on it
  function pendulum(theta, lift) {
    const py = P[1] - lift * (L + 0.4 * H);
    const E = [P[0] + L * Math.sin(theta), py + L * Math.cos(theta)];
    line.setAttribute('x1', f1(P[0])); line.setAttribute('y1', f1(py));
    line.setAttribute('x2', f1(E[0])); line.setAttribute('y2', f1(E[1]));
    spool.setAttribute('transform', `translate(${f1(E[0])} ${f1(E[1])}) rotate(${f1(-deg(theta))}) scale(${S.toFixed(3)})`);
    return E;
  }
  function placeMaya(x, y, rot, opacity = 1) {
    maya.setAttribute('transform', `translate(${f1(x)} ${f1(y)}) rotate(${f1(rot)}) scale(${S.toFixed(3)})`);
    maya.style.opacity = opacity;
  }
  const onSpool = (E, theta) => [E[0] - 20 * S * Math.cos(theta), E[1] + 20 * S * Math.sin(theta)];

  function render(t) {
    stage.classList.toggle('ending', t >= T_HOP && t < T_OUT);
    end.classList.toggle('show', t >= T_END - 0.3 && t < T_OUT);
    if (t < T_SETTLE) {
      let theta, lift = 0;
      if (t < T_SWING) {                    // the swing drops in from above, held at the left
        theta = -A; lift = 1 - ease(t / INTRO);
        setLayer(layers[0], words[0]); layers[0].style.clipPath = 'none';
        layers[0].style.opacity = 1; layers[1].style.opacity = 0;
      } else {                              // swing k wipes word k into word k + 1
        const k = Math.min(SWINGS - 1, Math.floor((t - T_SWING) / SWING));
        const u = clamp((t - T_SWING - k * SWING) / SWING);
        const dir = k % 2 ? -1 : 1;         // 1 = swinging to the right
        theta = -dir * A * Math.cos(Math.PI * u);
        const prev = layers[k % 2], next = layers[(k + 1) % 2];
        setLayer(prev, words[k]); setLayer(next, words[k + 1]);
        clipSide(prev, theta, dir);         // the old word is still ahead of the thread
        clipSide(next, theta, -dir);        // the new one appears behind it
        prev.style.opacity = next.style.opacity = 1;
      }
      const E = pendulum(theta, lift);
      const [mx, my] = onSpool(E, theta);
      placeMaya(mx, my, -deg(theta));
      return;
    }
    // after the last swing: settle, hop off, pull the spool up, show the logo
    const lastLayer = layers[(words.length - 1) % 2];
    setLayer(lastLayer, words[words.length - 1]);
    lastLayer.style.clipPath = 'none'; layers[words.length % 2].style.opacity = 0;
    const lastDir = (SWINGS - 1) % 2 ? -1 : 1;
    const s = clamp((t - T_SETTLE) / SETTLE);
    const theta = lastDir * A * (1 - s) ** 1.5 * Math.cos(2.2 * Math.PI * s);
    const h = clamp((t - T_HOP) / HOP);
    const E = pendulum(theta, ease(h));
    lastLayer.style.opacity = (1 - clamp((t - T_HOP) / 0.4)).toFixed(3);
    const out = t >= T_OUT ? 1 - clamp((t - T_OUT) / OUT) : 1;
    if (t < T_HOP) {
      const [mx, my] = onSpool(E, theta);
      placeMaya(mx, my, -deg(theta));
    } else {                                // hop down to the ground on the left
      const from = onSpool([P[0], P[1] + L], 0), to = [0.2 * W, 0.92 * H];
      placeMaya(from[0] + (to[0] - from[0]) * ease(h), from[1] + (to[1] - from[1]) * h - 0.2 * H * Math.sin(Math.PI * h), 0, out);
    }
  }

  measure();
  if ('ResizeObserver' in window) new ResizeObserver(measure).observe(stage);
  if (document.fonts) document.fonts.ready.then(measure);  // word widths change once the font loads
  if (reduceMotion) { render(T_END + 0.5); $('.swing-replay', stage).hidden = true; return; }

  let elapsed = 0, last = null, raf = 0, running = false;
  function frame(now) {
    if (last !== null) elapsed += (now - last) / 1000;
    last = now;
    render(elapsed % LOOP);
    raf = requestAnimationFrame(frame);
  }
  const run = on => {
    if (on === running) return;
    running = on;
    if (on) { last = null; raf = requestAnimationFrame(frame); } else cancelAnimationFrame(raf);
  };
  render(0);
  new IntersectionObserver(([e]) => run(e.isIntersecting), { threshold: 0.35 }).observe(stage);
  $('.swing-replay', stage).addEventListener('click', () => { elapsed = 0; });
})();

/* ---------- Tools & platforms: brand icons (data in js/icons.js) ---------- */
(() => {
  const grid = $('[data-tools]');
  const icons = window.DD_ICONS;
  if (!grid || !icons) return;
  grid.innerHTML = Object.values(icons).map((ic, i) => `
    <div class="tool reveal" data-name="${ic.t}" style="--brand:${ic.hex};--d:${((i % 11) * 0.06).toFixed(2)}s">
      <svg viewBox="0 0 24 24" role="img" aria-label="${ic.t}"><path d="${ic.d}" /></svg>
    </div>`).join('');
  $$('path', grid).forEach(p => p.style.setProperty('--len', Math.ceil(p.getTotalLength()) + 1));
})();

/* ---------- Generic scroll-scrubbed line drawing ---------- */
function makeDrawable(svg) {
  const shapes = $$('path, circle, rect, line, polyline, ellipse', svg).map(el => {
    let len = 0;
    try { len = el.getTotalLength(); } catch (e) { /* not rendered */ }
    len = Math.ceil(len) + 2 || 1000;
    el.style.strokeDasharray = len;
    el.style.strokeDashoffset = len;
    return { el, len };
  });
  return { svg, shapes, last: -1 };
}
const drawables = $$('.draw').map(makeDrawable);

// Only drawings near the screen are measured each frame; one that scrolls away
// below is rubbed out so it draws again next time it comes in.
const nearDrawables = new Set();
const nearIO = new IntersectionObserver(entries => {
  entries.forEach(e => {
    const d = e.target.__draw;
    if (e.isIntersecting) nearDrawables.add(d);
    else {
      nearDrawables.delete(d);
      if (e.boundingClientRect.top > 0) d.reset = true;
    }
  });
  requestFrame();
}, { rootMargin: '200px 0px' });
drawables.forEach(d => { d.svg.__draw = d; nearIO.observe(d.svg); });

const drawQueue = [];
function readDrawables(vh) {
  drawQueue.length = 0;
  for (const d of nearDrawables) {
    const r = d.svg.getBoundingClientRect();
    const startLine = vh * 0.92;
    const span = Math.min(vh * 0.55, r.height + vh * 0.25);
    drawQueue.push(d, reduceMotion ? 1 : clamp((startLine - r.top) / span));
  }
}
function writeDrawables() {
  for (const d of drawables) if (d.reset) { d.reset = false; if (d.last !== -1) setDraw(d, 0); }
  for (let i = 0; i < drawQueue.length; i += 2) setDraw(drawQueue[i], drawQueue[i + 1]);
}
function setDraw(d, p) {
  if (Math.abs(p - d.last) < 0.001) return;
  d.last = p;
  const n = d.shapes.length;
  const stagger = n > 1 ? Math.min(0.18, 0.55 / (n - 1)) : 0;
  const dur = 1 - stagger * (n - 1);
  d.shapes.forEach(({ el, len }, i) => {
    const sp = clamp((p - i * stagger) / dur);
    el.style.strokeDashoffset = len * (1 - sp);
    el.style.opacity = sp > 0.005 ? 1 : 0;
  });
}

/* ---------- Master thread weaving down the page ----------
   The path is laid out in page coordinates but drawn inside a fixed, screen-sized
   SVG: each frame just pans it (one transform) and moves the pen. The pen's position
   comes from a precomputed table, so nothing is measured while scrolling. */
const thread = (() => {
  const page = $('.page');
  const svg = $('.thread');
  const pan = $('.thread-pan', svg);
  const line = $('.thread-line', svg), ghost = $('.thread-ghost', svg);
  const tip = $('.thread-tip', svg), halo = $('.thread-halo', svg);
  let L = 0, xs = [], ys = [], pageTop = 0, ready = false, lastLen = -1, lastPan = null;

  function build() {
    const W = page.clientWidth;
    svg.setAttribute('viewBox', `0 0 ${W} ${window.innerHeight}`);

    pageTop = page.getBoundingClientRect().top + scrollY;
    const tops = $$('[data-thread]').map(el => el.getBoundingClientRect().top + scrollY - pageTop);
    const footer = $('.footer');
    const footerTop = footer.getBoundingClientRect().top + scrollY - pageTop;

    const xL = clamp((W - 1200) / 4, 10, 110);
    const xR = W - xL;
    const amp = W > 720 ? 12 : 4;
    const band = 90; // half-height of the crossing curve between sections

    let x = xL, y = Math.min(110, tops[0] + 110);
    let d = `M${x} ${y}`;

    // gentle wobble while running down one side
    const runTo = (yEnd) => {
      const total = yEnd - y;
      if (total <= 0) return;
      const n = Math.max(1, Math.round(total / 360));
      const step = total / n;
      for (let k = 1; k <= n; k++) {
        const ny = y + step;
        const nx = k === n ? x : x + (k % 2 ? amp : -amp) * (x === xL ? 1 : -1);
        d += ` C${x} ${y + step / 2} ${nx} ${ny - step / 2} ${nx} ${ny}`;
        x = nx; y = ny;
      }
    };
    // S-curve across the page to the other side
    const crossTo = (nx, ny) => {
      const h = ny - y;
      d += ` C${x} ${y + h * 0.55} ${nx} ${ny - h * 0.55} ${nx} ${ny}`;
      x = nx; y = ny;
    };

    for (let i = 1; i < tops.length; i++) {
      runTo(tops[i] - band);
      crossTo(x === xL ? xR : xL, tops[i] + band);
    }
    runTo(footerTop - 140);
    crossTo(W / 2, footerTop + 1);

    line.setAttribute('d', d);
    ghost.setAttribute('d', d);
    L = line.getTotalLength();
    line.style.strokeDasharray = L;

    // lookup table: path length -> point (the path only ever moves down the page)
    const N = 1200;
    xs = new Float32Array(N + 1);
    ys = new Float32Array(N + 1);
    for (let k = 0; k <= N; k++) {
      const p = line.getPointAtLength((L * k) / N);
      xs[k] = p.x; ys[k] = p.y;
    }
    lastLen = -1; lastPan = null;
    ready = true;
  }

  // where along the path (as a fraction of the table) the pen reaches page height ty
  function indexAtY(ty) {
    const N = ys.length - 1;
    if (ty <= ys[0]) return 0;
    if (ty >= ys[N]) return N;
    let lo = 0, hi = N;
    while (hi - lo > 1) {
      const mid = (lo + hi) >> 1;
      ys[mid] < ty ? (lo = mid) : (hi = mid);
    }
    return lo + (ty - ys[lo]) / (ys[hi] - ys[lo] || 1);
  }

  function update(vh) {
    if (!ready) return;
    const off = Math.round(pageTop - scrollY);
    if (off !== lastPan) { pan.setAttribute('transform', `translate(0 ${off})`); lastPan = off; }
    const maxScroll = document.documentElement.scrollHeight - vh;
    const prog = maxScroll > 0 ? clamp(scrollY / maxScroll) : 1;
    // pen sits ~60% down the viewport and catches up to the very end at the bottom
    const tipY = scrollY + vh * (0.6 + 0.4 * prog ** 6) - pageTop;
    const N = ys.length - 1;
    const f = reduceMotion ? N : indexAtY(tipY);
    const len = (f / N) * L;
    if (Math.abs(len - lastLen) < 0.5) return;
    lastLen = len;
    line.style.strokeDashoffset = L - len;
    const k = Math.min(N - 1, Math.floor(f)), t = f - k;
    const px = xs[k] + (xs[k + 1] - xs[k]) * t, py = ys[k] + (ys[k + 1] - ys[k]) * t;
    for (const c of [tip, halo]) { c.setAttribute('cx', px.toFixed(1)); c.setAttribute('cy', py.toFixed(1)); }
    tip.style.opacity = halo.style.opacity = len > 2 ? '' : 0;
  }

  return { build, update };
})();

/* ---------- Statement: words light up on scroll ---------- */
const statement = (() => {
  const el = $('[data-words]');
  if (!el) return { read() {}, write() {} };
  const highlight = ['attention', 'knowing', 'measurable', 'growth'];
  el.innerHTML = el.textContent.trim().split(/\s+/).map(w => {
    const bare = w.toLowerCase().replace(/[^a-z]/g, '');
    return `<span class="w${highlight.includes(bare) ? ' hl' : ''}">${w}</span>`;
  }).join(' ');
  const words = $$('.w', el);
  let lastLit = -1, lit = 0;
  return {
    read(vh) {
      const r = el.getBoundingClientRect();
      if (r.bottom < -vh || r.top > vh * 2) { lit = lastLit; return; }
      const p = reduceMotion ? 1 : clamp((vh * 0.85 - r.top) / (r.height + vh * 0.3));
      lit = Math.round(p * words.length);
    },
    write() {
      if (lit === lastLit) return;
      lastLit = lit;
      words.forEach((w, i) => w.classList.toggle('lit', i < lit));
    }
  };
})();

/* ---------- Story: line-drawn people tell What · Where · How ----------
   The stage stays pinned while the three steps scroll past. Each step draws
   its own scene as it comes in, and the step nearest the middle is shown. */
const story = (() => {
  const steps = $$('.story-step');
  const scenes = $$('.story-stage .scene').map(makeDrawable);
  const no = $('.stage-no'), word = $('.stage-word');
  const words = ['What', 'Where', 'How'];
  if (!steps.length || steps.length !== scenes.length) return { read() {}, write() {} };
  const section = steps[0].closest('section') || steps[0].parentNode;
  const heads = steps.map(s => $('h3', s));
  let current = -1, active = 0, skip = true;
  const prog = steps.map(() => 0);
  return {
    read(vh) {
      const box = section.getBoundingClientRect();
      skip = box.bottom < -vh || box.top > vh * 2;
      if (skip) return;
      active = 0;
      steps.forEach((step, i) => {
        if (heads[i].getBoundingClientRect().top < vh * 0.85) active = i;
        prog[i] = reduceMotion ? 1 : clamp((vh * 0.9 - step.getBoundingClientRect().top) / (vh * 0.5));
      });
    },
    write() {
      if (skip) return;
      prog.forEach((p, i) => {
        setDraw(scenes[i], p);
        scenes[i].svg.classList.toggle('done', p >= 1);
      });
      if (active === current) return;
      current = active;
      steps.forEach((s, i) => s.classList.toggle('active', i === active));
      scenes.forEach((s, i) => s.svg.classList.toggle('on', i === active));
      no.textContent = String(active + 1).padStart(2, '0');
      word.textContent = words[active];
    }
  };
})();

/* ---------- Footer wordmark ---------- */
const wordmark = (() => {
  const text = $('.wordmark text');
  if (!text) return { read() {}, write() {} };
  const svg = text.ownerSVGElement;
  let p = -1, lastP = -1;
  return {
    read(vh) {
      const r = svg.getBoundingClientRect();
      p = r.top > vh ? lastP : reduceMotion ? 1 : clamp((vh - r.top) / (r.height + 60));
    },
    write() {
      if (p === lastP || p < 0) return;
      lastP = p;
      text.style.strokeDashoffset = 900 * (1 - p);
      text.style.fillOpacity = clamp((p - 0.8) / 0.2);
    }
  };
})();

/* ---------- Header, hero parallax, chat button ---------- */
const header = $('.header');
const heroArt = $('.hero-scene');
const fab = $('.chat-fab');
let lastY = scrollY;

function updateChrome(vh) {
  const y = scrollY;
  header.classList.toggle('scrolled', y > 20);
  if (!document.body.classList.contains('menu-open')) {
    header.classList.toggle('hide', y > lastY && y > vh * 0.8);
  }
  lastY = y;
  fab.classList.toggle('show', y > vh * 0.5);
  if (heroArt && y < vh * 1.2 && !reduceMotion) {
    heroArt.style.transform = `translateY(${(y * -0.08).toFixed(1)}px)`;
  }
}

/* ---------- Main scroll loop ----------
   Everything is measured first and written after, so the browser lays the page
   out once per frame instead of once per drawing (this matters a lot in Safari). */
let ticking = false;
function frame() {
  ticking = false;
  const vh = window.innerHeight;
  // read
  readDrawables(vh);
  statement.read(vh);
  story.read(vh);
  wordmark.read(vh);
  // write
  writeDrawables();
  statement.write();
  story.write();
  wordmark.write();
  thread.update(vh);
  updateChrome(vh);
}
function requestFrame() { if (!ticking) { ticking = true; requestAnimationFrame(frame); } }
window.addEventListener('scroll', requestFrame, { passive: true });

let resizeT;
const rebuild = () => { thread.build(); requestFrame(); };
window.addEventListener('resize', () => { clearTimeout(resizeT); resizeT = setTimeout(rebuild, 150); });
window.addEventListener('load', rebuild);
if (document.fonts) document.fonts.ready.then(rebuild);
if ('ResizeObserver' in window) {
  let lastH = 0;
  new ResizeObserver(() => {
    const h = $('.page').scrollHeight;
    if (Math.abs(h - lastH) > 4) { lastH = h; clearTimeout(resizeT); resizeT = setTimeout(rebuild, 120); }
  }).observe($('main'));
}
rebuild();

/* ---------- Pause looping animations that are off screen ---------- */
const pauseIO = new IntersectionObserver(entries => {
  entries.forEach(e => e.target.classList.toggle('paused', !e.isIntersecting));
}, { rootMargin: '100px 0px' });
$$('.hero, .marquee, #how, .swing-stage, .footer').forEach(el => pauseIO.observe(el));

/* ---------- Reveal on enter ---------- */
const revealIO = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.classList.add('in');
    revealIO.unobserve(e.target);
  });
}, { rootMargin: '0px 0px -8% 0px' });
// stagger siblings that reveal together
$$('.service-grid, .stats, .work-grid, .faq-list, .contact-list, .industry-grid, .career').forEach(group => {
  [...group.children].forEach((c, i) => c.style.setProperty('--d', `${(i % 3) * 0.1}s`));
});
$$('.reveal').forEach(el => revealIO.observe(el));

/* ---------- Counters ---------- */
const countIO = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    countIO.unobserve(e.target);
    const el = e.target;
    const to = parseFloat(el.dataset.count);
    const dec = parseInt(el.dataset.decimals || '0', 10);
    const dur = reduceMotion ? 1 : 1800;
    const t0 = performance.now();
    const tick = now => {
      const t = clamp((now - t0) / dur);
      el.textContent = (to * (1 - Math.pow(1 - t, 3))).toFixed(dec);
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  });
}, { threshold: 0.6 });
$$('[data-count]').forEach(el => {
  if (!reduceMotion) el.textContent = '0';
  countIO.observe(el);
});

/* ---------- Active nav link ---------- */
const navLinks = $$('.nav a');
const navIO = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id));
  });
}, { rootMargin: '-45% 0px -50% 0px' });
$$('main section[id]').forEach(s => navIO.observe(s));

/* ---------- Mobile menu ---------- */
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

/* ---------- Custom cursor ---------- */
(() => {
  const cur = $('.cursor');
  if (!cur || reduceMotion || matchMedia('(hover: none), (pointer: coarse)').matches) return;
  let x = 0, y = 0, cx = 0, cy = 0, running = false;
  // the dot eases after the mouse and stops updating once it has caught up
  const loop = () => {
    cx += (x - cx) * 0.2; cy += (y - cy) * 0.2;
    if (Math.abs(x - cx) < 0.3 && Math.abs(y - cy) < 0.3) { cx = x; cy = y; running = false; }
    cur.style.transform = `translate3d(${cx.toFixed(1)}px, ${cy.toFixed(1)}px, 0)`;
    if (running) requestAnimationFrame(loop);
  };
  window.addEventListener('mousemove', e => {
    x = e.clientX; y = e.clientY; cur.classList.add('on');
    if (!running) { running = true; requestAnimationFrame(loop); }
  }, { passive: true });
  document.addEventListener('mouseleave', () => cur.classList.remove('on'));
  document.addEventListener('mouseover', e => {
    cur.classList.toggle('big', !!e.target.closest('a, button, summary, .chips label, .case'));
  });
})();

/* ---------- Goal picker: "What do you want to achieve?" ----------
   Picking a goal lights up the services we'd combine for it; the link then
   takes the visitor to the form with those services already ticked. */
(() => {
  const picker = $('.goal-picker');
  if (!picker) return;
  const grid = $('.service-grid'), cards = $$('.service', grid);
  const buttons = $$('.goal-chips button', picker), text = $('.goal-text', picker), cta = $('.goal-cta', picker);
  let goal = null;
  const names = keys => cards.filter(c => keys.includes(c.dataset.key)).map(c => $('h3', c).textContent);
  const list = arr => (arr.length > 1 ? `${arr.slice(0, -1).join(', ')} and ${arr[arr.length - 1]}` : arr[0] || '');
  buttons.forEach(btn => btn.addEventListener('click', () => {
    goal = goal === btn ? null : btn;
    buttons.forEach(b => b.setAttribute('aria-pressed', b === goal));
    picker.classList.toggle('active', !!goal);
    grid.classList.toggle('filtering', !!goal);
    const keys = goal ? goal.dataset.services.split(' ') : [];
    cards.forEach(c => c.classList.toggle('match', keys.includes(c.dataset.key)));
    if (goal) text.textContent = `To ${goal.dataset.phrase}, we'd combine ${list(names(keys))}.`;
  }));
  cta.addEventListener('click', () => {
    if (!goal) return;
    const form = $('.contact-form');
    const wanted = goal.dataset.form.split(',');
    $$('input[name="services"]', form).forEach(i => { i.checked = wanted.includes(i.value); });
    if (!form.message.value.trim()) form.message.value = `We want to ${goal.dataset.phrase}. `;
  });
})();

/* ---------- Contact form ---------- */
(() => {
  const form = $('.contact-form');
  if (!form) return;
  const note = $('.form-note', form);
  const success = $('.form-success', form);
  const btn = $('button[type="submit"]', form);

  form.addEventListener('input', e => e.target.closest('.field')?.classList.remove('invalid'));

  form.addEventListener('submit', async e => {
    e.preventDefault();
    note.textContent = '';
    let ok = true;
    $$('[required]', form).forEach(input => {
      const valid = input.type === 'email'
        ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim())
        : input.value.trim().length > 0;
      input.closest('.field').classList.toggle('invalid', !valid);
      if (!valid) ok = false;
    });
    if (!ok) { note.textContent = 'Please fill in the highlighted fields.'; return; }

    const fd = new FormData(form);
    // a hidden field only bots fill in: quietly pretend it worked
    if (fd.get('_honey')) { showSuccess(); return; }
    const data = {
      Name: fd.get('name').trim(), Email: fd.get('email').trim(), Company: fd.get('company').trim(),
      Phone: fd.get('phone').trim(), Services: fd.getAll('services').join(', '),
      Budget: fd.get('budget') || '', Message: fd.get('message').trim()
    };

    const body = Object.entries(data).filter(([, v]) => v).map(([k, v]) => `${k}: ${v}`).join('\n');
    const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('New project enquiry — ' + data.Name)}&body=${encodeURIComponent(body)}`;

    if (FORM_ENDPOINT) {
      setSending(true);
      try {
        // text/plain keeps this a "simple" request: Apps Script can't answer a CORS preflight
        const res = await fetch(FORM_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: JSON.stringify({ ...data, Page: location.href })
        });
        const json = await res.json().catch(() => ({}));
        if (!res.ok || String(json.success) !== 'true') throw new Error(json.message || `HTTP ${res.status}`);
        showSuccess();
      } catch (err) {
        console.warn('Contact form not sent:', err.message);
        // keep the visitor's message: offer to send the same text from their email app
        note.innerHTML = `Sorry, your message couldn't be sent right now. <a href="${mailto}">Send it from your email app instead</a> — it's already filled in.`;
      } finally {
        setSending(false);
      }
    } else {
      window.location.href = mailto;
      showSuccess('Almost there!', 'Your email app should open with your message ready — just hit send.');
    }
  });

  const btnLabel = btn.innerHTML;
  function setSending(on) {
    btn.disabled = on;
    btn.classList.toggle('loading', on);
    btn.innerHTML = on ? 'Sending…' : btnLabel;
  }

  function showSuccess(title = 'Message sent!', text = "Thanks for reaching out — we'll get back to you within one business day.") {
    $('h3', success).textContent = title;
    $('p', success).textContent = text;
    success.classList.add('show');
    success.setAttribute('aria-hidden', 'false');
  }
  $('.form-reset', form).addEventListener('click', () => {
    form.reset();
    success.classList.remove('show');
    success.setAttribute('aria-hidden', 'true');
  });
})();
