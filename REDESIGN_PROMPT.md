# Meghna Executive Holdings: Redesign Prompt

> Paste everything below the line into your design or build AI, or hand it to your studio as the brief.
> It comes with `IMAGE_MANIFEST.md`. That file lists every image, video and SVG on the current site, with its URL and resolution.

---

## ROLE

You are the creative director, lead product designer and senior front-end engineer for this rebuild. You have 15+ years designing and maintaining flagship websites for category-defining companies, on phone, iPad and desktop.

Your job is to redesign **https://meghna-executive.com** (Meghna Executive Holdings, "MEH"). The result should feel like the most confident corporate site in South Asia. It should be good enough that a Western luxury group would want to copy it.

The bar is an Awwwards Site of the Day, with a Lighthouse score above 90 on a mid-range Android phone. A beautiful site that is slow is a failure, and so is a fast site that is forgettable. You must deliver both.

---

## 1. WHO THE CLIENT IS (facts only; do not invent new ones)

Meghna Executive Holdings is a Bangladeshi conglomerate founded in **1965**, with **50+ years** of history. Head office: Le Meridien (Level 6), Plot 79/A, Nikunja-2, Dhaka 1229. Hotline **16765**. Email info@meghna-executive.com.

It runs four groups of companies:

| Group | Companies | Proof points stated on the current site |
|---|---|---|
| **Trading** | Executive Motors (BMW, exclusive since 2002, BMW Retail.Next showroom at Meghna Tower, Tejgaon, 2023) · Executive Machines (Apple authorised reseller and service provider since 2009) · Executive Lifestyles (KOHLER exclusive distributor since 2015) · Penthouse Livings (2019; Michael Aram, Cornelio Cappellini, Christopher Guy, Turri) · Penthouse Interior | "Bangladesh's first luxury lifestyle houseware" |
| **Apparel** | Meghna Knit Composite (2007) · Meghna Dresses (2014) · Executive Intimates · Executive Hi Fashions · Sublime Greentex (2017, **LEED Gold**) · Executive Greentex | Make clothing for M&S, H&M, Primark, Tesco, Lidl, Decathlon, Matalan, Perry Ellis, Gina Tricot, Varner, Stanley & Stella, P&C, Mayoral |
| **Industrial** | Siam Bangla Industries (2004, white cement under the White Elephant and White Tiger brands, with Siam Cement Group, Thailand) · Executive Woodworks · Meghna Bearing Industries | Woodworks: **680,000 sq ft** plant, **five 40-ft HC containers a day**, **US$70M** annual export target, mainly to the USA |
| **Service** | Executive Gourmet (2025), signature brand **Slaw Bistro** | The group's first move into dining |

**Responsibility:** Marks & Start / CRP partnership since 2015, hiring people with disabilities, and flood relief in 2007 (Paikchora, Kurigram).
**Sustainability pillars:** eco-friendly manufacturing, sustainable sourcing, community development.
**Initiatives:** solar power, transport carbon reduction, green supply chain, water harvesting, zero-waste garment production.

Gap you must flag: **Meghna Bearing Industries has no description on the current site.** Put in a clearly marked placeholder and add it to the client questions list. Never make up figures, dates, awards or client names. If a number is not in this brief, it does not go on the site.

---

## 2. WHAT'S WRONG TODAY (fix every item)

I audited the live site on desktop (1440), iPad (1024×1366) and phone (390×844):

1. **The first screen is a black void.** The hero is white text on black with a 4-dot slider. The group's best photography (BMW i7, Kohler rain shower, Apple, Penthouse interiors) is hidden behind sliders or loads late.
2. **Content depends on JavaScript to appear.** A full-page capture of the home page is blank below the fold because everything waits for a scroll animation. That hurts SEO, accessibility, link previews and slow phones. All content must render on the server and be visible without JS. Motion is an enhancement only.
3. **The home hero video is 41 MB**, and each brand-page video is about 20 to 22 MB. Bangladesh is a mobile-first market, so this is not acceptable.
4. **Link previews are broken.** `og:image` points to `http://localhost:3000/undefined`, and `og:title` is just "Home". Every share on WhatsApp, Facebook or LinkedIn shows nothing.
5. **The same "luxury" adjectives are everywhere** ("opulent", "illustrious", "epitome", "unparalleled"). When everything is the epitome, nothing is. The copy needs to be cut by about half and made specific.
6. **The structure undersells the scale.** Sixteen companies, four sectors, 60 years, and global apparel buyers are spread across thin pages. Nobody gets the full picture in one scroll.
7. **Bootstrap 4 defaults ship alongside custom CSS**, a dead design system that adds weight.
8. **The imagery is inconsistent.** Strong brand photography sits next to generic stock (donation boxes, Western office stock on Careers), and the CSR page repeats the same images (the "DONATE" box appears 3 times).
9. **Names are inconsistent.** "Units", "Brands", "Concerns" and "Trading Brands" are all used. Pick one system and use it everywhere.
10. **iPad is treated as a stretched phone.** There is no tablet-specific layout.

---

## 3. THE BIG IDEA: "THE CONFLUENCE"

The company is named after the **Meghna**, the river where the Padma and the Jamuna meet before reaching the Bay of Bengal. That is the story: **separate currents, one river.** BMW, Apple, Kohler, Italian furniture, the global knitwear supply chain, white cement and a bistro, all joining into one group.

Build the whole experience on this metaphor. Keep it restrained. No wave clip-art, no blue water textures, no literal rivers. The river shows up as **line, flow, convergence and depth**.

### Signature moments (these are what make the site unforgettable)

1. **The Meghna Line.** One continuous hairline SVG path (1px, ink or bone) that runs through the entire home page and draws itself as you scroll. It splits into tributaries for each sector, flows past each company, and comes back together at the footer. It is the site's wayfinding and its signature. On brand pages the same line becomes that brand's thread. Under `prefers-reduced-motion` it appears fully drawn.

2. **Confluence hero.** The first screen opens on **four full-height media panels**, one for each trading house:
   - BMW 7 Series grille in the dark: `unit/executive-motors-ltd/17331329886L6sQ.webp` (1920px)
   - Kohler bathroom with a midnight skyline: `unit/executive-lifestyles-ltd/1733229778NCTMz.webp` (1920px)
   - Apple, iPhone camera close-up in black: `unit/executive-machines-ltd/1730192104HC7i6.webp` (1366px)
   - Penthouse warm-lit living room: `unit/penthouse-livings-limited/1730192732MG7WR.webp` (1920px)

   The Kohler rain shower (`page/home-page/1729593232xt8oD.webp`) and the BMW i7 front (`page/home-page/1737633800Ptz5y.webp`) are stronger images, but the site only serves them at 300px and 200px. Request the originals from the CMS. If they come back at 1600px or larger, swap them in.

   As the user scrolls, the panels slide together like streams merging and resolve into the MEH monogram, with the line **"Since 1965. Bangladesh, curated."** (Banana Grotesk with a PP Migra Italic accent). On phones the panels stack as tall slices that merge vertically. The first frame must be a static, server-rendered image composition so LCP happens immediately.

3. **The House Index.** A large typographic index of all 16 companies, laid out like the masthead of a luxury annual report: number, name, sector, year. On desktop, hovering a row shows that company's image following the cursor, clipped to a soft rounded rectangle, with magnetic easing. On touch devices there is no hover. Rows expand in place to show the image, a short line of copy and a link. Filter tabs: All · Trading · Apparel · Industrial · Service.

4. **1965 → Now.** A pinned horizontal timeline. Each year is set huge in outlined PP Migra Italic and fills with ink as it reaches the centre of the screen: 1965, 2002, 2004, 2007, 2009, 2014, 2015, 2017, 2019, 2023, 2025. Each year shows one image from the manifest. On phones it becomes a vertical "river" with the line on the left.

5. **The Ledger.** A large figures section using tabular numerals that count up once when they come into view: 1965 · 50+ years · 16 companies · 4 sectors · 680,000 sq ft · 5 containers/day · US$70M export target · LEED Gold. Use only these facts.

6. **"Made in Bangladesh. Worn by the world."** An apparel and industrial section using the large factory photos (Sublime Greentex, Meghna Knit, Hi Fashions, Woodworks, Bearing). Global buyer names are set as an understated marquee of plain words, not logos.

7. **Material palettes per house.** Each company page takes an accent "material" from its own photography. These are subtle background tints and textures, never loud colours:
   - Motors: graphite
   - Machines: aluminium
   - Lifestyles: porcelain and brushed brass
   - Penthouse: walnut and velvet
   - Apparel: cotton and indigo
   - Industrial: white cement and limestone
   - Gourmet: olive and terracotta

   Page transitions carry the material from the page you leave into the next one.

8. **Living footer.** An edge-to-edge **MEGHNA** wordmark, live Dhaka time (GMT+6), the 16765 hotline as a one-tap call button, the address with a map link, and the line coming to rest.

### Things to avoid (they make sites look generic)

No glassmorphism, purple or blue gradients, 3D blobs, auto-playing carousels with dots, stock "handshake" heroes, emoji, wavy dividers, or parallax on every image. **Each page gets one hero moment** and every other section supports it quietly.

Benchmarks for quality (match the craft, not the look): Aesop, Hermès, Rimowa, Bottega Veneta, LVMH annual reports, Apple product pages, Porsche Design, and top Locomotive or Lusion work.

---

## 4. DESIGN SYSTEM

### Colour

Keep the brand's existing palette and make it stricter:

| Token | Hex | Use |
|---|---|---|
| `--ink` | `#191D1C` | Main dark surface and text (existing brand colour) |
| `--bone` | `#F1F0EE` | Main light surface (existing) |
| `--mist` | `#BEC5BD` | Secondary text, hairlines, quiet UI (existing) |
| `--silt` | `#8C7A5B` | **Single accent**, the brass and river-silt tone. Under 2% of any screen: active states, the Meghna Line at focus points, small numbers |
| `--pure` | `#FFFFFF` | Text over photography only |

Dark and light sections alternate the way a magazine alternates spreads. All text must meet WCAG 2.2 AA contrast.

### Type

The client already licenses and self-hosts both fonts. Keep them:

- **Banana Grotesk** (Light/Regular/Medium/Semibold/Bold) for everything structural.
- **PP Migra Italic** only for single emotive words inside headlines, as the current site does with "Executive *Motors* Ltd.". Maximum one italic word per headline.
- Fluid scale with `clamp()`. Display sizes 9.5rem down to 3rem. H1 5.5rem down to 2.4rem. Body 1.125rem / 1.6 on desktop, 1rem / 1.55 on phones. Tight tracking (-0.03em) on display text, open tracking (+0.12em, uppercase) on small labels.
- Prepare for **Bangla (বাংলা)**. Build i18n in from the start and pair with Noto Serif Bengali (italic-like accents) and Hind Siliguri (body). The language toggle can ship in phase 2, but the layout must handle Bangla text length now.

### Grid and spacing

- 12-column grid on desktop, 8 on tablet, 4 on phone.
- Outer margins: `clamp(16px, 4vw, 80px)`. Maximum content width 1600px, but imagery can bleed to the edges.
- 8pt spacing scale, with section padding of `clamp(96px, 14vw, 240px)`. Generous white space is what makes it feel expensive.

### Motion

- Easing: `cubic-bezier(0.22, 1, 0.36, 1)` for reveals and `cubic-bezier(0.65, 0, 0.35, 1)` for transitions.
- Durations: 600 to 1200ms for reveals, 250ms for interface feedback.
- Smooth scrolling with **Lenis**, choreography with **GSAP ScrollTrigger**. Turn both off under `prefers-reduced-motion`, which falls back to simple fades or instant states.
- Text reveals by line (masked slide-up), never letter-by-letter on body copy.
- Images reveal with a clip-path "tide" wipe plus a 1.08 to 1.0 scale. Use subtle 4% film grain on dark sections only.
- No scroll-jacking except for the one pinned timeline. Never block the user from scrolling.

### Photography treatment

Use **only the images already on meghna-executive.com** (see `IMAGE_MANIFEST.md`). **The client owns or has licensed all of them and has given full permission to reuse them.**

- Give everything one consistent colour grade with CSS or the image pipeline: slightly lifted blacks, warm-neutral highlights, about 10% lower saturation. This makes BMW, Apple, Kohler and factory photos feel like one campaign.
- **Partner product photography (BMW, Apple, KOHLER) must not be recoloured, distorted, cropped through the product, or regenerated with AI.** Their logos stay unaltered, with correct clear space. Follow each partner's dealer and reseller brand guidelines.
- Respect resolution tiers. Only images marked **HERO** in the manifest go full-bleed. **THUMB** images (under 400px wide) stay small. Pull originals from `cms.meghna-executive.com` before using anything larger. **Never upscale a thumbnail into a hero.**
- Remove duplicates. Use generic stock (donation boxes, "teamwork" office stock) only where nothing better exists, and keep it small. Factory floors, showrooms and real places are the strongest assets the client has, so lead with them.
- Re-encode every video from its source: 1080p H.265/AV1 plus an H.264 fallback, **4 MB or less** for the home loop, muted, `playsinline`, with a poster frame, and only starting when in view.

---

## 5. SITE STRUCTURE

Use one naming system everywhere: **"Houses"** for the individual companies and **"Sectors"** for Trading, Apparel, Industrial and Service. Keep old URLs working with 301 redirects (`/units/*` → `/houses/*`).

1. **Home**: Confluence hero → short manifesto (40 words max) → The Ledger → House Index → Trading houses showcase (one bold spread per partner brand) → "Made in Bangladesh. Worn by the world." → 1965 → Now → Sustainability teaser → Journal (3 latest) → Living footer.
2. **The Group** (About): story, Mission and Vision rewritten as one sharp paragraph each, the full timeline, leadership (placeholder; ask the client), head office.
3. **Houses** (index plus 16 pages from one flexible template). Each page has:
   - a hero in the house's material colour
   - a one-line positioning statement
   - three proof points
   - a gallery (masonry on desktop, swipe on phone)
   - offerings (BMW model cards with drivetrain tags: Plug-in Hybrid, Full-Electric, Petrol; Apple products; Kohler collections; Penthouse partner brands)
   - showroom location and contact
   - a "Visit website" link
   - the next house in the river
4. **Sustainability**: three pillars, the initiatives as a dated log, the LEED Gold highlight.
5. **Responsibility** (CSR): Marks & Start / CRP, inclusive hiring, flood relief, written as editorial stories rather than cards.
6. **Journal** (Media Center): filters (All, Blog, Video, News), an editorial article template with large headings, readable line length (65 to 75 characters), and related houses.
7. **Careers**: the HR philosophy, real workplace photography first, open roles (CMS-driven), and an apply flow.
8. **Contact**: a split layout with a form (with validation, accessible errors, spam protection), one-tap hotline, map, and per-house enquiry routing.

The global navigation is a full-screen overlay menu. It lists Sectors and Houses as a live index with image previews, plus Group, Sustainability, Responsibility, Journal, Careers and Contact. The hotline 16765 is always one tap away.

### Copy voice

Short, specific, confident. Facts instead of adjectives. Example rewrites:
- Before: "Meghna Executive Holdings boasts an extensive and diversified portfolio that traverses a multitude of industries…"
- After: **"Sixteen houses. Four sectors. One current since 1965."**
- Headline examples: "Bangladesh, *curated*." · "The exclusive home of BMW in Bangladesh since 2002." · "Made in Bangladesh. *Worn* by the world." · "Built to last *generations*."

---

## 6. RESPONSIVE: PHONE, IPAD AND DESKTOP ARE THREE SEPARATE DESIGNS

Design and QA at each of these sizes. Do not just scale one layout down:

| Class | Widths | Layout notes |
|---|---|---|
| Phone | 360, 390, 430 | Thumb-zone navigation (menu and hotline at bottom right as a floating pill). Vertical confluence hero. Swipe galleries with scroll-snap. No hover-dependent content. Tap targets ≥ 44px. |
| iPad portrait | 768, 820, 834, 1024 | **A real tablet layout:** 8-column grid, two-column House Index with images showing, timeline vertical with a side rail, Apple Pencil and touch friendly. |
| iPad landscape / laptop | 1180, 1366, 1440 | Full desktop experience. Hover only appears on devices with a fine pointer (`@media (hover:hover) and (pointer:fine)`). |
| Desktop / large | 1920, 2560 | Content capped at 1600px, imagery bleeds to the edge, type scales up, no stretched paragraphs. |

Handle safe areas (`env(safe-area-inset-*)`), dynamic viewport units (`100svh`/`100dvh`) on mobile Safari, and landscape phones.

---

## 7. TECHNICAL REQUIREMENTS

- **Stack:** Next.js (App Router, React Server Components) + TypeScript. Styling with CSS Modules or Tailwind, built on design tokens (CSS custom properties). GSAP + ScrollTrigger and Lenis loaded only on the client, after first paint.
- **Content:** keep the existing headless CMS (`cms.meghna-executive.com`) as the source of truth. Typed API layer with ISR/revalidation. Everything editable from the CMS: houses, models and products, journal, careers, timeline, ledger numbers.
- **Images:** `next/image` with AVIF/WebP, correct `sizes`, blur placeholders, and the LCP image preloaded with `fetchpriority="high"`. Everything else lazy-loads.
- **Performance budgets** (measured on a mid-tier Android over 4G, which is the typical Bangladeshi visitor):
  - LCP < 2.0s
  - INP < 200ms
  - CLS < 0.05
  - Home page JS ≤ 180 KB gzipped
  - Lighthouse ≥ 90 on Performance, Accessibility, Best Practices and SEO, on both mobile and desktop
- **Accessibility:** WCAG 2.2 AA. Semantic landmarks, skip link, visible focus states using `--silt`, full keyboard support for the menu, index, filters and gallery. Real alt text written for every manifest image. Video captions where speech exists. `prefers-reduced-motion` is fully honoured.
- **SEO and sharing:**
  - Unique titles and descriptions per page.
  - **Fix `og:image`** with a designed 1200×630 share card per page.
  - `Organization`, `LocalBusiness` (head office and each showroom), `BreadcrumbList` and `Article` JSON-LD.
  - XML sitemap, canonical URLs, and 301s from all old URLs.
- **No Bootstrap.** Ship only the CSS that is actually used.
- **Analytics hooks** on CTAs: hotline tap, "Visit website", enquiry submit, career apply.

---

## 8. DELIVERABLES

1. A one-page **concept board** (The Confluence): moodboard built from manifest images, type specimen, colour tokens, Meghna Line study.
2. **High-fidelity designs** for Home, a House page (Executive Motors as the flagship, then Machines, Lifestyles, Penthouse, one Apparel house and Slaw Bistro), Group, Sustainability, Responsibility, Journal index and article, Careers and Contact. **Each one at phone (390), iPad portrait (834) and desktop (1440).**
3. A **motion spec**: the hero confluence, the Meghna Line, House Index hover and tap, timeline, page transitions, all with timings and easing.
4. A **component library**: buttons, links, nav overlay, index row, media card, ledger stat, timeline node, gallery, form fields, footer, plus their states.
5. A **production build** to the requirements in section 7, with a README, an environment and CMS integration guide, and a redirect map.
6. A **QA report**: Lighthouse screenshots (mobile and desktop), axe accessibility results, a cross-browser matrix (Safari iOS 16+, Chrome Android, Chrome/Edge/Firefox/Safari desktop, iPadOS Safari), and before/after Core Web Vitals.
7. A **client questions list**: Meghna Bearing Industries copy, leadership profiles, original high-resolution files for any THUMB-tier image used larger, showroom addresses and hours, and whether the brand mark or wordmark should get a refresh.

---

## 9. NON-NEGOTIABLES

- Use **only** imagery and video from the current website (full manifest in `IMAGE_MANIFEST.md`). Permission is confirmed. Do not use new stock or AI-generated images of real products.
- Keep the existing logo (`/images/static/logo.svg`, `logo-v2.svg`), and the Banana Grotesk + PP Migra pairing.
- No invented facts. Every number, date and client name must come from section 1.
- The site must be fully readable and navigable with JavaScript turned off.
- Phone, iPad and desktop each get a deliberately designed layout, not one squeezed or stretched.
- Every partner brand (BMW, Apple, KOHLER and the Penthouse partner brands) is presented according to its brand guidelines.

**Final standard:** a first-time visitor in London, New York or Dubai should understand in 10 seconds that this is one of South Asia's most serious business groups, and remember the experience a week later.
