# Ali Azam — Premium Redesign Task

> Static marketing site rebuild of [aliazam.ca](https://aliazam.ca/).
> Re-positions Ali Azam as a **premium real estate advisor** — same business, enterprise visual language.
> Light mode only. **2 fonts only.** All copy and images come from aliazam.ca and live in `content.tsx`.
> Apple / Stripe / Notion aesthetic.

---

## 1. Project Brief

### Current state
- Generic agent template. No hierarchy. Cluttered. Stock-photo aesthetic. Poor mobile UX. Weak CTAs.
- Real, usable content on the source site: agent bio (since 2010), 6 featured listings with photos & specs, services copy (residential/commercial/investment), simple-steps process, mission statement, brokerage info, contact details, agent portrait.

### Target outcome
- **Trust:** institutional visuals signal "I move serious money."
- **Conversion:** one obvious next step on every screen — book a consult.
- **Speed:** above-the-fold tells the full story in 5 seconds.
- **Mobile-first:** designed for thumb-zone, scaled up to desktop.

### Source-of-truth rule
**Every word and every image on the new site must come from aliazam.ca.** No invented numbers, no fabricated testimonials, no placeholder case studies, no stock imagery. If a piece of content does not exist on the source site, that section does not ship.

---

## 2. Tech Stack

| Layer | Choice | Notes |
|---|---|---|
| Framework | **Next.js 15** (App Router, TS, RSC) | Static export-ready (`output: 'export'`). |
| Styling | **Tailwind CSS v4** | CSS-vars-based theme. |
| Animation (declarative) | **Framer Motion** | Hero floating stats, scroll reveals, hover micro-interactions. |
| Animation (timeline) | **GSAP + ScrollTrigger** | Hero dashboard scrub, pinned section transitions. |
| Smooth scroll | **Lenis** (`@studio-freight/lenis`) | Wired into GSAP ticker. |
| Icons | **Lucide React** | Single stroke weight. |
| Fonts | **2 fonts only** (see Section 3) | Self-hosted via `next/font`, zero-FOUT. |
| Lint/format | ESLint + Prettier + `prettier-plugin-tailwindcss` | |
| Package manager | **npm** | pnpm not installed on the build host; switched at scaffold. Lockfile committed. |

### Why no dark mode
Brief is explicit: light mode only. Don't ship `prefers-color-scheme` overrides. Don't use `dark:` variants. Single token set.

---

## 3. Design System

### Fonts — exactly 2
1. **Display / Headings** — *Instrument Serif* (Google Fonts). Used for h1, h2 only.
2. **UI / Body** — *Hanken Grotesk* (Google Fonts). Used for everything else: nav, body, buttons, captions, h3–h6.

Inter was rejected as too generic for a "premium consulting" aesthetic; Hanken Grotesk has the same neutral readability with more character.

No third font. No icon font. No script/handwritten accent. Two families, full stop.

### Color tokens (CSS vars in `app/globals.css`)
```
--bg              #FAFAF7   /* warm off-white */
--bg-elevated     #FFFFFF
--bg-muted        #F2F1EC   /* section breaks */
--ink             #0A0A0A   /* primary text */
--ink-2           #3A3A3A   /* body */
--ink-3           #6B6B6B   /* meta */
--line            #E6E5DF   /* borders */
--accent          #1A4D3A   /* deep forest green */
--accent-soft     #E8F0EC
--gold            #B8945A   /* numerals only, sparingly */
```
Avoid: pure black, pure white, neon, multi-stop gradients.

### Type scale
- Display (hero h1): Instrument Serif, clamp(44px, 7vw, 96px), tracking -0.03em, leading 0.95.
- H2: Instrument Serif, clamp(32px, 4vw, 56px).
- H3+: Inter 600, 24–28px.
- Body: Inter 400, 17px desktop / 16px mobile, leading 1.6.
- Eyebrow: Inter 500, 12px, uppercase, tracking 0.12em, ink-3.

### Spacing & layout
- 8pt grid. Section vertical rhythm: 120px desktop / 72px mobile.
- Container: max-w-[1240px], 24px gutter mobile / 48px desktop.
- Radius: 12px standard, 20px cards, 999px pills.

### Motion principles
- Default ease: `cubic-bezier(0.22, 1, 0.36, 1)`. 600–800ms hero, 300–400ms micro.
- Reveal-on-scroll: 16px Y + opacity, stagger 60ms.
- Honor `prefers-reduced-motion` — kill all GSAP timelines and Framer animations.

---

## 4. Information Architecture

Single-page scroll with anchor nav. Sections in order — **only sections backed by real source content from aliazam.ca**:

1. **Nav** — sticky, blurs after 40px scroll. Logo left, anchors center, "Contact" CTA right.
2. **Hero** — bold headline, sub, primary + secondary CTA, animated dashboard mockup, floating stat pills, ambient gradient mesh background. Headline derived from current site copy ("Let's find your dream home" → premium reframe in `content.tsx`).
3. **Trust strip** — brokerage block (Right At Home Realty + address + phone) presented as a quiet horizontal row.
4. **Services** — 3 cards: Residential, Commercial, Investment. Copy from source site's detailed services section.
5. **How it works** — 3-step process from source site ("View Real Estate" → "Request a Visit" → "Take the Keys"), reframed visually with GSAP pinned scroll.
6. **Featured listings** — 6 properties from source, asymmetric bento grid, hover reveals price + specs. Real images downloaded from source.
7. **About Ali** — portrait + bio + mission statement. All text from source.
8. **Final CTA** — full-bleed, single sentence ("Helping you find the best property" + sub from source), single button.
9. **Footer** — brokerage compliance block, contact, social links, copyright. All from source.

**Removed from current site:** repeated "Real Estate Updates" stub, the loose property-type word list ("Apartment, Building, Condominium…"), the redundant restated services copy.

**Not added:** case studies, testimonials, FAQ, stat counters with $-volume figures — none exist on source. If Ali later provides real ones, slot them in via `content.tsx` without code changes to surrounding sections.

---

## 5. Content Architecture (`content.tsx`)

Single source of truth. Typed exports. Schema below — every value gets populated **at project-creation time by fetching aliazam.ca**.

```tsx
// content.tsx (root)
export const site = {
  name: "Ali Azam",
  role: "Realtor & Mortgage Agent",            // from source
  brokerage: "Right At Home Realty Inc., Brokerage", // from source footer
  phone: "+1 647-637-7820",                    // from source nav
  officePhone: "(416) 391-3232",               // from source footer
  fax: "(416) 391-0319",                       // from source footer
  email: "azamhira79@gmail.com",               // from source footer
  address: "1396 Don Mills Road, Unit #B121, Toronto, ON M3B 0A7", // from source
  social: { facebook: "", instagram: "", linkedin: "", twitter: "" }, // hrefs from source footer
};

export const nav = [
  { label: "About", href: "#about" },
  { label: "Listings", href: "#listings" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
  { label: "Mortgage Calculator", href: "#" },  // link target on source
];

export const hero = {
  // Headline reworked from source's "Let's find your dream home" into a premium
  // version while staying truthful — written during build, kept in this file.
  eyebrow: "GTA · Since 2010",                 // "since 2010" is from source bio
  headline: "Let's find your dream home.",     // start from source; refine in build
  sub: "",                                     // distilled from source About section
  primaryCta: { label: "Contact us", href: "#contact" }, // source uses "Contact Us"
  secondaryCta: { label: "View listings", href: "#listings" }, // source: "View All Listings"
  // Floating stat pills — only derive from facts present on source.
  // Allowed: years since 2010, # of services (3), # of featured listings (6).
  // Disallowed: $-volume, transactions closed, retention % — not on source.
  floatingStats: [
    { label: "Years in GTA", value: "Since 2010" },
    { label: "Service lines", value: "3" },
    { label: "Featured listings", value: "6" },
  ],
};

export const services = [
  // Source has 3 categories + a "detailed services" block of paragraphs.
  // Map each source paragraph into a card body.
  {
    id: "residential",
    title: "Residential Services",
    summary: "",   // from source: "Home Buying Process" + "Finding The Right Home"
  },
  {
    id: "commercial",
    title: "Commercial Services",
    summary: "",   // from source: "Selling Your Home" recontextualized
  },
  {
    id: "investment",
    title: "Investment Services",
    summary: "",   // from source: "Investment Opportunities" paragraph
  },
];

export const process = [
  // Verbatim from source "Simple steps" section.
  { step: "01", title: "View Real Estate", body: "" },   // from source
  { step: "02", title: "Request a Visit", body: "" },    // from source
  { step: "03", title: "Take the Keys",   body: "" },    // from source
];

export const listings = [
  // All 6 from source. Images downloaded into /public/listings/*.
  { slug: "23-christine-cres",   address: "23 Christine Cres",        city: "Toronto, ON",      sqft: 3000, beds: 4,    baths: 4, price: 2188000, image: "/listings/01.jpg" },
  { slug: "10-tobermory-dr-204", address: "204 - 10 Tobermory Dr",    city: "Toronto, ON",      sqft: 899,  beds: 2,    baths: 1, price: 449000,  image: "/listings/02.jpg" },
  { slug: "364-east-mall-112",   address: "112 - 364 The East Mall",  city: "Toronto, ON",      sqft: 1399, beds: "3+1",baths: 3, price: 699000,  image: "/listings/03.jpg" },
  { slug: "58-summer-lane",      address: "58 Summer Lane",            city: "Peterborough, ON", sqft: 2000, beds: 3,    baths: 4, price: 679900,  image: "/listings/04.jpg" },
  { slug: "10-capreol-crt-712",  address: "712 - 10 Capreol Crt",     city: "Toronto, ON",      sqft: 1399, beds: 3,    baths: 2, price: 1189888, image: "/listings/05.jpg" },
  { slug: "611-galahad-dr-27",   address: "27 - 611 Galahad Dr",      city: "Oshawa, ON",       sqft: 1199, beds: 3,    baths: 2, price: 599999,  image: "/listings/06.jpg" },
];

export const about = {
  name: "Ali Azam",
  // Bio + mission both from source About section, joined or split as the design needs.
  bio: "",        // from source: "Ali Azam is one of the best experienced..."
  mission: "",    // from source: "Our mission is to be the most trusted..."
  values: "",     // from source: "We are committed to delivering results..."
  portrait: "/ali-portrait.jpg",  // downloaded from source About section
};

export const finalCta = {
  headline: "Helping you find the best property",  // from source
  sub: "Ready to find your dream property? Contact us today and let us help you make it a reality.", // from source
  cta: { label: "Contact Us", href: "#contact" },   // from source
};

export const footer = {
  tagline: "For All Your Real Estate Needs",       // from source
  copyright: "© Ali Azam | 2024",                  // from source — update year on build
  legal: "",                                       // from source if present, else omit
};
```

> Empty strings above (`""`) are populated **during project creation** by extracting the matching paragraph from aliazam.ca. No paraphrasing beyond minor punctuation cleanup. No invented sentences.

---

## 6. Hero Spec (the section that has to land)

The brief calls out the hero specifically. Build first, in isolation.

### Layout (desktop)
- Two-column: 55% copy left, 45% dashboard right. Stacks on mobile.
- Vertical centered. Min-height 92vh. Nav overlaid.

### Background
- Static SVG noise layer (4% opacity).
- Animated radial gradient mesh — two soft `--accent-soft` blobs drifting via Framer's `motion.div` with `animate` looping `x/y` 20px range. `will-change: transform`. No filter blur on mobile.

### Copy column
- Eyebrow pill (small, 6px green dot pulsing).
- Display headline (two lines, `text-balance`).
- Sub paragraph (max 64ch).
- Two CTAs side-by-side: primary filled `--accent`, secondary ghost with arrow that slides on hover.
- Word-by-word fade-in on mount: stagger 40ms, opacity 0→1, y 12→0.

### Dashboard column ("animated business dashboard")
Stylized real-estate metrics panel — NOT a literal SaaS dashboard:
- Outer card: white, 20px radius, subtle ring, soft shadow.
- Tab row: "Market" / "Listings" / "Mortgage". Tab indicator slides on a 4s loop.
- Sparkline area chart — GSAP path-draws over 1.6s on load, then a 6s "live" loop where the last point shifts.
- 3 KPI tiles below with up/down arrows.
- Secondary mini bar chart, bars rise on load via stagger.

Floating stat pills ("floating statistics"):
- 3 small white pills positioned absolutely *outside* the dashboard card.
- Each floats independently via Framer `motion.div animate={{ y: [0, -8, 0] }}` at 4–6s loops, offset phases.
- Subtle parallax on mouse move via `useMotionValue`.
- Values come from `hero.floatingStats` in `content.tsx` — only facts present on source.

### Performance rules
- Hero imagery is SVG/canvas only — no raster.
- GSAP timeline runs once on mount, then a cheap loop. Pause when out of viewport.
- Total hero JS: < 35kb gzipped.

---

## 7. File / Folder Structure

```
/aliazam
├── app/
│   ├── layout.tsx          # fonts, Lenis provider, base meta
│   ├── page.tsx            # composes all sections
│   ├── globals.css         # tokens, base, utilities
│   └── opengraph-image.tsx
├── components/
│   ├── nav/                # Nav, MobileNav
│   ├── hero/
│   │   ├── Hero.tsx
│   │   ├── HeroDashboard.tsx
│   │   ├── FloatingStats.tsx
│   │   └── BackgroundMesh.tsx
│   ├── sections/
│   │   ├── TrustStrip.tsx
│   │   ├── Services.tsx
│   │   ├── Process.tsx     # GSAP pinned
│   │   ├── Listings.tsx
│   │   ├── About.tsx
│   │   └── FinalCta.tsx
│   ├── ui/                 # Button, Pill, Card, ScrollReveal
│   └── footer/Footer.tsx
├── lib/
│   ├── lenis-provider.tsx
│   ├── motion.ts
│   └── format.ts           # currency, sqft formatters
├── content.tsx             # ← single content source
├── public/
│   ├── listings/           # 01.jpg–06.jpg downloaded from source
│   ├── ali-portrait.jpg    # downloaded from source
│   └── logos/              # brokerage if available on source
├── next.config.ts
├── postcss.config.js
├── tsconfig.json
├── package.json
└── README.md
```

---

## 8. Phased Task List

### Phase 0 — Setup (½ day)
- [ ] Manual scaffold (no `create-next-app`) into existing repo root preserving `task.md`, `design/`, `README.md`.
- [ ] Deps: `next@15 react@19 react-dom@19 framer-motion gsap lenis lucide-react clsx tailwind-merge`
- [ ] DevDeps: `typescript @types/node @types/react @types/react-dom tailwindcss@4 @tailwindcss/postcss eslint eslint-config-next prettier prettier-plugin-tailwindcss`
- [ ] Configure `next/font` for the **2** chosen families (Instrument Serif + Hanken Grotesk). No third font added later.
- [ ] CSS tokens in `globals.css` per Section 3.
- [ ] Wire Lenis provider, sync GSAP ticker to Lenis raf.
- [ ] Add `prefers-reduced-motion` hook in `lib/motion.ts`.
- [ ] `next.config.ts`: `output: 'export'`, `images.unoptimized: true`.

### Phase 1 — Content extraction from aliazam.ca
> This phase happens **at project-creation time, not now.** Don't pre-fetch content during planning.

- [ ] Fetch aliazam.ca HTML.
- [ ] Extract every text block into the matching `content.tsx` field per Section 5 schema.
- [ ] Download every image asset (agent portrait, 6 listing photos, any brokerage/social logos) into `/public`.
- [ ] Verify image filenames match the paths declared in `content.tsx`.
- [ ] Add `lib/format.ts` for `formatPrice`, `formatSqft`.
- [ ] README note: "All copy and image edits → `content.tsx` + `/public`."
- [ ] Sanity check: zero strings in `content.tsx` are invented; every value traces back to a source-site quote.

### Phase 2 — Build sections (3–4 days)
Build in this order; each independently committable:
- [ ] **Nav** — sticky w/ scroll-elevation, mobile drawer, "Contact" CTA.
- [ ] **Hero** (full Section 6 spec).
- [ ] **TrustStrip** — brokerage block as quiet horizontal row.
- [ ] **Services** — 3 cards, asymmetric heights, hover state.
- [ ] **Process** — GSAP pinned scrollytelling: 3 steps fade through one viewport.
- [ ] **Listings** — bento grid, image hover-zoom, price reveal.
- [ ] **About** — portrait + bio + mission.
- [ ] **FinalCta** — full-bleed, single button.
- [ ] **Footer** — 3-col, broker compliance block, social, copyright.

### Phase 3 — Polish (1 day)
- [ ] Replace every `<img>` with optimized version (or static `<img>` if static export forces it).
- [ ] Audit motion: every animation respects `prefers-reduced-motion`.
- [ ] Audit color contrast: all text ≥ AA (4.5:1).
- [ ] Audit headings: one `<h1>`, logical h2/h3 nesting.
- [ ] Tab through page — focus rings visible, mobile drawer escapable.
- [ ] Lighthouse: 95+ Perf, 100 A11y, 100 Best Practices, 100 SEO.
- [ ] Test on iPhone SE (375px), iPhone 15, iPad, 1280px laptop, 1920px desktop.
- [ ] `metadata` in `layout.tsx`: title, description, OG image, twitter card.
- [ ] `robots.txt`, `sitemap.ts`, JSON-LD `RealEstateAgent` schema.

### Phase 4 — Deferred wiring (post-launch ok)
- [ ] Real booking link (Cal.com / Calendly) when provided.
- [ ] Contact form → Resend or Formspree.
- [ ] `/listings/[slug]` detail pages.
- [ ] Mortgage calculator page.
- [ ] Analytics: Plausible or GA4.

---

## 9. Acceptance Criteria

Before calling this done:

- **Fonts:** exactly 2 families used site-wide. Verifiable via `grep -r "font-family"` showing only the two CSS vars.
- **Source fidelity:** every visible string and image traces back to aliazam.ca. No fabricated stats, testimonials, case studies, or imagery.
- **Visual:** zero stock-photo vibe. No gradient buttons. No drop-shadowed icons in colored circles.
- **Copy editing flow:** changing one paragraph requires touching exactly one file (`content.tsx`).
- **Motion:** smooth at 60fps on a mid-tier Android. No layout shift.
- **Performance:** LCP < 1.8s on 4G simulated, CLS < 0.05, INP < 200ms.
- **Mobile:** every CTA in thumb zone. No horizontal scroll. Hamburger doesn't trap focus.
- **Trust:** brokerage compliance line visible in footer. Realtor® symbol used correctly.
- **Conversion:** "Contact" CTA visible at all times in nav + at minimum 3 in-page placements.

---

## 10. Out of Scope (this phase)

- CMS / admin
- Backend / DB
- IDX MLS live feed
- Multilingual (EN only)
- Blog
- Dark mode (explicitly excluded)
- Detail pages for listings
- Mortgage calculator interactivity (link only)
- Testimonials, case studies, FAQ — **none exist on source**, so none ship
