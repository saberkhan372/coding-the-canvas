import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';

const outDir = process.cwd();

const sections = [
  {
    id: 'start-with-the-canvas',
    n: '01',
    title: 'Start with the Canvas',
    range: '01-02',
    theme: 'Coordinates, shapes, color, and the first feeling that code can make a visible mark.',
    needs: ['No prior-code entry point', 'Coordinate plane explanation', 'Shape and color vocabulary', 'First sketch checklist'],
  },
  {
    id: 'make-it-move',
    n: '02',
    title: 'Make It Move',
    range: '03',
    theme: 'Time, animation, the draw loop, and changing values frame by frame.',
    needs: ['Static-to-moving comparison', 'setup/draw model', 'frameCount and time controls', 'Play, pause, reset states'],
  },
  {
    id: 'make-it-respond',
    n: '03',
    title: 'Make It Respond',
    range: '04-05',
    theme: 'Mouse input, events, booleans, and conditional choices.',
    needs: ['Pointer visualization', 'Event vocabulary', 'if/else truth-table mini panel', 'Interaction debugging prompts'],
  },
  {
    id: 'make-systems',
    n: '04',
    title: 'Make Systems',
    range: '06-10',
    theme: 'Loops, functions, arrays, objects, and modes that let a sketch become a system.',
    needs: ['Five-lesson arc', 'Code pattern callouts', 'Reusable component examples', 'State and data diagrams'],
  },
  {
    id: 'data-as-material',
    n: '05',
    title: 'Data as Material',
    range: '11-16',
    theme: 'Images, pixels, binary color, compression, histograms, and datasets as drawing material.',
    needs: ['Image/data artifacts', 'Pixel inspection UI', 'Dataset preview', 'AP CSP data alignment'],
  },
  {
    id: 'computing-in-the-world',
    n: '06',
    title: 'Computing in the World',
    range: '17-20',
    theme: 'Bias, accessibility, authorship, and energy as visible consequences of computation.',
    needs: ['Discussion prompts', 'Ethics framing', 'Before/after comparisons', 'Teacher facilitation notes'],
  },
  {
    id: 'algorithms',
    n: '07',
    title: 'Algorithms',
    range: '21-22',
    theme: 'Recursion, dynamic lists, particles, and advanced ideas made visual.',
    needs: ['Recursion stack visual', 'ArrayList add/remove demo', 'AP CSA alignment', 'Advanced extension prompts'],
  },
];

const concepts = [
  ['01', 'coordinates', 'Coordinates', 'pixels, x/y, origin', 'start-with-the-canvas', ['Coordinate grid', 'x/y plotter', 'Origin and canvas size callouts', 'Misconception note: y increases downward']],
  ['02', 'shapes-and-color', 'Shapes & Color', 'fill, stroke, palette', 'start-with-the-canvas', ['Shape primitive gallery', 'fill/stroke controls', 'RGB/HSB palette notes', 'First composition challenge']],
  ['03', 'draw-loop-time', 'Draw Loop / Time', 'setup, draw, frameCount', 'make-it-move', ['setup vs draw diagram', 'Frame counter demo', 'Play/pause/reset controls', 'Animation debugging notes']],
  ['04', 'mouse-input', 'Mouse Input', 'mouseX, mousePressed', 'make-it-respond', ['Live pointer panel', 'Click and drag events', 'Coordinate readout', 'Interaction mini challenges']],
  ['05', 'conditionals', 'Conditionals', 'if / else / boolean', 'make-it-respond', ['Boolean expression cards', 'if/else branching visual', 'Mouse-zone demo', 'Truth table checkpoint']],
  ['06', 'for-loops-and-grids', 'For Loops & Grids', 'i, nesting, patterns', 'make-systems', ['Loop stepper', 'Grid canvas demo', 'Nested loop explanation', 'Try changing rows, columns, spacing']],
  ['07', 'functions', 'Functions', 'parameters, return', 'make-systems', ['Reusable drawing command', 'Parameter sliders', 'Function call trace', 'Refactor a repeated sketch']],
  ['08', 'arrays', 'Arrays', 'lists, index, loops', 'make-systems', ['Index visualizer', 'Array traversal animation', 'Multiple values on canvas', 'Off-by-one debugging notes']],
  ['09', 'objects', 'Objects', 'data + behavior', 'make-systems', ['Object property card', 'Behavior method mapping', 'Many instances demo', 'Class/object bridge for Java']],
  ['10', 'state-machines', 'State Machines', 'modes, screens', 'make-systems', ['Mode diagram', 'Screen switcher', 'State variable callout', 'Game/menu example']],
  ['11', 'pixels-image-data', 'Pixels / Image Data', 'pictures as numbers', 'data-as-material', ['Pixel magnifier', 'Image grid model', 'get/set pixel comparison', '2D array bridge']],
  ['12', 'color-is-24-bits', 'Color is 24 Bits', 'RGB and binary', 'data-as-material', ['RGB channel sliders', '0-255 number line', 'Binary channel cards', 'Color depth reflection']],
  ['13', 'binary-as-pixels', 'Binary as Pixels', 'bits to bitmap', 'data-as-material', ['Bit grid editor', 'Decode/encode panel', 'Black-white bitmap output', 'Compression setup']],
  ['14', 'compression-by-drawing', 'Compression by Drawing', 'RLE, lossless, lossy', 'data-as-material', ['Run-length encoding demo', 'Original vs compressed view', 'Lossy tradeoff prompt', 'File-size estimate']],
  ['15', 'histograms-and-sampling', 'Histograms & Sampling', 'extract info', 'data-as-material', ['Histogram display', 'Sample-size control', 'Image/data summary', 'Bias from sampling note']],
  ['16', 'data-as-material', 'Data as Material', 'CSV, JSON, drawing', 'data-as-material', ['Dataset preview', 'Map values to marks', 'CSV/JSON code paths', 'Data-story prompt']],
  ['17', 'bias-in-a-filter', 'Bias in a Filter', 'visible failure', 'computing-in-the-world', ['Failure-case gallery', 'Filter before/after', 'Bias discussion prompt', 'Mitigation reflection']],
  ['18', 'color-and-accessibility', 'Color & Accessibility', 'palette, contrast, simulate', 'computing-in-the-world', ['Contrast checker', 'Color-vision simulator', 'Accessible palette builder', 'WCAG teacher note']],
  ['19', 'whose-authorship', 'Whose Authorship?', 'human vs algorithm', 'computing-in-the-world', ['Choice audit', 'Generative sketch example', 'Reflection questions', 'Attribution checklist']],
  ['20', 'energy-of-a-sketch', 'Energy of a Sketch', 'compute and sustainability', 'computing-in-the-world', ['FPS/work meter', 'Loop cost comparison', 'Pixel operation count', 'Sustainable coding prompt']],
  ['21', 'recursion-as-fractals', 'Recursion as Fractals', 'base case, recursive case', 'algorithms', ['Fractal depth slider', 'Base-case highlight', 'Call stack trace', 'AP CSA recursion checkpoint']],
  ['22', 'arraylist-in-action', 'ArrayList in Action', 'dynamic lists, particles', 'algorithms', ['Particle list demo', 'Add/remove controls', 'Array vs ArrayList comparison', 'FRQ-style practice']],
];

const languages = [
  ['p5js', 'p5.js', 'Friendly JavaScript wrapper for fast visual sketches in the browser.', ['No-install starter', 'Core functions reference', 'Browser editor workflow', 'Beginner route through the 22 lessons']],
  ['canvas-api', 'Canvas API', 'The raw web platform layer underneath p5, useful for web developers and fundamentals.', ['Canvas/context setup', 'Equivalent code to p5', 'Rendering loop pattern', 'When raw Canvas is the right choice']],
  ['processing-java', 'Processing Java', 'The Java-centered track for AP CS A classrooms using the Processing IDE.', ['IDE setup', 'Read-and-copy lesson flow', 'Java syntax notes', 'AP CSA unit alignment']],
  ['hello-canvas', 'Hello Canvas', 'A tiny first sketch shown side by side in all three languages.', ['One circle example', 'Copy buttons', 'What changed annotations', 'Next-step chooser']],
  ['setup', 'Setup Guides', 'Install, browser, and classroom setup support for every track.', ['Browser requirements', 'Processing install', 'Troubleshooting', 'Starter files']],
];

const teacherPages = [
  ['index', 'Teacher Overview', 'The teacher front door for using CS Canvas in classrooms.', ['Course fit', 'What materials exist', 'AP CSP and AP CSA entry points', 'Download/resource CTA']],
  ['curriculum-guide', 'Curriculum Guide', 'Scope, sequence, learning objectives, and the 7-section arc.', ['22 lesson map', 'Objectives by lesson', 'Prerequisites', 'Suggested order']],
  ['lesson-plan-template', 'Lesson Plan Template', 'The repeatable structure for a CS Canvas class session.', ['Warm-up', 'Demo', 'Student task', 'Checkpoint and extension']],
  ['pacing-guides', 'Pacing Guides', 'Multiple ways to schedule the curriculum.', ['6-week option', 'Semester option', '24-week AP CSP option', 'Full-year AP CSA option']],
  ['ap-csp', 'AP CS Principles Coverage', 'Detailed map to AP CSP Big Ideas and practices.', ['AAP/DAT/IOC/CRD map', 'CSN gap note', 'Create PT support links', 'Teacher caveats']],
  ['ap-csa', 'AP CS A Coverage', 'Detailed map to all ten AP CSA units through Processing Java.', ['Units 1-10 map', 'FRQ type map', 'Processing Java notes', 'Exam-prep stretch']],
  ['create-performance-task', 'Create Performance Task Support', 'Milestones, rubric alignment, and project scaffolds.', ['Idea bank', 'Milestone plan', 'Rubric language', 'Portfolio evidence']],
  ['frq-practice', 'FRQ Practice', 'AP CSA free-response recipes connected to visual lessons.', ['Method FRQ', 'Class design FRQ', 'Array/ArrayList FRQ', '2D array FRQ']],
  ['assessment-rubrics', 'Assessment & Rubrics', 'Reproduce, modify, extend rubrics plus checkpoint ideas.', ['Rubric table', 'Answer key policy', 'Portfolio grading', 'Feedback language']],
  ['portfolio-template', 'Student Portfolio Template', 'A student-facing structure for saving evidence of learning.', ['Screenshot slots', 'Code excerpt slots', 'Reflection prompts', 'Share/export guidance']],
  ['companion-resources', 'Companion Resources', 'Recommended add-ons, especially for AP CSP networks/CSN.', ['Internet unit links', 'Accessibility references', 'Data ethics readings', 'Teacher substitutions']],
];

const bridges = [
  ['modulo-bridge', 'Modulo Bridge', 'Counting in cycles for wrapping, patterns, and every-nth behavior.', ['Cycle visual', 'Pattern examples', 'Related lessons', 'Short code snippets']],
  ['pattern-logic', 'Pattern Logic', 'How repetition, conditions, symmetry, and variation create visual systems.', ['Recipe gallery', 'Grid variations', 'Rule cards', 'Extension prompts']],
  ['arrays-one-thing-to-many-things', 'Arrays: One Thing to Many Things', 'The conceptual bridge from one variable to lists of values.', ['Memory/index model', 'Single-to-many comparison', 'Loop traversal', 'ArrayList connection']],
];

const tools = [
  ['index', 'Workshop Tools', 'Interactive helpers, studios, and explainers grouped by concept.', ['Tool cards', 'Related concept links', 'Teacher launch mode', 'Estimated use time']],
  ['for-loop-stepper', 'For Loop Stepper', 'Step through initialization, condition, body, and increment.', ['Step controls', 'Grid output', 'Variable readout', 'Reset/share/copy']],
  ['sketch-playground', 'Sketch Playground', 'A live canvas and code surface for remixing examples.', ['Code editor area', 'Canvas preview', 'Console/errors', 'Fork/copy/export']],
  ['share-export', 'Share & Export Flow', 'Save an image, copy a sketch, or prepare a classroom-safe link.', ['Copy link', 'Download code', 'Export image', 'Sharing notes']],
];

const corePages = [
  ['about/index.html', 'About CS Canvas', 'Why canvas-based creative coding is a powerful way to learn computer science.', ['Project philosophy', 'Audience', 'Language philosophy', 'Credits and contribution links']],
  ['cc-fest/index.html', 'Born From CC Fest', 'The origin story and workshop lineage behind the curriculum.', ['Origin story', 'Community context', 'Student/workshop artifacts', 'How the project grew']],
  ['start/index.html', 'Start Here', 'A chooser for new coders, JavaScript learners, teachers, AP CSA students, and artists.', ['Learner-type picker', 'Recommended first path', 'Language choice', 'Begin at lesson 01']],
  ['search/index.html', 'Search Results', 'A search surface that groups concepts, tools, bridges, and teacher resources.', ['Search box', 'Grouped results', 'Filter chips', 'No-results state']],
  ['404.html', 'Page Not Found', 'A friendly recovery page.', ['Search link', 'Browse link', 'Nearby concept suggestions', 'Home link']],
];

const nav = [
  ['Home', '/'],
  ['Concepts', '/concepts/'],
  ['Sections', '/sections/'],
  ['Languages', '/languages/'],
  ['Browse', '/browse/'],
  ['Teachers', '/teachers/'],
  ['About', '/about/'],
];

function pageUrl(path) {
  if (path === 'index.html') return '/';
  return '/' + path.replace(/index\.html$/, '');
}

function relPrefix(path) {
  const dir = dirname(path);
  if (dir === '.') return '.';
  return relative(dir, '.') || '.';
}

function htmlEscape(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function chips(items) {
  return items.map((item) => `<span class="chip">${htmlEscape(item)}</span>`).join('');
}

function miniCanvas(kind = 'grid') {
  const guts = {
    grid: '<circle cx="36" cy="34" r="5"/><circle cx="72" cy="34" r="8"/><circle cx="108" cy="34" r="5"/><circle cx="144" cy="34" r="8"/><circle cx="36" cy="72" r="8"/><circle cx="72" cy="72" r="5"/><circle cx="108" cy="72" r="8"/><circle cx="144" cy="72" r="5"/>',
    wave: '<path d="M8 72 C36 24 62 24 90 72 S144 120 172 72" fill="none" stroke="currentColor" stroke-width="4"/>',
    circle: '<circle cx="90" cy="66" r="38" fill="none" stroke="currentColor" stroke-width="4"/><circle cx="90" cy="66" r="8" class="accent-fill"/>',
    pixels: '<rect x="20" y="20" width="24" height="24"/><rect x="44" y="20" width="24" height="24" opacity=".35"/><rect x="68" y="20" width="24" height="24"/><rect x="20" y="44" width="24" height="24" opacity=".35"/><rect x="44" y="44" width="24" height="24"/><rect x="68" y="44" width="24" height="24" opacity=".35"/>',
  }[kind] ?? '';
  return `<div class="mini-canvas" aria-hidden="true"><svg viewBox="0 0 180 132">${guts}</svg></div>`;
}

function shell({ path, title, kicker = 'CS Canvas', description, body, active = '' }) {
  const prefix = relPrefix(path);
  const navHtml = nav.map(([label, href]) => {
    const isActive = active === label.toLowerCase();
    return `<a class="${isActive ? 'active' : ''}" href="${prefix}${href === '/' ? '/index.html' : `${href}index.html`}">${label}</a>`;
  }).join('');
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${htmlEscape(title)} - CS Canvas</title>
  <meta name="description" content="${htmlEscape(description)}" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Caveat:wght@600;700&family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="${prefix}/assets/styles.css" />
</head>
<body data-page="${htmlEscape(active)}">
  <header class="site-header">
    <a class="brand" href="${prefix}/index.html">CS Canvas</a>
    <nav>${navHtml}</nav>
  </header>
  <main>
    <section class="hero">
      <p class="kicker">${htmlEscape(kicker)}</p>
      <h1>${htmlEscape(title)}</h1>
      <p class="lede">${htmlEscape(description)}</p>
    </section>
    ${body}
  </main>
  <footer class="site-footer">
    <span>CS Canvas - learn computer science by seeing code act on a canvas.</span>
    <span>p5.js - Canvas API - Processing Java</span>
  </footer>
  <script src="${prefix}/assets/site.js"></script>
</body>
</html>
`;
}

function write(path, html) {
  const full = join(outDir, path);
  mkdirSync(dirname(full), { recursive: true });
  writeFileSync(full, html);
}

function writeIfMissing(path, html) {
  const full = join(outDir, path);
  if (existsSync(full)) return;
  write(path, html);
}

function cardGrid(items) {
  return `<section class="band"><div class="grid cards">${items.join('')}</div></section>`;
}

function checklist(items) {
  return `<ul class="checklist">${items.map((item) => `<li>${htmlEscape(item)}</li>`).join('')}</ul>`;
}

function pageCard(title, href, text, meta = '') {
  const finalHref = href.endsWith('/') ? `${href}index.html` : href;
  return `<a class="card" href="${finalHref}">
    <span class="meta">${htmlEscape(meta)}</span>
    <h2>${htmlEscape(title)}</h2>
    <p>${htmlEscape(text)}</p>
  </a>`;
}

function sectionFor(id) {
  return sections.find((section) => section.id === id);
}

function writeHome() {
  const body = `
    <section class="band split">
      <div>
        <h2>Seven movements. Twenty-two ideas.</h2>
        <p>These pages turn the Claude wireframes into a navigable HTML scaffold. Every missing page now has a home, a purpose, and a checklist for the content/design it still needs.</p>
        <div class="actions">
          <a class="button primary" href="./start/index.html">Start here</a>
          <a class="button" href="./concepts/index.html">Browse concepts</a>
        </div>
      </div>
      ${miniCanvas('grid')}
    </section>
    ${cardGrid([
      pageCard('Concepts', './concepts/', 'All 22 concept pages, grouped by movement.', 'curriculum'),
      pageCard('Sections', './sections/', 'The seven movement pages that hold the lesson arc.', 'structure'),
      pageCard('Languages', './languages/', 'p5.js, raw Canvas API, and Processing Java paths.', 'tracks'),
      pageCard('Teachers', './teachers/', 'AP coverage, pacing, rubrics, FRQ, and portfolio resources.', 'classroom'),
    ])}
  `;
  writeIfMissing('index.html', shell({ path: 'index.html', title: 'Coding the Canvas', kicker: 'visual CS atlas', description: 'A hands-on CS curriculum where students learn programming by making images, animations, interactions, and data-driven sketches.', body, active: 'home' }));
}

function writeConceptIndex() {
  const cards = concepts.map(([n, slug, title, sub, section]) => pageCard(`${n} - ${title}`, `./${slug}/`, sub, sectionFor(section).title));
  const body = `${cardGrid(cards)}<section class="band"><h2>Concept page requirements</h2>${checklist(['Canvas-first explanation', 'p5.js, Canvas API, and Processing Java code panes', 'Try-this prompt', 'Debugging notes', 'Teacher notes and AP mapping', 'Related concepts and bridges'])}</section>`;
  writeIfMissing('concepts/index.html', shell({ path: 'concepts/index.html', title: 'Concepts', kicker: '22 lessons', description: 'The full concept sequence from first coordinates to ArrayList-driven particle systems.', body, active: 'concepts' }));
}

function writeConceptPages() {
  for (const [n, slug, title, sub, sectionId, needs] of concepts) {
    const sec = sectionFor(sectionId);
    const related = concepts.filter((c) => c[4] === sectionId && c[1] !== slug).slice(0, 3);
    const body = `
      <section class="band split">
        <div>
          <p class="meta">Concept ${n} / 22 - ${htmlEscape(sec.title)}</p>
          <h2>What this page needs</h2>
          ${checklist(needs)}
        </div>
        ${miniCanvas(n < '11' ? 'grid' : n < '17' ? 'pixels' : n < '21' ? 'circle' : 'wave')}
      </section>
      <section class="band columns">
        <article><h2>Canvas idea</h2><p>${htmlEscape(sub)}. Lead with a visual demo, then name the CS idea only after students can see it.</p></article>
        <article><h2>Code panes</h2><p>Include p5.js as the first live path, Canvas API as the under-the-hood path, and Processing Java as the AP CSA read/copy path.</p></article>
        <article><h2>Teacher layer</h2><p>Add objectives, timing, AP alignment, checkpoint rubric, and likely student misconceptions.</p></article>
      </section>
      ${cardGrid(related.map(([rn, rslug, rtitle, rsub]) => pageCard(`${rn} - ${rtitle}`, `../${rslug}/`, rsub, 'related')))}
    `;
    writeIfMissing(`concepts/${slug}/index.html`, shell({ path: `concepts/${slug}/index.html`, title, kicker: `Concept ${n}`, description: sub, body, active: 'concepts' }));
  }
}

function writeSections() {
  const body = cardGrid(sections.map((section) => pageCard(`${section.n} - ${section.title}`, `./${section.id}/`, section.theme, `Lessons ${section.range}`)));
  writeIfMissing('sections/index.html', shell({ path: 'sections/index.html', title: 'Sections', kicker: 'seven movements', description: 'The mid-level curriculum pages that group concepts into coherent arcs.', body, active: 'sections' }));
  for (const section of sections) {
    const lessonCards = concepts.filter((concept) => concept[4] === section.id)
      .map(([n, slug, title, sub]) => pageCard(`${n} - ${title}`, `../../concepts/${slug}/`, sub, 'concept'));
    const bodyDetail = `
      <section class="band split"><div><p class="meta">Lessons ${section.range}</p><h2>What this section needs</h2>${checklist(section.needs)}</div>${miniCanvas(section.n === '05' ? 'pixels' : section.n === '07' ? 'wave' : 'grid')}</section>
      <section class="band"><h2>Concepts in this movement</h2><div class="grid cards">${lessonCards.join('')}</div></section>
      <section class="band columns"><article><h2>Teacher framing</h2><p>Include prerequisites, timing, discussion moves, AP mapping, and suggested checkpoints.</p></article><article><h2>Learner framing</h2><p>Show why this movement matters before sending students into individual concepts.</p></article></section>
    `;
    writeIfMissing(`sections/${section.id}/index.html`, shell({ path: `sections/${section.id}/index.html`, title: section.title, kicker: `Section ${section.n} of 07`, description: section.theme, body: bodyDetail, active: 'sections' }));
  }
}

function writeSimpleCollection(base, title, description, items, active) {
  const indexPath = `${base}/index.html`;
  const body = cardGrid(items.map(([slug, itemTitle, itemDesc]) => pageCard(itemTitle, slug === 'index' ? './' : `./${slug}/`, itemDesc, base)));
  writeIfMissing(indexPath, shell({ path: indexPath, title, kicker: base, description, body, active }));
  for (const [slug, itemTitle, itemDesc, needs] of items) {
    if (slug === 'index') continue;
    const path = `${base}/${slug}/index.html`;
    const bodyDetail = `<section class="band split"><div><h2>What this page needs</h2>${checklist(needs)}</div>${miniCanvas(base === 'languages' ? 'circle' : base === 'bridges' ? 'wave' : 'grid')}</section>`;
    writeIfMissing(path, shell({ path, title: itemTitle, kicker: title, description: itemDesc, body: bodyDetail, active }));
  }
}

function writeBrowse() {
  const cards = concepts.map(([n, slug, title, sub, section]) => pageCard(`${n} - ${title}`, `../concepts/${slug}/`, sub, sectionFor(section).title));
  const body = `
    <section class="band filters">${chips(['all', 'Start', 'Move', 'Respond', 'Systems', 'Data', 'Impact', 'Algorithms', 'p5.js', 'Canvas API', 'Processing Java'])}</section>
    <section class="band"><div class="grid cards">${cards.join('')}</div></section>
  `;
  writeIfMissing('browse/index.html', shell({ path: 'browse/index.html', title: 'Browse Everything', kicker: 'index', description: 'A filterable atlas of concepts, sections, bridges, tools, and teacher resources.', body, active: 'browse' }));
}

function writeCorePages() {
  for (const [path, title, description, needs] of corePages) {
    const active = path.startsWith('about') ? 'about' : '';
    const body = `<section class="band split"><div><h2>What this page needs</h2>${checklist(needs)}</div>${miniCanvas(path.includes('search') ? 'grid' : 'circle')}</section>`;
    writeIfMissing(path, shell({ path, title, kicker: 'site page', description, body, active }));
  }
}

function writeImpactAlias() {
  const path = 'sections/impact/index.html';
  const body = `
    <section class="band split">
      <div>
        <h2>Impact is the short name for Computing in the World.</h2>
        <p>This alias keeps the shorter section URL available while the full section page carries the curriculum title and lesson details.</p>
        <div class="actions">
          <a class="button primary" href="../computing-in-the-world/index.html">Open Computing in the World</a>
          <a class="button" href="../index.html">All sections</a>
        </div>
      </div>
      ${miniCanvas('circle')}
    </section>
  `;
  write(path, shell({
    path,
    title: 'Impact',
    kicker: 'Section alias',
    description: 'Short route for the Computing in the World movement: bias, accessibility, authorship, and energy.',
    body,
    active: 'sections',
  }));
}

function writeAssets() {
  writeIfMissing('assets/styles.css', `:root{--paper:#f6f2ea;--edge:#ece5d6;--ink:#1c1a17;--soft:#4a4640;--faint:#8c857a;--accent:#d96a3d;--body:'Inter',system-ui,sans-serif;--hand:'Caveat',cursive;--mono:'JetBrains Mono',monospace}*{box-sizing:border-box}body{margin:0;background:#efe9dc;color:var(--ink);font-family:var(--body);line-height:1.5}.site-header{position:sticky;top:0;z-index:10;display:flex;align-items:center;justify-content:space-between;gap:24px;padding:14px 28px;background:rgba(246,242,234,.92);border-bottom:1.5px solid var(--ink);backdrop-filter:blur(14px)}.brand{font:700 26px/1 var(--hand);color:var(--ink);text-decoration:none}nav{display:flex;gap:16px;flex-wrap:wrap}nav a{color:var(--soft);font-size:13px;text-decoration:none;border-bottom:2px solid transparent}nav a.active,nav a:hover{color:var(--ink);border-color:var(--accent)}main{max-width:1180px;margin:0 auto}.hero{padding:64px 32px 34px}.kicker,.meta{font:600 11px/1.2 var(--mono);letter-spacing:.08em;text-transform:uppercase;color:var(--soft)}h1{max-width:820px;margin:8px 0 0;font-size:clamp(42px,7vw,84px);line-height:.96;letter-spacing:0;font-weight:800}h2{font-size:clamp(24px,3vw,38px);line-height:1.05;margin:0 0 12px}.lede{max-width:720px;font-size:20px;color:var(--soft)}.band{margin:0 32px 28px;padding:28px;border:1.5px solid var(--ink);background:var(--paper);box-shadow:3px 4px 0 var(--ink);border-radius:6px}.split{display:grid;grid-template-columns:minmax(0,1.15fr) minmax(260px,.85fr);gap:28px;align-items:center}.columns{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}.grid{display:grid;gap:16px}.cards{grid-template-columns:repeat(auto-fit,minmax(230px,1fr))}.card{display:block;min-height:170px;padding:18px;border:1.5px solid var(--ink);background:#fffdf7;color:var(--ink);text-decoration:none;border-radius:4px;box-shadow:2px 3px 0 var(--ink);transition:transform .12s,box-shadow .12s}.card:hover{transform:translateY(-2px);box-shadow:4px 5px 0 var(--accent)}.card h2{font-size:22px}.card p{color:var(--soft)}.checklist{display:grid;gap:10px;padding:0;margin:14px 0 0;list-style:none}.checklist li{padding-left:28px;position:relative}.checklist li:before{content:'';position:absolute;left:0;top:.45em;width:14px;height:14px;border:1.5px solid var(--ink);background:var(--edge);box-shadow:1px 1px 0 var(--accent)}.actions,.filters{display:flex;gap:10px;flex-wrap:wrap}.button,.chip{display:inline-flex;align-items:center;border:1.2px solid var(--ink);background:var(--paper);color:var(--ink);text-decoration:none}.button{padding:9px 14px;border-radius:999px;font-weight:700}.button.primary,.chip:first-child{background:var(--accent);border-color:var(--accent);color:#fff}.chip{padding:4px 9px;border-radius:999px;font-size:12px}.mini-canvas{min-height:260px;border:1.5px solid var(--ink);background:#fff;position:relative;overflow:hidden}.mini-canvas:after{content:'';position:absolute;inset:0;background-image:linear-gradient(rgba(28,26,23,.06) 1px,transparent 1px),linear-gradient(90deg,rgba(28,26,23,.06) 1px,transparent 1px);background-size:24px 24px}.mini-canvas svg{position:absolute;inset:0;width:100%;height:100%;padding:28px;color:var(--ink);z-index:1}.mini-canvas circle,.mini-canvas rect{fill:currentColor;opacity:.7}.accent-fill{fill:var(--accent)!important;opacity:1!important}.site-footer{display:flex;justify-content:space-between;gap:18px;margin:40px 32px 24px;padding-top:16px;border-top:1.5px solid var(--ink);color:var(--soft);font-size:12px}@media(max-width:760px){.site-header{align-items:flex-start;flex-direction:column}.hero{padding:42px 20px 24px}.band{margin-inline:20px;padding:20px}.split,.columns{grid-template-columns:1fr}.site-footer{flex-direction:column;margin-inline:20px}}`);
  writeIfMissing('assets/site.js', `(() => {
  const path = window.location.pathname.replace(/\\/index\\.html$/, '/');
  document.querySelectorAll('a[href]').forEach((link) => {
    const href = link.getAttribute('href');
    if (href === '#') link.addEventListener('click', (event) => event.preventDefault());
    const url = new URL(href, window.location.href);
    const normalized = url.pathname.replace(/\\/index\\.html$/, '/');
    if (normalized === path || (normalized !== '/' && path.startsWith(normalized))) {
      if (link.closest('nav')) link.classList.add('active');
    }
  });

  const cardBands = [...document.querySelectorAll('.cards')];
  if (!cardBands.length) return;

  const pageType = document.body.dataset.page || '';
  const shouldAddFilter = ['browse', 'concepts', 'sections', 'teachers', 'languages'].includes(pageType);
  if (!shouldAddFilter) return;

  const filterBar = document.createElement('section');
  filterBar.className = 'band';
  filterBar.innerHTML = '<label class="meta" for="page-filter">Filter this page</label><div class="actions" style="margin-top:10px"><input id="page-filter" type="search" placeholder="Type a concept, section, language, or resource" style="flex:1;min-width:240px;padding:10px 12px;border:1.5px solid var(--ink);background:#fffdf7;font:inherit"><button class="button" type="button" data-clear-filter>Clear</button></div><p class="meta" data-filter-count style="margin-top:10px"></p>';
  const hero = document.querySelector('.hero');
  hero?.insertAdjacentElement('afterend', filterBar);

  const input = filterBar.querySelector('#page-filter');
  const count = filterBar.querySelector('[data-filter-count]');
  const clear = filterBar.querySelector('[data-clear-filter]');
  const cards = [...document.querySelectorAll('.card')];

  const applyFilter = () => {
    const q = input.value.trim().toLowerCase();
    let shown = 0;
    cards.forEach((card) => {
      const match = !q || card.textContent.toLowerCase().includes(q);
      card.hidden = !match;
      if (match) shown += 1;
    });
    count.textContent = q ? \`\${shown} matching cards\` : \`\${cards.length} cards\`;
  };

  input.addEventListener('input', applyFilter);
  clear.addEventListener('click', () => {
    input.value = '';
    input.focus();
    applyFilter();
  });
  applyFilter();
})();`);
}

writeAssets();
writeHome();
writeConceptIndex();
writeConceptPages();
writeSections();
writeSimpleCollection('languages', 'Languages', 'Choose between p5.js, raw Canvas API, and Processing Java.', languages, 'languages');
writeSimpleCollection('teachers', 'Teachers', 'Planning, pacing, AP alignment, assessment, and classroom resources.', teacherPages, 'teachers');
writeSimpleCollection('bridges', 'Concept Bridges', 'Cross-cutting ideas that connect multiple lessons and tools.', bridges, '');
writeSimpleCollection('tools', 'Tools', 'Interactive studios and explainers for workshop use.', tools, '');
writeBrowse();
writeCorePages();
writeImpactAlias();

console.log('Generated CS Canvas static pages.');
