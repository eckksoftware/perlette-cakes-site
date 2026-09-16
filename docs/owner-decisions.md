# Owner Decisions

This register separates accepted business decisions from questions that Amira
must resolve before the corresponding order-system module is implemented.

## Accepted

| Decision | Current answer |
| --- | --- |
| Delivery area | Delivery addresses in Klang, Selangor, Malaysia only |
| Kitchen location | Kuala Lumpur, Malaysia |
| Fulfilment | Lalamove delivery only; no customer pickup |
| Order confirmation | An owner-approved request becomes confirmed after verified full payment |
| Customer contact | Name, email address, and telephone number are required |
| Receiver contact | Receiver telephone may be collected separately when needed |
| Payment direction | Evaluate Billplz first; use Stripe only if Billplz fails an approved requirement |
| Email direction | Resend for transactional email only |
| Hosting | On-prem service on `home-mini-pc-1` |
| Dashboard access | Cloudflare Access in front of `admin.perlettecakes.com` |
| Delivery automation | Owner-triggered Lalamove booking; no automatic booking at launch |
| Delivery pricing direction | Fixed-zone fee, pending the detailed rules below |

## Delivery Pricing

Resolve before approving `SPEC-delivery.md` or accepting payment:

- [ ] Define the supported Klang zones, postcodes, or coordinate boundaries.
- [ ] Set the customer-facing fee for each zone.
- [ ] Decide who absorbs the difference when the actual Lalamove price is
  higher or lower than the fixed fee.
- [ ] Decide how tolls, parking, peak surcharges, and priority fees are handled.
- [ ] Decide whether an address outside the configured zones is rejected or sent
  for manual review.
- [ ] Decide what happens when no driver accepts the delivery.
- [ ] Decide who pays for failed delivery or redelivery.
- [ ] Set a review interval for zone boundaries and fees.

Lalamove quotations are valid for five minutes and do not reserve a driver.
They cannot be used as a guaranteed fee for an order placed days ahead.

## Quote And Payment

Resolve before approving `SPEC-payments.md`:

- [ ] Set the quote/payment-link expiry period.
- [ ] Decide what happens if a customer pays after the requested production slot
  is no longer available.
- [ ] Define owner-cancellation and duplicate-payment refund rules.
- [ ] Define any exceptions to the current non-refundable policy.
- [ ] Confirm which Billplz payment methods the owner can activate.
- [ ] Confirm whether Billplz settlement timing is acceptable.
- [ ] Approve the customer wording that full payment confirms the order.

## Customer And Receiver Details

Resolve before approving `SPEC-public-intake.md`:

- [ ] Decide when receiver name and telephone are required instead of optional.
- [ ] Decide whether the purchaser can also be the receiver by default.
- [ ] Approve the format and validation rules for Malaysian and international
  telephone numbers.
- [ ] Approve the privacy notice shown before submission.
- [ ] Set retention periods for declined, expired, completed, and refunded
  requests.

## Transactional Email

Resolve before approving `SPEC-notifications.md`:

- [ ] Approve request-received email.
- [ ] Approve quote and payment-request email.
- [ ] Approve verified-payment confirmation email.
- [ ] Approve rejection and expiry emails.
- [ ] Approve delivery-booked and tracking emails.
- [ ] Select the sender name, sending address, and reply-to address.
- [ ] Decide whether WhatsApp or email is authoritative for each customer update.

Transactional addresses must not be added to a marketing list without separate,
explicit consent.

## Operations

Resolve before production launch:

- [ ] Approve the outage procedure when the home Internet connection, power, or
  Mini PC is unavailable.
- [ ] Approve local backup frequency and retention.
- [ ] Acknowledge that off-site backups are deferred and a single host/storage
  loss can destroy local order records until they are added.
- [ ] Decide who receives monitoring alerts and through which channel.
- [ ] Approve how long security and owner-action audit records are retained.
