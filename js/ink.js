/* ==========================================================================
   Digital Dobby — ink-wash drawing style (shared by every page)
   Adds the SVG filters and watercolour glows that css/ink.css points at, then
   gives each doodle character a soft glow in their own colour. Load this
   before the page's own script so the glows get drawn in with each scene.
   ========================================================================== */

(() => {
  const NS = 'http://www.w3.org/2000/svg';

  // #ink: brush wobble + a little bleed into the paper + watercolour grain.
  // #ink-sm: the same, scaled down for 64px icons.
  const filter = (id, warp, freq, bleed, grain) => `
    <filter id="${id}" x="-20%" y="-20%" width="140%" height="140%" color-interpolation-filters="sRGB">
      <feTurbulence type="fractalNoise" baseFrequency="${freq}" numOctaves="2" seed="4" result="warp" />
      <feDisplacementMap in="SourceGraphic" in2="warp" scale="${warp}" xChannelSelector="R" yChannelSelector="G" result="wobble" />
      <feGaussianBlur in="wobble" stdDeviation="${bleed}" result="blur" />
      <feComponentTransfer in="blur" result="bleed"><feFuncA type="linear" slope=".45" /></feComponentTransfer>
      <feTurbulence type="fractalNoise" baseFrequency="${grain}" numOctaves="2" seed="9" result="noise" />
      <feColorMatrix in="noise" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  1.3 0 0 0 .28" result="grain" />
      <feComposite in="wobble" in2="grain" operator="in" result="grainy" />
      <feMerge><feMergeNode in="bleed" /><feMergeNode in="grainy" /></feMerge>
    </filter>`;

  // one glow colour per character, like the coloured auras in a storybook
  const GLOWS = { maya: '#B3A2F0', riya: '#F2C66B', arjun: '#86CDBF', other: '#F3A3A0' };
  const glow = (name, c) => `
    <radialGradient id="glow-${name}">
      <stop offset="0" stop-color="${c}" stop-opacity=".6" />
      <stop offset=".55" stop-color="${c}" stop-opacity=".24" />
      <stop offset="1" stop-color="${c}" stop-opacity="0" />
    </radialGradient>`;

  const defs = document.createElementNS(NS, 'svg');
  defs.setAttribute('class', 'ink-defs');
  defs.setAttribute('aria-hidden', 'true');
  defs.innerHTML = `<defs>${filter('ink', 3, 0.035, 1, 0.55)}${filter('ink-sm', 1.4, 0.09, 0.5, 0.9)}${
    Object.entries(GLOWS).map(([n, c]) => glow(n, c)).join('')}</defs>`;
  document.body.prepend(defs);

  // Characters share one head outline (front view, plus a side view for walkers).
  // Who it is comes from what they wear: Riya's glasses, Maya's bun, Arjun's spiky hair.
  const HEADS = 'path[d^="M-30 -96C-30 -116"], path[d^="M-28 -96C-28 -116"]';
  const who = g =>
    g.querySelector('circle[r="7.5"]') ? 'riya'
    : g.querySelector('circle[cy="-134"]') ? 'maya'
    : g.querySelector('path[d^="M-30 -100L-20 -108"]') ? 'arjun' : 'other';

  const done = new Set();
  document.querySelectorAll(HEADS).forEach(head => {
    // the character's own group is the nearest one that places it in the scene
    let g = head.parentNode;
    while (g.tagName !== 'svg' && !/translate/.test(g.getAttribute('transform') || '')) g = g.parentNode;
    if (done.has(g)) return;
    done.add(g);
    const e = document.createElementNS(NS, 'ellipse');
    e.setAttribute('class', 'ink-glow');
    e.setAttribute('cx', 0); e.setAttribute('cy', -78);
    e.setAttribute('rx', 62); e.setAttribute('ry', 80);
    e.setAttribute('fill', `url(#glow-${who(g)})`);
    g.prepend(e);
  });

  // the handwriting runs small, so the story's scene words go up a size
  document.querySelectorAll('.hiw-svg text[font-size]').forEach(t =>
    t.setAttribute('font-size', (t.getAttribute('font-size') * 1.3).toFixed(1)));
})();
