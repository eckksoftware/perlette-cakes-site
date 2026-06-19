# Perlette Cakes Site

Marketing website for Perlette Cakes, a home-based baker serving Klang Valley, Malaysia.

The site exists to do three things equally well:
1. Present a distinctive, trustworthy brand for a home-based baking business
2. Be discoverable in search engines
3. Be discoverable and quotable by AI assistants and answer engines

## Business Summary

- Business name: `Perlette Cakes`
- Owner: `Amira Saifuddin`
- Business type: `Home-based baker`
- Service area: `Klang Valley, Malaysia`
- Primary order flow: `WhatsApp order inquiry`
- Delivery method: `Lalamove`
- Storefront: `No physical storefront`
- Pickup: `Not offered`
- Canonical domain: `https://perlettecakes.com/`

## Stage One Scope

Stage one is a single-page website focused on clarity, trust, and qualified WhatsApp inquiries.

Homepage sections:
1. Hero with product-led imagery and factual highlights
2. Owner story
3. Curated featured products
4. How ordering works
5. Contact / WhatsApp CTA
6. Short FAQ
7. Testimonials placeholder
8. Factual footer

Homepage product categories:
1. Custom Cakes
2. Cupcakes
3. Pastries
4. Cookies

Stage-one CTA flow:
1. Visitor clicks the main WhatsApp CTA
2. A lightweight modal opens
3. Visitor chooses one or more categories
4. Visitor can add an optional note
5. Site opens WhatsApp with a pre-filled inquiry message

Stage-one content rules:
1. No public pricing yet
2. English-first copy
3. No fake testimonials
4. No claim of halal certification unless verified
5. No allergen-free claims unless verified
6. Dietary needs should be discussed directly on WhatsApp

## Stage Two Scope

Stage two expands the site into dedicated product browsing pages backed by one shared product data source.

Planned URLs:
1. `/products`
2. `/custom-cakes`
3. `/cupcakes`
4. `/pastries`
5. `/cookies`

Stage two will introduce:
1. Dedicated category pages
2. Product list / browse-all page
3. Product-level descriptions and pricing
4. Stronger category-specific SEO
5. Better WhatsApp inquiry structure based on selected products

## Discoverability Requirements

Every major change should be checked against both SEO and LLM discoverability.

Minimum requirements:
1. Unique page title and meta description
2. Canonical URLs
3. Real, crawlable HTML content
4. Descriptive headings using real customer language
5. Bakery / LocalBusiness structured data
6. FAQ-friendly answer-first content
7. `robots.txt`, `llms.txt`, and sitemap support
8. Real product photography with descriptive alt text

## Success Criteria

Stage one is successful when:
1. Visitors quickly understand what Perlette Cakes sells
2. The site generates qualified WhatsApp inquiries
3. Inquiry intent can be measured with lightweight analytics hooks
4. The codebase is ready to scale into dedicated product pages without major rework

## Tech Stack

- Astro
- TypeScript
- Static site output
- Vanilla CSS
- Minimal client-side JavaScript only where needed

## Commands

```bash
npm install
npm run dev
npm run build
npm run preview
npm run astro -- check
```

## Project Notes

- Replace starter files and naming with project-specific structure as implementation progresses.
- Keep product/category data centralized once the product data model is introduced.
- Keep analytics vendor-neutral in code; provider wiring can happen later.
- Cloudflare Pages and GitHub auto-deploy setup will be done in a separate follow-up commit after stage one is complete.

## Internal References

- Canonical business language: `./CONTEXT.md`
- Brand/copy reference notes: `./docs/brand-notes.md`
