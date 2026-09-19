# AGENTS.md - Perlette Cakes

Guidance for contributors working in this repository. Read this before editing
code or documentation.

## Project Scope

Perlette Cakes is a home-based baker in Mont Kiara, Kuala Lumpur, Malaysia.
Orders are delivered throughout Klang Valley and anywhere reachable via
Lalamove Car from Mont Kiara. There is no physical storefront and no pickup.

The current delivery sequence is defined only in
`docs/implementation-plan.md`:

1. Demonstrate a minimal landing page at `/home/` and a simple `/menu/`
   WhatsApp request flow.
2. Add on-prem order intake and a private dashboard for Amira and Eric.
3. Add transactional email and Lalamove quotation, with booking as an optional
   follow-up.
4. Add owner-approved quote and payment automation.

Do not implement later-stage behavior while an earlier stage is active unless
the implementation plan is updated and approved first.

## Sources Of Truth

- `docs/implementation-plan.md`: scope, sequence, and acceptance criteria
- `CONTEXT.md`: canonical business facts and public wording
- `docs/owner-decisions.md`: accepted decisions and unresolved owner choices
- `docs/decisions/0001-on-prem-service-boundaries.md`: durable deployment and
  security boundaries
- `docs/brand-notes.md`: visual and copy direction

`README.md` describes the current repository state; it does not define future
scope.

## Technology

| Concern | Choice |
| --- | --- |
| Public site | Astro static site on Cloudflare Pages |
| Language | TypeScript and Astro |
| Styling | Vanilla CSS |
| Images | `astro:assets` for content photography |
| Fonts | Self-hosted `@fontsource` packages |
| Package manager | npm with the committed lockfile |
| Future service | On-prem Go, server-rendered HTML, PostgreSQL |

Do not add a CSS framework, JavaScript framework, CMS, or backend behavior to
Astro. Add dependencies only for an approved, current requirement.

## Commands

```bash
npm install
npm run dev
npm run astro check
npm run check:images
npm run build
npm run preview
```

Run `npm run astro check` and `npm run build` before completing a public-site
change.

## Public Routes

| URL | Purpose |
| --- | --- |
| `/` | Current work-in-progress page and inquiry modal |
| `/home/` | Temporary `noindex` owner demo; exclude it from the sitemap |
| `/menu/` | Product selection and order-request flow |

Use one hand-authored `.astro` file per public route. Do not add dynamic product
or campaign routes without an approved need.

The current inquiry modal belongs to `/` only. Keep it while the work-in-progress
page is live, but do not extend it into the `/menu/` customer flow. When new
routes use the shared layout, ensure they do not inherit the legacy modal.

## Public-Site Implementation Rules

- Start shared styles and tokens in `src/assets/styles/global.css`.
- Use existing design tokens instead of hardcoded colours, type sizes, spacing,
  radius, or shadows.
- Build mobile-first with semantic HTML, CSS Grid, and Flexbox.
- Keep the interface minimal and straightforward; define detailed UI direction
  with Amira while each demo is developed.
- Use real Perlette Cakes photography. Do not use stock images.
- Use `<Image />` from `astro:assets` for content images and provide accurate,
  descriptive alternative text.
- Keep important copy, prices, and product facts as crawlable HTML rather than
  text inside images.
- Use `we / our` consistently in public copy.
- Do not publish unapproved prices, testimonials, dietary claims, product facts,
  or delivery promises.

## Baseline SEO And Accessibility

SEO is a technical baseline, not a separate content program. Every public page
must have:

- An accurate title, description, canonical URL, and robots setting
- Exactly one `<h1>` and logical heading order
- Open Graph and Twitter metadata
- Correct sitemap inclusion or exclusion
- Accurate structured data that matches visible content
- Responsive images and acceptable Core Web Vitals
- Keyboard access, visible focus states, and WCAG AA colour contrast

Do not add campaign pages, crawler-specific content, or a separate
discoverability program unless approved in a future plan.

## Order-Request Rules

- An order request does not imply availability, final price, delivery fee,
  payment, or acceptance.
- Stage 1 `/menu/` uses minimal browser TypeScript and an encoded WhatsApp
  message. It has no API, persistence, payment, or customer account.
- Do not store names, email addresses, telephone numbers, delivery addresses, or
  special requests in browser storage.
- Stage 2 replaces WhatsApp as the system of record with server-validated order
  intake. A post-submission WhatsApp prompt may remain as an optional
  communication convenience.
- Client-side validation helps the customer; the future server must independently
  validate every request.

## Future Service Boundaries

- `api.perlettecakes.com` is for public intake and verified provider callbacks.
- `admin.perlettecakes.com` is for the private owner/developer dashboard.
- Cloudflare Access protects the admin hostname for Amira Saifuddin and Eric
  Cheong. The Go service validates and authorizes every Access assertion.
- Enforce exact-host routing so public and admin handlers cannot be served on the
  wrong hostname.
- Keep provider credentials and authoritative price, acceptance, payment, and
  delivery state on the server.
- Verify provider signatures, deduplicate events, and reconcile uncertain
  provider outcomes instead of blindly retrying them.
- Payment begins only from an immutable owner-approved quote. A browser redirect
  never proves payment.
- Keep request, payment, and fulfilment status separate and retain a history of
  consequential changes.
- Lalamove quotation informs Amira's pricing. Booking remains owner-triggered
  and optional until its workflow is proven.
- Never include customer PII or provider secrets in logs or metric labels.

## Repository Discipline

- Make the smallest change that satisfies the active stage.
- Do not scaffold future modules, service directories, abstractions, or
  infrastructure.
- Keep documentation aligned when business facts, routes, or stage scope change.
- Do not revert unrelated worktree changes.
- Do not expose the future admin or API hosts in public crawler-facing content.
