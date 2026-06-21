# Stage One Design Direction

This document is the stage-one UI and CSS source of truth for the current Astro implementation.

## Current Build Scope

Stage one remains a single-page marketing site with one homepage route.

Current implementation checkpoint:
1. `src/layouts/Layout.astro` provides the document shell and sticky navigation
2. `src/components/index/Landing.astro` now includes the hero, owner story, featured categories, ordering steps, WhatsApp CTA, homepage FAQ, and factual footer
3. The WhatsApp inquiry modal is implemented
4. The testimonials placeholder is still pending

Relevant files for this phase:
1. `src/layouts/Layout.astro`
2. `src/components/index/Landing.astro`
3. `src/assets/styles/global.css`

## Design Thesis

Perlette Cakes should feel warm, homemade, and assured. The site should not look like a generic pastel bakery template, but it also should not drift into distant luxury branding that feels disconnected from everyday celebrations.

The cakes are the strongest asset on the page. Typography, spacing, and colour should support the products, not compete with them.

## Audience and Homepage Job

Primary audience:
1. People in Klang Valley browsing on mobile
2. Visitors arriving from Instagram, direct links, or search
3. Buyers deciding quickly whether this feels trustworthy, premium, and worth messaging

Homepage job:
1. Show what Perlette Cakes sells
2. Make the quality feel real and specific
3. Move visitors into a qualified WhatsApp inquiry

## Section Order

Stage-one homepage order remains:
1. Hero
2. Owner story
3. Featured categories
4. How ordering works
5. WhatsApp CTA
6. Testimonials placeholder
7. FAQ
8. Factual footer

The CTA should appear immediately after the ordering steps, while intent is highest. FAQ should sit near the end to reduce friction before the factual footer.

## Reference Read

Keep from the reference sites:
1. `levainbakery.com`: product-led composition and confidence
2. `eatcabalar.com`: large type paired with imagery
3. `kalmkitchen.co.uk`: restraint and whitespace

Avoid from the rejected references:
1. Flat one-column layouts with no visual pacing
2. Overly busy colour application
3. Generic bakery UI patterns that could belong to any brand

## UI Direction

Overall feel:
1. Warm cream base
2. Deep cocoa text
3. Rose-led accents
4. Small gold highlights used sparingly
5. Editorial structure with product warmth rather than formal luxury

Homepage composition rules:
1. The navigation and hero must share the same content width and left-right padding
2. The hero should read as an editorial split, not a narrow stacked text column
3. One product image should dominate the hero rather than a collage or carousel
4. Every major section should feel like a distinct chapter with clear vertical spacing
5. Layout changes should come from composition and image treatment, not decorative clutter

## Typography Direction

Stage-one type pairing is locked to `Fraunces + Geist`.

Roles:
1. `Fraunces` is the display face for headings and expressive brand moments
2. `Geist Sans` is the body and UI face for copy, buttons, labels, and supporting information
3. The wordmark may use `Fraunces` with italic styling, but no third font should be introduced

Hero headline rules:
1. The desktop hero headline must stay within 2 to 3 lines
2. Do not force manual line breaks with wrapper spans just to control composition
3. Use a wider content measure before increasing font size
4. Supporting copy should stay concise and factual

## CSS Maintainability Rules

Keep the CSS simple enough that future sections can be edited quickly without reconstructing the entire layout in your head.

Rules for future sessions:
1. Prefer one layout primitive per section
2. Use `flex` for one-dimensional stacks and simple action rows
3. Use `grid` only when a section genuinely needs multiple columns or card placement
4. Keep wrappers to a minimum and avoid nested layout helpers unless they remove more complexity than they add
5. Use tokens and shared primitives for spacing, buttons, containers, focus states, and muted text
6. Do not keep decorative or speculative CSS that is not attached to live markup
7. Prefer specific values and named tokens over `calc(...)`-heavy layout rules
8. Keep `clamp(...)` primarily for responsive type, not for avoidable layout math
9. Let one visual idea carry each section; do not layer multiple competing accents, frames, and flourishes onto the same block

## Style Ownership Boundary

`src/assets/styles/global.css` owns:
1. Font imports
2. Design tokens
3. Reset and base element styles
4. Shared layout primitives such as the content container
5. Shared button styles
6. Shared text helpers such as muted copy and eyebrows
7. Focus states

`src/layouts/Layout.astro` owns:
1. Navigation-specific styling
2. Layout-shell styling that is not reused by page sections

Section components own:
1. Their own composition
2. Their own spacing adjustments
3. Their own media treatment
4. Their own local responsive rules

## Token Direction

These are the stage-one implementation tokens to preserve and extend carefully.

### Colours

```css
:root {
  --color-bg: #fffdfb;
  --color-surface: #ffffff;
  --color-surface-soft: #f7f1eb;
  --color-text: #2b2622;
  --color-text-muted: #6e655e;
  --color-primary: #c98b9a;
  --color-primary-ink: #7a4a57;
  --color-primary-strong: #693f4a;
  --color-accent: #c9a24b;
  --color-border: #ece5de;
}
```

Usage:
1. `--color-primary-ink` is the main strong brand colour for CTAs and emphasis
2. `--color-primary-strong` is reserved for hover and active states
3. `--color-accent` is garnish only, never the dominant interface colour
4. Transparent nav or overlay colours should be tokenized if reused

### Typography

```css
:root {
  --font-display: "Fraunces Variable", Georgia, "Times New Roman", serif;
  --font-body: "Geist Sans", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;

  --step--1: clamp(0.83rem, 0.8rem + 0.15vw, 0.9rem);
  --step-0: clamp(1rem, 0.95rem + 0.25vw, 1.125rem);
  --step-1: clamp(1.25rem, 1.15rem + 0.5vw, 1.5rem);
  --step-2: clamp(1.56rem, 1.4rem + 0.8vw, 2rem);
  --step-3: clamp(1.95rem, 1.7rem + 1.25vw, 2.75rem);
  --step-4: clamp(2.44rem, 2rem + 2.2vw, 3.75rem);
}
```

Usage:
1. Headings should feel editorial, not dainty
2. Buttons and labels should stay in `Geist Sans`
3. Do not mix in a third family for visual interest

### Spacing and Layout

```css
:root {
  --space-xs: 0.5rem;
  --space-sm: 0.75rem;
  --space-md: 1rem;
  --space-lg: 1.5rem;
  --space-xl: 2.5rem;
  --space-2xl: 4rem;
  --space-3xl: 6rem;

  --radius-sm: 6px;
  --radius-md: 12px;
  --radius-lg: 20px;
  --radius-xl: 32px;

  --content-max: 110rem;
}
```

Usage:
1. Rounded corners should feel soft but not playful
2. Shared containers should use the same max width and horizontal padding across nav and sections
3. Section spacing should use explicit steps, not improvised one-off gaps

## Section-Level Intent

### Hero

1. One dominant strawberry cake image
2. Clear answer-first statement about custom cakes and pastries in Klang Valley
3. Immediate WhatsApp CTA
4. Short factual support line covering ordering method, lead time, or delivery
5. Simple structure: intro block, action block, factual support, media block

### Owner Story

1. Use the motto and homemade care positioning
2. Keep it warm and personal without becoming overly long
3. Use a placeholder visual treatment until an owner image is available

### Featured Categories

1. Four category cards with strong photography
2. Short practical descriptors, not long sales copy
3. Avoid four identical boring cards; use pacing in the overall section

### How Ordering Works

1. Simple sequence with plain-language steps
2. Explicitly mention WhatsApp and Lalamove
3. End with a CTA immediately after this section

### WhatsApp CTA

1. Strong invitation to start an inquiry
2. Should feel crafted, not like a generic full-width banner
3. Must stay consistent with the live order inquiry modal flow

### Testimonials Placeholder

1. Reserve space cleanly without inventing quotes
2. Use a holding message that signals real feedback is coming

### FAQ

1. Short, factual answers
2. Focus on lead time, delivery area, customization, and dietary discussion via WhatsApp

### Footer

1. Repeat the core facts cleanly
2. Include no-storefront and delivery-only language
3. Keep it factual, not decorative

## Implementation Notes

1. Use `astro:assets` for content images
2. Keep the homepage as real HTML, not hidden in JS
3. Build the visual system in `global.css` first so later sections inherit consistency
4. Default paragraph text should inherit the primary text colour; use a muted helper class intentionally
5. Match the public voice choice of `we / our` unless that decision changes explicitly
6. Keep the canonical location wording aligned with `Klang Valley, Malaysia`
