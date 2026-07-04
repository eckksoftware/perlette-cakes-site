# Stage 2 Readme

Stage 2 expands the site from a single homepage into dedicated browsing pages.

See also:

- `./roadmap.md`
- `./routes.md`
- `./discoverability.md`
- `./funnel.md`

## Planned Pages

- `/products`
- `/custom-cakes`
- `/cupcakes`
- `/pastries`
- `/cookies`

## Planned Goals

- Add a browseable menu/products page
- Add dedicated category pages for cakes, pastries, cookies, and cupcakes
- Improve product-specific SEO and internal linking
- Make the WhatsApp inquiry flow more product-aware
- Keep variation grids on category pages before creating product-detail routes

## Analytics Plan

Stage 2 should add Google Analytics 4 for high-level funnel tracking.

Recommended events:

- `whatsapp_cta_click`
- `order_modal_open`
- `order_modal_submit`
- `order_modal_validation_error`

Do not send names, phone numbers, delivery addresses, or free-text special requests to GA4.

## Future Homelab Intent Capture

Later, add a small pre-WhatsApp logging step owned by your homelab.

Recommended shape:

1. Capture summary intent before redirecting to `wa.me`.
2. Log selected products, requested date, delivery area, and whether a special request exists.
3. Avoid storing raw WhatsApp message text or personal data unless you add consent and privacy coverage.

## Not In Stage 2 By Default

- No backend checkout
- No payment integration
- No user accounts
