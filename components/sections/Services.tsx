"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { services, servicesIntro, type Service } from "@/content";
import { reveal, revealContainer } from "@/lib/motion";
import { cn } from "@/lib/cn";

/**
 * Services section.
 *
 * Layout:
 *   1. Animated gradient mesh background (drift blobs + slow conic).
 *   2. Vertical "SERVICES" word on the left edge, rendered as text-stroke only
 *      (transparent fill + accent stroke). Translated by a scroll-driven
 *      parallax — moves up as the section scrolls past, opposite to the page
 *      flow, so it lingers visually.
 *   3. Section masthead.
 *   4. Three refined cards (shorter than before, content-driven height).
 *      Middle card is the dark "feature" variant.
 */
export function Services() {
  const sectionRef = useRef<HTMLElement>(null);

  // Drive parallax from this section's scroll progress: 0 when the section
  // first enters the viewport from below, 1 when it has fully scrolled past
  // the top. Translate the title from +25% to -25% Y for a relaxed parallax.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const titleY = useTransform(scrollYProgress, [0, 1], ["22%", "-22%"]);
  // Counter-parallax for the right-side stroke building — runs opposite
  // to the title so they pass each other as the user scrolls.
  const iconY = useTransform(scrollYProgress, [0, 1], ["-26%", "26%"]);
  const iconRotate = useTransform(scrollYProgress, [0, 1], [-3, 3]);
  // Card parallax — all three start aligned, then drift as the section
  // scrolls. Card 1 is the still anchor; card 2 drifts DOWN; card 3 UP.
  const card2Y = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const card3Y = useTransform(scrollYProgress, [0, 1], [0, -64]);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative overflow-hidden py-20 md:py-28"
    >
      <ServicesBackground />

      {/* Vertical SERVICES — text-stroke only, parallax-translated */}
      <motion.div
        aria-hidden
        style={{ y: titleY }}
        className="pointer-events-none absolute inset-y-0 left-[50px] z-[1] hidden w-[160px] items-center justify-center lg:flex"
      >
        <span
          className="block select-none whitespace-nowrap font-serif font-normal leading-none tracking-[-0.01em]"
          style={{
            fontSize: "clamp(120px, 14vw, 220px)",
            writingMode: "vertical-rl",
            WebkitTextStroke: "1.5px var(--color-accent)",
            color: "transparent",
            letterSpacing: "0.04em",
            opacity: 0.7,
          }}
        >
          Services
        </span>
      </motion.div>

      {/* Right-side stroke real-estate illustration — counter-parallax */}
      <motion.div
        aria-hidden
        style={{ y: iconY, rotate: iconRotate }}
        className="pointer-events-none absolute inset-y-0 right-[50px] z-[1] hidden w-[180px] items-center justify-center lg:flex"
      >
        <RealEstateStrokeIcon />
      </motion.div>

      {/* Section content */}
      <div className="container-x relative z-10">
        <motion.header
          variants={revealContainer}
          initial="hidden"
          animate="show"
          className="mb-12 ml-0 grid max-w-[720px] gap-4 md:mb-16 lg:ml-[120px]"
        >
          <motion.span variants={reveal} className="eyebrow">
            Services
          </motion.span>
          <motion.h2 variants={reveal} className="display-h2">
            Three lanes. <em>One advisor.</em>
          </motion.h2>
          <motion.p variants={reveal} className="lede">
            {servicesIntro.lede}
          </motion.p>
        </motion.header>

        <motion.div
          variants={revealContainer}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 items-stretch gap-4 md:grid-cols-3 md:gap-5 lg:ml-[120px]"
        >
          {services.map((s, i) => {
            // Outer wrapper handles the reveal animation (opacity/y rise on mount).
            // Inner motion.div handles the scroll-driven parallax — composes with
            // reveal because each level has its own transform.
            const parallaxY = i === 1 ? card2Y : i === 2 ? card3Y : undefined;
            return (
              <motion.div
                key={s.id}
                variants={reveal}
                className="h-full"
              >
                <motion.div className="h-full" style={{ y: parallaxY }}>
                  <ServiceCard service={s} index={i} />
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

/* ============================================================== */
/*  CARD                                                          */
/* ============================================================== */

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const num = String(index + 1).padStart(2, "0");
  const label = service.title.replace(" Services", "");

  return (
    // Plain <article>: hover micro-translate is CSS-only, no Framer needed here.
    // `h-full` stretches the card to the wrapper height so all three are equal.
    <article
      className={cn(
        "group relative flex h-full flex-col gap-4 overflow-hidden rounded-[18px] border p-6 transition-all duration-500 ease-out md:p-7",
        "hover:-translate-y-1 hover:shadow-soft",
        service.feature
          ? "border-ink bg-ink text-bg"
          : "border-line bg-bg-elev hover:border-line-strong",
      )}
    >
      {/* Top row */}
      <div className="flex items-center justify-between">
        <span
          className="font-serif text-[13px] tabular-nums tracking-[0.04em]"
          style={{ color: service.feature ? "#FFFFFF" : "#371072" }}
        >
          {num} / 03
        </span>
        <span
          className={cn(
            "text-[10.5px] font-medium uppercase tracking-[0.14em]",
            service.feature ? "text-bg/65" : "text-ink-3",
          )}
        >
          {label}
        </span>
      </div>

      {/* Hairline separator */}
      <div
        className={cn(
          "h-px w-full",
          service.feature ? "bg-bg/15" : "bg-line",
        )}
      />

      {/* Title */}
      <h3
        className={cn(
          "font-serif text-[24px] font-normal leading-[1.1] tracking-[-0.018em] md:text-[26px]",
          service.feature ? "text-bg" : "text-ink",
        )}
      >
        {service.title}
      </h3>

      {/* Body */}
      <p
        className={cn(
          "text-[13.5px] leading-[1.55]",
          service.feature ? "text-bg/[0.74]" : "text-ink-2",
        )}
      >
        {service.summary}
      </p>

      {/* CTA */}
      <a
        href="#contact"
        className={cn(
          "mt-auto inline-flex items-center gap-1.5 self-start pt-2 text-[12.5px] font-medium",
          service.feature ? "text-bg" : "text-ink",
        )}
      >
        Learn more
        <ArrowUpRight
          className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          strokeWidth={1.75}
        />
      </a>

      {/* Hover top accent — sweeps in from left */}
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute left-0 top-0 h-px w-0 transition-all duration-500 ease-out group-hover:w-full",
          service.feature ? "bg-gold" : "bg-accent",
        )}
      />
    </article>
  );
}

/* ============================================================== */
/*  REAL ESTATE STROKE ICON  (right-side parallax decoration)     */
/* ============================================================== */

function RealEstateStrokeIcon() {
  // Refined architectural elevation of a luxury townhouse.
  // Aesthetic reference: architect's facade drawing — restrained, asymmetric,
  // more "luxury home" than "generic condo".
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
      style={{ opacity: 0.6 }}
    >
      {/* Gold finial — pinpoint of richness above the roof */}
      <line x1="90" y1="36" x2="90" y2="20" stroke={gold} strokeWidth="1.2" />
      <circle cx="90" cy="18" r="2" fill={gold} stroke="none" />

      {/* Pitched roof */}
      <path d="M 28 90 L 90 36 L 152 90" strokeWidth="1.1" />

      {/* Chimney with cap */}
      <path d="M 122 58 L 122 40 L 134 40 L 134 70" />
      <line x1="119" y1="40" x2="137" y2="40" strokeWidth="1.1" />

      {/* Main facade */}
      <rect x="38" y="90" width="104" height="270" strokeWidth="1.1" />

      {/* Cornice line under roof */}
      <line x1="38" y1="100" x2="142" y2="100" strokeOpacity="0.5" />

      {/* Top floor — paired narrow windows */}
      <rect x="54" y="120" width="26" height="48" />
      <rect x="100" y="120" width="26" height="48" />
      <line x1="67" y1="120" x2="67" y2="168" strokeOpacity="0.4" />
      <line x1="113" y1="120" x2="113" y2="168" strokeOpacity="0.4" />
      <line x1="54" y1="144" x2="80" y2="144" strokeOpacity="0.4" />
      <line x1="100" y1="144" x2="126" y2="144" strokeOpacity="0.4" />

      {/* Floor divider */}
      <line x1="38" y1="184" x2="142" y2="184" strokeOpacity="0.35" />

      {/* Middle floor — picture window */}
      <rect x="48" y="200" width="84" height="52" />
      <line x1="90" y1="200" x2="90" y2="252" strokeOpacity="0.4" />
      <line x1="48" y1="226" x2="132" y2="226" strokeOpacity="0.4" />

      {/* Balcony railing — slim balusters */}
      <line x1="42" y1="260" x2="138" y2="260" strokeWidth="1.1" />
      {Array.from({ length: 13 }, (_, i) => 46 + i * 7.4).map((x) => (
        <line
          key={x}
          x1={x}
          y1="252"
          x2={x}
          y2="260"
          strokeOpacity="0.42"
          strokeWidth="0.8"
        />
      ))}
      <line x1="42" y1="266" x2="138" y2="266" strokeOpacity="0.4" />

      {/* Floor divider */}
      <line x1="38" y1="282" x2="142" y2="282" strokeOpacity="0.35" />

      {/* Ground floor — arched entrance */}
      <path
        d="M 70 348 L 70 305 Q 70 290 90 290 Q 110 290 110 305 L 110 348 Z"
        strokeWidth="1.1"
      />
      <line x1="90" y1="292" x2="90" y2="348" strokeOpacity="0.4" />
      <circle cx="103" cy="320" r="0.9" fill={stroke} stroke="none" />

      {/* Side lights flanking the door */}
      <rect x="46" y="306" width="16" height="42" />
      <line x1="46" y1="320" x2="62" y2="320" strokeOpacity="0.4" />
      <line x1="46" y1="334" x2="62" y2="334" strokeOpacity="0.4" />
      <rect x="118" y="306" width="16" height="42" />
      <line x1="118" y1="320" x2="134" y2="320" strokeOpacity="0.4" />
      <line x1="118" y1="334" x2="134" y2="334" strokeOpacity="0.4" />

      {/* Gold house-number plate */}
      <rect x="140" y="294" width="12" height="14" stroke={gold} strokeWidth="0.9" />

      {/* Steps */}
      <line x1="64" y1="354" x2="116" y2="354" strokeOpacity="0.45" />
      <line x1="60" y1="360" x2="120" y2="360" strokeOpacity="0.45" />
      <line x1="56" y1="366" x2="124" y2="366" strokeOpacity="0.45" />

      {/* Ground line — dashed */}
      <line
        x1="0"
        y1="378"
        x2="180"
        y2="378"
        strokeDasharray="3 5"
        strokeOpacity="0.3"
      />

      {/* Tree — right, taller */}
      <line x1="162" y1="378" x2="162" y2="346" strokeOpacity="0.4" />
      <circle cx="162" cy="338" r="9" strokeOpacity="0.4" />
      <line
        x1="162"
        y1="338"
        x2="162"
        y2="332"
        strokeOpacity="0.35"
      />

      {/* Tree — left, smaller */}
      <line x1="18" y1="378" x2="18" y2="358" strokeOpacity="0.35" />
      <circle cx="18" cy="352" r="6" strokeOpacity="0.35" />

      {/* Tiny ground tile detail under tree */}
      <line x1="155" y1="378" x2="169" y2="378" strokeOpacity="0.5" strokeWidth="1.1" />
    </svg>
  );
}

/* ============================================================== */
/*  BACKGROUND                                                    */
/* ============================================================== */

function ServicesBackground() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      {/* Base wash — cream → sage-cream diagonal */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, #FAFAF7 0%, #F4F1E6 45%, #ECEFE8 100%)",
        }}
      />

      {/* Slow rotating conic, very low opacity */}
      <div
        className="absolute -inset-1/4 opacity-[0.18]"
        style={{
          background:
            "conic-gradient(from 0deg at 50% 50%, transparent 0%, var(--color-accent-soft) 25%, transparent 45%, var(--color-gold-soft) 65%, transparent 85%, var(--color-accent-soft) 100%)",
          animation: "spin-slow 90s linear infinite",
          filter: "blur(40px)",
        }}
      />

      {/* Drifting accent bloom */}
      <div
        className="absolute right-[6%] top-[12%] size-[460px] rounded-full opacity-50 blur-[110px]"
        style={{
          background:
            "radial-gradient(circle, var(--color-accent-soft) 0%, transparent 70%)",
          animation: "mesh-1 26s var(--ease-soft) infinite",
        }}
      />

      {/* Drifting gold bloom */}
      <div
        className="absolute -bottom-32 left-[28%] size-[380px] rounded-full opacity-40 blur-[110px]"
        style={{
          background:
            "radial-gradient(circle, var(--color-gold-soft) 0%, transparent 70%)",
          animation: "mesh-2 32s var(--ease-soft) infinite",
        }}
      />

      {/* Faint cool bloom on the left */}
      <div
        className="absolute -left-20 top-[40%] size-[360px] rounded-full opacity-30 blur-[100px]"
        style={{
          background:
            "radial-gradient(circle, #DCE5D9 0%, transparent 70%)",
          animation: "mesh-3 28s var(--ease-soft) infinite",
        }}
      />
    </div>
  );
}
