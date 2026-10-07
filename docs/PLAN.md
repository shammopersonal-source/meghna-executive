# Plan: the redesign of meghna-executive.com

This plan takes the existing build ("The Monograph", in this repository) and corrects it against `docs/AUDIT.md`. The audit changed three things about the brief:

1. **The site's job is routing and reassurance, not storytelling alone.** Most visitors arrive with a task: call the BMW showroom, find a KOHLER branch, contact a garment factory, apply for a job. The Monograph told the group's story beautifully but put the trading houses after the history. The original's best instinct, leading with its partner brands, must come back.
2. **Every contact action must be one tap away on a phone.** The original needs 3–4 taps and a scroll.
3. **Nothing the original does well can be lost.** The audit found three gaps in the Monograph build: the social profiles were missing, five sustainability articles redirected to pages that did not exist, and unit pages lost their inline enquiry form (it was one tap away on /contact).

---

## 1. Home: section order and the job of each section

| # | Section | Psychological job | Why it sits here |
|---|---|---|---|
| 0 | **Header + phone pill** | *"I can reach someone right now."* The hotline is in the header on desktop, and a thumb-zone pill (Call · Menu) sits on phones. | It must be present before anything else. The original's mobile view has no contact action in the first screen. |
| 1 | **Opening**: a river still from the group's own film; "Meghna Executive Holdings"; *"Home of BMW, Apple and KOHLER in Bangladesh. Since 1965."*; one button, **Find a house** | Recognition: the reader learns in five seconds who this is and why it matters to them. Naming the partners in the first line keeps the original's brand-led first impression without a slider. | It is the first impression and the LCP. It stays a still image so it paints at once. |
| 2 | **Contents**: a book's contents page that doubles as a directory. The four trading houses come first, each with its partner, a one-tap call and a link; then "All fifteen houses by sector". | **Routing.** Visitors with a task finish it in one or two taps. It also shows the group's breadth at a glance. | Directly after the opening, because most visitors are task-led. It fits the monograph concept: a book opens with its contents. |
| 3 | **Foreword** (pinned beside the opening plate on desktop) | Meaning: what the group is, in one paragraph. | Readers who stay past the directory want the "why". |
| 4 | **I · Origins**: the story and four figures (1965, 15 houses, 17 global apparel buyers, 680,000 sq ft) | **Trust** for verifiers: banks, buyers, partners, candidates. | Proof of scale and age comes before the details. |
| 5 | **The register, 1965 → 2025** | **Continuity**: every milestone has a real photograph and links to its house. | It shows the group did not appear overnight. |
| 6 | **II · The Houses**: full-screen plates for the flagship houses, then the full index with filters | **Desire and depth**: the aura moment. | Earned after trust. People who scroll here are evaluating, not hunting. |
| 7 | **III · Made in Bangladesh**: capacity (90,000 pieces a day; 1.5 million a month), buyers, LEED Platinum | **B2B proof** for sourcing managers. | The apparel audience is large and specific, and needs its own chapter. |
| 8 | **IV · Stewardship**: three pillars, certifications | **Compliance proof** for buyers and partners. | It follows "Made" because buyers ask about compliance straight after capacity. |
| 9 | **V · Correspondence**: four latest articles, then **Write to the group** (hotline, email, address, enquiry form link, social profiles) | **Recency** (the group is active) and a **closing action** for anyone who read this far. | A monograph ends with its colophon. Here the colophon is the way to get in touch. |

**House page order** (15 pages, one template):

1. **Hero**: house name, partner and sector, one-line positioning, and three actions visible in the first screen at 360px: **Call this house · Enquire · Directions**. The phone pill dials *this house's* number, not the group hotline.
2. **Figures**: founding year and real facts only.
3. **Offerings**: partner models and products, never cropped.
4. **The film**, where one exists.
5. **Plates**: the gallery.
6. **Visit and enquire**: every location with phone, email and map, and the **enquiry form inline**, pre-set to this house (the original had a form on every unit page).
7. **Next house.**

**Other pages** keep their Monograph structure: The Group, Sustainability, Responsibility, Journal, Careers and Contact. Two changes:
- The five sustainability initiatives link to their restored articles.
- Contact keeps the routed form.

---

## 2. Visual direction: "The Monograph", corrected

**Why this style fits this business.** MEH sells other people's luxury (BMW, Apple, KOHLER) and makes clothes for Europe's high streets. Its customers already know the partner brands. What they need from the group is **evidence of standing**: sixty years, fifteen companies, real factories and real showrooms. The right register is a printed monograph, the kind of book a family group commissions for an anniversary:

- **Chapters with Roman numerals.** They give a long, varied group a calm order.
- **Large plates of their real photography** with numbered captions: Fig. 01, Fig. 02. The pictures do the persuading.
- **Quiet type.** Their own licensed Banana Grotesk for structure. PP Migra Italic only for numerals and years, which turns their 1965 into an ornament.
- **Brass used sparingly** (`#8C7A5B`, with `#735F3E` for text on light surfaces at AA contrast). It is a nod to the showrooms' finishes.
- **Slow motion**: a few signature moments (the opening window, the turning years, plates that recede). Everything works without JavaScript and under reduced motion.

**Why it is not a template, and not a copy.** The current site (by Dcastalia) is a slider-and-carousel layout. This design has no sliders and no carousels. It is built on chapters, a contents page, a chapter spine in the margin and sticky plates. No layout is taken from another company's site.

**What changes in this round.**
- The opening names the partners.
- A contents page acts as the directory.
- Every page gets one-tap contact.
- Social profiles return to the footer.
- House pages carry their own form.
- The phone pill is house-aware.

---

## 3. SEO plan

| Item | Plan |
|---|---|
| Crawling | `robots.txt` **allows** crawling and lists the sitemap. This undoes the current `Disallow: /`, which is the single largest SEO fix. |
| Sitemap | Every page (36 URLs, including the 2 unit pages and the 5 sustainability articles the current sitemap misses or drops), with real `lastmod` dates. |
| Titles | `Page — Meghna Executive Holdings`, and houses as `Executive Motors: BMW in Bangladesh — Meghna Executive Holdings`. Unique, under 60 characters where possible, and starting with what people search. |
| Meta descriptions | A unique, factual description on **every** page (the current site has none on 24 of 33). |
| Headings | Exactly one H1 per page (the current site has none on Home, About, Sustainability, CSR and Contact), and H2/H3 in order. |
| Structured data | `Organization` with logo, address, telephone and `sameAs` (the four social profiles), plus `WebSite`, on the home page. `AutoDealer` (Executive Motors), `Store` (other trading houses), `Restaurant` (Slaw Bistro) and `Organization` (factories), each with `parentOrganization`, locations and phones. `Article` / `VideoObject` on news; `BreadcrumbList` on inner pages. |
| Images | Descriptive alt text on every content image (the current site leaves 58% empty); AVIF/WebP at responsive sizes; partner photography untouched. |
| Share cards | A designed 1200×630 PNG for every page, replacing the current SVG logo, which social networks don't render. |
| Internal links | Contents → houses; register → houses; houses → their articles and the next house; sustainability initiatives → articles; articles → their house; footer → every section. |
| Performance | Static HTML, inline CSS, LCP image at high priority, motion loaded after idle. Targets: LCP under 2.5 s and Performance 90+ on mobile. |
| Local | Each showroom's address, phone and map link in its house page and schema. **Owner to confirm:** Google Business Profile links for each showroom. |

---

## 4. URL migration plan (301, permanent)

Every URL on the current site keeps working. Each is answered by a single permanent redirect to its new page, with no chains. This is tested by `qa/redirects.mjs` against the full list in `docs/audit/orig-sitemap-urls.txt` plus the two unlisted unit pages.

| Current URL | New URL |
|---|---|
| `/` | `/` (unchanged) |
| `/about` | `/group` |
| `/units` | `/houses` |
| `/units/executive-motors-ltd` | `/houses/executive-motors` |
| `/units/executive-machines-ltd` | `/houses/executive-machines` |
| `/units/executive-lifestyles-ltd` | `/houses/executive-lifestyles` |
| `/units/penthouse-livings-limited` | `/houses/penthouse-livings` |
| `/units/penthouse-interior` | `/houses/penthouse-interior` |
| `/units/meghna-knit-composite-ltd` | `/houses/meghna-knit-composite` |
| `/units/meghna-dresses-ltd` | `/houses/meghna-dresses` |
| `/units/executive-intimates` | `/houses/executive-intimates` |
| `/units/executive-hi-fashions` | `/houses/executive-hi-fashions` |
| `/units/sublime-greentex` | `/houses/sublime-greentex` |
| `/units/executive-greentex` | `/houses/executive-greentex` |
| `/units/siam-bangla-industries-ltd` | `/houses/siam-bangla-industries` |
| `/units/executive-woodworks` | `/houses/executive-woodworks` |
| `/units/meghna-bearing-industries-limited` *(not in the old sitemap)* | `/houses/meghna-bearing-industries` |
| `/units/executive-gourmet-limited` *(not in the old sitemap)* | `/houses/executive-gourmet` |
| `/sustainability` | `/sustainability` (unchanged) |
| `/csr` | `/responsibility` |
| `/career` | `/careers` |
| `/contact` | `/contact` (unchanged) |
| `/media-center` | `/journal` |
| `/media-center/retail.next-by-bmw-an-unmatched-retail-experience` | `/journal/retail-next-by-bmw` |
| `/media-center/exploring-the-iphone-16-the-future-of-smartphones-with-executive-machines` | `/journal/exploring-the-iphone-16-the-future-of-smartphones-with-executive-machines` |
| `/media-center/penthouse-livings-driving-the-luxury-furniture-trend-in-bangladesh` | `/journal/penthouse-livings-driving-the-luxury-furniture-trend-in-bangladesh` |
| `/media-center/create-your-dream-bathroom-with-executive-lifestyles-limited` | `/journal/create-your-dream-bathroom-with-executive-lifestyles-limited` |
| `/media-center/meh’s-approach-to-modern-manufacturing` (both encodings) | `/journal/mehs-approach-to-modern-manufacturing` |
| `/media-center/the-first-ever-fully-electric-bmw-i7-sedan` | `/journal/the-first-ever-fully-electric-bmw-i7-sedan` |
| `/media-center/the-evolution-of-meghna-executive-holdings` | `/journal/the-evolution-of-meghna-executive-holdings` |
| `/media-center/solar-power-implementation-in-manufacturing-units` | `/journal/solar-power-implementation-in-manufacturing-units` **(restored article)** |
| `/media-center/carbon-footprint-reduction-in-transportation` | `/journal/carbon-footprint-reduction-in-transportation` **(restored)** |
| `/media-center/green-supply-chain-development-in-bangladesh` | `/journal/green-supply-chain-development-in-bangladesh` **(restored)** |
| `/media-center/local-water-conservation-and-harvesting-project` | `/journal/local-water-conservation-and-harvesting-project` **(restored)** |
| `/media-center/zero-waste-garment-production-initiative` | `/journal/zero-waste-garment-production-initiative` **(restored)** |
| `/media-center/<any other>` | `/journal/<same slug>` (catch-all) |

**Launch checklist for rankings.**
1. Remove `Disallow: /` (done in the new `robots.txt`).
2. Submit the new sitemap in Google Search Console.
3. Watch the Coverage report for two weeks.
4. Keep the redirects permanently.

---

## 5. Content rules and gaps

- All copy is drawn from the current site and rewritten for clarity. **No invented facts, prices, reviews, awards or client numbers.**
- The five restored sustainability articles use the current site's own text.
- **To collect from owner** (also listed in `CLIENT_QUESTIONS.md`):
  1. **WhatsApp numbers** for the showrooms, if they use WhatsApp. The current site publishes none, so the redesign shows none.
  2. **Executive Motors' number.** The site shows 16765 but dials 01886000555. Which is correct?
  3. **Showroom opening hours** for every trading house.
  4. **Google Business Profile links** for each showroom, and the group.
  5. **Customer or buyer testimonials**, with permission. None are published today.
  6. **Leadership**: names, roles and portraits (the section is a marked placeholder).
  7. **Apparel certifications** beyond LEED (for example BSCI, WRAP, OEKO-TEX, GOTS), only if held.
  8. **CMS API access** (from the owner or Dcastalia), so the redesign reads from the same admin panel the team uses today.
  9. **Original-resolution images** for the few photographs that exist only at thumbnail size.
  10. **Partner approvals** (BMW, Apple, KOHLER) before launch.
