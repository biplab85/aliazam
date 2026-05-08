"use client";

import { useRef, type ReactNode } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  type MotionValue,
} from "framer-motion";
import { TrendingUp, KeyRound } from "lucide-react";
import { reveal, revealContainer } from "@/lib/motion";

/**
 * Mission — verbatim copy from aliazam.ca.
 *
 * One premium block carrying three pieces of source content, every word
 * preserved exactly as written on the live site:
 *   • "Our mission" manifesto                  (top)
 *   • "Real Estate Investment Opportunities"   (left card)
 *   • "Selling Your Home with Ease"            (right card)
 *
 * Visual language mirrors the sibling sections (Listings / Process / FinalCta)
 * so it slots in without retraining the eye:
 *   - Distinct gradient mesh background (cream → purple bloom → gold seam).
 *   - Vertical stroke title on the RIGHT, parallax in the accent stroke.
 *   - Counter-parallax trust-seal SVG on the LEFT.
 *   - Eyebrow + serif display-h2 header pattern with italic accent emphasis.
 *   - Two large content cards in a 2-col grid, each with its own parallax Y,
 *     index numeral, gold corner ornaments on hover, and a hairline that
 *     sweeps across on hover.
 */

/* ──────────────────────── Verbatim source copy ──────────────────────── */

const MISSION_LEAD =
  "Our mission is to be the most trusted and reliable real estate agency in Canada.";

const MISSION_PARAGRAPHS = [
  "We strive to build long-term relationships with our clients by providing exceptional service and expert guidance throughout their real estate journey.",
  "We are committed to delivering results that exceed our clients' expectations. We believe in transparency, honesty, and integrity in everything we do, and we take pride in providing personalized and attentive service to every client, whether they are buying, selling, or investing in real estate.",
];

const INVESTMENT_TITLE = "Real Estate Investment Opportunities";
const INVESTMENT_BODY =
  "When it comes to investing in real estate, you want to make sure you have expert guidance to help you maximize your return on investment. Our team of experienced realtors can provide a comprehensive analysis of the current market and identify lucrative investment opportunities. We work closely with our clients to develop a personalized investment strategy that meets their unique goals and helps them achieve financial success in real estate.";

const SELLING_TITLE = "Selling Your Home with Ease";
const SELLING_BODY =
  "Selling your home can be a complex and overwhelming process, but it doesn't have to be. Our team of expert realtors is here to guide you through every step of the process, from pricing and marketing to negotiating and closing the deal. We take the time to fully explain each step of the process and answer any questions you may have, ensuring that you feel confident and informed throughout the entire process. Let us help you sell your home with ease and get the best possible return on your investment.";

/* ────────────────────────── Section ────────────────────────── */

export function Mission() {
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

  // Vertical "Mission" title — drifts opposite to scroll.
  const titleY = useTransform(smooth, [0, 1], ["22%", "-22%"]);
  // Counter-parallax trust seal — drifts down + slight rotation.
  const sealY = useTransform(smooth, [0, 1], ["-26%", "26%"]);
  const sealRotate = useTransform(smooth, [0, 1], [-3, 3]);

  // Per-card parallax — gentle staggered drift upward so the gap between
  // them only ever grows under scroll.
  const card1Y = useTransform(smooth, [0, 1], [0, -28]);
  const card2Y = useTransform(smooth, [0, 1], [0, -10]);

  return (
    <section
      ref={sectionRef}
      id="mission"
      className="relative overflow-hidden py-24 md:py-32"
    >
      <MissionBackground />

      {/* Vertical "Mission" — RIGHT, accent stroke + parallax */}
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
            WebkitTextStroke: "1.5px var(--color-accent)",
            color: "transparent",
            letterSpacing: "0.04em",
            opacity: 0.6,
          }}
        >
          Mission
        </span>
      </motion.div>

      {/* Counter-parallax trust seal — LEFT */}
      <motion.div
        aria-hidden
        style={{ y: sealY, rotate: sealRotate }}
        className="pointer-events-none absolute inset-y-0 left-[50px] z-[1] hidden w-[180px] items-center justify-center lg:flex"
      >
        <TrustSealIcon />
      </motion.div>

      <div className="container-x relative z-10">
        {/* ============== MANIFESTO HEADER ============== */}
        <motion.header
          variants={revealContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-10% 0%" }}
          className="mb-14 max-w-[860px] md:mb-20 lg:mx-[120px]"
        >
          <motion.span variants={reveal} className="eyebrow">
            Our Mission
          </motion.span>
          {/* Lead sentence as the headline — verbatim, with the brand
              promise italicised in accent for editorial emphasis. */}
          <motion.h2 variants={reveal} className="display-h2 mt-3.5">
            Our mission is to be{" "}
            <em>the most trusted and reliable real estate agency in Canada.</em>
          </motion.h2>
          <motion.div variants={reveal} className="mt-7 grid gap-5">
            {MISSION_PARAGRAPHS.map((p, i) => (
              <p key={i} className="lede max-w-[62ch]">
                {p}
              </p>
            ))}
          </motion.div>
          {/* Hairline rule with the three-pillar eyebrow drawn from the
              copy itself: "transparency, honesty, and integrity". */}
          <motion.div
            variants={reveal}
            className="mt-8 flex items-center gap-3"
          >
            <span className="h-px w-10 bg-[color:var(--color-gold)]" />
            <span className="text-[10.5px] font-medium uppercase tracking-[0.18em] text-ink-3">
              Transparency · Honesty · Integrity
            </span>
            <span className="h-px flex-1 bg-line" />
          </motion.div>
        </motion.header>

        {/* ============== TWO-CARD GRID ============== */}
        <motion.div
          variants={revealContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-5% 0%" }}
          className="grid gap-6 md:grid-cols-2 md:gap-8 lg:mx-[120px]"
        >
          <ApproachCard
            index="01"
            eyebrow="Investing"
            title={INVESTMENT_TITLE}
            body={INVESTMENT_BODY}
            icon={<TrendingUp className="size-5" strokeWidth={1.5} />}
            parallaxY={card1Y}
          />
          <ApproachCard
            index="02"
            eyebrow="Selling"
            title={SELLING_TITLE}
            body={SELLING_BODY}
            icon={<KeyRound className="size-5" strokeWidth={1.5} />}
            parallaxY={card2Y}
          />
        </motion.div>

        {/* Subtle marker tying the lead back to the cards — used as a
            spoken bridge, not a fabricated metric. */}
        <p className="sr-only">{MISSION_LEAD}</p>
      </div>
    </section>
  );
}

/* ============================================================== */
/*  APPROACH CARD                                                 */
/* ============================================================== */

function ApproachCard({
  index,
  eyebrow,
  title,
  body,
  icon,
  parallaxY,
}: {
  index: string;
  eyebrow: string;
  title: string;
  body: string;
  icon: ReactNode;
  parallaxY: MotionValue<number>;
}) {
  return (
    <motion.article
      variants={reveal}
      style={{ y: parallaxY }}
      className="group relative isolate flex flex-col gap-5 overflow-hidden rounded-[24px] border border-line-strong bg-bg-elev/85 p-7 shadow-[0_2px_6px_-2px_rgba(10,10,10,0.05),0_18px_44px_-22px_rgba(10,10,10,0.18)] backdrop-blur-md transition-all duration-700 ease-out hover:shadow-[0_4px_10px_-2px_rgba(10,10,10,0.08),0_36px_80px_-22px_rgba(68,28,124,0.32)] md:p-9 lg:p-10"
    >
      {/* Inner ambient mesh */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(circle at 82% 14%, var(--color-accent-soft) 0%, transparent 55%), radial-gradient(circle at 14% 86%, var(--color-gold-soft) 0%, transparent 55%)",
          opacity: 0.55,
        }}
      />

      {/* Top row — index numeral + eyebrow + icon */}
      <header className="flex items-start justify-between gap-4">
        <div className="grid gap-1.5">
          <span
            className="font-serif italic leading-none tracking-[-0.02em] text-[color:var(--color-gold)]"
            style={{ fontSize: "clamp(28px, 2.6vw, 36px)" }}
          >
            {index}
          </span>
          <span className="eyebrow">{eyebrow}</span>
        </div>
        <span className="grid size-12 shrink-0 place-items-center rounded-full border border-line-strong bg-bg-warm text-[color:var(--color-accent)] transition-all duration-500 group-hover:border-[color:var(--color-accent)] group-hover:bg-[color:var(--color-accent)] group-hover:text-white">
          {icon}
        </span>
      </header>

      {/* Title */}
      <h3
        className="font-serif font-normal tracking-[-0.022em] text-ink"
        style={{
          fontSize: "clamp(24px, 2.2vw, 32px)",
          lineHeight: 1.12,
        }}
      >
        {title}
      </h3>

      {/* Hairline that grows on hover */}
      <span
        aria-hidden
        className="block h-px w-12 bg-gradient-to-r from-[color:var(--color-gold)] to-transparent transition-all duration-500 group-hover:w-32"
      />

      {/* Body — verbatim from source */}
      <p className="text-[15.5px] leading-[1.65] text-ink-2">{body}</p>

      {/* Gold corner ornaments — fade in on hover */}
      <CornerMark position="tl" />
      <CornerMark position="tr" />
      <CornerMark position="bl" />
      <CornerMark position="br" />

      {/* Top hairline — sweeps in on hover */}
      <span
        aria-hidden
        className="pointer-events-none absolute left-0 top-0 h-px w-0 bg-[color:var(--color-accent)] transition-all duration-700 ease-out group-hover:w-full"
      />
    </motion.article>
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
      className={`pointer-events-none absolute z-[5] size-5 opacity-0 transition-all duration-500 ease-out group-hover:opacity-90 ${positionClass}`}
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
/*  TRUST SEAL — left-side parallax decoration                    */
/* ============================================================== */

function TrustSealIcon() {
  const stroke = "var(--color-accent)";
  const gold = "var(--color-gold)";
  return (
    <svg
      viewBox="0 0 180 380"
      className="h-auto w-full"
      fill="none"
      stroke={stroke}
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ opacity: 0.55 }}
    >
      {/* Wax-seal style ring at top */}
      <circle cx="90" cy="80" r="60" strokeOpacity="0.3" strokeWidth="0.8" />
      <circle cx="90" cy="80" r="48" strokeWidth="1.2" />
      <circle cx="90" cy="80" r="34" strokeOpacity="0.55" />
      {/* Gold star inside seal */}
      <path
        d="M 90 56 L 96 76 L 114 76 L 100 88 L 106 108 L 90 96 L 74 108 L 80 88 L 66 76 L 84 76 Z"
        fill={gold}
        stroke="none"
        opacity="0.85"
      />
      {/* Dotted outer ring */}
      <circle
        cx="90"
        cy="80"
        r="68"
        stroke={gold}
        strokeWidth="0.9"
        strokeDasharray="2 5"
        opacity="0.65"
      />
      {/* Vertical column connecting seal to pact */}
      <line x1="90" y1="148" x2="90" y2="240" strokeWidth="1.2" />
      <line
        x1="90"
        y1="160"
        x2="90"
        y2="226"
        strokeOpacity="0.3"
        strokeDasharray="2 3"
      />
      {/* Pact glyph — two interlocking arcs */}
      <path
        d="M 60 270 Q 75 250 90 270 Q 105 290 120 270"
        strokeWidth="1.4"
      />
      <path
        d="M 60 286 Q 75 306 90 286 Q 105 266 120 286"
        strokeWidth="1.4"
      />
      {/* Bottom plinth */}
      <line x1="50" y1="320" x2="130" y2="320" strokeOpacity="0.5" />
      <line x1="50" y1="316" x2="50" y2="324" strokeOpacity="0.5" />
      <line x1="130" y1="316" x2="130" y2="324" strokeOpacity="0.5" />
      <text
        x="90"
        y="338"
        textAnchor="middle"
        fontSize="7"
        fontFamily="serif"
        fontStyle="italic"
        fill={stroke}
        stroke="none"
        opacity="0.7"
      >
        EST. 2010
      </text>
    </svg>
  );
}

/* ============================================================== */
/*  BACKGROUND — cream + purple bloom + gold seam                 */
/* ============================================================== */

function MissionBackground() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      {/* Base wash — cream → soft purple at the bottom */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(168deg, #FAF6EC 0%, #F4EFE0 35%, #ECE7F2 70%, #E4DCEE 100%)",
        }}
      />

      {/* Slow rotating conic — accent + gold */}
      <div
        className="absolute -inset-1/4 opacity-[0.18]"
        style={{
          background:
            "conic-gradient(from 90deg at 50% 50%, transparent 0%, var(--color-accent-soft) 22%, transparent 45%, var(--color-gold-soft) 68%, transparent 90%, var(--color-accent-soft) 100%)",
          animation: "spin-slow 110s linear infinite",
          filter: "blur(50px)",
        }}
      />

      {/* Top-right purple bloom — frames the headline */}
      <div
        className="absolute -right-32 -top-24 size-[540px] rounded-full opacity-45 blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, rgba(90,42,156,0.32) 0%, transparent 70%)",
          animation: "mesh-1 30s var(--ease-soft) infinite",
        }}
      />

      {/* Bottom-left gold bloom — grounds the cards */}
      <div
        className="absolute -bottom-32 -left-28 size-[520px] rounded-full opacity-45 blur-[110px]"
        style={{
          background:
            "radial-gradient(circle, var(--color-gold-soft) 0%, transparent 70%)",
          animation: "mesh-2 32s var(--ease-soft) infinite",
        }}
      />

      {/* Centre pearl — softens the manifesto */}
      <div
        className="absolute left-1/2 top-1/3 size-[420px] -translate-x-1/2 rounded-full opacity-35 blur-[100px]"
        style={{
          background: "radial-gradient(circle, #FFFFFF 0%, transparent 65%)",
          animation: "mesh-3 30s var(--ease-soft) infinite",
        }}
      />
    </div>
  );
}
