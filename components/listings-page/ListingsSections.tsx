"use client";

import { useEffect, useRef, useState } from "react";
import {
  animate,
  motion,
  useInView,
  useScroll,
  useTransform,
  useSpring,
  type MotionValue,
} from "framer-motion";
import {
  ArrowUpRight,
  Bath,
  Bed,
  MapPin,
  Maximize2,
  Sparkles,
} from "lucide-react";
import { listings, listingsPage, site, type Listing } from "@/content";
import { formatPrice, formatSqft } from "@/lib/format";
import { reveal, revealContainer } from "@/lib/motion";

/**
 * /listings page — verbatim recreation of aliazam.ca/listings/.
 *
 * Visual language is deliberately different from /about:
 *   • About hero used a monogram crest + dot-grid backdrop + Roman year.
 *   • Listings hero uses a scrolling address marquee, an architectural
 *     blueprint backdrop, a stacked cards collage on the right, and a
 *     market-statistics row that count-up animates on scroll.
 *
 * All nine listings carry their full uppercase address + postal exactly
 * as they appear on the source page; there is no fabricated copy.
 */

const PRICE_BAND = (() => {
  const min = Math.min(...listings.map((l) => l.price));
  const max = Math.max(...listings.map((l) => l.price));
  return { min, max };
})();

const CITY_COUNT = new Set(
  listings.map((l) => l.city.split(",")[0].trim()),
).size;

const TOTAL_SQFT = listings.reduce((s, l) => s + l.sqft, 0);

/* ============================================================== */
/*  HERO                                                          */
/* ============================================================== */

export function ListingsPageHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const smooth = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.4,
    restDelta: 0.0008,
  });

  // Stacked-cards collage drifts up.
  const collageY = useTransform(smooth, [0, 1], [40, -60]);
  // Top marquee drifts ever-so-slightly.
  const marqueeOpacity = useTransform(smooth, [0, 0.4], [1, 0.55]);

  // Top-3 listings selected for the hero collage — most expensive first
  // so the "feature" tag attaches to it in render order.
  const featuredTrio = [...listings]
    .sort((a, b) => b.price - a.price)
    .slice(0, 3);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden pb-16 pt-28 md:pb-20 md:pt-32"
    >
      <ListingsHeroBackground />
      <BlueprintGrid />

      {/* Top scrolling address marquee — verbatim from source */}
      <motion.div
        aria-hidden
        style={{ opacity: marqueeOpacity }}
        className="relative z-[2] border-y border-line bg-bg-elev/85 backdrop-blur-sm"
      >
        <AddressMarquee />
      </motion.div>

      <div className="container-x relative z-10 pt-12 md:pt-16">
        <motion.div
          variants={revealContainer}
          initial="hidden"
          animate="show"
          className="grid items-center gap-14 md:grid-cols-[1.2fr_0.8fr] md:gap-16 lg:mx-[40px]"
        >
          {/* ============== LEFT — editorial type ============== */}
          <div className="grid gap-7">
            {/* Index marker — like a magazine issue stamp */}
            <motion.div
              variants={reveal}
              className="flex items-center gap-3.5"
            >
              <span
                aria-hidden
                className="grid size-7 place-items-center rounded-full border border-[color:var(--color-gold)]/60 font-serif text-[10.5px] italic leading-none text-[color:var(--color-gold)]"
              >
                №
              </span>
              <span className="font-serif text-[12px] italic tracking-[-0.005em] text-ink-3">
                {listingsPage.hero.portfolioLabel} · Spring{" "}
                {new Date().getFullYear()}
              </span>
              <span aria-hidden className="h-px w-8 bg-line" />
              <span className="text-[10.5px] font-medium uppercase tracking-[0.2em] text-ink-2">
                {String(listings.length).padStart(2, "0")}{" "}
                {listingsPage.hero.stats.activeLabel}
              </span>
            </motion.div>

            {/* Massive editorial display — copy lives in content.tsx so the
                lead/emphasis split can be edited without touching JSX. */}
            <motion.h1
              variants={reveal}
              className="font-serif font-normal text-ink"
              style={{
                fontSize: "clamp(60px, 9.5vw, 156px)",
                lineHeight: 0.94,
                letterSpacing: "-0.035em",
              }}
            >
              <span className="block">
                {listingsPage.hero.headline.lead}
                <span
                  className="font-serif italic text-[color:var(--color-gold)]"
                  style={{ fontStyle: "italic" }}
                >
                  .
                </span>
              </span>
              <span
                className="block font-serif italic tracking-[-0.025em] text-accent"
                style={{
                  fontSize: "clamp(28px, 3.6vw, 56px)",
                  marginTop: "0.2em",
                }}
              >
                {listingsPage.hero.headline.emphasis}
              </span>
            </motion.h1>

            {/* Italic strapline — count prefix injected, body from content.tsx */}
            <motion.p
              variants={reveal}
              className="max-w-[58ch] font-serif italic leading-[1.45] tracking-[-0.005em] text-ink-2"
              style={{ fontSize: "clamp(18px, 1.5vw, 22px)" }}
            >
              {String(listings.length).padStart(2, "0")}{" "}
              {listingsPage.hero.strapline}
            </motion.p>

            {/* Market stats triplet */}
            <motion.dl
              variants={reveal}
              className="mt-2 grid grid-cols-3 divide-x divide-line border-y border-line py-5"
            >
              <MarketStat
                label={listingsPage.hero.stats.activeLabel}
                value={listings.length}
                format={(n) => String(n).padStart(2, "0")}
                color="var(--color-accent)"
              />
              <MarketStat
                label={listingsPage.hero.stats.rangeLabel}
                value={Math.round((PRICE_BAND.max / 1_000_000) * 100) / 100}
                format={(n) => `$${n.toFixed(2)}M`}
                color="var(--color-gold)"
              />
              <MarketStat
                label={listingsPage.hero.stats.citiesLabel}
                value={CITY_COUNT}
                format={(n) => String(n).padStart(2, "0")}
                color="var(--color-accent-2)"
              />
            </motion.dl>

            {/* CTAs */}
            <motion.div
              variants={reveal}
              className="flex flex-wrap items-center gap-3 pt-2"
            >
              <a
                href={listingsPage.hero.primaryCta.href}
                className="btn btn-primary px-6 py-3.5 text-[15px]"
              >
                {listingsPage.hero.primaryCta.label}{" "}
                <span className="arrow">→</span>
              </a>
              <a
                href={`tel:${site.phone.replace(/\s/g, "")}`}
                className="btn btn-ghost px-5 py-3.5 text-[15px]"
              >
                {listingsPage.hero.secondaryCta.label}
                <ArrowUpRight className="size-4" strokeWidth={1.75} />
              </a>
            </motion.div>
          </div>

          {/* ============== RIGHT — stacked cards collage ============== */}
          <motion.div
            variants={reveal}
            className="relative mx-auto w-full max-w-[460px]"
          >
            <motion.div style={{ y: collageY }} className="relative">
              <CardsCollage trio={featuredTrio} />
            </motion.div>

            {/* Floating "Spotlight" badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="absolute -left-4 top-6 inline-flex items-center gap-1.5 rounded-full border border-[color:var(--color-gold)]/50 bg-bg-elev/95 px-3 py-1.5 text-[10.5px] font-medium uppercase tracking-[0.16em] text-ink shadow-[0_18px_44px_-22px_rgba(184,148,90,0.45)] backdrop-blur md:-left-8"
            >
              <Sparkles
                className="size-3 text-[color:var(--color-gold)]"
                strokeWidth={2}
              />
              {listingsPage.hero.spotlightLabel}
            </motion.div>

            {/* Floating price-band card — bottom-right */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.5 }}
              className="absolute -bottom-5 -right-2 grid gap-1 rounded-2xl border border-line bg-bg-elev/95 px-5 py-3 shadow-[0_18px_44px_-22px_rgba(10,10,10,0.28)] backdrop-blur md:-right-6"
            >
              <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-ink-3">
                {listingsPage.hero.priceBandLabel}
              </span>
              <span className="font-serif text-[18px] tabular-nums tracking-[-0.012em] text-ink">
                {formatPriceShort(PRICE_BAND.min)} &mdash;{" "}
                {formatPriceShort(PRICE_BAND.max)}
              </span>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ──────────────────────── Hero subcomponents ──────────────────────── */

function MarketStat({
  label,
  value,
  format,
  color,
}: {
  label: string;
  value: number;
  format: (n: number) => string;
  color: string;
}) {
  return (
    <div className="grid place-items-center gap-1.5 px-3 text-center md:gap-2">
      <dd
        className="font-serif font-normal tabular-nums"
        style={{
          fontSize: "clamp(28px, 3.2vw, 44px)",
          lineHeight: 1,
          letterSpacing: "-0.03em",
          color,
        }}
      >
        {format(value)}
      </dd>
      <dt className="text-[10px] font-medium uppercase tracking-[0.18em] text-ink-3">
        {label}
      </dt>
    </div>
  );
}

function CountUp({
  to,
  format = (n) => Math.round(n).toLocaleString(),
  duration = 1.6,
}: {
  to: number;
  format?: (n: number) => string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(v),
    });
    return () => controls.stop();
  }, [inView, to, duration]);

  return <span ref={ref}>{format(display)}</span>;
}

/**
 * AddressMarquee — auto-scrolls every listing's full address as a
 * cinema-style ticker. Verbatim source content, no fabricated copy.
 */
function AddressMarquee() {
  // Repeat the list once so the loop seamlessly wraps without a gap.
  const trail = [...listings, ...listings];
  return (
    <div className="overflow-hidden">
      <div className="flex animate-[ticker_60s_linear_infinite] gap-12 whitespace-nowrap py-3">
        {trail.map((l, i) => (
          <span
            key={`${l.slug}-${i}`}
            className="inline-flex items-center gap-3 font-serif text-[12.5px] tracking-[0.04em] text-ink-2"
          >
            <span
              aria-hidden
              className="size-1 rounded-full bg-[color:var(--color-gold)]"
            />
            <span className="font-medium uppercase">
              {l.fullAddress ?? l.address.toUpperCase()}
            </span>
            <span className="text-ink-3">·</span>
            <span className="italic text-accent">
              {formatPrice(l.price)}
            </span>
          </span>
        ))}
      </div>
      <style>{`
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}

/**
 * CardsCollage — three layered listing thumbnails creating editorial
 * depth. The front card is the most expensive listing.
 */
function CardsCollage({ trio }: { trio: Listing[] }) {
  return (
    <div className="relative aspect-[4/5]">
      {/* Back card — rotated left, faded */}
      <div
        className="absolute inset-x-6 top-2 aspect-[4/5] -rotate-6 overflow-hidden rounded-[22px] border border-line shadow-[0_24px_60px_-22px_rgba(10,10,10,0.25)]"
        style={{ opacity: 0.7 }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={trio[2]?.image}
          alt=""
          className="size-full object-cover blur-[1px]"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
        />
      </div>

      {/* Mid card — rotated right, half opacity */}
      <div className="absolute inset-x-3 top-6 aspect-[4/5] rotate-3 overflow-hidden rounded-[22px] border border-line shadow-[0_28px_70px_-22px_rgba(10,10,10,0.32)]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={trio[1]?.image}
          alt=""
          className="size-full object-cover"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent"
        />
        <div className="absolute inset-x-4 bottom-4 grid gap-1 text-white">
          <span className="font-serif text-[16px] tracking-[-0.012em]">
            {trio[1]?.address}
          </span>
          <span className="font-serif text-[14px] tracking-[-0.005em] opacity-80">
            {formatPrice(trio[1]?.price ?? 0)}
          </span>
        </div>
      </div>

      {/* Front card — feature listing, full presentation */}
      <div className="absolute inset-0 overflow-hidden rounded-[24px] border border-line-strong shadow-[0_36px_80px_-22px_rgba(68,28,124,0.35)]">
        {/* Outer gradient frame */}
        <span
          aria-hidden
          className="absolute inset-0 rounded-[24px] p-[2px]"
          style={{
            background:
              "linear-gradient(140deg, var(--color-gold) 0%, var(--color-accent) 50%, var(--color-gold) 100%)",
          }}
        >
          <span className="block size-full rounded-[22px] bg-bg-warm" />
        </span>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={trio[0]?.image}
          alt={trio[0]?.address ?? "Featured listing"}
          className="relative size-full rounded-[22px] object-cover p-[2px]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-[2px] rounded-[22px] bg-gradient-to-t from-black/75 via-transparent to-transparent"
        />

        {/* Bottom info plate */}
        <div className="absolute inset-x-[14px] bottom-[14px] grid gap-2 rounded-[16px] border border-white/15 bg-gradient-to-t from-black/65 via-black/35 to-black/10 p-4 backdrop-blur-[6px]">
          <span className="font-serif leading-tight tracking-[-0.018em] text-white" style={{ fontSize: "clamp(20px, 2vw, 26px)" }}>
            {trio[0]?.address}
          </span>
          <div className="flex items-center justify-between text-white/85">
            <span className="inline-flex items-center gap-1.5 text-[12px]">
              <MapPin className="size-3" strokeWidth={1.6} />
              {trio[0]?.city}
            </span>
            <span className="font-serif text-[18px] tabular-nums tracking-[-0.012em] text-white">
              {formatPrice(trio[0]?.price ?? 0)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================== */
/*  ALL LISTINGS GRID                                             */
/* ============================================================== */

export function AllListings() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const smooth = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.4,
    restDelta: 0.0008,
  });
  // Vertical "Listings" title — LEFT, parallax through this section only.
  const titleY = useTransform(smooth, [0, 1], ["18%", "-22%"]);

  return (
    <section
      ref={sectionRef}
      id="all-listings"
      className="relative overflow-hidden py-24 md:py-28"
    >
      <ListingsGridBackground />

      {/* Vertical "Listings" stroke title — LEFT, parallax. Tied to this
          section's scroll progress so it traverses the grid as the user
          scrolls past the cards. */}
      <motion.div
        aria-hidden
        style={{ y: titleY }}
        className="pointer-events-none absolute inset-y-0 left-[24px] z-[1] hidden w-[140px] items-center justify-center md:flex lg:left-[40px] lg:w-[160px]"
      >
        <span
          className="block select-none whitespace-nowrap font-serif font-normal leading-none tracking-[-0.01em]"
          style={{
            fontSize: "clamp(140px, 15vw, 260px)",
            writingMode: "vertical-rl",
            WebkitTextStroke: "1.5px var(--color-accent)",
            color: "transparent",
            letterSpacing: "0.04em",
            opacity: 0.5,
          }}
        >
          {listingsPage.grid.titleStroke}
        </span>
      </motion.div>

      <div className="container-x relative z-10">
        <motion.header
          variants={revealContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-10% 0%" }}
          className="mb-12 grid items-end gap-6 md:mb-16 md:grid-cols-[1fr_auto] lg:mx-[60px]"
        >
          <div className="grid gap-3.5">
            <motion.span variants={reveal} className="eyebrow">
              {listingsPage.grid.eyebrow}
            </motion.span>
            <motion.h2 variants={reveal} className="display-h2">
              {listingsPage.grid.headline.lead}{" "}
              <em>{listingsPage.grid.headline.emphasis}</em>
            </motion.h2>
            <motion.p variants={reveal} className="lede max-w-[58ch] mt-1">
              {listingsPage.grid.lede.replace(
                "{count}",
                String(listings.length),
              )}
            </motion.p>
          </div>
          <motion.div
            variants={reveal}
            className="flex items-center gap-3 self-start md:self-end"
          >
            <span className="text-[10.5px] font-medium uppercase tracking-[0.18em] text-ink-3">
              {listingsPage.grid.sortLabel}
            </span>
            <span aria-hidden className="h-px w-10 bg-line" />
            <span className="font-serif text-[14px] italic tracking-[-0.005em] text-ink-2">
              {listingsPage.grid.sortValue}
            </span>
          </motion.div>
        </motion.header>

        <motion.div
          variants={revealContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-5% 0%" }}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:mx-[60px] lg:grid-cols-3 lg:gap-8"
        >
          {[...listings]
            .sort((a, b) => a.price - b.price)
            .map((listing, i) => (
              <FullListingCard
                key={listing.slug}
                listing={listing}
                index={i + 1}
                total={listings.length}
              />
            ))}
        </motion.div>
      </div>
    </section>
  );
}

function FullListingCard({
  listing,
  index,
  total,
}: {
  listing: Listing;
  index: number;
  total: number;
}) {
  const num = String(index).padStart(2, "0");
  const totalStr = String(total).padStart(2, "0");

  return (
    <motion.article
      variants={reveal}
      className="group relative isolate flex h-full flex-col overflow-hidden rounded-[22px] border border-line bg-bg-elev/80 shadow-[0_2px_6px_-2px_rgba(10,10,10,0.05),0_18px_44px_-22px_rgba(10,10,10,0.18)] backdrop-blur-md transition-all duration-700 ease-out hover:shadow-[0_4px_10px_-2px_rgba(10,10,10,0.08),0_36px_80px_-22px_rgba(68,28,124,0.32)]"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={listing.image}
          alt={listing.fullAddress ?? `${listing.address}, ${listing.city}`}
          className="size-full object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.04]"
          loading="lazy"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent"
        />

        {/* Index numeral — top-left */}
        <span className="absolute left-4 top-4 inline-flex items-baseline gap-2 font-serif text-white">
          <em
            className="text-[24px] italic leading-none tracking-[-0.02em]"
            style={{ color: "var(--color-gold)" }}
          >
            {num}
          </em>
          <span className="font-sans text-[10.5px] font-medium uppercase tracking-[0.18em] text-white/65">
            / {totalStr}
          </span>
        </span>

        {/* Status pill — top-right */}
        <span className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-bg-elev/95 px-3 py-1.5 text-[10.5px] font-medium uppercase tracking-[0.14em] text-ink-2 shadow-[0_2px_8px_-2px_rgba(10,10,10,0.18)] backdrop-blur">
          <span className="size-1.5 rounded-full bg-accent [animation:pulse_2.6s_var(--ease)_infinite]" />
          {listing.status ?? "For sale"}
        </span>

        {/* Top hairline that sweeps in on hover */}
        <span
          aria-hidden
          className="pointer-events-none absolute left-0 top-0 h-px w-0 bg-[color:var(--color-gold)] transition-all duration-700 ease-out group-hover:w-full"
        />
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-4 p-5 md:p-6">
        {/* Address line — primary */}
        <div className="grid gap-1.5">
          <h3
            className="font-serif font-normal leading-tight tracking-[-0.018em] text-ink"
            style={{ fontSize: "clamp(20px, 1.8vw, 24px)" }}
          >
            {listing.address}
          </h3>
          <span className="inline-flex items-center gap-1.5 text-[12px] tracking-[0.02em] text-ink-3">
            <MapPin className="size-3" strokeWidth={1.6} />
            {listing.city}
            {listing.postal ? ` · ${listing.postal}` : null}
          </span>
        </div>

        {/* Verbatim full address — small, italic, gold underline */}
        {listing.fullAddress ? (
          <p className="font-serif text-[11.5px] italic tracking-[0.04em] text-ink-3 line-clamp-2">
            {listing.fullAddress}
          </p>
        ) : null}

        <span aria-hidden className="h-px w-full bg-line" />

        {/* Meta row */}
        <ul className="grid grid-cols-3 divide-x divide-line text-[12px] text-ink-2">
          <li className="flex items-center gap-1.5 pr-3">
            <Bed
              className="size-[14px] text-[color:var(--color-accent)]"
              strokeWidth={1.6}
            />
            <span className="tabular-nums">{listing.beds} bd</span>
          </li>
          <li className="flex items-center gap-1.5 px-3">
            <Bath
              className="size-[14px] text-[color:var(--color-accent)]"
              strokeWidth={1.6}
            />
            <span className="tabular-nums">{listing.baths} ba</span>
          </li>
          <li className="flex items-center gap-1.5 pl-3">
            <Maximize2
              className="size-[14px] text-[color:var(--color-gold)]"
              strokeWidth={1.6}
            />
            <span className="tabular-nums">{formatSqft(listing.sqft)}</span>
          </li>
        </ul>

        {/* Price + CTA */}
        <div className="mt-auto flex items-end justify-between gap-4 pt-2">
          <span
            className="font-serif font-normal tabular-nums leading-none tracking-[-0.018em] text-ink"
            style={{ fontSize: "clamp(22px, 2vw, 28px)" }}
          >
            {formatPrice(listing.price)}
          </span>
          <a
            href="#contact"
            className="inline-flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.14em] text-ink-2 transition-colors duration-300 hover:text-accent"
          >
            {listingsPage.grid.cardCta}
            <ArrowUpRight className="size-3.5" strokeWidth={1.8} />
          </a>
        </div>
      </div>
    </motion.article>
  );
}

/* ============================================================== */
/*  CTA BANNER — verbatim source slogan                           */
/* ============================================================== */

export function ListingsCtaBanner() {
  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      <div
        aria-hidden
        className="absolute inset-0 z-0"
        style={{
          background:
            "linear-gradient(170deg, #0F0B1A 0%, #1A0F2E 50%, #0F0B1A 100%)",
        }}
      />
      <div
        aria-hidden
        className="absolute -inset-1/4 z-0 opacity-[0.18]"
        style={{
          background:
            "conic-gradient(from 90deg at 50% 50%, transparent 0%, rgba(184,148,90,0.4) 22%, transparent 45%, rgba(90,42,156,0.4) 68%, transparent 90%)",
          animation: "spin-slow 110s linear infinite",
          filter: "blur(60px)",
        }}
      />

      <div className="container-x relative z-10">
        <motion.div
          variants={revealContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-10% 0%" }}
          className="grid items-center gap-8 lg:mx-[60px] lg:grid-cols-[1.2fr_0.8fr]"
        >
          <div className="grid gap-4">
            <motion.span
              variants={reveal}
              className="text-[10.5px] font-medium uppercase tracking-[0.22em] text-white/60"
            >
              {listingsPage.ctaBanner.eyebrow}
            </motion.span>
            <motion.h2
              variants={reveal}
              className="font-serif font-normal leading-[1.02] tracking-[-0.025em] text-white"
              style={{ fontSize: "clamp(36px, 5vw, 64px)" }}
            >
              {listingsPage.ctaBanner.headline.lead}{" "}
              <em className="text-[color:var(--color-gold)]">
                {listingsPage.ctaBanner.headline.emphasis}
              </em>
            </motion.h2>
            <motion.p
              variants={reveal}
              className="max-w-[58ch] text-[16px] leading-[1.6] text-white/75 md:text-[17px]"
            >
              {listingsPage.ctaBanner.bodyTemplate
                .replace("{count}", String(listings.length))
                .replace("{cities}", String(CITY_COUNT))
                .replace("{sqft}", formatSqft(TOTAL_SQFT))}
            </motion.p>
          </div>

          <motion.div variants={reveal} className="flex flex-col gap-3 lg:items-end">
            <a
              href={`tel:${site.phone.replace(/\s/g, "")}`}
              className="inline-flex items-center gap-3 rounded-full border border-white/30 bg-white/8 px-7 py-4 font-serif text-[20px] tabular-nums tracking-[-0.015em] text-white backdrop-blur-sm transition-all duration-500 hover:border-[color:var(--color-gold)] hover:bg-white/12 md:text-[22px]"
            >
              <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/60">
                {listingsPage.ctaBanner.primaryLabel}
              </span>
              {site.phone}
              <ArrowUpRight
                className="size-4 text-[color:var(--color-gold)]"
                strokeWidth={1.75}
              />
            </a>
            <a
              href={`mailto:${site.email}`}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-transparent px-5 py-3 text-[13px] tracking-[-0.005em] text-white/80 transition-colors duration-300 hover:text-white"
            >
              {site.email}
              <ArrowUpRight className="size-3.5" strokeWidth={1.75} />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ============================================================== */
/*  HELPERS / DECORATIONS                                         */
/* ============================================================== */

function formatPriceShort(value: number): string {
  if (value >= 1_000_000) {
    const m = (value / 1_000_000).toFixed(2).replace(/\.?0+$/, "");
    return `$${m}M`;
  }
  return `$${Math.round(value / 1000)}K`;
}

/**
 * BlueprintGrid — architectural blueprint backdrop for the listings hero.
 * Different from About's dot-grid: thin orthogonal lines + occasional
 * cross-hatch ticks reading like an architect's draft sheet.
 */
function BlueprintGrid() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-[1] opacity-[0.13]"
      style={{
        backgroundImage:
          "linear-gradient(0deg, rgba(68,28,124,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(68,28,124,0.5) 1px, transparent 1px), linear-gradient(0deg, rgba(184,148,90,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(184,148,90,0.4) 1px, transparent 1px)",
        backgroundSize: "120px 120px, 120px 120px, 24px 24px, 24px 24px",
        maskImage:
          "radial-gradient(ellipse at 60% 40%, black 0%, transparent 75%)",
        WebkitMaskImage:
          "radial-gradient(ellipse at 60% 40%, black 0%, transparent 75%)",
      }}
    />
  );
}

function ListingsHeroBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(168deg, #FAF6EC 0%, #F4EFE0 30%, #ECE7F2 65%, #DDD3EC 100%)",
        }}
      />
      <div
        className="absolute -inset-1/4 opacity-[0.18]"
        style={{
          background:
            "conic-gradient(from 220deg at 50% 50%, transparent 0%, var(--color-gold-soft) 22%, transparent 45%, rgba(90,42,156,0.45) 68%, transparent 90%, var(--color-gold-soft) 100%)",
          animation: "spin-slow 110s linear infinite",
          filter: "blur(60px)",
        }}
      />
      <div
        className="absolute -right-32 top-[30%] size-[520px] rounded-full opacity-50 blur-[110px]"
        style={{
          background:
            "radial-gradient(circle, rgba(90,42,156,0.32) 0%, transparent 70%)",
          animation: "mesh-1 30s var(--ease-soft) infinite",
        }}
      />
      <div
        className="absolute -left-32 -bottom-24 size-[480px] rounded-full opacity-45 blur-[110px]"
        style={{
          background:
            "radial-gradient(circle, var(--color-gold-soft) 0%, transparent 70%)",
          animation: "mesh-2 32s var(--ease-soft) infinite",
        }}
      />
    </div>
  );
}

function ListingsGridBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(170deg, #FAFAF7 0%, #F4F2EA 35%, #ECE7F2 80%, #E4DCEE 100%)",
        }}
      />
      <div
        className="absolute -right-28 top-1/3 size-[440px] rounded-full opacity-40 blur-[110px]"
        style={{
          background:
            "radial-gradient(circle, rgba(90,42,156,0.28) 0%, transparent 70%)",
          animation: "mesh-1 32s var(--ease-soft) infinite",
        }}
      />
      <div
        className="absolute -left-24 -bottom-24 size-[460px] rounded-full opacity-45 blur-[110px]"
        style={{
          background:
            "radial-gradient(circle, var(--color-gold-soft) 0%, transparent 70%)",
          animation: "mesh-2 30s var(--ease-soft) infinite",
        }}
      />
    </div>
  );
}
