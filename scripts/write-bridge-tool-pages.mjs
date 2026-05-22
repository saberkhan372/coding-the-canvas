import { writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';

const root = process.cwd();

const navItems = [
  ['Home', 'index.html', 'home'],
  ['Concepts', 'concepts/index.html', 'concepts'],
  ['Sections', 'sections/index.html', 'sections'],
  ['Languages', 'languages/index.html', 'languages'],
  ['Browse', 'browse/index.html', 'browse'],
  ['Teachers', 'teachers/index.html', 'teachers'],
  ['About', 'about/index.html', 'about'],
];

function esc(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function depthPrefix(filePath) {
  const dir = dirname(filePath);
  if (dir === '.') return '.';
  return Array(dir.split('/').length).fill('..').join('/');
}

function href(prefix, target) {
  return `${prefix}/${target}`;
}

function nav(active, prefix) {
  return `<header class="site-header">
    <a class="brand" href="${href(prefix, 'index.html')}">CS Canvas</a>
    <nav>${navItems.map(([label, target, key]) => `<a class="${active === key ? 'active' : ''}" href="${href(prefix, target)}">${label}</a>`).join('')}</nav>
  </header>`;
}

function shell({ filePath, active = '', title, kicker, description, body }) {
  const prefix = depthPrefix(filePath);
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${esc(title)} - CS Canvas</title>
  <meta name="description" content="${esc(description)}" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Caveat:wght@600;700&family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="${href(prefix, 'assets/styles.css')}" />
  <link rel="stylesheet" href="${href(prefix, 'assets/resource-pages.css')}" />
</head>
<body data-page="${active}">
  ${nav(active, prefix)}
  <main>
    <section class="hero">
      <p class="kicker">${esc(kicker)}</p>
      <h1>${esc(title)}</h1>
      <p class="lede">${esc(description)}</p>
    </section>
    ${body}
  </main>
  <footer class="site-footer">
    <span>CS Canvas — learn computer science by seeing code act on a canvas.</span>
    <span>p5.js · Canvas API · Processing Java</span>
  </footer>
  <script src="${href(prefix, 'assets/site.js')}"></script>
</body>
</html>
`;
}

function card(title, text, hrefValue, meta = 'open') {
  return `<a class="card" href="${hrefValue}">
    <span class="meta">${esc(meta)}</span>
    <h2>${esc(title)}</h2>
    <p>${esc(text)}</p>
  </a>`;
}

function checklist(items) {
  return `<ul class="checklist">${items.map((item) => `<li>${esc(item)}</li>`).join('')}</ul>`;
}

function codeBlock(label, code) {
  return `<div class="code-sample"><span class="meta">${esc(label)}</span><pre>${esc(code)}</pre></div>`;
}

function waveArt() {
  return `<div class="mini-canvas" aria-hidden="true"><svg viewBox="0 0 180 132">
    <path d="M10 72 C34 28 62 28 90 72 S146 116 170 72" fill="none" stroke="currentColor" stroke-width="4"/>
    <circle cx="38" cy="48" r="7" class="accent-fill"/><circle cx="90" cy="72" r="7"/><circle cx="142" cy="96" r="7" class="accent-fill"/>
  </svg></div>`;
}

function gridArt() {
  return `<div class="mini-canvas" aria-hidden="true"><svg viewBox="0 0 180 132">
    ${[0, 1, 2, 3].map((r) => [0, 1, 2, 3, 4].map((c) => `<circle cx="${34 + c * 28}" cy="${28 + r * 24}" r="${(r + c) % 2 ? 5 : 8}" ${c === r ? 'class="accent-fill"' : ''}/>`).join('')).join('')}
  </svg></div>`;
}

function bridgeBody(page) {
  return `
    <section class="band split">
      <div>
        <h2>${esc(page.mainHeading)}</h2>
        <p>${esc(page.mainText)}</p>
        ${checklist(page.checklist)}
      </div>
      ${waveArt()}
    </section>
    <section class="band">
      <p class="meta">Bridge moves</p>
      <div class="bridge-map">${page.moves.map((move) => `<div class="bridge-step"><div><h2>${esc(move.title)}</h2><p>${esc(move.text)}</p></div></div>`).join('')}</div>
    </section>
    <section class="band columns">
      ${page.columns.map((item) => `<article class="resource-panel"><h2>${esc(item.title)}</h2><p>${esc(item.text)}</p></article>`).join('')}
    </section>
    <section class="band">${codeBlock(page.codeLabel, page.code)}</section>
    <section class="band"><div class="grid cards">${page.cards.map((item) => card(item.title, item.text, item.href, item.meta)).join('')}</div></section>
  `;
}

function toolMock(kind) {
  if (kind === 'loop') {
    return `<div class="mock-tool"><div class="mock-tool-pane"><p class="meta">Loop state</p><h2>i = 3</h2><p>condition true: draw dot at column 3, then increment.</p><div class="token-row"><span class="token">init</span><span class="token">test</span><span class="token">body</span><span class="token">increment</span></div></div><div class="mock-canvas"><svg viewBox="0 0 220 150">${[0,1,2,3,4,5,6,7].map((i) => `<circle cx="${24 + i * 24}" cy="76" r="8" fill="${i <= 3 ? '#d96a3d' : '#ece5d6'}" stroke="#1c1a17"/>`).join('')}</svg></div></div>`;
  }
  if (kind === 'share') {
    return `<div class="mock-tool"><div class="mock-tool-pane"><p class="meta">Export checklist</p><h2>Image + code + reflection</h2><p>A shareable artifact should show what ran, what produced it, and what the student learned.</p><div class="token-row"><span class="token">PNG</span><span class="token">code</span><span class="token">caption</span></div></div><div class="mock-canvas"><svg viewBox="0 0 220 150"><rect x="42" y="30" width="136" height="86" fill="#fffdf7" stroke="#1c1a17" stroke-width="3"/><path d="M62 94 C92 40 126 132 158 54" fill="none" stroke="#d96a3d" stroke-width="5"/><circle cx="158" cy="54" r="9" fill="#1c1a17"/></svg></div></div>`;
  }
  return `<div class="mock-tool"><div class="mock-tool-pane"><p class="meta">Playground loop</p><h2>Edit, run, notice, remix</h2><p>Keep the code small enough that students can connect each change to a visible result.</p><div class="token-row"><span class="token">code</span><span class="token">canvas</span><span class="token">console</span></div></div><div class="mock-canvas"><svg viewBox="0 0 220 150"><rect x="38" y="24" width="144" height="98" rx="4" fill="#fffdf7" stroke="#1c1a17" stroke-width="3"/><circle cx="88" cy="74" r="20" fill="#d96a3d"/><rect x="118" y="54" width="32" height="40" fill="#1c1a17"/></svg></div></div>`;
}

function toolBody(page) {
  return `
    <section class="band split">
      <div>
        <h2>${esc(page.mainHeading)}</h2>
        <p>${esc(page.mainText)}</p>
        ${checklist(page.checklist)}
      </div>
      ${gridArt()}
    </section>
    <section class="band">${toolMock(page.kind)}</section>
    <section class="band">
      <p class="meta">Classroom flow</p>
      <div class="tool-flow">${page.flow.map((step) => `<div class="tool-step"><div><h2>${esc(step.title)}</h2><p>${esc(step.text)}</p></div></div>`).join('')}</div>
    </section>
    <section class="band columns">
      ${page.columns.map((item) => `<article class="resource-panel"><h2>${esc(item.title)}</h2><p>${esc(item.text)}</p></article>`).join('')}
    </section>
    <section class="band">${codeBlock(page.codeLabel, page.code)}</section>
    <section class="band"><div class="grid cards">${page.cards.map((item) => card(item.title, item.text, item.href, item.meta)).join('')}</div></section>
  `;
}

const bridges = [
  {
    filePath: 'bridges/arrays-one-thing-to-many-things/index.html',
    title: 'Arrays: One Thing to Many Things',
    description: 'A bridge from single variables to indexed collections of related values.',
    mainHeading: 'Move from one object to a collection.',
    mainText: 'Students understand one ball before they understand fifty. This bridge makes the shift explicit: the same properties still exist, but now they live in a list and a loop visits each one.',
    checklist: ['Start with one visible object and name its properties.', 'Replace repeated variables with indexed positions.', 'Use a loop to update and draw every item.'],
    moves: [
      { title: 'One thing', text: 'Draw one circle with x, y, and speed. Ask what changes if the sketch needs ten circles.' },
      { title: 'Many values', text: 'Collect related x values in one array so index 0, 1, and 2 become visible handles.' },
      { title: 'One rule', text: 'Use a loop so every item follows the same update-and-draw rule.' },
    ],
    columns: [
      { title: 'Teacher move', text: 'Let students try x1, x2, x3 first. The awkwardness creates the need for arrays.' },
      { title: 'Common snag', text: 'Students often mix up the index and the value stored at that index. Point to both on the canvas.' },
      { title: 'AP connection', text: 'This bridge supports list traversal, parallel arrays, ArrayList, and object collections.' },
    ],
    codeLabel: 'p5.js pattern',
    code: `let xs = [40, 90, 140];
let ys = [80, 60, 100];

function draw() {
  background(246);
  for (let i = 0; i < xs.length; i++) {
    circle(xs[i], ys[i], 24);
    xs[i] += 1;
  }
}`,
    cards: [
      { title: 'Arrays', text: 'Open the full array lesson.', href: '../../concepts/arrays/index.html', meta: 'concept 08' },
      { title: 'ArrayList in Action', text: 'Continue toward dynamic Java lists.', href: '../../concepts/arraylist-in-action/index.html', meta: 'concept 22' },
      { title: 'Objects', text: 'Group each item into a data-and-behavior unit.', href: '../../concepts/objects/index.html', meta: 'concept 09' },
    ],
  },
  {
    filePath: 'bridges/modulo-bridge/index.html',
    title: 'Modulo Bridge',
    description: 'A visual bridge for cycles, wrapping, repeated patterns, and clock-like logic.',
    mainHeading: 'Use remainders to make patterns loop.',
    mainText: 'Modulo is easiest to feel when something wraps: a dot leaves the right side and returns on the left, colors repeat every third item, or a clock resets after 12.',
    checklist: ['Use % to keep values inside a range.', 'Alternate choices without long if/else chains.', 'Name the pattern before naming the operator.'],
    moves: [
      { title: 'Wrap position', text: 'Use x = (x + speed) % width so motion stays on the canvas.' },
      { title: 'Cycle style', text: 'Use i % 3 to choose a color, shape, or rhythm.' },
      { title: 'Debug the remainder', text: 'Print i and i % n side by side until the repeating sequence is visible.' },
    ],
    columns: [
      { title: 'Teacher move', text: 'Draw a number line that bends into a loop. Remainders become locations around the loop.' },
      { title: 'Common snag', text: 'Students may read % as percent. Say “remainder after division” every time at first.' },
      { title: 'AP connection', text: 'Modulo supports loop patterns, bounds logic, simulations, and algorithmic thinking.' },
    ],
    codeLabel: 'wrapping motion',
    code: `let x = 0;

function draw() {
  background(246);
  x = (x + 3) % width;
  circle(x, height / 2, 30);
}`,
    cards: [
      { title: 'Draw Loop / Time', text: 'Use modulo with frameCount and motion.', href: '../../concepts/draw-loop-time/index.html', meta: 'concept 03' },
      { title: 'For Loops & Grids', text: 'Use remainders for every-nth patterns.', href: '../../concepts/for-loops-and-grids/index.html', meta: 'concept 06' },
      { title: 'Pattern Logic', text: 'Turn cycles into visual rules.', href: '../pattern-logic/index.html', meta: 'bridge' },
    ],
  },
  {
    filePath: 'bridges/pattern-logic/index.html',
    title: 'Pattern Logic',
    description: 'A bridge for turning visual rules into loops, conditionals, and reusable drawing recipes.',
    mainHeading: 'Turn a pattern into a rule.',
    mainText: 'Pattern logic asks students to describe what they see before coding it. Once the visual rule is named, loops, conditions, and functions become tools for expressing it.',
    checklist: ['Notice repetition, alternation, symmetry, and variation.', 'Translate each visual decision into a rule.', 'Remix one rule at a time so cause and effect stay clear.'],
    moves: [
      { title: 'See it', text: 'Ask students to circle what repeats and underline what changes.' },
      { title: 'Say it', text: 'Turn the observation into a sentence: every even column is orange.' },
      { title: 'Code it', text: 'Translate the sentence with a loop variable and a condition.' },
    ],
    columns: [
      { title: 'Teacher move', text: 'Keep the first rule simple, then invite controlled remixing.' },
      { title: 'Common snag', text: 'Students often change too many variables at once. Slow the remix down.' },
      { title: 'AP connection', text: 'Pattern logic supports algorithms, abstraction, conditionals, and procedural decomposition.' },
    ],
    codeLabel: 'visual rule',
    code: `for (let col = 0; col < 8; col++) {
  if (col % 2 === 0) {
    fill(217, 106, 61);
  } else {
    fill(28);
  }
  circle(40 + col * 36, 100, 24);
}`,
    cards: [
      { title: 'For Loops & Grids', text: 'Build patterns from counters.', href: '../../concepts/for-loops-and-grids/index.html', meta: 'concept 06' },
      { title: 'Conditionals', text: 'Make a pattern choose between cases.', href: '../../concepts/conditionals/index.html', meta: 'concept 05' },
      { title: 'Functions', text: 'Name repeated drawing recipes.', href: '../../concepts/functions/index.html', meta: 'concept 07' },
    ],
  },
];

const tools = [
  {
    filePath: 'tools/sketch-playground/index.html',
    title: 'Sketch Playground',
    description: 'A classroom workflow for remixing examples, testing small changes, and seeing code affect the canvas.',
    kind: 'playground',
    mainHeading: 'Edit, run, notice, remix.',
    mainText: 'The playground is the default habit for a visual CS lesson: start from working code, make one intentional change, run it, and explain what changed on the canvas.',
    checklist: ['Keep examples short enough to scan.', 'Change one variable or line at a time.', 'Use the canvas output as the first debugging signal.'],
    flow: [
      { title: 'Start from a known-good sketch', text: 'Students should begin with code that already draws something visible.' },
      { title: 'Make one change', text: 'Change a number, color, condition, or loop bound and predict the result.' },
      { title: 'Run and explain', text: 'The canvas becomes evidence. Ask students to point to the line that caused the change.' },
    ],
    columns: [
      { title: 'Use in class', text: 'Open a concept page, copy a snippet, then run it in p5.js or CodePen from the export controls.' },
      { title: 'Debug habit', text: 'If nothing appears, check canvas size, background, fill, and whether draw/setup are running.' },
      { title: 'Portfolio habit', text: 'Save a screenshot plus the line that made the most important change.' },
    ],
    codeLabel: 'starter remix prompt',
    code: `Change exactly one thing:

1. Move the circle.
2. Change its color.
3. Add a second shape.
4. Explain which line caused the visible change.`,
    cards: [
      { title: 'Coordinates', text: 'Start with the first visible mark.', href: '../../concepts/coordinates/index.html', meta: 'concept 01' },
      { title: 'Shapes & Color', text: 'Remix color and composition.', href: '../../concepts/shapes-and-color/index.html', meta: 'concept 02' },
      { title: 'Share & Export', text: 'Save the result as evidence.', href: '../share-export/index.html', meta: 'tool' },
    ],
  },
  {
    filePath: 'tools/for-loop-stepper/index.html',
    title: 'For Loop Stepper',
    description: 'A classroom tool concept for slowing a for loop down until every part is visible.',
    kind: 'loop',
    mainHeading: 'Watch the loop think.',
    mainText: 'Students often see a loop as one mysterious block. The stepper breaks it into initialization, condition, body, and increment so each dot on the canvas matches one pass through the loop.',
    checklist: ['Track i before and after each step.', 'Show the condition result before the body runs.', 'Connect each iteration to one visible mark.'],
    flow: [
      { title: 'Initialize', text: 'Set i to the first value and show where that value will draw.' },
      { title: 'Test', text: 'Ask whether the condition is true before drawing anything.' },
      { title: 'Body and increment', text: 'Draw one mark, then update i and repeat the question.' },
    ],
    columns: [
      { title: 'Use in class', text: 'Pause after each dot and ask students to predict the next value of i.' },
      { title: 'Debug habit', text: 'Compare i < count with i <= count to expose off-by-one errors visually.' },
      { title: 'Extension', text: 'Move from one loop to nested loops once the single counter feels stable.' },
    ],
    codeLabel: 'loop to step through',
    code: `for (let i = 0; i < 8; i++) {
  let x = 40 + i * 30;
  circle(x, 100, 18);
}`,
    cards: [
      { title: 'For Loops & Grids', text: 'Open the full loop lesson.', href: '../../concepts/for-loops-and-grids/index.html', meta: 'concept 06' },
      { title: 'Modulo Bridge', text: 'Add repeating style rules.', href: '../../bridges/modulo-bridge/index.html', meta: 'bridge' },
      { title: 'Arrays', text: 'Use a loop to visit many values.', href: '../../concepts/arrays/index.html', meta: 'concept 08' },
    ],
  },
  {
    filePath: 'tools/share-export/index.html',
    title: 'Share & Export Flow',
    description: 'Guidance for saving images, copying code, and preparing classroom-safe ways to share sketches.',
    kind: 'share',
    mainHeading: 'Save the evidence of learning.',
    mainText: 'A finished sketch is more useful when it travels with the code and a short explanation. This flow turns visual work into portfolio evidence students can revisit.',
    checklist: ['Export or screenshot the canvas output.', 'Copy the code that produced the result.', 'Add a caption naming the concept and the change.'],
    flow: [
      { title: 'Capture the canvas', text: 'Save the final image or take a screenshot that shows the visible result.' },
      { title: 'Attach the code', text: 'Copy the smallest meaningful snippet, not necessarily the whole project.' },
      { title: 'Reflect briefly', text: 'Ask for one sentence: what changed, what caused it, and what was hard?' },
    ],
    columns: [
      { title: 'Use in class', text: 'End each major concept with one artifact students can submit or add to a portfolio.' },
      { title: 'Privacy habit', text: 'Use classroom-safe links and avoid publishing student names inside sketches.' },
      { title: 'Assessment', text: 'Grade the connection between image, code, and explanation rather than polish alone.' },
    ],
    codeLabel: 'portfolio caption frame',
    code: `Concept:
Visible result:
Important code line:
What I changed:
What I would try next:`,
    cards: [
      { title: 'Student Portfolio Template', text: 'Use a repeatable evidence structure.', href: '../../teachers/portfolio-template/index.html', meta: 'teachers' },
      { title: 'Assessment & Rubrics', text: 'Connect artifacts to feedback.', href: '../../teachers/assessment-rubrics/index.html', meta: 'teachers' },
      { title: 'Sketch Playground', text: 'Return to remixing.', href: '../sketch-playground/index.html', meta: 'tool' },
    ],
  },
];

function ccFestBody() {
  return `
    <section class="band split">
      <div>
        <h2>A creative coding workshop becomes a curriculum map.</h2>
        <p>CC Fest gives Coding the Canvas its shape: start with an inviting sketch, make the learning visible, and let students leave with something they can point to, explain, and keep improving.</p>
        ${checklist(['Fast starts over long setup.', 'Student artifacts over abstract worksheets.', 'Creative decisions tied to CS vocabulary.'])}
      </div>
      ${gridArt()}
    </section>
    <section class="band">
      <p class="meta">Origin arc</p>
      <div class="timeline">
        <div class="timeline-step"><div><h2>Gather</h2><p>Students and teachers meet around a canvas, not a blank terminal. The first win is visible.</p></div></div>
        <div class="timeline-step"><div><h2>Remix</h2><p>Small changes become experiments: position, color, repetition, motion, input, and data.</p></div></div>
        <div class="timeline-step"><div><h2>Name the CS</h2><p>Only after students can see the idea do lessons name coordinates, loops, arrays, algorithms, and impact.</p></div></div>
        <div class="timeline-step"><div><h2>Share</h2><p>Sketches become screenshots, code excerpts, reflections, and classroom-ready evidence.</p></div></div>
      </div>
    </section>
    <section class="band columns">
      <article class="resource-panel"><h2>For students</h2><p>The project says: your first program can be visual, personal, and still grounded in serious CS.</p></article>
      <article class="resource-panel"><h2>For teachers</h2><p>The site turns workshop energy into sequence, pacing, AP alignment, and assessment routines.</p></article>
      <article class="resource-panel"><h2>For the project</h2><p>CC Fest remains the reminder that the work should be generous, remixable, and public enough to grow.</p></article>
    </section>
    <section class="band"><div class="grid cards">
      ${card('Start Here', 'Choose a learning or teaching path.', '../start/index.html', 'begin')}
      ${card('Concepts', 'Open the full 22-lesson sequence.', '../concepts/index.html', 'curriculum')}
      ${card('Teachers', 'Plan a class or workshop.', '../teachers/index.html', 'classroom')}
    </div></section>
  `;
}

for (const page of bridges) {
  writeFileSync(join(root, page.filePath), shell({
    filePath: page.filePath,
    active: 'browse',
    title: page.title,
    kicker: 'concept bridge',
    description: page.description,
    body: bridgeBody(page),
  }));
}

for (const page of tools) {
  writeFileSync(join(root, page.filePath), shell({
    filePath: page.filePath,
    active: 'browse',
    title: page.title,
    kicker: 'classroom tool',
    description: page.description,
    body: toolBody(page),
  }));
}

writeFileSync(join(root, 'cc-fest/index.html'), shell({
  filePath: 'cc-fest/index.html',
  active: 'about',
  title: 'CC Fest Origin',
  kicker: 'community roots',
  description: 'Coding the Canvas grows from the spirit of CC Fest: creative coding, practical teaching, and shared student work.',
  body: ccFestBody(),
}));

console.log('Wrote bridge, tool, and CC Fest pages.');
