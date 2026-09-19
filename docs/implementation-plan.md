# Implementation Plan

This is the current source of truth for project scope and delivery order. Build
only the active stage. Later stages record direction and safety constraints, not
permission to scaffold speculative code.

The public Astro site and future on-prem service remain separate deployments in
this repository.

**Active stage:** Stage 1

The current Stage 1 build tasks and UI decisions are tracked in
`docs/stage-1-ui-plan.md`. That plan supports this scope; it does not authorize
later-stage work.

## Product Direction

- Keep the public experience minimal and straightforward so customers can
  understand the business, browse the menu, and submit an order request without
  confusion.
- Define the detailed visual direction with Amira while each demo is built;
  avoid a large design system or speculative UI before owner feedback.
- Use baseline technical SEO only: accurate titles and descriptions, canonical
  URLs, sitemap control, semantic HTML, descriptive image alternatives, and
  accurate structured data. Do not add a separate discoverability program.
- An order request never promises availability, final pricing, delivery, or
  acceptance until Amira reviews it.

## Stage 1: Public Demos And WhatsApp Customer Flow

Build `/home/` first to establish the general feel, design, and structure. Carry
that direction into `/menu/`, then present both demos together for Amira's first
formal review. The landing page does not need separate approval before work on
the menu begins.

### 1A. Landing-Page Demo At `/home/`

- Build a minimal owner-demo landing page at `/home/` while `/` keeps the
  current work-in-progress page and inquiry modal.
- Keep `/home/` marked `noindex` and explicitly exclude it from the sitemap.
- Use approved copy and real Perlette Cakes photography.
- Keep the page responsive, keyboard accessible, and clear on mobile and
  desktop.
- Link customers to the menu or current WhatsApp contact without adding backend
  behavior.
- After the combined Stage 1 review is approved, move the landing-page content
  to `/` and redirect `/home/` to `/`.

**Ready for combined review when:** the content and general visual direction are
represented clearly, and the demo works on mobile and desktop without exposing
unfinished routes to search engines.

### 1B. Menu And WhatsApp Request Demo At `/menu/`

- Build a straightforward menu from one small hand-authored product-data source
  transcribed from the menu published on Amira's Instagram account.
- Include every item currently published there as a menu item, with its listed
  price and explicit options, so Amira can verify the catalogue during review.
  Treat the transcription as draft data until she approves it.
- Let customers select products, quantities, and those explicit published
  options. Do not build a general customisation system for requests not covered
  by the published menu.
- Collect the details needed to review and deliver the request: customer name,
  email address, telephone number, requested delivery date, time window, and
  address. Add separate receiver details only when Amira requires them.
- Show a clear request summary and explain that price, availability, delivery
  fee, and acceptance require owner confirmation.
- Generate one correctly encoded WhatsApp message containing the selected items
  and customer-provided details.
- Do not add an API, database, payment, customer account, or storage of personal
  details in browser storage.
- Keep the current `/` inquiry modal for the work-in-progress page. The `/menu/`
  customer flow will use its own UI rather than extending that legacy modal.

**Stage 1 is done when:** Amira reviews `/home/` and `/menu/` as one customer
journey, can complete the request flow, reviews the generated WhatsApp message,
and approves the visual direction, catalogue, fields, wording, and interaction.

## Stage 2: Order Intake And Amira Dashboard

- Add the on-prem Go service, PostgreSQL persistence, and the minimum deployment
  configuration needed for this stage.
- Submit `/menu/` order requests to `api.perlettecakes.com` instead of using
  WhatsApp as the system of record.
- Allow cross-origin browser requests only from the production public-site
  origin. CORS is not authentication and does not replace request validation.
- Validate every request on the server. Browser-supplied price, availability,
  acceptance, delivery fee, and payment state are never authoritative.
- Make retries safe so one customer intent creates one request.
- Build a simple server-rendered dashboard at `admin.perlettecakes.com` for
  order overview, request details, feasibility review, preliminary pricing
  notes, approval for manual follow-up, and rejection. Final quote approval and
  payment automation remain Stage 4 work.
- Protect the dashboard with Cloudflare Access for Amira Saifuddin and Eric
  Cheong. The Go service must validate the Access assertion and authorize only
  those approved identities.
- Record owner/developer actions that change customer-visible or financial
  state.
- After successful submission, optionally offer a WhatsApp prompt so the
  customer can start a conversation or provide follow-up context. This is a
  convenience, not the order record.
- Approve privacy, retention, backup, and restore rules before storing real
  customer information.

**Done when:** one submitted request creates one reviewable record, Amira can
review and update it through the protected dashboard, and Eric can support the
system without direct database editing.

## Stage 3: Transactional Email And Lalamove

### 3A. Lalamove Quotation

- Integrate the Lalamove sandbox quotation API first.
- Let Amira request a current quotation from an order's delivery address while
  preparing the final customer quote.
- Show quotation amount, expiry, and relevant provider response details in the
  dashboard.
- Treat the short-lived Lalamove quotation as pricing input, not a guaranteed
  future delivery charge or driver reservation.
- Store provider identifiers as strings and never expose credentials to Astro
  or browser code.

### 3B. Transactional Email

- Use Resend for approved transactional messages only.
- Initial candidates are request receipt, approved quote/payment request,
  verified payment confirmation, rejection, and delivery updates.
- Send messages only after the related database transaction commits.
- Track delivery and failure state so Amira and Eric can see whether a message
  was sent and retry it without creating duplicates.
- Do not add transactional addresses to a marketing list without separate
  consent.

### 3C. Optional Lalamove Booking

- Treat booking as a separate follow-up after quotation behavior and Amira's
  real operating workflow are understood.
- If approved, let Amira explicitly place, track, change, or cancel a delivery
  only where the provider supports that action.
- Record an outbound booking operation before the network call. Reconcile an
  uncertain result instead of blindly retrying and risking a duplicate booking
  or wallet charge.

**Done when:** Amira can use a current Lalamove quotation while pricing an order,
transactional email status is visible and retryable, and any approved booking
flow has been proven in the sandbox.

## Stage 4: Approved Quote And Payment

- Amira reviews products, customisation, availability, and the delivery pricing
  informed by Stage 3 before approving the final quote.
- Store each approved quote as an immutable snapshot containing line items,
  approved customisations, product subtotal, delivery fee, total MYR amount in
  integer sen, expiry, and terms. Later edits create a new quote rather than
  changing one already sent for payment.
- After approval, create a Billplz payment link on the server and send it through
  the approved customer communication flow.
- Record each outbound payment or refund operation durably before calling
  Billplz so a timeout can be reconciled without creating a duplicate operation.
- Verify Billplz signatures and confirm the quoted amount before changing
  payment state. A browser redirect never proves payment.
- Deduplicate callbacks and reconcile delayed, reordered, or uncertain provider
  results. Never create another bill solely because a network request timed out.
- Keep request, payment, and fulfilment status separate so one provider problem
  does not overwrite unrelated business state.
- Keep an append-only history of status changes and provider operations so Amira
  can understand the current state and Eric can retrace failures.

Initial status groups:

| Concern | Initial statuses |
| --- | --- |
| Request | `submitted`, `under_review`, `quoted`, `confirmed`, `declined`, `expired`, `cancelled` |
| Payment | `not_requested`, `pending`, `paid`, `failed`, `expired`, `refunded`, `disputed` |
| Fulfilment | `not_started`, `preparing`, `ready`, `delivery_booked`, `out_for_delivery`, `delivered`, `failed`, `cancelled` |

Verified full payment confirms one owner-approved order. Payment creation,
callback processing, reconciliation, refund, and resend actions must be visible
and safe to retry from the dashboard.

**Done when:** an approved quote produces one payment request, only a verified
full payment confirms it, duplicate events cannot duplicate effects, and Amira
and Eric can reconstruct every state transition from the dashboard history.

## Deferred

- Discoverability work beyond the baseline technical requirements above
- Customer accounts and self-service order changes
- Automatic payment before owner approval
- Automatic Lalamove booking
- Marketing email
- CMS, dynamic product routes, and additional public content routes
- Infrastructure components without a measured need, including Redis, a message
  broker, and microservices

## Verification

For public-site stages:

```bash
npm run astro check
npm run build
```

Define Go service commands and focused tests when Stage 2 selects the service
directory and toolchain. Do not create backend scaffolding before then.
