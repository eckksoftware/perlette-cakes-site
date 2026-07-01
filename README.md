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
- FAQ JSON-LD and Bakery JSON-LD
- Optimized content images via `astro:assets`

Not done yet:

- `robots.txt` is misnamed as `public/robot.txt`
- No `llms.txt`
- No sitemap integration
- No Open Graph or Twitter metadata
- No analytics wiring or inquiry-intent tracking
- No Cloudflare Pages GitHub Actions workflow

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
astro.config.mjs
```

## Commands

```bash
npm install
npm run dev
npm run build
npm run preview
npm run astro check
```

## Launch Blockers

Resolve these before production:

1. Rename `public/robot.txt` to `public/robots.txt` and set the intended crawler policy.
2. Add `public/llms.txt`.
3. Add `@astrojs/sitemap` and set `site` in `astro.config.mjs`.
4. Add Open Graph and Twitter metadata in `src/layouts/Layout.astro`.
5. Reconcile the public `3 to 5 days` lead-time copy with the modal's `7 days` validation.
6. Add analytics events for CTA click, modal open, modal submit success, and validation failure.
7. Add deployment workflow and Cloudflare Pages secrets.

## Deployment Next

Cloudflare Pages via GitHub Actions needs:

1. A Cloudflare Pages project connected to this repo.
2. A Pages API token with deployment permission.
3. GitHub secrets for `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID`.
4. A workflow that installs dependencies, runs `npm run astro check`, builds with `npm run build`, and deploys `dist/`.
5. Production domain setup for `perlettecakes.com` and DNS in Cloudflare.

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
- Brand notes: `./docs/brand-notes.md`
- Design direction: `./docs/stage-one-design-direction.md`
