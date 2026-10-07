# Scorecard: the original site vs the redesign (round 2)

Measured 7 Oct 2026.

- **The original** is the live site at meghna-executive.com.
- **The redesign** is the local preview of this repository (production build).

**Both are measured the same way:**
- Lighthouse 12 default presets (mobile is slow-4G simulation with 4× CPU slowdown).
- The median of **5 runs** for each home page and of 3–5 runs for every other mobile page; ranges are shown because this machine is noisy.
- The same crawler and 15-point SEO checklist, the same 360px phone probes, and the same desktop byte counter.

Raw data: `docs/audit/lh/*-medians.json` (round 1 in `docs/audit/lh/round1/`), `docs/audit/*-crawl.json`, and the scripts in `qa/`.

> **Fairness note.**
> - The original is reached over the internet through this sandbox's proxy. The redesign runs locally on a warm image cache, as a CDN would serve it.
> - Lighthouse's simulated throttling puts both through the same slow-4G model, so scores, weights, SEO, accessibility and contact paths compare directly.
> - *Observed* paint times favour the local preview and are shown for information only.
> - The owner can check the original's numbers at pagespeed.web.dev.
>
> **A fairer baseline, too:** the column "Original + quick fixes" estimates the current site after its developer fixes `robots.txt`, writes meta descriptions and removes the broken links. Those are an afternoon's work, and they should be done whatever the owner decides.

---

## 1. Headline scorecard

| Metric | Original | Original + quick fixes (estimated) | Redesign |
|---|---|---|---|
| **Lighthouse mobile, home**: Performance / A11y / Best practices / SEO | **57** / 93 / 96 / 69 | 57 / 98 / 96 / 100 | **94** / 100 / 100 / 100 |
| Lighthouse mobile Performance, every page measured | 56–91 | 56–91 (unchanged by the fixes) | **93–97** |
| Lighthouse Accessibility / SEO, every page | 80–94 / 46–69 | 84–98 / 85–100 | **100 / 100** |
| Lighthouse desktop Performance, home | 76 | 76 | **98** |
| **LCP, home, mobile** (simulated slow 4G) | **9.5 s** | 9.5 s | **2.7 s** |
| LCP, home, mobile (observed in the browser) | 5.65 s | 5.65 s | 0.26 s |
| **Page weight, mobile, home** | 1.76 MB (one run 4.1 MB) | same | **0.49 MB** |
| Page weight, mobile, every page measured | 0.84–2.04 MB | same | 0.39–0.49 MB |
| **Desktop home, bytes received after 3 s / 5 s / 10 s** (two runs) | 0–0.5 / 0.6–1.1 / 1.9–2.0 MB, still loading | same | 1.2–1.3 MB, finished by 3 s (including the 0.8 MB film) |
| **Taps to call the group from the home page** (360px phone) | **3 taps + a scroll** | same | **1 tap** (call button on the first screen) |
| **Taps to call BMW from the home page** | **4 taps + scrolls** | same | **2 taps** (Find a company → BMW 16765) |
| **First phone number on a company page** | 8.2–12.7 screens down | same | **0.7 screens** (first screen), plus a call button that stays on screen and dials that company |
| Enquiry form on a company page | 8.9–13.0 screens down | same | **1 tap** ("Enquire" / "Book a test drive" in the first screen) |
| Partner marks on the phone's first screen | No (a BMW slide with the roundel) | same | **Yes**: BMW, KOHLER, Apple Authorised Reseller, Penthouse Livings |
| **SEO checks passed** (15-point checklist) | **3 / 15** | about 7 / 15 | **15 / 15** |
| Search engines allowed to crawl | **No** (`Disallow: /`) | Yes | Yes |
| Structured data | 1 page | 1 page | Every page (Organization, AutoDealer/Store/Restaurant, Article, Breadcrumbs) |
| Old URLs preserved | n/a | n/a | **36 / 36** answer with one 301 to a live page (tested) |
| Browser console errors on load | yes (404s, a 500, a render error) | probably still | none |
| Accessibility audit (axe, WCAG 2.2 AA) | Lighthouse flags unnamed links, heading order, contrast, unlabelled fields, missing alt | fewer | **0 violations** on 14 page types |
| Fits a 360px phone, nothing clipped | page fits, but the "Innovation" carousel clips its text | same | all 36 pages fit; nothing clipped |
| **Home page length on a phone** | **9.5 screens** | same | **18.1 screens** (see section 4) |

## 2. Page by page (Lighthouse mobile medians, with ranges)

| Page (original → redesign) | Perf | A11y | BP | SEO | LCP sim | LCP observed | TBT | CLS | Weight | Desktop Perf |
|---|---|---|---|---|---|---|---|---|---|---|
| Home | 57 (50–62) → **94** (89–96) | 93 → 100 | 96 → 100 | 69 → 100 | 9.5 → **2.7 s** | 5.65 → 0.26 s | 288 → 99 ms | 0.053 → 0 | 1763 → 494 KB | 76 → 98 |
| Units → Our companies | 57 (53–57) → **93** (89–96) | 90 → 100 | 96 → 100 | 69 → 100 | 6.4 → **2.5 s** | 2.33 → 0.23 s | 258 → 130 ms | 0 → 0 | 2044 → 445 KB | 84 → 99 |
| Executive Motors | 56 (55–62) → **95** (91–96) | 80 → 100 | 96 → 100 | 46 → 100 | 5.3 → **2.6 s** | 2.03 → 0.33 s | 356 → 80 ms | 0.011 → 0.009 | 2037 → 417 KB | no result* → 100 |
| About → The Group | 72 → **95** (94–95) | 89 → 100 | 96 → 100 | 69 → 100 | 3.8 → **2.6 s** | 2.66 → 0.23 s | 244 → 122 ms | 0.125 → 0 | 1724 → 410 KB | 84 → 100 |
| Contact | 90 (87–91) → **97** (93–97) | 91 → 100 | 96 → 100 | 61 → 100 | 1.9 → *2.3 s* | 1.40 → 0.25 s | 176 → 77 ms | 0.110 → 0 | 838 → 392 KB | 89 → 100 |
| Sublime Greentex | 78 (75–85) → **95** (89–95) | 86 → 100 | 96 → 100 | 54 → 100 | 2.8 → **2.7 s** | 2.25 → 0.26 s | 399 → 97 ms | 0.006 → 0.006 | 1376 → 437 KB | no result* → 100 |
| Media Center → Journal | 91 (88–92) → **95** (95–96) | 90 → 100 | 96 → 100 | 69 → 100 | 2.2 → *2.6 s* | 1.98 → 0.25 s | 72 → *117 ms* | 0.067 → 0 | 1032 → 441 KB | 83 → 100 |

\* Lighthouse could not record an LCP on the original's Executive Motors and Sublime Greentex pages in desktop mode (the run fails with no score).
*Italic* = the redesign is worse on that metric. See section 4.

## 3. The owner's objections from review round 1: answered on the site?

| Round-1 objection | Status | Where you can see it |
|---|---|---|
| "It puts promises in my mouth" (river pledge, "currents", "fifty", "17 buyers", "no open roles") | ✅ Fixed | Every page's text was fact-checked against the live site's own text (`docs/audit/orig-text/`). Invented lines are gone. Distorted figures now use the site's wording: capacity shown as capacity, sewing 80,000/day, "over 50" furniture brands, "authorised" KOHLER distributor. Remaining contradictions *in the live site itself* are listed for the owner (`CLIENT_QUESTIONS.md`, A12–A16). |
| Founding years contradict each other on the home page | ✅ Fixed | Years appear only once on the home page (Milestones). The directory carries none. |
| Contact details dropped | ✅ Fixed | Executive Motors shows 16765 and 01886-000555. Meghna Bearing shows both numbers and its email; SLAW Bistro its email; Penthouse Interior its email. Checked against every `tel:` and `mailto:` link on the live site. |
| Blurry first screen on phones, no brands | ✅ Fixed | A portrait crop of the opening frame at native resolution. The four partner marks on the first screen. Full-screen plates now request images sized by screen height. |
| Home page three times longer | ⚠️ Halved the gap | 27.5 → 18.1 screens at 360px (the original is 9.5). See section 4. |
| Words that don't fit ("houses", "Plates", "Fig.", "Register", "Correspondence") | ✅ Fixed | "Our companies", "Find a company", "Gallery", "Milestones", "News"; no figure numbers. |
| "Book a Test Drive" gone | ✅ Fixed | On the Executive Motors first screen, and above its form. |
| Clipped pause button, stray dot, logo over text, `__qa-media` | ✅ Fixed | The control is inset. The cue is removed. The phone logo bar leaves once you scroll. `robots.txt` names the QA folder only in QA builds. **Note:** the `__qa-media` image paths exist only in this sandbox preview, because the sandbox can't reach the CMS. Production serves images from cms.meghna-executive.com, as today. |
| "4× lighter" only on phones; desktop pulls a 2.8 MB film | ✅ Fixed | The film is now 14 s at 720p (0.8 MB, was 2.9 MB). The desktop home finishes at 1.2–1.3 MB, against the original's 1.9–2.0 MB at 10 s. |
| The model line-up | ✅ Kept | On phones the BMW line-up is a two-column grid, as on the live site. The 3 Series card uses the live site's own image. |
| My team can't update it; no price; partner approval; launch and rollback | ❌ Not answerable by the site | See section 5. These are commercial terms for the agency to put in writing. |

## 4. Where the redesign is not better, and why

1. **Simulated mobile LCP on two light pages:** Contact 1.9 → 2.3 s, and Media Center → Journal 2.2 → 2.6 s.
   - **The owner-facing sentence:** every redesigned page carries its whole design system inline, which Lighthouse's slow-4G model charges to the first paint. Both pages still score higher overall (90 → 97, 91 → 95), weigh half as much, and paint in a quarter of a second in the browser.
   - **Tried:** external stylesheets (worse) and dropping a font weight (done). Strict per-route CSS needs a webpack build: a contained task after approval.
2. **Total blocking time on the Journal:** 72 → 117 ms. Both are well inside the 200 ms budget, and the page still scores higher overall.
3. **The home page is longer on a phone:** 9.5 → 18.1 screens.
   - The page holds what the original doesn't:
     - a directory of all fifteen companies with one-tap calls;
     - milestones;
     - full-screen plates for the four trading companies;
     - the apparel chapter;
     - news.
   - Nobody has to read it to act. The call button is on the first screen, and the directory starts under two screens down.
   - This round cut 9 screens: six milestones on phones (with a link to all eleven), four plates, tighter chapter breaks, and a shorter footer.

## 5. What the site cannot answer (for the agency's written proposal)

These came up in round 1, and they are fair:
- **A fixed price** for build, hosting and maintenance, with the owner owning the code, domain and accounts, and an exit clause.
- **Editing in the existing CMS** (cms.meghna-executive.com). All content sits behind one data layer (`src/lib/cms.ts`). Connecting it needs API access from the owner or Dcastalia, and should be demonstrated before launch.
- **Partner approval** by BMW, Apple and KOHLER of how their brands appear.
- **A staged launch with a tested rollback** to the current site.
- **Enquiry delivery** to each company's inbox, tested by the owner (the form routes per company; the destination inboxes must be configured).

## 6. Screenshots

- `docs/screens/compare-home-mobile.jpg`: home on a 360px phone, original above, redesign below.
- `docs/screens/compare-home-desktop.jpg`: home at 1440px.
- `docs/screens/compare-motors-mobile.jpg`: Executive Motors on a 360px phone.
- `docs/screens/compare-motors-desktop.jpg`: Executive Motors at 1440px.
- `docs/screens/original-mobile-360.jpg`, `docs/screens/original-desktop.jpg`: the original in full.
