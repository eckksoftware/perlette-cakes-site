# Stage 2 Technical Status

This document records the implementation that is currently in the repository. Stage 3 planning belongs in `docs/roadmap.md` and `docs/routes.md`.

## Architecture

- Astro static output with one hand-authored `.astro` file per current route.
- No backend, database, checkout, payment integration, or user accounts.
- Category data lives in `src/data/catalogue.ts`.
- WhatsApp link construction lives in `src/lib/whatsapp.ts` and always uses `encodeURIComponent`.
- JSON-LD builders live in `src/lib/schema.ts`.
- Shared shell components live in `src/components/shared/`.
- The inquiry modal is mounted once by `src/layouts/Layout.astro`.

## Current Routes

- `/`
- `/custom-cakes/`
- `/cupcakes/`
- `/pastries/`
- `/cookies/`

The four category pages are intentionally hand-authored because their layouts differ. They share metadata, category data, schema builders, breadcrumbs, CTA behavior, and the site shell.

## Discoverability

Every current page has a unique title, description, canonical URL, one H1, server-rendered copy, and a visible WhatsApp CTA. Category pages use `CollectionPage`, `ItemList`, and `BreadcrumbList` schema generated from the catalogue data.

The homepage and category pages are linked through the homepage cards, navigation, and footer. `public/llms.txt`, `public/robots.txt`, and sitemap support describe the current public routes.

## Images

All content images use Astro `<Image />`, explicit responsive widths, sizes, alt text, and lazy loading below the fold. Category entries currently carry `placeholderImage: true` because the existing landing photography is reused until approved product photography is supplied.

## Interaction

- The responsive menu uses native buttons, a fixed overlay, keyboard Escape support, and `aria-current` for the active category.
- The modal uses native form controls, lightweight validation, focus restoration, a simple focus trap, product preselection, and state reset on close.
- Scroll reveal and parallax remain CSS plus a small IntersectionObserver implementation with reduced-motion handling.

## Stage 3 Deferred Work

- `/products/`, `/about/`, `/delivery/`, and `/faq/`.
- Analytics events and any server-side intent capture.
- Checkout, payment, accounts, and raw inquiry storage.

## Verification

```bash
npm run astro check
npm run build
npm run check:images
```
