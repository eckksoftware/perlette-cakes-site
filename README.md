# Perlette Cakes Site

Static Astro site for Perlette Cakes, a home-based baker in Mont Kiara, Kuala
Lumpur, delivering throughout Klang Valley and anywhere reachable via Lalamove
Car from Mont Kiara. This repository will later contain the on-prem order
service and private dashboard.

## Current Status

- `/` is the live work-in-progress page with the current WhatsApp inquiry modal.
- `/home/` is the next owner-demo landing page and has not been implemented.
- `/menu/` will demonstrate product selection and a WhatsApp order-request flow;
  it has not been implemented.
- The on-prem order service and dashboard have not been started.

See `docs/implementation-plan.md` for the approved stage sequence.

## Architecture

- `perlettecakes.com`: static Astro site on Cloudflare Pages
- `api.perlettecakes.com`: future public order intake and provider callbacks
- `admin.perlettecakes.com`: future Cloudflare Access-protected dashboard for
  Amira Saifuddin and Eric Cheong
- One future on-prem Go service handles the API and dashboard while keeping
  provider credentials out of Astro and browser code.

The current public routes are `/`, the temporary `/home/` demo, and `/menu/`.
Future API and admin routes are chosen when their stage is specified; they are
not Astro routes.

## Canonical Facts

- Business: `Perlette Cakes`
- Owner: `Amira Saifuddin`
- Location: `Mont Kiara, Kuala Lumpur, Malaysia`
- Delivery: throughout `Klang Valley, Malaysia`, plus addresses reachable via
  Lalamove Car from Mont Kiara
- Pickup: not offered
- Public WhatsApp: `+60 19-650 5050`
- Canonical domain: `https://perlettecakes.com/`

Use `CONTEXT.md` for complete public wording and business rules.

## Current Build

Implemented:

- Responsive work-in-progress page at `/`
- Existing WhatsApp inquiry modal
- Real bake photography through `astro:assets`
- Baseline metadata, `Bakery` structured data, `robots.txt`, and sitemap support
- Cloudflare Pages deployment workflow

Not implemented:

- `/home/` landing-page demo
- `/menu/` customer flow
- Order API, database, dashboard, email, Lalamove API, or payment integration

## Project Structure

```text
src/
  assets/styles/global.css
  components/OrderInquiryModal.astro
  layouts/Layout.astro
  pages/index.astro
public/
docs/
  decisions/
  brand-notes.md
  implementation-plan.md
  owner-decisions.md
astro.config.mjs
```

## Commands

```bash
npm install
npm run dev
npm run astro check
npm run check:images
npm run build
npm run preview
```

`npm run preview` is only useful after a production build. The deployment
workflow runs Astro checking and the production build before publishing `dist/`.

## References

- Scope and sequence: `docs/implementation-plan.md`
- Business language: `CONTEXT.md`
- Owner decisions: `docs/owner-decisions.md`
- On-prem boundary decision: `docs/decisions/0001-on-prem-service-boundaries.md`
- Brand direction: `docs/brand-notes.md`
