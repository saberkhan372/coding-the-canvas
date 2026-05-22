import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';

const root = process.cwd();

const concepts = [
  ['01', 'coordinates', 'Coordinates'],
  ['02', 'shapes-and-color', 'Shapes & Color'],
  ['03', 'draw-loop-time', 'Draw Loop / Time'],
  ['04', 'mouse-input', 'Mouse Input'],
  ['05', 'conditionals', 'Conditionals'],
  ['06', 'for-loops-and-grids', 'For Loops & Grids'],
  ['07', 'functions', 'Functions'],
  ['08', 'arrays', 'Arrays'],
  ['09', 'objects', 'Objects'],
  ['10', 'state-machines', 'State Machines'],
  ['11', 'pixels-image-data', 'Pixels / Image Data'],
  ['12', 'color-is-24-bits', 'Color is 24 Bits'],
  ['13', 'binary-as-pixels', 'Binary as Pixels'],
  ['14', 'compression-by-drawing', 'Compression by Drawing'],
  ['15', 'histograms-and-sampling', 'Histograms & Sampling'],
  ['16', 'data-as-material', 'Data as Material'],
  ['17', 'bias-in-a-filter', 'Bias in a Filter'],
  ['18', 'color-and-accessibility', 'Color & Accessibility'],
  ['19', 'whose-authorship', 'Whose Authorship?'],
  ['20', 'energy-of-a-sketch', 'Energy of a Sketch'],
  ['21', 'recursion-as-fractals', 'Recursion as Fractals'],
  ['22', 'arraylist-in-action', 'ArrayList in Action'],
];

const pages = [
  {
    n: '12',
    slug: 'color-is-24-bits',
    title: 'Color is 24 Bits',
    section: '§5 Data as Material',
    sectionHref: '../../sections/data-as-material/index.html',
    lede: 'Every screen color is three 8-bit numbers: red, green, and blue. 24 bits gives you more than 16 million possible colors.',
    bigIdea: 'A color is not magic or paint. It is data: 8 bits for red, 8 bits for green, and 8 bits for blue. Each channel stores a number from 0 to 255. Put three channels together and you get a 24-bit color.',
    checklist: ['RGB channels: red, green, blue', '8 bits per channel means 0-255', '24 bits total means 16,777,216 colors', 'Hex color pairs are the same numbers in base 16', 'Changing one channel changes the feeling of the image'],
    visual: 'rgb',
    codeTitle: 'Code - build a color from three numbers',
    p5: `let r = 217;
let g = 106;
let b = 61;

function setup() {
  createCanvas(400, 260);
}

function draw() {
  background(246, 242, 234);

  fill(r, g, b);
  noStroke();
  rect(80, 60, 240, 120);

  fill(28);
  text('rgb(' + r + ', ' + g + ', ' + b + ')', 120, 210);
}`,
    canvas: `const ctx = canvas.getContext('2d');
const r = 217;
const g = 106;
const b = 61;

ctx.fillStyle = 'rgb(' + r + ',' + g + ',' + b + ')';
ctx.fillRect(80, 60, 240, 120);

ctx.fillStyle = '#1c1a17';
ctx.fillText('rgb(' + r + ', ' + g + ', ' + b + ')', 120, 210);`,
    java: `int r = 217;
int g = 106;
int b = 61;

void setup() {
  size(400, 260);
}

void draw() {
  background(246, 242, 234);
  fill(r, g, b);
  noStroke();
  rect(80, 60, 240, 120);
}`,
    canvasIdea: 'Make three sliders for red, green, and blue. Ask students to predict which direction the color will move before they drag. The goal is to see color as a tuple of numbers.',
    patterns: ['0 means none of that channel', '255 means full channel strength', '#d96a3d equals rgb(217, 106, 61)', 'White is rgb(255,255,255)', 'Black is rgb(0,0,0)'],
    teacher: 'This page is the bridge between visual design and binary representation. Keep the slider interaction visible while naming the bit depth.',
    misconception: 'Students often think 24-bit color means 24 colors. It means 24 binary decisions, or 2^24 possible combinations.',
    ap: [['CSP', ['DAT', 'AAP']], ['CSA', ['U1']]],
  },
  {
    n: '13',
    slug: 'binary-as-pixels',
    title: 'Binary as Pixels',
    section: '§5 Data as Material',
    sectionHref: '../../sections/data-as-material/index.html',
    lede: 'A bitmap turns bits into visible marks. One bit can choose black or white; more bits create richer images.',
    bigIdea: 'A bitmap is a grid where each cell stores data for a pixel. In the simplest version, 0 means white and 1 means black. Students can draw with bits, then decode the same grid back into an image.',
    checklist: ['A bit has two states: 0 or 1', 'A bitmap maps bits to pixels', 'Rows and columns are data structure and image at the same time', 'Resolution is grid size', 'More bits per pixel means more possible colors'],
    visual: 'bitmap',
    codeTitle: 'Code - draw a bitmap from 0s and 1s',
    p5: `let bits = [
  '00111100',
  '01000010',
  '10100101',
  '10000001',
  '10100101',
  '10011001',
  '01000010',
  '00111100'
];

function setup() {
  createCanvas(320, 320);
  noLoop();
}

function draw() {
  background(255);
  let cell = width / 8;
  for (let y = 0; y < bits.length; y++) {
    for (let x = 0; x < bits[y].length; x++) {
      fill(bits[y][x] === '1' ? 28 : 246);
      rect(x * cell, y * cell, cell, cell);
    }
  }
}`,
    canvas: `const bits = [
  '00111100', '01000010', '10100101', '10000001',
  '10100101', '10011001', '01000010', '00111100'
];
const ctx = canvas.getContext('2d');
const cell = canvas.width / 8;

bits.forEach((row, y) => {
  [...row].forEach((bit, x) => {
    ctx.fillStyle = bit === '1' ? '#1c1a17' : '#f6f2ea';
    ctx.fillRect(x * cell, y * cell, cell, cell);
  });
});`,
    java: `String[] bits = {
  "00111100", "01000010", "10100101", "10000001",
  "10100101", "10011001", "01000010", "00111100"
};

void setup() {
  size(320, 320);
  noLoop();
}

void draw() {
  int cell = width / 8;
  for (int y = 0; y < bits.length; y++) {
    for (int x = 0; x < bits[y].length(); x++) {
      fill(bits[y].charAt(x) == '1' ? 28 : 246);
      rect(x * cell, y * cell, cell, cell);
    }
  }
}`,
    canvasIdea: 'Let students edit the 0s and 1s directly, then immediately redraw the image. The data and the picture should feel like two views of the same object.',
    patterns: ['0/1 bitmap', 'row strings as data', 'nested loops over rows and columns', 'resolution as number of cells', 'bit depth as choices per pixel'],
    teacher: 'Use this before compression. Once students see long runs of repeated 0s and 1s, run-length encoding feels motivated.',
    misconception: 'Students may say the 1s are the image. The actual image is the interpretation rule: 1 means black, 0 means white. Change the rule and the same data can draw differently.',
    ap: [['CSP', ['DAT', 'AAP']], ['CSA', ['U8']]],
  },
  {
    n: '14',
    slug: 'compression-by-drawing',
    title: 'Compression by Drawing',
    section: '§5 Data as Material',
    sectionHref: '../../sections/data-as-material/index.html',
    lede: 'Compression replaces repeated data with shorter instructions. A picture can be redrawn from a recipe instead of stored pixel by pixel.',
    bigIdea: 'If a bitmap has a long run of repeated pixels, you do not need to write every pixel down. You can store the value and the count. That is the heart of run-length encoding: data becomes drawing instructions.',
    checklist: ['Identify repeated runs', 'Encode as value + count', 'Decode by drawing the run back out', 'Compare original length to compressed length', 'Name the tradeoff: compression works best when data has patterns'],
    visual: 'rle',
    codeTitle: 'Code - decode run-length drawing instructions',
    p5: `let runs = [
  ['white', 3], ['black', 5],
  ['white', 2], ['black', 2], ['white', 4],
  ['black', 8]
];

function setup() {
  createCanvas(400, 120);
  noLoop();
}

function draw() {
  let x = 0;
  let cell = 20;
  for (let [value, count] of runs) {
    fill(value === 'black' ? 28 : 246);
    for (let i = 0; i < count; i++) {
      rect(x * cell, 40, cell, cell);
      x++;
    }
  }
}`,
    canvas: `const runs = [['white', 3], ['black', 5], ['white', 2], ['black', 2], ['white', 4]];
const ctx = canvas.getContext('2d');
const cell = 20;
let x = 0;

for (const [value, count] of runs) {
  ctx.fillStyle = value === 'black' ? '#1c1a17' : '#f6f2ea';
  for (let i = 0; i < count; i++) {
    ctx.fillRect(x * cell, 40, cell, cell);
    x++;
  }
}`,
    java: `String[] values = {"white", "black", "white", "black", "white"};
int[] counts = {3, 5, 2, 2, 4};

void setup() {
  size(400, 120);
  noLoop();
}

void draw() {
  int x = 0;
  int cell = 20;
  for (int r = 0; r < values.length; r++) {
    fill(values[r].equals("black") ? 28 : 246);
    for (int i = 0; i < counts[r]; i++) {
      rect(x * cell, 40, cell, cell);
      x++;
    }
  }
}`,
    canvasIdea: 'Have students draw a stripe pattern, write the full pixel string, then write the compressed recipe. The saved characters become visible.',
    patterns: ['Run-length encoding', 'lossless compression', 'decode loop', 'file size estimate', 'patterns compress better than noise'],
    teacher: 'Do a bad example too: random pixels often get larger after RLE. That makes compression honest instead of magical.',
    misconception: 'Students often think compression always makes a file smaller. It only helps when the encoded pattern costs less than the original.',
    ap: [['CSP', ['DAT', 'AAP']], ['CSA', ['U4', 'U6']]],
  },
  {
    n: '15',
    slug: 'histograms-and-sampling',
    title: 'Histograms & Sampling',
    section: '§5 Data as Material',
    sectionHref: '../../sections/data-as-material/index.html',
    lede: 'A histogram summarizes many values into a shape. Sampling lets you estimate a whole image or dataset from a smaller part.',
    bigIdea: 'A histogram is a drawing of counts. Instead of looking at every pixel individually, count how often each brightness or color value appears. Sampling asks a related question: can a smaller set of values represent the whole?',
    checklist: ['Extract brightness from pixels', 'Count values into buckets', 'Draw bars from counts', 'Change sample size and compare the result', 'Discuss what gets missed by sampling'],
    visual: 'histogram',
    codeTitle: 'Code - count brightness buckets',
    p5: `let buckets = new Array(8).fill(0);

function setup() {
  createCanvas(400, 260);
  noLoop();
}

function draw() {
  background(246);
  for (let i = 0; i < 500; i++) {
    let brightness = random(255);
    let bucket = floor(map(brightness, 0, 256, 0, 8));
    buckets[bucket]++;
  }

  for (let b = 0; b < buckets.length; b++) {
    let h = buckets[b] * 2;
    rect(40 + b * 40, height - 30 - h, 28, h);
  }
}`,
    canvas: `const buckets = new Array(8).fill(0);
for (let i = 0; i < 500; i++) {
  const brightness = Math.random() * 255;
  const bucket = Math.floor(brightness / 32);
  buckets[bucket]++;
}

const ctx = canvas.getContext('2d');
buckets.forEach((count, b) => {
  const h = count * 2;
  ctx.fillRect(40 + b * 40, canvas.height - 30 - h, 28, h);
});`,
    java: `int[] buckets = new int[8];

void setup() {
  size(400, 260);
  noLoop();
}

void draw() {
  for (int i = 0; i < 500; i++) {
    float brightness = random(255);
    int bucket = int(brightness / 32);
    buckets[bucket]++;
  }
  for (int b = 0; b < buckets.length; b++) {
    int h = buckets[b] * 2;
    rect(40 + b * 40, height - 30 - h, 28, h);
  }
}`,
    canvasIdea: 'Turn an image into a bar chart. Students see that a histogram is not a separate math object; it is a drawing made from counts.',
    patterns: ['Buckets', 'counts', 'brightness extraction', 'sample size', 'summary vs raw data'],
    teacher: 'Let students compare histograms from very different images. Then show two different images with similar histograms to discuss what summaries hide.',
    misconception: 'A histogram does not show where pixels are. It shows how many of each kind exist. Spatial arrangement is lost.',
    ap: [['CSP', ['DAT']], ['CSA', ['U6', 'U8']]],
  },
  {
    n: '16',
    slug: 'data-as-material',
    title: 'Data as Material',
    section: '§5 Data as Material',
    sectionHref: '../../sections/data-as-material/index.html',
    lede: 'Data can become marks on a canvas. CSV and JSON are not just files to parse; they are raw material for visual stories.',
    bigIdea: 'A dataset is a list of records. Each record can become a shape, position, color, or motion. The creative decision is the mapping: which data field controls which visual property?',
    checklist: ['Load CSV or JSON', 'Preview rows and fields', 'Map values to x, y, size, color, or opacity', 'Normalize with map()', 'Ask what the visualization reveals and hides'],
    visual: 'data',
    codeTitle: 'Code - map rows to marks',
    p5: `let rows = [
  {name: 'A', value: 12},
  {name: 'B', value: 34},
  {name: 'C', value: 21},
  {name: 'D', value: 45}
];

function setup() {
  createCanvas(420, 260);
}

function draw() {
  background(246);
  for (let i = 0; i < rows.length; i++) {
    let x = 70 + i * 80;
    let h = rows[i].value * 4;
    rect(x, height - 40 - h, 44, h);
    text(rows[i].name, x + 14, height - 18);
  }
}`,
    canvas: `const rows = [{name:'A', value:12}, {name:'B', value:34}, {name:'C', value:21}];
const ctx = canvas.getContext('2d');

rows.forEach((row, i) => {
  const x = 70 + i * 80;
  const h = row.value * 4;
  ctx.fillRect(x, canvas.height - 40 - h, 44, h);
  ctx.fillText(row.name, x + 14, canvas.height - 18);
});`,
    java: `String[] names = {"A", "B", "C", "D"};
int[] values = {12, 34, 21, 45};

void setup() {
  size(420, 260);
}

void draw() {
  background(246);
  for (int i = 0; i < values.length; i++) {
    int x = 70 + i * 80;
    int h = values[i] * 4;
    rect(x, height - 40 - h, 44, h);
    text(names[i], x + 14, height - 18);
  }
}`,
    canvasIdea: 'Start with a tiny hand-written dataset before loading a file. Students should understand the mapping before they worry about parsing.',
    patterns: ['Record', 'field', 'mapping', 'normalization', 'visual encoding'],
    teacher: 'This is an ideal Create Task seed: students can choose a dataset, build a visual, and explain an algorithmic transformation.',
    misconception: 'A data visualization is not neutral. Every mapping emphasizes some features and hides others.',
    ap: [['CSP', ['DAT', 'CRD', 'AAP']], ['CSA', ['U6']]],
  },
  {
    n: '17',
    slug: 'bias-in-a-filter',
    title: 'Bias in a Filter',
    section: '§6 Computing in the World',
    sectionHref: '../../sections/computing-in-the-world/index.html',
    lede: 'A filter is an algorithm with assumptions. When those assumptions fail, the failure becomes visible on the canvas.',
    bigIdea: 'Students build a simple image filter, then test it on different images. The same rule can work well for one case and fail badly for another. Bias becomes concrete: not intention, but uneven performance across examples.',
    checklist: ['Build a threshold or color-detection filter', 'Test on multiple images', 'Record where it works and fails', 'Name assumptions in the rule', 'Propose a better test set'],
    visual: 'bias',
    codeTitle: 'Code - a threshold filter with visible failure',
    p5: `function isLightEnough(r, g, b) {
  let brightness = (r + g + b) / 3;
  return brightness > 140;
}

// Use this rule across many images.
// Which images does it fail on?
if (isLightEnough(redValue, greenValue, blueValue)) {
  fill(255);
} else {
  fill(0);
}`,
    canvas: `function isLightEnough(r, g, b) {
  const brightness = (r + g + b) / 3;
  return brightness > 140;
}

const passes = isLightEnough(pixel[0], pixel[1], pixel[2]);
ctx.fillStyle = passes ? 'white' : 'black';`,
    java: `boolean isLightEnough(float r, float g, float b) {
  float brightness = (r + g + b) / 3;
  return brightness > 140;
}

boolean passes = isLightEnough(red(c), green(c), blue(c));`,
    canvasIdea: 'Show four test images side by side and run the same threshold. The discussion starts when students can point to the specific failures.',
    patterns: ['Assumption', 'test set', 'false positive', 'false negative', 'threshold'],
    teacher: 'Frame this carefully: bias can appear even without malicious intent. The lesson is about testing, evidence, and who is included in the design process.',
    misconception: 'Students may think bias means the programmer wanted harm. Emphasize that biased outcomes can come from incomplete data, narrow tests, or simplistic rules.',
    ap: [['CSP', ['IOC', 'DAT']], ['CSA', ['U3']]],
  },
  {
    n: '18',
    slug: 'color-and-accessibility',
    title: 'Color & Accessibility',
    section: '§6 Computing in the World',
    sectionHref: '../../sections/computing-in-the-world/index.html',
    lede: 'A palette is part of the interface. Contrast and color choices decide who can read and use what you make.',
    bigIdea: 'Students test their own sketches for contrast and color dependence. A beautiful palette can still be inaccessible. The goal is not to remove style, but to make style work for more people.',
    checklist: ['Measure contrast between foreground and background', 'Simulate color-vision differences', 'Avoid meaning by color alone', 'Add labels, patterns, or shape differences', 'Build an accessible palette'],
    visual: 'access',
    codeTitle: 'Code - compare color contrast',
    p5: `function luminance(r, g, b) {
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

let bg = luminance(246, 242, 234);
let fg = luminance(28, 26, 23);
let difference = abs(bg - fg);

if (difference > 120) {
  print('strong contrast');
}`,
    canvas: `function luminance(r, g, b) {
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

const contrast = Math.abs(luminance(246,242,234) - luminance(28,26,23));
console.log(contrast > 120 ? 'strong' : 'check this');`,
    java: `float luminance(float r, float g, float b) {
  return 0.2126*r + 0.7152*g + 0.0722*b;
}

float contrast = abs(luminance(246,242,234) - luminance(28,26,23));`,
    canvasIdea: 'Put two versions of the same sketch next to each other: one using only color differences, another using color plus labels or patterns.',
    patterns: ['Contrast', 'luminance', 'redundant encoding', 'palette testing', 'inclusive design'],
    teacher: 'Students can audit a previous sketch from the course. This makes accessibility feel like revision practice, not a separate lecture.',
    misconception: 'Accessibility is often treated as a checklist after the design is done. Here it is part of the sketching process.',
    ap: [['CSP', ['IOC', 'CRD']], ['CSA', ['U1']]],
  },
  {
    n: '19',
    slug: 'whose-authorship',
    title: 'Whose Authorship?',
    section: '§6 Computing in the World',
    sectionHref: '../../sections/computing-in-the-world/index.html',
    lede: 'Generative art is made by a person and an algorithm. This page asks where choice, credit, and responsibility live.',
    bigIdea: 'A generative sketch contains human decisions: the rules, the randomness, the constraints, the dataset, and the act of curation. Students trace which parts of the output came from code and which came from the person who wrote or selected it.',
    checklist: ['Identify human choices in a generative sketch', 'Identify algorithmic choices', 'Distinguish randomness from authorship', 'Write an attribution statement', 'Discuss remix and credit'],
    visual: 'authorship',
    codeTitle: 'Code - controlled randomness',
    p5: `let seed = 42;

function setup() {
  createCanvas(400, 260);
  randomSeed(seed);
  noLoop();
}

function draw() {
  background(246);
  for (let i = 0; i < 60; i++) {
    fill(random(255), 100, 80, 160);
    circle(random(width), random(height), random(8, 40));
  }
}`,
    canvas: `let seed = 42; // repeatable choice

for (let i = 0; i < 60; i++) {
  const x = Math.random() * canvas.width;
  const y = Math.random() * canvas.height;
  const r = Math.random() * 20 + 4;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fill();
}`,
    java: `int seed = 42;

void setup() {
  size(400, 260);
  randomSeed(seed);
  noLoop();
}

void draw() {
  for (int i = 0; i < 60; i++) {
    ellipse(random(width), random(height), random(8, 40), random(8, 40));
  }
}`,
    canvasIdea: 'Run the same rule with three seeds. Ask: what did the programmer choose, what did the computer choose, and what did the artist choose by selecting one output?',
    patterns: ['Seed', 'randomness', 'curation', 'attribution', 'remix'],
    teacher: 'This works well as a short writing prompt after a generative sketch project. Students can write an authorship note for their own work.',
    misconception: 'Random does not mean authorless. Someone chose the rules, ranges, colors, and stopping point.',
    ap: [['CSP', ['IOC', 'CRD']], ['CSA', ['U4']]],
  },
  {
    n: '20',
    slug: 'energy-of-a-sketch',
    title: 'Energy of a Sketch',
    section: '§6 Computing in the World',
    sectionHref: '../../sections/computing-in-the-world/index.html',
    lede: 'Every frame costs work. Loops, pixels, and animation can make a sketch feel smooth or wasteful.',
    bigIdea: 'Students measure how much work a sketch does each frame. Drawing 50 circles is different from touching 500,000 pixels 60 times per second. Performance becomes an ethical and practical design question.',
    checklist: ['Count operations per frame', 'Compare noLoop() and draw()', 'Measure frameRate()', 'Reduce unnecessary work', 'Discuss energy and device access'],
    visual: 'energy',
    codeTitle: 'Code - count work per frame',
    p5: `let work = 0;

function draw() {
  background(246);
  work = 0;

  for (let i = 0; i < 1000; i++) {
    circle(random(width), random(height), 4);
    work++;
  }

  text('work this frame: ' + work, 20, 30);
  text('fps: ' + round(frameRate()), 20, 50);
}`,
    canvas: `let work = 0;

function frame() {
  work = 0;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < 1000; i++) {
    ctx.fillRect(Math.random()*canvas.width, Math.random()*canvas.height, 4, 4);
    work++;
  }
  requestAnimationFrame(frame);
}`,
    java: `int work = 0;

void draw() {
  background(246);
  work = 0;
  for (int i = 0; i < 1000; i++) {
    ellipse(random(width), random(height), 4, 4);
    work++;
  }
  text("work: " + work, 20, 30);
}`,
    canvasIdea: 'Create a work meter. Let students raise the number of shapes until the frame rate drops, then optimize the sketch.',
    patterns: ['Frame rate', 'operation count', 'pixel cost', 'optimization', 'noLoop()'],
    teacher: 'Tie this to access: heavy sketches punish older devices first. Efficient code is also inclusive code.',
    misconception: 'If a sketch looks simple, students assume it is cheap. Pixel loops and hidden repeated work can be expensive.',
    ap: [['CSP', ['IOC', 'AAP']], ['CSA', ['U4']]],
  },
  {
    n: '21',
    slug: 'recursion-as-fractals',
    title: 'Recursion as Fractals',
    section: '§7 Algorithms',
    sectionHref: '../../sections/algorithms/index.html',
    lede: 'Recursion is a function that calls itself with a smaller problem. Fractals make the call stack visible.',
    bigIdea: 'A recursive drawing has two parts: a base case that stops, and a recursive case that draws smaller copies. The canvas lets students see each call as a visible branch.',
    checklist: ['Name the base case', 'Name the recursive case', 'Decrease size or depth each call', 'Trace one branch before the whole tree', 'Connect depth to call stack'],
    visual: 'fractal',
    codeTitle: 'Code - recursive tree',
    p5: `function setup() {
  createCanvas(400, 320);
}

function draw() {
  background(246);
  translate(width / 2, height - 20);
  branch(80);
}

function branch(len) {
  if (len < 8) return; // base case
  line(0, 0, 0, -len);
  translate(0, -len);

  push();
  rotate(PI / 6);
  branch(len * 0.68);
  pop();

  push();
  rotate(-PI / 6);
  branch(len * 0.68);
  pop();
}`,
    canvas: `function branch(ctx, len) {
  if (len < 8) return;
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(0, -len);
  ctx.stroke();
  ctx.translate(0, -len);

  ctx.save(); ctx.rotate(Math.PI / 6); branch(ctx, len * 0.68); ctx.restore();
  ctx.save(); ctx.rotate(-Math.PI / 6); branch(ctx, len * 0.68); ctx.restore();
}`,
    java: `void branch(float len) {
  if (len < 8) return;
  line(0, 0, 0, -len);
  translate(0, -len);

  pushMatrix();
  rotate(PI / 6);
  branch(len * 0.68);
  popMatrix();

  pushMatrix();
  rotate(-PI / 6);
  branch(len * 0.68);
  popMatrix();
}`,
    canvasIdea: 'Start with one trunk, then one branch, then one branch that branches. Students should see the repeated structure before seeing the word recursion.',
    patterns: ['Base case', 'recursive case', 'depth', 'call stack', 'self-similarity'],
    teacher: 'This is a high-ceiling lesson. Let students adjust angle and shrink factor before asking them to trace every call.',
    misconception: 'Students often look for a loop. Recursion repeats through function calls, not through a for loop.',
    ap: [['CSP', ['AAP']], ['CSA', ['U10']]],
  },
  {
    n: '22',
    slug: 'arraylist-in-action',
    title: 'ArrayList in Action',
    section: '§7 Algorithms',
    sectionHref: '../../sections/algorithms/index.html',
    lede: 'Dynamic lists let a sketch grow and shrink while it runs. Particles are the perfect visual model.',
    bigIdea: 'An ArrayList is a collection whose size can change. In a particle system, new particles are added, old particles are removed, and every particle updates each frame. Students see dynamic data structures as motion.',
    checklist: ['Add particles over time', 'Loop backward when removing', 'Give each particle update and draw behavior', 'Compare fixed arrays to dynamic lists', 'Connect to AP CSA ArrayList FRQs'],
    visual: 'particles',
    codeTitle: 'Code - particles in a dynamic list',
    p5: `let particles = [];

function draw() {
  background(246);
  particles.push(new Particle(mouseX, mouseY));

  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    particles[i].draw();
    if (particles[i].done()) {
      particles.splice(i, 1);
    }
  }
}`,
    canvas: `const particles = [];

function frame() {
  particles.push(new Particle(mouse.x, mouse.y));
  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    particles[i].draw(ctx);
    if (particles[i].done()) particles.splice(i, 1);
  }
  requestAnimationFrame(frame);
}`,
    java: `ArrayList<Particle> particles = new ArrayList<Particle>();

void draw() {
  particles.add(new Particle(mouseX, mouseY));

  for (int i = particles.size() - 1; i >= 0; i--) {
    Particle p = particles.get(i);
    p.update();
    p.display();
    if (p.done()) {
      particles.remove(i);
    }
  }
}`,
    canvasIdea: 'Use particles because the list size is visible. Add particles with the mouse, remove them when they fade, and show the current length on screen.',
    patterns: ['ArrayList', 'add', 'get', 'remove', 'backward removal loop'],
    teacher: 'This is the AP CSA payoff. Students already know arrays and objects; ArrayList feels natural when the sketch needs a collection that changes size.',
    misconception: 'Removing while looping forward skips items. Loop backward or adjust the index after removal.',
    ap: [['CSP', ['AAP']], ['CSA', ['U7', 'U5']]],
  },
];

function esc(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function code(value) {
  return esc(value);
}

function codePane(kind, label, value) {
  if (kind === 'java') {
    return `<article class="code-pane processing-code"><div class="code-label java">Processing / Java</div><pre>${code(value)}</pre></article>`;
  }

  const editorTitle = kind === 'p5' ? 'p5.js Web Editor' : 'Canvas API Sandbox';
  const filename = kind === 'p5' ? 'sketch.js' : 'script.js';

  return `<article class="code-pane web-editor ${kind}">
          <div class="editor-chrome"><span class="editor-dots"><span></span><span></span><span></span></span><span class="editor-title">${editorTitle}</span><span class="run-pill">Run</span></div>
          <div class="code-label-row"><div class="code-label ${kind}">${label}</div><div class="file-tabs"><span class="file-tab active">${filename}</span><span class="file-tab">index.html</span></div></div>
          <pre>${code(value)}</pre>
        </article>`;
}

function visual(kind) {
  const common = `viewBox="0 0 180 132"`;
  if (kind === 'rgb') return `<svg ${common}>
    <rect x="18" y="24" width="42" height="84" fill="#d94b3d"/><rect x="68" y="24" width="42" height="84" fill="#3d9b5f"/><rect x="118" y="24" width="42" height="84" fill="#3d62d9"/>
    <circle cx="90" cy="66" r="32" fill="#d96a3d" opacity=".9"/><text x="90" y="116" font-family="monospace" font-size="8" text-anchor="middle" fill="#8c857a">R 217 · G 106 · B 61</text>
  </svg>`;
  if (kind === 'bitmap') return `<svg ${common}>
    ${Array.from({ length: 8 }, (_, y) => Array.from({ length: 8 }, (_, x) => {
      const on = '0011110001000010101001011000000110100101100110010100001000111100'[y * 8 + x] === '1';
      return `<rect x="${22 + x * 14}" y="${12 + y * 14}" width="13" height="13" fill="${on ? '#1c1a17' : '#f6f2ea'}" stroke="#1c1a17" stroke-width=".5"/>`;
    }).join('')).join('')}
  </svg>`;
  if (kind === 'rle') return `<svg ${common}>
    <text x="12" y="24" font-family="monospace" font-size="8" fill="#8c857a">white×3 black×5 white×2...</text>
    ${Array.from({ length: 18 }, (_, i) => `<rect x="${12 + i * 8}" y="52" width="8" height="28" fill="${i < 3 || (i >= 8 && i < 10) || i > 13 ? '#f6f2ea' : '#1c1a17'}" stroke="#1c1a17" stroke-width=".5"/>`).join('')}
    <path d="M40 36 C58 24 80 24 96 42" fill="none" stroke="#d96a3d" stroke-width="2"/><text x="100" y="42" font-family="monospace" font-size="8" fill="#d96a3d">decode</text>
  </svg>`;
  if (kind === 'histogram') return `<svg ${common}>
    ${[32, 66, 44, 90, 72, 50, 104, 38].map((h, i) => `<rect x="${18 + i * 19}" y="${116 - h}" width="13" height="${h}" fill="${i === 6 ? '#d96a3d' : '#1c1a17'}" opacity=".75"/>`).join('')}
    <line x1="12" y1="116" x2="168" y2="116" stroke="#1c1a17" stroke-width="1.5"/><text x="90" y="128" font-family="monospace" font-size="7" text-anchor="middle" fill="#8c857a">brightness buckets</text>
  </svg>`;
  if (kind === 'data') return `<svg ${common}>
    ${[30, 88, 54, 110, 72].map((h, i) => `<circle cx="${32 + i * 28}" cy="${116 - h}" r="${6 + i}" fill="${i === 3 ? '#d96a3d' : '#1c1a17'}" opacity=".8"/><line x1="${32 + i * 28}" y1="116" x2="${32 + i * 28}" y2="${116 - h}" stroke="#1c1a17" stroke-width="1" opacity=".35"/>`).join('')}
    <text x="90" y="126" font-family="monospace" font-size="7" text-anchor="middle" fill="#8c857a">rows → marks</text>
  </svg>`;
  if (kind === 'bias') return `<svg ${common}>
    <rect x="16" y="22" width="64" height="76" fill="#ddd"/><rect x="100" y="22" width="64" height="76" fill="#ddd"/>
    <circle cx="48" cy="58" r="20" fill="#e2a074"/><circle cx="132" cy="58" r="20" fill="#6f4630"/>
    <path d="M30 104 h36" stroke="#1f8a5b" stroke-width="4"/><path d="M114 104 h36" stroke="#d96a3d" stroke-width="4"/><text x="48" y="116" font-family="monospace" font-size="7" text-anchor="middle" fill="#1f8a5b">works</text><text x="132" y="116" font-family="monospace" font-size="7" text-anchor="middle" fill="#d96a3d">fails</text>
  </svg>`;
  if (kind === 'access') return `<svg ${common}>
    <rect x="22" y="24" width="54" height="84" fill="#d96a3d"/><text x="49" y="70" font-family="monospace" font-size="10" text-anchor="middle" fill="#c94f44">LOW</text>
    <rect x="104" y="24" width="54" height="84" fill="#1c1a17"/><text x="131" y="70" font-family="monospace" font-size="10" text-anchor="middle" fill="#f6f2ea">HIGH</text>
  </svg>`;
  if (kind === 'authorship') return `<svg ${common}>
    ${Array.from({ length: 24 }, (_, i) => `<circle cx="${18 + (i * 37) % 144}" cy="${18 + (i * 53) % 96}" r="${3 + (i % 5)}" fill="${i % 4 === 0 ? '#d96a3d' : '#1c1a17'}" opacity=".65"/>`).join('')}
    <text x="90" y="124" font-family="monospace" font-size="7" text-anchor="middle" fill="#8c857a">seed 42 · chosen output</text>
  </svg>`;
  if (kind === 'energy') return `<svg ${common}>
    <path d="M20 100 L46 48 L70 82 L94 24 L120 92 L146 40 L164 74" fill="none" stroke="#d96a3d" stroke-width="4"/>
    <rect x="20" y="106" width="130" height="10" fill="none" stroke="#1c1a17"/><rect x="20" y="106" width="92" height="10" fill="#1c1a17"/><text x="90" y="126" font-family="monospace" font-size="7" text-anchor="middle" fill="#8c857a">work / frame</text>
  </svg>`;
  if (kind === 'fractal') return `<svg ${common}>
    <path d="M90 120 V76 M90 76 L62 48 M90 76 L118 48 M62 48 L44 28 M62 48 L72 24 M118 48 L108 24 M118 48 L138 28" fill="none" stroke="#1c1a17" stroke-width="3" stroke-linecap="round"/>
    <circle cx="90" cy="76" r="4" fill="#d96a3d"/><text x="90" y="14" font-family="monospace" font-size="7" text-anchor="middle" fill="#8c857a">base case stops</text>
  </svg>`;
  return `<svg ${common}>
    ${Array.from({ length: 26 }, (_, i) => `<circle cx="${15 + (i * 29) % 150}" cy="${16 + (i * 47) % 96}" r="${4 + (i % 4)}" fill="${i % 5 === 0 ? '#d96a3d' : '#1c1a17'}" opacity="${0.35 + (i % 5) * 0.12}"/>`).join('')}
    <text x="90" y="124" font-family="monospace" font-size="7" text-anchor="middle" fill="#8c857a">particles.length changes</text>
  </svg>`;
}

function apRows(rows) {
  return rows.map(([label, badges]) => `<div class="ap-row"><span class="ap-label">${esc(label)}</span>${badges.map((b, i) => `<span class="ap-badge ${i === 0 ? 'strong' : 'partial'}">${esc(b)}</span>`).join('')}</div>`).join('');
}

function relatedCards(page) {
  const i = concepts.findIndex(([n]) => n === page.n);
  const prev = concepts[i - 1];
  const next = concepts[i + 1];
  const cards = [];
  if (prev) cards.push(`<a class="card" href="../${prev[1]}/index.html"><span class="meta">previous</span><h2>${prev[0]} - ${esc(prev[2])}</h2><p>Review the previous concept.</p></a>`);
  if (next) cards.push(`<a class="card" href="../${next[1]}/index.html"><span class="meta">next</span><h2>${next[0]} - ${esc(next[2])}</h2><p>Continue the sequence.</p></a>`);
  cards.push(`<a class="card" href="${page.sectionHref}"><span class="meta">section</span><h2>${esc(page.section.replace(/^§\\d+ /, ''))}</h2><p>See the movement overview.</p></a>`);
  return cards.join('');
}

function nav(page) {
  const i = concepts.findIndex(([n]) => n === page.n);
  const prev = concepts[i - 1];
  const next = concepts[i + 1];
  return `<div class="concept-nav">
    ${prev ? `<a class="nav-btn" href="../${prev[1]}/index.html"><span class="nav-dir">Previous concept</span><span class="nav-title">${prev[0]} - ${esc(prev[2])}</span></a>` : '<span></span>'}
    ${next ? `<a class="nav-btn next" href="../${next[1]}/index.html"><span class="nav-dir">Next concept</span><span class="nav-title">${next[0]} - ${esc(next[2])}</span></a>` : '<a class="nav-btn next" href="../../browse/index.html"><span class="nav-dir">Finished</span><span class="nav-title">Browse all 22</span></a>'}
  </div>`;
}

function html(page) {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${esc(page.title)} - CS Canvas</title>
  <meta name="description" content="${esc(page.lede)}" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Caveat:wght@600;700&family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="../../assets/styles.css" />
  <link rel="stylesheet" href="../../assets/lesson-pages.css" />
</head>
<body data-page="concepts">
  <header class="site-header">
    <a class="brand" href="../../index.html">CS Canvas</a>
    <nav><a href="../../index.html">Home</a><a class="active" href="../../concepts/index.html">Concepts</a><a href="../../sections/index.html">Sections</a><a href="../../languages/index.html">Languages</a><a href="../../browse/index.html">Browse</a><a href="../../teachers/index.html">Teachers</a><a href="../../about/index.html">About</a></nav>
  </header>
  <main>
    <section class="hero">
      <p class="kicker">Concept ${page.n} / 22 &nbsp;·&nbsp; ${esc(page.section)}</p>
      <h1>${esc(page.title)}</h1>
      <p class="lede">${esc(page.lede)}</p>
      <div class="actions" style="margin-top:20px">
        <a class="button primary" href="../../tools/sketch-playground/index.html">Try it in the Playground</a>
        <a class="button" href="${page.sectionHref}">Section overview</a>
      </div>
    </section>

    <section class="band split">
      <div>
        <p class="meta">Concept ${page.n} / 22</p>
        <h2>The big idea</h2>
        <p>${esc(page.bigIdea)}</p>
        <ul class="checklist">${page.checklist.map((item) => `<li>${esc(item)}</li>`).join('')}</ul>
      </div>
      <div class="mini-canvas" aria-hidden="true">${visual(page.visual)}</div>
    </section>

    <section class="band">
      <p class="meta" style="margin-bottom:16px">${esc(page.codeTitle)}</p>
      <div class="code-panes">
        ${codePane('p5', 'p5.js', page.p5)}
        ${codePane('canvas-api', 'Canvas API', page.canvas)}
        ${codePane('java', 'Processing / Java', page.java)}
      </div>
    </section>

    <section class="band columns">
      <article><h2>The canvas idea</h2><p>${esc(page.canvasIdea)}</p></article>
      <article><h2>Patterns to notice</h2><ul style="padding-left:18px;margin:0;line-height:2;font-size:13px">${page.patterns.map((item) => `<li>${esc(item)}</li>`).join('')}</ul></article>
      <article><h2>Teacher notes</h2><p>${esc(page.teacher)}</p></article>
    </section>

    <section class="band"><div class="callout"><strong>Common misconception:</strong> ${esc(page.misconception)}</div></section>

    <section class="band">
      <p class="meta" style="margin-bottom:12px">AP alignment</p>
      ${apRows(page.ap)}
    </section>

    <section class="band">
      <p class="meta" style="margin-bottom:14px">Related concepts</p>
      <div class="grid cards">${relatedCards(page)}</div>
    </section>

    <section class="band">${nav(page)}</section>
  </main>
  <footer class="site-footer">
    <span>CS Canvas - learn computer science by seeing code act on a canvas.</span>
    <span>p5.js - Canvas API - Processing Java</span>
  </footer>
  <script src="../../assets/site.js"></script>
</body>
</html>
`;
}

for (const page of pages) {
  const file = join(root, 'concepts', page.slug, 'index.html');
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, html(page));
  console.log(`wrote ${file}`);
}
