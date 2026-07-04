# Roadmap

This file tracks what is next, what is blocked, and what is intentionally deferred.

## Current State

- Stage 1 is deployed on Cloudflare Pages.
- The public site is still a single homepage route with a shared WhatsApp inquiry modal.
- The public CTA wording stays WhatsApp-specific until `app.perlettecakes` becomes the real primary order flow.

## Cleanup Checklist

- [ ] Add a proper social share image and replace the favicon fallback used for OG and Twitter cards.
- [ ] Strengthen the homepage hero with clearer answer-first entity copy: home-based baker, Klang Valley, delivery-only, WhatsApp ordering.
- [ ] Expand owner trust content with clearer attribution for Amira Saifuddin and background details that can later support `/about`.
- [ ] Add real testimonials only when approved source material exists, then add matching `Review` or `AggregateRating` schema.
- [ ] Add analytics hooks for `whatsapp_cta_click`, `order_modal_open`, `order_modal_submit`, and `order_modal_validation_error` without sending personal data.
- [ ] Re-check `llms.txt` after Stage 2 routes ship so it links to the main category pages, not only the homepage.
- [ ] Keep `CONTEXT.md`, schema, visible copy, and `llms.txt` aligned whenever service facts change.

## Stage 2

- [ ] Add `/products/` as the browse-all hub.
- [ ] Add `/custom-cakes/`, `/cupcakes/`, `/pastries/`, and `/cookies/` as hand-authored category pages.
- [ ] Turn homepage featured-category cards into crawlable internal links.
- [ ] Use category grids with real images, variation names, and short factual descriptions.
- [ ] Keep product variations on category pages first; only create dedicated product URLs when a variation has enough unique copy, photos, or search intent.
- [ ] Add page-specific metadata and schema for every new route.

## Stage 3+

- [ ] Decide whether the order funnel keeps a pre-WhatsApp redirect owned by the homelab or moves fully to `app.perlettecakes`.
- [ ] Rename CTA copy from WhatsApp-specific wording only when the public order destination changes for real.
- [ ] Add privacy policy coverage before storing any personal data or routing orders through a local server.

## Later Backlog

- [ ] Review licensing, file quality, and readability tradeoffs before replacing the current body font with Zarathustra from `https://bestfreefonts.com/zarathustra`.
- [ ] Consider a dedicated `/faq/` page once Stage 2 route coverage is live so FAQ answers can rank independently and carry page-specific `FAQPage` schema.
- [ ] If the FAQ grows significantly, consider deep-link support to individual FAQ items.
