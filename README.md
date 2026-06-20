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
- The sticky nav and homepage hero are implemented
- Remaining homepage sections and the modal inquiry flow are still pending

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
3. Visitor chooses one or more categories
4. Visitor can add an optional note
5. Site opens WhatsApp with a pre-filled inquiry message

Temporary implementation note:
- Until the category-selection modal is built, the live CTA links directly to WhatsApp with a pre-filled inquiry message

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
- [ ] Build single-page homepage sections
- [ ] Implement curated featured products section
- [ ] Draft owner story from approved context notes
- [ ] Build how ordering works section
- [ ] Build homepage FAQ section
- [ ] Add factual footer content
- [ ] Implement WhatsApp category-selection modal
- [ ] Generate pre-filled WhatsApp inquiry message from modal selections
- [ ] Add vendor-neutral analytics event hooks for CTA and modal actions
- [ ] Replace raw content images with optimized `astro:assets` usage where needed
- [ ] Apply the stage-one brand palette and visual system

### Stage-one discoverability remaining

- [ ] Finalize page title and meta description for launch homepage
- [ ] Replace existing layout metadata with project-specific canonical metadata
- [ ] Add Open Graph and social metadata
- [ ] Add Bakery / LocalBusiness JSON-LD with corrected business facts
- [ ] Add FAQ schema if the final homepage FAQ supports it cleanly
- [ ] Add `llms.txt`
- [ ] Correct `robots.txt` naming/content and crawler policy
- [ ] Add sitemap support
- [ ] Ensure headings and copy are answer-first and crawlable
- [ ] Ensure image alt text is descriptive and specific

### Stage-one quality and release remaining

- [ ] Verify mobile and desktop layouts
- [ ] Verify keyboard/focus accessibility
- [ ] Run `npm run astro -- check`
- [ ] Run `npm run build`
- [ ] Review launch copy with Amira
- [ ] Replace testimonial placeholder when real quotes are available

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
npm run astro -- check
```

## Project Notes

- Replace starter files and naming with project-specific structure as implementation progresses.
- Keep product/category data centralized once the product data model is introduced.
- Keep analytics vendor-neutral in code; provider wiring can happen later.
- Cloudflare Pages and GitHub auto-deploy setup will be done in a separate follow-up commit after stage one is complete.
- Stage-one visual direction and initial token decisions are recorded in `./docs/stage-one-design-direction.md`.

## Internal References

- Canonical business language: `./CONTEXT.md`
- Brand/copy reference notes: `./docs/brand-notes.md`
- Stage-one visual direction: `./docs/stage-one-design-direction.md`
