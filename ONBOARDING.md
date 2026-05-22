# CS Canvas — Project Onboarding

**What this is:** A static GitHub Pages site teaching computer science through creative coding. Every concept produces a visible canvas artifact. Three languages throughout: p5.js, Canvas API, Processing (Java).

- **Repo:** https://github.com/saberkhan372/coding-the-canvas
- **Live site:** https://saberkhan372.github.io/coding-the-canvas/
- **Local path:** `/Users/saberkhan/Documents/coding/Coding The Canvas/`
- **Publishing:** `main` branch root → GitHub Pages (`.nojekyll` present)

---

## Site Structure (65 HTML files)

```
index.html                    homepage
start/                        choose-a-path landing
about/                        about page
browse/                       filterable site atlas
search/                       search page
concepts/                     22 concept pages (see map below)
sections/                     7 section pages
languages/                    5 language pages (p5js, canvas-api, processing-java, hello-canvas, setup)
teachers/                     10 teacher resource pages
bridges/                      3 bridge pages (concept connectors)
tools/                        3 tool pages
cc-fest/                      CC Fest origin page
```

---

## The 22 Concepts — Exact Directory Names

This map is critical. **The directory names do not match the concept numbers** in any predictable way — always use this table.

| # | Directory | Title |
|---|---|---|
| 01 | `coordinates` | Coordinates |
| 02 | `shapes-and-color` | Shapes & Color |
| 03 | `draw-loop-time` | Draw Loop / Time |
| 04 | `mouse-input` | Mouse Input |
| 05 | `conditionals` | Conditionals |
| 06 | `for-loops-and-grids` | For Loops & Grids |
| 07 | `functions` | Functions |
| 08 | `arrays` | Arrays |
| 09 | `objects` | Objects |
| 10 | `state-machines` | State Machines |
| 11 | `pixels-image-data` | Pixels / Image Data |
| 12 | `color-is-24-bits` | Color is 24 Bits |
| 13 | `binary-as-pixels` | Binary as Pixels |
| 14 | `compression-by-drawing` | Compression by Drawing |
| 15 | `histograms-and-sampling` | Histograms & Sampling |
| 16 | `data-as-material` | Data as Material |
| 17 | `bias-in-a-filter` | Bias in a Filter |
| 18 | `color-and-accessibility` | Color & Accessibility |
| 19 | `whose-authorship` | Whose Authorship? |
| 20 | `energy-of-a-sketch` | Energy of a Sketch |
| 21 | `recursion-as-fractals` | Recursion as Fractals |
| 22 | `arraylist-in-action` | ArrayList in Action |

**Sections:**
- §1 Start with the Canvas: 01–02
- §2 Make It Move: 03
- §3 Make It Respond: 04–05
- §4 Make Systems: 06–10
- §5 Data as Material: 11–16
- §6 Computing in the World: 17–20
- §7 Algorithms: 21–22

---

## AP Coverage (used in teacher pages)

**AP CSP Big Ideas:**
- CRD (Creative Development): strong in all 22 concepts
- DAT (Data): strong in §5 (11–16), partial elsewhere
- AAP (Algorithms & Programming): strong in §1–§4 and §7
- CSN (Networks): **not covered** — teachers bring their own ~3-week unit
- IOC (Impact of Computing): strong in §6 (17–20)

**AP CS A Units (all 10 covered via Processing Java):**
- U1 Primitive Types → 01 Coordinates, 02 Shapes & Color
- U2 Using Objects → 04 Mouse Input, 09 Objects, 10 State Machines
- U3 Boolean & if → 05 Conditionals
- U4 Iteration → 03 Draw Loop, 06 For Loops & Grids
- U5 Writing Classes → 07 Functions, 09 Objects, 10 State Machines
- U6 Array → 08 Arrays
- U7 ArrayList → **22 ArrayList in Action** (dynamic particle lists)
- U8 2D Array → **11 Pixels / Image Data**, 13 Binary as Pixels, 15 Histograms & Sampling
- U9 Inheritance → 09 Objects, 10 State Machines (partial)
- U10 Recursion → **21 Recursion as Fractals**

---

## HTML Conventions

### Page template
```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>[Page Title] - Coding the Canvas</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Caveat:wght@600;700&family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="[path]/assets/styles.css" />
</head>
<body data-page="[section]">   <!-- teachers | about | browse | etc. -->
  <header class="site-header">
    <a class="brand" href="[path]/index.html">Coding the Canvas</a>
    <nav>
      <a href="[path]/index.html">Home</a>
      <a href="[path]/concepts/index.html">Concepts</a>
      <a href="[path]/sections/index.html">Sections</a>
      <a href="[path]/languages/index.html">Languages</a>
      <a href="[path]/browse/index.html">Browse</a>
      <a class="active" href="[path]/teachers/index.html">Teachers</a>
      <a href="[path]/about/index.html">About</a>
    </nav>
  </header>
  <main>
    <!-- sections here -->
  </main>
  <footer class="site-footer">
    <span>Coding the Canvas — learn computer science by seeing code act on a canvas.</span>
    <span>p5.js · Canvas API · Processing Java</span>
  </footer>
  <script src="[path]/assets/site.js"></script>
</body>
</html>
```

### Footer — exact characters matter
- Em dash `—` (not hyphen `-`) in the first span
- Middle dot `·` (not hyphen or bullet) between language names
- Bridge/tool pages should use `data-page="browse"` because they sit under the Browse area.
- Include `<link rel="icon" href="[path]/assets/favicon.svg" type="image/svg+xml" />` in every page head.

### CSS variables
```
--paper:  #f6f2ea  (warm off-white, page backgrounds)
--ink:    #1c1a17  (near-black, text + borders)
--edge:   #ece5d6  (light warm grey, dividers)
--accent: #d96a3d  (terracotta orange, highlights)
--soft:   #4a4640  (medium grey, secondary text)
--faint:  #8c857a  (light grey, meta/captions)
--hand:   Caveat (display/handwritten)
--mono:   JetBrains Mono
--body:   Inter
```

### Layout classes (from styles.css)
- `.band` — main content block (bordered card with shadow)
- `.split` — two-column grid (1.15fr / 0.85fr)
- `.columns` — three-column grid
- `.grid.cards` — auto-fit card grid
- `.hero` — full-width intro section
- `.checklist` — styled bullet list
- `.mini-canvas` — right-side SVG illustration panel
- `.button.primary` — accent-filled CTA button

---

## What's Done vs. What's Thin

### ✅ Complete and solid
- All 22 concept pages (editor controls, 3-language tabs, AP alignment, prev/next nav)
- All 7 section pages
- All 10 teacher resource pages (150–452 lines each, substantial content):
  - `teachers/ap-csp/` — coverage matrix (5 Big Ideas × 22 concepts), CSN gap analysis, Create PT section, FAQ
  - `teachers/ap-csa/` — coverage matrix (10 units × 22 concepts), U8 pixel callout, FRQ recipes, FAQ
  - `teachers/curriculum-guide/` — section sequence, learning objectives, 5 suggested sequences
  - `teachers/pacing-guides/` — 4 pacing strips (bootcamp, semester, AP CSP year, AP CS A year)
  - `teachers/assessment-rubrics/` — Reproduce/Modify/Extend rubric, 6 section checkpoint cards
  - `teachers/lesson-plan-template/` — 5-phase structure (Hook→Demo→Practice→Remix→Checkpoint)
  - `teachers/portfolio-template/` — student-facing entry template, grading guidance
  - `teachers/create-performance-task/` — 3 CPT starter recipes, 6-milestone timeline
  - `teachers/companion-resources/` — CSN resources, §6 enrichment, optional enrichment
  - `teachers/frq-practice/` — 4 FRQ types with Processing Java prompts
- Browse/directory pages
- Language pages (p5js, canvas-api, processing-java, hello-canvas, setup)

### ⚠️ Thin — first-pass/template-generated (70–75 lines each)
These exist and have real content but are much shallower than the teacher pages:
- `bridges/arrays-one-thing-to-many-things/` — 3-step workflow, code sample, notes
- `bridges/modulo-bridge/` — 3-step workflow, code sample, notes
- `bridges/pattern-logic/` — 3-step workflow, code sample, notes
- `tools/sketch-playground/` — classroom workflow, mock tool visual, notes
- `tools/for-loop-stepper/` — thin
- `tools/share-export/` — thin
- `cc-fest/` — CC Fest origin story, thin

### 🐛 Known issues / watch items
- Bridge/tool/CC Fest pages are still thin first-pass pages even though their links and footer formatting are now locally clean.
- Generated by `scripts/write-bridge-tool-pages.mjs`; the script has been patched locally to preserve footer punctuation and `data-page="browse"`.

---

## What Needs to Happen Next

### Priority 1 — Visual smoke test core pages
After broad markup changes, check the homepage, one concept page, one section page, one teacher resource page, Browse, and one bridge/tool page.

### Priority 2 — Flesh out bridge pages (if desired)
The 3 bridge pages are useful placeholders but much thinner than the teacher pages. Each could be expanded to ~150–200 lines with:
- Deeper explanation of the conceptual shift
- Side-by-side before/after code examples
- Student misconceptions section
- Connections to specific AP exam questions

### Priority 3 — Flesh out tool pages (if desired)
The 3 tool pages describe workflows but don't have real interactivity. Options:
- Keep as workflow docs (low effort, acceptable)
- Add actual embedded editors (high effort, significant UX improvement)
- For Loop Stepper could be a real interactive tool (step through a loop visually)

### Priority 5 — Add copy buttons to Processing/Java panels
The p5.js and Canvas API panels already have copy-to-clipboard via the export button. Processing/Java panels don't. Add a copy button to each Java panel so students can paste into the Processing IDE.

### Priority 6 — Validation script
Add a script that checks:
- All `href="...index.html"` links resolve to real files
- All concept pages have editor controls (play/stop/export buttons present)
- No page uses wrong footer format (hyphens instead of em-dashes)

---

## Scripts in `/scripts/`

| Script | Purpose |
|---|---|
| `generate-site.mjs` | Original scaffold generator — patched to not overwrite authored pages |
| `write-remaining-concepts.mjs` | Generated concept pages 12–22 |
| `write-directory-pages.mjs` | Generates Concepts, Sections, Browse index pages |
| `update-public-copy.mjs` | Updates public copy, preserves authored resource pages |
| `update-code-sections.mjs` | Converts concept code sections to standardized editor format |
| `write-bridge-tool-pages.mjs` | Generated bridge/tool/cc-fest pages — **re-running overwrites** |

---

## Recent Commit History

```
5988aef  Build out bridge and tool resource pages (ChatGPT)
ab8d101  Add split canvas preview to code editors
2097813  Add editor controls for code snippets
74f75e0  Standardize concept code editor sections
37309d6  Replace scaffold copy with public site content
2b001b4  Publish CS Canvas static site
```

**Uncommitted at time of writing:** all 10 teacher resource pages + ap-csa concept reference fixes
