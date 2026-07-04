# Discoverability

This is the working checklist for SEO and AI or LLM discoverability.

## Every Public Page Must Have

- One clear purpose and one primary search intent.
- One unique `<title>` and meta description.
- One canonical URL.
- One clear H1.
- Crawlable HTML for the facts that matter.
- Matching structured data.
- Internal links from at least one stronger page.

## Entity Facts To Keep Consistent

- Business name: `Perlette Cakes`
- Owner: `Amira Saifuddin`
- Service area: `Klang Valley, Malaysia`
- Delivery method: `Lalamove`
- Ordering method: `WhatsApp inquiry` for the current public site
- Canonical domain: `https://perlettecakes.com/`
- Public WhatsApp: `+60 19-650 5050`

## Stage 1 Status

- Sitemap is configured.
- `robots.txt` allows major AI crawlers.
- `llms.txt` exists.
- Bakery schema exists in the layout.
- FAQ schema exists on the homepage.
- The main gap is route coverage, not missing meta tags.

## Current Gaps

- Only one crawlable public route exists.
- The homepage hero is still more mood-led than answer-first.
- There is no real social share image yet.
- There are no real testimonials or review schema yet.

## Stage 2 Acceptance Criteria

- Each category route must stand on its own if quoted by a search engine or AI assistant.
- Each category page must say what it is, who it is for, where it is delivered, how to order, and what lead time usually applies.
- Product variation grids should remain HTML-first and indexable.
- New routes must update internal linking, metadata, schema, and eventually `llms.txt`.

## Image Rule

- Keep active source images under `1 MB` each. Treat `800 KB` as the target, not the ceiling.
- Preserve untouched originals only inside an `originals/` subfolder when you need them for review or later re-export.
- Use `npm run check:images` before deployment or after adding new photography.
- For content images, keep using Astro `<Image />` with explicit `widths`, `sizes`, and sensible `quality` values so the browser downloads the smallest useful asset.
- Above the fold: only the true LCP image should be eager and high priority. Other images should be lazy unless there is a clear reason not to.
