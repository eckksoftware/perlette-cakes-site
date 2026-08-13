# Routes

This is the canonical route map for the public marketing site.

## Current Stage 2 Routes

| URL | Purpose | Notes |
| --- | --- | --- |
| `/` | Homepage and conversion page | Shared WhatsApp inquiry modal and category links |
| `/custom-cakes/` | Custom celebration cakes | Category-specific copy, imagery, schema, and inquiry CTA |
| `/cupcakes/` | Cupcakes | Category-specific copy, imagery, schema, and inquiry CTA |
| `/pastries/` | Pastries and pastry boxes | Category-specific copy, imagery, schema, and inquiry CTA |
| `/cookies/` | Cookies and gift boxes | Category-specific copy, imagery, schema, and inquiry CTA |

## Stage 3 Routes

| URL | Purpose | Notes |
| --- | --- | --- |
| `/products/` | Browse-all product hub | Links into all four current category pages |
| `/about/` | Full owner story | Name Amira Saifuddin and document her baking background |
| `/delivery/` | Delivery guide | Lalamove coverage, timing, fees, and no-pickup policy |
| `/faq/` | Long-tail question page | Reuse the approved FAQ facts and add page-specific schema |

## Later Backlog

| URL | Purpose | Notes |
| --- | --- | --- |
| `/order/` | Dedicated product picker | Only if the WhatsApp flow needs a separate page |
| `/occasions/*` | Seasonal landing pages | One authored page per approved seasonal offer |
| `/gallery/` | Visual showcase | Add when enough real photography exists |
| `/privacy/` | Privacy coverage | Add before server-side storage or analytics requiring disclosure |

## Variation Rule

- Keep variations as cards on category pages first.
- Create a dedicated variation URL only when it has enough unique photos, copy, or search demand to avoid a thin page.

## Schema Rule

- The homepage keeps the shared `Bakery` schema and homepage `FAQPage` schema.
- Current category pages use `CollectionPage` and `ItemList` schema.
- Stage 3 support pages must use page-specific schema that matches visible HTML.
