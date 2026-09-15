# Perlette Cakes Site

Static Astro marketing site for Perlette Cakes, a home-based baker serving Klang Valley, Malaysia. This repository will also contain the future on-prem order service and owner dashboard.

## Current Status

- `/` is the current work-in-progress public page with a WhatsApp inquiry CTA.
- `/home/` is the temporary, `noindex` demo route for the future landing page; its approved content will replace `/`.
- `/menu/` will first send selected products and delivery details to WhatsApp; a later stage will submit the same request to the on-prem API.
- `admin.perlettecakes.com` and its `/api` are planned on-prem service surfaces. They are not implemented yet.

## Architecture

- `perlettecakes.com` is a static Astro site deployed to Cloudflare Pages.
- `admin.perlettecakes.com` will host the private owner dashboard on-prem.
- Stage 1 `/menu/` opens WhatsApp with the selected order and delivery details. Stage 2 replaces that handoff with direct browser submission to `https://admin.perlettecakes.com/api`.
- Stripe webhooks, email delivery, and Lalamove calls belong to the on-prem service. They never run in Astro or expose provider credentials to the browser.
- The two hosts are separate browser origins. The service must expose only the required public API routes while keeping the dashboard private.

## Canonical Facts

- Business: `Perlette Cakes`
- Owner: `Amira Saifuddin`
- Service area: `Klang Valley, Malaysia`
- Delivery: `Lalamove`
- Customer request flow: `/menu/` to WhatsApp in Stage 1, then the API in Stage 2
- Customer conversation: `WhatsApp`
- Public WhatsApp: `+60 19-650 5050`
- Canonical domain: `https://perlettecakes.com/`

## Current Build

Implemented:

- Single responsive work-in-progress page at `/`
- Central `Order from Perlette` CTA opening the shared WhatsApp inquiry modal
- Asymmetrical collage using real bake photography via `astro:assets`
- `Bakery` JSON-LD, canonical metadata, Open Graph, and Twitter metadata
- `robots.txt`, `llms.txt`, and sitemap support
- `astro-seo` layout integration for shared SEO tags

Not done yet:

- The `/home/` demo and `/menu/` checkout UI need Amira's approved content and product facts.
- The on-prem API contract and service have not been started.

## Project Structure

```text
src/
  assets/styles/global.css
  components/
    OrderInquiryModal.astro # current `/` inquiry flow only
  layouts/Layout.astro
  pages/
    index.astro
public/
docs/
astro.config.mjs
```

## Commands

```bash
npm install            # once after cloning or when dependencies change
npm run dev            # normal day-to-day local work
npm run astro check    # before commit or when changing Astro/types
npm run check:images   # after adding or replacing source images
npm run build          # only when verifying a production build or before deploy
npm run preview        # optional; only after build if you need to inspect the built output locally
```

Notes:

- `npm run build` is not required for every edit. Use it when you need to verify the production output, image transforms, or deployment build.
- `npm run preview` is never required for routine work. It only helps when you specifically want to inspect the built site instead of the dev server.
- The GitHub Actions deployment workflow does not run `npm run check:images`; that script is a local repo hygiene check.

## Launch Hardening

Resolve these before production:

1. Add the repository variable `CLOUDFLARE_PAGES_PROJECT_NAME`.
2. Verify Cloudflare production domain and DNS configuration.
3. Approve the `/home/` demo and `/menu/` product, photography, and ordering content.

## Deployment Next

Cloudflare Pages via GitHub Actions needs:

1. A Cloudflare Pages project connected to this repo.
2. A Pages API token with deployment permission.
3. GitHub secrets for `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID`.
4. A repository variable named `CLOUDFLARE_PAGES_PROJECT_NAME`.
5. The workflow at `.github/workflows/deploy-cloudflare-pages.yml` installs dependencies, runs `npm run astro check`, builds with `npm run build`, validates `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`, and `CLOUDFLARE_PAGES_PROJECT_NAME`, then deploys `dist/` with `wrangler` on `ubuntu-24.04`. It intentionally does not run `npm run check:images`.
6. Production domain setup for `perlettecakes.com` and DNS in Cloudflare.

## References

- Business language: `./CONTEXT.md`
- System surfaces and routes: `./docs/routes.md`
- Delivery plan: `./docs/implementation-plan.md`
- Brand notes: `./docs/brand-notes.md`
