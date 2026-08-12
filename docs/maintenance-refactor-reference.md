# Maintenance Refactor Reference

This document records the agreed cleanup direction for the current Stage 2
site. It is a reference for the next implementation passes, not a request to
redesign the pages or replace their hand-authored structure.

## Goal

Improve maintainability by removing dead code, fixing duplicated sources of
truth, and extracting only genuinely shared CSS primitives. Preserve the
distinctive editorial layout of each route.

The target is not to move all CSS into `src/assets/styles/global.css`. Global
CSS should contain site-wide foundations and a small number of exact shared
primitives. Page-specific layout, responsive composition, image crops,
interactions, and animation should remain close to the page that owns them.

## Current Architecture

The current public routes are five static Astro pages:

- `/`
- `/custom-cakes/`
- `/cupcakes/`
- `/pastries/`
- `/cookies/`

The four category pages are intentionally hand-authored because their visual
layouts and interactions differ. They already share the site shell, catalogue
data, breadcrumbs, WhatsApp CTA behavior, metadata, and schema builders.

Current route-level style sizes are useful as a baseline, not as a reason to
merge pages:

| File | Approximate style block |
| --- | ---: |
| `src/pages/custom-cakes.astro` | 385 lines |
| `src/pages/cupcakes.astro` | 327 lines |
| `src/pages/pastries.astro` | 535 lines |
| `src/pages/cookies.astro` | 411 lines |

The repeated CSS mostly consists of small primitives such as section rhythm,
image-cover behavior, label typography, flex-column stacks, and rose surfaces.
The surrounding grids and compositions are page-specific and should not be
abstracted only because they use similar CSS properties.

## Agreed Refactor Sequence

Work through these steps in order. Run `npm run astro check` after each
logical group and use `npm run build` for the final comparison.

### 1. Remove unused code

Confirm that the old generic category tree is unused, then remove it rather
than maintaining two category-page architectures:

- `src/components/shared/CategoryPage.astro`
- `src/components/shared/SignatureBand.astro`
- `src/components/shared/Collage.astro`
- `src/components/shared/CollageItem.astro`
- `src/components/shared/RelatedLinks.astro`

Before deleting, search all imports and references. Do not remove anything
that has become used since this document was written.

### 2. Remove obsolete catalogue fields

After the unused category tree is removed, identify fields in
`src/data/catalogue.ts` that exist only to support it. Remove those fields and
their values, then let TypeScript identify any remaining consumers.

Do not remove data that is used by visible current-page HTML or current schema.

### 3. Fix schema drift

Make visible product data and structured data agree. In particular, inspect
the independently authored display arrays in:

- `src/pages/custom-cakes.astro`
- `src/pages/cupcakes.astro`
- `src/pages/cookies.astro`

Choose the smallest correct source-of-truth arrangement. Do not emit
`ItemList` entries that do not represent visible page content. Keep schema
values factual, crawlable, and synchronized with the rendered HTML.

### 4. Fix progressive scroll reveal

Content must remain visible if JavaScript fails, is blocked, or is delayed.
The reveal enhancement should opt into hidden/animated initial styles only
after JavaScript has confirmed that it is available. Reduced-motion behavior
must continue to show content without animation.

Do not hide load-bearing SEO or AI-discoverability content behind JavaScript.

### 5. Normalize design tokens

Review `src/assets/styles/global.css` and remove overlapping or ambiguous token
names before extracting more primitives. Decide which active tokens represent:

- page and surface backgrounds
- primary and muted text
- navigation borders and general borders
- rose brand surfaces and readable foregrounds
- typography, spacing, radius, shadow, focus, and transition values

Keep the final token vocabulary small and semantic. Avoid changing visual
values unless required to remove ambiguity or maintain contrast.

### 6. Extract only exact CSS primitives

Candidate shared primitives:

- exact section top/bottom spacing
- exact image-cover behavior (`width`, `height`, `object-fit`)
- eyebrow/label typography
- rose surface foreground/background pairing

Keep these local to the route:

- grid and flex composition
- aspect ratios and `object-position`
- breakpoints and layout-specific overrides
- animation and interaction states
- card structure and editorial asymmetry
- page-specific heading variants

Prefer a small global utility or shared base rule only when the declarations
are truly identical and the utility name communicates intent. Do not create a
generic component or abstraction for one remaining use.

### 7. Measure the production result

Build before and after the CSS extraction and compare per-route output:

- CSS file count and request count
- shared versus route-specific CSS
- raw and compressed CSS sizes where available
- whether global CSS grew enough to affect every route
- image and font output, to avoid attributing non-CSS changes to the refactor

Source line count is not a performance metric. Keep a refactor only when it
improves maintainability without making the generated route payload or
cascade materially worse.

## Performance And SEO Constraints

- Astro should keep route-specific styles with the route; do not turn all page
  styles into a global payload.
- CSS duplication is expected to have a modest performance impact because the
  repeated declarations are small and compressed. Images, fonts, and
  render-blocking behavior are higher-impact areas.
- CSS refactoring must not move important text into pseudo-elements,
  background images, or JavaScript-only content.
- Keep one H1, unique metadata, canonical URLs, crawlable copy, descriptive
  image alt text, and schema aligned with visible content.
- Preserve `prefers-reduced-motion` and keyboard-visible focus states.

## Explicit Non-Goals

- Do not merge the four category pages into one generic template.
- Do not move every scoped style block to `global.css`.
- Do not introduce a CSS framework or new dependency.
- Do not optimize source line count at the expense of editorial control.
- Do not change final visual design as part of a maintenance refactor unless
  a regression or accessibility issue requires it.

## Verification

The final refactor should pass:

```bash
npm run astro check
npm run build
npm run check:images
```

Manual verification is required at mobile and desktop widths for all five
current routes, including navigation, modal behavior, page-specific controls,
reveal behavior, responsive image crops, and reduced-motion behavior.
