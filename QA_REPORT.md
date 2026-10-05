# QA report: meghna-executive.com rebuild

- **Date:** 5 Oct 2026
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

These are the final measured runs. Mobile uses simulated slow-4G with 4× CPU throttling.

| Page | Mobile perf | Desktop perf | A11y | Best practices | SEO | Mobile LCP (sim) | Mobile TBT | CLS |
|---|---|---|---|---|---|---|---|---|
| Home | **88–93** (3 runs: 88, 89, 89; earlier build 91–93) | **100** | 100 | 100 | 100 | 2.8–3.4 s | 150 ms | 0 |
| Houses index | 83–86 | 100 | 100 | 100 | 100 | 4.0 s | 130–160 ms | 0.003 |
| House: Executive Motors | **95** | **100** | 100 | 100 | 100 | 2.7 s | 40 ms | 0.005 |
| House: Sublime Greentex | **95** | **100** | 100 | 100 | 100 | 2.7 s | 40 ms | 0.005 |
| The Group | **95** | **100** | 100 | 100 | 100 | 2.7 s | 40 ms | 0.024 |
| Sustainability | **91** | **100** | 100 | 100 | 100 | 3.3 s | 40 ms | 0.013 |
| Responsibility | **90** | **100** | 100 | 100 | 100 | 3.6 s | 30 ms | 0.012 |
| Journal | **91–94** | **100** | 100 | 100 | 100 | 3.1–3.3 s | 50–60 ms | 0.004 |
| Journal article | **95** | **99** | 100 | 100 | 100 | 2.7 s | 50 ms | 0 |
| Careers | 87–88 | **100** | 100 | 100 | 100 | 3.8 s | 100 ms | 0.007 |
| Contact | **92** | **100** | 100 | 100 | 100 | 3.2 s | 40 ms | 0.015 |

Key metrics per run are in `qa/lighthouse/scores.json`. Re-run `npx lighthouse` to regenerate the full reports, which are not committed (about 1 MB each).

**Against the brief's budgets:**

- **Lighthouse ≥ 90 (all four categories, mobile and desktop).**
  - Desktop: met everywhere (99–100).
  - Accessibility, Best practices and SEO: 100 on every page.
  - Mobile performance: met on 8 of 11 page types.
  - **Not met:** Home (88–89 on the final build), Houses index (83–86) and Careers (87–88).
- **CLS < 0.05:** met everywhere.
- **TBT < 200 ms (proxy for INP):** met everywhere.
- **LCP < 2.0 s (simulated mobile):** **not met.** Simulated LCP is 2.7–4.0 s.
  - The real trace shows LCP at **0.24–0.26 s on Home**, at first paint.
  - The simulation charges the whole JavaScript and image bandwidth of an image-led, motion-rich page to the first paint.
  - Field data (CrUX / PageSpeed Insights) after launch on a CDN is the number to watch.
- **Home JS ≤ 180 KB gzipped:** about 150 KB transferred before interaction. GSAP, ScrollTrigger and Lenis (~45 KB) load lazily after `load` + idle.

**Fixed during QA, in the order found:**

1. **Films downloading on load (3.4 MB page weight).** The home film downloaded on first load because poster and playback shared one look-ahead. Fixed with separate poster and play observers. Home weight dropped to **596 KB**.
2. **Repeated LCP entries.** A scripted entrance re-hid painted hero images, and a GSAP clip-path interpolation bug (browsers collapse `inset()` values) grew the panels. Both made the browser re-report LCP late. Fixed with a CSS-only, transform-free entrance and explicit tween start values. Observed LCP went from 834 ms to about 200 ms.
3. **Main-thread work.** Motion now boots after load + idle. Its setup is batched with yields, the river line is sampled about 4× less often, and Lenis is skipped on touch devices. TBT went from 690 ms to about 150 ms.
4. **Phones zooming out house pages.** A screen-reader-only label inside the BMW model rail escaped its scroller and widened the document to 2,362px, so phones zoomed the whole page out. Fixed at the root (`.visually-hidden` is anchored, and scrollers are positioning contexts). All 31 pages now fit 390px.
5. **Render-blocking CSS.** CSS is inlined (four blocking requests removed). Fonts no longer preload (they're discovered immediately from the inline CSS), and the favicon went from 52 KB to 6 KB.

**Further gains if mobile ≥ 90 everywhere is required:**

- Cap Houses-index cards on phones at a shorter aspect ratio, or use a smaller first image.
- Move the Careers mosaic below a text block.
- Serve from an edge CDN with HTTP/3.
- Drop Banana Grotesk Medium (labels could use Regular) to save 20 KB of fonts.

## 2. Accessibility

- **Axe-core (WCAG 2.0/2.1/2.2 A + AA tags):** **0 violations on all 14 audited pages.** These are Home, Houses, 3 house pages, Group, Sustainability, Responsibility, Journal, 2 articles, Careers, Contact and 404. Report: `qa/axe-report.json`.
- **Fixed during QA:**
  - `aria-label` on `<p>` (prohibited ARIA) in the scrub-words component and the marquee.
  - Heading order on the Journal index.
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
| `prefers-reduced-motion: reduce` | All content visible; no smooth scroll, no scrubbed scenes, no autoplay; river line drawn in full |
| Horizontal overflow at 390px (`qa/docwidth.mjs`) | **31/31 pages fit** |
| Legacy URLs | `/about`, `/units/*`, `/csr`, `/career`, `/media-center/*` (including punctuated slugs) all redirect permanently |
| Share cards | 1200×630 PNG per page and per house/article, correct `og:*` and `twitter:*` tags |
| Enquiry routing | Motors enquiries route to `info@bmw.com.bd`; houses without their own email route to `info@meghna-executive.com` (honeypot + minimum fill time tested) |

## 4. Responsive and visual review

Screenshots are in `qa/screens/` (scroll-stop contact sheets):

| File | Shows |
|---|---|
| `sheet-desktop.jpg` | Home at 1440 |
| `sheet-ipad.jpg` | Home at 834 |
| `sheet-phone.jpg` | Home at 390 |
| `sheet-houses.jpg` | House pages and the Houses index (desktop and phone) |
| `sheet-ipad-inner.jpg` | All inner pages at iPad portrait |
| `menu-*.jpg` | Menu, desktop and phone |
| `contact-errors.jpg` | Enquiry form error state |
| `og-*.jpg` | Share cards |
| `herocheck.jpg` | Hero frames on desktop and phone |

- **Phone (390):** stacked horizontal streams in the hero, a thumb-zone pill (hotline + menu), swipe galleries and model rail, vertical timeline with the line on the left.
- **iPad portrait (834):** a two-column House Index with thumbnails, a river timeline alternating around the centre line, and two-column journal and card grids.
- **Desktop (1440):** a pinned confluence hero, cursor-follow House Index, pinned horizontal timeline, and alternating partner spreads with drifting oversized type.

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
