import { writeFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();

const sections = [
  ['01', 'start-with-the-canvas', 'Start with the Canvas', '01-02', 'Coordinates, shapes, color, and the first feeling that code can make a visible mark.', ['CRD', 'AAP'], 'beginner'],
  ['02', 'make-it-move', 'Make It Move', '03', 'Time, animation, the draw loop, and changing values frame by frame.', ['AAP'], 'beginner'],
  ['03', 'make-it-respond', 'Make It Respond', '04-05', 'Mouse input, events, booleans, and conditional choices.', ['AAP'], 'early'],
  ['04', 'make-systems', 'Make Systems', '06-10', 'Loops, functions, arrays, objects, and modes that let a sketch become a system.', ['AAP', 'CSA'], 'core'],
  ['05', 'data-as-material', 'Data as Material', '11-16', 'Images, pixels, binary color, compression, histograms, and datasets as drawing material.', ['DAT', 'AAP'], 'data'],
  ['06', 'computing-in-the-world', 'Computing in the World', '17-20', 'Bias, accessibility, authorship, and energy as visible consequences of computation.', ['IOC', 'CRD'], 'impact'],
  ['07', 'algorithms', 'Algorithms', '21-22', 'Recursion, dynamic lists, particles, and advanced ideas made visual.', ['AAP', 'CSA'], 'advanced'],
];

const concepts = [
  ['01', 'coordinates', 'Coordinates', 'pixels, x/y, origin', 'Start with the Canvas', 'start-with-the-canvas', ['p5.js', 'Canvas API', 'Processing'], ['CRD', 'AAP']],
  ['02', 'shapes-and-color', 'Shapes & Color', 'fill, stroke, palette', 'Start with the Canvas', 'start-with-the-canvas', ['p5.js', 'Canvas API', 'Processing'], ['CRD', 'AAP']],
  ['03', 'draw-loop-time', 'Draw Loop / Time', 'setup, draw, frameCount', 'Make It Move', 'make-it-move', ['p5.js', 'Canvas API', 'Processing'], ['AAP']],
  ['04', 'mouse-input', 'Mouse Input', 'mouseX, mousePressed', 'Make It Respond', 'make-it-respond', ['p5.js', 'Canvas API'], ['AAP']],
  ['05', 'conditionals', 'Conditionals', 'if / else / boolean', 'Make It Respond', 'make-it-respond', ['p5.js', 'Canvas API', 'Processing'], ['AAP', 'CSA']],
  ['06', 'for-loops-and-grids', 'For Loops & Grids', 'i, nesting, patterns', 'Make Systems', 'make-systems', ['p5.js', 'Canvas API', 'Processing'], ['AAP', 'CSA']],
  ['07', 'functions', 'Functions', 'parameters, return', 'Make Systems', 'make-systems', ['p5.js', 'Canvas API', 'Processing'], ['AAP', 'CSA']],
  ['08', 'arrays', 'Arrays', 'lists, index, loops', 'Make Systems', 'make-systems', ['p5.js', 'Canvas API', 'Processing'], ['AAP', 'CSA']],
  ['09', 'objects', 'Objects', 'data + behavior', 'Make Systems', 'make-systems', ['p5.js', 'Canvas API'], ['AAP', 'CSA']],
  ['10', 'state-machines', 'State Machines', 'modes, screens', 'Make Systems', 'make-systems', ['p5.js', 'Canvas API'], ['AAP', 'CSA']],
  ['11', 'pixels-image-data', 'Pixels / Image Data', 'pictures as numbers', 'Data as Material', 'data-as-material', ['p5.js', 'Canvas API'], ['DAT', 'CSA']],
  ['12', 'color-is-24-bits', 'Color is 24 Bits', 'RGB and binary', 'Data as Material', 'data-as-material', ['p5.js', 'Canvas API', 'Processing'], ['DAT']],
  ['13', 'binary-as-pixels', 'Binary as Pixels', 'bits to bitmap', 'Data as Material', 'data-as-material', ['p5.js', 'Canvas API', 'Processing'], ['DAT']],
  ['14', 'compression-by-drawing', 'Compression by Drawing', 'RLE, lossless, lossy', 'Data as Material', 'data-as-material', ['p5.js', 'Canvas API', 'Processing'], ['DAT']],
  ['15', 'histograms-and-sampling', 'Histograms & Sampling', 'extract info', 'Data as Material', 'data-as-material', ['p5.js', 'Canvas API'], ['DAT']],
  ['16', 'data-as-material', 'Data as Material', 'CSV, JSON, drawing', 'Data as Material', 'data-as-material', ['p5.js', 'Canvas API', 'Processing'], ['DAT', 'CRD']],
  ['17', 'bias-in-a-filter', 'Bias in a Filter', 'visible failure', 'Computing in the World', 'computing-in-the-world', ['p5.js', 'Canvas API'], ['IOC', 'DAT']],
  ['18', 'color-and-accessibility', 'Color & Accessibility', 'palette, contrast, simulate', 'Computing in the World', 'computing-in-the-world', ['p5.js', 'Canvas API'], ['IOC', 'CRD']],
  ['19', 'whose-authorship', 'Whose Authorship?', 'human vs algorithm', 'Computing in the World', 'computing-in-the-world', ['p5.js', 'Canvas API'], ['IOC', 'CRD']],
  ['20', 'energy-of-a-sketch', 'Energy of a Sketch', 'compute and sustainability', 'Computing in the World', 'computing-in-the-world', ['p5.js', 'Canvas API'], ['IOC', 'AAP']],
  ['21', 'recursion-as-fractals', 'Recursion as Fractals', 'base case, recursive case', 'Algorithms', 'algorithms', ['p5.js', 'Canvas API', 'Processing'], ['AAP', 'CSA']],
  ['22', 'arraylist-in-action', 'ArrayList in Action', 'dynamic lists, particles', 'Algorithms', 'algorithms', ['p5.js', 'Processing'], ['AAP', 'CSA']],
];

const nav = (active, prefix = '..') => `<header class="site-header">
  <a class="brand" href="${prefix}/index.html">Coding the Canvas</a>
  <nav>
    ${[
      ['Home', `${prefix}/index.html`, 'home'],
      ['Concepts', `${prefix}/concepts/index.html`, 'concepts'],
      ['Sections', `${prefix}/sections/index.html`, 'sections'],
      ['Languages', `${prefix}/languages/index.html`, 'languages'],
      ['Browse', `${prefix}/browse/index.html`, 'browse'],
      ['Teachers', `${prefix}/teachers/index.html`, 'teachers'],
      ['About', `${prefix}/about/index.html`, 'about'],
    ].map(([label, href, key]) => `<a class="${active === key ? 'active' : ''}" href="${href}">${label}</a>`).join('')}
  </nav>
</header>`;

const esc = (value) => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');

function shell({ active, title, kicker, lede, body }) {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${esc(title)} - Coding the Canvas</title>
  <meta name="description" content="${esc(lede)}" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Caveat:wght@600;700&family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet" />
  <link rel="icon" href="../assets/favicon.svg" type="image/svg+xml" />
  <link rel="stylesheet" href="../assets/styles.css" />
  <link rel="stylesheet" href="../assets/directory-pages.css" />
</head>
<body data-page="${active}">
  ${nav(active)}
  <main>
    <section class="hero">
      <p class="kicker">${esc(kicker)}</p>
      <h1>${esc(title)}</h1>
      <p class="lede">${esc(lede)}</p>
    </section>
    ${body}
  </main>
  <footer class="site-footer">
    <span>Coding the Canvas — learn computer science by seeing code act on a canvas.</span>
    <span>p5.js · Canvas API · Processing Java</span>
  </footer>
  <script src="../assets/site.js"></script>
</body>
</html>
`;
}

const tagRow = (tags) => `<div class="tag-row">${tags.map((tag) => `<span class="tag">${esc(tag)}</span>`).join('')}</div>`;

function movementRail() {
  return `<section class="band"><div class="directory-rail">${sections.map(([n, slug, title, range]) => `<a class="rail-link" href="../sections/${slug}/index.html"><strong>§${Number(n)}</strong><span>${esc(title)}</span><small class="meta">Lessons ${esc(range)}</small></a>`).join('')}</div></section>`;
}

function conceptCard([n, slug, title, sub, section, sectionSlug, langs, ap], prefix = './') {
  return `<a class="card directory-card" href="${prefix}${slug}/index.html" data-section="${esc(sectionSlug)}" data-tags="${esc([...langs, ...ap, section].join(' '))}">
    <span class="lesson-badge">${n}</span>
    <span>
      <span class="meta">${esc(section)}</span>
      <h2>${n} - ${esc(title)}</h2>
      <p>${esc(sub)}</p>
      ${tagRow([...langs, ...ap])}
    </span>
  </a>`;
}

function sectionCard([n, slug, title, range, desc, ap, level], prefix = './') {
  const count = concepts.filter((c) => c[5] === slug).length;
  return `<a class="card directory-card" href="${prefix}${slug}/index.html" data-section="${esc(slug)}" data-tags="${esc([...ap, level].join(' '))}">
    <span class="lesson-badge">§${Number(n)}</span>
    <span>
      <span class="meta">Lessons ${esc(range)} · ${count} concept${count === 1 ? '' : 's'}</span>
      <h2>${n} - ${esc(title)}</h2>
      <p>${esc(desc)}</p>
      ${tagRow([...ap, level])}
    </span>
  </a>`;
}

function writeConceptsIndex() {
  const blocks = sections.map((section) => {
    const [n, slug, title, range, desc] = section;
    const cards = concepts.filter((c) => c[5] === slug).map((c) => conceptCard(c)).join('');
    return `<section class="band movement-block" id="${slug}">
      <div class="movement-head">
        <div><span class="movement-num">§${Number(n)}</span><h2 class="movement-title">${esc(title)}</h2><p>${esc(desc)}</p></div>
        <div class="movement-meta">Lessons ${esc(range)}</div>
      </div>
      <div class="grid cards">${cards}</div>
    </section>`;
  }).join('');
  const body = `
    <section class="band"><div class="directory-stats">
      <div class="directory-stat"><strong>22</strong><span>concept pages</span></div>
      <div class="directory-stat"><strong>7</strong><span>curriculum movements</span></div>
      <div class="directory-stat"><strong>3</strong><span>language tracks</span></div>
      <div class="directory-stat"><strong>AP</strong><span>CSP and CSA alignment</span></div>
    </div></section>
    ${movementRail().replaceAll('../sections/', '../sections/')}
    ${blocks}`;
  writeFileSync(join(root, 'concepts/index.html'), shell({
    active: 'concepts',
    title: 'Concepts',
    kicker: '22 lessons',
    lede: 'The full concept sequence from first coordinates to ArrayList-driven particle systems.',
    body,
  }));
}

function writeSectionsIndex() {
  const body = `
    <section class="band"><div class="directory-stats">
      <div class="directory-stat"><strong>7</strong><span>movements</span></div>
      <div class="directory-stat"><strong>22</strong><span>concepts</span></div>
      <div class="directory-stat"><strong>25+</strong><span>class periods</span></div>
      <div class="directory-stat"><strong>AP</strong><span>teacher-ready framing</span></div>
    </div></section>
    <section class="band"><div class="grid cards">${sections.map((s) => sectionCard(s)).join('')}</div></section>`;
  writeFileSync(join(root, 'sections/index.html'), shell({
    active: 'sections',
    title: 'Sections',
    kicker: 'seven movements',
    lede: 'The mid-level curriculum pages that group concepts into coherent arcs.',
    body,
  }));
}

function writeBrowseIndex() {
  const results = [
    ...sections.map((s) => sectionCard(s, '../sections/')),
    ...concepts.map((c) => conceptCard(c, '../concepts/')),
    `<a class="card result-card" href="../bridges/index.html" data-tags="bridge tool concept">
      <span class="lesson-badge">⬡</span><span><span class="meta">bridges</span><h2>Concept Bridges</h2><p>Cross-cutting ideas that connect lessons and tools.</p>${tagRow(['bridge', 'tool'])}</span><span class="meta">open</span>
    </a>`,
    `<a class="card result-card" href="../tools/index.html" data-tags="tool workshop interactive">
      <span class="lesson-badge">✦</span><span><span class="meta">tools</span><h2>Workshop Tools</h2><p>Interactive studios and explainers for classroom use.</p>${tagRow(['tool', 'interactive'])}</span><span class="meta">open</span>
    </a>`,
  ].join('');
  const body = `
    <section class="band browse-layout">
      <aside class="facet-panel">
        <div class="facet-group"><h2>Movements</h2>${tagRow(['Start', 'Move', 'Respond', 'Systems', 'Data', 'Impact', 'Algorithms'])}</div>
        <div class="facet-group"><h2>Languages</h2>${tagRow(['p5.js', 'Canvas API', 'Processing'])}</div>
        <div class="facet-group"><h2>AP</h2>${tagRow(['CRD', 'DAT', 'AAP', 'IOC', 'CSA'])}</div>
      </aside>
      <div class="browse-results cards">${results}</div>
    </section>`;
  writeFileSync(join(root, 'browse/index.html'), shell({
    active: 'browse',
    title: 'Browse Everything',
    kicker: 'atlas index',
    lede: 'Search across concepts, sections, bridges, tools, languages, and AP-aligned resources.',
    body,
  }));
}

writeConceptsIndex();
writeSectionsIndex();
writeBrowseIndex();
console.log('Wrote directory pages.');
