# Stage 1 Design Direction

Stage 1 is complete. This file records the current UI baseline to preserve while launch hardening and deployment work continue.

## Scope

- One homepage route
- One shared WhatsApp inquiry modal
- No product pages yet
- No checkout, backend, or accounts

## Active Files

- `src/layouts/Layout.astro`
- `src/components/index/Landing.astro`
- `src/components/OrderInquiryModal.astro`
- `src/assets/styles/global.css`

## Visual Intent

- Warm, homemade, and credible
- Product-first, not template-first
- Editorial typography with simple composition
- Rose accents used for CTAs, not everywhere

## Section Order

1. Hero
2. Owner story
3. Featured categories
4. How ordering works
5. WhatsApp CTA
6. FAQ
7. Factual footer

## Typography

- Display: `Fraunces`
- Body/UI: `Geist Sans`
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

- Analytics hooks are still missing
- A dedicated social share image is still missing
