# Order System Capability Map And Architecture Specification

Status: Draft for owner and engineer review  
Last updated: 2026-09-16

This document is the initiative-level contract for the future order system. It
defines capability boundaries and accepted architecture direction. Each module
must receive its own focused specification before implementation starts.

## Objective

Build a low-volume order-request system for one owner-operated, home-based
baking business. Customers use the static `/menu/` page to prepare an order
request. The owner reviews feasibility, sets the final product and fixed-zone
delivery prices, and issues a full-payment request. Verified full payment
confirms the order.

The system must remain practical for a nontechnical owner, keep customer and
provider credentials off the public Astro site, and tolerate duplicate or
delayed requests from browsers and external providers.

## Confirmed Direction

- `perlettecakes.com` remains a static Astro site on Cloudflare Pages.
- `/menu/` uses minimal browser-side TypeScript to add, remove, and modify
  selected products before submission.
- The on-prem service is a server-rendered Go application using `html/template`
  and HTMX unless a module specification identifies a concrete blocker.
- `api.perlettecakes.com` exposes only public order-intake and provider callback
  routes.
- `admin.perlettecakes.com` exposes the private owner dashboard and its
  authenticated mutation routes.
- Cloudflare Tunnel is the only public path to the on-prem HTTP service.
- Cloudflare Access authenticates the owner dashboard. Do not build a separate
  password, login, logout, refresh-token, or JWT issuing system.
- PostgreSQL is shared with the planned Maluri Urusharata service at the
  instance level. Each application has a separate database and least-privilege
  database role.
- Billplz is the first payment provider to evaluate and Resend is the selected
  transactional email provider.
- Lalamove booking remains owner-triggered until the operating workflow is
  proven.
- The delivery service area is Klang, Selangor, Malaysia. The kitchen and owner
  remain based in Kuala Lumpur.
- Full verified payment confirms an owner-approved order.

## Capability Map

| Module id | Responsibility | Depends on |
| --- | --- | --- |
| `platform-operations` | On-prem runtime, Cloudflare Tunnel and Access, PostgreSQL, secrets, metrics, and recovery | None |
| `menu-checkout` | Product selection, browser cart state, delivery details, and Stage 1 WhatsApp handoff | None |
| `order-core` | Order-request persistence, lifecycle rules, immutable quotes, owner actions, and audit history | `platform-operations` |
| `public-intake` | Public request contract, validation, Malaysian traffic policy, idempotency, and receipt response | `menu-checkout`, `order-core` |
| `owner-console` | SSR dashboard and authenticated HTMX actions | `order-core`, `platform-operations` |
| `payments` | Billplz bill creation, signed callbacks, reconciliation, refunds, and payment status | `order-core`, `owner-console` |
| `notifications` | Resend transactional email, retries, bounce handling, and owner-safe resend actions | `order-core`, `owner-console` |
| `delivery` | Lalamove sandbox integration, owner-triggered booking, and tracking | `order-core`, `payments`, `owner-console` |

Build order:

1. `platform-operations` and `menu-checkout`
2. `order-core`
3. `public-intake` and `owner-console`
4. `payments`
5. `notifications` and `delivery`

The module identifiers are stable. A future module specification should be
named `SPEC-<module-id>.md` and should not widen another module's interface.

## System Shape

```text
perlettecakes.com (Cloudflare Pages)
  static pages + browser cart state
                  |
                  | HTTPS
                  v
Cloudflare WAF / Access / Tunnel
  api.perlettecakes.com       admin.perlettecakes.com
  public intake               Access-protected SSR dashboard
  provider callbacks          authenticated HTMX mutations
                  \           /
                   Go application
                   PostgreSQL database
                   in-process/background worker
```

One Go application and one Perlette Cakes database are sufficient. Do not add
microservices, a message broker, Redis, or customer accounts without a measured
need.

## Public Menu State

The Astro site remains statically generated even though `/menu/` is
interactive. A small TypeScript module owns transient cart state for:

- Product identifiers and menu version
- Quantity
- Approved product options
- Add, remove, and modify operations
- Derived request summary

Selected product state may use `sessionStorage` if reload persistence is
approved in the `menu-checkout` specification. Do not store names, email
addresses, telephone numbers, delivery addresses, or special requests in
browser storage.

The browser never supplies authoritative price, availability, delivery fee,
acceptance, or payment state. Stage 2 submits product identifiers, quantities,
options, customer name, customer email, customer telephone, requested delivery
details, and an optional receiver telephone. The server validates the request
against the approved menu version.

## Lifecycle Model

Keep review, payment, and fulfilment as separate status fields so one provider
failure does not overwrite unrelated business state.

| Concern | Initial statuses |
| --- | --- |
| Request | `submitted`, `under_review`, `quoted`, `declined`, `expired` |
| Payment | `not_requested`, `pending`, `paid`, `failed`, `refunded`, `disputed` |
| Fulfilment | `not_started`, `preparing`, `ready`, `delivery_booked`, `out_for_delivery`, `delivered`, `failed` |

Every payment request references an immutable quote snapshot containing product
line items, approved customisations, product total, fixed-zone delivery fee,
total MYR amount in integer sen, expiry, and terms. Later edits create a new
quote rather than modifying one already sent for payment.

The expected happy path is:

```text
submitted -> under_review -> quoted
                                |
                                v
                         payment pending -> paid
                                                |
                                                v
                         preparing -> ready -> delivery_booked -> delivered
```

Payment provider records are authoritative for money movement. The local
database is authoritative for Perlette Cakes workflow. Reconciliation connects
the two; a browser redirect alone never marks an order paid.

## Public Traffic And Service-Area Rules

- Apply the Malaysia country restriction only to the public browser order-intake
  routes. Cloudflare WAF can reject requests whose `ip.src.country` is not `MY`.
- IP geolocation is a coarse abuse filter, not proof that a customer or delivery
  address is in Klang. Mobile routing, corporate networks, and VPNs make it
  unsuitable for service-area authorization.
- Validate delivery eligibility separately against owner-approved Klang zones,
  postcodes, or coordinates.
- Do not apply the Malaysia-only rule to Billplz, Resend, or Lalamove callback
  routes. Provider infrastructure may originate outside Malaysia.
- Provider callbacks use signature verification, strict body-size and method
  limits, event deduplication, and provider-object reconciliation.
- Trust Cloudflare geolocation headers only when the origin is reachable solely
  through Cloudflare Tunnel.
- Reserve `POST /v1/order-requests` for browser intake and separate callback
  paths under `/callbacks/billplz`, `/callbacks/resend`, and
  `/callbacks/lalamove`. Cloudflare rules must match these exact route classes,
  not a broad `/api` exception.

The host already reports UTC with active NTP synchronization. Clock
synchronization remains required for signed requests and callbacks, but is
independent of country filtering.

## Dashboard Authentication

Cloudflare Access is the simplest authentication seam for a single owner. It
avoids storing passwords, implementing password reset, issuing application
JWTs, and maintaining login/logout sessions.

The Go application must still:

- Route by an allowlisted exact `Host` value and reject every admin, public, or
  callback route presented on the wrong hostname.
- Validate the `Cf-Access-Jwt-Assertion` issuer, audience, signature, and
  expiry on every admin request.
- Authorize only the approved owner identity.
- Protect state-changing HTMX requests against CSRF.
- Record an audit entry for owner actions that affect quotes, payments,
  refunds, or delivery.

## Provider Decisions

### Billplz

Billplz is preferred for the first payment proof because current Malaysian FPX
and domestic-card fees are lower than Stripe's standard Malaysia pricing. The
sandbox proof must cover bill creation, immutable amount binding, X Signature
callback verification, callback/redirect reordering, duplicate callbacks,
expiry, status reconciliation, refunds, and production payment-method approval.

A signed callback is a provider request containing a cryptographic signature
created with a secret known to the provider and Perlette Cakes. The service
recomputes or validates the signature over the original callback fields. A
valid signature shows that the payload was not casually forged or modified; it
does not replace amount checks, duplicate detection, or reconciliation with the
provider.

### Resend

Resend sends transactional messages only. Initial candidates are request
receipt, quote/payment request, verified payment confirmation, rejection, and
delivery tracking. The final trigger list remains an owner decision.

Email sends are created after the corresponding database transaction commits.
Each send uses a stable application operation id and provider idempotency key.
The service processes signed Resend webhooks for delivery and bounce state.

### Lalamove

Lalamove provides separate sandbox and production v3 endpoints:

- Sandbox: `https://rest.sandbox.lalamove.com/v3`
- Production: `https://rest.lalamove.com/v3`

Development requires a Lalamove Partner Portal account and sandbox API key and
secret. It does not require the owner's production credentials. Production
credentials should belong to the owner-controlled business account because the
production account owns wallet funding and delivery charges. Lalamove states
that production credentials require a wallet top-up.

Lalamove quotations last five minutes and therefore cannot establish the fee
charged for a cake ordered days ahead. The owner enters the approved fixed-zone
fee when creating the immutable quote; no automatic zone-price lookup is
required for the first payment flow. The owner later requests a current
Lalamove quotation and explicitly books delivery. A successful quotation does
not reserve a driver.

## Background Work

The background worker is not a separate infrastructure product. Initially it is
a second execution loop or process built from the same Go application. It reads
durable jobs from PostgreSQL and handles work that should not delay an HTTP
response:

- Process already-verified provider events after they are persisted
- Retry transactional email without sending duplicates
- Reconcile unresolved Billplz payments after an outage or unknown response
- Refresh Lalamove delivery status for active deliveries when needed
- Expire stale quotes and retry failed jobs with bounded backoff

The HTTP callback handler verifies and stores an event, then returns promptly.
The worker applies the business transition. PostgreSQL uniqueness constraints
prevent the same provider event or operation id from applying twice. No
RabbitMQ, Redis, or separate worker host is planned.

Every outbound provider operation is recorded before the network call. A
timeout or dropped response has an `unknown` outcome: the worker reconciles by
the provider identifier, merchant reference, or operation metadata before any
retry. It must never assume that a failed response means Billplz did not create
a bill or Lalamove did not charge the wallet and place an order. Where a
provider cannot safely resolve an unknown result, the dashboard requires owner
review instead of retrying automatically.

## On-Prem Infrastructure

Target host: `home-mini-pc-1`, shared with the planned Maluri Urusharata
service.

The recorded host has two physical CPU cores/four threads, approximately 7.1
GiB visible RAM, a 2 TB SSD, Docker, and about 1.76 TB unallocated in its LVM
volume group. This is sufficient for the expected low request volume if the two
applications use bounded database connection pools and container limits.

The hardware inventory also reports a 16 GB DIMM despite only 7.1 GiB appearing
in the captured `free` output. Recheck usable memory before assigning container
limits.

Before production:

- Allocate the planned dedicated Docker data logical volume; Docker currently
  uses the 100 GB root filesystem despite the free LVM capacity.
- Verify SSD SMART health.
- Replace the current permissive firewall posture. Publish no application or
  PostgreSQL port to the router; Cloudflare Tunnel is outbound-only.
- Give each application a separate PostgreSQL database and role. Do not grant
  either role access to the other application's database.
- Keep both connection pools small and monitor PostgreSQL connections, CPU,
  memory, and disk use.
- Store sandbox and production credentials separately with least-privilege file
  permissions; document rotation, revocation, and compromised-key recovery.
- Establish an OS, container-image, and dependency patch schedule.
- Keep local database backups and test restoration before storing customer
  orders. Off-site backups are deferred pending owner risk acknowledgement;
  loss of the host and its local storage can destroy local order records until
  they are added.

## Observability

Prometheus and Grafana may run on the same host. Start with bounded retention
and storage limits because monitoring is more likely than application traffic
to consume disk.

Monitoring endpoints bind only to the private Docker network, loopback, or
Tailscale. Do not publish Prometheus publicly. Require authentication for
Grafana and do not route it through the unauthenticated API hostname.

Metrics should cover HTTP errors and latency, rejected intake requests,
database availability, worker backlog, failed jobs, payment reconciliation,
email failures, Lalamove failures, CPU, memory, and disk. Never place names,
email addresses, telephone numbers, delivery addresses, request bodies, or
provider secrets in metric labels or logs.

Same-host monitoring cannot report a total host or Internet outage. External
availability monitoring remains a later operational improvement.

## Commands

Current public-site verification:

```bash
npm run astro check
npm run build
```

Go service build, test, migration, and local-development commands must be
defined by `SPEC-platform-operations.md` when the service directory and toolchain
are selected. Do not invent parallel command conventions before that module
exists.

## Project Structure

The existing Astro layout remains unchanged. The Go service directory is chosen
by the `platform-operations` specification rather than created speculatively.

Planning documents:

```text
docs/order-system-spec.md   Initiative capability map and architecture contract
docs/implementation-plan.md Delivery sequence and gates
docs/owner-decisions.md     Accepted and unresolved owner decisions
docs/routes.md              Public and private host surfaces
docs/decisions/             Architecture decision records
```

## Code Style

- Go handlers should be thin: validate external input, call the owning module,
  and map its result to HTTP.
- Render owner-provided and customer-provided content through `html/template`
  escaping. Do not construct trusted HTML from customer input.
- Use parameterized SQL and integer sen for money.
- Keep provider-specific fields at provider seams; do not spread Billplz,
  Resend, or Lalamove payloads through the order model.
- Add an interface only when a second real adapter exists or testing cannot use
  the module's existing interface.

## Testing Strategy

- Unit tests cover lifecycle transitions, quote immutability, amount
  calculations, and signature verification helpers.
- HTTP contract tests cover validation, authentication, authorization, country
  filtering behavior, idempotent retries, and consistent errors.
- Database integration tests prove uniqueness constraints and concurrent
  idempotency claims.
- Provider sandbox tests prove Billplz and Lalamove flows without production
  money movement.
- Restore tests prove local backups can recreate the Perlette Cakes database.
- End-to-end tests cover request submission, owner quote, full payment callback,
  confirmation email, and owner-triggered delivery booking.

## Boundaries

Always:

- Validate browser and provider data at its entry point.
- Verify callback signatures before changing state.
- Persist money and delivery identifiers as strings and money as integer sen.
- Make state-changing retries idempotent and treat uncertain provider outcomes
  as `unknown` until reconciled.
- Keep credentials server-side and redact PII from logs and metrics.

Ask first:

- Database schema changes after a module spec is approved.
- New dependencies, public endpoints, stored PII, or automated provider action.
- Changes to order confirmation, refund, fixed delivery fee, or retention rules.

Never:

- Mark payment successful from a browser redirect.
- Use IP geolocation as proof of a Klang delivery address.
- Put provider callbacks behind Cloudflare Access or the Malaysia-only browser
  rule.
- Let browser-supplied price, payment state, or acceptance become authoritative.
- Automatically book Lalamove before the owner approves that workflow.

## Initiative Success Criteria

- A customer can manage a cart on `/menu/` and submit exactly one request when
  retrying the same intent.
- Public intake rejects requests whose apparent Cloudflare source country is
  not Malaysia, while valid provider callbacks remain reachable from provider
  infrastructure. This is an abuse filter, not proof of customer location.
- The owner can review a request only through the Access-protected dashboard.
- A payment can be created only from an active immutable owner-approved quote.
- Only verified full payment confirms an order.
- Duplicate or out-of-order callbacks do not duplicate payment, email, or
  delivery effects, and uncertain outbound results are not blindly retried.
- The owner can safely retry, reject, expire, reconcile, refund, resend, and
  initiate delivery from the dashboard.
- Both applications can share the Mini PC and PostgreSQL instance without
  database access crossing between them.
- Metrics expose failures without exposing customer PII.

## Open Questions

See `docs/owner-decisions.md`. The fixed-zone definition, quote expiry, refund
exceptions, email trigger list, data retention, and receiver-contact rules must
be resolved before their owning module specifications are approved.

## Official References

- Cloudflare Access applications: https://developers.cloudflare.com/cloudflare-one/access-controls/applications/http-apps/
- Cloudflare Access JWT validation: https://developers.cloudflare.com/cloudflare-one/identity/authorization-cookie/validating-json/
- Cloudflare Tunnel: https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/
- Cloudflare country rules: https://developers.cloudflare.com/waf/custom-rules/use-cases/block-traffic-from-specific-countries/
- Billplz API: https://www.billplz.com/api
- Resend webhook verification: https://resend.com/docs/dashboard/webhooks/verify-webhooks-requests
- Lalamove API: https://developers.lalamove.com/
