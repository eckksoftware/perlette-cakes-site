# AGENTS.md — Perlette Cakes

Guidance for AI agents and contributors working in this repository. Read this before generating or editing code. Keep changes consistent with the conventions below.

---

## 1. What this is

Perlette Cakes is a **homemade baker** in the Klang Valley, Malaysia. There is **no physical storefront** — cakes and pastries are baked to order and delivered to clients via **Lalamove**. Orders are taken through **WhatsApp**, not an online checkout.

The site exists to:

1. **Tell the brand story** — who the baker is, how the bakes are made, build trust, allow customers to scroll through products and easily place an order for owner.
2. **Funnel visitors into a WhatsApp order** — the primary conversion action where a standardized message is created based on the products chosen by customers.

There is no backend, no database, and no user accounts. Keep it that way unless explicitly told otherwise.

### Core priorities — treat these as co-equal

Three concerns carry equal weight on every change. A page is not "done" if it nails one and neglects the others:

- **A. Distinctive, on-brand design** — the site should look crafted, not templated (see §6–§7).
- **B. Search discoverability (SEO)** — rank for local + seasonal intent in Malaysia (see §8).
- **C. AI / LLM discoverability (GEO/AEO)** — be the source an AI assistant cites when someone asks it "where can I order a custom / Hari Raya / CNY cake near me in the Klang Valley?" (see §8).

B and C are not afterthoughts bolted on at the end. Because there is no storefront and no ad spend, **being found is the business.** Every new page and component must be evaluated against all three. When design and discoverability appear to conflict (e.g. text baked into an image, content hidden behind JS), discoverability wins — find a design solution that keeps content as real, crawlable HTML.

---

## 2. Tech stack

| Concern | Choice | Notes |
|---|---|---|
| Framework | **Astro** (SSG / `output: 'static'`) | All pages pre-rendered to static HTML. |
| Language | **TypeScript** | Use `.astro` + `.ts`. Avoid loose `any`. |
| Styling | **Vanilla CSS** | One global `src/assets/styles/global.css` with design tokens; split into scoped/component styles only when it gets unwieldy (see §6). **No Tailwind, no CSS frameworks.** |
| Images | **`astro:assets`** (`<Image />`) | Mandatory for all content images (see §8). |
| Fonts | **`@fontsource` (self-hosted)** | No external Google Fonts CDN — better perf/SEO. |
| Client JS | **Minimal** | Use JS when needed. The shared inquiry modal is the only current interactive surface (see §9). |
| Hosting | Static host (Cloudflare Pages) | Build output is `./dist`. |
| Node | **22 LTS+** | |
| Package manager | **npm** | Use the repository's npm lockfile. |

> **Assumptions to confirm:** static SSG, English as primary language with Malay keywords on seasonal pages. If a bilingual (BM/EN) site is wanted, flag it — it changes routing and SEO.

---

## 3. Commands

```bash
npm install          # install deps
npm run dev          # dev server → http://localhost:4321
npm run build        # production build → ./dist
npm run preview      # preview the built site
npm run astro check  # type-check (run before committing)
```

Recommended integrations: `@astrojs/sitemap`, `sharp` (image compression, default in Astro), and `@fontsource-variable/fraunces`.

---

## 4. Project structure

```
src/
  assets/
    styles/
      global.css            # active design tokens + base styles
  pages/                  # routes — hardcoded .astro pages, one file per URL
    index.astro           # single work-in-progress page
  layouts/
    Layout.astro          # <head>, meta/SEO, fonts, and modal mount
  components/
    OrderInquiryModal.astro # shared WhatsApp inquiry modal
  public/                   # static passthrough: favicon, robots.txt, llms.txt, social assets
astro.config.mjs
```

**Architectural rules**

- **One `.astro` file per route.** No dynamic `[slug]` routing — pages are authored by hand for editorial control and SEO.
- The current site includes one hand-authored work-in-progress homepage.
- The shared inquiry flow lives in `src/components/OrderInquiryModal.astro` and is mounted once from `src/layouts/Layout.astro`.
- Keep the CSS refactor in `src/assets/styles/global.css` as the baseline; remove dead tokens before adding new ones.

---

## 5. Pages & their job

| URL | Purpose | SEO/conversion note |
|---|---|---|
| `/` | Work-in-progress page with real bake photography and a WhatsApp CTA | Only current public route; the order CTA must remain visible in the central page message. |
| `/products/`, `/about/`, `/delivery/`, `/faq/` | Paused future routes | Add only after the owner approves the replacement site direction. |
| `/order/`, `/occasions/*` | Later backlog | Add only when the dedicated use case is ready. |

**Recommended additions:** a `/gallery` (visual showcase — strong for a cake brand), a `/privacy` page (trust + needed if any form data is handled), and a `404.astro`. A future `/journal` (blog) would help SEO but is optional.

---

## 6. Styling rules (vanilla CSS)

- **Start in `src/assets/styles/global.css`.** It holds: design tokens (`:root`), a small reset, base element styles, and shared utility classes. Split a component's CSS into its own `<style>` block (scoped) **only** when global.css becomes hard to scan — not preemptively.
- **Use design tokens, never raw values.** No hardcoded hex colours, px font sizes, or magic spacing in components — reference the CSS custom properties below.
- **Mobile-first.** Write base styles for small screens; layer `min-width` media queries up.
- **Class naming:** simple, low-specificity, BEM-lite (`.card`, `.card__title`, `.card--featured`). Avoid deep selector nesting and `!important`.
- **Layout** via CSS Grid / Flexbox. No layout libraries.
- Prefer **semantic HTML** (`<header>`, `<main>`, `<section>`, `<article>`, `<nav>`, `<footer>`) over `<div>` soup.

### Design tokens (put in `:root` in `global.css`)

```css
:root {
  --color-page:         #FBF7F2; /* page background */
  --color-surface:      #FFFDFB; /* cards / raised areas */
  --color-surface-soft: #F2E6E0;
  --color-text:         #302A32;
  --color-text-muted:   #5F5558;
  --color-primary:      #E2BFC6; /* primary CTA surface */
  --color-primary-ink:  #6F3F4D; /* readable brand ink */
  --color-primary-strong: #7F4657;
  --color-on-primary:   #302A32;
  --color-border:       #D9C8C3;
  --color-shadow:       rgba(73, 47, 52, 0.15);

  /* ===== Typography ===== */
  --font-display: "Fraunces", Georgia, "Times New Roman", serif;
  --font-body:    "Zarathustra", Georgia, "Times New Roman", serif;

  /* Modular type scale (1.250 — minor third) */
  --step--1: clamp(0.83rem, 0.8rem + 0.15vw, 0.9rem);
  --step-0:  clamp(1rem,    0.95rem + 0.25vw, 1.125rem);

  /* ===== Spacing scale ===== */
  --space-xs: 0.5rem;  --space-sm: 0.75rem; --space-md: 1rem;
  --space-lg: 1.5rem;  --space-xl: 2.5rem;  --space-2xl: 4rem;

  /* ===== Radius / elevation ===== */
  --radius-md: 12px;  --radius-lg: 20px;  --radius-xl: 32px;
  --shadow-md: 0 12px 28px var(--color-shadow);
}
```

### Fonts — recommended pairing

- **Headings / display: Fraunces** — a soft, characterful old-style serif with optical sizing. Warm and artisanal without losing elegance; widely used by craft/food brands. Suits "Perlette."
- **Body: Zarathustra** — the current self-hosted body/UI font; keep its bundled SIL OFL licence with the project.
- **Accents:** use *Fraunces italic* for accent/quote text rather than adding a third font. If a decorative script is wanted for the wordmark only, *Pinyon Script* — used **once**, never for body or headings.
- Self-host via `@fontsource`; set `font-display: swap`; subset to Latin. Two families max.

> Type usage: headings → `--font-display`; everything else → `--font-body`. Don't introduce new fonts or font weights without updating the tokens.

---

## 7. Brand & voice

- **Tone:** warm, personal, homemade-but-premium. First person ("I bake…") is fine — this is one person's craft, not a faceless brand.
- **Imagery:** real photos of the actual bakes. No generic stock cake photos.
- Avoid overusing the gold accent — it loses its effect. Rose (`--color-primary`) drives CTAs; gold is a garnish.

---

## 8. Discoverability — SEO + AI/LLM (a core goal, equal to design)

This section is load-bearing. Treat its checklist as acceptance criteria for every page, not optional polish. The static-HTML + semantic-markup foundation here serves traditional search engines and AI answer engines at the same time.

### 8a. Images
- Always use `<Image />` from `astro:assets` for content images; import from `src/assets/`. Never drop raw `<img>` for content photos.
- Provide `width`/`height` (prevents layout shift) and **descriptive `alt`** text — e.g. `alt="Two-tier ondeh-ondeh cake with pandan buttercream"`. Alt text is read by both search crawlers and multimodal LLMs, so describe the actual bake.
- Let Astro emit WebP/AVIF; keep source files reasonable. `loading="lazy"` below the fold; hero may be eager.
- **Never put load-bearing text inside an image** (prices, key claims, descriptions) — it's invisible to crawlers and LLMs. Use real HTML over the image instead.

### 8b. Traditional SEO (every page)
- Unique `<title>` and `<meta name="description">` per page via `Layout` props.
- Exactly one `<h1>`; logical heading order (no skipped levels). Headings should mirror real search phrasing.
- Open Graph + Twitter card tags; per-page OG image where it matters.
- Canonical URL on every page.
- `sitemap.xml` (`@astrojs/sitemap`) + a `robots.txt`.
- **Local/seasonal keywords**, woven naturally: Malaysia + occasion terms (e.g. "kuih raya", "CNY cookies", "custom birthday cake delivery Klang Valley"). One occasion per URL.
- Keep Core Web Vitals green — Astro's zero-JS default does most of this; don't undo it.

### 8c. AI / LLM discoverability (GEO/AEO) — equally required
LLMs and AI search (ChatGPT, Claude, Perplexity, Gemini, Google AI Overviews) recommend businesses by extracting **clear, self-contained, factual statements** from crawlable pages. Optimize for being *quoted and cited*, not just ranked.

- **Answer-first content.** Lead each section with a direct, factual answer, then elaborate. State delivery areas, lead time, price ranges, and how to order in plain declarative sentences an assistant can lift verbatim. Avoid burying facts in marketing fluff.
- **Entity clarity & consistency.** State *who* (Perlette Cakes), *what* (homemade custom cakes & pastries), *where* (Klang Valley, Malaysia), *how to order* (WhatsApp) explicitly and identically across pages, schema, and social. Inconsistent name/area/contact confuses entity resolution.
- **Question-shaped headings + FAQ.** Use real user questions as `<h2>`/`<h3>` ("How long does a custom cake take to order?", "Which areas do you deliver to?"). Back the FAQ page with `FAQPage` schema.
- **Structured data is the priority signal for AEO.** Ship rich JSON-LD (see 8d). LLMs and AI search lean heavily on it.
- **Self-contained pages.** Each page should make sense quoted in isolation — don't rely on context only available by reading other pages.
- **Real, attributable content.** Genuine reviews (with `Review`/`AggregateRating` schema), specific bake names, real provenance (training, location) — concrete facts get cited; vague claims don't.
- **Crawlability for AI bots** (see 8e). If the content isn't fetchable, it can't be recommended.

### 8d. Structured data (JSON-LD) — required
Site-wide `Bakery`/`LocalBusiness` in `Layout`, plus page-specific schema: `Product` (+ `Offer`) on `/cake`, `FAQPage` on `/faq`, `Review`/`AggregateRating` for testimonials, `Event`/seasonal `Product` on `/occasions/*`, `BreadcrumbList` where nested. Keep schema values in sync with the visible HTML — mismatches are penalized.

```html
<!-- Site-wide LocalBusiness JSON-LD — include in Layout, fill real values -->
<script type="application/ld+json">
{ "@context":"https://schema.org", "@type":"Bakery",
  "name":"Perlette Cakes",
  "description":"Homemade custom cakes and pastries, delivered across the Klang Valley via Lalamove.",
  "areaServed":"Klang Valley, Malaysia",
  "servesCuisine":"Cakes, Pastries",
  "url":"https://<domain>/",
  "telephone":"+60<whatsapp-number>",
  "sameAs":["https://www.instagram.com/perlettecakes/"] }
</script>
```

### 8e. `llms.txt` + AI crawler policy
- **Ship a `/llms.txt`** (Markdown at the site root via `public/`): a short plain-language summary of the business — what Perlette Cakes is, areas served, product types, lead time, how to order (WhatsApp), and links to key pages. This is the emerging convention for giving LLMs a clean, authoritative source.
- **`robots.txt` must explicitly allow reputable AI crawlers** if the goal is to be recommended by them — e.g. `GPTBot`, `OAI-SearchBot`, `ClaudeBot`, `anthropic-ai`, `PerplexityBot`, `Google-Extended`. (Allowing these is a deliberate choice — confirm the owner is comfortable with it; for a marketing site that *wants* to be cited, allow.)
- Keep `llms.txt` and the on-page facts in agreement with the JSON-LD and reality.

---

## 9. The order → WhatsApp funnel

The current inquiry flow is a shared modal mounted by the layout and opened from the work-in-progress homepage. It opens WhatsApp with a **pre-filled message**. This is the one place client-side JS is expected — keep it small and self-contained.

- Build a `https://wa.me/<number>?text=<encoded>` link. **Always `encodeURIComponent` the message.**
- Use native form controls where they cover the need cleanly. The delivery-date field should stay `type="date"` unless there is a real product requirement to replace it.
- Keep the current client-side validation lightweight: strip digits from names, strip non-digits from contact numbers, and require at least 3 days lead time for delivery dates.
- Standardize the message shape (refine later — treat as iterative):

```
Hi Perlette Cakes! I'd like to order:
• <product> × <qty> — <options>
Delivery date: <date>
Delivery area: <area>
Name: <name>
```

- No form submission to a server, no payment integration. Astro `<form>` POST is not used; assemble the link client-side from the selection state.

---

## 10. Accessibility & quality bar

- Colour contrast ≥ WCAG AA (verify the rose/gold against backgrounds once real hex values are set).
- All interactive elements keyboard-reachable with visible `:focus-visible` styles.
- Meaningful `alt` text; decorative images get `alt=""`.
- Run `npm run astro check` and `npm run build` clean before committing.

---

## 11. Do / Don't for agents

**Do**
- Reuse existing tokens and the shared `OrderInquiryModal.astro` component.
- Keep pages static and JS-free unless interactivity is required.
- Match the existing file/structure conventions.
- Keep documentation aligned: after implementation, inspect `README.md` and every relevant `docs/*.md` file; update route maps, stage status, acceptance criteria, and deferred work in the same change.
- Treat §8 (SEO + AI/LLM discoverability) as acceptance criteria — every new page ships with unique title/meta, valid JSON-LD, answer-first crawlable content, and descriptive alt text.
- Keep entity facts (name, area served, contact, how to order) identical across pages, JSON-LD, `llms.txt`, and social.

**Don't**
- Add Tailwind, a CSS framework, a backend, or a JS framework.
- Hardcode colours/spacing/fonts outside the tokens.
- Add dependencies without need — every package is a perf/maintenance cost.
- Duplicate product or content data across files.
- Put load-bearing text/prices inside images, or hide content behind JS — it's invisible to search crawlers and LLMs.
- Ship a page that looks good but has no title, meta, schema, or crawlable copy — design without discoverability is an incomplete page here.
