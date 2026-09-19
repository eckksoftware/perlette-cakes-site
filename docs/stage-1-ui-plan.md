# Stage 1 UI Implementation Plan

This plan turns the approved Stage 1 scope into small build tasks. It does not
change the delivery sequence in `docs/implementation-plan.md`.

## Decisions

- Build the route-led Astro UI with one hand-authored page per public route:
  `src/pages/home.astro` and `src/pages/menu.astro`.
- Keep the Stage 1 catalogue in `src/data/menu/catalogue.json`. It is a
  hand-authored transcription of Amira's public Instagram menu, pending her
  approval.
- Store menu photography in `src/assets/images/menu/`. The catalogue references
  a stable image filename or key; the page resolves it at build time for
  `astro:assets`.
- Use stable product, option, and option-value IDs. They are the only intended
  seam for a future Stage 2 intake contract; this JSON is not a future database
  schema or price authority.
- Use page-oriented organization. Do not add a feature hierarchy, data access
  layer, or reusable menu component library for Stage 1.
- The legacy inquiry modal is opt-in through `Layout.astro`: `/` keeps it,
  while `/home/` and `/menu/` do not render it.

## CSS Rules

- Keep design tokens, reset rules, the shared button, and `content-shell` in
  `src/assets/styles/global.css`.
- Keep route-specific selectors in each page's scoped `<style>` block.
- Use semantic HTML, CSS Grid, and Flexbox. Start with the mobile layout and add
  only the media queries needed for wider screens.
- Reuse existing tokens. Do not introduce a CSS framework, utility classes,
  CSS nesting, or a second token system.
- Extract shared CSS or a component only after both routes need the same
  presentation and its interface is clear.

## Layout

### `/home/`

1. Header with the wordmark and a route to `/menu/`.
2. Product-led hero that establishes the approved visual direction.
3. Category introduction for custom cakes, cupcakes, pastries, and cookies.
4. Personal home-baker positioning and product photography.
5. Delivery and ordering expectations, including no pickup.
6. Primary action to `/menu/` and a secondary WhatsApp path for questions.

### `/menu/`

1. Header and a concise explanation that this is an order request.
2. Category navigation linked to product sections.
3. Product sections rendered from `catalogue.json`.
4. Product quantity controls and explicitly published option controls.
5. A selected-item summary that remains visible and understandable on mobile.
6. Customer and delivery fields: name, email, telephone, delivery date, time
   window, and address.
7. A clear disclaimer that availability, final price, delivery fee, and
   acceptance require confirmation.
8. One encoded WhatsApp handoff containing the selected items and submitted
   details.

## Catalogue Shape

Use a single category array. Array order is the display order; do not add a
separate sort field. `priceLabel` preserves published wording while some option
prices are still mixed. Stage 1 does not calculate a final total.

```json
{
  "categories": [
    {
      "id": "custom-cakes",
      "name": "Custom Cakes",
      "items": [
        {
          "id": "tiramisu-cake",
          "name": "Tiramisu Cake",
          "description": "Published product description.",
          "image": "tiramisu-cake.JPG",
          "imageAlt": "Tiramisu celebration cake with cream decoration.",
          "priceLabel": "From RM...",
          "options": [
            {
              "id": "size",
              "name": "Size",
              "required": true,
              "values": [
                {
                  "id": "six-inch",
                  "name": "6 inch",
                  "priceLabel": "RM..."
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}
```

Products without options omit `options`. Descriptive options without a price
omit the option value's `priceLabel`. Use `addOnGroups` for published add-ons
shared by several products, and `requestOnlyOptions` for published requests
whose price or exact configuration needs WhatsApp confirmation.

## Checklist

- [ ] Update `Layout.astro` so the legacy inquiry modal is opt-in and `/` keeps
  its existing behavior.
- [ ] Build `/home/` with `noindex`, sitemap exclusion, real photography, and
  the agreed layout.
- [ ] Review `/home/` on mobile and desktop before carrying its direction into
  `/menu/`.
- [x] Add `src/data/menu/catalogue.json` and three representative products:
  fixed price, price-setting option, and descriptive option.
- [ ] Add the referenced menu images under `src/assets/images/menu/` and run
  `npm run check:images`.
- [ ] Build the static `/menu/` category and product display from the catalogue.
- [x] Transcribe every item, published price, and explicit option visible in the
  supplied Instagram Menu images.
- [ ] Verify the complete catalogue, including product images and ambiguous or
  cropped source details, with Amira before publishing.
- [ ] Add quantity and option selection using stable catalogue IDs.
- [ ] Add the selected-item summary, customer details, and browser validation.
- [ ] Generate and manually review the encoded WhatsApp message. Do not store
  customer details in browser storage.
- [ ] Check the full `/home/` to `/menu/` journey at 320px, 768px, 1024px, and
  1440px with keyboard navigation.
- [ ] Run `npm run astro check`, `npm run check:images`, and `npm run build`.
- [ ] Present both routes to Amira for combined review using
  `docs/owner-decisions.md`.

## Owner Review

Amira reviews `/home/` and `/menu/` together. The review confirms the visual
direction, catalogue completeness and presentation, fields, wording, WhatsApp
handoff, and the conditions she uses to decide whether to accept an order.
