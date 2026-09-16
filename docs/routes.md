# System Surfaces And Routes

This is the canonical reference for the public site and the future on-prem service.

## Public Site: `perlettecakes.com`

| URL | Status | Purpose |
| --- | --- | --- |
| `/` | Current | Work-in-progress landing page with the existing WhatsApp inquiry CTA. |
| `/home/` | Temporary development route | Owner-demo version of the future landing page. Keep `noindex` and out of the sitemap until its approved content replaces `/`. Redirect `/home/` to `/` after promotion. |
| `/menu/` | Stage 1 | Customer menu and WhatsApp order flow. It collects selected items and delivery details, then makes no promise of acceptance, final pricing, or delivery availability. |

## On-Prem Service

| Surface | Access | Purpose |
| --- | --- | --- |
| `admin.perlettecakes.com` | Cloudflare Access, Stage 2 | Server-rendered Go dashboard and authenticated HTMX actions for the owner. |
| `POST api.perlettecakes.com/v1/order-requests` | Public, Stage 2 | Replaces the Stage 1 WhatsApp handoff by receiving order requests from `/menu/`. |
| `api.perlettecakes.com/callbacks/<provider>` | Public signed ingress, later | Accepts and verifies Billplz, Resend, and Lalamove callbacks on provider-specific paths. |
| Email, payment, and Lalamove clients | Server-only, later | Called by the service after owner-approved workflow steps. |

## Boundary Rules

- The public Astro site and the on-prem service live in the same repository but deploy independently.
- Browser calls from `perlettecakes.com` to `api.perlettecakes.com` are cross-origin. The API must allow only the public site origin while independently validating and protecting every request.
- Apply Malaysia-only IP filtering to browser intake as a coarse abuse control. Validate the Klang delivery address separately, and exempt provider callbacks from the country rule.
- Public API access never grants dashboard access. Cloudflare Access protects the entire admin hostname, and the Go service validates its Access assertion.
- The Go application validates the exact request hostname and rejects every route served on the wrong host. Cloudflare hostname policies are not the only isolation control.
- Billplz, Resend, and Lalamove credentials stay in the on-prem service. They must not enter Astro code, browser bundles, logs, or git.
- Both hosts route through Cloudflare Tunnel to one Go application; no application port is exposed directly to the Internet.
- `robots.txt`, `llms.txt`, canonical URLs, and sitemaps on `perlettecakes.com` cover only the public site. Do not list or link to the admin host from public crawler-facing files.
