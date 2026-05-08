"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  type MotionValue,
} from "framer-motion";
import {
  ArrowUpRight,
  Bed,
  Bath,
  Maximize2,
  MapPin,
  Sparkles,
} from "lucide-react";
import { listings, type Listing } from "@/content";
import { formatPrice, formatSqft } from "@/lib/format";
import { reveal, revealContainer } from "@/lib/motion";
import { cn } from "@/lib/cn";

/**
 * Featured Listings — premium editorial bento.
 *
 *   1. Animated gradient mesh background (cool slate / pearl / sage palette
 *      so it differs from the cream of Services and dawn of Process).
 *   2. Vertical "Estates" stroke title on the RIGHT — gold stroke, parallax.
 *   3. Counter-parallax architect-style compass + floor-plan flourish on the LEFT.
 *   4. Editorial header with eyebrow, h2, lede, and "View all" CTA.
 *   5. Derived stats meta strip (no fabricated numbers — every value is
 *      computed from the data in content.tsx).
 *   6. Uniform 3×2 grid of 6 cards (3 per row, all the same size). Each card has:
 *        — multi-layer gradient frame (gold/sage)
 *        — index badge in serif italic gold
 *        — pulsing status pill
 *        — gold corner ornaments that fade in on hover
 *        — gold travelling hairline that sweeps across mid-image on hover
 *        — info plate with address, city pin, price, and bed/bath/sqft icons
 *        — animated underline beneath address that grows on hover
 *   7. Per-card scroll-driven parallax — each card drifts at a different
 *      magnitude so they pass each other as the section flows past.
 *   8. Closing CTA panel — "Don't see the right one? Let's scout it together."
 */

const PLACEHOLDER_GRADIENTS: Record<number, string> = {
  0: "linear-gradient(135deg, #2A6B53 0%, #1A4D3A 60%, #0F3326 100%)",
  1: "linear-gradient(160deg, #B8945A 0%, #8C6E3F 100%)",
  2: "linear-gradient(170deg, #3A3A3A 0%, #0A0A0A 100%)",
  3: "linear-gradient(155deg, #ECE9E0 0%, #C9C6BA 100%)",
  4: "linear-gradient(150deg, #1A4D3A 0%, #2D2D2A 100%)",
  5: "linear-gradient(140deg, #B8945A 0%, #4A3A1F 100%)",
};

/** Compact $K / $M formatter for the stats strip — no fabrication, just a
 *  shorter view of the same numbers already in content.tsx. */
function formatPriceShort(value: number): string {
  if (value >= 1_000_000) {
    const m = (value / 1_000_000).toFixed(2).replace(/\.?0+$/, "");
    return `$${m}M`;
  }
  return `$${Math.round(value / 1000)}K`;
}

export function Listings() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Spring-smooth the scroll progress for that premium dampened feel.
  const smooth = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.4,
    restDelta: 0.0008,
  });

  // Vertical "Estates" title — drifts opposite to scroll direction.
  const titleY = useTransform(smooth, [0, 1], ["22%", "-22%"]);
  // Floor-plan flourish — counter-parallax + a touch of rotation.
  const flourishY = useTransform(smooth, [0, 1], ["-26%", "26%"]);
  const flourishRotate = useTransform(smooth, [0, 1], [-3, 3]);

  // Per-card parallax. Hooks must be called unconditionally, so we declare
  // exactly six and pass them down by index.
  //
  // Uniform 3×2 grid:
  //
  //   Row 1 │ Card 0 │ Card 1 │ Card 2 │
  //   Row 2 │ Card 3 │ Card 4 │ Card 5 │
  //
  // To prevent vertical neighbours from crashing into each other under
  // scroll, top-row cards drift further upward than bottom-row cards, so
  // the gap between rows only ever grows. Within a row, magnitudes stagger
  // slightly so neighbours don't move in lockstep.
  const card0Y = useTransform(smooth, [0, 1], [0, -28]); // top-left
  const card1Y = useTransform(smooth, [0, 1], [0, -36]); // top-centre
  const card2Y = useTransform(smooth, [0, 1], [0, -24]); // top-right
  const card3Y = useTransform(smooth, [0, 1], [0, -10]); // bottom-left
  const card4Y = useTransform(smooth, [0, 1], [0, -14]); // bottom-centre
  const card5Y = useTransform(smooth, [0, 1], [0, -6]); // bottom-right
  const cardYs: MotionValue<number>[] = [
    card0Y,
    card1Y,
    card2Y,
    card3Y,
    card4Y,
    card5Y,
  ];

  // Derived stats — every number traces back to listings[] above. No fakes.
  const minPrice = Math.min(...listings.map((l) => l.price));
  const maxPrice = Math.max(...listings.map((l) => l.price));
  const avgSqft = Math.round(
    listings.reduce((s, l) => s + l.sqft, 0) / listings.length,
  );

  return (
    <section
      ref={sectionRef}
      id="listings"
      className="relative overflow-hidden py-24 md:py-32"
    >
      <ListingsBackground />

      {/* Vertical "Estates" stroke title — RIGHT, parallax */}
      <motion.div
        aria-hidden
        style={{ y: titleY }}
        className="pointer-events-none absolute inset-y-0 right-[50px] z-[1] hidden w-[160px] items-center justify-center lg:flex"
      >
        <span
          className="block select-none whitespace-nowrap font-serif font-normal leading-none tracking-[-0.01em]"
          style={{
            fontSize: "clamp(120px, 14vw, 220px)",
            writingMode: "vertical-rl",
            WebkitTextStroke: "1.5px var(--color-gold)",
            color: "transparent",
            letterSpacing: "0.04em",
            opacity: 0.6,
          }}
        >
          Estates
        </span>
      </motion.div>

      {/* Counter-parallax architectural flourish — LEFT */}
      <motion.div
        aria-hidden
        style={{ y: flourishY, rotate: flourishRotate }}
        className="pointer-events-none absolute inset-y-0 left-[50px] z-[1] hidden w-[180px] items-center justify-center lg:flex"
      >
        <FloorPlanFlourish />
      </motion.div>

      <div className="container-x relative z-10">
        {/* ============== HEADER ============== */}
        <motion.header
          variants={revealContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-10% 0%" }}
          className="mb-10 grid items-end gap-6 md:mb-12 md:grid-cols-[1fr_auto] lg:px-[120px]"
        >
          <div className="grid gap-3.5">
            {/* Source-derived kicker — verbatim "Real Estate Updates" heading
                from aliazam.ca, sized as a discrete badge above the section
                eyebrow so it doesn't compete with the headline. */}
            <motion.span
              variants={reveal}
              className="inline-flex w-fit items-center gap-2 rounded-full border border-line bg-bg-elev/85 px-3 py-1 text-[10.5px] font-medium uppercase tracking-[0.16em] text-ink-2 backdrop-blur-sm"
            >
              <span
                className="size-1.5 rounded-full bg-[color:var(--color-gold)]"
                aria-hidden
              />
              Real Estate Updates
            </motion.span>
            <motion.span variants={reveal} className="eyebrow">
              Featured listings
            </motion.span>
            <motion.h2 variants={reveal} className="display-h2">
              Currently <em>on the market.</em>
            </motion.h2>
            {/* Verbatim source lede from aliazam.ca's "Real Estate Updates"
                section — kept as a serif italic strapline so the existing
                curated lede below still reads as the section's primary copy. */}
            <motion.p
              variants={reveal}
              className="mt-1 max-w-[58ch] font-serif text-[17px] italic leading-[1.45] tracking-[-0.005em] text-[color:var(--color-accent)]"
            >
              Find your dream property today! Browse our website&apos;s
              property listings for the latest available real estate options.
            </motion.p>
            <motion.p variants={reveal} className="lede mt-1 max-w-[58ch]">
              A curated selection across the Greater Toronto Area, Peterborough,
              and Oshawa &mdash; from city pieds-&agrave;-terre to family
              estates. Tap any property to request a private showing.
            </motion.p>
          </div>
          <motion.a
            variants={reveal}
            href="#contact"
            className="btn btn-ghost self-start md:self-end"
          >
            View all listings <span className="arrow">→</span>
          </motion.a>
        </motion.header>

        {/* ============== STATS STRIP — derived only ============== */}
        <motion.dl
          variants={revealContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-10% 0%" }}
          className="mb-12 grid grid-cols-2 gap-x-6 gap-y-5 border-y border-line py-6 md:mb-16 md:grid-cols-4 md:gap-0 md:py-7 lg:mx-[120px]"
        >
          <Stat
            label="Active"
            value={String(listings.length).padStart(2, "0")}
            first
          />
          <Stat
            label="Price range"
            value={`${formatPriceShort(minPrice)} – ${formatPriceShort(maxPrice)}`}
          />
          <Stat
            label="Service area"
            value="GTA · Vaughan · Peterborough · Oshawa"
          />
          <Stat label="Avg size" value={formatSqft(avgSqft)} />
        </motion.dl>

        {/* ============== BENTO GRID ============== */}
        <motion.div
          variants={revealContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-5% 0%" }}
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 md:gap-6"
        >
          {/* Home page features the first 6 listings as a 3×2 grid; the
              dedicated /listings route shows all of them. */}
          {listings.slice(0, 6).map((listing, i) => (
            <ListingCard
              key={listing.slug}
              listing={listing}
              index={i}
              parallaxY={cardYs[i]}
            />
          ))}
        </motion.div>

        {/* ============== CLOSING CTA ============== */}
        <motion.div
          variants={revealContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-10% 0%" }}
          className="mt-16 flex flex-col items-start gap-6 rounded-[24px] border border-line bg-bg-elev/70 p-7 backdrop-blur-sm md:mt-20 md:flex-row md:items-center md:justify-between md:p-9 lg:mx-[120px]"
        >
          <motion.div variants={reveal} className="grid gap-2">
            <span className="eyebrow">Don&apos;t see the right one?</span>
            <p className="font-serif text-[26px] font-normal leading-[1.15] tracking-[-0.018em] text-ink md:text-[30px]">
              Let&apos;s scout it together.{" "}
              <em className="text-accent">
                Off-market access on request.
              </em>
            </p>
          </motion.div>
          <motion.a
            variants={reveal}
            href="#contact"
            className="btn btn-primary"
          >
            Request a private showing <span className="arrow">→</span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}

/* ============================================================== */
/*  STAT — meta-strip cell                                        */
/* ============================================================== */

function Stat({
  label,
  value,
  first = false,
}: {
  label: string;
  value: string;
  first?: boolean;
}) {
  return (
    <div
      className={cn(
        "grid gap-1.5 px-1 md:px-7",
        !first && "md:border-l md:border-line",
      )}
    >
      <dt className="text-[10.5px] font-medium uppercase tracking-[0.16em] text-ink-3">
        {label}
      </dt>
      <dd className="font-serif text-[18px] font-normal tracking-[-0.012em] tabular-nums text-ink md:text-[20px]">
        {value}
      </dd>
    </div>
  );
}

/* ============================================================== */
/*  LISTING CARD — premium multi-layer frame                      */
/* ============================================================== */

function ListingCard({
  listing,
  index,
  parallaxY,
}: {
  listing: Listing;
  index: number;
  parallaxY: MotionValue<number>;
}) {
  // Uniform 3×2 grid — every card is the same size. The previous "feature"
  // upgrade (col-span-4 + bigger type + Spotlight badge) is disabled here so
  // all six cards read identically.
  const isFeature = false;
  const num = String(index + 1).padStart(2, "0");
  const total = String(listings.length).padStart(2, "0");

  return (
    <motion.div
      variants={reveal}
      className="relative h-full min-h-[440px]"
    >
      <motion.a
        href="#contact"
        style={{ y: parallaxY }}
        className={cn(
          "group relative isolate flex h-full overflow-hidden rounded-[22px]",
          "shadow-[0_2px_6px_-2px_rgba(10,10,10,0.05),0_18px_44px_-22px_rgba(10,10,10,0.18)]",
          "transition-shadow duration-700 ease-out",
          "hover:shadow-[0_4px_10px_-2px_rgba(10,10,10,0.08),0_36px_80px_-22px_rgba(26,77,58,0.32)]",
        )}
      >
        {/* Layer 1 — outer gradient frame (gold/sage). Stronger on the feature. */}
        <span
          aria-hidden
          className="absolute inset-0 z-0 rounded-[22px] p-[2px]"
          style={{
            background: isFeature
              ? "linear-gradient(135deg, var(--color-gold) 0%, var(--color-accent-2) 50%, var(--color-gold) 100%)"
              : "linear-gradient(135deg, rgba(184,148,90,0.5) 0%, rgba(26,77,58,0.45) 50%, rgba(184,148,90,0.45) 100%)",
          }}
        >
          <span className="block size-full rounded-[20px] bg-bg-warm" />
        </span>

        {/* Layer 2 — placeholder gradient (renders if photo 404s). */}
        <span
          aria-hidden
          className="absolute inset-[2px] z-[1] rounded-[20px]"
          style={{ background: PLACEHOLDER_GRADIENTS[index] }}
        />

        {/* Layer 3 — photo */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={listing.image}
          alt={`${listing.address}, ${listing.city}`}
          className="absolute inset-[2px] z-[2] size-[calc(100%-4px)] rounded-[20px] object-cover transition-all duration-1000 ease-out group-hover:scale-[1.05] group-hover:brightness-[1.04]"
          loading="lazy"
        />

        {/* Layer 4 — soft top + strong bottom gradient overlay */}
        <span
          aria-hidden
          className="absolute inset-[2px] z-[3] rounded-[20px]"
          style={{
            background:
              "linear-gradient(180deg, rgba(10,10,10,0.20) 0%, transparent 28%, transparent 50%, rgba(10,10,10,0.80) 100%)",
          }}
        />

        {/* Layer 5 — gold travelling hairline (sweeps in on hover) */}
        <span
          aria-hidden
          className="absolute inset-x-[2px] top-[55%] z-[4] h-px overflow-hidden opacity-0 transition-opacity duration-500 group-hover:opacity-70"
        >
          <span
            className="block h-full w-[40%] -translate-x-full bg-gradient-to-r from-transparent via-[color:var(--color-gold)] to-transparent transition-transform duration-[1400ms] ease-out group-hover:translate-x-[260%]"
          />
        </span>

        {/* Top-left — index badge in gold serif italic */}
        <span className="absolute left-5 top-5 z-10 inline-flex items-baseline gap-2 font-serif text-white">
          <em className="text-[clamp(20px,2.4vw,28px)] leading-none tracking-[-0.02em] text-[color:var(--color-gold-soft)]">
            {num}
          </em>
          <span className="font-sans text-[10.5px] font-medium uppercase tracking-[0.18em] text-white/60">
            / {total}
          </span>
        </span>

        {/* Top-right — status pill */}
        <span className="absolute right-5 top-5 z-10 inline-flex items-center gap-1.5 rounded-full bg-bg-elev/95 px-3 py-1.5 text-[10.5px] font-medium uppercase tracking-[0.14em] text-ink-2 shadow-[0_2px_8px_-2px_rgba(10,10,10,0.18)] backdrop-blur">
          <span className="size-1.5 rounded-full bg-accent [animation:pulse_2.6s_var(--ease)_infinite]" />
          {listing.status ?? "For sale"}
        </span>

        {/* Spotlight badge — only the feature listing */}
        {isFeature && (
          <span className="absolute left-5 top-[58px] z-10 inline-flex items-center gap-1.5 rounded-full border border-[color:var(--color-gold)]/60 bg-gradient-to-br from-[color:var(--color-gold)]/35 to-transparent px-3 py-1.5 text-[10.5px] font-medium uppercase tracking-[0.16em] text-white backdrop-blur-sm">
            <Sparkles
              className="size-3 text-[color:var(--color-gold)]"
              strokeWidth={2}
            />
            Spotlight property
          </span>
        )}

        {/* Gold corner ornaments — fade in on hover */}
        <CornerMark position="tl" />
        <CornerMark position="tr" />
        <CornerMark position="bl" />
        <CornerMark position="br" />

        {/* Bottom info plate */}
        <div
          className={cn(
            "absolute inset-x-[12px] bottom-[12px] z-10 grid gap-3 rounded-[16px] border border-white/10 p-5 backdrop-blur-[6px] transition-all duration-500 ease-out",
            "bg-gradient-to-t from-black/70 via-black/45 to-black/10",
            "group-hover:border-[color:var(--color-gold)]/45",
            isFeature && "md:p-6",
          )}
        >
          {/* Address + price */}
          <div className="flex items-end justify-between gap-4">
            <div className="grid gap-1.5">
              <h3
                className={cn(
                  "font-serif font-normal leading-[1.05] tracking-[-0.018em] text-white",
                  isFeature
                    ? "text-[clamp(24px,2.8vw,34px)]"
                    : "text-[clamp(20px,2.2vw,26px)]",
                )}
              >
                {listing.address}
              </h3>
              {/* Animated underline that grows on hover */}
              <span
                aria-hidden
                className="block h-px w-[44px] bg-gradient-to-r from-[color:var(--color-gold)] to-transparent transition-all duration-500 group-hover:w-[88px]"
              />
              <span className="mt-1 inline-flex items-center gap-1.5 text-[12px] tracking-[0.04em] text-white/70">
                <MapPin className="size-3" strokeWidth={1.6} />
                {listing.city}
              </span>
            </div>
            <span
              className={cn(
                "shrink-0 font-serif font-normal leading-none tracking-[-0.015em] tabular-nums text-white",
                isFeature
                  ? "text-[clamp(22px,2.6vw,32px)]"
                  : "text-[clamp(20px,2.2vw,26px)]",
              )}
            >
              {formatPrice(listing.price)}
            </span>
          </div>

          {/* hairline */}
          <span aria-hidden className="h-px w-full bg-white/15" />

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[12px] tabular-nums text-white/85">
            <span className="inline-flex items-center gap-1.5">
              <Maximize2
                className="size-[12px] text-[color:var(--color-gold)]"
                strokeWidth={1.6}
              />
              {formatSqft(listing.sqft)}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Bed
                className="size-[12px] text-[color:var(--color-gold)]"
                strokeWidth={1.6}
              />
              {listing.beds} bed
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Bath
                className="size-[12px] text-[color:var(--color-gold)]"
                strokeWidth={1.6}
              />
              {listing.baths} bath
            </span>
            <span className="ml-auto inline-flex items-center gap-1 text-[10.5px] font-medium uppercase tracking-[0.14em] text-white opacity-0 transition-all duration-300 group-hover:opacity-100">
              View
              <ArrowUpRight className="size-3" strokeWidth={1.8} />
            </span>
          </div>
        </div>
      </motion.a>
    </motion.div>
  );
}

/* ============================================================== */
/*  CORNER MARK — gold L-bracket that fades in on card hover      */
/* ============================================================== */

function CornerMark({
  position,
}: {
  position: "tl" | "tr" | "bl" | "br";
}) {
  const positionClass = {
    tl: "left-[10px] top-[10px]",
    tr: "right-[10px] top-[10px]",
    bl: "left-[10px] bottom-[10px]",
    br: "right-[10px] bottom-[10px]",
  }[position];
  const rotate = { tl: 0, tr: 90, br: 180, bl: 270 }[position];

  return (
    <span
      aria-hidden
      className={cn(
        "pointer-events-none absolute z-[5] size-5 opacity-0 transition-all duration-500 ease-out group-hover:opacity-90",
        positionClass,
      )}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <svg
        viewBox="0 0 20 20"
        fill="none"
        stroke="var(--color-gold)"
        strokeWidth="1.4"
        strokeLinecap="round"
      >
        <path d="M 2 10 L 2 2 L 10 2" />
        <circle cx="2" cy="2" r="1" fill="var(--color-gold)" stroke="none" />
      </svg>
    </span>
  );
}

/* ============================================================== */
/*  FLOOR PLAN FLOURISH — left-side parallax decoration           */
/* ============================================================== */

function FloorPlanFlourish() {
  const stroke = "var(--color-accent)";
  const gold = "var(--color-gold)";
  return (
    <svg
      viewBox="0 0 180 400"
      className="h-auto w-full"
      fill="none"
      stroke={stroke}
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ opacity: 0.55 }}
    >
      {/* ============ Compass rose ============ */}
      <circle cx="90" cy="50" r="32" strokeWidth="1.1" />
      <circle cx="90" cy="50" r="22" strokeOpacity="0.4" />

      {/* Cardinal ticks */}
      <line x1="90" y1="14" x2="90" y2="22" strokeWidth="1.2" />
      <line x1="90" y1="78" x2="90" y2="86" strokeOpacity="0.45" />
      <line x1="54" y1="50" x2="62" y2="50" strokeOpacity="0.45" />
      <line x1="118" y1="50" x2="126" y2="50" strokeOpacity="0.45" />

      {/* "N" label above */}
      <text
        x="90"
        y="11"
        textAnchor="middle"
        fontSize="8"
        fontFamily="serif"
        fontStyle="italic"
        fill={stroke}
        stroke="none"
        opacity="0.75"
      >
        N
      </text>

      {/* Needle — gold north tip, faded south */}
      <path d="M 90 22 L 86 50 L 90 50 Z" fill={gold} stroke="none" />
      <path
        d="M 90 22 L 94 50 L 90 50 Z"
        fill={gold}
        stroke="none"
        opacity="0.6"
      />
      <path
        d="M 90 78 L 86 50 L 90 50 Z"
        fill={stroke}
        stroke="none"
        opacity="0.5"
      />
      <path
        d="M 90 78 L 94 50 L 90 50 Z"
        fill={stroke}
        stroke="none"
        opacity="0.3"
      />
      <circle cx="90" cy="50" r="3" fill={gold} stroke="none" />

      {/* Dotted outer ring */}
      <circle
        cx="90"
        cy="50"
        r="38"
        stroke={gold}
        strokeWidth="0.9"
        strokeDasharray="2 5"
        opacity="0.7"
      />

      {/* ============ Floor plan ============ */}
      {/* Outer walls */}
      <rect x="30" y="120" width="120" height="200" strokeWidth="1.2" />
      {/* Hairline inner offset (interior wall) */}
      <rect
        x="34"
        y="124"
        width="112"
        height="192"
        strokeOpacity="0.32"
      />

      {/* Interior partitions */}
      <line x1="30" y1="200" x2="150" y2="200" strokeOpacity="0.5" />
      <line x1="92" y1="120" x2="92" y2="200" strokeOpacity="0.45" />
      <line x1="80" y1="200" x2="80" y2="320" strokeOpacity="0.45" />
      <line x1="80" y1="262" x2="150" y2="262" strokeOpacity="0.45" />

      {/* Door swings */}
      <path d="M 80 232 A 8 8 0 0 1 88 224" strokeOpacity="0.5" />
      <path d="M 92 152 A 8 8 0 0 1 100 144" strokeOpacity="0.5" />
      <path d="M 110 262 A 8 8 0 0 1 118 254" strokeOpacity="0.5" />

      {/* Furniture — schematic */}
      {/* Living: sofa, chair, coffee table */}
      <rect x="42" y="142" width="36" height="14" strokeOpacity="0.4" />
      <rect x="42" y="162" width="20" height="16" strokeOpacity="0.4" />
      <circle cx="68" cy="174" r="6" strokeOpacity="0.4" />
      {/* Dining */}
      <rect x="100" y="140" width="40" height="22" strokeOpacity="0.4" />
      <line x1="100" y1="151" x2="140" y2="151" strokeOpacity="0.3" />
      {/* Primary bed */}
      <rect x="42" y="218" width="32" height="22" strokeOpacity="0.4" />
      <line x1="42" y1="228" x2="74" y2="228" strokeOpacity="0.3" />
      {/* Bed 02 */}
      <rect x="98" y="218" width="36" height="22" strokeOpacity="0.4" />
      <line x1="98" y1="229" x2="134" y2="229" strokeOpacity="0.3" />
      {/* Bath fixtures */}
      <rect x="92" y="270" width="14" height="22" strokeOpacity="0.4" />
      <circle cx="124" cy="282" r="6" strokeOpacity="0.4" />

      {/* Room labels — gold serif italic */}
      <text
        x="60"
        y="160"
        fontSize="6"
        fontFamily="serif"
        fontStyle="italic"
        fill={gold}
        stroke="none"
        opacity="0.85"
      >
        LIVING
      </text>
      <text
        x="120"
        y="158"
        fontSize="6"
        fontFamily="serif"
        fontStyle="italic"
        fill={gold}
        stroke="none"
        opacity="0.85"
      >
        DINING
      </text>
      <text
        x="58"
        y="252"
        fontSize="6"
        fontFamily="serif"
        fontStyle="italic"
        fill={gold}
        stroke="none"
        opacity="0.85"
      >
        PRIMARY
      </text>
      <text
        x="116"
        y="252"
        fontSize="6"
        fontFamily="serif"
        fontStyle="italic"
        fill={gold}
        stroke="none"
        opacity="0.85"
      >
        BED&nbsp;02
      </text>
      <text
        x="100"
        y="306"
        fontSize="6"
        fontFamily="serif"
        fontStyle="italic"
        fill={gold}
        stroke="none"
        opacity="0.85"
      >
        BATH
      </text>

      {/* Dimension line — bottom */}
      <line x1="30" y1="338" x2="150" y2="338" strokeOpacity="0.4" />
      <line x1="30" y1="334" x2="30" y2="342" strokeOpacity="0.4" />
      <line x1="150" y1="334" x2="150" y2="342" strokeOpacity="0.4" />
      <text
        x="90"
        y="352"
        textAnchor="middle"
        fontSize="7"
        fontFamily="serif"
        fontStyle="italic"
        fill={stroke}
        stroke="none"
        opacity="0.7"
      >
        {"28' × 32'"}
      </text>

      {/* Gold key plate */}
      <rect
        x="84"
        y="370"
        width="12"
        height="10"
        stroke={gold}
        strokeWidth="1"
      />
      <line
        x1="90"
        y1="376"
        x2="92"
        y2="376"
        stroke={gold}
        strokeWidth="1"
      />
    </svg>
  );
}

/* ============================================================== */
/*  BACKGROUND — cool slate + pearl + sage gradient mesh          */
/* ============================================================== */

function ListingsBackground() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      {/* Base wash — cool sage → pearl → warm cream → sage */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(165deg, #EDF1ED 0%, #F4F2EA 30%, #FAFAF7 55%, #ECE9E0 78%, #DCE5E0 100%)",
        }}
      />

      {/* Slow rotating conic — sage + gold */}
      <div
        className="absolute -inset-1/4 opacity-[0.18]"
        style={{
          background:
            "conic-gradient(from 270deg at 50% 50%, transparent 0%, var(--color-accent-soft) 22%, transparent 45%, var(--color-gold-soft) 68%, transparent 90%, var(--color-accent-soft) 100%)",
          animation: "spin-slow 110s linear infinite",
          filter: "blur(50px)",
        }}
      />

      {/* Bottom-left sage bloom — grounding the grid */}
      <div
        className="absolute -bottom-32 -left-24 size-[520px] rounded-full opacity-50 blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, var(--color-accent-soft) 0%, transparent 70%)",
          animation: "mesh-2 32s var(--ease-soft) infinite",
        }}
      />

      {/* Top-right gold bloom — light from the title side */}
      <div
        className="absolute -right-28 -top-20 size-[540px] rounded-full opacity-45 blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, var(--color-gold-soft) 0%, transparent 70%)",
          animation: "mesh-1 28s var(--ease-soft) infinite",
        }}
      />

      {/* Centre pearl — softens the headline */}
      <div
        className="absolute left-1/2 top-[28%] size-[420px] -translate-x-1/2 rounded-full opacity-35 blur-[100px]"
        style={{
          background:
            "radial-gradient(circle, #FFFFFF 0%, transparent 65%)",
          animation: "mesh-3 30s var(--ease-soft) infinite",
        }}
      />

      {/* Right-side cool drift — reinforces depth */}
      <div
        className="absolute right-[8%] bottom-[18%] size-[360px] rounded-full opacity-30 blur-[100px]"
        style={{
          background:
            "radial-gradient(circle, #DCE5E0 0%, transparent 70%)",
          animation: "mesh-1 34s var(--ease-soft) infinite",
          animationDelay: "-12s",
        }}
      />
    </div>
  );
}
