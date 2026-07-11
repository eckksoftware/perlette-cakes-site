# Stage 2 Technical Implementation Plan

Engineering blueprint for Stage 2. Pairs with `stage-two-implementation-plan.md` (content/strategy),
`routes.md` (URL map), and `discoverability.md` (SEO acceptance). This doc covers **how** we build it.

Design direction was resolved in a grilling session; the locked decisions drive the architecture below.

## Design Direction (locked)

1. **Maximal bespoke, cohesive.** Each product category is its own mini-brand. Held together by a shared
   shell: nav, footer, Fraunces display type, the signature pink as a through-line, and the WhatsApp
   CTA/modal flow.
2. **North star: the image is the salesperson.** Layout and copy exist to make people crave the product
   and feel they are missing out if they do not order.
3. **Showcase = signature band + collage.** Each product page opens with one cinematic full-bleed
   "signature" product, then an editorial asymmetric collage of the rest.
4. **Warm accent per category.** One secondary accent each, from a shared warm family:
   Custom Cakes = plum, Cupcakes = raspberry-coral, Pastries = caramel-cream, Cookies = toasted cocoa.
   Pink stays the connective thread; warm off-white base on all.
5. **Motion: tasteful CSS + light JS.** IntersectionObserver scroll reveals, gentle parallax on the
   signature image, slow hover zoom, soft accent transitions. No animation library. `prefers-reduced-motion`
   respected everywhere. Protects the existing LCP/SEO work.
6. **Copy: evocative & sensory.** Vivid taste/texture/occasion detail in the warm we/our voice. Desire
   through specifics, never through unverified health/allergen claims (see `CONTEXT.md`).
7. **Scope is tiered by purpose.**
   - Full bespoke cinematic: `/custom-cakes/`, `/cupcakes/`, `/pastries/`, `/cookies/`.
   - Bold-but-lighter gateway hub: `/products/`.
   - Clean, cohesive, answer-first: `/delivery/`, `/faq/`.
8. **Nav: slim links + CTA.** Brand + `Products · Delivery · FAQ` + Order CTA on desktop; simple menu on
   mobile.
9. **Build flagship-first.** `/custom-cakes/` end-to-end, review, then replicate.

## Images

Reuse the existing landing images as placeholders so the layouts can be visualised now. Map them in the
data layer, marked `placeholderImage: true`, so real photography swaps in later without touching
components. Available assets: `hero-cupcakes`, `hero-flowery-cake`, `variety-cakes/cupcakes/pastries/
cookies`, `owner-personal-handmade-gifts`.

Placeholder rule for bespoke pages: because a few images repeat across many variations, favour **one large
signature shot + varied collage sizes** so repetition reads as intentional art direction, not duplication.

## Principles

- **Bespoke composition, shared primitives.** There is no rigid `CategoryTemplate`. Each product page is a
  hand-authored `.astro` that composes shared primitives (`SignatureBand`, `Collage`, `CategoryCta`,
  `Breadcrumbs`, `RelatedLinks`) in its own rhythm and sets its own accent theme. Cohesion comes from the
  primitives + shell + tokens, not from one locked layout.
- **Accent theming via CSS custom properties.** Each page sets `--accent*` variables on a wrapper;
  primitives consume `var(--accent)` with a pink fallback. One mechanism = four distinct looks, minimal code.
- **HTML-first + crawlable.** Every fact that matters ships as server-rendered HTML with matching JSON-LD.
- **Reuse the design system.** New work consumes `global.css` tokens and existing classes. No new fonts.
- **No new runtime dependencies.** Motion is IntersectionObserver + CSS only.

## Key Architecture Decisions

| Decision | Choice | Why |
| --- | --- | --- |
| Category pages | Hand-authored bespoke `.astro` per route, composing shared primitives | Maximal-bespoke direction; each page is its own mini-brand |
| Cohesion mechanism | Shared shell + primitives + `--accent*` CSS custom properties | Distinct per page, unmistakably one brand, low code |
| `/products/` | Bold-but-lighter gateway of 4 category doors, one style | Hub, not a craving page |
| `/delivery/`, `/faq/` | Clean cohesive pages, shared shell, light flourish | Answer-first; usability over cinematics |
| Data | One typed `src/data/catalogue.ts` | Single source for copy, images, accent, schema, WhatsApp messages |
| WhatsApp links | `src/lib/whatsapp.ts` helper | De-duplicate current literals; make product-aware |
| JSON-LD | `src/lib/schema.ts` builders | `CollectionPage`/`ItemList`/`FAQPage`/`BreadcrumbList` from data |
| Motion | `src/lib/reveal` (one global IntersectionObserver) + CSS | Cinematic without a library; reduced-motion safe |
| Path aliases | Add `@lib/*`, `@data/*` to the existing `@components/*`, `@layouts/*` | Consistent imports |

## New File Structure

```
src/
  lib/
    whatsapp.ts              # number + product-aware href builder
    schema.ts                # JSON-LD builders (typed)
    reveal.ts                # one IntersectionObserver for [data-reveal]; no-ops on reduced-motion
  data/
    catalogue.ts             # categories + variations + accents + signature (typed, single source)
    faqs.ts                  # rename/expand of homeFaqs.ts; category-tagged
  styles/
    accents.css              # per-category --accent* theme classes (imported once, applied per page)
  components/
    shared/
      SignatureBand.astro    # full-bleed cinematic signature product (accent-aware, parallax hook)
      Collage.astro          # editorial asymmetric layout wrapper (accepts sized items)
      CollageItem.astro      # one image + sensory copy; size variant (lg/md/sm), reveal + hover zoom
      CategoryCta.astro      # product-aware WhatsApp CTA (message + modal interest preselect)
      Breadcrumbs.astro      # visible trail; schema built in the page
      RelatedLinks.astro     # crawlable internal-link block
      NavLinks.astro         # slim Products/Delivery/FAQ links + mobile menu (used by Layout)
  pages/
    custom-cakes.astro       # FLAGSHIP bespoke page (plum)
    cupcakes.astro           # bespoke (coral)
    pastries.astro           # bespoke (caramel)
    cookies.astro            # bespoke (cocoa)
    products.astro           # gateway hub
    delivery.astro           # WebPage (+ optional FAQPage)
    faq.astro                # FAQPage
```

`homeFaqs.ts` is renamed to `faqs.ts` and re-exported so `index.astro` keeps working during the move.

## Data Model — `src/data/catalogue.ts`

```ts
import type { ImageMetadata } from 'astro';
// TODO(images): reuse landing assets as placeholders; swap per-variation photography later.
import cakesImage from '../assets/images/index/variety-cakes.JPG';
import flowerCake from '../assets/images/index/hero-flowery-cake.JPG';
// ...cupcakes, pastries, cookies, hero-cupcakes, owner-personal-handmade-gifts

export interface Accent {
  theme: string;      // css class in accents.css, e.g. 'accent-plum'
  label: string;      // human note: 'plum'
}

export interface Variation {
  slug: string;            // anchor id now; dedicated URL later if the variation rule is met
  name: string;
  crave: string;           // evocative, sensory 'you're missing out' line (truthful, no health claims)
  detail?: string;         // optional factual note (flavours, occasion)
  image: ImageMetadata;
  imageAlt: string;
  size?: 'lg' | 'md' | 'sm';   // collage weighting
  placeholderImage?: boolean;
}

export type CategorySlug = 'custom-cakes' | 'cupcakes' | 'pastries' | 'cookies';

export interface Category {
  slug: CategorySlug;
  name: string;                // "Custom Cakes"
  navLabel: string;
  accent: Accent;
  // SEO
  title: string;
  description: string;
  h1: string;
  intro: string[];             // answer-first: Perlette Cakes, Klang Valley, WhatsApp, Lalamove
  leadTimeNote: string;
  // ordering
  whatsappMessage: string;     // product-aware pre-fill
  modalInterest?: string;      // pre-checks a modal "Interested In" option
  // content
  signature: Variation;        // the cinematic full-bleed hero product
  signatureHeadline: string;   // big editorial line over the signature band
  variations: Variation[];     // the collage
  relatedFaqTags?: string[];
}

export const categories: Category[];
export const categoryBySlug = (slug: CategorySlug) => /* ... */;
export const categoryPath = (slug: CategorySlug) => `/${slug}/`;
export const categoryUrl = (slug: CategorySlug) => `https://perlettecakes.com/${slug}/`;
```

Placeholder image + accent mapping:

| Category | Accent | Placeholder assets |
| --- | --- | --- |
| Custom Cakes | plum `#693f4a` | `hero-flowery-cake` (signature), `variety-cakes` |
| Cupcakes | raspberry-coral | `hero-cupcakes` (signature), `variety-cupcakes` |
| Pastries | caramel-cream | `variety-pastries` (signature), `owner-personal-handmade-gifts` |
| Cookies | toasted cocoa | `variety-cookies` (signature), `variety-cakes` |

## Accent Theming — `src/styles/accents.css`

Each product page wraps its `<main>` in an accent class. Primitives read the variables; pink is the
fallback so nothing breaks if a theme is missing.

```css
:root {
  --accent: var(--pink-primary-bg);          /* default = brand pink */
  --accent-strong: var(--color-primary-strong);
  --accent-tint: #f7f1eb;                     /* soft background wash */
  --on-accent: var(--white-text);
}
.accent-plum    { --accent: #693f4a; --accent-strong: #4c2b34; --accent-tint: #f3e9ec; }
.accent-coral   { --accent: #e0687a; --accent-strong: #b64457; --accent-tint: #fbe9ec; }
.accent-caramel { --accent: #b9814e; --accent-strong: #8a5c32; --accent-tint: #f6ece0; }
.accent-cocoa   { --accent: #7a5340; --accent-strong: #573729; --accent-tint: #f1e8e2; }
```
(Values are starting points; tune for contrast/appetite during the flagship review. All must pass WCAG
contrast for text on accent.)

## Motion — `src/lib/reveal.ts`

- One IntersectionObserver toggles a `is-visible` class on `[data-reveal]` elements (fade + rise).
- `[data-parallax]` gets a small translate on scroll for the signature image (rAF-throttled).
- Card hover zoom + accent transitions are pure CSS.
- Guard: if `matchMedia('(prefers-reduced-motion: reduce)')` matches, skip observers and show everything.
- Loaded once via the shared shell; ~a few lines, no dependency.

## Shared Primitives — `src/components/shared/`

- **`SignatureBand.astro`** — props: `variation`, `headline`, `whatsappMessage`. Full-bleed `<Image>`
  (eager + `fetchpriority="high"` — this is the page LCP), overlaid editorial headline + `crave` line +
  CTA, accent-aware scrim. `data-parallax` on the image.
- **`Collage.astro` / `CollageItem.astro`** — editorial asymmetric grid. Items carry `size` (lg/md/sm) so
  a page can arrange large heroes beside small supporting shots. Each item: `<Image>` (lazy, widths/sizes/
  quality per Stage 1 image rule), `id={slug}` anchor, name `<h3>`, `crave` copy, `data-reveal`, hover zoom.
- **`CategoryCta.astro`** — product-aware WhatsApp CTA. Uses `whatsappHref(category.whatsappMessage)`;
  emits `data-order-trigger` + optional `data-order-interest-preselect` for the modal.
- **`Breadcrumbs.astro`** — visible `Home / <Category>`; page builds matching `breadcrumbSchema`.
- **`RelatedLinks.astro`** — crawlable links to `/products/`, sibling categories, `/delivery/`, `/faq/`.
- **`NavLinks.astro`** — slim desktop links + mobile menu; consumed by `Layout.astro`.

### Product-aware ordering (low-risk)
The modal already delegates on `[data-order-trigger]` and has `[data-order-interest]` checkboxes. Extend
the open handler to check the interest box named in `data-order-interest-preselect` when present. Category
`wa.me` links use the category's `whatsappMessage`. No change to Stage 1 behaviour.

## Library — `src/lib/`

### `whatsapp.ts`
```ts
export const WHATSAPP_NUMBER = '60196505050';
export const whatsappHref = (message: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
export const DEFAULT_INQUIRY =
  "Hi Perlette Cakes! I'd like to enquire about a custom cake order.";
```
Then replace the duplicated `wa.me` literals in `Layout.astro` and `Landing.astro`.

### `schema.ts`
Typed builders returning plain objects for `Layout`'s `jsonLd` prop (already merged with the site `Bakery`
schema): `collectionPageSchema`, `itemListSchema` (maps variations → `ListItem` with `position`/`name`/
absolute `image`), `faqPageSchema`, `breadcrumbSchema`. Schema and visible cards generate from the same
arrays so they cannot drift.

## Per-Page Build Spec

Each page passes unique `title`/`description`/`canonicalUrl` to `Layout` and a `jsonLd` array. All get
exactly one `<h1>`, a visible WhatsApp CTA, and internal links in/out.

### `/custom-cakes/` — FLAGSHIP (accent: plum), build first
Composition:
1. `Breadcrumbs`.
2. **Answer-first intro** — `<h1>` "Custom cakes delivered across Klang Valley" + intro paragraphs
   (home-based baker, WhatsApp start, Lalamove). Kept tight; the signature band carries the mood.
3. **`SignatureBand`** — the flowery cake, full-bleed, sensory headline ("the cake people photograph
   before they cut it"), CTA. Page LCP.
4. **`Collage`** — variation set (strawberry, chocolate, vintage heart, floral, bento) as sized items with
   crave copy. Reuses placeholders at varied sizes.
5. **Use-cases + lead time** — birthdays, gifting, gatherings, corporate; lead-time + Lalamove/no-pickup.
6. **`CategoryCta`** (interest = Cake) → **`RelatedLinks`**.
- Schema: `CollectionPage` + `ItemList` (signature + variations) + `BreadcrumbList`.
- Title: `Custom Cake Delivery Klang Valley | Custom Cakes by Perlette Cakes`.

### `/cupcakes/` (coral), `/pastries/` (caramel), `/cookies/` (cocoa)
Same primitive kit, own accent + signature + copy + collage rhythm. Each is hand-authored so its layout can
differ (e.g. cookies leans festive/gifting, pastries leans warm/everyday). Schema: `CollectionPage` +
`ItemList` + `BreadcrumbList`.

### `/products/` — gateway hub (lighter)
Short intro + four category **doors** (image + name + one crave line) linking to each page, in a single
cohesive style (not four bespoke looks). Schema: `CollectionPage` + `ItemList` of categories + `BreadcrumbList`.

### `/delivery/` — clean, answer-first
Facts from `CONTEXT.md`: home-based, no storefront, Lalamove from Mont Kiara, delivery windows, no pickup,
areas served. Visible WhatsApp CTA. Schema: `WebPage` (+ `FAQPage` only if delivery Q&A shown) + `BreadcrumbList`.

### `/faq/` — clean, answer-first
All items from expanded `faqs.ts` (lead time, halal position, eggless/vegan, customisation, payment/
postponement, delivery limits). Reuse the homepage FAQ accordion. Schema: `FAQPage` + `BreadcrumbList`.

## Homepage & Global Changes

- **`Layout.astro`**: add `NavLinks`; swap inline `wa.me` for `whatsappHref(DEFAULT_INQUIRY)`; load
  `reveal.ts` and `accents.css` once.
- **`FeaturedCategories.astro`**: wrap cards in `<a href={categoryPath(slug)}>`; add `slug` to data.
- **`FactualFooter.astro`**: add a link column for the new routes.
- **`public/llms.txt`**: add the new routes under Key Links **after** pages ship.

## Analytics (GA4) — separable phase
Vendor-neutral hooks first, GA4 wiring second. Events: `whatsapp_cta_click`, `order_modal_open`,
`order_modal_submit`, `order_modal_validation_error`. Hook points already exist (`[data-order-trigger]`,
modal submit + validation branches). Never send name/phone/address/special-request text — only
category/interest, has-special-request (bool), lead-time bucket. Gate behind a measurement-ID env var so it
no-ops without config. Safe to defer past first launch.

## Build Order (flagship-first)

1. **Foundation** — `lib/whatsapp.ts`, `lib/schema.ts`, `lib/reveal.ts`, `data/catalogue.ts`,
   `data/faqs.ts`, `styles/accents.css`, path aliases. Refactor `Layout`/`Landing` to the helper.
2. **Shell** — `NavLinks` + nav update + footer links.
3. **Primitives** — `SignatureBand`, `Collage`/`CollageItem`, `CategoryCta`, `Breadcrumbs`, `RelatedLinks`.
4. **`/custom-cakes/` flagship** — full page. **→ review real look/feel, adjust.**
5. **Replicate** — `/cupcakes/`, `/pastries/`, `/cookies/` with their accents/copy.
6. **`/products/`** gateway + homepage card links.
7. **`/delivery/`, `/faq/`**.
8. **`llms.txt`** update + internal-link pass.
9. **Analytics** — hooks then GA4 (optional to defer).

## Internal Linking Matrix

| From \ To | Home | Products | custom-cakes | cupcakes/pastries/cookies | delivery | faq |
| --- | :-: | :-: | :-: | :-: | :-: | :-: |
| Home | – | ✓ | ✓ | ✓ | ✓ | ✓ |
| Products | ✓ | – | ✓ | ✓ | – | – |
| Category page | ✓ | ✓ | ✓* | ✓ (siblings) | ✓ | ✓ |
| Delivery | ✓ | ✓ | ✓ | – | – | ✓ |
| FAQ | ✓ | ✓ | ✓ | – | ✓ | – |

`*` custom-cakes links to siblings + support pages via `RelatedLinks`.

## Acceptance / Checks Before Shipping Each Page

- Exactly one `<h1>`; unique `<title>` + meta description; canonical `https://perlettecakes.com/<route>/`.
- Answer-first copy names Perlette Cakes, Klang Valley, WhatsApp, Lalamove where relevant.
- Sensory copy stays truthful — no unverified health/allergen claims.
- Accent text/background pairs pass WCAG contrast.
- Motion respects `prefers-reduced-motion`; signature image is the only eager image per page.
- JSON-LD validates and reflects only what is visible.
- `npm run astro -- check` → `npm run build` → `npm run check:images` after any image change.

## Out of Scope (unchanged)
No checkout, no payment, no accounts, no per-variation URLs unless the variation rule is met.
```
