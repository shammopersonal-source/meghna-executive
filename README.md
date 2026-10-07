# Meghna Executive Holdings: "The Monograph"

The rebuilt corporate website for **Meghna Executive Holdings** (meghna-executive.com), built from the brief in [`REDESIGN_PROMPT.md`](./REDESIGN_PROMPT.md).

- **Concept.** A sixty-year group presented like a bound monograph, not a landing page. Every page is a sequence of numbered chapters, each opened by a Roman numeral, and built from large plates of the client's own photography with figure captions. Type is quiet, brass is rare, and motion is slow and scroll-driven with a few signature moments. The river idea from the first concept survives only as the **chapter spine** in the left margin. Nothing is ever drawn across the content.
- **Stack.** Next.js 16 (App Router, React Server Components) and TypeScript, styled with CSS Modules on design tokens. GSAP + ScrollTrigger and Lenis provide motion.
- **Media.** The client's own CMS imagery. Videos are re-encoded from the CMS originals.
- **Pages.** Home, Houses index, 15 house pages, The Group, Sustainability, Responsibility, Journal (index and 7 articles), Careers, Contact and 404. Every legacy URL redirects.

> **Direction change.** The first build ("The Confluence") ran a 1px river line across every page. After client review it was replaced by the Monograph. The line, the route curtain, the split hero and the horizontal timeline are gone; `REDESIGN_PROMPT.md` still describes them as originally briefed.

---

## Quick start

```bash
npm install
npm run dev          # http://localhost:3000
npm run build && npm start
npm run typecheck && npm run lint
```

Node 20.9+ is required. There are no environment variables to set for a local preview.

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical origin for metadata, sitemap, JSON-LD and share cards. Defaults to `https://meghna-executive.com`. |
| `ENQUIRY_WEBHOOK_URL` | Where contact-form enquiries are POSTed as JSON (a CRM, Slack, Zapier or an email relay). If it is not set, enquiries are only written to the server log. **Set this before launch.** |
| `QA_LOCAL_MEDIA=1` | **QA only.** Serves imagery from `public/__qa-media/` (gitignored) instead of the CMS, for offline screenshot and Lighthouse runs. Never set it in production. |

---

## Project map

```
src/
  app/                    routes (App Router)
    layout.tsx            fonts, pre-paint motion flag, header/menu, footer, JSON-LD
    page.tsx              Home: the monograph in five chapters
    houses/[slug]/        one flexible template → 15 house pages (+ share cards)
    group/ sustainability/ responsibility/ journal/ careers/ contact/
    contact/actions.ts    enquiry server action (works without JS)
    opengraph-image.tsx   designed 1200×630 share cards (per page)
    sitemap.ts robots.ts icon.png apple-icon.png not-found.tsx
  components/
    monograph/            ChapterSpine, Opening (+ film, motion), ChapterOpener, Figure, Figures,
                          Years (odometer register), Plates, Made, Stewardship, Correspondence
    home/                 House Index
    house/                house hero, offerings rail, gallery
    page/                 PageHero (title + frontispiece), SectionHead (numeral + rule)
    shell/                Header (+ phone pill), Menu overlay, Footer, Dhaka clock
    motion/               MotionRoot (declarative effects)
    ui/                   Img, Lines, Logo, Icons
  content/                typed content snapshot of the live site (see "CMS integration")
  lib/                    cms.ts (data access), motion.ts (lazy GSAP/Lenis), schema.ts (JSON-LD), og.tsx
  og/                     TTF copies of the licensed fonts for share-card rendering only
public/
  brand/                  official logo artwork (logo.svg is used as a CSS mask)
  media/                  re-encoded films: AV1 + H.264 + posters (≤3.5 MB each, from 20–41 MB)
                          + opening-river.jpg, the home page's LCP still (a frame of the client's film)
qa/                       QA scripts, Lighthouse scores, axe report, curated screenshots
```

---

## Design system

**Structure.** Every page is a monograph:

- **Chapters.** Each major section is a chapter with a Roman numeral, a title and one sentence. On the home page the chapters are I Origins, II The Houses, III Made in Bangladesh, IV Stewardship and V Correspondence. Inner pages build their chapters from the sections they actually have.
- **Plates.** Photography runs large, as plates, never as thumbnails in cards.
- **Figures.** Every editorial image is a numbered figure with a caption (`Fig. 04 · …`). Alt text describes the picture; the caption gives the fact.
- **Spine.** The chapter spine (`monograph/ChapterSpine.tsx`) is the page's only persistent ornament. It lives in the left margin like the spine of a book.

**Colour.** Colours are tokens in `src/app/globals.css`. Chapters alternate surfaces (`.theme-ink`, `.theme-bone`, `.theme-paper`, `.theme-material`).

| Token | Value | Use |
|---|---|---|
| `--ink` | `#191D1C` | Main dark surface and text (existing brand colour) |
| `--bone` | `#F1F0EE` | Main light surface (existing) |
| `--paper` | `#EBE6DD` | Warmer light surface for the "Made" and "Stewardship" chapters |
| `--mist` | `#BEC5BD` | Hairlines and quiet UI (existing) |
| `--silt` / `--silt-light` | `#8C7A5B` / `#B9A37C` | Brass, the single accent: focus rings, the spine's fill, active numerals. Used sparingly. |
| `--silt-text` | `#735F3E` | Brass for text and small marks on light surfaces (≥ 4.7:1, WCAG AA) |

**Material palettes.** Each house page takes a material sampled from its own photography (`materials` in `src/content/houses.ts`):

- Motors: graphite
- Machines: aluminium
- Lifestyles: porcelain and brass
- Penthouse: walnut and velvet
- Apparel: cotton and indigo
- Industrial: white cement and limestone
- Gourmet: olive and terracotta

**Type.** The fonts are the client's licensed, self-hosted faces, loaded with `next/font/local` and metric-matched fallbacks (no layout shift on swap):

- **Banana Grotesk** (Light / Regular / Medium) carries all structure: titles, text and small capitals (`.smallcaps`).
- **PP Migra Italic** (Pangram Pangram) appears only in numerals: chapter numerals, years and figures. Chapter numerals are drawn as outlines and fill with ink (`.numeral`).
- Migra has proportional digits. The year odometer therefore sizes each digit column from measured glyph widths (`monograph/digits.ts`) so numbers never jitter.

**Layout.**
- Grid: 4 / 8 / 12 columns.
- Gutters: `clamp(18px, 5vw, 104px)`, wide enough to hold the spine on desktop.
- Content is capped at 1600px; plates bleed to the edges.
- Section rhythm: `clamp(96px, 14vw, 240px)`. Chapter openers take at least 76% of the viewport, so each chapter begins on its own "page".

**Imagery.**
- Everything renders through `components/ui/Img.tsx` (next/image, AVIF/WebP).
- A light campaign grade unifies the photography. **Partner product photography (BMW, Apple, KOHLER) opts out** and is never recoloured or cropped through the product.
- Images are referenced by CMS id through `media("<id>", "<alt>")`. An unknown id fails the build.
- Alt text is written for every image used.

---

## Motion spec

Motion is a **progressive enhancement**. Every page is complete and readable with JavaScript off, and fully static under `prefers-reduced-motion`. QA verified both. The rule is *few effects, slow and deliberate*.

**Boot sequence**
1. An inline script in `<head>` adds `html.motion` before first paint, unless reduced motion is on. This arms the below-the-fold entrance states.
2. After `load` plus an idle callback, `lib/motion.ts` lazy-loads GSAP and ScrollTrigger. Lenis is added on fine-pointer devices only; touch keeps native momentum.
3. If motion hasn't booted within 4 s, the class is removed and nothing is ever hidden.
4. Above-the-fold titles reveal with CSS from first paint (`data-reveal="lines-now"` / `"fade-now"`). They are transform-only, so they never delay LCP.

**Declarative effects** (`components/motion/MotionRoot.tsx`). These are set up in small batches that yield to the main thread, and every tween states its start values explicitly:

| Attribute | Effect | Timing |
|---|---|---|
| `data-reveal="lines"` | Masked line rise | 1.4 s, `power4.out`, 100 ms stagger, at 88% viewport |
| `data-reveal="fade"` | Quiet rise + fade (18px) | 1.3 s, `power3.out` |
| `data-reveal="window"` | The image opens like a window: inset 7% frame → full plate, image 1.06 → 1 | 1.8 s `power3.inOut` / 2.2 s |
| `data-parallax="0.05"` | Gentle vertical drift, capped at 8% | scrubbed |
| `data-recede` | A plate settles back (scale 1 → 0.92, shade to 65%) as the next covers it | scrubbed |
| `data-fill` | An outlined numeral fills with ink as it crosses the screen | scrubbed, top 85% → centre 45% |

**Signature moments**

- **The opening** (`monograph/Opening*.tsx`). The LCP is a still frame of the client's river film, served at high priority. On desktop the film fades in over it after idle (never on phones, Save-Data or reduced motion). On screens ≥1024px the opening pins: the plate closes into a framed window on the right, the title recedes and the foreword rises beside it.
- **The chapter spine** (`monograph/ChapterSpine.tsx`). On screens ≥1180px, each chapter's numeral sits in the left margin at its proportional place in the page (at least 44px apart). A brass rule fills as you read, the current numeral lights, and the current chapter's title is set vertically at the foot. The spine reads the surface behind it and switches between dark and light ink. Below 1180px it becomes a brass hairline of reading progress at the top of the screen.
- **The register, 1965 → 2025** (`monograph/Years*.tsx`). On screens ≥1024px (motion allowed) it pins and the year turns like an odometer, digit by digit, while each milestone and its photograph crossfade in place; scroll snaps to each year. Elsewhere it is a calm vertical register.
- **The houses as plates** (`monograph/Plates.tsx`). Each house is a full-screen sticky plate. As the next plate slides over, the previous one recedes into shade.
- **House Index.**
  - Filters are pure CSS (radio + `:has`).
  - On fine pointers the house image follows the cursor with lerped, magnetic easing. Images are fetched only after first hover.
  - On touch, rows expand in place.
- **Films.**
  - Each film is AV1 with an H.264 fallback and has a pause control.
  - The poster is fetched about 150px before the film enters view; the video bytes only once 25% of it is visible.
  - Under reduced motion there is no autoplay.

Easing tokens: `--ease-out: cubic-bezier(0.22, 1, 0.36, 1)` and `--ease-io: cubic-bezier(0.65, 0, 0.35, 1)`.

---

## Component library

| Component | States / notes |
|---|---|
| `.btn` / `.btn-solid` | Hover inverts, solid → silt; 48px min height |
| `.link` + `.arrow` | Underline sweeps in from the left on hover; arrow extends |
| Header | Hides on scroll down, returns on scroll up; `mix-blend-mode: difference` over any section. Phones use a bottom-right thumb-zone pill (hotline + menu). |
| Menu overlay | Focus-trapped dialog with Esc to close, inert when closed, live image preview; without JS falls back to `:target` |
| ChapterSpine | Numerals as links to each chapter; active / passed / upcoming; dark or light tone; hairline progress below 1180px |
| ChapterOpener | Outlined numeral (fills on scroll), "Chapter X", title, one sentence |
| Figure | Window reveal + slight parallax, numbered caption; `still` variant for above-the-fold frontispieces |
| Figures | A short ledger of facts with Migra values and small-capital labels |
| Plate | Sticky full-screen house plate: count, name, sector · partner · year, one line, "Enter" |
| House Index row | default / hover (fine pointer) / expanded (touch) / filtered out |
| Gallery | Alternating 12-column plates with numbered captions; swipe with scroll-snap on phones; tiles never exceed the source width |
| Offerings rail | Horizontal snap rail with partner images (`object-fit: contain`, never cropped); typographic list when there are no images |
| Enquiry form | idle / field errors (`aria-invalid`, described-by, focused alert) / sending / sent; honeypot + minimum fill time |
| Footer | Edge-to-edge MEGHNA wordmark (letters rise), live Dhaka time, one-tap hotline |

---

## CMS integration

Pages never read content directly. They call `src/lib/cms.ts` (`getHouses`, `getHouse`, `getArticles`, `getArticle`).

Today these return the **typed snapshot** in `src/content/`. It was migrated from the live site on 5 Oct 2026, with copy tightened and no facts invented.

To connect the live CMS at `cms.meghna-executive.com`:

1. Re-implement the four functions in `src/lib/cms.ts`. Use `fetch(url, { next: { revalidate: 300, tags: ["houses"] } })` and map the responses onto the existing `House` / `Article` types.
2. Add an on-demand revalidation route (`revalidateTag`) and call it from the CMS on publish.
3. Regenerate `src/content/media-registry.ts` from the CMS, or switch `media()` to take dimensions from the CMS response.
4. Optionally move the films in `public/media/` into the CMS or a CDN, and update `videos` in `src/content/media.ts`.

Everything else (figures, the 1965–2025 register, house plates, careers roles, sustainability log) lives in `src/content/group.ts` and should move to the CMS on the same pattern.

---

## SEO and sharing

- **Metadata.** Every page has a unique title, description and canonical URL.
- **Share cards.** Each page has a designed 1200×630 card in the licensed type. This fixes the live site's `og:image` pointing at `localhost:3000/undefined`.
- **JSON-LD.** `Organization` (site-wide), `BreadcrumbList`, `AutoDealer` / `Store` / `Restaurant` / `Organization` per house, and `Article` / `VideoObject` per journal entry.
- **Sitemap.** `/sitemap.xml` and `/robots.txt`.
- **Redirects.** All legacy URLs redirect permanently (Next issues 308, the method-preserving permanent redirect):

| Old | New |
|---|---|
| `/about` | `/group` |
| `/units` | `/houses` |
| `/units/<legacy-slug>` | `/houses/<slug>` (15 explicit mappings in `next.config.ts`) |
| `/csr` | `/responsibility` |
| `/career` | `/careers` |
| `/media-center` | `/journal` |
| `/media-center/<slug>` | `/journal/<slug>` (including the two legacy slugs with punctuation) |

---

## QA

See [`QA_REPORT.md`](./QA_REPORT.md) for the Lighthouse matrix, axe results, no-JS / reduced-motion / overflow checks and known limits.

The scripts in `qa/` run against a production build (`QA_LOCAL_MEDIA=1 npm run build && QA_LOCAL_MEDIA=1 npm start -- -p 3200`):

| Script | Checks |
|---|---|
| `shoot.mjs` | Scroll-stop screenshots at 390 / 834 / 1440 |
| `axe.mjs` | Axe accessibility audit (WCAG 2.2 AA) |
| `nojs.mjs` | Nothing hidden without JS or with reduced motion |
| `docwidth.mjs` | Every page fits a 390px phone |
| `interact.mjs` | Menu and enquiry form, with and without JS |
| `lcp-probe.mjs` | Prints every LCP candidate entry under CPU throttling |

## Deployment

- **Vercel.** Any Next.js 16 host works; Vercel needs zero configuration. Set `NEXT_PUBLIC_SITE_URL` and `ENQUIRY_WEBHOOK_URL`.
- **Self-hosting.** Run `npm run build && npm start` behind a CDN, with `public/media` and `/_next/static` cached immutably (already set in `next.config.ts`).
- **Partner guidelines.** Before launch, have BMW, Apple and KOHLER marketing contacts confirm the partner presentation. Everything follows their imagery as supplied, but dealer and reseller programmes have their own approval steps.
