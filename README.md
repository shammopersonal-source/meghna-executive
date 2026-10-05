# Meghna Executive Holdings: "The Confluence"

The rebuilt corporate website for **Meghna Executive Holdings** (meghna-executive.com), built from the brief in [`REDESIGN_PROMPT.md`](./REDESIGN_PROMPT.md).

- **Concept.** The group is named after the Meghna, the river where the Padma and the Jamuna meet. Its fifteen houses are separate currents in one river. A single 1px line, the **Meghna Line**, runs the length of every page and draws itself as you scroll. It splits into four tributaries for the sectors and comes to rest in the footer.
- **Stack.** Next.js 16 (App Router, React Server Components) and TypeScript, styled with CSS Modules on design tokens. GSAP + ScrollTrigger and Lenis provide motion.
- **Media.** The client's own CMS imagery. Videos are re-encoded from the CMS originals.
- **Pages.** Home, Houses index, 15 house pages, The Group, Sustainability, Responsibility, Journal (index and 7 articles), Careers, Contact and 404. Every legacy URL redirects.

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
    layout.tsx            fonts, pre-paint motion flag, header/menu, river + footer, JSON-LD
    page.tsx              Home
    houses/[slug]/        one flexible template → 15 house pages (+ share cards)
    group/ sustainability/ responsibility/ journal/ careers/ contact/
    contact/actions.ts    enquiry server action (works without JS)
    opengraph-image.tsx   designed 1200×630 share cards (per page)
    sitemap.ts robots.ts icon.png apple-icon.png not-found.tsx
  components/
    home/                 Confluence hero, manifesto + film, Ledger, House Index, spreads, Made in Bangladesh, Timeline …
    house/                house hero, offerings rail, gallery
    shell/                Header (+ phone pill), Menu overlay, Footer, Dhaka clock
    motion/               MotionRoot (declarative effects), MeghnaLine, RouteCurtain
    ui/                   Img, Lines, Words, Count, Logo, Icons
  content/                typed content snapshot of the live site (see "CMS integration")
  lib/                    cms.ts (data access), motion.ts (lazy GSAP/Lenis), schema.ts (JSON-LD), og.tsx
  og/                     TTF copies of the licensed fonts for share-card rendering only
public/
  brand/                  official logo artwork (logo.svg is used as a CSS mask)
  media/                  re-encoded films: AV1 + H.264 + posters (≤3.5 MB each, from 20–41 MB)
qa/                       QA scripts, Lighthouse JSON, axe report, curated screenshots
```

---

## Design system

**Colour.** Colours are tokens in `src/app/globals.css`. Sections alternate dark and light like magazine spreads (`.theme-ink`, `.theme-bone`, `.theme-material`).

| Token | Value | Use |
|---|---|---|
| `--ink` | `#191D1C` | Main dark surface and text (existing brand colour) |
| `--bone` | `#F1F0EE` | Main light surface (existing) |
| `--mist` | `#BEC5BD` | Hairlines, quiet UI, the Meghna Line (existing) |
| `--silt` / `--silt-light` | `#8C7A5B` / `#B9A37C` | The single accent: focus rings, active states, the line's tip |

**Material palettes.** Each house page takes a material sampled from its own photography (`materials` in `src/content/houses.ts`):

- Motors: graphite
- Machines: aluminium
- Lifestyles: porcelain and brass
- Penthouse: walnut and velvet
- Apparel: cotton and indigo
- Industrial: white cement and limestone
- Gourmet: olive and terracotta

**Type.** The fonts are the client's licensed, self-hosted faces, loaded with `next/font/local` and metric-matched fallbacks (no layout shift on swap):

- **Banana Grotesk** (Light / Regular / Medium) carries all structure.
- **PP Migra Italic** (Pangram Pangram) is reserved for **one emotive word per headline**. It uses its discretionary ligatures and old-style figures for years.
- Banana Grotesk has proportional digits and no `tnum` feature. The Ledger therefore counts in fixed-width digit cells so numbers never jitter.

**Layout.**
- Grid: 4 / 8 / 12 columns.
- Gutters: `clamp(16px, 4vw, 80px)`.
- Content is capped at 1600px; imagery bleeds to the edges.
- Section rhythm: `clamp(96px, 14vw, 240px)`.

**Imagery.**
- Everything renders through `components/ui/Img.tsx` (next/image, AVIF/WebP).
- A light campaign grade unifies the photography. **Partner product photography (BMW, Apple, KOHLER) opts out** and is never recoloured or cropped through the product.
- Images are referenced by CMS id through `media("<id>", "<alt>")`. An unknown id fails the build.
- Alt text is written for every image used.

---

## Motion spec

Motion is a **progressive enhancement**. Every page is complete and readable with JavaScript off, and fully static under `prefers-reduced-motion`. QA verified both.

**Boot sequence**
1. An inline script in `<head>` adds `html.motion` before first paint, unless reduced motion is on. This arms the below-the-fold entrance states.
2. After `load` plus an idle callback, `lib/motion.ts` lazy-loads GSAP and ScrollTrigger. Lenis is added on fine-pointer devices only; touch keeps native momentum.
3. If motion hasn't booted within 4 s, the class is removed and nothing is ever hidden.
4. Above-the-fold headlines reveal with CSS from first paint (`data-reveal="lines-now"`). They are transform-only, so they never delay LCP.

**Declarative effects** (`components/motion/MotionRoot.tsx`). These are set up in small batches that yield to the main thread:

| Attribute | Effect | Timing |
|---|---|---|
| `data-reveal="lines"` | Masked line slide-up | 1.15 s, `expo.out`, 85 ms stagger, at 86% viewport |
| `data-reveal="fade"` | Rise + fade | 1 s, `power3.out` |
| `data-reveal="tide"` | Clip-path "tide" wipe + image 1.08 → 1 | 1.3 s `expo.inOut` / 1.8 s |
| `data-scrub-words` | Words fill from 16% to 100% opacity as the block passes | scrubbed |
| `data-parallax="0.14"` | Gentle vertical drift (fraction of height) | scrubbed |
| `data-drift="-12"` | Oversized partner name drifts horizontally | scrubbed |
| `data-scale-in` | Media grows from an inset rounded frame to full-bleed | scrubbed, top 85% → 15% |
| `data-count` | Ledger figures count up once (years start from 1900) | 2.2 s `expo.out` |

**Signature scenes**

- **Confluence hero** (`home/HeroMotion.tsx`). It pins for one viewport (70% on phones). The four streams' clip-paths close into one surface, the headline parts like water around a stone, a veil deepens, and the monogram surfaces.
  - Its entrance is CSS-only: a veil lifts off the images like mist. The images never move on load, which keeps LCP at first paint.
  - Desktop has four vertical streams; phones get four horizontal bands.
- **Meghna Line** (`motion/MeghnaLine.tsx`). It is built from `data-line-anchor` points as vertical S-curves (`data-line-x`, `data-line-x-sm`, `data-line-split`, `data-line-merge`).
  - The tip tracks 62% of the viewport through a length lookup table.
  - It blends with `mix-blend-mode: difference`, so it reads on ink, bone and photography alike.
  - It is decorative (`aria-hidden`), drawn in full under reduced motion, and built in an idle callback.
- **1965 → Now** (`home/TimelineMotion.tsx`). On screens ≥1024px it pins and scrubs horizontally, and each outlined PP Migra year fills with ink as it crosses the centre.
  - Tablets get a river timeline that alternates around the centre line.
  - Phones get a vertical list with the line on the left.
- **House Index.**
  - Filters are pure CSS (radio + `:has`).
  - On fine pointers the house image follows the cursor with lerped, magnetic easing and a slight skew. Images are fetched only after first hover.
  - On touch, rows expand in place.
  - iPad portrait shows a two-column index with thumbnails.
- **Route curtain.** On navigation, a curtain in the material of the page you left tides away (1.1 s, `cubic-bezier(0.65, 0, 0.35, 1)`).
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
| House Index row | default / hover (fine pointer) / expanded (touch) / filtered out |
| Ledger stat | Server-rendered final value; counts once in view |
| Timeline node | Outlined year → filled; card with image and link to the house |
| Gallery | Masonry (2–3 columns), swipe with scroll-snap on phones; tiles never exceed the source width |
| Offerings rail | Horizontal snap rail with partner images (`object-fit: contain`, never cropped); typographic list when there are no images |
| Enquiry form | idle / field errors (`aria-invalid`, described-by, focused alert) / sending / sent; honeypot + minimum fill time |
| Footer | Edge-to-edge MEGHNA wordmark (letters rise), live Dhaka time, one-tap hotline, the line's resting point |

---

## CMS integration

Pages never read content directly. They call `src/lib/cms.ts` (`getHouses`, `getHouse`, `getArticles`, `getArticle`).

Today these return the **typed snapshot** in `src/content/`. It was migrated from the live site on 5 Oct 2026, with copy tightened and no facts invented.

To connect the live CMS at `cms.meghna-executive.com`:

1. Re-implement the four functions in `src/lib/cms.ts`. Use `fetch(url, { next: { revalidate: 300, tags: ["houses"] } })` and map the responses onto the existing `House` / `Article` types.
2. Add an on-demand revalidation route (`revalidateTag`) and call it from the CMS on publish.
3. Regenerate `src/content/media-registry.ts` from the CMS, or switch `media()` to take dimensions from the CMS response.
4. Optionally move the films in `public/media/` into the CMS or a CDN, and update `videos` in `src/content/media.ts`.

Everything else (ledger figures, timeline, careers roles, sustainability log) lives in `src/content/group.ts` and should move to the CMS on the same pattern.

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
