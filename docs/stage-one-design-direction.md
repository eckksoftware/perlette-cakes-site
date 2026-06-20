# Stage One Design Direction

This document captures the visual system and layout direction for the first public homepage build.

## Design Thesis

Perlette Cakes should feel warm, homemade, and assured. The site should not look like a generic pastel bakery template or a luxury patisserie brand that feels distant from everyday celebration orders.

The strongest signal should be the cakes themselves. Layout, typography, and colour should frame the products and support trust, not compete with them.

## Audience and Homepage Job

Primary audience:
1. People in Klang Valley browsing on mobile
2. Visitors arriving from Instagram, direct links, or search
3. Buyers deciding quickly whether this feels trustworthy, premium, and message-worthy

Homepage job:
1. Show what Perlette Cakes sells
2. Make the quality feel real and specific
3. Move visitors into a qualified WhatsApp inquiry

## Section Order

Stage-one homepage order is locked as:
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
1. `levainbakery.com`: strong product-led composition and confidence
2. `eatcabalar.com`: large type paired with imagery
3. `kalmkitchen.co.uk`: restraint and whitespace

Avoid from the rejected references:
1. Flat one-column layouts with no visual pacing
2. Overly busy colour application
3. Generic bakery UI patterns that could belong to any brand

## Visual Direction

Overall feel:
1. Warm cream base
2. Deep cocoa text
3. Rose-led accents
4. Small gold highlights used sparingly
5. Editorial structure with product warmth rather than formal luxury

Signature move:
1. Use large serif headlines with offset image blocks and small factual labels
2. Let one product image dominate the hero rather than using a carousel or dense collage
3. Use framed content cards selectively so the page feels crafted rather than boxy

## CSS Maintainability Rule

Keep the CSS simple enough that future sections can be edited quickly without needing to mentally reconstruct the whole component.

Rules for future sessions:
1. Prefer one clear layout primitive per section, usually a stack or a two-column grid, not several overlapping layout systems
2. Keep wrappers to a minimum and avoid nested utility wrappers unless they remove more complexity than they add
3. Use tokens and shared global primitives for spacing, buttons, containers, and muted text instead of re-declaring them per section
4. Do not keep decorative CSS that is not attached to live markup
5. Let one visual idea carry each section; avoid adding multiple competing accents, cards, captions, or framing devices at once
6. If a layout can be expressed with a handful of selectors, prefer that over a more clever but harder-to-maintain version

## Initial Token System

These are the implementation tokens to start with. Adjust only if a real visual conflict appears during the build.

### Colours

```css
:root {
  --color-bg: #FFFDFB;
  --color-surface: #FFFFFF;
  --color-surface-soft: #F7F1EB;
  --color-text: #2B2622;
  --color-text-muted: #6E655E;
  --color-primary: #C98B9A;
  --color-primary-ink: #7A4A57;
  --color-accent: #C9A24B;
  --color-border: #ECE5DE;
  --color-shadow: rgba(43, 38, 34, 0.10);
}
```

Usage:
1. `--color-primary` for buttons, links, and selected states
2. `--color-primary-ink` for hover, active, and stronger type accents
3. `--color-accent` only as garnish for separators, small labels, or highlights
4. `--color-surface-soft` for alternating section backgrounds

### Typography

```css
:root {
  --font-wordmark: "Pinyon Script", "Fraunces", serif;
  --font-display: "Fraunces", Georgia, "Times New Roman", serif;
  --font-body: "Inter", system-ui, -apple-system, sans-serif;

  --step--1: clamp(0.83rem, 0.8rem + 0.15vw, 0.9rem);
  --step-0: clamp(1rem, 0.95rem + 0.25vw, 1.125rem);
  --step-1: clamp(1.25rem, 1.15rem + 0.5vw, 1.5rem);
  --step-2: clamp(1.56rem, 1.4rem + 0.8vw, 2rem);
  --step-3: clamp(1.95rem, 1.7rem + 1.25vw, 2.75rem);
  --step-4: clamp(2.44rem, 2rem + 2.2vw, 3.75rem);
}
```

Usage:
1. Wordmark only gets the expressive script-like treatment
2. Headings use `Fraunces` with enough size to feel editorial, not delicate
3. Body copy stays in `Inter` for readability on mobile

### Spacing, Radius, and Layout

```css
:root {
  --space-xs: 0.5rem;
  --space-sm: 0.75rem;
  --space-md: 1rem;
  --space-lg: 1.5rem;
  --space-xl: 2.5rem;
  --space-2xl: 4rem;

  --radius-sm: 6px;
  --radius-md: 12px;
  --radius-lg: 20px;

  --shadow-sm: 0 1px 3px rgba(43, 38, 34, 0.08);
  --shadow-md: 0 8px 24px rgba(43, 38, 34, 0.10);

  --content-max: 72rem;
}
```

Usage:
1. Rounded corners should feel soft but not playful
2. Shadows stay subtle; product photography should create depth more than UI chrome
3. Mobile-first spacing should feel airy without making the page drag

## Section-Level Intent

### Hero

1. One dominant strawberry cake image
2. Clear answer-first statement about custom cakes and pastries in Klang Valley
3. Immediate WhatsApp CTA
4. Supporting factual points such as lead time, delivery method, and service area
5. Keep the hero structurally simple: one intro block, one media block, one quiet meta line

### Owner Story

1. Use the motto and homemade care positioning
2. Keep it warm and personal without becoming overly long
3. Use a placeholder visual treatment until an owner image is available

### Featured Categories

1. Four category cards with strong photography
2. Short practical descriptors, not long sales copy
3. Keep this section useful for both browsing and future reuse in stage two

### How Ordering Works

1. Simple sequence with plain-language steps
2. Explicitly mention WhatsApp and Lalamove
3. End with a CTA immediately after this section

### WhatsApp CTA

1. Strong invitation to start an inquiry
2. Should feel like a crafted card, not a generic banner
3. Designed to support the future category-selection modal

### Testimonials Placeholder

1. Reserve space cleanly without inventing quotes
2. Use a holding message that signals real feedback is coming

### FAQ

1. Short, factual answers
2. Focus on lead time, delivery area, customization, and dietary discussion via WhatsApp

### Footer

1. Repeat the core facts cleanly
2. Include no storefront and delivery-only language
3. Keep it factual, not decorative

## Implementation Notes

1. Use `astro:assets` for content images during the build pass
2. Keep the homepage as real HTML, not hidden in JS
3. Defer full metadata polish until the homepage structure and copy are stable
4. Build the visual system in `global.css` first so later sections inherit consistency
5. Default paragraph text should inherit the primary text colour; use a muted helper class intentionally rather than muting all paragraphs globally
