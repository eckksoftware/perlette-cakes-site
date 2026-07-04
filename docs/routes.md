# Routes

This is the canonical route map for the public marketing site.

## Current Route

| URL | Purpose | Notes |
| --- | --- | --- |
| `/` | Homepage and stage-1 conversion page | Keeps the shared WhatsApp inquiry modal |

## Planned Stage 2 Routes

| URL | Purpose | Notes |
| --- | --- | --- |
| `/products/` | Browse-all product hub | Links into all category pages |
| `/custom-cakes/` | Main custom cakes landing page | Preferred over `/cake/` for clarity and search intent |
| `/cupcakes/` | Cupcake category page | Variation grid first |
| `/pastries/` | Pastry category page | Variation grid first |
| `/cookies/` | Cookie category page | Variation grid first |

## Planned Support Routes

| URL | Purpose | Notes |
| --- | --- | --- |
| `/about/` | Trust and owner story | Name Amira Saifuddin clearly |
| `/delivery/` | Delivery coverage and policy details | Reuse the canonical service facts from `CONTEXT.md` |
| `/faq/` | Long-tail question capture | Add only when ready to maintain it as a full page |

## Variation Rule

- Stage 2 category pages should show variations as grid cards with image, name, and short factual copy.
- Do not create one page per variation by default.
- Promote a variation to its own URL only when it has enough unique photos, copy, or search demand to avoid becoming a thin page.

## Schema Rule

- `/` keeps the shared `Bakery` schema and homepage FAQ schema.
- Category pages should use list-style schema such as `CollectionPage` or `ItemList` once they exist.
- Only use `Product` schema on pages that truly represent a specific product or a tightly scoped product offer.
