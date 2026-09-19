# ADR-001: Separate Public And Administrative On-Prem Surfaces

## Status

Accepted

## Date

2026-09-16

## Context

Perlette Cakes will need public order intake, a private dashboard, provider
callbacks, and server-only integrations. The public Astro site must remain
static. Amira Saifuddin operates the business, and Eric Cheong needs access to
support the system.

Building application passwords and sessions would add security and recovery
work unrelated to the order workflow. Public intake and callbacks must also
remain isolated from private dashboard access.

## Decision

- Run one server-rendered Go application on-prem when Stage 2 begins.
- Publish it only through Cloudflare Tunnel.
- Use `api.perlettecakes.com` for public intake and provider callbacks.
- Use `admin.perlettecakes.com` for the private dashboard and authenticated
  actions.
- Protect the entire admin hostname with Cloudflare Access for Amira Saifuddin
  and Eric Cheong.
- Validate each Access assertion and authorize only approved identities in Go.
- Enforce exact-host routing so handlers cannot be served through the wrong
  hostname.
- Do not build application-issued login, password, session, or JWT systems.
- Use a dedicated PostgreSQL database and least-privilege role for Perlette
  Cakes.
- Keep provider credentials and authoritative order state in the on-prem
  service, never in Astro or browser bundles.

## Required Safety Properties

- Public input is independently validated and rate-protected.
- Cross-origin browser intake allows only the production public-site origin;
  CORS is not treated as authentication or authorization.
- All SQL is parameterized, and customer-provided content is rendered through
  `html/template` escaping rather than trusted HTML.
- State-changing admin requests are protected against CSRF.
- Consequential owner and developer actions are recorded in audit history.
- Provider callbacks remain public but require signature verification, strict
  validation, and duplicate-event protection.
- Payment starts only from an immutable owner-approved quote, and a browser
  redirect never marks an order paid.
- Outbound payment, refund, and delivery-booking operations are recorded before
  their provider call so uncertain results can be reconciled safely.
- Uncertain payment, email, or delivery operations are reconciled before retry
  so support actions cannot duplicate charges, messages, or bookings.
- Customer PII and provider secrets are excluded from logs and metrics.
- Backup and restore behavior is approved and tested before storing production
  customer data.

## Alternatives Considered

### Public API Under The Admin Hostname

Rejected because path-based policy mistakes could expose or block the wrong
surface. Separate hostnames provide a clearer Access, CORS, and logging boundary.

### Custom Authentication

Rejected for the first version. Cloudflare Access already provides identity
verification without requiring password storage, reset, session expiry, token
revocation, or login support.

### Managed Application Hosting

Rejected because on-prem hosting is a project requirement. This makes power,
network, patching, storage, backup, and recovery explicit operational
responsibilities.

### Additional Services

Redis, a message broker, microservices, and a separate worker host are not
planned. Add infrastructure only after a measured requirement shows that the Go
service and PostgreSQL are insufficient.

## Consequences

- Cloudflare configuration is part of the security boundary.
- Admin requests fail closed when Access identity is missing or invalid.
- Provider callbacks cannot be placed behind Access and must protect themselves.
- Home Internet, power, or host outages can interrupt intake and callbacks, so
  providers and the application must support reconciliation.
- Eric has support access through the same identity-aware boundary as Amira;
  neither person should need routine direct database edits.
