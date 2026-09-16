# ADR-001: Separate Public And Administrative On-Prem Surfaces

## Status

Accepted

## Date

2026-09-16

## Context

Perlette Cakes needs a public order-intake API, private owner dashboard, payment
and delivery callbacks, and server-only provider integrations. The service will
run on a home Mini PC that also hosts the planned Maluri Urusharata service.

The public Astro site must remain static. The owner is the only administrative
user, and maintaining a custom password and session system would add security
and recovery work unrelated to the baking workflow.

## Decision

- Run one server-rendered Go application for Perlette Cakes on-prem.
- Publish it only through Cloudflare Tunnel.
- Route public intake and provider callbacks through
  `api.perlettecakes.com`.
- Route the SSR owner dashboard and authenticated HTMX actions through
  `admin.perlettecakes.com`.
- Enforce exact host-aware routing in Go and reject routes presented through the
  wrong hostname.
- Protect the entire admin hostname with Cloudflare Access and validate its JWT
  assertion in the Go application.
- Do not implement application-issued JWT login/logout or password storage.
- Share one PostgreSQL instance with the Maluri Urusharata service, but use
  separate databases and least-privilege roles.
- Run durable background work from the same Go codebase using PostgreSQL jobs;
  do not add a message broker.

## Alternatives Considered

### Public API under `admin.perlettecakes.com/api`

Rejected because path-based policy mistakes could expose or block the wrong
surface. Separate hostnames provide a clearer Cloudflare Access, WAF, CORS, and
logging seam while still routing to the same application.

### Custom JWT authentication

Rejected for the first version because it requires credential storage, password
reset, session expiry, token revocation, login rate limiting, and additional
owner support. Cloudflare Access already supplies identity-aware proxying and a
signed application token.

### Managed application hosting

Rejected because on-prem hosting is a firm project requirement. The consequence
is explicit responsibility for power, network, patching, storage, monitoring,
and recovery.

### Separate PostgreSQL instances

Rejected initially because expected load is low and one instance is simpler to
operate on the available hardware. Database and role separation provides the
required application data isolation. Revisit if resource contention or upgrade
coordination becomes measurable.

### Redis or a message broker

Rejected because PostgreSQL can durably claim and retry the expected low volume
of provider events and outbound jobs. Add another system only if measured
throughput or isolation needs exceed this design.

## Consequences

- Cloudflare configuration is part of the security boundary.
- Admin routes fail closed when the Access assertion is absent or invalid.
- Provider callbacks remain public and must use provider signature verification;
  they cannot be protected by Access or a Malaysia-only browser rule.
- Country filtering applies only to browser order intake and does not prove that
  a delivery address is in Klang.
- A home outage can interrupt intake and callback processing. Reconciliation
  and provider retries must recover unresolved operations.
- Shared PostgreSQL failure affects both applications, so connection limits,
  monitoring, local backups, and restore tests are required.
- Off-site backups remain deferred. The corresponding host-loss risk remains
  open for owner acknowledgement before production.
