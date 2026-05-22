# Coding the Canvas Progress

Last updated: May 22, 2026

## Live Site

- Repository: https://github.com/saberkhan372/coding-the-canvas
- GitHub Pages: https://saberkhan372.github.io/coding-the-canvas/
- Publishing source: `main` branch, repository root

## Current State

Coding the Canvas is a static GitHub Pages site for the CS Canvas / CC Fest curriculum. The site has a root homepage, concept pages, section pages, language pages, bridge pages, tool pages, teacher resources, search/browse pages, and a wireframe preview.

The working tree currently has 65 HTML files with local links verified clean. `main` is aligned with `origin/main`, but there are uncommitted local changes: Claude's expanded teacher resource pages, bridge/tool/footer cleanup, the bridge/tool generator patch, and handoff docs.

Current local counts:

- 22 concept pages
- 8 section folders, including `sections/impact/` as an alias
- 10 teacher resource pages
- 5 language/setup pages
- 3 bridge pages
- 3 tool pages
- 65 total HTML files

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
  - `tools/sketch-playground/`
  - `tools/for-loop-stepper/`
  - `tools/share-export/`
  - `cc-fest/`
- Each page currently has a consistent generated structure: short explanation, workflow/flow steps, teacher notes or classroom notes, one code sample, mock visual/tool panel where relevant, and related page cards.
- These pages are useful placeholders with real content, but they are still thin compared with the larger teacher resource pages and should be treated as a first pass.
- Local footer consistency has been fixed on bridge/tool/CC Fest pages: em dash in the site tagline and middle dots between language names.
- Bridge/tool pages now use `data-page="browse"` because they sit most naturally under Browse.
- Added `assets/resource-pages.css`.
- Added and patched `scripts/write-bridge-tool-pages.mjs` so regenerated bridge/tool pages preserve the footer and Browse active-state fixes.

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
- AP CSA broken `pixel-grid` link has been fixed locally to `concepts/pixels-image-data/`.
- AP CSA stale labels were mostly updated to the current 22-concept map. Remaining minor cleanup:
  - `12–15 §5` should become `11–16 §5`.
  - `Histograms` should consistently become `Histograms & Sampling`.
  - The `Binary as Pixels` U8 description may still read like the old Filters wording.

## Validation Performed

- Local link checks across all 65 HTML files currently report no broken local `href` or `src` references.
- Local DOM checks were run against selected local pages while a local server was available.
- GitHub Pages build status was checked through the GitHub API during deployment work.
- Teacher-page link checks currently pass.
- AP CSA teacher page concept references were mostly cleaned up; minor terminology cleanup remains.

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

## Recent Commits

- `37309d6` Replace scaffold copy with public site content
- `74f75e0` Standardize concept code editor sections
- `2097813` Add editor controls for code snippets
- `ab8d101` Add split canvas preview to code editors
- `5988aef` Build out bridge and tool resource pages (ChatGPT)
- (uncommitted) All 10 teacher resource pages + AP CSA concept reference cleanup
- (uncommitted) Bridge/tool/CC Fest footer and `data-page` cleanup
- (uncommitted) `PROJECT_PROGRESS.md` and `ONBOARDING.md` handoff docs

## Remaining / Suggested Next Work

### Immediate
- **Commit** the current local work once reviewed:
  - Claude's 10 expanded teacher pages
  - AP CSA concept reference cleanup
  - bridge/tool/footer and `data-page` cleanup
  - `scripts/write-bridge-tool-pages.mjs` patch
  - `PROJECT_PROGRESS.md` and/or `ONBOARDING.md`
- Finish minor AP CSA terminology cleanup:
  - `12–15 §5` → `11–16 §5`
  - `Histograms` → `Histograms & Sampling`
  - refine the `Binary as Pixels` U8 mapping sentence if needed

### Near-term
- Add copy buttons to Processing / Java code panels (p5.js and Canvas API already have them).
- Add automated link validation script (check all href="../..." paths resolve).

### If expanding bridge/tool pages
- Bridge pages are thin (~72 lines). Could expand each to ~150 lines with: deeper conceptual explanation, before/after code comparison, student misconception section.
- Tool pages describe workflows but have no real interactivity. For Loop Stepper is the best candidate for an actual interactive tool.

### Lower priority
- Add visual screenshots or thumbnails to resource/section cards.
- Decide whether the wireframe preview (`wireframes/`) should remain publicly linked.
- Review all concept copy for terminology consistency with the corrected concept directory map.
