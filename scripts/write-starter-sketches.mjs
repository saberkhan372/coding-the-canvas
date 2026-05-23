import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';

const root = process.cwd();

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

const sketches = [
  {
    slug: 'visual-hello-postcard',
    title: 'Visual Hello Postcard',
    suit: 'Marks',
    concept: '01-02',
    lede: 'A first sketch that introduces a person, place, class, or community through shapes and color.',
    tags: ['coordinates', 'shapes', 'color', 'identity'],
    code: `function setup() {
  createCanvas(500, 500);
  colorMode(HSB, 360, 100, 100);
}

function draw() {
  background(35, 20, 96);
  noStroke();

  fill(18, 80, 86);
  rect(70, 300, 360, 90);

  fill(210, 70, 75);
  circle(155, 190, 110);

  fill(48, 90, 95);
  triangle(300, 135, 385, 330, 215, 330);

  fill(20);
  textSize(24);
  text("hello from my world", 92, 385);
}`,
    remix: ['Change the palette to match a mood or place.', 'Replace one shape with a symbol from your classroom or community.', 'Add a title and one sentence explaining what the sketch represents.'],
    teacher: 'Use this as the first shareable artifact. The goal is not realism; it is making a visible choice and explaining it.',
    links: [
      ['Coordinates', '../concepts/coordinates/index.html'],
      ['Shapes & Color', '../concepts/shapes-and-color/index.html'],
      ['Start with the Canvas', '../sections/start-with-the-canvas/index.html'],
    ],
  },
  {
    slug: 'bouncing-ball-starter',
    title: 'Bouncing Ball Starter',
    suit: 'Motion',
    concept: '03-05',
    lede: 'The classic first-motion sketch: one ball, two velocities, four walls, and a visible reason for conditionals.',
    tags: ['motion', 'variables', 'conditionals', 'bounce'],
    code: `let x = 80;
let y = 120;
let vx = 3;
let vy = 2;

function setup() {
  createCanvas(500, 320);
}

function draw() {
  background(246, 242, 234);
  x += vx;
  y += vy;

  if (x < 20 || x > width - 20) vx *= -1;
  if (y < 20 || y > height - 20) vy *= -1;

  fill(217, 106, 61);
  circle(x, y, 40);
}`,
    remix: ['Change speed and radius; then repair the wall checks.', 'Add a color change every time the ball bounces.', 'Add a second ball with different velocity.'],
    teacher: 'Ask students to predict which line makes the ball reverse. This is a clean entry to conditionals because the bug is visible.',
    links: [
      ['Draw Loop / Time', '../concepts/draw-loop-time/index.html'],
      ['Conditionals', '../concepts/conditionals/index.html'],
      ['Make It Move', '../sections/make-it-move/index.html'],
    ],
  },
  {
    slug: 'mouse-trail-drawing',
    title: 'Mouse Trail Drawing',
    suit: 'Motion',
    concept: '04, 08',
    lede: 'A drawing tool where the mouse leaves memory behind, turning interaction into an array-backed sketch.',
    tags: ['mouse', 'arrays', 'interaction', 'trail'],
    code: `let marks = [];

function setup() {
  createCanvas(500, 320);
}

function draw() {
  background(246, 242, 234, 35);
  marks.push({ x: mouseX, y: mouseY });

  if (marks.length > 80) {
    marks.shift();
  }

  noStroke();
  for (let i = 0; i < marks.length; i++) {
    let size = map(i, 0, marks.length, 4, 28);
    fill(217, 106, 61, 140);
    circle(marks[i].x, marks[i].y, size);
  }
}`,
    remix: ['Store color or size in each mark.', 'Draw lines between neighboring marks.', 'Only add a mark when the mouse is pressed.'],
    teacher: 'This sketch makes arrays feel like memory: the canvas remembers where the mouse has been.',
    links: [
      ['Mouse Input', '../concepts/mouse-input/index.html'],
      ['Arrays', '../concepts/arrays/index.html'],
      ['Arrays Bridge', '../bridges/arrays-one-thing-to-many-things/index.html'],
    ],
  },
  {
    slug: 'click-to-create-shapes',
    title: 'Click-to-Create Shapes',
    suit: 'Motion',
    concept: '04, 08',
    lede: 'Every click stamps a new object into an array, giving events and collections an immediate payoff.',
    tags: ['events', 'arrays', 'objects', 'stamping'],
    code: `let shapes = [];

function setup() {
  createCanvas(500, 320);
}

function draw() {
  background(246, 242, 234);
  for (let s of shapes) {
    fill(s.c);
    noStroke();
    circle(s.x, s.y, s.size);
  }
}

function mousePressed() {
  shapes.push({
    x: mouseX,
    y: mouseY,
    size: random(18, 56),
    c: color(random(255), random(160), 90)
  });
}`,
    remix: ['Make rectangles or triangles instead of circles.', 'Limit the array to the latest 20 shapes.', 'Add keyboard controls to clear or change the stamp mode.'],
    teacher: 'Compare `mousePressed()` with checking `mouseIsPressed` inside draw. One is an event; one is a state read.',
    links: [
      ['Mouse Input', '../concepts/mouse-input/index.html'],
      ['Arrays', '../concepts/arrays/index.html'],
      ['Make It Respond', '../sections/make-it-respond/index.html'],
    ],
  },
  {
    slug: 'color-from-position',
    title: 'Color From Position',
    suit: 'Motion',
    concept: '04, 12',
    lede: 'Move the mouse and watch position become color, a direct path into mapping and 24-bit RGB thinking.',
    tags: ['mouse', 'color', 'map', 'rgb'],
    code: `function setup() {
  createCanvas(500, 320);
}

function draw() {
  let redAmount = map(mouseX, 0, width, 0, 255);
  let blueAmount = map(mouseY, 0, height, 255, 0);

  background(redAmount, 80, blueAmount);
  fill(255);
  noStroke();
  circle(mouseX, mouseY, 42);
}`,
    remix: ['Map mouse position to size, opacity, or stroke weight.', 'Add text that prints the current RGB values.', 'Clamp or exaggerate the mapped range and compare the effect.'],
    teacher: 'This is a compact bridge from input to representation: position is not color, but code can translate it into color.',
    links: [
      ['Mouse Input', '../concepts/mouse-input/index.html'],
      ['Color is 24 Bits', '../concepts/color-is-24-bits/index.html'],
      ['Canvas API Track', '../languages/canvas-api/index.html'],
    ],
  },
  {
    slug: 'noise-walker',
    title: 'Noise Walker',
    suit: 'Systems',
    concept: '06, 09',
    lede: 'A single dot drifts smoothly through noise space, making randomness feel organic instead of jumpy.',
    tags: ['noise', 'motion', 'systems', 'organic'],
    code: `let t = 0;

function setup() {
  createCanvas(500, 320);
}

function draw() {
  background(246, 242, 234, 24);

  let x = noise(t) * width;
  let y = noise(t + 100) * height;

  fill(28, 26, 23);
  circle(x, y, 18);
  t += 0.01;
}`,
    remix: ['Change the step size and describe the motion personality.', 'Draw a trail instead of clearing the background completely.', 'Use noise to control color or size too.'],
    teacher: 'Use this next to a `random()` version. Students can feel the difference before naming Perlin noise.',
    links: [
      ['For Loops & Grids', '../concepts/for-loops-and-grids/index.html'],
      ['Objects', '../concepts/objects/index.html'],
      ['Make Systems', '../sections/make-systems/index.html'],
    ],
  },
  {
    slug: 'function-creature-stamp',
    title: 'Function Creature Stamp',
    suit: 'Systems',
    concept: '07',
    lede: 'A small creature-drawing function called several times with different arguments.',
    tags: ['functions', 'parameters', 'reuse', 'creature'],
    code: `function setup() {
  createCanvas(500, 320);
  noLoop();
}

function draw() {
  background(246, 242, 234);
  drawCreature(120, 170, 70, "#d96a3d");
  drawCreature(250, 130, 52, "#1c1a17");
  drawCreature(370, 190, 88, "#6aa7a0");
}

function drawCreature(x, y, size, bodyColor) {
  fill(bodyColor);
  circle(x, y, size);
  fill(255);
  circle(x - size * 0.15, y - size * 0.12, size * 0.18);
  circle(x + size * 0.15, y - size * 0.12, size * 0.18);
}`,
    remix: ['Add a mouth, legs, or antennae to the function.', 'Add a parameter for mood or eye size.', 'Use a loop to stamp a whole row of creatures.'],
    teacher: 'Let students copy the creature three times first, then ask what should become a parameter.',
    links: [
      ['Functions', '../concepts/functions/index.html'],
      ['Pattern Logic', '../bridges/pattern-logic/index.html'],
      ['Make Systems', '../sections/make-systems/index.html'],
    ],
  },
  {
    slug: 'data-self-portrait',
    title: 'Data Self-Portrait',
    suit: 'Data',
    concept: '15-16',
    lede: 'A tiny handmade dataset becomes a visual self-portrait, showing that data choices are design choices.',
    tags: ['data', 'arrays', 'map', 'portrait'],
    code: `let values = [7, 4, 9, 3, 6];
let labels = ["sleep", "focus", "music", "outside", "energy"];

function setup() {
  createCanvas(500, 320);
}

function draw() {
  background(246, 242, 234);
  for (let i = 0; i < values.length; i++) {
    let h = map(values[i], 0, 10, 20, 190);
    let x = 70 + i * 85;
    fill(217, 106, 61);
    rect(x, height - 55 - h, 42, h);
    fill(28);
    textAlign(CENTER);
    text(labels[i], x + 21, height - 28);
  }
}`,
    remix: ['Replace the values with data about your day, class, or neighborhood.', 'Try circles instead of bars and compare what the viewer notices.', 'Add a title and source note.'],
    teacher: 'Frame this as “same data, different visual story.” Ask what the chart shows and what it hides.',
    links: [
      ['Histograms & Sampling', '../concepts/histograms-and-sampling/index.html'],
      ['Data as Material', '../concepts/data-as-material/index.html'],
      ['Data Section', '../sections/data-as-material/index.html'],
    ],
  },
  {
    slug: 'simple-collision-game',
    title: 'Simple Collision Game',
    suit: 'Open',
    concept: '05, 10',
    lede: 'A tiny target game where distance becomes a win condition and state gives the sketch a mode.',
    tags: ['game', 'distance', 'conditionals', 'state'],
    code: `let targetX = 380;
let targetY = 160;
let won = false;

function setup() {
  createCanvas(500, 320);
}

function draw() {
  background(won ? "#d7f0df" : "#f6f2ea");

  fill("#d96a3d");
  circle(targetX, targetY, 46);

  fill("#1c1a17");
  circle(mouseX, mouseY, 28);

  if (dist(mouseX, mouseY, targetX, targetY) < 37) {
    won = true;
  }

  textSize(24);
  text(won ? "You found it." : "Move to the target.", 24, 42);
}`,
    remix: ['Add a timer or score.', 'Move the target after each win.', 'Add start/play/win states instead of one boolean.'],
    teacher: 'This is a friendly bridge from conditionals to state machines: one condition changes the whole screen.',
    links: [
      ['Conditionals', '../concepts/conditionals/index.html'],
      ['State Machines', '../concepts/state-machines/index.html'],
      ['Make It Respond', '../sections/make-it-respond/index.html'],
    ],
  },
  {
    slug: 'particle-system-seed',
    title: 'Particle System Seed',
    suit: 'Open',
    concept: '22',
    lede: 'Click to emit particles; the list grows and shrinks as each particle fades out.',
    tags: ['arraylist', 'particles', 'objects', 'dynamic list'],
    code: `let particles = [];

function setup() {
  createCanvas(500, 320);
}

function draw() {
  background(246, 242, 234);

  for (let i = particles.length - 1; i >= 0; i--) {
    let p = particles[i];
    p.y -= p.speed;
    p.life -= 4;
    fill(217, 106, 61, p.life);
    noStroke();
    circle(p.x, p.y, p.size);
    if (p.life <= 0) particles.splice(i, 1);
  }
}

function mousePressed() {
  particles.push({ x: mouseX, y: mouseY, speed: random(1, 4), size: random(10, 28), life: 255 });
}`,
    remix: ['Emit five particles per click.', 'Add gravity by changing y speed over time.', 'Turn each particle into a class.'],
    teacher: 'This is the cleanest Java/ArrayList bridge: dynamic lists are visible because particles appear and disappear.',
    links: [
      ['ArrayList in Action', '../concepts/arraylist-in-action/index.html'],
      ['Objects', '../concepts/objects/index.html'],
      ['Algorithms', '../sections/algorithms/index.html'],
    ],
  },
  {
    slug: 'modulo-orbit-clock',
    title: 'Modulo Orbit Clock',
    suit: 'Systems',
    concept: '03, 06',
    lede: 'A looping orbit where modulo turns a growing frame counter into a repeating visual rhythm.',
    tags: ['modulo', 'motion', 'cycles', 'frameCount'],
    code: `function setup() {
  createCanvas(500, 320);
  angleMode(DEGREES);
}

function draw() {
  background(246, 242, 234);
  translate(width / 2, height / 2);

  let tick = frameCount % 120;
  let angle = map(tick, 0, 120, 0, 360);

  noFill();
  stroke(28);
  circle(0, 0, 180);

  let x = cos(angle) * 90;
  let y = sin(angle) * 90;

  fill(217, 106, 61);
  noStroke();
  circle(x, y, 28);

  fill(28);
  textAlign(CENTER);
  text("frameCount % 120 = " + tick, 0, 130);
}`,
    remix: ['Change 120 to 60 or 240 and describe the speed change.', 'Add a second orbit with a different modulo cycle.', 'Color the dot differently when tick is less than 30.'],
    teacher: 'This seed makes modulo feel like a clock: the number grows forever, but the visual state loops cleanly.',
    links: [
      ['Draw Loop / Time', '../concepts/draw-loop-time/index.html'],
      ['For Loops & Grids', '../concepts/for-loops-and-grids/index.html'],
      ['Modulo Bridge', '../bridges/modulo-bridge/index.html'],
    ],
  },
  {
    slug: 'screen-state-switcher',
    title: 'Screen State Switcher',
    suit: 'Open',
    concept: '05, 10',
    lede: 'Click through menu, play, and win screens using one state variable instead of scattered booleans.',
    tags: ['state', 'screens', 'events', 'game'],
    code: `let state = "menu";
let score = 0;

function setup() {
  createCanvas(500, 320);
  textAlign(CENTER, CENTER);
}

function draw() {
  if (state === "menu") {
    background(28);
    fill(255);
    textSize(28);
    text("Click to start", width / 2, height / 2);
  } else if (state === "playing") {
    background(246, 242, 234);
    score++;
    fill(217, 106, 61);
    circle(width / 2, height / 2, 70);
    fill(28);
    text("score: " + score, width / 2, 50);
    if (score > 180) state = "win";
  } else if (state === "win") {
    background(215, 240, 223);
    fill(28);
    textSize(28);
    text("You win. Click to reset.", width / 2, height / 2);
  }
}

function mousePressed() {
  if (state === "menu") {
    score = 0;
    state = "playing";
  } else if (state === "win") {
    state = "menu";
  }
}`,
    remix: ['Add a paused state controlled by the spacebar.', 'Replace the timer win condition with a target collision.', 'Draw a state diagram before adding a fourth screen.'],
    teacher: 'Use this as the smallest possible state machine: one variable chooses one screen, and events move between screens.',
    links: [
      ['Conditionals', '../concepts/conditionals/index.html'],
      ['State Machines', '../concepts/state-machines/index.html'],
      ['State Machines Bridge', '../bridges/state-machines-bridge/index.html'],
    ],
  },
  {
    slug: 'pixel-mood-grid',
    title: 'Pixel Mood Grid',
    suit: 'Data',
    concept: '12-13',
    lede: 'A hand-coded bitmap where 0s and 1s become pixels, then colors turn the grid into a tiny mood icon.',
    tags: ['binary', 'pixels', 'color', 'grid'],
    code: `let bits = [
  "00111100",
  "01111110",
  "11011011",
  "11111111",
  "11100111",
  "01111110",
  "00111100",
  "00000000"
];

function setup() {
  createCanvas(500, 320);
  noLoop();
}

function draw() {
  background(246, 242, 234);
  let size = 28;
  let startX = 138;
  let startY = 48;

  for (let row = 0; row < bits.length; row++) {
    for (let col = 0; col < bits[row].length; col++) {
      if (bits[row][col] === "1") fill(217, 106, 61);
      else fill(236, 229, 214);
      stroke(28);
      square(startX + col * size, startY + row * size, size);
    }
  }
}`,
    remix: ['Change the 0/1 pattern to make a new icon.', 'Use three symbols instead of two and map each to a color.', 'Add labels that explain how many bits wide and tall the image is.'],
    teacher: 'This is a concrete bridge from binary data to image data: the string is the picture before it is drawn.',
    links: [
      ['Color is 24 Bits', '../concepts/color-is-24-bits/index.html'],
      ['Binary as Pixels', '../concepts/binary-as-pixels/index.html'],
      ['Data as Material', '../sections/data-as-material/index.html'],
    ],
  },
  {
    slug: 'accessible-pattern-poster',
    title: 'Accessible Pattern Poster',
    suit: 'Support',
    concept: '18',
    lede: 'A poster seed that communicates categories with color and pattern, not color alone.',
    tags: ['accessibility', 'color', 'patterns', 'labels'],
    code: `let labels = ["A", "B", "C", "D"];
let colors = ["#d96a3d", "#6aa7a0", "#1c1a17", "#ece5d6"];

function setup() {
  createCanvas(500, 320);
  noLoop();
}

function draw() {
  background(246, 242, 234);
  textAlign(CENTER, CENTER);
  textSize(18);

  for (let i = 0; i < 4; i++) {
    let x = 70 + i * 105;
    fill(colors[i]);
    stroke(28);
    rect(x, 80, 78, 120);

    stroke(28);
    for (let y = 90; y < 195; y += 16) {
      if (i % 2 === 0) line(x + 8, y, x + 70, y);
      else line(x + 12, y - 8, x + 66, y + 8);
    }

    noStroke();
    fill(i === 2 ? 255 : 28);
    text(labels[i], x + 39, 140);
  }
}`,
    remix: ['Remove the patterns and ask what becomes harder to read.', 'Add a legend under the four categories.', 'Use shape differences instead of line patterns.'],
    teacher: 'This seed turns accessibility into a making problem: students can see why labels and patterns help when color is not enough.',
    links: [
      ['Color & Accessibility', '../concepts/color-and-accessibility/index.html'],
      ['Bias in a Filter', '../concepts/bias-in-a-filter/index.html'],
      ['Computing in the World', '../sections/computing-in-the-world/index.html'],
    ],
  },
  {
    slug: 'recursive-branch-garden',
    title: 'Recursive Branch Garden',
    suit: 'Open',
    concept: '21',
    lede: 'A tiny recursive tree where each branch draws two smaller branches until the base case stops.',
    tags: ['recursion', 'fractals', 'functions', 'algorithms'],
    code: `function setup() {
  createCanvas(500, 360);
  angleMode(DEGREES);
  noLoop();
}

function draw() {
  background(246, 242, 234);
  translate(width / 2, height - 30);
  stroke(28);
  branch(85);
}

function branch(len) {
  line(0, 0, 0, -len);
  translate(0, -len);

  if (len < 12) {
    fill(217, 106, 61);
    noStroke();
    circle(0, 0, 8);
    stroke(28);
    return;
  }

  push();
  rotate(28);
  branch(len * 0.68);
  pop();

  push();
  rotate(-24);
  branch(len * 0.72);
  pop();
}`,
    remix: ['Change the branch angles and describe the tree personality.', 'Change the base case from 12 to 5 or 25.', 'Add a third branch or color by recursion depth.'],
    teacher: 'This seed pairs recursion with push/pop: each branch gets its own local world, then returns to the parent branch.',
    links: [
      ['Recursion as Fractals', '../concepts/recursion-as-fractals/index.html'],
      ['World Coordinates Bridge', '../bridges/push-pop-bridge/index.html'],
      ['Algorithms', '../sections/algorithms/index.html'],
    ],
  },
];

const suitMeta = {
  Marks: ['✦ Marks', 'Drawing, coordinates, shape, and color.'],
  Motion: ['◎ Motion', 'Animation, input, time, and response.'],
  Systems: ['⬡ Systems', 'Loops, functions, arrays, and generative structure.'],
  Data: ['▦ Data', 'Values, pixels, charts, and data as material.'],
  Open: ['☽ Open', 'Games, media, particles, and project seeds.'],
  Support: ['⊕ Support', 'Debugging, sharing, and classroom confidence.'],
};

function esc(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function depthPrefix(filePath) {
  const depth = dirname(filePath).split('/').filter(Boolean).length;
  return depth ? Array(depth).fill('..').join('/') : '.';
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

function shell({ filePath, active = 'sketches', title, description, body, extraCss = true }) {
  const prefix = depthPrefix(filePath);
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
  ${extraCss ? `<link rel="stylesheet" href="${href(prefix, 'assets/resource-pages.css')}" />` : ''}
</head>
<body data-page="${active}">
  ${nav(active, prefix)}
  <main>
    ${body}
  </main>
  <footer class="site-footer">
    <span>Coding the Canvas — learn computer science by seeing code act on a canvas.</span>
    <span>p5.js · Canvas API · Processing Java</span>
  </footer>
  <script src="${href(prefix, 'assets/site.js')}"></script>
</body>
</html>
`;
}

function codeBlock(label, code) {
  return `<div class="code-sample"><span class="meta">${esc(label)}</span><pre>${esc(code)}</pre></div>`;
}

function detailHref(link) {
  return link.startsWith('../') ? `../../${link.slice(3)}` : link;
}

function sketchCard(sketch, prefix = '.') {
  return `<a class="card sketch-card" href="${prefix}/${sketch.slug}/index.html" data-tags="${esc(sketch.tags.join(' '))} ${esc(sketch.suit)}">
    <span class="meta">${esc(sketch.suit)} · Concept ${esc(sketch.concept)}</span>
    <h2>${esc(sketch.title)}</h2>
    <p>${esc(sketch.lede)}</p>
    <div class="tag-row">${sketch.tags.slice(0, 4).map((tag) => `<span class="tag">${esc(tag)}</span>`).join('')}</div>
  </a>`;
}

function writeSketchIndex() {
  const grouped = Object.keys(suitMeta)
    .filter((suit) => sketches.some((sketch) => sketch.suit === suit))
    .map((suit) => {
      const [label, text] = suitMeta[suit];
      const cards = sketches.filter((sketch) => sketch.suit === suit).map((sketch) => sketchCard(sketch, '.')).join('');
      return `<section class="band movement-block">
        <p class="meta">${esc(label)}</p>
        <h2>${esc(text)}</h2>
        <div class="grid cards">${cards}</div>
      </section>`;
    }).join('\n');

  const body = `<section class="hero">
      <p class="kicker">starter sketches</p>
      <h1>Sketches</h1>
      <p class="lede">Small remixable p5.js seeds. Open one when you want less explanation and more making.</p>
      <div class="actions">
        <a class="button primary" href="./bouncing-ball-starter/index.html">Start with motion</a>
        <a class="button" href="./visual-hello-postcard/index.html">Make a visual hello</a>
        <a class="button" href="../tools/index.html">Browse tools</a>
      </div>
    </section>
    <section class="band columns">
      <article class="resource-panel"><h2>Foundation</h2><p>Run it as-is and explain what each visible part does.</p></article>
      <article class="resource-panel"><h2>Exploration</h2><p>Change one rule, value, or visual mapping and describe the result.</p></article>
      <article class="resource-panel"><h2>Classroom adaptation</h2><p>Turn the seed into a student-facing prompt or demo.</p></article>
    </section>
    ${grouped}`;

  writeFile('sketches/index.html', shell({
    filePath: 'sketches/index.html',
    title: 'Sketches',
    description: 'Small remixable p5.js starter sketches for Coding the Canvas.',
    body,
  }));
}

function writeSketchPages() {
  for (const sketch of sketches) {
    const filePath = `sketches/${sketch.slug}/index.html`;
    const body = `<section class="hero">
      <p class="kicker">starter sketch · ${esc(sketch.suit)}</p>
      <h1>${esc(sketch.title)}</h1>
      <p class="lede">${esc(sketch.lede)}</p>
      <div class="actions">
        <a class="button primary" href="https://editor.p5js.org/" target="_blank" rel="noreferrer">Open p5.js editor</a>
        <a class="button" href="../index.html">All sketches</a>
      </div>
    </section>
    <section class="band split">
      <div>
        <h2>What this seed teaches</h2>
        <p>${esc(sketch.teacher)}</p>
        <div class="tag-row">${sketch.tags.map((tag) => `<span class="tag">${esc(tag)}</span>`).join('')}</div>
      </div>
      <div class="mini-canvas" aria-hidden="true"><svg viewBox="0 0 180 132">
        <rect x="24" y="24" width="132" height="84" fill="none" stroke="currentColor" stroke-width="3"/>
        <path d="M40 82 C66 28 96 116 136 50" fill="none" stroke="#d96a3d" stroke-width="5" stroke-linecap="round"/>
        <circle cx="58" cy="72" r="9" class="accent-fill"/><circle cx="126" cy="54" r="7"/>
      </svg></div>
    </section>
    <section class="band">${codeBlock('p5.js starter', sketch.code)}</section>
    <section class="band">
      <p class="meta">Try this</p>
      <div class="resource-grid">
        <article class="resource-panel"><h2>Foundation</h2><p>Run the sketch and point to the line that creates the most important visual change.</p></article>
        <article class="resource-panel"><h2>Exploration</h2><ul class="checklist">${sketch.remix.map((item) => `<li>${esc(item)}</li>`).join('')}</ul></article>
        <article class="resource-panel"><h2>Classroom adaptation</h2><p>Write a two-sentence prompt for students: what should they change, and what should they explain?</p></article>
      </div>
    </section>
    <section class="band"><div class="grid cards">${sketch.links.map(([label, link]) => `<a class="card" href="${detailHref(link)}"><span class="meta">related</span><h2>${esc(label)}</h2><p>Continue from this seed into the lesson or bridge.</p></a>`).join('')}</div></section>`;

    writeFile(filePath, shell({
      filePath,
      active: 'sketch',
      title: sketch.title,
      description: sketch.lede,
      body,
    }));
  }
}

function writeFile(filePath, contents) {
  mkdirSync(join(root, dirname(filePath)), { recursive: true });
  writeFileSync(join(root, filePath), contents);
}

writeSketchIndex();
writeSketchPages();
console.log(`Wrote ${sketches.length} starter sketches.`);
