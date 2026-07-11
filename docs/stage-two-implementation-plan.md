# Stage 2 Implementation Plan

Stage 2 turns the single-page site into a small set of hand-authored pages that help customers find the right bake and start a WhatsApp order.

## Goals

- Give each major customer intent a focused URL.
- Keep every page static, crawlable, and easy for search engines and LLMs to quote.
- Keep ordering on WhatsApp; do not add checkout, accounts, or payment.
- Reuse homepage content and components where it keeps the implementation small.

## Build Order

1. `/custom-cakes/`
2. `/delivery/`
3. `/faq/`
4. `/products/`
5. `/cupcakes/`
6. `/pastries/`
7. `/cookies/`

Build `/custom-cakes/`, `/delivery/`, and `/faq/` first because they cover the highest-intent search and LLM questions: what Perlette Cakes makes, where delivery works, and how ordering works.

## Page Requirements

Every new route needs:

- One `.astro` page under `src/pages/`.
- Unique title and meta description through `Layout` props.
- Exactly one `h1`.
- Crawlable answer-first copy naming Perlette Cakes, Klang Valley, WhatsApp ordering, and Lalamove delivery where relevant.
- Descriptive image alt text using `astro:assets` for content images.
- Page-specific JSON-LD when the page has enough structured facts.
- A visible WhatsApp CTA.
- Internal links back to the homepage and related category/support pages.

## Route Notes

### `/custom-cakes/`

Purpose: main money page for custom cake discovery.

Content:

- Lead with: custom cakes are made to order in Klang Valley and orders start on WhatsApp.
- Show a variation grid first, not individual product pages.
- Include common use cases: birthdays, gifting, gatherings, corporate events, and small celebrations.
- Mention lead time and delivery method without promising instant availability.

Suggested title:

`Custom Cake Delivery Klang Valley | Custom Cakes by Perlette Cakes`

Suggested h1:

`Custom cakes delivered across Klang Valley`

Schema:

- `CollectionPage`
- `ItemList` for visible cake variation cards

### `/delivery/`

Purpose: reduce WhatsApp back-and-forth and support local search.

Content:

- State that Perlette Cakes is home-based with no physical storefront.
- Explain Lalamove delivery, delivery-area confirmation, timing, and recipient availability.
- Include areas served in plain language: Klang Valley, Malaysia.

Schema:

- `WebPage`
- Optional `FAQPage` only if the visible page includes delivery questions and answers.

### `/faq/`

Purpose: capture long-tail search questions and provide LLM-ready answers.

Content:

- Reuse and expand `src/data/homeFaqs.ts` where possible.
- Keep answers direct and factual.
- Include lead time, allergens, halal status, customisation, payment/deposit if known, and delivery limitations.

Schema:

- `FAQPage`

### `/products/`

Purpose: browsing hub for all categories.

Content:

- Link to `/custom-cakes/`, `/cupcakes/`, `/pastries/`, and `/cookies/`.
- Keep this page short; category pages carry the detail.

Schema:

- `CollectionPage`
- `ItemList` for category links

### `/cupcakes/`, `/pastries/`, `/cookies/`

Purpose: category pages for customers who already know the product type.

Content:

- Each page gets a short answer-first intro.
- Show variation cards using real images and factual descriptions.
- CTA should start a WhatsApp order inquiry for that category.

Schema:

- `CollectionPage`
- `ItemList` for visible variation cards

## Variation Rule

Keep variations as cards first. Create a dedicated variation URL only when the variation has enough unique search intent, real photos, and copy to avoid becoming a thin page.

Examples that can start as cards:

- Strawberry cake
- Chocolate cake
- Vintage heart cake
- Floral cake
- Bento cake
- Buttercream cupcakes
- Festive cookies
- Pastry boxes

## Homepage Changes

- Turn the featured category cards into links once category routes exist.
- Keep the current WhatsApp CTA wording until the primary order destination changes.
- Update `public/llms.txt` with the new route links after the pages ship.

## Checks Before Shipping

- `npm run astro -- check`
- `npm run build`
- `npm run check:images` after adding or replacing images

## Not Included

- No backend checkout.
- No payment integration.
- No user accounts.
- No one-page-per-product route unless the variation rule is met.
