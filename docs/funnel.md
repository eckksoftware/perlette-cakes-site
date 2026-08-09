# Funnel

This file records the public order funnel so future stages do not blur what is live versus what is only planned.

## Stage 1 and Stage 2

- Public CTA wording stays WhatsApp-specific.
- Users open the shared modal from the homepage or a category page.
- The modal validates lightweight order details.
- Submission opens `wa.me` with a pre-filled message.
- No backend, no checkout, no account system.

## Stage 3+

- Option A: redirect through a small local or homelab service before forwarding to WhatsApp.
- Option B: move the primary order flow to `app.perlettecakes`.
- Do not change public CTA wording to generic `Order` until one of those options is the real production flow.
- Add analytics hooks around CTA click, modal open, validation failure, and submit success without sending personal data.

## Data Rules

- Avoid storing raw WhatsApp message content by default.
- Avoid collecting personal data server-side until privacy coverage exists.
- If intent logging is added, keep it summary-level unless there is a clear business need for more.
