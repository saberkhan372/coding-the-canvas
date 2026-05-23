# Coding the Canvas Progress

Last updated: May 22, 2026

## Live Site

- Repository: https://github.com/saberkhan372/coding-the-canvas
- GitHub Pages: https://saberkhan372.github.io/coding-the-canvas/
- Publishing source: `main` branch, repository root

## Current State

Coding the Canvas is a static GitHub Pages site for the Coding the Canvas / CC Fest curriculum. The site has a root homepage, concept pages, section pages, language pages, bridge pages, tool pages, teacher resources, search/browse pages, and an internal wireframe archive.

All work through Tier 1–4 polish is committed locally. `main` is ahead of `origin/main` until the latest commit is pushed.

Current counts:

- 22 concept pages
- 8 section folders, including `sections/impact/` as an alias
- 10 teacher resource pages
- 5 language/setup pages
- 6 bridge pages (arrays, modulo, pattern-logic, objects, push-pop, state-machines) plus 1 reusable bridge-page template
- 6 tool pages (for-loop-stepper, pattern-logic-explorer, noise-random-explorer, data-story-planner, sketch-playground, share-export) plus an expanded tools index
- 15 starter sketch pages plus `sketches/index.html`
- 85+ total HTML files

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
  - `bridges/objects-bridge/` (184 lines)
  - `bridges/push-pop-bridge/` (expanded, inaccurate cross-frame drift claim corrected)
  - `bridges/state-machines-bridge/` (232 lines — SVG diagram, before/after, demo script)
  - `tools/sketch-playground/`
  - `tools/for-loop-stepper/` (real JS stepper — step/reset, canvas, code highlighting)
  - `tools/share-export/`
  - `tools/pattern-logic-explorer/` (real JS — 6 live rules, 1D row + 2D grid SVG)
  - `tools/noise-random-explorer/` (real animation — 4 modes, value noise, speed slider)
  - `tools/data-story-planner/` (interactive — editable fields, live map() call, copy)
  - `cc-fest/`
- Each bridge page: misconception callout, before/after code comparison, bridge moves, vocabulary, AP connection, code sample, 3-minute demo script.
- All four primary tool pages now have real JavaScript interactivity (Tier 2 complete).
- Local footer consistency has been fixed across the site: em dash in the site tagline and middle dots between language names.
- Bridge/tool pages now use `data-page="browse"` because they sit most naturally under Browse.
- Added `assets/resource-pages.css`.
- Added and patched `scripts/write-bridge-tool-pages.mjs` so regenerated bridge/tool pages preserve the footer and Browse active-state fixes.

### Starter Sketches and Tool Taxonomy

- Added a `sketches/` area with 15 starter sketches:
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
  - Modulo Orbit Clock
  - Screen State Switcher
  - Pixel Mood Grid
  - Accessible Pattern Poster
  - Recursive Branch Garden
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
  - Generates the starter sketch library and the 15 individual sketch pages.
  - Keeps sketch pages linked back into concepts, sections, bridges, and tools.

## Recent Commits

- `4e998c9` Add state-machines bridge and expand bridge content (ChatGPT Tier 3)
- `fb2b45b` Tier 2: Add real JS interactivity to all four tool pages
- `a524931` Tier 1 housekeeping: add bridge pages, fix indexes, update project docs
- `4588f09` Add three local tool pages and unify tools index
- `e1258e2` Add Copy Java button to Processing/Java code panels via site.js
- `1b1691a` Fix browse page nav missing Tools and Sketches links
- `bdfev87` Fix hardcoded active class on Browse nav link in bridge template
- `8267918` Add CC Fest pedagogy layer across teacher resources and bridge pages

## Remaining / Suggested Next Work

### Tier 1 — Housekeeping ✅ Complete
- [x] Fix `bridges/index.html` — all 6 bridge pages linked
- [x] Add individual bridge + tool cards to `browse/index.html`
- [x] Update `scripts/write-directory-pages.mjs` so bridge/tool cards survive regeneration
- [x] Commit `objects-bridge` and `push-pop-bridge`
- [x] Write content for `bridges/state-machines-bridge/`

### Tier 2 — Tool Interactivity ✅ Complete
- [x] **For Loop Stepper** — step/reset, phase tokens, code highlighting, canvas
- [x] **Pattern Logic Explorer** — 6 live rules, 1D row + 2D grid SVG
- [x] **Noise vs Random Explorer** — live animation, 4 modes, speed slider
- [x] **Data Story Planner** — editable fields, live map() call, copy buttons

### Tier 3 — Bridge Content Depth ✅ Complete
- [x] Expand `arrays-one-thing-to-many-things` — before/after, misconception (→198 lines)
- [x] Expand `modulo-bridge` (→190 lines)
- [x] Expand `pattern-logic` bridge (→199 lines)
- [x] Correct `push-pop-bridge` — removed inaccurate cross-frame drift claim
- [x] Write `state-machines-bridge` (232 lines)

### Tier 4 — Polish / Lower Priority
- [ ] Automated link validation script (check all `href="../..."` paths resolve)
- [x] Add visual thumbnail concepts for resource/section cards (documented in `docs/tier-4-polish-notes.md`; wiring still separate)
- [x] Terminology consistency pass across 22 concept pages (ChatGPT)
- [x] Decide whether wireframe preview (`wireframes.html`) stays publicly linked — keep as an internal archive, not public nav
- [x] More starter sketches beyond the original 10 (15 total)
