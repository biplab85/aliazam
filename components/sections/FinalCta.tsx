"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Mail, ArrowUpRight } from "lucide-react";
import { finalCta, site, about } from "@/content";
import { reveal, revealContainer } from "@/lib/motion";

/**
 * Final CTA — "Get in touch".
 *
 * One premium invitation card replaces the previous 3-card layout.
 *
 *   - Background: twilight gradient mesh (cool — different palette from
 *     Services + Process).
 *   - Vertical "Contact" stroke title on the LEFT with parallax.
 *   - Counter-parallax stroke KEY illustration on the RIGHT.
 *   - Center stage: a single bordered "invitation card" with an inner radial
 *     mesh, status pill, italic-accent headline, lede, an oversized clickable
 *     phone number as the centrepiece, dual CTAs, signature row + compliance,
 *     and animated corner brackets that fade in on hover.
 *   - The card itself parallaxes lightly so the section keeps the scroll
 *     rhythm of the rest of the page without going back to a 3-card pattern.
 */

export function FinalCta() {
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

  const titleY = useTransform(smooth, [0, 1], ["22%", "-22%"]);
  const iconY = useTransform(smooth, [0, 1], ["-26%", "26%"]);
  const iconRotate = useTransform(smooth, [0, 1], [3, -3]);

  // Subtle card parallax — keeps the section feeling alive without 3 cards.
  const cardY = useTransform(smooth, [0, 1], [40, -40]);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative overflow-hidden py-24 md:py-32"
    >
      <FinalCtaBackground />

      {/* Vertical "Contact" — left, accent stroke + parallax */}
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
            opacity: 0.62,
          }}
        >
          Contact
        </span>
      </motion.div>

      {/* Right-side stroke KEY — counter-parallax */}
      <motion.div
        aria-hidden
        style={{ y: iconY, rotate: iconRotate }}
        className="pointer-events-none absolute inset-y-0 right-[50px] z-[1] hidden w-[180px] items-center justify-center lg:flex"
      >
        <KeyStrokeIcon />
      </motion.div>

      <div className="container-x relative z-10">
        <motion.div
          variants={revealContainer}
          initial="hidden"
          animate="show"
          className="mx-auto max-w-[820px] lg:mx-[160px] lg:max-w-none"
        >
          <motion.div variants={reveal}>
            <motion.div style={{ y: cardY }}>
              <InvitationCard />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ============================================================== */
/*  INVITATION CARD                                               */
/* ============================================================== */

function InvitationCard() {
  const telHref = `tel:${site.phone.replace(/\s/g, "")}`;
  const mailHref = `mailto:${site.email}`;

  return (
    <article className="group relative overflow-hidden rounded-[28px] border border-line-strong bg-bg-elev/85 p-8 shadow-deep backdrop-blur-md md:p-12 lg:p-16">
      {/* Inner ambient mesh — soft accent + gold blooms inside the card */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(circle at 78% 18%, var(--color-accent-soft) 0%, transparent 50%), radial-gradient(circle at 18% 86%, var(--color-gold-soft) 0%, transparent 55%)",
          opacity: 0.7,
        }}
      />

      {/* Status pill */}
      <div className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-line bg-bg-elev/90 px-3.5 py-1.5 backdrop-blur-sm">
        <span className="relative inline-flex size-2.5 items-center justify-center">
          <span className="absolute inline-flex size-full rounded-full bg-emerald-500 opacity-55 [animation:ping_2.4s_cubic-bezier(0,0,0.2,1)_infinite]" />
          <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
        </span>
        <span className="text-[12px] font-medium text-ink-2">
          Now accepting consultations
        </span>
      </div>

      {/* Headline */}
      <h2
        className="font-serif font-normal tracking-[-0.025em] text-ink"
        style={{
          fontSize: "clamp(36px, 5vw, 64px)",
          lineHeight: 1.04,
        }}
      >
        Helping you find{" "}
        <em className="text-accent">the best property.</em>
      </h2>

      {/* Lede */}
      <p className="mt-6 max-w-[58ch] text-[17px] leading-[1.6] text-ink-2">
        {finalCta.sub}
      </p>

      {/* The centrepiece — oversized clickable phone number */}
      <a href={telHref} className="group/tel mt-12 block">
        <span className="mb-2 block text-[10.5px] font-medium uppercase tracking-[0.18em] text-ink-3">
          Or call directly
        </span>
        <span
          className="block font-serif tabular-nums text-ink transition-colors duration-300 group-hover/tel:text-accent"
          style={{
            fontSize: "clamp(38px, 5vw, 68px)",
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
          }}
        >
          {site.phone}
        </span>
      </a>

      {/* Eyebrow divider */}
      <div className="my-10 flex items-center gap-3">
        <span className="h-px w-10 bg-accent" />
        <span className="text-[10.5px] font-medium uppercase tracking-[0.18em] text-ink-3">
          or schedule a call
        </span>
        <span className="h-px flex-1 bg-line" />
      </div>

      {/* CTAs */}
      <div className="flex flex-wrap items-center gap-3">
        <a
          href={finalCta.primary.href}
          className="btn btn-primary px-7 py-4 text-base"
        >
          Book a 15-min consult <span className="arrow">→</span>
        </a>
        <a
          href={mailHref}
          className="btn btn-ghost px-6 py-4 text-base"
        >
          <Mail className="size-4" strokeWidth={1.75} />
          Email Ali
          <ArrowUpRight
            className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            strokeWidth={1.75}
          />
        </a>
      </div>

      {/* Footer row — signature + compliance */}
      <div className="mt-14 grid gap-5 border-t border-line pt-7 md:grid-cols-[1fr_auto] md:items-center">
        {/* Signature */}
        <div className="flex items-center gap-3.5">
          <span className="grid size-12 place-items-center rounded-full border border-line-strong bg-bg-warm font-serif text-[18px] tracking-[-0.02em] text-ink">
            AA
          </span>
          <div>
            <p className="font-serif text-[18px] tracking-[-0.01em] text-ink">
              <em className="text-accent">— Ali Azam</em>
            </p>
            <p className="mt-0.5 text-[11px] font-medium uppercase tracking-[0.14em] text-ink-3">
              {about.name === "Ali Azam"
                ? "Realtor® · Mortgage Agent · since 2010"
                : "Realtor since 2010"}
            </p>
          </div>
        </div>

        {/* Trust marks */}
        <div className="flex flex-wrap gap-x-3 gap-y-2 text-[11px] font-medium uppercase tracking-[0.14em] text-ink-3 md:justify-end">
          <span>RECO Licensed</span>
          <span className="text-line-strong">·</span>
          <span>FSRA Agent</span>
          <span className="text-line-strong">·</span>
          <span>Right At Home Realty</span>
        </div>
      </div>

      {/* Decorative corner brackets — fade in on card hover */}
      <span
        aria-hidden
        className="pointer-events-none absolute -left-1 -top-1 size-5 rounded-tl-[10px] border-l-2 border-t-2 border-accent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute -right-1 -top-1 size-5 rounded-tr-[10px] border-r-2 border-t-2 border-accent opacity-0 transition-opacity duration-500 delay-75 group-hover:opacity-100"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute -bottom-1 -left-1 size-5 rounded-bl-[10px] border-b-2 border-l-2 border-accent opacity-0 transition-opacity duration-500 delay-150 group-hover:opacity-100"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute -bottom-1 -right-1 size-5 rounded-br-[10px] border-b-2 border-r-2 border-accent opacity-0 transition-opacity duration-500 delay-200 group-hover:opacity-100"
      />

      {/* Top hairline accent — sweeps across on hover */}
      <span
        aria-hidden
        className="pointer-events-none absolute left-0 top-0 h-px w-0 bg-accent transition-all duration-700 ease-out group-hover:w-full"
      />
    </article>
  );
}

/* ============================================================== */
/*  KEY STROKE ICON  (right-side parallax decoration)             */
/* ============================================================== */

function KeyStrokeIcon() {
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
      style={{ opacity: 0.6 }}
    >
      <circle cx="90" cy="64" r="50" strokeOpacity="0.32" strokeWidth="0.8" />
      <circle cx="90" cy="64" r="38" strokeWidth="1.4" />
      <circle cx="90" cy="64" r="24" strokeOpacity="0.45" />
      <circle cx="90" cy="64" r="4" fill={stroke} stroke="none" />
      <line x1="50" y1="64" x2="42" y2="64" strokeOpacity="0.5" strokeWidth="1.2" />
      <line x1="130" y1="64" x2="138" y2="64" strokeOpacity="0.5" strokeWidth="1.2" />
      <line x1="90" y1="22" x2="90" y2="14" strokeOpacity="0.5" strokeWidth="1.2" />
      <circle
        cx="90"
        cy="64"
        r="44"
        stroke={gold}
        strokeWidth="0.9"
        strokeDasharray="2 5"
        opacity="0.85"
      />
      <line x1="90" y1="102" x2="90" y2="320" strokeWidth="1.5" />
      <line
        x1="90"
        y1="120"
        x2="90"
        y2="280"
        strokeOpacity="0.3"
        strokeDasharray="2 3"
      />
      <path d="M 90 268 L 102 268 L 102 280 L 90 280" strokeWidth="1.4" />
      <path d="M 90 290 L 108 290 L 108 304 L 90 304" strokeWidth="1.4" />
      <path d="M 90 312 L 100 312 L 100 322 L 90 322" strokeWidth="1.4" />
      <line x1="90" y1="322" x2="90" y2="334" strokeWidth="1.4" />
      <circle cx="90" cy="338" r="2.2" fill={stroke} stroke="none" />
      <line x1="50" y1="100" x2="50" y2="118" strokeOpacity="0.5" />
      <rect
        x="42"
        y="118"
        width="16"
        height="10"
        strokeOpacity="0.6"
        strokeWidth="1.2"
        stroke={gold}
      />
      <line
        x1="46"
        y1="123"
        x2="54"
        y2="123"
        strokeOpacity="0.7"
        stroke={gold}
        strokeWidth="0.8"
      />
    </svg>
  );
}

/* ============================================================== */
/*  BACKGROUND — twilight gradient                                */
/* ============================================================== */

function FinalCtaBackground() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(170deg, #FAFAF7 0%, #ECEFE8 32%, #DCE5DD 60%, #E1E0D5 85%, #F2EAD9 100%)",
        }}
      />
      <div
        className="absolute -inset-1/4 opacity-[0.22]"
        style={{
          background:
            "conic-gradient(from 180deg at 50% 50%, transparent 0%, var(--color-accent-soft) 22%, transparent 45%, var(--color-gold-soft) 68%, transparent 90%, var(--color-accent-soft) 100%)",
          animation: "spin-slow 110s linear infinite",
          filter: "blur(50px)",
        }}
      />
      <div
        className="absolute -right-32 -top-32 size-[600px] rounded-full opacity-55 blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, var(--color-accent-soft) 0%, transparent 70%)",
          animation: "mesh-1 30s var(--ease-soft) infinite",
        }}
      />
      <div
        className="absolute -bottom-36 -left-36 size-[540px] rounded-full opacity-50 blur-[110px]"
        style={{
          background:
            "radial-gradient(circle, var(--color-gold-soft) 0%, transparent 70%)",
          animation: "mesh-2 34s var(--ease-soft) infinite",
        }}
      />
      <div
        className="absolute left-1/2 top-1/3 size-[460px] -translate-x-1/2 rounded-full opacity-45 blur-[110px]"
        style={{
          background:
            "radial-gradient(circle, #FFFFFF 0%, transparent 65%)",
          animation: "mesh-3 28s var(--ease-soft) infinite",
        }}
      />
      <div
        className="absolute right-[10%] bottom-[10%] size-[380px] rounded-full opacity-35 blur-[100px]"
        style={{
          background: "radial-gradient(circle, #DCE5D9 0%, transparent 70%)",
          animation: "mesh-1 32s var(--ease-soft) infinite",
          animationDelay: "-12s",
        }}
      />
    </div>
  );
}
