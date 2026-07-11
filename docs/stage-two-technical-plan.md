# Stage 2 Technical Implementation Plan

Engineering blueprint for Stage 2. Pairs with `stage-two-implementation-plan.md` (content/strategy),
`routes.md` (URL map), and `discoverability.md` (SEO acceptance). This doc covers **how** we build it:
architecture, data model, shared components, schema, and phasing.

## Principles

- **Data-driven, not copy-pasted.** Five category-shaped pages share one template and one typed
  catalogue. Bespoke content lives in data or in `/custom-cakes/`, not duplicated across `.astro` files.
- **Reuse the existing design system.** No new tokens, fonts, or button styles. New components consume
  `global.css` variables and existing classes (`.content-shell`, `.button`, `.button--primary`).
- **HTML-first + crawlable.** Every fact that matters ships as server-rendered HTML with matching JSON-LD.
- **Small, explicit surface.** No dynamic-route magic where three thin files read clearer. No new deps.

## Key Architecture Decisions

| Decision | Choice | Why |
| --- | --- | --- |
| Category pages | Shared `<CategoryTemplate>` component; thin per-route pages | DRY the repetitive 3, keep each URL explicit and tweakable |
| `/custom-cakes/` | Hand-authored page reusing the same building blocks | It is the money page and earns bespoke sections |
| Data | One typed `src/data/catalogue.ts` | Single source for copy, images, schema, WhatsApp messages |
| WhatsApp links | `src/lib/whatsapp.ts` helper | Currently duplicated in `Layout` + `Landing`; make product-aware |
| JSON-LD | `src/lib/schema.ts` builders | `CollectionPage`/`ItemList`/`FAQPage`/`BreadcrumbList` from data |
| Images | Reuse existing assets via data layer, marked `TODO` | Real photography added later without touching components |
| Path aliases | Use existing `@components/*`, `@layouts/*`; add `@lib/*`, `@data/*` | Consistent imports across new files |

## New File Structure

```
src/
  lib/
    whatsapp.ts              # number + product-aware href builder
    schema.ts                # JSON-LD builders (typed)
  data/
    catalogue.ts             # categories + variations (typed, single source)
    faqs.ts                  # rename/expand of homeFaqs.ts; category-tagged
  components/
    category/
      CategoryTemplate.astro # full category page body (intro + grid + CTA + links)
      VariationGrid.astro    # grid wrapper
      VariationCard.astro    # single card (Image + name + factual copy)
      Breadcrumbs.astro      # visible trail; schema built in page
      RelatedLinks.astro     # internal-link block
      CategoryCta.astro      # product-aware WhatsApp CTA (thin wrap of existing pattern)
  pages/
    custom-cakes.astro       # hand-authored money page
    cupcakes.astro           # thin -> CategoryTemplate
    pastries.astro           # thin -> CategoryTemplate
    cookies.astro            # thin -> CategoryTemplate
    products.astro           # browse-all hub
    delivery.astro           # WebPage (+ optional FAQPage)
    faq.astro                # FAQPage
```

`homeFaqs.ts` is renamed to `faqs.ts` and re-exported so `index.astro` keeps working during the move.

## Data Model — `src/data/catalogue.ts`

```ts
import type { ImageMetadata } from 'astro';

// Reuse existing assets as placeholders. Swap the import + alt when real photos land.
// TODO(images): replace placeholder imports with per-variation photography.
import cakesImage from '../assets/images/index/variety-cakes.JPG';
import flowerCake from '../assets/images/index/hero-flowery-cake.JPG';
import cupcakesImage from '../assets/images/index/variety-cupcakes.JPG';
import pastriesImage from '../assets/images/index/variety-pastries.JPG';
import cookiesImage from '../assets/images/index/variety-cookies.JPG';

export interface Variation {
  slug: string;          // anchor id now; dedicated URL later if the variation rule is met
  name: string;
  description: string;   // factual, answer-first, no unverified claims
  image: ImageMetadata;
  imageAlt: string;
  placeholderImage?: boolean; // true while reusing a stand-in asset
}

export type CategorySlug = 'custom-cakes' | 'cupcakes' | 'pastries' | 'cookies';

export interface Category {
  slug: CategorySlug;
  name: string;              // "Custom Cakes"
  navLabel: string;          // short nav/footer label
  // SEO
  title: string;             // <title>
  description: string;       // meta description
  h1: string;                // exactly one per page
  intro: string[];           // answer-first lead paragraphs (Perlette Cakes, Klang Valley, WhatsApp, Lalamove)
  useCases?: string[];       // birthdays, gifting, corporate, etc.
  leadTimeNote: string;      // reuse CONTEXT lead-time language
  // ordering
  whatsappMessage: string;   // product-aware pre-fill for wa.me
  modalInterest?: string;    // pre-checks a modal "Interested In" option (Cake/Cupcakes/...)
  // content
  variations: Variation[];
  relatedFaqTags?: string[]; // pulls matching items from faqs.ts
}

export const categories: Category[] = [ /* one record per CategorySlug */ ];

export const categoryBySlug = (slug: CategorySlug) =>
  categories.find((c) => c.slug === slug)!;

export const categoryPath = (slug: CategorySlug) => `/${slug}/`;
export const categoryUrl = (slug: CategorySlug) =>
  `https://perlettecakes.com/${slug}/`;
```

Placeholder image mapping (reuse only, until real assets arrive):

| Category | Placeholder asset(s) |
| --- | --- |
| Custom Cakes | `variety-cakes.JPG`, `hero-flowery-cake.JPG` |
| Cupcakes | `variety-cupcakes.JPG`, `hero-cupcakes.JPG` |
| Pastries | `variety-pastries.JPG` |
| Cookies | `variety-cookies.JPG` |

Every placeholder variation sets `placeholderImage: true` so we can grep for what still needs real photos.

## Library — `src/lib/`

### `whatsapp.ts`
```ts
export const WHATSAPP_NUMBER = '60196505050'; // numeric only, matches schema

export function whatsappHref(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const DEFAULT_INQUIRY =
  "Hi Perlette Cakes! I'd like to enquire about a custom cake order.";
```
Then replace the duplicated template literals in `Layout.astro` and `Landing.astro` with `whatsappHref(DEFAULT_INQUIRY)`.

### `schema.ts`
Typed builders returning plain objects for `Layout`'s `jsonLd` prop (which already merges them with the site `Bakery` schema):
```ts
collectionPageSchema({ name, description, url })      // @type CollectionPage
itemListSchema(url, items[{ name, url?, image?, description }])  // @type ItemList (ListItem[])
faqPageSchema(items[{ question, answer }])            // @type FAQPage
breadcrumbSchema(trail[{ name, url }])                // @type BreadcrumbList
```
`itemListSchema` maps each variation to a `ListItem` with `position`, `name`, and `image` (absolute URL
from the processed asset's `src`). This keeps schema and visible cards generated from the same array.

## Shared Components — `src/components/category/`

- **`CategoryTemplate.astro`** — props: `category: Category`. Renders: `Breadcrumbs` -> answer-first
  intro (`<h1>` + `intro` paragraphs + optional use-cases) -> `VariationGrid` -> `CategoryCta` ->
  `RelatedLinks`. This is the entire body for cupcakes/pastries/cookies.
- **`VariationGrid.astro`** — props: `variations`. Same responsive grid rules as `FeaturedCategories`
  (1 col -> 2 cols at `48rem` -> 4 at `100rem`), reusing the existing card/media styles.
- **`VariationCard.astro`** — `<Image>` with `widths={[360,540,720]}`, `sizes` matching the grid,
  `quality={65}`, `loading="lazy"` (see LCP note below), `id={slug}` anchor, name as `<h3>`, factual
  `<p class="text-muted">`.
- **`Breadcrumbs.astro`** — visible `Home / <Category>` trail; the page builds matching
  `breadcrumbSchema`.
- **`RelatedLinks.astro`** — crawlable internal links to `/products/`, sibling categories, `/delivery/`,
  and `/faq/`.
- **`CategoryCta.astro`** — thin variant of `WhatsAppCta` taking `message` + `modalInterest`, wiring the
  product-aware pre-fill and modal pre-selection (below).

### LCP note
On category pages the **first** variation image is the likely LCP. Give `VariationGrid` a `firstEager`
prop so card index 0 renders `loading="eager"` + `fetchpriority="high"`; the rest stay lazy. Matches the
Stage 1 image rule in `discoverability.md`.

## Product-Aware Ordering (low-risk enhancement)

The modal already delegates on `[data-order-trigger]` and has `[data-order-interest]` checkboxes.
Add an optional `data-order-interest-preselect="Cupcakes"` attribute on category CTAs; extend the modal's
open handler to check the matching interest box when present. Category `wa.me` links use the category's
`whatsappMessage`. No breaking change to Stage 1 behaviour. Satisfies the funnel's "more product-aware"
Stage 2 goal.

## Per-Page Build Spec

Each page passes unique `title`/`description`/`canonicalUrl` to `Layout` and a `jsonLd` array from the
schema builders. All get exactly one `<h1>`, a visible WhatsApp CTA, and internal links.

### `/custom-cakes/` (hand-authored, build first)
- Sections: answer-first hero (`<h1>` = "Custom cakes delivered across Klang Valley") -> what/who-for
  (birthdays, gifting, gatherings, corporate, small celebrations) -> variation grid -> lead time +
  delivery method (Lalamove, no pickup) -> `CategoryCta` -> `RelatedLinks`.
- Schema: `CollectionPage` + `ItemList` (variations) + `BreadcrumbList`.
- Title: `Custom Cake Delivery Klang Valley | Custom Cakes by Perlette Cakes`

### `/cupcakes/`, `/pastries/`, `/cookies/` (shared template)
- Body: `<CategoryTemplate category={categoryBySlug('cupcakes')} />`.
- Schema: `CollectionPage` + `ItemList` + `BreadcrumbList`, built from the same record.

### `/products/` (browse-all hub)
- Short intro + four category cards **as links** (reuse `FeaturedCategories` styling, now anchored).
- Schema: `CollectionPage` + `ItemList` of the four categories + `BreadcrumbList`.

### `/delivery/`
- Facts from `CONTEXT.md`: home-based, no storefront, Lalamove from Mont Kiara, delivery windows, no
  pickup, areas served (Klang Valley, Malaysia). Visible WhatsApp CTA.
- Schema: `WebPage` (+ `FAQPage` only if delivery Q&A is shown) + `BreadcrumbList`.

### `/faq/`
- Render all items from `faqs.ts` (expanded: lead time, allergens/halal position, eggless/vegan,
  customisation, payment/deposit, delivery limits). Reuse the homepage FAQ accordion component.
- Schema: `FAQPage` + `BreadcrumbList`.

## Homepage & Global Changes

- **`FeaturedCategories.astro`**: wrap each card in `<a href={categoryPath(slug)}>`; add category `slug`
  to its data. Keep visuals identical.
- **Navigation** (recommended, small): add `Products`, `Delivery`, `FAQ` links to `site-nav` beside the
  brand; collapse to the existing CTA on narrow widths. Improves crawl depth and UX. Optional but cheap.
- **`FactualFooter.astro`**: add a link column for the new routes.
- **`Layout.astro` / `Landing.astro`**: swap inline `wa.me` literals for `whatsappHref(DEFAULT_INQUIRY)`.
- **`public/llms.txt`**: add the new routes under Key Links **after** pages ship.

## Analytics (GA4) — separable phase

Vendor-neutral hooks first, GA4 wiring second (per `funnel.md` / `stage-two-readme.md`):
- Events: `whatsapp_cta_click`, `order_modal_open`, `order_modal_submit`, `order_modal_validation_error`.
- Hook points already exist: `[data-order-trigger]` (click/open), modal submit + validation branches.
- **Never** send receiver name, phone, address, or special-request text to GA4. Send only:
  category/interest, has-special-request (bool), lead-time bucket.
- Ship as a small module gated behind a measurement-ID env var so it no-ops without config.

## Build Order (phased)

1. **Foundation** — `lib/whatsapp.ts`, `lib/schema.ts`, `data/catalogue.ts`, `data/faqs.ts`, path aliases.
   Refactor `Layout`/`Landing` to the WhatsApp helper (no visible change).
2. **Category kit** — `category/*` components. Validate against one record.
3. **`/custom-cakes/`** — hand-authored, wired to schema + CTA. First shippable page.
4. **`/delivery/`, `/faq/`** — highest-intent support pages.
5. **`/cupcakes/`, `/pastries/`, `/cookies/`** — via `CategoryTemplate`.
6. **`/products/`** hub + homepage card links + nav/footer links.
7. **`llms.txt`** update + internal-link pass.
8. **Analytics** — hooks then GA4 (optional to defer past first launch).

## Internal Linking Matrix

| From \ To | Home | Products | custom-cakes | cupcakes/pastries/cookies | delivery | faq |
| --- | :-: | :-: | :-: | :-: | :-: | :-: |
| Home | – | ✓ | ✓ | ✓ | ✓ | ✓ |
| Products | ✓ | – | ✓ | ✓ | – | – |
| Category page | ✓ | ✓ | ✓* | ✓ (siblings) | ✓ | ✓ |
| Delivery | ✓ | ✓ | ✓ | – | – | ✓ |
| FAQ | ✓ | ✓ | ✓ | – | ✓ | – |

`*` custom-cakes links to siblings and support pages via `RelatedLinks`.

## Acceptance / Checks Before Shipping Each Page

- Exactly one `<h1>`; unique `<title>` + meta description; canonical `https://perlettecakes.com/<route>/`.
- Answer-first copy names Perlette Cakes, Klang Valley, WhatsApp, Lalamove where relevant.
- JSON-LD validates and reflects only what is visible on the page.
- Internal links in and out; entity facts match `CONTEXT.md`.
- `npm run astro -- check` (types) → `npm run build` → `npm run check:images` after any image change.

## Out of Scope (unchanged from Stage 2 plan)

No checkout, no payment, no accounts, no per-variation URLs unless the variation rule is met.
```
