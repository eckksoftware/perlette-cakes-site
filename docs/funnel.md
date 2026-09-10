# Funnel

This file records the public order funnel so future stages do not blur what is live versus what is only planned.

## Current Flow

- Public CTA wording stays WhatsApp-specific.
- Users open the shared modal from the single work-in-progress page.
- The modal validates lightweight order details.
- Submission opens `wa.me` with a pre-filled message.
- No backend, no checkout, no account system.

## Stage 3+

- Option A: redirect through a small local or homelab service before forwarding to WhatsApp.
- Option B: move the primary order flow to `app.perlettecakes`.
- Keep the primary public CTA wording as `Order from Perlette`.
- Add analytics hooks around CTA click, modal open, validation failure, and submit success without sending personal data.

## Data Rules

- Avoid storing raw WhatsApp message content by default.
- Avoid collecting personal data server-side until privacy coverage exists.
- If intent logging is added, keep it summary-level unless there is a clear business need for more.
