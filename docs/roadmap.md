# Roadmap

This file tracks what is implemented, what is blocked, and what is intentionally deferred.

## Current State

- Stage 2 category browsing is implemented and statically builds five public pages.
- The shared WhatsApp inquiry flow is used across the homepage and category pages.
- Product-aware interest preselection and close-state reset are implemented.
- The mobile navigation uses the rose surface and highlights the current category.

## Maintenance Refactor

The agreed cleanup sequence is documented in
[`maintenance-refactor-reference.md`](./maintenance-refactor-reference.md).
It preserves the hand-authored category layouts and focuses on dead code,
single sources of truth, progressive enhancement, design tokens, and a small
set of exact shared CSS primitives.

- [ ] Remove the unused generic category component tree and its obsolete data fields.
- [ ] Fix visible product data and structured data drift.
- [ ] Fix scroll reveal so content remains visible without JavaScript.
- [ ] Normalize the active design-token vocabulary.
- [ ] Extract only exact, reusable CSS primitives; keep page compositions local.
- [ ] Compare production CSS output before and after the refactor.

## Remaining Stage 2 Hardening

- [ ] Replace placeholder category photography with approved real bake photography.
- [ ] Review and approve category copy, claims, and product names.
- [ ] Run final mobile, keyboard, contrast, and screen-reader QA on target devices.
- [ ] Verify Cloudflare Pages project variable, secrets, domain, and DNS.

## Stage 3

- [ ] Add `/products/` as the browse-all hub.
- [ ] Add `/about/` with the approved Amira Saifuddin story.
- [ ] Add `/delivery/` with Lalamove coverage, windows, fees, and no-pickup facts.
- [ ] Add `/faq/` with approved long-tail answers and `FAQPage` schema.
- [ ] Add analytics events without sending names, phone numbers, addresses, or free-text requests.
- [ ] Add privacy coverage before any server-side capture or analytics requiring disclosure.

## Later Backlog

- [ ] Add seasonal `/occasions/*` pages when offers and photography are approved.
- [ ] Add `/gallery/` when enough real photography exists.
- [ ] Decide whether a dedicated `/order/` page is needed.
- [ ] Review the current Zarathustra body font for readability and keep its SIL OFL licence with the project.
