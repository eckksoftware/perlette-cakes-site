# Implementation Plan

The public Astro site and on-prem service remain separate deployments in this
repository. `docs/order-system-spec.md` defines the capability map. Each module
must receive an approved focused specification before its implementation phase.

## Scope And Sequence

### 1. Resolve Owner Decisions And Module Contracts

- Review `docs/owner-decisions.md` with Amira.
- Approve the initiative capability map in `docs/order-system-spec.md`.
- Write module specifications in dependency order, starting with
  `platform-operations` and `menu-checkout`.
- Define the canonical product-data format, product identifiers, menu version,
  and visible pricing rules before building `/menu/`.

**Done when:** the capability map is approved and the next module has a focused,
testable specification with no unresolved blocking owner decision.

### 2. Demo The Future Landing Page At `/home/`

- Build the owner-demo landing page at `/home/` while `/` keeps the current live
  work-in-progress page.
- Keep `/home/` out of the sitemap and marked `noindex` during the demo period.
- Use approved copy, real bake photography, and the public-site SEO and
  accessibility rules.
- When the owner approves the demo, move its content to `/` and redirect
  `/home/` to `/`.

**Done when:** the owner approves the landing-page content and the responsive,
accessible demo is ready to promote.

### 3. Build The `/menu/` WhatsApp Order Flow

- Build the customer-facing menu from one approved product-data source.
- Add minimal browser-side TypeScript for adding, removing, and modifying item
  quantities and approved options.
- Collect customer name, email address, telephone number, requested delivery
  date, time window, and address. Collect a separate receiver telephone only
  when required by the approved rules.
- Make the UI clear that availability, delivery fee, final price, and acceptance
  require owner confirmation.
- Generate one encoded WhatsApp message with the selected items and delivery
  details. WhatsApp handles customisation questions and exceptions in this
  stage.
- Keep this phase browser-only: no server-side storage, payment, or customer
  account.

**Done when:** the owner approves products, cart behavior, delivery fields,
validation, WhatsApp message, privacy wording, and customer-facing wording.

### 4. Establish The On-Prem Platform

- Specify and create the Go, `html/template`, HTMX, and PostgreSQL service.
- Route `api.perlettecakes.com` and `admin.perlettecakes.com` through Cloudflare
  Tunnel without exposing application or PostgreSQL ports publicly.
- Protect the admin hostname with Cloudflare Access and validate Access JWTs in
  Go. Keep public intake and provider callbacks outside Access.
- Enforce exact host-aware routing in Go so admin handlers cannot be served on
  the API hostname and public handlers cannot be served on the admin hostname.
- Use a dedicated Perlette Cakes PostgreSQL database and role within the shared
  instance. Set bounded connection pools for both hosted applications.
- Allocate dedicated Docker storage, harden the firewall, verify SSD health,
  confirm NTP, and establish local backup/restore checks.
- Add Prometheus and Grafana with bounded retention and no PII in logs or metric
  labels. Keep monitoring endpoints private and Grafana authenticated.
- Separate sandbox and production secrets and document credential rotation,
  revocation, compromised-key recovery, and host patching.

**Done when:** the service can be deployed and restored, admin requests fail
closed without valid Access identity, public/provider surfaces remain isolated,
and resource use is observable.

### 5. Add API-Backed Intake And The Owner Dashboard

- Define the public request and response contract from the approved `/menu/`
  behavior.
- Submit Stage 2 requests from `/menu/` to `api.perlettecakes.com`.
- Reserve `POST /v1/order-requests` for browser intake, apply Malaysia-only
  country filtering to that route, then independently validate that the
  delivery address is in an approved Klang zone.
- Validate and rate-protect every request. The browser cannot set final prices,
  payment status, delivery fee, or order acceptance.
- Make retries safe with a stable intent id, atomic uniqueness constraint, and
  a customer-visible request receipt.
- Build the Access-protected owner dashboard for review, immutable quote
  creation, rejection, expiry, and audit history.
- Establish privacy, retention, and local backup rules before storing customer
  contact or delivery data.

**Done when:** one customer intent creates one reviewable request despite
retries, and only the approved owner can review or change it.

### 6. Add Billplz And Resend

- Prove Billplz in its sandbox before selecting production payment methods.
- Let the owner approve feasibility, capacity, line items, fixed-zone delivery
  fee entered during review, total, expiry, and terms before creating a Billplz
  bill. Automatic zone-price lookup is not required in this phase.
- Treat the immutable quote amount as authoritative and confirm the order only
  after a verified full-payment callback or reconciliation.
- Verify X Signature callbacks, store each provider identifier or deterministic
  event key before processing, tolerate duplicate or reordered callback/redirect
  delivery, and reconcile unresolved bills after outages.
- Record every outbound payment operation before calling Billplz. Treat a
  timeout as `unknown` and reconcile it instead of blindly creating another
  bill.
- Send approved transactional messages through Resend after database commits.
  Use stable idempotency keys and process signed delivery/bounce webhooks.
- Provide owner-safe retry, reconcile, refund, and resend actions.

**Done when:** a sandbox payment cannot be forged or applied twice, full payment
confirms exactly one order, and transactional email failure is visible and
retryable without duplicate mail.

### 7. Add Owner-Triggered Lalamove Fulfilment

- Develop against `rest.sandbox.lalamove.com/v3` with sandbox credentials from
  a Partner Portal account.
- Use the approved fixed-zone fee for the customer quote; do not present a
  five-minute Lalamove quotation as a guaranteed future fee.
- Let the owner request a current quotation and explicitly place delivery from
  the dashboard.
- Store Lalamove identifiers as strings, synchronize delivery status, and expose
  owner-safe retry/change-driver/cancel actions only where the provider allows.
- Record the booking operation before calling Lalamove. An uncertain result must
  be reconciled or reviewed by the owner, never blindly retried.
- Keep production credentials in the owner-controlled Lalamove account and
  document wallet-funding requirements.

**Done when:** sandbox quotation, booking, status, and failure scenarios are
proven, and no delivery can be booked twice from a retry.

## Deferred

- Customer accounts, self-service order changes, automated delivery booking,
  marketing email, off-site backups, and new public content routes are outside
  the current implementation plan.
- Off-site backup deferral leaves a known risk that loss of the Mini PC and its
  local storage can destroy local order records. Owner acknowledgement remains
  open in `docs/owner-decisions.md`.
