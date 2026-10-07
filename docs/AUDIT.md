# Audit: meghna-executive.com (the original)

- **Audited:** 7 Oct 2026, live site, from this sandbox.
- **Market:** Bangladesh (KARJO Prime). The owner pitch is in English, at our request.
- **Method:** Lighthouse 12 (default mobile and desktop presets) in headless Chromium 141; a rendered crawl of every sitemap URL at 360px (`qa/audit-crawl.mjs`); a mobile contact-path probe (`qa/contact-path.mjs`); scroll-stop screenshots (`qa/shoot.mjs`).
- **Raw data:** `docs/audit/orig-crawl.json` (per-page SEO data), `docs/audit/lh/*.json` (Lighthouse), `docs/screens/original-*.jpg`.

> **Measurement caveat.** The live site is reached through the sandbox's egress proxy, which adds latency. Lighthouse's simulated throttling absorbs most of this, but timing figures (LCP) may be slightly worse here than from Dhaka. The network-independent findings carry the weight: blocked indexing, missing H1s and descriptions, broken links, console errors, TBT, CLS and page weight. The owner can confirm the timing on [PageSpeed Insights](https://pagespeed.web.dev/) for their own site.

---

## 1. The business

**Meghna Executive Holdings (MEH)** is a Dhaka-based group, established in 1965, with fifteen companies ("units" on the current site) in four sectors:

| Sector | Units | What they sell | To whom |
|---|---|---|---|
| Trading | Executive Motors (BMW), Executive Machines (Apple), Executive Lifestyles (KOHLER), Penthouse Livings, Penthouse Interior | Cars and service, Apple products, bath and kitchen, luxury furniture, interiors | Affluent Dhaka households and businesses (B2C, high ticket) |
| Apparel | Meghna Knit Composite, Meghna Dresses, Executive Intimates, Executive Hi Fashions, Sublime Greentex, Executive Greentex | Knit, woven and intimate garments made to order | European and global brands such as M&S, H&M and Decathlon (B2B) |
| Industrial | Siam Bangla Industries (white cement), Executive Woodworks (export furniture), Meghna Bearing Industries | White cement, furniture, precision bearings | Construction, export buyers, industry (B2B) |
| Service | Executive Gourmet (Slaw Bistro) | Dining | Dhaka diners |

**What the group website is for.** The group site is not a shop. It makes money indirectly, by doing four jobs:

1. **Route buyers to the right unit**, with the right phone, showroom and form. Examples: a BMW buyer to Executive Motors, a bathroom renovator to a KOHLER showroom, a sourcing manager to the right garment factory. The money action is a **call, showroom visit or enquiry form to a unit**.
2. **Reassure B2B buyers and partners.** Apparel buyers and principals (BMW, Apple, KOHLER) judge a supplier or distributor partly by how it presents itself. The money action is an **enquiry** from a sourcing team, and partner confidence.
3. **Hire.** The money action is a **job application** (Careers).
4. **Be found under its own name.** Anyone searching "Meghna Executive" (a journalist, a bank, a buyer, a candidate) should land here, not on another "Meghna".

**What their customers worry about**

| Audience | Awareness stage | Top objections | Proof that removes it |
|---|---|---|---|
| Car / Apple / KOHLER / furniture buyer | Knows the brand, choosing where to buy | "Is this the official, authorised seller? Warranty and service? Where is the showroom, who do I call?" | Partner authorisation shown plainly; showroom addresses, maps, phone numbers; service mentioned |
| Apparel / industrial buyer | Shortlisting suppliers | "Compliant? Certified? Capacity? Who else do they make for? Will they answer?" | Certifications (LEED Platinum and Gold), capacity figures, buyer list, a direct factory contact |
| Job seeker | Considering employers | "Stable? Good place to work? What roles are open?" | Heritage since 1965, open roles, how to apply |
| Partner, bank, press | Verifying | "Is this group serious and current?" | Clear structure, recent news, leadership (missing on the current site) |

---

## 2. Measured baseline

### 2.1 Lighthouse (mobile unless stated)

| Page | Performance | Accessibility | Best practices | SEO | LCP (sim) | TBT | CLS | Weight |
|---|---|---|---|---|---|---|---|---|
| Home (median of 3) | **57** (57, 57, 62) | 93 | 96 | **69** | **9.5 s** | 250 ms | 0.054 | 1.7–1.8 MB (one earlier run: 4.1 MB when the hero video loaded) |
| Home, desktop | 76 | 93 | 96 | 69 | 3.3 s | 50 ms | 0.004 | 1.5 MB |
| Units index | 53 | 90 | 96 | 69 | 6.4 s | 330 ms | 0 | 2.0 MB |
| Executive Motors | 62 | **80** | 96 | **46** | 5.4 s | 180 ms | 0.011 | 2.1 MB |
| About | 72 | 89 | 96 | 69 | 4.1 s | 150 ms | **0.125** | 1.7 MB |
| Contact | 91 | 91 | 96 | 61 | 1.8 s | 130 ms | **0.11** | 0.9 MB |
| Sublime Greentex | 85 | 86 | 96 | **54** | 2.8 s | 190 ms | 0.006 | 1.4 MB |
| Media Center | 92 | 90 | 96 | 69 | 2.2 s | 40 ms | 0.067 | 1.0 MB |

**Why SEO is 46–69 everywhere:** Lighthouse reports **"Page is blocked from indexing"** on every page (see 2.3). Executive Motors and Contact also fail on missing meta descriptions and link text.

**Failing audits on Home:** `is-crawlable` (SEO), `heading-order` and `link-name` (accessibility), `errors-in-console` (best practices). The heaviest items are the HTML document itself (231 KB, carrying the whole CMS payload), a hero video (164 KB+), and the **logo SVG at 136 KB**.

### 2.2 Screenshots

- `docs/screens/original-mobile-360.jpg`: home at 360px, scroll stops left to right.
- `docs/screens/original-desktop.jpg`: home at 1440px.

What they show:
- **Mobile, first screen.** A black slide with "Executive Motors Ltd." and the BMW roundel, the logo and "Menu". **No phone number, no button, no contact action.** On our run the hero image had not painted after 4 seconds (the slide is black).
- **"Innovation at Meghna Executive Holdings".** On a 360px phone the three-column carousel ("Diverse Portfolio", "Exclusive Partnerships", "Strategic Trading Brands") is **cut off at both edges**: words lose their first letters ("iversified", "ndustries"). Desktop shows the same clipping.
- **Footer.** Hotline 16765, email, address (Le Meridien, Nikunja-2), four social icons, sitemap links, "Site by Dcastalia". The footer is clean and complete.
- **Desktop.** A brand-led hero slider ("Executive Motors Ltd. / BMW", then "Penthouse…"), "Curating Iconic Brands that Redefine Quality & Luxury", partner marks (BMW, Penthouse, KOHLER, Apple Authorised Reseller), "Exclusive Insights" articles. It looks competent and premium.
- **Console.** Browser errors on load: two 404s, one 500, and "An error occurred in the Server Components render".

### 2.3 SEO

Crawled: all 33 URLs in `sitemap.xml`, plus two linked unit pages missing from it (`/units/executive-gourmet-limited`, `/units/meghna-bearing-industries-limited`). All return 200.

| Check | Result | Severity |
|---|---|---|
| `robots.txt` | **`User-agent: * / Disallow: /`**: every search engine is told not to crawl any page | **Critical** |
| Indexing | A search for the exact name "Meghna Executive Holdings" returns other "Meghna" companies (Meghna Group, Meghna Group of Industries, Meghna Bank) and **no page from meghna-executive.com**. This is consistent with the robots block. Confirm in Google Search Console (owner access needed). | Critical |
| Sitemap | Present, 33 URLs, but **2 live unit pages missing**, all `lastmod` dates identical (26 Jan 2025) | Medium |
| Titles | Unique on all 33 pages. Unit titles follow "Name \| Units \| Meghna Executive Holdings". Home is just "Meghna Executive Holdings". | Good |
| Meta descriptions | **24 of 33 pages have none.** 7 share the same generic sentence ("…stands as a beacon of excellence and innovation…"). | High |
| H1 | **Missing on Home, About, Sustainability, CSR and Contact** (5 of the most important pages). | High |
| Heading order | Skips levels (Lighthouse `heading-order`). Home is a flat list of H2s, with the unit names as H2s inside the slider. | Medium |
| Structured data | **Only one page has any** (`LocalBusiness` on Executive Woodworks). No `Organization` on the home page, no `AutoDealer` / `Store` for showrooms, no `Article` on news, no `BreadcrumbList`. | High |
| Image alt text | 948 images: none missing the attribute, but **554 (58%) have empty alt**, including content photographs. | Medium |
| Social share image | **`og:image` is the SVG logo on 24 of 33 pages.** Facebook, LinkedIn and WhatsApp do not render SVG, so shared links show no picture. | Medium |
| Canonical tags | Present and self-referencing. | Good |
| `lang` | `en` on every page. | Good |
| Server HTML | Content is server-rendered (about 3–4.6k characters of text in the raw HTML), but the 5 pages above have no H1 even after rendering. | OK |
| Broken links | **`tel:undefined` and `mailto:undefined`** on 30 of 33 pages (an empty CMS field rendered as a link). | Medium |
| Data conflict | Executive Motors **shows "16765" but dials 01886000555**. | Medium (logged in `CLIENT_QUESTIONS.md`) |
| Google Business Profile | Not visible from the site (no map embed, no review links). **To check with owner:** profiles for the group office and each showroom. | Unknown |

### 2.4 Conversion path (360px phone)

Measured with `qa/contact-path.mjs`:

| Path | Taps | Notes |
|---|---|---|
| Home → call the group | **3 taps + a scroll** | Menu → scroll the menu → Contact → tap 16765. The first viewport has **zero** contact actions, and the open menu shows no phone number (Contact sits below the menu's fold). |
| Home → call via footer | 1 tap after **~10 screens of scrolling** | The footer has 16765 and email. |
| Home → BMW enquiry | **4 taps + scrolls** | Menu → Trading Brands → Executive Motors → scroll to the contact block → tap (which dials a different number from the one shown). |
| Home → KOHLER showroom | 4 taps + scrolls | Executive Lifestyles lists 3 showrooms with phones and emails, which is good once you get there. |
| Desktop | Hotline 16765 in the header, always visible. | Good |
| Forms | An enquiry form on every unit page and on Contact. | Good |
| WhatsApp | None anywhere. | — |

**Scroll depth to the first contact action** (`qa/first-contact.mjs`, 360×780 screens):

| Page | First phone link | First enquiry form | Page length | Sticky call button |
|---|---|---|---|---|
| Home | 8.7 screens down | none | 9.5 screens | no |
| Executive Motors | 10.3 | 10.5 | 12.2 | no |
| Executive Lifestyles | 8.2 | 8.9 | 10.6 | no |
| Meghna Knit Composite | 12.7 | 13.0 | 14.6 | no |

---

## 3. What the original does well (keep or improve, never lose)

1. **Brand-led first impression.** The hero slider opens on the trading brands (Executive Motors / BMW, then Penthouse…), and partner marks (BMW, KOHLER, Apple Authorised Reseller, Penthouse) appear early on the home page. People recognise the partners before they know the group.
2. **Premium, licensed typography.** Banana Grotesk with PP Migra Italic accents. It already feels expensive.
3. **A contact block and enquiry form on every unit page**, with unit-specific phones, emails and showroom addresses (Executive Lifestyles lists three showrooms).
4. **Hotline 16765 in the desktop header** and in every footer.
5. **Thirteen articles** in the Media Center: launches (BMW i7, Retail.Next, iPhone 16), furniture and bathroom guides, and five sustainability pieces.
6. **A complete footer**: address, email, hotline, four social profiles (Facebook, Instagram, LinkedIn, YouTube), and links to every section.
7. **Unique, descriptive page titles** and correct canonical tags.
8. **CMS-driven.** The owner's team edits content in an admin panel (`cms.meghna-executive.com`).
9. **No document-level horizontal scroll at 360px.** The page never zooms out, even though the carousel clips inside it.
10. **Real photography** of real showrooms and factories, and real films.

---

## 4. Why the owner would refuse to switch

| # | Refusal | Honest weight | What the redesign must show |
|---|---|---|---|
| R1 | **"It costs money and the site works fine."** | High. The site is presentable. | Measured, specific losses on the current site (blocked from Google, 9.5 s mobile LCP, no mobile contact path, broken links) and gains that are visible without a sales pitch. |
| R2 | **"I'll lose my Google rankings."** | High, the classic fear. | Every one of the 35 live URLs answered by a permanent (301) redirect to its new page, tested. Point out, gently, that the current `robots.txt` already blocks Google. |
| R3 | **"My developer (Dcastalia) can fix those things."** | High. `robots.txt` and the meta descriptions *are* quick fixes. | The redesign's case must not rest on quick fixes alone. It must also win on what a patch cannot: mobile speed by architecture, a mobile contact path, structure for each audience, and presentation. |
| R4 | **"My team can't update it."** The current site has a CMS. | High. | A clear path: the redesign reads all content through one data layer (`src/lib/cms.ts`) ready to connect to the existing CMS, so the team keeps its admin panel. Needs API access from the owner or Dcastalia. |
| R5 | **"It's a hassle and a risk: downtime, bugs, re-approvals."** | Medium–high. | A local preview to inspect first; a staged launch plan; QA evidence (accessibility, no-JS, every page fits a phone); partner imagery used exactly as supplied. |
| R6 | **"I don't see the difference. Same photos, same fonts."** | Medium. The redesign deliberately reuses their assets. | Side-by-side screenshots and a scorecard where the differences are obvious at a glance on a phone. |
| R7 | **"My partners (BMW, Apple, KOHLER) must approve it."** | Medium. | Partner imagery never recoloured or cropped; partner marks used as supplied; a checklist for partner approval. |
| R8 | **"Our customers don't buy on the group site anyway."** | Medium, and partly true. | The site's job is routing and reassurance (section 1). The redesign must make routing faster (taps to the right unit's phone) and reassurance stronger. |
| R9 | **"The new one leaves things out."** | Must be zero. | Everything in section 3 is present or improved, verified item by item. |
