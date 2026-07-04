# Perlette Cakes Site

Static Astro marketing site for Perlette Cakes, a home-based baker serving Klang Valley, Malaysia.

## Current Status

- Stage 1 product scope is complete.
- The site is a single homepage with a WhatsApp inquiry modal.
- Stage 2 product/category pages have not started.
- Launch hardening is still pending.

## Canonical Facts

- Business: `Perlette Cakes`
- Owner: `Amira Saifuddin`
- Service area: `Klang Valley, Malaysia`
- Delivery: `Lalamove`
- Order flow: `WhatsApp inquiry`
- Public WhatsApp: `+60 19-650 5050`
- Canonical domain: `https://perlettecakes.com/`

## Stage 1 Build

Implemented:

- Sticky nav with WhatsApp CTA
- Homepage sections: hero, owner story, featured categories, ordering steps, CTA, FAQ, footer
- Shared WhatsApp inquiry modal
- FAQ accordion with the first item open by default
- FAQ JSON-LD and Bakery JSON-LD
- `robots.txt`, `llms.txt`, and sitemap support
- Open Graph and Twitter metadata
- `astro-seo` layout integration for shared SEO tags
- Optimized content images via `astro:assets`

Not done yet:

- No analytics wiring or inquiry-intent tracking
- No dedicated social share image yet

## Project Structure

```text
src/
  assets/styles/global.css
  components/
    OrderInquiryModal.astro
    index/
  data/homeFaqs.ts
  layouts/Layout.astro
  pages/index.astro
public/
docs/
astro.config.mjs
```

## Commands

```bash
npm install
npm run dev
npm run build
npm run preview
npm run astro check
npm run check:images
```

## Launch Blockers

Resolve these before production:

1. Add analytics events for CTA click, modal open, modal submit success, and validation failure.
2. Add the repository variable `CLOUDFLARE_PAGES_PROJECT_NAME`.
3. Add a proper social share image instead of the favicon fallback.

## Deployment Next

Cloudflare Pages via GitHub Actions needs:

1. A Cloudflare Pages project connected to this repo.
2. A Pages API token with deployment permission.
3. GitHub secrets for `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID`.
4. A repository variable named `CLOUDFLARE_PAGES_PROJECT_NAME`.
5. The workflow at `.github/workflows/deploy-cloudflare-pages.yml` installs dependencies, runs `npm run astro check`, builds with `npm run build`, validates `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`, and `CLOUDFLARE_PAGES_PROJECT_NAME`, then deploys `dist/` with `wrangler` on `ubuntu-24.04`.
6. Production domain setup for `perlettecakes.com` and DNS in Cloudflare.

## Analytics Next

Recommended first pass:

1. Add Google Analytics 4.
2. Track `whatsapp_cta_click`, `order_modal_open`, `order_modal_submit`, and `order_modal_validation_error`.
3. Capture inquiry metadata only at summary level, not raw message contents.

Future homelab capture path:

1. Point the CTA flow to a small redirect or logging endpoint you control.
2. Record anonymized intent fields before redirecting to `wa.me`.
3. Avoid storing personal message text unless you have consent and a privacy policy.

## References

- Business language: `./CONTEXT.md`
- Roadmap and cleanup checklist: `./docs/roadmap.md`
- Canonical routes: `./docs/routes.md`
- Discoverability rules: `./docs/discoverability.md`
- Order funnel decisions: `./docs/funnel.md`
- Brand notes: `./docs/brand-notes.md`
- Design direction: `./docs/stage-one-design-direction.md`
- Stage 2 planning: `./docs/stage-two-readme.md`
