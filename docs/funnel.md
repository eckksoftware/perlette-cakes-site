# Funnel

This file records the public order funnel so future stages do not blur what is live versus what is only planned.

## Stage 1

- Public CTA wording stays WhatsApp-specific.
- Users open the shared modal on the marketing site.
- The modal validates lightweight order details.
- Submission opens `wa.me` with a pre-filled message.
- No backend, no checkout, no account system.

## Stage 2

- Keep the public CTA pointed at the same WhatsApp-based flow.
- Make the modal and message more product-aware as category pages are added.
- Add analytics hooks around CTA click, modal open, validation failure, and submit success.

## Stage 3+

- Option A: redirect through a small local or homelab service before forwarding to WhatsApp.
- Option B: move the primary order flow to `app.perlettecakes`.
- Do not change public CTA wording to generic `Order` until one of those options is the real production flow.

## Data Rules

- Avoid storing raw WhatsApp message content by default.
- Avoid collecting personal data server-side until privacy coverage exists.
- If intent logging is added, keep it summary-level unless there is a clear business need for more.
