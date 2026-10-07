# QA report: meghna-executive.com rebuild

- **Date:** 7 Oct 2026 (Monograph build; first build audited 5 Oct 2026)
- **Build:** production (`next build` + `next start`)
- **Environment:** Linux sandbox, headless Chromium 141 (Playwright 1.56), Lighthouse 12 (default mobile and desktop presets)

> **About the sandbox.** This sandbox's network can't reach the CMS from Next's image optimiser or from headless Chromium.
> - Next pins DNS for remote images as an SSRF guard, and that bypasses the sandbox proxy.
> - Chromium gets certificate and retry errors through the proxy.
>
> Visual and performance QA therefore ran with `QA_LOCAL_MEDIA=1`, which serves a byte-for-byte local copy of the same CMS images.
>
> Production fetches from `cms.meghna-executive.com` directly. That CMS URL was confirmed reachable (HTTP 200) with curl.

## 1. Lighthouse

These are the final measured runs of the **Monograph** build. Mobile uses simulated slow-4G with 4× CPU throttling.

| Page | Mobile perf | Desktop perf | A11y | Best practices | SEO | Mobile LCP (sim) | Mobile TBT | CLS |
|---|---|---|---|---|---|---|---|---|
| Home | **96** | **100** | 100 | 100 | 100 | 2.6 s | 60 ms | 0 |
| Houses index | **94** | **100** | 100 | 100 | 100 | 2.8 s | 50 ms | 0 |
| House: Executive Motors | **95** | **100** | 100 | 100 | 100 | 2.7 s | 50 ms | 0.005 |
| House: Sublime Greentex | **91** | **100** | 100 | 100 | 100 | 3.3 s | 40 ms | 0.005 |
| The Group | **98** | **100** | 100 | 100 | 100 | 2.3 s | 50 ms | 0 |
| Sustainability | **99** | **100** | 100 | 100 | 100 | 2.0 s | 70 ms | 0 |
| Responsibility | **92** | **99** | 100 | 100 | 100 | 3.2 s | 60 ms | 0 |
| Journal | **94** | **100** | 100 | 100 | 100 | 3.0 s | 30 ms | 0 |
| Journal article | **95** | **100** | 100 | 100 | 100 | 2.7 s | 50 ms | 0 |
| Careers | **95** | **100** | 100 | 100 | 100 | 2.8 s | 60 ms | 0 |
| Contact | **93** | **100** | 100 | 100 | 100 | 3.1 s | 50 ms | 0 |

Key metrics per run are in `qa/lighthouse/scores.json` (one-line summary in `qa/lighthouse/summary.txt`). Re-run `npx lighthouse` to regenerate the full reports, which are not committed (about 1 MB each).

**Against the brief's budgets:**

- **Lighthouse ≥ 90 (all four categories, mobile and desktop):** **met on every page.** Mobile performance is 91–99, desktop 99–100, and Accessibility, Best practices and SEO are 100 everywhere. The first ("Confluence") build missed this on Home, the Houses index and Careers; the Monograph is lighter.
- **CLS < 0.05:** met everywhere.
- **TBT < 200 ms (proxy for INP):** met everywhere (30–70 ms).
- **LCP < 2.0 s (simulated mobile):** **not met.** Simulated LCP is 2.0–3.3 s.
  - The real trace shows LCP at **0.15–0.25 s** on every page, at first paint (Home: 253 ms).
  - The simulation charges the whole JavaScript and image bandwidth of an image-led page to the first paint.
  - Field data (CrUX / PageSpeed Insights) after launch on a CDN is the number to watch.
- **Home JS ≤ 180 KB gzipped:** met before interaction. Lighthouse records 199 KB of script in total, which includes GSAP, ScrollTrigger and Lenis (~45 KB); those load lazily after `load` + idle, leaving about 154 KB up front. The whole home page transfers **433 KB** (fonts 118 KB, images 22 KB at first view).

**Fixed during QA, in the order found** (both builds):

1. **Films downloading on load (3.4 MB page weight).** The home film downloaded on first load because poster and playback shared one look-ahead. Fixed with separate poster and play observers.
2. **Repeated LCP entries.** A scripted entrance re-hid painted hero images, and a GSAP clip-path interpolation bug (browsers collapse `inset()` values) grew the panels. Both made the browser re-report LCP late. Fixed with a CSS-only, transform-free entrance and explicit tween start values. The Monograph's opening keeps the same rule: the LCP is a still frame at high priority, and the film only fades in over it after idle, on desktop.
3. **Main-thread work.** Motion boots after load + idle, its setup is batched with yields, and Lenis is skipped on touch devices. TBT went from 690 ms to 30–70 ms.
4. **Phones zooming out house pages.** A screen-reader-only label inside the BMW model rail escaped its scroller and widened the document to 2,362px. Fixed at the root (`.visually-hidden` is anchored, and scrollers are positioning contexts). All 31 pages fit 390px.
5. **Render-blocking CSS.** CSS is inlined (four blocking requests removed). Fonts no longer preload (they're discovered immediately from the inline CSS), and the favicon went from 52 KB to 6 KB.
6. **Monograph: odometer gaps.** PP Migra's digits are proportional, so the year odometer showed gaps. Each digit column is now sized from measured glyph widths.
7. **Monograph: years hidden under reduced motion.** The register pinned even under `prefers-reduced-motion`, leaving years stacked out of sight. It now pins only when motion is allowed and is a plain vertical register otherwise.
8. **Monograph: phone register flush to the edge.** A list-reset rule outranked the register's padding. The reset is now zero-specificity (`:where()`).

## 2. Accessibility

- **Axe-core (WCAG 2.0/2.1/2.2 A + AA tags):** **0 violations on all 14 audited pages.** These are Home, Houses, 3 house pages, Group, Sustainability, Responsibility, Journal, 2 articles, Careers, Contact and 404. Report: `qa/axe-report.json`.
- **Fixed during QA:**
  - `aria-label` on `<p>` (prohibited ARIA) in the first build's scrub-words component and marquee.
  - Heading order on the Journal index.
  - Monograph: brass text on light surfaces failed contrast (`#8C7A5B`, 3.6:1). Text and small marks now use `--silt-text` (`#735F3E`, ≥ 4.7:1); fills keep the original brass.
  - Monograph: spine numerals for short chapters overlapped (target size, WCAG 2.5.8). They now keep at least 44px apart.
- **Keyboard and screen readers:**
  - A skip link and landmarks on every page.
  - The menu is a focus-trapped dialog with Esc to close, inert when closed, and focus returns to the toggle.
  - House Index filters are native radios (arrow keys work).
  - Touch rows use `aria-expanded` / `aria-controls`.
  - Form errors use `aria-invalid` and `aria-describedby`, and focus moves to the error summary.
  - Visible `--silt` focus rings.
- **Moving content:** every film has a pause control (WCAG 2.2.2). The marquee pauses on hover and stops under reduced motion.
- **Not yet done:** captions. The supplied films have no dialogue. The YouTube film's captions depend on YouTube.

## 3. Progressive enhancement

| Check | Result |
|---|---|
| JavaScript disabled, 10 page types | All content visible (0 hidden elements); menu works via `:target`; enquiry form submits and confirms (server action) |
| `prefers-reduced-motion: reduce` | All content visible; no smooth scroll, no pinned or scrubbed scenes, no autoplay; numerals drawn filled; the register is a plain list |
| Horizontal overflow at 390px (`qa/docwidth.mjs`) | **31/31 pages fit** |
| Legacy URLs | `/about`, `/units/*`, `/csr`, `/career`, `/media-center/*` (including punctuated slugs) all redirect permanently |
| Share cards | 1200×630 PNG per page and per house/article, correct `og:*` and `twitter:*` tags |
| Enquiry routing | Motors enquiries route to `info@bmw.com.bd`; houses without their own email route to `info@meghna-executive.com` (honeypot + minimum fill time tested) |

## 4. Responsive and visual review

Screenshots are in `qa/screens/` (scroll-stop contact sheets). The `mono-*` sheets are the current design; `sheet-*` record the first ("Confluence") build for comparison.

| File | Shows |
|---|---|
| `mono-desktop.jpg` | Home at 1440 |
| `mono-ipad.jpg` | Home at 834 |
| `mono-phone.jpg` | Home at 390 |
| `mono-motors.jpg` | Executive Motors house page |
| `mono-group.jpg` | The Group |
| `menu-*.jpg` | Menu, desktop and phone |
| `contact-errors.jpg` | Enquiry form error state |
| `og-*.jpg` | Share cards |

- **Phone (390):** the opening plate, chapters stacked with numerals above their titles, a vertical 1965–2025 register, full-height house plates, swipe galleries and model rail, a brass reading-progress hairline at the top, and a thumb-zone pill (hotline + menu).
- **iPad portrait (834):** the same chapters with larger plates, a two-column House Index with thumbnails, and two-column journal and card grids.
- **Desktop (1440):** the pinned opening that closes into a framed window, the chapter spine in the margin, the pinned odometer register, sticky house plates that recede as the next covers them, and window reveals on every figure.

## 5. Cross-browser matrix

| Browser | Status |
|---|---|
| Chromium 141 (desktop + Android emulation) | **Tested:** all checks above |
| Safari iOS 16+ / iPadOS Safari | **Not tested in this sandbox.** The code targets it (`100svh`, `env(safe-area-inset-*)`, `-webkit-` mask and text-stroke prefixes, `:has()` from 15.4). Needs a real-device pass. |
| Safari macOS, Firefox, Edge | **Not tested in this sandbox.** `:has()` needs Firefox 121+. Needs a BrowserStack pass before launch. |

## 6. Known limitations and follow-ups

- **Content is a snapshot.** It is a typed migration of the live site, not yet wired to the CMS API (see README → CMS integration).
- **Enquiries.** Delivery needs `ENQUIRY_WEBHOOK_URL`. Without it, enquiries are only logged on the server.
- **Leadership.** The section is a marked placeholder until the client supplies content.
- **Low-resolution images.** Several CMS images exist only at thumbnail sizes (270–342px), including the KOHLER rain shower and the BMW i7 front used on the old home page.
  - They are used only at small sizes, never upscaled.
  - The sustainability river aerial (1366px) runs full-bleed. It is slightly upscaled on screens wider than 1366px; request the original.
- **Bangla.** The layout is ready for Bangla text lengths, but the language toggle and Bangla fonts are phase 2 as briefed.
