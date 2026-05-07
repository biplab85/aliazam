"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, BadgeCheck } from "lucide-react";
import { site, trust } from "@/content";
import { reveal, revealContainer } from "@/lib/motion";

/**
 * Brokerage of record — premium three-card section.
 *
 * Each card is now a proper standalone surface (bordered, hover-lift) with:
 *   - A small "01 / 02 / 03" editorial index
 *   - A custom inline real-estate SVG illustration (house, skyline, phone)
 *   - Eyebrow + title + body
 *   - A trailing CTA / detail row with an arrow that slides on hover
 */
export function TrustStrip() {
  const mapsHref =
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent(
      `${site.brokerage}, ${site.address.line1}, ${site.address.city} ${site.address.postal}`,
    );

  return (
    <section className="relative bg-bg-elev">
      <div className="container-x py-20 md:py-24">
        {/* ---------- Section masthead ---------- */}
        <motion.div
          variants={revealContainer}
          initial="hidden"
          animate="show"
          className="mb-10 grid items-end gap-3 md:mb-14 md:grid-cols-[1fr_auto] md:gap-6"
        >
          <motion.div variants={reveal} className="grid gap-3">
            <span className="eyebrow">Brokerage of record</span>
            <h2 className="font-serif text-[clamp(28px,3.4vw,44px)] font-normal leading-[1.05] tracking-[-0.02em] text-ink">
              Practice grounded in <em className="text-accent">trust</em>,{" "}
              <br className="hidden lg:inline" />
              backed by full broker compliance.
            </h2>
          </motion.div>
          <motion.span
            variants={reveal}
            className="text-[11px] font-medium uppercase tracking-[0.14em] text-ink-3 md:justify-self-end"
          >
            Toronto, Canada · {trust.brokerageTagline}
          </motion.span>
        </motion.div>

        {/* ---------- Three premium cards ---------- */}
        <motion.div
          variants={revealContainer}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6"
        >
          {/* 1. Brokerage */}
          <Card
            number="01"
            eyebrow="Brokerage"
            illustration={<HouseIllustration />}
            title="Right At Home Realty Inc."
            sub={`Brokerage · ${trust.brokerageTagline}`}
            footer={
              <div className="flex flex-wrap gap-1.5">
                {[
                  "RECO Licensed",
                  "FSRA Mortgage Agent",
                  "Realtor®",
                  "TRREB Member",
                ].map((c) => (
                  <span
                    key={c}
                    className="inline-flex items-center gap-1.5 rounded-full border border-line bg-bg/40 px-2.5 py-1 text-[11px] font-medium text-ink-2"
                  >
                    <BadgeCheck className="size-3 text-accent" strokeWidth={2.2} />
                    {c}
                  </span>
                ))}
              </div>
            }
          />

          {/* 2. Visit */}
          <Card
            number="02"
            eyebrow="Visit by appointment"
            illustration={<SkylineIllustration />}
            title={site.address.line1}
            sub={`${site.address.city} · ${site.address.postal}`}
            footer={
              <a
                href={mapsHref}
                target="_blank"
                rel="noreferrer"
                className="group/link inline-flex items-center gap-1.5 self-start text-[13px] font-medium text-ink"
              >
                <span className="underline decoration-line-strong decoration-1 underline-offset-[6px] transition-colors group-hover/link:decoration-accent">
                  Open in Maps
                </span>
                <ArrowUpRight className="size-3.5 transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
              </a>
            }
          />

          {/* 3. Direct */}
          <Card
            number="03"
            eyebrow="Direct line"
            illustration={<PhoneIllustration />}
            title={
              <a
                href={`tel:${site.phone.replace(/\s/g, "")}`}
                className="block tabular-nums transition-colors hover:text-accent"
              >
                {site.phone}
              </a>
            }
            sub={
              <a
                href={`mailto:${site.email}`}
                className="text-ink-2 transition-colors hover:text-accent"
              >
                {site.email}
              </a>
            }
            footer={
              <p className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.14em] text-ink-3">
                <span className="size-[5px] rounded-full bg-accent [animation:pulse_2.6s_var(--ease)_infinite]" />
                Available Mon–Sat · 9am–7pm
              </p>
            }
          />
        </motion.div>
      </div>
    </section>
  );
}

/* ============================================================== */
/*  CARD                                                          */
/* ============================================================== */

function Card({
  number,
  eyebrow,
  illustration,
  title,
  sub,
  footer,
}: {
  number: string;
  eyebrow: string;
  illustration: React.ReactNode;
  title: React.ReactNode;
  sub?: React.ReactNode;
  footer?: React.ReactNode;
}) {
  return (
    <motion.article
      variants={reveal}
      className="group relative grid content-start gap-5 overflow-hidden rounded-[22px] border border-line bg-bg p-7 transition-all duration-500 ease-out hover:-translate-y-1 hover:border-line-strong hover:shadow-soft md:p-8"
    >
      {/* Top row: number + eyebrow */}
      <div className="flex items-center justify-between">
        <span className="font-serif text-[14px] tracking-[0.04em] tabular-nums text-gold">
          {number} / 03
        </span>
        <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-ink-3">
          {eyebrow}
        </span>
      </div>

      {/* Illustration */}
      <div className="relative">
        <div
          aria-hidden
          className="absolute -inset-6 rounded-full opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-60"
          style={{
            background:
              "radial-gradient(circle, var(--color-accent-soft) 0%, transparent 70%)",
          }}
        />
        <div className="relative flex h-[88px] items-end text-accent">
          {illustration}
        </div>
      </div>

      {/* Title + sub */}
      <div className="grid gap-2">
        <h3 className="font-serif text-[24px] font-normal leading-[1.15] tracking-[-0.015em] text-ink">
          {title}
        </h3>
        {sub && <div className="text-[13px] text-ink-3">{sub}</div>}
      </div>

      {/* Footer */}
      {footer && <div className="mt-2">{footer}</div>}

      {/* Top-right corner accent — appears on hover */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-0 h-px w-0 bg-accent transition-all duration-500 group-hover:w-full"
      />
    </motion.article>
  );
}

/* ============================================================== */
/*  ILLUSTRATIONS                                                 */
/* ============================================================== */

function HouseIllustration() {
  return (
    <svg
      viewBox="0 0 96 88"
      className="h-[80px] w-auto"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {/* Ground line */}
      <line
        x1="2"
        y1="80"
        x2="94"
        y2="80"
        strokeOpacity="0.25"
        strokeDasharray="2 4"
      />
      {/* Back house silhouette */}
      <path
        d="M 60 32 L 86 50 L 86 80 L 56 80 L 56 50 Z"
        strokeOpacity="0.35"
        strokeWidth="1.4"
      />
      {/* Front main house */}
      <path
        d="M 24 18 L 56 38 L 56 80 L 8 80 L 8 38 Z"
        strokeWidth="1.6"
      />
      {/* Roof inner line */}
      <line
        x1="24"
        y1="18"
        x2="24"
        y2="36"
        strokeOpacity="0.3"
        strokeWidth="1.2"
      />
      {/* Door */}
      <rect
        x="25"
        y="58"
        width="14"
        height="22"
        rx="0.5"
        strokeWidth="1.4"
      />
      <circle cx="35" cy="69" r="0.8" fill="currentColor" stroke="none" />
      {/* Window */}
      <rect x="42" y="50" width="10" height="10" strokeWidth="1.4" />
      <line x1="47" y1="50" x2="47" y2="60" strokeOpacity="0.5" strokeWidth="1" />
      <line x1="42" y1="55" x2="52" y2="55" strokeOpacity="0.5" strokeWidth="1" />
      {/* Tiny chimney */}
      <path
        d="M 16 25 L 16 18 L 20 18 L 20 28"
        strokeWidth="1.4"
      />
    </svg>
  );
}

function SkylineIllustration() {
  return (
    <svg
      viewBox="0 0 96 88"
      className="h-[80px] w-auto"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {/* Ground */}
      <line
        x1="2"
        y1="80"
        x2="94"
        y2="80"
        strokeOpacity="0.25"
        strokeDasharray="2 4"
      />
      {/* Buildings */}
      <rect x="6" y="50" width="14" height="30" strokeWidth="1.4" />
      <line x1="13" y1="56" x2="13" y2="62" strokeOpacity="0.5" />
      <line x1="13" y1="68" x2="13" y2="74" strokeOpacity="0.5" />

      <rect x="22" y="38" width="16" height="42" strokeWidth="1.5" />
      <line x1="26" y1="44" x2="34" y2="44" strokeOpacity="0.4" />
      <line x1="26" y1="52" x2="34" y2="52" strokeOpacity="0.4" />
      <line x1="26" y1="60" x2="34" y2="60" strokeOpacity="0.4" />
      <line x1="26" y1="68" x2="34" y2="68" strokeOpacity="0.4" />

      <rect x="40" y="56" width="12" height="24" strokeWidth="1.4" />
      <line x1="46" y1="62" x2="46" y2="78" strokeOpacity="0.5" />

      <rect x="54" y="44" width="14" height="36" strokeWidth="1.5" />
      <line x1="58" y1="50" x2="64" y2="50" strokeOpacity="0.4" />
      <line x1="58" y1="58" x2="64" y2="58" strokeOpacity="0.4" />
      <line x1="58" y1="66" x2="64" y2="66" strokeOpacity="0.4" />

      <rect x="70" y="52" width="20" height="28" strokeWidth="1.4" />
      {/* Floating location pin */}
      <g>
        <path
          d="M 76 8 C 81 8 84 11 84 16 C 84 22 76 30 76 30 C 76 30 68 22 68 16 C 68 11 71 8 76 8 Z"
          fill="currentColor"
          fillOpacity="0.12"
          strokeWidth="1.4"
        />
        <circle cx="76" cy="16" r="2.5" fill="currentColor" stroke="none" />
        {/* Pin shadow */}
        <ellipse
          cx="76"
          cy="34"
          rx="6"
          ry="1.2"
          fill="currentColor"
          fillOpacity="0.15"
          stroke="none"
        />
      </g>
    </svg>
  );
}

function PhoneIllustration() {
  return (
    <svg
      viewBox="0 0 96 88"
      className="h-[80px] w-auto"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {/* Sound waves — left of handset */}
      <path
        d="M 8 32 C 4 38 4 50 8 56"
        strokeOpacity="0.35"
        strokeWidth="1.4"
      />
      <path
        d="M 14 26 C 8 34 8 54 14 62"
        strokeOpacity="0.18"
        strokeWidth="1.4"
      />

      {/* Phone handset — stylized "J" curve */}
      <path
        d="M 26 18 C 22 18 18 22 18 28 L 18 60 C 18 70 28 80 42 80 L 56 80 C 64 80 70 74 70 66 L 70 60 C 70 56 66 52 62 54 L 54 56 C 50 58 46 56 44 52 L 36 38 C 34 34 36 30 40 28 L 44 26 C 50 22 46 14 38 14 Z"
        strokeWidth="1.6"
      />

      {/* Sound waves — right of handset */}
      <path
        d="M 76 24 C 82 30 82 38 76 44"
        strokeOpacity="0.5"
        strokeWidth="1.4"
      />
      <path
        d="M 84 18 C 92 28 92 42 84 52"
        strokeOpacity="0.3"
        strokeWidth="1.4"
      />

      {/* Tiny dot accent */}
      <circle cx="84" cy="74" r="2.5" fill="currentColor" stroke="none" />
    </svg>
  );
}
