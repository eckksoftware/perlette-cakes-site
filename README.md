# Perlette Cakes Site

Marketing website for Perlette Cakes, a home-based baker serving Klang Valley, Malaysia.

The site exists to do three things equally well:
- Present a distinctive, trustworthy brand for a home-based baking business
- Be discoverable in search engines
- Be discoverable and quotable by AI assistants and answer engines

## Business Summary

- Business name: `Perlette Cakes`
- Owner: `Amira Saifuddin`
- Business type: `Home-based baker`
- Service area: `Klang Valley, Malaysia`
- Primary order flow: `WhatsApp order inquiry`
- Public WhatsApp number: `+60 19-650 5050`
- Delivery method: `Lalamove`
- Storefront: `No physical storefront`
- Pickup: `Not offered`
- Canonical domain: `https://perlettecakes.com/`

## Stage One Scope

Stage one is a single-page website focused on clarity, trust, and qualified WhatsApp inquiries.

Current implementation checkpoint:
- `src/layouts/Layout.astro` and `src/components/index/Landing.astro` are active
- The sticky nav, hero, owner story, featured categories, ordering steps, WhatsApp CTA, homepage FAQ, and factual footer are implemented
- The WhatsApp inquiry modal is implemented as a shared site-wide component
- The inquiry modal uses a native date picker with a minimum 7-day lead-time check in JavaScript
- The receiver name field strips numeric input and the contact field strips non-digits
- The testimonials placeholder is still pending
- The current CSS refactor in `src/assets/styles/global.css` is the approved baseline and should be cleaned up conservatively

Homepage sections:
1. Hero with product-led imagery and factual highlights
2. Owner story
3. Curated featured products
4. How ordering works
5. Contact / WhatsApp CTA immediately after ordering steps
6. Testimonials placeholder
7. Short FAQ
8. Factual footer

Homepage product categories:
- Custom Cakes
- Cupcakes
- Pastries
- Cookies

Stage-one CTA flow:
1. Visitor clicks the main WhatsApp CTA
2. A lightweight modal opens
3. Visitor enters receiver name and contact number
4. Visitor selects one or more interests and enters delivery details, including a native date input
5. Visitor can add an optional special request
6. Site opens WhatsApp with a pre-filled inquiry message

Stage-one content rules:
1. No public pricing yet
2. English-first copy
3. No fake testimonials
4. No claim of halal certification unless verified
5. No allergen-free claims unless verified
6. Dietary needs should be discussed directly on WhatsApp

Stage-one launch defaults:
1. Use `we / our` voice for public launch copy
2. Public lead time guidance is `3 to 5 days` unless a section requires more nuance
3. Homepage design direction is `warm / homemade` rather than minimal luxury or playful bakery branding
4. Preserve the current user-approved CSS refactor and remove dead styles before introducing new tokens or utilities

Approved public FAQ facts:
1. Delivery covers Klang Valley and anywhere reachable by `Lalamove Car` from `Mont Kiara`
2. Delivery fees are calculated from `Mont Kiara`
3. Standard delivery windows are `12pm to 4pm`, `4pm to 8pm`, and `8pm to 10pm`
4. Exact arrival times are not guaranteed because delivery depends on traffic, weather, and Lalamove driver availability
5. Morning delivery can be discussed on request, subject to availability
6. There is strictly no self pickup
7. Perlette Cakes is not halal-certified, but uses halal ingredients and operates from a Muslim household with no pets
8. Eggless and vegan cakes are available on request for selected flavours
9. Confirmed orders are non-refundable
10. Changes or postponements are handled case by case, usually with at least `10 days` notice and a new date within `6 months`, subject to availability
11. Official invoices can be requested on WhatsApp

Initial stage-one image assignments:
- Hero: `src/assets/images/index/strawberry-cake.JPG`
- Custom Cakes: `src/assets/images/index/variety-cakes.JPG`
- Cupcakes: `src/assets/images/index/variety-cupcakes.JPG`
- Pastries: `src/assets/images/index/variety-pastries.JPG`
- Cookies: `src/assets/images/index/variety-cookies.JPG`
- Owner story image: placeholder for now until owner provides one

## Stage One Checklist

Use this checklist to track launch progress across future sessions.

### Planning and documentation

- [x] Define canonical business language in `CONTEXT.md`
- [x] Replace the starter `README.md` with project-specific documentation
- [x] Record owner brand/copy notes in `docs/brand-notes.md`
- [x] Lock stage-one homepage scope and CTA flow
- [x] Lock stage-two page roadmap and naming

### Content decisions locked

- [x] Canonical domain is `https://perlettecakes.com/`
- [x] Canonical service area is `Klang Valley, Malaysia`
- [x] Primary CTA is WhatsApp
- [x] No storefront and no pickup messaging is confirmed
- [x] Stage-one categories are Custom Cakes, Cupcakes, Pastries, and Cookies
- [x] No public pricing in stage one
- [x] English-first content for stage one
- [x] Testimonials will use a placeholder until real quotes are approved
- [x] Stage-one public voice is `we / our` for now
- [x] Public WhatsApp number is `+60 19-650 5050`
- [x] Public lead time guidance is `3 to 5 days`
- [x] Homepage section order keeps CTA after `How ordering works` and FAQ before the factual footer

### Stage-one implementation remaining

- [x] Replace starter Astro layout and homepage structure
- [x] Build current homepage sections: hero, owner story, featured categories, ordering steps, WhatsApp CTA, FAQ, and factual footer
- [ ] Add testimonials placeholder
- [x] Implement WhatsApp inquiry modal with delivery details fields
- [x] Generate pre-filled WhatsApp inquiry message from modal data
- [ ] Add vendor-neutral analytics event hooks for CTA and modal actions
- [x] Replace raw content images with optimized `astro:assets` usage where needed
- [x] Apply the stage-one brand palette and visual system
- [x] Trim unused global CSS tokens and obvious no-op component code after the CSS refactor

### Stage-one discoverability remaining

- [ ] Finalize page title and meta description for launch homepage
- [x] Replace existing layout metadata with project-specific canonical metadata
- [ ] Add Open Graph and social metadata
- [x] Add Bakery / LocalBusiness JSON-LD with corrected business facts
- [x] Add FAQ schema if the final homepage FAQ supports it cleanly
- [ ] Add `llms.txt`
- [ ] Correct `robots.txt` naming/content and crawler policy
- [ ] Add sitemap support
- [ ] Ensure headings and copy are answer-first and crawlable
- [x] Ensure image alt text is descriptive and specific

### Stage-one quality and release remaining

- [ ] Verify mobile and desktop layouts
- [ ] Verify keyboard/focus accessibility
- [x] Run `npm run astro check`
- [x] Run `npm run build`
- [ ] Review launch copy with Amira
- [ ] Replace testimonial placeholder when real quotes are available

### Stage-one deployment prep remaining

- [ ] Finalize whether the testimonials placeholder stays in launch scope or is removed before deployment
- [ ] Fix `public/robot.txt` to a real `public/robots.txt` with the intended crawler policy
- [ ] Add `public/llms.txt`
- [ ] Add sitemap support and set the production site URL in `astro.config.mjs`
- [ ] Add Open Graph / social metadata for the homepage
- [ ] Re-check JSON-LD facts against the latest owner-approved wording before deployment
- [ ] Re-run mobile QA on the WhatsApp inquiry modal and all CTA entry points
- [ ] Re-run keyboard/focus QA on the modal open, close, trap, and validation states

### Deferred to separate follow-up commit

- [ ] Connect repository to Cloudflare Pages
- [ ] Configure GitHub auto-deploy pipeline
- [ ] Apply production domain and redirect settings in Cloudflare
- [ ] Wire analytics to the chosen provider if needed

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

## Stage Two Checklist

These items are planned for future work and should remain unchecked until implementation starts.

### Information architecture

- [x] Lock future browse-all page name to `Products`
- [x] Lock future browse-all URL to `/products`
- [x] Lock future category URLs:
  - [x] `/custom-cakes`
  - [x] `/cupcakes`
  - [x] `/pastries`
  - [x] `/cookies`
- [ ] Create shared product data source for all product/category pages

### Product browsing and content

- [ ] Build `/products` page
- [ ] Build `/custom-cakes` page
- [ ] Build `/cupcakes` page
- [ ] Build `/pastries` page
- [ ] Build `/cookies` page
- [ ] Add real product entries with descriptions
- [ ] Add pricing or starting-price guidance
- [ ] Add richer product imagery and category-specific alt text

### Conversion flow expansion

- [ ] Expand WhatsApp inquiry flow from category selection to product-aware selection
- [ ] Include structured inquiry details such as quantity, date, and area where appropriate
- [ ] Reuse shared product data in both browsing pages and inquiry flow

### Discoverability expansion

- [ ] Add category-specific SEO metadata
- [ ] Add product/category schema where appropriate
- [ ] Add stronger long-tail keyword targeting by category
- [ ] Consider occasion/seasonal pages such as Hari Raya and Chinese New Year
- [ ] Add internal linking between homepage, products page, and category pages

### Future optional additions

- [ ] Add dedicated testimonials or reviews content once real customer feedback is collected
- [ ] Add additional trust pages such as `About`, `FAQ`, `Delivery`, or `Privacy` if needed
- [ ] Add seasonal landing pages for high-intent search and LLM retrieval

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
npm run astro check
```

## Project Notes

- Keep product/category data centralized once the product data model is introduced.
- Keep analytics vendor-neutral in code; provider wiring can happen later.
- Cloudflare Pages and GitHub auto-deploy setup will be done in a separate follow-up commit after stage one is complete.
- Stage-one visual direction and initial token decisions are recorded in `./docs/stage-one-design-direction.md`.

## Internal References

- Canonical business language: `./CONTEXT.md`
- Brand/copy reference notes: `./docs/brand-notes.md`
- Stage-one visual direction: `./docs/stage-one-design-direction.md`
