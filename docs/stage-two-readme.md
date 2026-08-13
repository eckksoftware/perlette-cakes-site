# Stage 2 Readme

Stage 2 expands the homepage into hand-authored category pages that help customers find a bake and start a WhatsApp inquiry.

## Implemented

- Homepage with shared WhatsApp inquiry modal.
- `/custom-cakes/`, `/cupcakes/`, `/pastries/`, and `/cookies/`.
- Category-specific titles, descriptions, crawlable copy, imagery, and inquiry messages.
- `CollectionPage` and `ItemList` schema for category pages.
- Homepage category links, shared navigation, footer links, and active mobile navigation state.
- Static `robots.txt`, `llms.txt`, sitemap support, and the rose PC mark SVG.
- Modal product preselection, lightweight validation, and state reset on close.

## Still Pending

- Replace marked placeholder photography with approved product photography.
- Review category copy and confirm every product claim with the owner.
- Complete final mobile, keyboard, contrast, and screen-reader QA on real devices.

## Deferred To Stage 3

- `/products/` browse-all hub.
- `/about/`, `/delivery/`, and `/faq/` support pages.
- Analytics events: `whatsapp_cta_click`, `order_modal_open`, `order_modal_submit`, and `order_modal_validation_error`.
- Any server-side intent capture, checkout, payment integration, or accounts.

## Checks

```bash
npm run astro check
npm run build
npm run check:images
```
