# Discoverability

This is the working checklist for SEO and AI or LLM discoverability.

## Every Public Page Must Have

- One clear purpose and one primary search intent.
- One unique title and meta description.
- One canonical URL.
- One clear H1.
- Crawlable HTML for the facts that matter.
- Matching structured data.
- Internal links from at least one stronger page.

## Stage 2 Status

- Public routes: `/`, `/custom-cakes/`, `/cupcakes/`, `/pastries/`, and `/cookies/`.
- Sitemap is configured and `robots.txt` allows the approved AI crawlers.
- `llms.txt` exists and links to the current public pages.
- Layout emits site-wide `Bakery` schema.
- Homepage emits `FAQPage` schema.
- Category pages emit `CollectionPage` and `ItemList` schema.
- Category pages use one eager hero image each.

## Current Gaps

- Category photography and product image alternatives should be kept current as new bake images are approved.
- Category copy and product claims need owner approval before final launch.
- `/products/`, `/about/`, `/delivery/`, and `/faq/` are Stage 3 routes, not current Stage 2 requirements.

## Entity Facts To Keep Consistent

- Business name: `Perlette Cakes`
- Owner: `Amira Saifuddin`
- Service area: `Klang Valley, Malaysia`
- Delivery method: `Lalamove`
- Ordering method: `WhatsApp inquiry`
- Canonical domain: `https://perlettecakes.com/`
- Public WhatsApp: `+60 19-650 5050`

## Image Rule

- Use Astro `<Image />` for all content images.
- Provide descriptive alt text and explicit responsive widths and sizes.
- Keep active source images under `1 MB`, with `800 KB` as the target.
- Keep only the true LCP image eager; lazy-load content below the fold.
- Never put load-bearing text inside images.
