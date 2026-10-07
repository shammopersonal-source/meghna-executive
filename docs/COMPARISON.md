# Scorecard: the original site vs the redesign

- **Measured:** 7 Oct 2026.
- **The original** is the live site at meghna-executive.com.
- **The redesign** is the local preview of this repository (production build).
- **Both are measured the same way:**
  - Lighthouse 12 default presets: slow-4G simulation and 4× CPU slowdown on mobile.
  - 5 runs for each home page and 3 runs for every other mobile page; the medians are reported.
  - The same crawler and the same 15-point SEO checklist.
  - The same 360px phone probes.
- **Raw data:**
  - Lighthouse medians: `docs/audit/lh/*-medians.json` (`orig-` and `new-`).
  - Crawls: `docs/audit/*-crawl.json`.
  - Scripts: `qa/`.

> **Fairness note.** The original is reached over the internet through this sandbox's proxy. The redesign runs locally with a warm image cache, as a CDN would serve it in production. Lighthouse's simulated throttling puts both through the same slow-4G model, so the scores, weights, SEO, accessibility and contact-path results compare directly. The *observed* paint times favour the local preview and are shown for information only. The owner can verify the original's numbers at pagespeed.web.dev.

---

## 1. Headline scorecard

| Metric | Original | Redesign | Better? |
|---|---|---|---|
| **Lighthouse mobile, home** (Performance / Accessibility / Best practices / SEO) | **57** / 93 / 96 / 69 | **95** / 100 / 100 / 100 | ✅ all four |
| **Lighthouse mobile, every page measured** (Performance) | 56–91 | 90–97 | ✅ every page |
| **Accessibility / Best practices / SEO, every page** | 80–94 / 96 / 46–69 | 100 / 100 / 100 | ✅ every page |
| **Lighthouse desktop, home** (Performance) | 76 | 99 | ✅ |
| **LCP, home, mobile** (simulated slow 4G) | **9.5 s** | **2.6 s** | ✅ 3.7× faster |
| LCP, home, mobile (observed in the browser) | 5.65 s | 0.25 s | ✅ |
| **Page weight, home** | **1.76 MB** (one run: 4.1 MB) | **0.43 MB** | ✅ 4× lighter |
| Page weight, every page measured | 0.84–2.04 MB | 0.39–0.44 MB | ✅ every page |
| **Taps to call the group from the home page** (360px phone) | **3 taps + a scroll** (Menu → scroll → Contact → number) | **1 tap** (the call button is on the first screen) | ✅ |
| **Taps to call BMW (Executive Motors) from the home page** | **4 taps + scrolls** (Menu → Trading Brands → Executive Motors → scroll ~10 screens → number) | **2 taps** (Find a house → BMW 16765) | ✅ |
| **First phone number on a house page** | 8.2–12.7 screens down | 0.7 screens (in the first screen), plus a call button that follows you | ✅ |
| **Enquiry form on a house page** | 8.9–13.0 screens down | 1 tap ("Enquire" in the first screen), or 5.6–6.2 screens of scrolling | ✅ |
| **SEO checks passed** (15-point checklist) | **3 / 15** | **15 / 15** | ✅ |
| Search engines allowed to crawl | **No** (`robots.txt: Disallow: /`) | Yes | ✅ |
| Old URLs preserved | n/a | **36 / 36** answer with one 301 to a live page | ✅ |
| Broken links (`tel:undefined`, `mailto:undefined`) | on 30 of 33 pages | 0 | ✅ |
| Browser console errors on load | yes (404s, a 500, a render error) | none | ✅ |
| Accessibility audit (axe, WCAG 2.2 AA) | Lighthouse flags unnamed links, heading order, colour contrast, unlabelled form fields, missing image alt | 0 violations on 14 page types | ✅ |
| Works without JavaScript / with reduced motion | not tested | every page fully readable; enquiry forms submit | ✅ |
| Fits a 360px phone with no sideways scroll | page fits, but the "Innovation" carousel clips its text | all 36 pages fit; nothing clipped | ✅ |

## 2. Page by page (Lighthouse medians)

| Page (original → redesign) | Mobile Perf | A11y | BP | SEO | LCP sim | LCP observed | TBT | CLS | Weight | Desktop Perf |
|---|---|---|---|---|---|---|---|---|---|---|
| Home → Home | 57 → **95** | 93 → 100 | 96 → 100 | 69 → 100 | 9.5 → **2.6 s** | 5.65 → 0.25 s | 288 → 96 ms | 0.053 → 0 | 1763 → 433 KB | 76 → 99 |
| Units → Houses | 57 → **90** | 90 → 100 | 96 → 100 | 69 → 100 | 6.4 → **2.2 s** | 2.33 → 0.27 s | 258 → *359 ms* | 0 → 0 | 2044 → 444 KB | 84 → 100 |
| Executive Motors | 56 → **95** | 80 → 100 | 96 → 100 | 46 → 100 | 5.3 → **2.6 s** | 2.03 → 0.20 s | 356 → 93 ms | 0.011 → 0.004 | 2037 → 416 KB | no result* → 100 |
| About → The Group | 72 → **93** | 89 → 100 | 96 → 100 | 69 → 100 | 3.8 → **2.9 s** | 2.66 → 0.26 s | 244 → 61 ms | 0.125 → 0 | 1724 → 411 KB | 84 → 100 |
| Contact | 90 → **97** | 91 → 100 | 96 → 100 | 61 → 100 | 1.9 → *2.3 s* | 1.40 → 0.27 s | 176 → 87 ms | 0.110 → 0 | 838 → 392 KB | 89 → 100 |
| Sublime Greentex | 78 → **90** | 86 → 100 | 96 → 100 | 54 → 100 | 2.8 → *3.3 s* | 2.25 → 1.26 s | 399 → 78 ms | 0.006 → 0.006 | 1376 → 436 KB | no result* → 100 |
| Media Center → Journal | 91 → **92** | 90 → 100 | 96 → 100 | 69 → 100 | 2.2 → *3.2 s* | 1.98 → 0.28 s | 72 → 95 ms | 0.067 → 0 | 1032 → 441 KB | 83 → 100 |

\* Lighthouse could not record an LCP on the original's Executive Motors and Sublime Greentex pages in desktop mode (the run fails with no score).

**Italic = the redesign is worse on that metric.** See section 4.

## 3. Each refusal reason from the audit: answered?

| # | The owner's reason to say no | Answered? | Where the answer is |
|---|---|---|---|
| R1 | "It costs money and the site works fine." | ✅ | The current site **blocks Google from every page**, takes 9.5 s to show its home page on a phone, and has no way to call from a phone's first screen. These are measured above, not opinions. |
| R2 | "I'll lose my Google rankings." | ✅ | All 36 old URLs redirect permanently (301, single hop) to their new page, tested by `qa/redirects.mjs`. The current site already tells Google not to crawl it, so the risk runs the other way. |
| R3 | "My developer can fix those things." | ✅ partly | `robots.txt`, meta descriptions and broken links *are* quick fixes, and the owner should ask for them regardless. A patch would not deliver the rest: 4× lighter pages, a call button and directory in the first screen, a form in the first screen of every house, house-specific phone routing, schema for every showroom, 15/15 SEO, 100 accessibility. |
| R4 | "My team can't update it." | ⚠️ needs owner action | All content sits behind one data layer (`src/lib/cms.ts`), ready to read from the existing admin panel at cms.meghna-executive.com. **This needs API access from the owner or Dcastalia.** Until then, content is a typed copy of the live site. |
| R5 | "It's a hassle and a risk." | ✅ | A private local preview to inspect first. Every legacy URL tested. QA scripts for accessibility, no-JS, 360px fit, forms and redirects. Partner imagery used exactly as supplied. |
| R6 | "I don't see the difference — same photos, same fonts." | ✅ | The side-by-side screenshots in `docs/screens/compare-*.jpg`, and the first-screen difference on a phone (a call button, Find a house, Call / Enquire / Directions on every house). |
| R7 | "My partners must approve it." | ✅ | BMW, Apple and KOHLER photography and marks are never recoloured or cropped through the product. A partner-approval step is in `CLIENT_QUESTIONS.md`. |
| R8 | "Customers don't buy on the group site." | ✅ | The redesign treats the site as a router: 1–2 taps to the right house's phone, against 3–4 taps and ~10 screens of scrolling. |
| R9 | "The new one leaves things out." | ✅ | See section 5: every strength of the original is kept or improved. |

## 4. Where the redesign is not better, and why

1. **Simulated mobile LCP on three light pages** (Contact 1.9 → 2.3 s, Sublime Greentex 2.8 → 3.3 s, Media Center → Journal 2.2 → 3.2 s).
   - **One-sentence justification:** every redesigned page carries its full design system inline (about 70 KB of CSS before compression), which Lighthouse's slow-4G simulation charges to the first paint; yet each of these pages still scores higher overall (90 → 97, 78 → 90, 91 → 92), weighs half as much or less, and paints in under 0.3 s in the browser (Sublime: 1.26 s against the original's 2.25 s).
   - **What we tried:**
     - External stylesheets: worse, because they block rendering.
     - Strict per-route CSS chunking: not supported by the Turbopack build.
     - Dropping the Medium weight of Banana Grotesk: done.
   - **What would close it:** moving the build to webpack with strict CSS chunking, or trimming per-page CSS. This is a contained engineering task after approval.
2. **Total blocking time on the houses index** (median 258 → 359 ms). Both sites vary widely run to run (original 133–329 ms, redesign 80–516 ms), and the redesign's index still scores 90 against 57. The cost comes from the index's hover previews, which only load on desktop pointers.
3. **The home page is longer on a phone** (9.5 → about 25 screens at 360px).
   - It is a monograph: the 1965–2025 register, a full-screen plate for each flagship house, and chapters for apparel and sustainability.
   - Nobody has to read it to act. The call button is on the first screen, and the directory of all fifteen houses (with one-tap calls to the showrooms) begins under two screens down.
   - The register was cut from 7.8 to 3.8 screens on phones in this round.

## 5. What the original does well: kept?

| Strength of the original | In the redesign |
|---|---|
| Brand-led first impression (BMW, KOHLER, Apple, Penthouse up front) | ✅ The opening line names BMW, KOHLER and Apple. The partners' own marks sit under the foreword, linked to each house. The Contents page lists each trading house with its partner. |
| Premium licensed typography | ✅ The same faces (Banana Grotesk, PP Migra Italic). |
| Contact block and enquiry form on every unit page | ✅ Improved: Call / Enquire / Directions in the first screen, the form inline and preset to the house, every showroom with phone, email and map. |
| Hotline 16765 in the header | ✅ In the desktop header, and on phones in a call button that stays on screen. On a house page it dials that house's own number. |
| 12 Media Center articles | ✅ All 12 kept at redirected URLs. The five sustainability pieces, previously dropped, are restored and linked from Sustainability. |
| Complete footer (address, email, hotline, social profiles, links) | ✅ All kept, including Facebook, Instagram, LinkedIn and YouTube. |
| Unique page titles and canonical tags | ✅ Kept. Titles now lead with what people search for ("Executive Motors: BMW in Bangladesh"). |
| CMS-editable | ⚠️ Prepared (single data layer). Needs API access; see R4. |
| No sideways scroll on phones | ✅ All 36 pages fit 360px, and nothing is clipped. |
| Real photography and films | ✅ Only the client's own imagery. Partner imagery is untouched. The BMW 3 Series card now uses the 800px original instead of a 291px thumbnail. |

## 6. Screenshots

- `docs/screens/compare-home-mobile.jpg`: home on a 360px phone, original above, redesign below.
- `docs/screens/compare-home-desktop.jpg`: home at 1440px.
- `docs/screens/compare-motors-mobile.jpg`: Executive Motors on a 360px phone.
- `docs/screens/compare-motors-desktop.jpg`: Executive Motors at 1440px.
- `docs/screens/original-mobile-360.jpg`, `docs/screens/original-desktop.jpg`: the original in full.
