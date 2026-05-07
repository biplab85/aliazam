"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Award, BadgeCheck, MapPin, ArrowUpRight } from "lucide-react";
import { about, site } from "@/content";
import { reveal, revealContainer } from "@/lib/motion";

/**
 * About Ali Azam — premium editorial layout.
 *
 *   1. Animated gradient mesh background (different palette: warm sand +
 *      soft sage so it breaks from the cream of Services and dawn of Process).
 *   2. Vertical "About" stroke title on the LEFT with scroll parallax.
 *   3. Counter-parallax decorative calligraphic SVG flourish on the RIGHT.
 *   4. Two-column grid: premium gradient-framed portrait + a floating
 *      "Established" stat badge overlapping the bottom corner.
 *   5. Editorial prose column with drop cap, magazine-style pull quote,
 *      mission paragraph, refined credential pills, and a hand-drawn
 *      "— Ali Azam" signature with an underline flourish.
 */

export function About() {
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
  const flourishY = useTransform(smooth, [0, 1], ["-26%", "26%"]);
  const flourishRotate = useTransform(smooth, [0, 1], [-3, 3]);

  // Subtle parallax on the portrait + prose for depth.
  const portraitY = useTransform(smooth, [0, 1], [40, -40]);
  const proseY = useTransform(smooth, [0, 1], [-30, 30]);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative overflow-hidden py-24 md:py-32"
    >
      <AboutBackground />

      {/* Vertical "About" stroke title — LEFT, parallax */}
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
            opacity: 0.6,
          }}
        >
          About
        </span>
      </motion.div>

      {/* Right-side calligraphic flourish — counter-parallax */}
      <motion.div
        aria-hidden
        style={{ y: flourishY, rotate: flourishRotate }}
        className="pointer-events-none absolute inset-y-0 right-[50px] z-[1] hidden w-[180px] items-center justify-center lg:flex"
      >
        <SignatureFlourish />
      </motion.div>

      <div className="container-x relative z-10">
        <div className="grid grid-cols-1 items-start gap-14 lg:grid-cols-[5fr_7fr] lg:gap-20 lg:px-[100px]">
          {/* ================ PORTRAIT COLUMN ================ */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0%" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="group relative max-w-[460px] lg:sticky lg:top-24 lg:self-start"
          >
            <motion.div style={{ y: portraitY }}>
              {/* IMAGE BLOCK — own positioning context so the floating
                  badges + corner ornaments stay anchored to the photo,
                  not to the info card below. */}
              <div className="relative">
              {/*
                MULTI-LAYER GALLERY FRAME
                  Layer 1 — outer conic gradient ring (3px)
                  Layer 2 — gold hairline trim (1px)
                  Layer 3 — cream matte gap (6px) — gives the frame "breathing room"
                  Layer 4 — inner accent hairline (1px)
                  Layer 5 — image well with subtle inner radial wash
                Plus deep accent-tinted drop shadow.
              */}
              <div
                className="relative rounded-[34px] p-[3px] shadow-deep transition-shadow duration-700 ease-out group-hover:shadow-[0_50px_110px_-20px_rgba(26,77,58,0.32),0_8px_20px_-4px_rgba(184,148,90,0.18)]"
                style={{
                  background:
                    "conic-gradient(from 130deg, var(--color-accent) 0%, #6E7E48 18%, var(--color-gold) 40%, #C9A87B 55%, var(--color-accent-2) 78%, var(--color-accent) 100%)",
                }}
              >
                {/* Layer 2 — gold trim */}
                <div
                  className="relative rounded-[31px] p-[1px]"
                  style={{
                    background:
                      "linear-gradient(135deg, #D4A968 0%, var(--color-gold) 50%, #D4A968 100%)",
                  }}
                >
                  {/* Layer 3 — cream matte */}
                  <div className="relative rounded-[30px] bg-bg-warm p-[6px]">
                    {/* Layer 4 — inner accent hairline */}
                    <div
                      className="relative rounded-[24px] p-[1px]"
                      style={{
                        background:
                          "linear-gradient(135deg, var(--color-accent-2) 0%, var(--color-accent) 100%)",
                      }}
                    >
                      {/* Layer 5 — image well */}
                      <div
                        className="relative aspect-[4/5] overflow-hidden rounded-[23px]"
                        style={{
                          background:
                            "radial-gradient(circle at 30% 25%, #6B5A38 0%, transparent 55%), radial-gradient(circle at 70% 70%, #2D2D2A 0%, transparent 60%), linear-gradient(160deg, #B8945A 0%, #4A3A1F 100%)",
                        }}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={about.portrait}
                          alt={`${about.name} — portrait`}
                          className="absolute inset-0 size-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.045]"
                          loading="lazy"
                          onError={(e) => {
                            (
                              e.currentTarget as HTMLImageElement
                            ).style.display = "none";
                          }}
                        />
                        {/* Soft vignette */}
                        <div
                          aria-hidden
                          className="pointer-events-none absolute inset-0 transition-opacity duration-700"
                          style={{
                            background:
                              "linear-gradient(to top, rgba(10,10,10,0.34) 0%, transparent 48%)",
                          }}
                        />
                        {/* Subtle inner glow on hover */}
                        <div
                          aria-hidden
                          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                          style={{
                            background:
                              "radial-gradient(circle at 50% 30%, rgba(255,255,255,0.10) 0%, transparent 60%)",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Permanent gold corner ornaments — gallery-frame motif */}
              <CornerOrnament position="tl" />
              <CornerOrnament position="tr" />
              <CornerOrnament position="bl" />
              <CornerOrnament position="br" />

              {/* Floating "Established" stat badge — overlaps bottom-right */}
              <motion.div
                initial={{ opacity: 0, x: 24, y: 24 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true, margin: "-5% 0%" }}
                transition={{
                  duration: 0.9,
                  delay: 0.4,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="absolute -bottom-7 -right-4 z-10 flex items-center gap-3 rounded-2xl border border-line bg-bg-elev/95 px-4 py-3 shadow-deep backdrop-blur-sm md:-right-8 md:px-5 md:py-3.5"
              >
                <span className="grid size-10 place-items-center rounded-xl bg-accent-soft">
                  <Award className="size-[18px] text-accent" strokeWidth={1.6} />
                </span>
                <div className="grid">
                  <span className="text-[10.5px] font-medium uppercase tracking-[0.14em] text-ink-3">
                    Established
                  </span>
                  <span className="font-serif text-[18px] font-normal tracking-[-0.01em] text-ink">
                    2010 · 15+ yrs
                  </span>
                </div>
              </motion.div>

              {/* Floating "GTA" location pill — overlaps top-left */}
              <motion.div
                initial={{ opacity: 0, x: -16, y: -16 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true, margin: "-5% 0%" }}
                transition={{
                  duration: 0.9,
                  delay: 0.55,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="absolute -left-3 top-6 z-10 inline-flex items-center gap-2 rounded-full bg-bg-elev/95 px-3.5 py-1.5 shadow-soft backdrop-blur-sm md:-left-5"
              >
                <MapPin
                  className="size-3 text-accent"
                  strokeWidth={2}
                />
                <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-ink-2">
                  Greater Toronto Area
                </span>
              </motion.div>

              {/* Existing portrait tag — kept */}
              <span className="absolute bottom-[22px] left-[22px] z-10 inline-flex items-center gap-2 rounded-full bg-bg/95 px-4 py-2.5 text-xs font-medium text-ink backdrop-blur transition-transform duration-500 ease-out group-hover:-translate-y-1">
                <span className="size-1.5 rounded-full bg-accent" />
                {about.name} · Realtor &amp; Mortgage Agent
              </span>
              </div>
              {/* /IMAGE BLOCK */}

              {/* AT-A-GLANCE INFO CARD — fills the column under the portrait */}
              <motion.aside
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10% 0%" }}
                transition={{
                  duration: 0.9,
                  delay: 0.45,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="mt-14 rounded-[24px] border border-line bg-bg-elev/85 p-6 shadow-soft backdrop-blur-sm md:p-7"
              >
                {/* Card header */}
                <div className="mb-5 flex items-center justify-between">
                  <span className="text-[10.5px] font-medium uppercase tracking-[0.16em] text-ink-3">
                    At a glance
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-[10.5px] font-medium uppercase tracking-[0.14em] text-ink-3">
                    <span className="size-1.5 rounded-full bg-emerald-500 [animation:pulse_2.6s_var(--ease)_infinite]" />
                    Available
                  </span>
                </div>

                {/* Info rows */}
                <dl className="grid gap-3.5">
                  <InfoRow
                    label="Service area"
                    value="GTA · Peterborough · Oshawa"
                  />
                  <InfoRow
                    label="Practice"
                    value="Real estate + mortgage advisory"
                  />
                  <InfoRow
                    label="Brokerage"
                    value="Right At Home Realty Inc."
                  />
                  <InfoRow
                    label="Hours"
                    value="Mon–Sat · 9am–7pm EST"
                  />
                </dl>

                {/* CTA pill */}
                <a
                  href={`tel:${site.phone.replace(/\s/g, "")}`}
                  className="group/cta mt-6 inline-flex w-full items-center justify-between gap-2 rounded-full border border-line-strong bg-bg/60 px-5 py-3 text-[13.5px] font-medium text-ink transition-all duration-300 hover:border-ink hover:bg-ink hover:text-bg"
                >
                  <span className="tabular-nums">{site.phone}</span>
                  <ArrowUpRight
                    className="size-4 transition-transform duration-300 group-hover/cta:-translate-y-0.5 group-hover/cta:translate-x-0.5"
                    strokeWidth={1.75}
                  />
                </a>
              </motion.aside>
            </motion.div>
          </motion.div>

          {/* ================ PROSE COLUMN ================ */}
          <motion.div
            variants={revealContainer}
            initial="hidden"
            animate="show"
            className="relative"
          >
            <motion.div style={{ y: proseY }}>
              <motion.span variants={reveal} className="eyebrow mb-6">
                About Ali Azam
              </motion.span>

              <motion.h2
                variants={reveal}
                className="display-h2 mb-7 max-w-[18ch]"
              >
                Trusted, reliable, <em>and quietly thorough.</em>
              </motion.h2>

              {/* Body — first paragraph with drop cap */}
              <motion.div
                variants={reveal}
                className="max-w-[60ch] space-y-[18px] text-[17px] leading-[1.7] text-ink-2"
              >
                <p className="[&::first-letter]:float-left [&::first-letter]:pr-3 [&::first-letter]:pt-1.5 [&::first-letter]:font-serif [&::first-letter]:text-[64px] [&::first-letter]:leading-[0.9] [&::first-letter]:text-accent">
                  {about.bio}
                </p>
              </motion.div>

              {/* Magazine-style pull quote */}
              <motion.figure
                variants={reveal}
                className="my-12 max-w-[42ch] border-l-2 border-accent pl-6 md:my-14 md:pl-8"
              >
                <span
                  aria-hidden
                  className="mb-3 block font-serif text-[42px] leading-none text-accent"
                >
                  &ldquo;
                </span>
                <blockquote className="font-serif text-[clamp(22px,2.4vw,32px)] font-normal leading-[1.25] tracking-[-0.015em] text-ink">
                  <em>
                    One advisor, the full picture &mdash; financing, market timing, and the long-term hold.
                  </em>
                </blockquote>
              </motion.figure>

              {/* Mission */}
              <motion.p
                variants={reveal}
                className="max-w-[60ch] text-[17px] leading-[1.7] text-ink-2"
              >
                {about.mission}
              </motion.p>

              {/* Credentials — refined pills with check icons */}
              <motion.div
                variants={reveal}
                className="mt-10 flex flex-wrap gap-2"
              >
                {about.credentials.map((c) => (
                  <span
                    key={c}
                    className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-bg-elev/70 px-3.5 py-2 text-[12.5px] font-medium text-ink-2 backdrop-blur-sm"
                  >
                    <BadgeCheck
                      className="size-3.5 text-accent"
                      strokeWidth={2.2}
                    />
                    {c}
                  </span>
                ))}
              </motion.div>

              {/* Signature row */}
              <motion.div
                variants={reveal}
                className="mt-14 flex items-center gap-4 border-t border-line pt-7"
              >
                <span className="grid size-12 place-items-center rounded-full border border-line-strong bg-bg-warm font-serif text-[18px] tracking-[-0.02em] text-ink">
                  AA
                </span>
                <div className="flex-1">
                  <p className="font-serif text-[20px] leading-tight tracking-[-0.01em] text-ink">
                    <em className="text-accent">— Ali Azam</em>
                  </p>
                  <p className="mt-1 text-[11px] font-medium uppercase tracking-[0.14em] text-ink-3">
                    Realtor® · FSRA Mortgage Agent · since 2010
                  </p>
                </div>
                {/* Hand-drawn underline flourish next to signature */}
                <svg
                  aria-hidden
                  viewBox="0 0 80 30"
                  className="hidden h-8 w-20 text-accent md:block"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M 4 16 Q 24 4, 50 14 T 76 12" />
                  <circle cx="76" cy="12" r="1.6" fill="currentColor" stroke="none" />
                </svg>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================== */
/*  INFO ROW — label / value pair inside the "At a glance" card   */
/* ============================================================== */

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid gap-1 border-b border-line pb-3.5 last:border-0 last:pb-0">
      <dt className="text-[10px] font-medium uppercase tracking-[0.16em] text-ink-3">
        {label}
      </dt>
      <dd className="text-[14px] font-medium tracking-[-0.005em] text-ink">
        {value}
      </dd>
    </div>
  );
}

/* ============================================================== */
/*  CORNER ORNAMENT — gallery-frame decorative L-marks            */
/* ============================================================== */

function CornerOrnament({
  position,
}: {
  position: "tl" | "tr" | "bl" | "br";
}) {
  const positionClass = {
    tl: "-left-3 -top-3",
    tr: "-right-3 -top-3",
    bl: "-bottom-3 -left-3",
    br: "-bottom-3 -right-3",
  }[position];
  const rotateDeg = {
    tl: 0,
    tr: 90,
    br: 180,
    bl: 270,
  }[position];

  return (
    <span
      aria-hidden
      className={`pointer-events-none absolute ${positionClass} z-10 size-7 transition-transform duration-500 ease-out group-hover:scale-110`}
      style={{ transform: `rotate(${rotateDeg}deg)` }}
    >
      <svg
        viewBox="0 0 28 28"
        fill="none"
        stroke="var(--color-gold)"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Outer L bracket */}
        <path d="M 2 14 L 2 2 L 14 2" />
        {/* Inner thinner L bracket */}
        <path
          d="M 6 14 L 6 6 L 14 6"
          strokeOpacity="0.5"
          strokeWidth="1"
        />
        {/* Tiny accent dot at the corner inside */}
        <circle cx="6" cy="6" r="1" fill="var(--color-gold)" stroke="none" />
        {/* Decorative diagonal flourish */}
        <path
          d="M 9 2 L 11 4"
          stroke="var(--color-accent)"
          strokeWidth="1.2"
          strokeOpacity="0.7"
        />
        <path
          d="M 2 9 L 4 11"
          stroke="var(--color-accent)"
          strokeWidth="1.2"
          strokeOpacity="0.7"
        />
      </svg>
    </span>
  );
}

/* ============================================================== */
/*  SIGNATURE FLOURISH — right-side parallax decoration           */
/* ============================================================== */

function SignatureFlourish() {
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
      {/* Top monogram badge */}
      <circle cx="90" cy="46" r="32" strokeWidth="1.2" />
      <circle cx="90" cy="46" r="22" strokeOpacity="0.45" />
      {/* "AA" tucked inside */}
      <text
        x="90"
        y="56"
        textAnchor="middle"
        fontSize="22"
        fontFamily="serif"
        fontStyle="italic"
        fill={stroke}
        stroke="none"
        opacity="0.85"
      >
        AA
      </text>

      {/* Calligraphic flourish — long curve flowing downward */}
      <path
        d="M 60 96 C 90 110, 120 130, 100 160 C 80 190, 110 210, 130 240 C 150 270, 80 290, 60 310 C 40 330, 110 340, 140 350"
        strokeWidth="1.4"
      />

      {/* Decorative dots along the path */}
      <circle cx="100" cy="160" r="1.5" fill={stroke} stroke="none" opacity="0.7" />
      <circle cx="130" cy="240" r="1.5" fill={stroke} stroke="none" opacity="0.7" />
      <circle cx="60" cy="310" r="1.5" fill={stroke} stroke="none" opacity="0.7" />

      {/* End dot — punctuation */}
      <circle cx="140" cy="350" r="3" fill={gold} stroke="none" />

      {/* Tiny star accents */}
      <path
        d="M 30 130 L 32 134 L 30 138 L 28 134 Z"
        fill={gold}
        stroke="none"
        opacity="0.8"
      />
      <path
        d="M 150 200 L 152 204 L 150 208 L 148 204 Z"
        fill={gold}
        stroke="none"
        opacity="0.8"
      />

      {/* Gold dotted ring around monogram */}
      <circle
        cx="90"
        cy="46"
        r="38"
        stroke={gold}
        strokeWidth="0.9"
        strokeDasharray="2 5"
        opacity="0.85"
      />
    </svg>
  );
}

/* ============================================================== */
/*  BACKGROUND — warm sand + soft sage gradient mesh              */
/* ============================================================== */

function AboutBackground() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      {/* Base wash */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(140deg, #ECE9E0 0%, #F4F0E5 30%, #FAFAF7 55%, #ECEFE8 80%, #DEE6DC 100%)",
        }}
      />

      {/* Slow conic */}
      <div
        className="absolute -inset-1/4 opacity-[0.20]"
        style={{
          background:
            "conic-gradient(from 45deg at 50% 50%, transparent 0%, var(--color-gold-soft) 22%, transparent 45%, var(--color-accent-soft) 68%, transparent 90%, var(--color-gold-soft) 100%)",
          animation: "spin-slow 120s linear infinite",
          filter: "blur(50px)",
        }}
      />

      {/* Top-right gold bloom */}
      <div
        className="absolute -right-32 -top-24 size-[560px] rounded-full opacity-50 blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, var(--color-gold-soft) 0%, transparent 70%)",
          animation: "mesh-1 30s var(--ease-soft) infinite",
        }}
      />

      {/* Bottom-left sage bloom */}
      <div
        className="absolute -bottom-32 -left-32 size-[520px] rounded-full opacity-45 blur-[110px]"
        style={{
          background:
            "radial-gradient(circle, var(--color-accent-soft) 0%, transparent 70%)",
          animation: "mesh-2 34s var(--ease-soft) infinite",
        }}
      />

      {/* Center white bloom for headline glow */}
      <div
        className="absolute left-1/2 top-1/3 size-[420px] -translate-x-1/2 rounded-full opacity-40 blur-[110px]"
        style={{
          background: "radial-gradient(circle, #FFFFFF 0%, transparent 65%)",
          animation: "mesh-3 28s var(--ease-soft) infinite",
        }}
      />

      {/* Right warm peach drift */}
      <div
        className="absolute right-[5%] bottom-[15%] size-[380px] rounded-full opacity-35 blur-[100px]"
        style={{
          background: "radial-gradient(circle, #F5E0C5 0%, transparent 70%)",
          animation: "mesh-1 32s var(--ease-soft) infinite",
          animationDelay: "-10s",
        }}
      />
    </div>
  );
}
