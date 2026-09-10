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

## Current Status

- Public route: `/`.
- Sitemap is configured and `robots.txt` allows the approved AI crawlers.
- `llms.txt` exists and describes the current work-in-progress page and business.
- Layout emits site-wide `Bakery` schema.
- The homepage uses one eager image and lazy-loads supporting collage images.

## Current Gaps

- The replacement page and future product copy need owner approval.
- `/products/`, `/about/`, `/delivery/`, and `/faq/` are paused future routes.

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
