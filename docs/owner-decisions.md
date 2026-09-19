# Owner Decisions

This register contains accepted direction and only the unresolved choices that
block an upcoming stage. Review each section with Amira when that stage becomes
active rather than resolving every future detail now.

## Accepted

| Decision | Current answer |
| --- | --- |
| Delivery area | Klang Valley and anywhere reachable via Lalamove Car from Mont Kiara |
| Fulfilment | Lalamove delivery only; no pickup |
| Order confirmation | Verified full payment confirms an owner-approved order |
| Customer contact | Name, email address, and telephone number |
| Stage 1 request | Encoded WhatsApp handoff from `/menu/` |
| Stage 2 request | On-prem API and dashboard become the system of record |
| Dashboard access | Cloudflare Access for Amira Saifuddin and Eric Cheong |
| Payment direction | Billplz payment link created only after Amira approves the quote |
| Email direction | Resend for transactional email only |
| Lalamove sequence | Quotation first; owner-triggered booking is an optional follow-up |
| Hosting | On-prem service on `home-mini-pc-1` |

## Stage 1: Public Demos

- Build `/home/` first, carry its visual direction into `/menu/`, and present
  both together for feedback rather than requiring separate approval between
  the demos.
- [ ] Approve `/home/` general feel, design, structure, copy, photography, and
  primary action.
- [ ] Verify that the Instagram-derived draft catalogue includes every item
  currently published as part of the menu.
- [ ] Approve `/menu/` grouping, presentation, product wording, displayed
  prices, quantities, and explicit published options.
- [ ] Approve required customer and receiver fields.
- [ ] Approve request/disclaimer wording and the generated WhatsApp message.

Open-ended workflow question for Amira:

> When deciding whether to accept an order, what do you need to check beyond
> the expected delivery date, ingredient availability, and whether you want to
> take the order?

## Stage 2: Intake And Dashboard

- [ ] Approve the privacy notice shown before API submission.
- [ ] Set retention periods for declined, expired, completed, and refunded
  requests.
- [ ] Confirm the exact Cloudflare Access identities for Amira and Eric.
- [ ] Approve which dashboard actions require an audit-history entry.
- [ ] Approve outage handling, local backup frequency, retention, and restore
  checks before real customer data is stored.
- [ ] Decide whether the known single-host loss risk is acceptable until
  off-site backups are added.

## Stage 3: Email And Lalamove

- [ ] Approve which Lalamove quotation details Amira needs while pricing.
- [ ] Decide how quotation expiry, tolls, parking, peak charges, and price
  changes are reflected in the customer delivery fee.
- [ ] Approve request, quote, payment, rejection, and delivery email triggers.
- [ ] Select the transactional sender name, sending address, and reply-to.
- [ ] Decide when WhatsApp or email is the primary customer update channel.
- [ ] After quotation usage is understood, decide whether API booking provides
  enough value to implement.

## Stage 4: Payment

- [ ] Set quote and payment-link expiry.
- [ ] Confirm the Billplz payment methods Amira can activate.
- [ ] Confirm settlement timing is acceptable.
- [ ] Approve wording that verified full payment confirms the order.
- [ ] Define owner cancellation, duplicate payment, refund, dispute, and late
  payment handling.
