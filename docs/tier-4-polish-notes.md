# Tier 4 Polish Notes

## Visual Thumbnail Concepts

Use simple inline SVG thumbnails that match the existing mini-canvas language: cream background, dark ink strokes, orange accent, and one clear concept signal. These are concepts only; wiring can happen later in card templates.

### Resource Cards

- **Concept bridge**: three small nodes connected by an orange arrow, showing one idea moving into another.
- **Classroom tool**: a compact control panel with one slider, one button, and a tiny output grid.
- **Starter sketch**: a framed canvas with one expressive mark and one accent dot.
- **Teacher resource**: a clipboard sheet with three check rows and one small AP badge.
- **Language track**: three stacked code tabs labeled p5, Canvas, Java.
- **CC Fest / origin**: a workshop table shape with small canvas tiles around it.

### Section Cards

- **Start with the Canvas**: x/y axes with a circle at a plotted coordinate.
- **Make It Move**: three ghosted circles along a motion path.
- **Make It Respond**: cursor arrow touching a button zone.
- **Make Systems**: looped arrows around a 3x3 grid.
- **Data as Material**: four bars mapped from a small data row.
- **Computing in the World**: split before/after panel with contrast or bias check marks.
- **Algorithms**: branching recursive tree or particle trail.

### Implementation Guidance

- Keep thumbnails decorative with `aria-hidden="true"` unless the card has no text equivalent.
- Prefer one reusable `card-thumb` wrapper and a `data-thumb` key over bespoke SVG inside every card.
- Use stable viewBox dimensions, ideally `viewBox="0 0 180 120"`, so cards do not shift.
- Avoid text inside thumbnails except very short labels like `p5`, `API`, or `Java`.
- Use `currentColor` for ink marks and `var(--accent)` or `#d96a3d` for the single accent signal.

## Wireframes Public Link Decision

Decision: keep `wireframes.html` and the JSX wireframe files in the repository as an internal design archive, but do not link them from public navigation, Browse, or the homepage.

Rationale:

- The production site has moved beyond the wireframe scaffold.
- Public learners and teachers should land on authored pages, not planning artifacts.
- Keeping the file locally is still useful for design archaeology and future layout comparisons.

If the site ever needs public design documentation, create a polished `/about/design-notes/` page instead of exposing `wireframes.html` directly.
