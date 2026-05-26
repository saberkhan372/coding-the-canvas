import { writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';

const root = process.cwd();
const authoredResourcePages = new Set([
  'bridges/arrays-one-thing-to-many-things/index.html',
  'bridges/modulo-bridge/index.html',
  'bridges/objects-bridge/index.html',
  'bridges/pattern-logic/index.html',
  'bridges/push-pop-bridge/index.html',
  'bridges/state-machines-bridge/index.html',
  'cc-fest/index.html',
  'tools/for-loop-stepper/index.html',
  'tools/share-export/index.html',
  'tools/sketch-playground/index.html',
]);

const navItems = [
  ['Home', 'index.html', 'home'],
  ['Concepts', 'concepts/index.html', 'concepts'],
  ['Sections', 'sections/index.html', 'sections'],
  ['Languages', 'languages/index.html', 'languages'],
  ['Tools', 'tools/index.html', 'tools'],
  ['Sketches', 'sketches/index.html', 'sketches'],
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
  const depth = dir.split('/').length;
  return Array(depth).fill('..').join('/');
}

function href(prefix, target) {
  return `${prefix}/${target}`;
}

function nav(active, prefix) {
  return `<header class="site-header">
    <a class="brand" href="${href(prefix, 'index.html')}">Coding the Canvas</a>
    <nav>${navItems.map(([label, target, key]) => `<a class="${active === key ? 'active' : ''}" href="${href(prefix, target)}">${label}</a>`).join('')}</nav>
  </header>`;
}

function miniCanvas(kind = 'grid') {
  if (kind === 'wave') {
    return `<div class="mini-canvas" aria-hidden="true"><svg viewBox="0 0 180 132"><path d="M8 72 C36 24 62 24 90 72 S144 120 172 72" fill="none" stroke="currentColor" stroke-width="4"/></svg></div>`;
  }
  if (kind === 'circle') {
    return `<div class="mini-canvas" aria-hidden="true"><svg viewBox="0 0 180 132"><circle cx="90" cy="66" r="38" fill="none" stroke="currentColor" stroke-width="4"/><circle cx="90" cy="66" r="8" class="accent-fill"/></svg></div>`;
  }
  return `<div class="mini-canvas" aria-hidden="true"><svg viewBox="0 0 180 132"><circle cx="36" cy="34" r="5"/><circle cx="72" cy="34" r="8"/><circle cx="108" cy="34" r="5"/><circle cx="144" cy="34" r="8"/><circle cx="36" cy="72" r="8"/><circle cx="72" cy="72" r="5"/><circle cx="108" cy="72" r="8"/><circle cx="144" cy="72" r="5"/></svg></div>`;
}

function shell({ filePath, active = '', title, kicker, description, body, includeHero = true }) {
  const prefix = depthPrefix(filePath);
  const hero = includeHero ? `<section class="hero">
      <p class="kicker">${esc(kicker)}</p>
      <h1>${esc(title)}</h1>
      <p class="lede">${esc(description)}</p>
    </section>` : '';
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${esc(title)} - Coding the Canvas</title>
  <meta name="description" content="${esc(description)}" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Caveat:wght@600;700&family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet" />
  <link rel="icon" href="${href(prefix, 'assets/favicon.svg')}" type="image/svg+xml" />
  <link rel="stylesheet" href="${href(prefix, 'assets/styles.css')}" />
</head>
<body data-page="${active}">
  ${nav(active, prefix)}
  <main>
    ${hero}
    ${body}
  </main>
  <footer class="site-footer">
    <span>Coding the Canvas — creative coding for all, through visible computer science.</span>
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

function detailBody({ intro, points, columns, cards, art = 'grid' }) {
  return `
    <section class="band split">
      <div>
        <h2>${esc(intro.heading)}</h2>
        <p>${esc(intro.text)}</p>
        ${points?.length ? checklist(points) : ''}
      </div>
      ${miniCanvas(art)}
    </section>
    <section class="band columns">
      ${columns.map((item) => `<article><h2>${esc(item.heading)}</h2><p>${esc(item.text)}</p></article>`).join('')}
    </section>
    ${cards?.length ? `<section class="band"><div class="grid cards">${cards.map((item) => card(item.title, item.text, item.href, item.meta)).join('')}</div></section>` : ''}
  `;
}

function writePage(filePath, config) {
  if (authoredResourcePages.has(filePath)) return;
  writeFileSync(join(root, filePath), shell({ filePath, ...config }));
}

function writeHome() {
  const body = `
    <section class="hero poster-hero">
      <div>
        <p class="kicker">creative coding for all</p>
        <h1>Coding the Canvas</h1>
        <p class="lede">A free and friendly path into computer science through images, animations, interactions, data, and remixable sketches. You do not have to be a coder to begin.</p>
        <div class="hero-labels" aria-label="Community values">
          <span class="label red">free and friendly</span>
          <span class="label green">open to remix</span>
          <span class="label blue">beginners protected</span>
        </div>
        <div class="actions">
          <a class="button primary" href="./start/index.html">Start learning</a>
          <a class="button" href="./teachers/index.html">Plan a class</a>
          <a class="button" href="./browse/index.html">Browse everything</a>
        </div>
      </div>
      <div class="poster-stack" aria-label="Workshop archive preview">
        <div class="poster-card">
          <span>poster slot</span>
          <strong>Add CC Fest Coding Camp flyer</strong>
          <div class="artifact-line" aria-hidden="true"><i></i><i></i><i></i></div>
        </div>
        <div class="poster-card">
          <span>starter sketch</span>
          <strong>Open, change, predict, remix</strong>
          <div class="artifact-line" aria-hidden="true"><i></i><i></i><i></i></div>
        </div>
        <div class="poster-card">
          <span>teacher table</span>
          <strong>Concepts, tools, prompts, reflection</strong>
          <div class="artifact-line" aria-hidden="true"><i></i><i></i><i></i></div>
        </div>
      </div>
    </section>
    <section class="band split">
      <div>
        <h2>Make computer science visible.</h2>
        <p>Coding the Canvas is a workshop table for CS: students draw, animate, listen for input, work with pixels and data, then use those sketches to understand algorithms, abstraction, impact, and Java-ready ideas.</p>
        <p>Every page tries to make the abstract visible, make the task doable, and invite someone to go further.</p>
      </div>
      ${miniCanvas('grid')}
    </section>
    <section class="band">
      <div class="care-callout">
        <p class="meta">community care</p>
        <h2>Questions count as participation. Unfinished work is welcome.</h2>
        <p>Bring a sketch, a bug, a question, or a half-formed idea. Tools are optional. People come first.</p>
      </div>
    </section>
    <section class="band">
      <p class="meta">ways in</p>
      <div class="pathway-strip">
        <article class="pathway-step"><strong>Foundation</strong><span>Run a small sketch and explain what each visible part does.</span></article>
        <article class="pathway-step"><strong>Creative exploration</strong><span>Change one thing, predict what happens, then remix with intention.</span></article>
        <article class="pathway-step"><strong>Classroom adaptation</strong><span>Turn the sketch into a prompt, demo, reflection, or assessment.</span></article>
        <article class="pathway-step"><strong>Stretch</strong><span>Build toward tools, Java structures, data stories, and open projects.</span></article>
      </div>
    </section>
    <section class="band columns">
      <article><h2>For learners</h2><p>Start with coordinates and color, then build toward animation, interaction, loops, arrays, image data, recursion, and dynamic lists.</p></article>
      <article><h2>For teachers</h2><p>Use the seven-section arc, AP CSP and AP CSA alignment, pacing guides, rubrics, and portfolio prompts to shape a workshop or course.</p></article>
      <article><h2>For makers</h2><p>Choose p5.js for a quick browser path, Canvas API for web fundamentals, or Processing Java for AP CSA and Java-centered classrooms.</p></article>
    </section>
    <section class="band"><div class="grid cards">
      ${card('Concepts', 'Follow the full 22-lesson sequence from first marks on a canvas to ArrayList-driven particle systems.', './concepts/index.html', 'curriculum')}
      ${card('Sections', 'See the seven movements that organize the course into teachable arcs.', './sections/index.html', 'path')}
      ${card('Languages', 'Compare p5.js, Canvas API, and Processing Java without changing the core ideas.', './languages/index.html', 'tracks')}
      ${card('Teachers', 'Find planning resources, AP maps, assessment support, and portfolio structures.', './teachers/index.html', 'classroom')}
    </div></section>
  `;
  writePage('index.html', {
    active: 'home',
    title: 'Coding the Canvas',
    kicker: 'creative coding for all',
    description: 'A free and friendly path into computer science through images, animations, interactions, data, and remixable sketches.',
    includeHero: false,
    body,
  });
}

const pages = [
  {
    filePath: 'start/index.html',
    active: '',
    title: 'Start Here',
    kicker: 'first step',
    description: 'Choose a path through Coding the Canvas based on your role, language, and time.',
    art: 'circle',
    intro: { heading: 'Find the right entry point.', text: 'This page helps learners, teachers, and workshop facilitators decide where to begin without having to understand the whole map first.' },
    points: ['New to coding: begin with Coordinates and Shapes & Color.', 'Teaching a class: open the curriculum guide and pacing options first.', 'Choosing tools: pick p5.js for the fastest browser start.'],
    columns: [
      { heading: 'Learners', text: 'Begin with a small visible result, then follow the numbered concepts in order.' },
      { heading: 'Teachers', text: 'Use the seven sections to group lessons into days, weeks, or units.' },
      { heading: 'Explorers', text: 'Browse by topic if you already know the idea you want to practice.' },
    ],
    cards: [
      { title: 'Lesson 01: Coordinates', text: 'Start by placing points and shapes on the canvas.', href: '../concepts/coordinates/index.html', meta: 'start' },
      { title: 'Concepts', text: 'See the full 22-lesson path.', href: '../concepts/index.html', meta: 'map' },
      { title: 'Teacher Guide', text: 'Plan the sequence for a classroom.', href: '../teachers/curriculum-guide/index.html', meta: 'teachers' },
    ],
  },
  {
    filePath: 'about/index.html',
    active: 'about',
    title: 'About Coding the Canvas',
    kicker: 'why this exists',
    description: 'Coding the Canvas teaches core computer science through visual making, classroom-ready structure, and multiple language paths.',
    art: 'circle',
    intro: { heading: 'Code should do something students can see.', text: 'The curriculum treats the canvas as a shared thinking space. Every abstraction earns its place by changing a drawing, animation, image, or interaction.' },
    points: ['Visual first, vocabulary second.', 'Creative work tied to CS fundamentals.', 'One concept sequence, several language routes.'],
    columns: [
      { heading: 'Audience', text: 'Middle school, high school, workshops, and AP-adjacent classrooms can all use the same core path with different pacing.' },
      { heading: 'Approach', text: 'Students move from concrete canvas actions to loops, arrays, objects, data, impact, recursion, and Java-ready structures.' },
      { heading: 'Tone', text: 'Lessons are meant to feel exploratory, precise, and useful without turning creativity into decoration.' },
    ],
    cards: [
      { title: 'CC Fest', text: 'Read the origin story and community frame.', href: '../cc-fest/index.html', meta: 'origin' },
      { title: 'Sections', text: 'Understand the seven-part curriculum arc.', href: '../sections/index.html', meta: 'structure' },
      { title: 'Browse', text: 'Search across the whole site.', href: '../browse/index.html', meta: 'index' },
    ],
  },
  {
    filePath: 'cc-fest/index.html',
    active: 'about',
    title: 'CC Fest Origin',
    kicker: 'community roots',
    description: 'Coding the Canvas grows from the spirit of CC Fest: creative coding, practical teaching, and shared student work.',
    art: 'circle',
    intro: { heading: 'A workshop idea with room to grow.', text: 'The project is shaped around the kind of learning that works well in a room full of curious students: quick starts, visible experiments, remixable examples, and a path toward deeper CS.' },
    points: ['Begin with a sketch everyone can change.', 'Let finished artifacts become evidence of understanding.', 'Connect playful making to serious computer science.'],
    columns: [
      { heading: 'Community', text: 'The curriculum is designed for classrooms and workshops where students learn from each other as much as from the page.' },
      { heading: 'Artifacts', text: 'Sketches, screenshots, code excerpts, and reflections become a portfolio of growth.' },
      { heading: 'Next steps', text: 'The public site gives the project a stable home for lessons, tools, and teacher resources.' },
    ],
    cards: [
      { title: 'Start Here', text: 'Choose a learning or teaching path.', href: '../start/index.html', meta: 'begin' },
      { title: 'Portfolio Template', text: 'Turn student work into reflection evidence.', href: '../teachers/portfolio-template/index.html', meta: 'classroom' },
    ],
  },
  {
    filePath: 'search/index.html',
    active: 'browse',
    title: 'Search',
    kicker: 'find a page',
    description: 'Use Browse to filter concepts, sections, tools, language tracks, bridges, and teacher resources.',
    art: 'grid',
    intro: { heading: 'Search lives in the site atlas.', text: 'The Browse page has a live filter that searches page titles, visible text, tags, AP labels, languages, and section metadata.' },
    points: ['Type a concept such as arrays, recursion, or color.', 'Click a facet such as Canvas API or AAP.', 'Use the result cards to jump directly to the page you need.'],
    columns: [
      { heading: 'Students', text: 'Search for the idea you are practicing or the language your class is using.' },
      { heading: 'Teachers', text: 'Filter by AP label, section, or resource type while planning.' },
      { heading: 'Fast recovery', text: 'If a link feels lost, Browse is the quickest way back into the map.' },
    ],
    cards: [
      { title: 'Browse Everything', text: 'Open the filterable atlas.', href: '../browse/index.html', meta: 'search' },
      { title: 'Concepts', text: 'Scan the 22-lesson sequence.', href: '../concepts/index.html', meta: 'curriculum' },
    ],
  },
  {
    filePath: '404.html',
    active: '',
    title: 'Page Not Found',
    kicker: 'lost link',
    description: 'That page is not here, but the curriculum map can get you back to the right place.',
    art: 'circle',
    intro: { heading: 'Try the map instead.', text: 'A link may have moved while the site is still growing. The main indexes are stable and should help you find the lesson, section, or teacher resource you meant to open.' },
    points: ['Browse the full atlas.', 'Return to the concept sequence.', 'Start again from the homepage.'],
    columns: [
      { heading: 'Concepts', text: 'Use the numbered lesson list if you remember the topic.' },
      { heading: 'Sections', text: 'Use the seven movements if you remember the broader unit.' },
      { heading: 'Teachers', text: 'Use the teacher index for AP, pacing, rubrics, and portfolios.' },
    ],
    cards: [
      { title: 'Home', text: 'Return to the front page.', href: './index.html', meta: 'home' },
      { title: 'Browse', text: 'Search across the site.', href: './browse/index.html', meta: 'index' },
      { title: 'Concepts', text: 'Open the lesson sequence.', href: './concepts/index.html', meta: 'lessons' },
    ],
  },
];

const detailPages = [
  ['languages/p5js/index.html', 'languages', 'p5.js', 'language track', 'A friendly JavaScript path for making visual sketches quickly in the browser.', 'circle', 'Start fast in the browser.', ['Use setup() and draw() to see code change a canvas immediately.', 'Remix examples without installing software.', 'Use this as the default beginner route through the 22 concepts.']],
  ['languages/canvas-api/index.html', 'languages', 'Canvas API', 'language track', 'The raw browser canvas layer for learners who want to understand what p5.js is simplifying.', 'circle', 'Learn the web platform directly.', ['Create a canvas element, get a 2D context, and draw with native browser calls.', 'Compare each idea with its p5.js version.', 'Use requestAnimationFrame when sketches need motion.']],
  ['languages/processing-java/index.html', 'languages', 'Processing Java', 'language track', 'The Java-centered route for AP CS A classes using visual sketches as a bridge to objects, arrays, and ArrayList.', 'circle', 'Use visuals to make Java concrete.', ['Run sketches in the Processing IDE.', 'Read p5-style ideas through Java syntax.', 'Connect classes, arrays, loops, and ArrayList to visible behavior.']],
  ['languages/hello-canvas/index.html', 'languages', 'Hello Canvas', 'first sketch', 'A tiny first drawing shown across the project language tracks.', 'circle', 'Make one visible mark.', ['Draw a circle or rectangle.', 'Change its position, size, and color.', 'Use the differences between languages as a gentle syntax tour.']],
  ['languages/setup/index.html', 'languages', 'Setup Guides', 'classroom setup', 'Prepare browsers, editors, Processing, and classroom routines before students begin sketching.', 'circle', 'Get the room ready.', ['Use p5.js when installation time is limited.', 'Install Processing for Java-centered classrooms.', 'Keep starter files and troubleshooting notes close by.']],
  ['bridges/arrays-one-thing-to-many-things/index.html', '', 'Arrays: One Thing to Many Things', 'concept bridge', 'A bridge from single variables to indexed collections of related values.', 'wave', 'Move from one object to a collection.', ['Compare one ball with a list of balls.', 'Use indexes to name positions in memory.', 'Loop through the list to update and draw each item.']],
  ['bridges/modulo-bridge/index.html', '', 'Modulo Bridge', 'concept bridge', 'A visual bridge for cycles, wrapping, repeated patterns, and clock-like logic.', 'wave', 'Use remainders to make patterns loop.', ['Wrap positions back onto a canvas.', 'Alternate colors or shapes by index.', 'Build repeating rhythms without long condition chains.']],
  ['bridges/pattern-logic/index.html', '', 'Pattern Logic', 'concept bridge', 'A bridge for turning visual rules into loops, conditionals, and reusable drawing recipes.', 'wave', 'Turn a pattern into a rule.', ['Name the rule you can see.', 'Translate that rule into loop variables and conditions.', 'Remix the rule by changing spacing, color, or repetition.']],
  ['bridges/objects-bridge/index.html', '', 'Objects: Bundling Data and Behavior', 'concept bridge', 'A bridge from parallel arrays to classes that bundle data and behavior.', 'wave', 'Bundle related values into one thing.', ['Feel the parallel-array pain first.', 'Move fields into a constructor.', 'Add update() and show() methods.']],
  ['bridges/push-pop-bridge/index.html', '', 'World Coordinates: push() and pop()', 'concept bridge', 'A bridge for saving and restoring canvas state when using translate(), rotate(), fill(), and stroke().', 'wave', 'Keep transforms from leaking.', ['Move the world with translate().', 'Save and restore drawing state.', 'Wrap object drawing code in push() and pop().']],
  ['bridges/state-machines-bridge/index.html', '', 'State Machines: Screens, Modes, and Transitions', 'concept bridge', 'A bridge from booleans and conditionals to mode-based sketches with clear transitions.', 'wave', 'Use one variable to name the current mode.', ['List screens before coding.', 'Draw transition arrows.', 'Render one state at a time.']],
  ['tools/for-loop-stepper/index.html', '', 'For Loop Stepper', 'tool', 'A classroom tool concept for slowing a for loop down until every part is visible.', 'grid', 'Watch the loop think.', ['Track initialization, condition, body, and increment.', 'Connect each value of i to a visible grid position.', 'Use mistakes as debugging prompts.']],
  ['tools/sketch-playground/index.html', '', 'Sketch Playground', 'tool', 'A space for remixing examples, testing small changes, and seeing code affect the canvas.', 'grid', 'Experiment without ceremony.', ['Change one value and rerun.', 'Keep working examples small enough to understand.', 'Use the canvas result as immediate feedback.']],
  ['tools/share-export/index.html', '', 'Share & Export Flow', 'tool', 'Guidance for saving images, copying code, and preparing classroom-safe ways to share sketches.', 'grid', 'Save the evidence of learning.', ['Export a screenshot or finished image.', 'Copy the code that produced it.', 'Add a short reflection about what changed and why.']],
  ['teachers/curriculum-guide/index.html', 'teachers', 'Curriculum Guide', 'teacher resource', 'A teacher-facing overview of the 22 concepts, seven sections, prerequisites, and suggested sequence.', 'grid', 'Plan the whole arc.', ['Use sections as units.', 'Use concepts as lessons or stations.', 'Adjust pacing without losing the conceptual order.']],
  ['teachers/lesson-plan-template/index.html', 'teachers', 'Lesson Plan Template', 'teacher resource', 'A repeatable class-session structure for demo, practice, remix, checkpoint, and reflection.', 'grid', 'Give each lesson a reliable rhythm.', ['Start with a visible demo.', 'Let students make one controlled change.', 'End with a checkpoint students can explain.']],
  ['teachers/pacing-guides/index.html', 'teachers', 'Pacing Guides', 'teacher resource', 'Ways to schedule Coding the Canvas as a short workshop, semester unit, AP CSP support path, or AP CSA bridge.', 'grid', 'Choose the right calendar.', ['Short workshops should favor p5.js and visible wins.', 'Semester plans can cover all seven sections.', 'AP courses can use selected lessons for targeted support.']],
  ['teachers/ap-csp/index.html', 'teachers', 'AP CS Principles Coverage', 'teacher resource', 'A map from Coding the Canvas lessons to AP CSP big ideas, practices, and Create performance task support.', 'grid', 'Connect creative sketches to AP CSP.', ['Use visual projects for CRD and AAP evidence.', 'Use data and image lessons for DAT.', 'Use impact lessons for IOC discussion and writing.']],
  ['teachers/ap-csa/index.html', 'teachers', 'AP CS A Coverage', 'teacher resource', 'A Processing Java path that connects visual lessons to AP CSA units, FRQ habits, classes, arrays, and ArrayList.', 'grid', 'Make Java visible.', ['Use sketches to motivate methods and objects.', 'Practice loops, arrays, and ArrayList through visual state.', 'Connect student sketches to FRQ-style reasoning.']],
  ['teachers/create-performance-task/index.html', 'teachers', 'Create Performance Task Support', 'teacher resource', 'Milestones and project guidance for turning a canvas sketch into a purposeful AP CSP Create-style project.', 'grid', 'Help students build with intention.', ['Start from a simple visual idea.', 'Add input, data, or abstraction deliberately.', 'Collect code excerpts and reflection notes along the way.']],
  ['teachers/frq-practice/index.html', 'teachers', 'FRQ Practice', 'teacher resource', 'AP CSA free-response practice ideas connected to visual lessons and Processing Java sketches.', 'grid', 'Practice FRQ thinking with visible state.', ['Write methods that draw or update objects.', 'Trace loops and list changes through canvas output.', 'Use small classes before larger FRQ prompts.']],
  ['teachers/assessment-rubrics/index.html', 'teachers', 'Assessment & Rubrics', 'teacher resource', 'Rubric language and checkpoint ideas for assessing code, process, creativity, explanation, and revision.', 'grid', 'Assess what students can explain and improve.', ['Look for working code and intentional choices.', 'Use screenshots and code excerpts as evidence.', 'Reward debugging notes and thoughtful iteration.']],
  ['teachers/portfolio-template/index.html', 'teachers', 'Student Portfolio Template', 'teacher resource', 'A structure for students to save sketches, code excerpts, screenshots, reflections, and next steps.', 'grid', 'Make learning visible over time.', ['Save one artifact per major concept.', 'Pair each image with the code that matters.', 'Ask students to explain one decision or bug fix.']],
  ['teachers/companion-resources/index.html', 'teachers', 'Companion Resources', 'teacher resource', 'Suggested companion topics and substitutions for networks, accessibility, data ethics, and broader computing context.', 'grid', 'Round out the course.', ['Add readings or unplugged work when a topic needs more context.', 'Use impact lessons for discussion and reflection.', 'Pair outside resources with a canvas-based artifact.']],
];

for (const [filePath, active, title, kicker, description, art, heading, points] of detailPages) {
  writePage(filePath, {
    active,
    title,
    kicker,
    description,
    body: detailBody({
      art,
      intro: { heading, text: description },
      points,
      columns: [
        { heading: 'Use it for', text: points[0] },
        { heading: 'Try next', text: points[1] },
        { heading: 'Connect it', text: points[2] },
      ],
      cards: [
        { title: 'Concepts', text: 'Return to the numbered lesson sequence.', href: filePath.split('/').length === 3 ? '../../concepts/index.html' : '../concepts/index.html', meta: 'lessons' },
        { title: 'Browse', text: 'Search the full site atlas.', href: filePath.split('/').length === 3 ? '../../browse/index.html' : '../browse/index.html', meta: 'index' },
      ],
    }),
  });
}

for (const page of pages) {
  writePage(page.filePath, {
    active: page.active,
    title: page.title,
    kicker: page.kicker,
    description: page.description,
    body: detailBody(page),
  });
}

writeHome();
console.log('Updated public-facing copy.');
