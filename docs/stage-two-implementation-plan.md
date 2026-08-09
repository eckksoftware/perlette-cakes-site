# Stage 2 Implementation Status

Stage 2 is the current implemented product-browsing scope. It keeps the site static, crawlable, and focused on WhatsApp inquiries.

## Implemented Routes

- `/custom-cakes/`
- `/cupcakes/`
- `/pastries/`
- `/cookies/`

Each route has a hand-authored `.astro` page, unique metadata, one H1, crawlable category copy, `astro:assets` images, a product-aware WhatsApp CTA, and `CollectionPage` plus `ItemList` plus `BreadcrumbList` schema.

## Shared Implementation

- `src/data/catalogue.ts` is the category and variation data source.
- `src/lib/whatsapp.ts` owns the WhatsApp number and encoded links.
- `src/lib/schema.ts` owns shared JSON-LD builders.
- `src/components/shared/Breadcrumbs.astro` renders the visible category trail.
- `src/components/OrderInquiryModal.astro` handles validation, preselection, and client-side WhatsApp handoff.
- `src/components/shared/SiteNav.astro` owns the responsive menu and active route state.

## Content Status

Category layouts currently reuse approved landing photography as explicit placeholders. Replace those assets and approve sensory copy before treating the pages as final marketing content.

## Deferred To Stage 3

- `/products/`
- `/delivery/`
- `/faq/`
- `/about/`
- GA4 or another analytics provider
- Any backend, checkout, payment, accounts, or raw inquiry storage

## Acceptance Checks

- Exactly one H1 per current route.
- Unique title, description, and canonical URL per current route.
- Visible HTML contains the facts represented in schema.
- Only the true hero/LCP image is eager on each category page.
- `prefers-reduced-motion` remains respected.
- `npm run astro check`, `npm run build`, and `npm run check:images` pass.
