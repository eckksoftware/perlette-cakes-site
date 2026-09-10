# Stage 1 Design Direction

This file records the current work-in-progress page direction while the owner reviews the replacement site.

## Scope

- One work-in-progress homepage route
- One shared WhatsApp inquiry modal, opened by the central `Order from Perlette` button
- No category or support routes while the replacement direction is under review
- No checkout, backend, or accounts

## Active Files

- `src/layouts/Layout.astro`
- `src/pages/index.astro`
- `src/components/OrderInquiryModal.astro`
- `src/assets/styles/global.css`

## Visual Intent

- Warm, homemade, and credible
- Product-first, not template-first
- Editorial typography with simple composition
- Rose accents used for CTAs, not everywhere

## Page Composition

- Quiet brand header
- Asymmetrical real-bake photo collage
- Central work-in-progress message and order CTA
- Small Instagram footer link

## Typography

- Display: `Fraunces`
- Body/UI: `Zarathustra` (current implementation)
- No third font

Rules:

- Hero headline should stay short and readable
- Supporting copy should stay factual
- Buttons and labels stay in the sans face

## Layout Rules

- Keep wrappers minimal
- Use one layout primitive per section when possible
- Prefer `flex` for stacks and rows
- Use `grid` only when a section actually needs columns
- Preserve the shared content width across nav and sections

## CSS Rules

- Keep shared tokens and primitives in `src/assets/styles/global.css`
- Keep section-specific composition inside the section component
- Remove dead CSS before adding new tokens
- Prefer explicit spacing tokens over one-off values

## Content Rules

- Keep facts in HTML, not images
- Keep headings clear and search-shaped
- Keep WhatsApp and Lalamove wording consistent with `CONTEXT.md`
- Do not add public pricing without approval
- Do not add fake testimonials

## Current Gaps

- Owner approval of the replacement visual direction is still pending.
- Product browsing, support routes, and analytics remain deferred.
