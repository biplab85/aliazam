# Ali Azam — Premium Real-Estate Site

Premium static marketing site for **Ali Azam**, Realtor® and Licensed Mortgage Agent (FSRA) at Right At Home Realty Inc., Brokerage. Serving the Greater Toronto Area, Peterborough, and Oshawa since 2010.

A complete redesign of [aliazam.ca](https://aliazam.ca/) — light-mode only, two fonts, all copy and imagery sourced from the original site.

---

## Stack

| Layer | Choice |
|---|---|
| Framework | **Next.js 15** (App Router · TypeScript · React 19 · static export) |
| Styling | **Tailwind CSS v4** (CSS-first config via `@theme` in `app/globals.css`) |
| Animation (declarative) | **Framer Motion** — reveals, hover micro-interactions, scroll-driven motion values |
| Animation (timeline) | **GSAP + ScrollTrigger** — sparkline draw + sync utilities |
| Smooth scroll | **Lenis** wired into the GSAP ticker |
| Icons | **Lucide React** |
| Fonts (only 2) | **Instrument Serif** (display) + **Hanken Grotesk** (body) — both via `next/font/google` |
| Lint / format | ESLint + Prettier + `prettier-plugin-tailwindcss` |
| Package manager | npm |

## Design system

- **Colours** (CSS vars in `globals.css`): warm off-white `#FAFAF7`, ink `#0A0A0A`, deep forest-green accent `#1A4D3A`, brass gold `#B8945A`. Soft tints for accent / gold for mesh blooms.
- **Type scale**: clamp()-driven display (Instrument Serif up to ~156px), 17px body (Hanken Grotesk), 12px small-caps eyebrows tracked at 0.16em.
- **Motion easing**: `cubic-bezier(0.22, 1, 0.36, 1)` (out-expo) site-wide. Spring-smoothed scroll progress with `useSpring` for premium parallax.
- **Light mode only.** No `dark:` variants anywhere.

## Sections

The home page (`app/page.tsx`) composes nine sections, each with its own personality:

1. **Nav** — sticky with scroll-blur transition, logo image, icon-bearing menu items, mobile drawer
2. **Hero** — *editorial cover* layout: massive serif headline with gradient italic accent on **dream**, hand-drawn SVG underline, animated multi-stop gradient mesh + travelling hairlines, auto-rotating featured listing card with circular SVG progress + counter
3. **Trust strip** — three premium cards: brokerage credentials, visit address, direct line — each with custom inline SVG illustrations (house, skyline, phone)
4. **Services** — animated gradient mesh, vertical *Services* stroke title (left, parallax) + counter-parallax stroke townhouse illustration (right), three cards with per-card scroll parallax
5. **Process** — warm dawn gradient, vertical *Steps* stroke title (right), three numbered steps with scroll-driven curved SVG progress connector (S-wave path animated via `pathLength`)
6. **Listings** — six featured listings in an asymmetric bento grid, each with hover-zoom and overlay reveal
7. **About Ali Azam** — sticky multi-layer **gallery-frame portrait** (5-layer: conic ring → gold trim → cream matte → accent hairline → image) with permanent gold corner ornaments, floating *Established 2010* + *GTA* badges, magazine-style pull quote, "At a glance" info card, hand-drawn signature flourish
8. **Final CTA** — *invitation-card* layout: pulsing-dot status pill, italic-accent headline, oversized clickable phone number as the centrepiece, dual CTAs, monogram signature row, RECO/FSRA compliance, vertical *Contact* stroke title + parallax stroke key illustration
9. **Footer** — premium brand band (status pill, giant tagline with gradient italic, primary CTA), four-column grid (brand block with achievement badge, Navigate, Services, Contact with icon-leading items), decorative organic SVG curves + corner blooms

## Content workflow

All visible copy lives in [`content.tsx`](./content.tsx). All imagery lives in [`/public`](./public).

- **Copy edits** → change strings in `content.tsx`.
- **Image edits** → replace files in `/public`, paths declared in `content.tsx`.

Every visible string traces back to aliazam.ca — no fabricated stats, testimonials, or case studies. Each field in `content.tsx` is annotated with a `// src:` comment indicating its origin. There is no admin panel and no CMS — content edits are code commits.

## Develop

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # generates /out (static export)
npm run lint
npm run format
```

## Repo layout

```
app/
  layout.tsx          # fonts + Lenis provider + base meta
  page.tsx            # composes nine section components
  globals.css         # design tokens + base + utilities + keyframes

components/
  nav/Nav.tsx                   # sticky + mobile drawer + icon menu items
  hero/
    Hero.tsx                    # editorial-cover hero
    BackgroundMesh.tsx          # marble wash + blooms + travelling hairlines
    FeaturedListing.tsx         # auto-rotating card with circular progress
  sections/
    TrustStrip.tsx              # three premium pillars + custom SVG icons
    Services.tsx                # vertical title + parallax cards + stroke building
    Process.tsx                 # curved SVG progress + per-step parallax
    Listings.tsx                # asymmetric bento grid
    About.tsx                   # gallery-frame portrait + at-a-glance card
    FinalCta.tsx                # invitation card + parallax key illustration
  footer/Footer.tsx             # premium 4-column footer

lib/
  cn.ts               # clsx + tailwind-merge
  format.ts           # CAD currency + sqft formatters
  motion.ts           # shared Framer variants + reduced-motion hook
  lenis-provider.tsx  # Lenis wired into the GSAP ticker

content.tsx           # ← single source of all copy and asset paths
public/               # downloaded images from aliazam.ca
design/               # standalone HTML design preview
task.md               # full project spec
```

## Brand compliance

Footer contains the required RECO sales-rep / brokerage compliance line. All FSRA mortgage-agent references are explicit. Realtor® mark used correctly throughout.

## License

Proprietary — all rights reserved by Ali Azam.
