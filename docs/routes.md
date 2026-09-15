# System Surfaces And Routes

This is the canonical reference for the public site and the future on-prem service.

## Public Site: `perlettecakes.com`

| URL | Status | Purpose |
| --- | --- | --- |
| `/` | Current | Work-in-progress landing page with the existing WhatsApp inquiry CTA. |
| `/home/` | Temporary development route | Owner-demo version of the future landing page. Keep `noindex` and out of the sitemap until its approved content replaces `/`. Redirect `/home/` to `/` after promotion. |
| `/menu/` | Stage 1 | Customer menu and WhatsApp order flow. It collects selected items and delivery details, then makes no promise of acceptance, final pricing, or delivery availability. |

## On-Prem Service: `admin.perlettecakes.com`

| Surface | Access | Purpose |
| --- | --- | --- |
| Owner dashboard | Private, Stage 2 | Internal review and administration for the owner. |
| `/api` | Public API boundary, Stage 2 | Replaces the Stage 1 WhatsApp handoff by receiving order requests from `/menu/`. It exposes only the routes required by that flow. |
| Stripe webhook route | Provider-only ingress, later | Accepts and verifies Stripe events after intake and dashboard review are proven. It is separate from the dashboard UI. |
| Email and Lalamove integrations | Server-only, later | Called by the service after owner-approved workflow steps. |

## Boundary Rules

- The public Astro site and the on-prem service live in the same repository but deploy independently.
- A browser call from `perlettecakes.com` to `admin.perlettecakes.com/api` is cross-origin. The API must allow the public site origin while independently validating and protecting every request.
- Public API access never grants dashboard access. The dashboard remains authenticated and private.
- Stripe, email, and Lalamove credentials stay in the on-prem service. They must not enter Astro code, browser bundles, logs, or git.
- `robots.txt`, `llms.txt`, canonical URLs, and sitemaps on `perlettecakes.com` cover only the public site. Do not list or link to the admin host from public crawler-facing files.
