# Coding the Canvas Progress

Last updated: May 22, 2026 (updated)

## Live Site

- Repository: https://github.com/saberkhan372/coding-the-canvas
- GitHub Pages: https://saberkhan372.github.io/coding-the-canvas/
- Publishing source: `main` branch, repository root

## Current State

Coding the Canvas is a static GitHub Pages site for the Coding the Canvas / CC Fest curriculum. The site has a root homepage, concept pages, section pages, language pages, bridge pages, tool pages, teacher resources, search/browse pages, and a wireframe preview.

The working tree currently has 81+ HTML files with local links verified clean. All prior work has been committed and pushed. Two new bridge pages (`objects-bridge`, `push-pop-bridge`) are untracked and pending commit. Three new tool pages (`pattern-logic-explorer`, `noise-random-explorer`, `data-story-planner`) and a `state-machines-bridge` folder (no content yet) are also present locally.

Current local counts:

- 22 concept pages
- 8 section folders, including `sections/impact/` as an alias
- 10 teacher resource pages
- 5 language/setup pages
- 5 bridge pages plus 1 reusable bridge-page template (`state-machines-bridge` folder exists but has no index.html yet)
- 6 tool pages plus an expanded tools index
- 10 starter sketch pages plus `sketches/index.html`
- 81+ total HTML files

## Major Work Completed

### Repository and Deployment

- Initialized a local Git repo in `/Users/saberkhan/Documents/coding/Coding The Canvas`.
- Created and pushed the GitHub repo `saberkhan372/coding-the-canvas`.
- Enabled GitHub Pages from `main` branch root.
- Added `.nojekyll` for static publishing.
- GitHub Pages was enabled from the `main` branch root.

### Homepage and Public Copy

- Replaced the original scaffold/Claude-task homepage copy with audience-facing messaging.
- Homepage now explains the project for learners, teachers, and makers.
- Rewrote scaffold-style public pages that said “What this page needs.”
- Added `scripts/update-public-copy.mjs` to regenerate public copy while preserving authored resource pages.

### Concepts

- All 22 concept pages exist and are authored.
- Concepts are grouped across 7 sections:
  - Start with the Canvas
  - Make It Move
  - Make It Respond
  - Make Systems
  - Data as Material
  - Computing in the World
  - Algorithms
- Concept pages include big ideas, visuals, code sections, teaching notes, AP alignment, misconceptions, related links, and previous/next navigation.
- Added `assets/lesson-pages.css` for shared concept/section styling.
- Added `scripts/write-remaining-concepts.mjs` for generated concept pages 12-22.

### Code Editor Sections

- Standardized concept code sections across all 22 concept pages.
- Each concept now has:
  - p5.js editor-style panel
  - Canvas API editor-style panel
  - Processing / Java code panel
- p5.js and Canvas API panels now have:
  - Play button
  - Stop button
  - Export button
  - Right-side canvas preview area
- p5.js export copies the snippet and opens `editor.p5js.org`.
- Canvas API export copies a runnable canvas HTML shell and opens CodePen.
- Play runs snippets inside a sandboxed iframe preview:
  - p5.js loads p5 from CDN
  - Canvas API gets a minimal canvas shell

### Sections

- All 7 section pages are live and authored.
- Section pages include concept cards, SVG illustrations, stat rows, AP alignment strips, teacher/learner framing, misconceptions, and previous/next navigation.
- Added `sections/impact/` as an alias for `sections/computing-in-the-world/`.

### Directory Pages

- Upgraded:
  - `concepts/index.html`
  - `sections/index.html`
  - `browse/index.html`
- Added richer directory layouts, stats, section rails, movement blocks, cards, and browse facets.
- Added `assets/directory-pages.css`.
- Added `scripts/write-directory-pages.mjs`.
- Enhanced `assets/site.js` with active nav and live filtering.

### Bridges, Tools, and CC Fest

- Expanded the scaffold bridge/tool pages into lightweight resource pages:
  - `bridges/arrays-one-thing-to-many-things/`
  - `bridges/modulo-bridge/`
  - `bridges/pattern-logic/`
  - `bridges/objects-bridge/` (184 lines — pending commit)
  - `bridges/push-pop-bridge/` (158 lines — pending commit)
  - `bridges/state-machines-bridge/` (folder only, no index.html yet)
  - `tools/sketch-playground/`
  - `tools/for-loop-stepper/` (70 lines — stub only, no real interactivity)
  - `tools/share-export/`
  - `tools/pattern-logic-explorer/` (177 lines — static mock, no real JS interactivity)
  - `tools/noise-random-explorer/` (162 lines — static mock, no real JS interactivity)
  - `tools/data-story-planner/` (186 lines — static mock, no real JS interactivity)
  - `cc-fest/`
- Each page currently has a consistent generated structure: short explanation, workflow/flow steps, teacher notes or classroom notes, one code sample, mock visual/tool panel where relevant, and related page cards.
- Tool pages are still static mocks with no real JavaScript interactivity — building out real interactivity is the primary Tier 2 task.
- Local footer consistency has been fixed across the site: em dash in the site tagline and middle dots between language names.
- Bridge/tool pages now use `data-page="browse"` because they sit most naturally under Browse.
- Added `assets/resource-pages.css`.
- Added and patched `scripts/write-bridge-tool-pages.mjs` so regenerated bridge/tool pages preserve the footer and Browse active-state fixes.

### Starter Sketches and Tool Taxonomy

- Added a new `sketches/` area with 10 starter sketches:
  - Visual Hello Postcard
  - Bouncing Ball Starter
  - Mouse Trail Drawing
  - Click-to-Create Shapes
  - Color From Position
  - Noise Walker
  - Function Creature Stamp
  - Data Self-Portrait
  - Simple Collision Game
  - Particle System Seed
- Each starter sketch includes a p5.js seed, teacher framing, Foundation / Exploration / Classroom Adaptation prompts, and related lesson links.
- Rewrote `tools/index.html` around the six-suit CC Fest taxonomy: Marks, Motion, Systems, Data, Open, Support.
- Added `bridges/bridge-page-template/` as a reusable structure for future bridge pages: misconception, discussion question, vocabulary, paired tool/sketch, and 3-minute demo.
- Added Tools and Sketches to the sitewide nav and browse/search entry points.
- Added `scripts/write-starter-sketches.mjs` to regenerate the sketch index and starter sketch pages.

### Teacher and Language Pages

- All 10 teacher resource pages are fully built out (150–452 lines each):
  - `ap-csp/` — coverage matrix (5 Big Ideas × 22 concepts), CSN gap callout, Create PT section, FAQ
  - `ap-csa/` — coverage matrix (10 units × 22 concepts), U8 pixel callout, FRQ recipes, FAQ; concept directory names verified and corrected
  - `curriculum-guide/` — 7-section sequence table, learning objectives, 5 suggested sequences
  - `pacing-guides/` — 4 pacing strips (1-week bootcamp, 18-week semester, 36-week AP CSP, 36-week AP CS A)
  - `assessment-rubrics/` — Reproduce/Modify/Extend rubric, 6 section checkpoint cards
  - `lesson-plan-template/` — 5-phase structure (Hook→Demo→Practice→Remix→Checkpoint)
  - `portfolio-template/` — student-facing 4-part entry template, grading guidance
  - `create-performance-task/` — 3 CPT starter recipes, 6-milestone timeline
  - `companion-resources/` — CSN resources, §6 enrichment, optional enrichment
  - `frq-practice/` — 4 FRQ types with Processing Java code prompts
- Language pages exist for: p5.js, Canvas API, Processing Java, Hello Canvas, Setup guides
- AP CSA's former `pixel-grid` link was fixed to `concepts/pixels-image-data/`.
- AP CSA stale labels were updated to the current 22-concept map.
- Sitewide header brand now reads `Coding the Canvas`.
- `assets/favicon.svg` is linked from all 77 HTML pages.

## Validation Performed

- Local link checks across all 77 HTML files currently report no broken local `href` or `src` references.
- Local DOM checks were run against selected local pages while a local server was available.
- GitHub Pages build status was checked through the GitHub API during deployment work.
- Teacher-page link checks currently pass.
- AP CSA teacher page concept references are aligned with the current concept map.
- All 77 HTML pages currently include the favicon link.
- All non-wireframe HTML pages currently include Tools and Sketches in the top navigation.

## Important Scripts

- `scripts/generate-site.mjs`
  - Original static scaffold generator.
  - Patched to avoid overwriting authored pages/assets.
- `scripts/write-remaining-concepts.mjs`
  - Generates authored concept pages 12-22.
- `scripts/write-directory-pages.mjs`
  - Generates richer Concepts, Sections, and Browse index pages.
- `scripts/update-public-copy.mjs`
  - Updates public copy while preserving authored resource pages.
- `scripts/update-code-sections.mjs`
  - Converts concept code sections to the standardized editor format.
- `scripts/write-bridge-tool-pages.mjs`
  - Generates bridge, tool, and CC Fest resource pages.
  - Locally patched to keep footer punctuation and `data-page="browse"` consistent.
- `scripts/write-starter-sketches.mjs`
  - Generates the starter sketch library and the 10 individual sketch pages.
  - Keeps sketch pages linked back into concepts, sections, bridges, and tools.

## Recent Commits

- `4588f09` Add three local tool pages and unify tools index
- `e1258e2` Add Copy Java button to Processing/Java code panels via site.js
- `1b1691a` Fix browse page nav missing Tools and Sketches links
- `bdfeb87` Fix hardcoded active class on Browse nav link in bridge template
- `8267918` Add CC Fest pedagogy layer across teacher resources and bridge pages
- `5fed085` Replace CS Canvas with Coding the Canvas in all prose and docs
- `4dcbf64` Rename CS Canvas → Coding the Canvas site-wide
- `c6f988d` Update site branding and favicon
- `8e7c517` Fix bridge/tool footer punctuation and add project docs
- `19093e4` Build out all 10 teacher resource pages

## Remaining / Suggested Next Work

### Tier 1 — Housekeeping (in progress)
- [x] Fix `bridges/index.html` — add cards for objects-bridge and push-pop-bridge
- [x] Add individual bridge + tool cards to `browse/index.html`
- [x] Update `PROJECT_PROGRESS.md` to reflect current reality
- [ ] Commit `objects-bridge` and `push-pop-bridge` to git
- [ ] Write content for `bridges/state-machines-bridge/` (folder exists, no index.html)

### Tier 2 — Tool Interactivity (biggest gap — Claude)
- [ ] **For Loop Stepper** — build real JS: step/reset buttons, live `i` counter, canvas draws one dot per step
- [ ] **Pattern Logic Explorer** — sliders for modulo + offset, live p5-in-iframe preview
- [ ] **Noise vs Random Explorer** — toggle button, side-by-side canvas comparison
- [ ] **Data Story Planner** — decide UX scope (form-based? visual?), then build

### Tier 3 — Bridge Content Depth (ChatGPT)
- [ ] Expand `arrays-one-thing-to-many-things` — before/after code, misconception section (147 → ~220 lines)
- [ ] Expand `modulo-bridge` same way
- [ ] Expand `pattern-logic` bridge
- [ ] Decide if `objects-bridge` + `push-pop-bridge` need rewriting vs. expanding
- [ ] Write content for `state-machines-bridge`

### Tier 4 — Polish / Lower Priority
- [ ] Automated link validation script (check all `href="../..."` paths resolve)
- [ ] Add visual thumbnails to resource/section cards (ChatGPT SVG, Claude wires in)
- [ ] Terminology consistency pass across 22 concept pages (ChatGPT)
- [ ] Decide whether wireframe preview (`wireframes.html`) stays publicly linked
- [ ] More starter sketches beyond the current 10 (ChatGPT)
