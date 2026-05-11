"use client";

import { useEffect, useRef, useState } from "react";
import {
  animate,
  motion,
  useInView,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import {
  Award,
  BadgeCheck,
  Mail,
  MapPin,
  Phone,
  Printer,
  Smartphone,
} from "lucide-react";
import { aboutPage, site } from "@/content";
import { reveal, revealContainer } from "@/lib/motion";

/**
 * About page — every string lives in `content.tsx#aboutPage`. This file
 * is now purely composition + visual treatment. Copy edits happen in
 * content.tsx, not here.
 */

/* ============================================================== */
/*  HERO — premium editorial typography + bespoke monogram crest  */
/* ============================================================== */

export function AboutPageHero() {
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
  // Vertical "About" title drifts opposite to scroll — full-height column
  // on the right edge. Mirrors the section-title language used across the
  // home page (Listings, Process, FinalCta).
  const titleY = useTransform(smooth, [0, 1], ["18%", "-22%"]);
  // Crest counter-parallax + slow rotation — reads as a brass medallion.
  const crestY = useTransform(smooth, [0, 1], [30, -30]);
  const crestRotate = useTransform(smooth, [0, 1], [-6, 6]);
  // Headline rises a touch faster than the crest for a layered feel.
  const headlineY = useTransform(smooth, [0, 1], [0, -24]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden pb-16 pt-28 md:pb-20 md:pt-32"
    >
      <HeroBackground />
      <DotGrid />

      {/* Vertical stroke title — RIGHT, accent purple, parallax. Label
          comes from content.tsx so copy can be edited without touching JSX. */}
      <motion.div
        aria-hidden
        style={{ y: titleY }}
        className="pointer-events-none absolute bottom-0 right-[24px] top-[130px] z-[1] hidden w-[140px] items-center justify-center md:flex lg:right-[40px] lg:w-[160px]"
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
          {aboutPage.hero.titleStroke}
        </span>
      </motion.div>

      {/* Year stamp — top-left, serif italic Roman numerals */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="pointer-events-none absolute left-[60px] top-[112px] z-[2] hidden flex-col items-start gap-1 lg:flex"
      >
        <span className="text-[10.5px] font-medium uppercase tracking-[0.22em] text-ink-3">
          {aboutPage.hero.yearStamp.label}
        </span>
        <span
          className="font-serif italic leading-none tracking-[-0.02em] text-[color:var(--color-gold)]"
          style={{ fontSize: "40px" }}
        >
          {aboutPage.hero.yearStamp.roman}
        </span>
        <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-ink-3">
          {aboutPage.hero.yearStamp.year}
        </span>
      </motion.div>

      <div className="container-x relative z-10">
        <motion.div
          variants={revealContainer}
          initial="hidden"
          animate="show"
          className="grid items-center gap-12 md:grid-cols-[1.25fr_0.75fr] md:gap-16 lg:mx-[40px]"
        >
          {/* ============== LEFT — editorial typography ============== */}
          <motion.div style={{ y: headlineY }} className="grid gap-7">
            {/* Eyebrow with hairline */}
            <motion.div
              variants={reveal}
              className="flex items-center gap-3.5"
            >
              <span className="h-px w-16 bg-[color:var(--color-gold)]" />
              <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-ink-2">
                {aboutPage.hero.eyebrow}
              </span>
            </motion.div>

            {/* Massive display headline — editorial scale */}
            <motion.h1
              variants={reveal}
              className="font-serif font-normal text-ink"
              style={{
                fontSize: "clamp(64px, 11vw, 168px)",
                lineHeight: 0.92,
                letterSpacing: "-0.035em",
              }}
            >
              {aboutPage.hero.headline.lead}{" "}
              <em
                className="text-accent"
                style={{ fontStyle: "italic" }}
              >
                {aboutPage.hero.headline.emphasis}
              </em>
            </motion.h1>

            {/* Italic strapline — verbatim from content.tsx */}
            <motion.p
              variants={reveal}
              className="max-w-[58ch] font-serif italic leading-[1.45] tracking-[-0.005em] text-ink-2"
              style={{ fontSize: "clamp(20px, 1.8vw, 26px)" }}
            >
              {aboutPage.hero.strapline}
            </motion.p>

            {/* Credential pills */}
            <motion.div
              variants={reveal}
              className="flex flex-wrap items-center gap-2.5 pt-2"
            >
              {aboutPage.hero.credentials.map((c) => (
                <CredentialPill key={c}>{c}</CredentialPill>
              ))}
            </motion.div>
          </motion.div>

          {/* ============== RIGHT — bespoke monogram crest ============== */}
          <motion.div
            variants={reveal}
            className="relative mx-auto w-full max-w-[460px]"
          >
            <motion.div
              style={{ y: crestY, rotate: crestRotate }}
              className="relative"
            >
              <MonogramCrest />
            </motion.div>

            {/* Floating signature card — bottom-left */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.6 }}
              className="absolute -bottom-6 -left-4 max-w-[260px] rounded-2xl border border-line bg-bg-elev/95 p-5 shadow-[0_24px_60px_-22px_rgba(68,28,124,0.28)] backdrop-blur md:-left-10"
            >
              <SignatureFlourish />
              <span className="mt-2 block text-[10.5px] font-medium uppercase tracking-[0.16em] text-ink-3">
                {aboutPage.hero.signature.caption}
              </span>
            </motion.div>

            {/* Floating coordinates card — top-right */}
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.45 }}
              className="absolute -right-2 -top-4 grid gap-1 rounded-2xl border border-line bg-bg-elev/95 px-4 py-3 shadow-[0_18px_44px_-22px_rgba(10,10,10,0.22)] backdrop-blur md:-right-8"
            >
              <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-ink-3">
                {aboutPage.hero.serviceArea.label}
              </span>
              <span className="font-serif text-[15px] tracking-[-0.012em] text-ink">
                {aboutPage.hero.serviceArea.value}
              </span>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ──────────────────────── Hero subcomponents ──────────────────────── */

function CredentialPill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-line bg-bg-elev/80 px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-[0.14em] text-ink-2 backdrop-blur-sm">
      <span
        className="size-1.5 rounded-full bg-[color:var(--color-gold)]"
        aria-hidden
      />
      {children}
    </span>
  );
}

/**
 * MonogramCrest — bespoke brass-medallion brand mark.
 *
 * Concentric rings, gold compass ticks, dotted outer ring, italic serif
 * "AA" monogram at centre, and "EST. MMX" curved along an arc. The whole
 * mark slow-rotates with scroll so it reads as a polished medallion.
 */
function MonogramCrest() {
  const accent = "var(--color-accent)";
  const gold = "var(--color-gold)";
  return (
    <svg
      viewBox="0 0 360 360"
      className="block size-full"
      aria-hidden
      role="presentation"
    >
      <defs>
        <radialGradient id="crest-fill" cx="50%" cy="50%" r="55%">
          <stop offset="0%" stopColor="#FAF6EC" />
          <stop offset="60%" stopColor="#F4EFE0" />
          <stop offset="100%" stopColor="#ECE7F2" />
        </radialGradient>
        <linearGradient id="crest-stroke" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={gold} />
          <stop offset="50%" stopColor={accent} />
          <stop offset="100%" stopColor={gold} />
        </linearGradient>
        {/* Curved path for the "EST. MMX · ALI AZAM ·" text run */}
        <path
          id="crest-arc-top"
          d="M 60 180 A 120 120 0 0 1 300 180"
          fill="none"
        />
        <path
          id="crest-arc-bottom"
          d="M 60 180 A 120 120 0 0 0 300 180"
          fill="none"
        />
      </defs>

      {/* Backplate — soft glow */}
      <circle
        cx="180"
        cy="180"
        r="156"
        fill="url(#crest-fill)"
        opacity="0.6"
      />

      {/* Outer dotted ring — gold */}
      <circle
        cx="180"
        cy="180"
        r="148"
        fill="none"
        stroke={gold}
        strokeWidth="1"
        strokeDasharray="2 6"
        opacity="0.85"
      />

      {/* Compass tick marks — eight directions, gold */}
      {Array.from({ length: 16 }).map((_, i) => {
        const angle = (i * 360) / 16;
        const long = i % 4 === 0;
        const r1 = long ? 138 : 142;
        const r2 = 134;
        const x1 = 180 + r1 * Math.cos((angle * Math.PI) / 180);
        const y1 = 180 + r1 * Math.sin((angle * Math.PI) / 180);
        const x2 = 180 + r2 * Math.cos((angle * Math.PI) / 180);
        const y2 = 180 + r2 * Math.sin((angle * Math.PI) / 180);
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke={long ? gold : accent}
            strokeWidth={long ? 1.4 : 0.8}
            strokeLinecap="round"
            opacity={long ? 0.95 : 0.55}
          />
        );
      })}

      {/* Mid ring — gradient stroke */}
      <circle
        cx="180"
        cy="180"
        r="124"
        fill="none"
        stroke="url(#crest-stroke)"
        strokeWidth="1.6"
        opacity="0.85"
      />

      {/* Inner ring — accent thin */}
      <circle
        cx="180"
        cy="180"
        r="108"
        fill="none"
        stroke={accent}
        strokeWidth="0.8"
        opacity="0.45"
      />

      {/* Top arc text */}
      <text
        fontFamily="serif"
        fontSize="11"
        fontStyle="italic"
        fill={accent}
        letterSpacing="3"
      >
        <textPath href="#crest-arc-top" startOffset="50%" textAnchor="middle">
          {aboutPage.hero.crest.topArc}
        </textPath>
      </text>

      {/* Bottom arc text */}
      <text
        fontFamily="serif"
        fontSize="11"
        fontStyle="italic"
        fill={accent}
        letterSpacing="3"
      >
        <textPath
          href="#crest-arc-bottom"
          startOffset="50%"
          textAnchor="middle"
          // SVG 2's `side` attribute (renders text on the inside/outside of
          // the path so the bottom arc reads right-way-up) is supported by
          // browsers but missing from React's SVGTextPathElement typings.
          // @ts-expect-error -- SVG 2 attr not in @types/react yet
          side="right"
        >
          {aboutPage.hero.crest.bottomArc}
        </textPath>
      </text>

      {/* Central monogram — italic serif gold */}
      <text
        x="180"
        y="200"
        textAnchor="middle"
        fontFamily="serif"
        fontStyle="italic"
        fontSize="120"
        fill={gold}
        letterSpacing="-6"
      >
        {aboutPage.hero.crest.monogram}
      </text>

      {/* Tiny ampersand-like flourish below */}
      <text
        x="180"
        y="225"
        textAnchor="middle"
        fontFamily="serif"
        fontStyle="italic"
        fontSize="13"
        fill={accent}
        opacity="0.7"
      >
        ·
      </text>

      {/* Decorative star at top of inner ring */}
      <path
        d="M 180 64 L 184 76 L 196 76 L 186 84 L 190 96 L 180 88 L 170 96 L 174 84 L 164 76 L 176 76 Z"
        fill={gold}
        opacity="0.9"
      />

      {/* Tiny tick at base */}
      <circle cx="180" cy="296" r="2.5" fill={gold} />
      <line
        x1="174"
        y1="296"
        x2="186"
        y2="296"
        stroke={gold}
        strokeWidth="0.8"
        opacity="0.7"
      />
    </svg>
  );
}

/**
 * SignatureFlourish — stylised italic "Ali Azam" with an ink underline.
 * Hand-feel without depending on a custom signature webfont.
 */
function SignatureFlourish() {
  return (
    <div className="grid gap-1.5">
      <span
        className="font-serif italic leading-none tracking-[-0.015em] text-ink"
        style={{ fontSize: "30px" }}
      >
        — <span className="text-accent">{site.name}</span>
      </span>
      <svg
        viewBox="0 0 220 18"
        className="h-3 w-[180px]"
        fill="none"
        aria-hidden
      >
        <path
          d="M 4 12 Q 30 2, 70 9 T 140 7 Q 170 4, 200 11 L 214 8"
          stroke="var(--color-gold)"
          strokeWidth="1.4"
          strokeLinecap="round"
          fill="none"
        />
        <circle cx="214" cy="8" r="2" fill="var(--color-gold)" />
      </svg>
    </div>
  );
}

/**
 * DotGrid — subtle blueprint-style background dot grid for editorial depth.
 * Sits behind the type but above the gradient mesh.
 */
function DotGrid() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-[1] opacity-[0.18]"
      style={{
        backgroundImage:
          "radial-gradient(circle, rgba(68,28,124,0.6) 1px, transparent 1.5px)",
        backgroundSize: "32px 32px",
        maskImage:
          "radial-gradient(ellipse at 30% 40%, black 0%, transparent 75%)",
        WebkitMaskImage:
          "radial-gradient(ellipse at 30% 40%, black 0%, transparent 75%)",
      }}
    />
  );
}

/* ============================================================== */
/*  ABOUT ME — MANIFESTO (verbatim 4 paragraphs)                  */
/* ============================================================== */

export function AboutMeManifesto() {
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

  return (
    <section
      ref={sectionRef}
      id="about-me"
      className="relative overflow-hidden py-24 md:py-32"
    >
      <ManifestoBackground />

      {/* Vertical stroke title — LEFT, gold */}
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
            WebkitTextStroke: "1.5px var(--color-gold)",
            color: "transparent",
            letterSpacing: "0.04em",
            opacity: 0.6,
          }}
        >
          {aboutPage.manifesto.titleStroke}
        </span>
      </motion.div>

      <div className="container-x relative z-10">
        <motion.header
          variants={revealContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-10% 0%" }}
          className="mb-14 grid max-w-[920px] gap-7 md:mb-20 lg:mx-[120px]"
        >
          {/* Chapter marker — Roman numeral in gold italic, hairline,
              small-caps label. Reads as the opening of a memoir. */}
          <motion.div
            variants={reveal}
            className="flex items-center gap-3.5"
          >
            <span
              className="font-serif italic leading-none tracking-[-0.02em] text-[color:var(--color-gold)]"
              style={{ fontSize: "28px" }}
            >
              {aboutPage.manifesto.chapter.numeral}
            </span>
            <span
              aria-hidden
              className="h-px w-10 bg-[color:var(--color-gold)]"
            />
            <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-ink-2">
              {aboutPage.manifesto.chapter.label}
            </span>
            <span aria-hidden className="h-px flex-1 bg-line" />
          </motion.div>

          {/* Oversized opening quotation glyph — gold, faded, editorial. */}
          <motion.span
            variants={reveal}
            aria-hidden
            className="-mb-10 -ml-2 block select-none font-serif italic leading-[0.6] tracking-[-0.04em] text-[color:var(--color-gold)] md:-mb-14 md:-ml-3"
            style={{
              fontSize: "clamp(120px, 14vw, 200px)",
              opacity: 0.28,
            }}
          >
            &ldquo;
          </motion.span>

          {/* Editorial display headline — multi-line, soft gold highlight
              behind the italic phrase. Lead/emphasis split lives in
              content.tsx so the copy can be tweaked without touching JSX. */}
          <motion.h2
            variants={reveal}
            className="font-serif font-normal text-ink"
            style={{
              fontSize: "clamp(44px, 6vw, 88px)",
              lineHeight: 0.98,
              letterSpacing: "-0.03em",
            }}
          >
            {aboutPage.manifesto.headline.lead}
            <br className="hidden md:block" />{" "}
            <span className="relative inline-block">
              <em
                className="relative z-10 text-accent"
                style={{ fontStyle: "italic" }}
              >
                {aboutPage.manifesto.headline.emphasis}
              </em>
              <span
                aria-hidden
                className="pointer-events-none absolute inset-x-0 bottom-[6%] -z-0 h-[18%] rounded-full"
                style={{
                  background:
                    "linear-gradient(90deg, transparent 0%, var(--color-gold) 18%, var(--color-gold) 82%, transparent 100%)",
                  opacity: 0.18,
                }}
              />
            </span>
          </motion.h2>

          {/* Closing ornament — hand-set rosette + thin rule + credential
              strip. Gives the heading a printed-page feel. */}
          <motion.div
            variants={reveal}
            className="mt-2 flex items-center gap-3"
          >
            <ChapterRosette />
            <span aria-hidden className="h-px flex-1 bg-line" />
            <span className="font-serif text-[12px] italic tracking-[-0.005em] text-ink-3 md:text-[13px]">
              {aboutPage.manifesto.closingStrip}
            </span>
          </motion.div>
        </motion.header>

        <motion.div
          variants={revealContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-5% 0%" }}
          className="grid gap-x-12 gap-y-9 md:grid-cols-2 lg:mx-[120px] lg:gap-x-16"
        >
          {/* ============== LEFT COLUMN — lead + para 2 ============== */}
          <div className="grid gap-6">
            {/* Lead paragraph — drop cap, larger type */}
            <motion.p
              variants={reveal}
              className="text-[17.5px] leading-[1.7] text-ink-2 first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:font-serif first-letter:text-[68px] first-letter:font-normal first-letter:leading-[0.85] first-letter:tracking-[-0.02em] first-letter:text-accent md:text-[18.5px]"
            >
              {aboutPage.manifesto.paragraphs[0]}
            </motion.p>
            <motion.p
              variants={reveal}
              className="text-[16px] leading-[1.7] text-ink-2 md:text-[17px]"
            >
              {aboutPage.manifesto.paragraphs[1]}
            </motion.p>
          </div>

          {/* ============== RIGHT COLUMN — pull-quote + paras 3 & 4 ============== */}
          <div className="grid gap-7 md:border-l md:border-line md:pl-10 lg:pl-14">
            {/* Pull-quote — sentence pulled verbatim from paragraph 2 of
                the source. Editorial magazine pull-quote treatment. */}
            <motion.blockquote
              variants={reveal}
              className="grid gap-3"
            >
              <span
                aria-hidden
                className="block text-[14px] leading-none text-[color:var(--color-gold)]"
              >
                ◆
              </span>
              <p
                className="font-serif italic tracking-[-0.018em] text-accent"
                style={{
                  fontSize: "clamp(22px, 2.2vw, 30px)",
                  lineHeight: 1.25,
                }}
              >
                &ldquo;{aboutPage.manifesto.pullQuote}&rdquo;
              </p>
              <span
                aria-hidden
                className="h-px w-12 bg-[color:var(--color-gold)]"
              />
            </motion.blockquote>

            <motion.p
              variants={reveal}
              className="text-[16px] leading-[1.7] text-ink-2 md:text-[17px]"
            >
              {aboutPage.manifesto.paragraphs[2]}
            </motion.p>
            <motion.p
              variants={reveal}
              className="text-[16px] leading-[1.7] text-ink-2 md:text-[17px]"
            >
              {aboutPage.manifesto.paragraphs[3]}
            </motion.p>
          </div>

          {/* ============== SIGNATURE — spans both columns ============== */}
          <motion.div
            variants={reveal}
            className="mt-4 flex items-center gap-4 border-t border-line pt-7 md:col-span-2"
          >
            <span className="grid size-12 place-items-center rounded-full border border-line-strong bg-bg-warm font-serif text-[18px] tracking-[-0.02em] text-ink">
              {aboutPage.manifesto.signature.initials}
            </span>
            <div className="grid gap-0.5">
              <p className="font-serif text-[20px] tracking-[-0.01em] text-ink">
                <em className="text-accent">
                  &mdash; {aboutPage.manifesto.signature.name}
                </em>
              </p>
              <p className="text-[10.5px] font-medium uppercase tracking-[0.14em] text-ink-3">
                {aboutPage.manifesto.signature.role}
              </p>
            </div>
            <span aria-hidden className="ml-auto hidden h-px flex-1 bg-line md:block" />
            <span className="hidden font-serif text-[12px] italic tracking-[-0.005em] text-ink-3 md:inline md:text-[13px]">
              {aboutPage.manifesto.signature.brokerage}
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/**
 * FrameCorner — gold L-bracket that sits just outside one of the portrait
 * frame's four corners. Adds a quiet bespoke detail without competing with
 * the gradient ring itself.
 */
function FrameCorner({ position }: { position: "tl" | "tr" | "bl" | "br" }) {
  const positionClass = {
    tl: "left-[-6px] top-[-6px]",
    tr: "right-[-6px] top-[-6px]",
    bl: "left-[-6px] bottom-[-6px]",
    br: "right-[-6px] bottom-[-6px]",
  }[position];
  const rotate = { tl: 0, tr: 90, br: 180, bl: 270 }[position];
  return (
    <span
      aria-hidden
      className={`pointer-events-none absolute size-5 ${positionClass}`}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <svg
        viewBox="0 0 20 20"
        fill="none"
        stroke="var(--color-gold)"
        strokeWidth="1.6"
        strokeLinecap="round"
      >
        <path d="M 2 12 L 2 2 L 12 2" />
        <circle cx="2" cy="2" r="1.4" fill="var(--color-gold)" stroke="none" />
      </svg>
    </span>
  );
}

/**
 * ChapterRosette — small printed-page ornament for the manifesto opener.
 * Gold dots, diamonds, and a centred ring read as a typesetter's flourish.
 */
function ChapterRosette() {
  const gold = "var(--color-gold)";
  return (
    <svg
      viewBox="0 0 88 14"
      className="h-3.5 w-[88px] shrink-0"
      fill="none"
      aria-hidden
    >
      <circle cx="6" cy="7" r="1.6" fill={gold} />
      <line
        x1="11"
        y1="7"
        x2="24"
        y2="7"
        stroke={gold}
        strokeWidth="0.8"
        opacity="0.55"
      />
      <path
        d="M 28 3 L 32 7 L 28 11 L 24 7 Z"
        fill={gold}
        opacity="0.85"
      />
      <circle
        cx="44"
        cy="7"
        r="3.2"
        stroke={gold}
        strokeWidth="0.9"
        fill="none"
      />
      <circle cx="44" cy="7" r="1" fill={gold} />
      <path
        d="M 60 3 L 64 7 L 60 11 L 56 7 Z"
        fill={gold}
        opacity="0.85"
      />
      <line
        x1="64"
        y1="7"
        x2="77"
        y2="7"
        stroke={gold}
        strokeWidth="0.8"
        opacity="0.55"
      />
      <circle cx="82" cy="7" r="1.6" fill={gold} />
    </svg>
  );
}

/* ============================================================== */
/*  STATISTICS                                                    */
/* ============================================================== */

export function AboutStats() {
  return (
    <section className="relative overflow-hidden border-y border-line bg-bg-warm/60 py-16 md:py-20">
      <div className="container-x relative z-10">
        <motion.dl
          variants={revealContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-10% 0%" }}
          className="grid grid-cols-3 gap-6 lg:mx-[120px]"
        >
          {aboutPage.stats.map((s, i) => (
            <motion.div
              key={s.label}
              variants={reveal}
              className={
                "grid place-items-center gap-2 px-2 text-center md:gap-3 " +
                (i > 0 ? "border-l border-line" : "")
              }
            >
              <dd
                className="font-serif font-normal tabular-nums"
                style={{
                  fontSize: "clamp(48px, 7vw, 96px)",
                  lineHeight: 1,
                  letterSpacing: "-0.04em",
                  color: s.color,
                }}
              >
                <CountUp to={s.value} />
              </dd>
              <dt className="text-[10.5px] font-medium uppercase tracking-[0.18em] text-ink-3 md:text-[11px]">
                {s.label}
              </dt>
            </motion.div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}

/**
 * CountUp — animates an integer from 0 → target when first scrolled into
 * view. Once it lands on the target it stays there. Uses framer-motion's
 * `animate` so the easing matches the rest of the page's motion language.
 */
function CountUp({ to, duration = 1.8 }: { to: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration,
      ease: [0.22, 1, 0.36, 1], // ease-out-quart — settles cleanly
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, to, duration]);

  return <span ref={ref}>{display.toLocaleString()}</span>;
}

/* ============================================================== */
/*  WE DO BETTER                                                  */
/* ============================================================== */

export function WeDoBetter() {
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
  const portraitY = useTransform(smooth, [0, 1], [40, -40]);
  const proseY = useTransform(smooth, [0, 1], [-20, 20]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-24 md:py-32"
    >
      <WeDoBetterBackground />

      <div className="container-x relative z-10">
        <motion.div
          variants={revealContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-10% 0%" }}
          className="grid items-center gap-14 md:grid-cols-2 md:gap-20 lg:mx-[80px]"
        >
          {/* Image side — premium multi-layer gradient frame, gold corner
              ornaments, soft accent glow, and a floating monogram plaque. */}
          <motion.div variants={reveal} className="order-2 md:order-1">
            <motion.div
              style={{ y: portraitY }}
              className="group relative mx-auto aspect-[4/5] w-full max-w-[460px]"
            >
              {/* Outer ambient glow — soft purple under the frame */}
              <span
                aria-hidden
                className="absolute -inset-3 -z-10 rounded-[34px] opacity-60 blur-2xl"
                style={{
                  background:
                    "radial-gradient(circle at 30% 30%, rgba(90,42,156,0.32) 0%, transparent 65%), radial-gradient(circle at 75% 80%, rgba(184,148,90,0.32) 0%, transparent 65%)",
                }}
              />

              {/* Outer gradient frame — 3-stop gold/accent/gold, 3px ring */}
              <span
                aria-hidden
                className="absolute inset-0 rounded-[28px] p-[3px] shadow-[0_30px_70px_-22px_rgba(68,28,124,0.32)]"
                style={{
                  background:
                    "linear-gradient(140deg, var(--color-gold) 0%, var(--color-accent) 35%, var(--color-accent-2) 65%, var(--color-gold) 100%)",
                }}
              >
                <span className="block size-full rounded-[26px] bg-bg-warm" />
              </span>

              {/* Inner hairline — gold thread inside the frame for depth */}
              <span
                aria-hidden
                className="absolute inset-[7px] rounded-[22px] border"
                style={{ borderColor: "rgba(184,148,90,0.55)" }}
              />

              {/* Portrait */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={aboutPage.weDoBetter.portraitSrc}
                alt={aboutPage.weDoBetter.portraitAlt}
                className="relative size-full rounded-[26px] object-cover p-[3px] transition-transform duration-1000 ease-out group-hover:scale-[1.015]"
                loading="lazy"
              />

              {/* Gold L-brackets at all 4 outer corners */}
              <FrameCorner position="tl" />
              <FrameCorner position="tr" />
              <FrameCorner position="bl" />
              <FrameCorner position="br" />

              {/* Floating monogram plaque — bottom-right, gold ring + AA */}
              <span className="absolute -bottom-5 -right-5 grid place-items-center rounded-2xl border border-line bg-bg-elev/95 p-2.5 shadow-[0_18px_44px_-18px_rgba(10,10,10,0.32)] backdrop-blur">
                <span
                  className="grid size-14 place-items-center rounded-full"
                  style={{
                    background:
                      "linear-gradient(140deg, var(--color-gold) 0%, var(--color-accent) 100%)",
                  }}
                >
                  <span className="grid size-[52px] place-items-center rounded-full bg-bg-elev font-serif italic tracking-[-0.02em] text-[color:var(--color-accent)]" style={{ fontSize: "22px" }}>
                    {aboutPage.weDoBetter.floatingPlaque.initials}
                  </span>
                </span>
              </span>

              {/* Floating "Est. MMX" tag — top-left */}
              <span className="absolute -left-4 -top-4 grid gap-0.5 rounded-xl border border-line bg-bg-elev/95 px-3.5 py-2 shadow-[0_14px_32px_-14px_rgba(10,10,10,0.28)] backdrop-blur">
                <span className="text-[9.5px] font-medium uppercase tracking-[0.2em] text-ink-3">
                  {aboutPage.weDoBetter.floatingTag.label}
                </span>
                <span
                  className="font-serif italic leading-none tracking-[-0.02em] text-[color:var(--color-gold)]"
                  style={{ fontSize: "20px" }}
                >
                  {aboutPage.weDoBetter.floatingTag.roman}
                </span>
              </span>
            </motion.div>
          </motion.div>

          {/* Prose side */}
          <motion.div variants={reveal} className="order-1 md:order-2">
            <motion.div style={{ y: proseY }} className="grid gap-5">
              <span className="eyebrow">{aboutPage.weDoBetter.eyebrow}</span>
              <h2 className="display-h2">
                {aboutPage.weDoBetter.headline.lead}{" "}
                <em>{aboutPage.weDoBetter.headline.emphasis}</em>
              </h2>
              <p className="text-[17px] leading-[1.7] text-ink-2 md:text-[18px]">
                {aboutPage.weDoBetter.body}
              </p>
              <div className="mt-2 flex items-center gap-3">
                <span className="h-px w-10 bg-[color:var(--color-gold)]" />
                <span className="text-[10.5px] font-medium uppercase tracking-[0.18em] text-ink-3">
                  {aboutPage.weDoBetter.closingStrip}
                </span>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ============================================================== */
/*  CERTIFICATIONS                                                */
/* ============================================================== */

export function Certifications() {
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
  const titleY = useTransform(smooth, [0, 1], ["-22%", "22%"]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-24 md:py-32"
    >
      <CertificationsBackground />

      {/* Vertical stroke title — RIGHT, gold */}
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
            opacity: 0.55,
          }}
        >
          {aboutPage.certifications.titleStroke}
        </span>
      </motion.div>

      <div className="container-x relative z-10">
        <motion.header
          variants={revealContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-10% 0%" }}
          className="mb-12 grid max-w-[780px] gap-3.5 md:mb-16 lg:mx-[120px]"
        >
          <motion.span variants={reveal} className="eyebrow">
            {aboutPage.certifications.eyebrow}
          </motion.span>
          <motion.h2 variants={reveal} className="display-h2">
            {aboutPage.certifications.headline}
          </motion.h2>
          <motion.p variants={reveal} className="lede max-w-[58ch]">
            {aboutPage.certifications.lede}
          </motion.p>
        </motion.header>

        <motion.div
          variants={revealContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-5% 0%" }}
          className="grid gap-6 md:grid-cols-2 md:gap-8 lg:mx-[120px]"
        >
          {aboutPage.certifications.cards.map((c, i) => (
            <CertCard
              key={c.src}
              label={c.label}
              badge={c.badge}
              icon={
                i === 0 ? (
                  <Award className="size-5" strokeWidth={1.5} />
                ) : (
                  <BadgeCheck className="size-5" strokeWidth={1.5} />
                )
              }
              src={c.src}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function CertCard({
  label,
  badge,
  icon,
  src,
}: {
  label: string;
  badge: string;
  icon: React.ReactNode;
  src: string;
}) {
  return (
    <motion.article
      variants={reveal}
      className="group relative overflow-hidden rounded-[24px] border border-line-strong bg-bg-elev/85 p-6 backdrop-blur-md transition-all duration-700 ease-out hover:shadow-[0_28px_70px_-22px_rgba(68,28,124,0.32)] md:p-8"
    >
      {/* Soft inner mesh */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-60"
        style={{
          background:
            "radial-gradient(circle at 80% 12%, var(--color-accent-soft) 0%, transparent 55%), radial-gradient(circle at 12% 88%, var(--color-gold-soft) 0%, transparent 55%)",
        }}
      />

      <header className="mb-5 flex items-center justify-between gap-4">
        <div className="grid gap-1">
          <span className="eyebrow">{badge}</span>
          <p className="font-serif text-[18px] tracking-[-0.01em] text-ink">
            <em className="text-accent">{label}</em>
          </p>
        </div>
        <span className="grid size-11 shrink-0 place-items-center rounded-full border border-line-strong bg-bg-warm text-[color:var(--color-accent)] transition-all duration-500 group-hover:border-[color:var(--color-accent)] group-hover:bg-[color:var(--color-accent)] group-hover:text-white">
          {icon}
        </span>
      </header>

      {/* Image frame */}
      <div className="relative aspect-[4/3] overflow-hidden rounded-[16px] border border-line">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={label}
          className="size-full object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.04]"
          loading="lazy"
        />
        {/* Top hairline that sweeps in on hover */}
        <span
          aria-hidden
          className="pointer-events-none absolute left-0 top-0 h-px w-0 bg-[color:var(--color-gold)] transition-all duration-700 ease-out group-hover:w-full"
        />
      </div>

      {/* Underline that grows on hover */}
      <span
        aria-hidden
        className="mt-5 block h-px w-12 bg-gradient-to-r from-[color:var(--color-gold)] to-transparent transition-all duration-500 group-hover:w-32"
      />
    </motion.article>
  );
}

/* ============================================================== */
/*  CONTACT BLOCK — verbatim from the about page footer area      */
/* ============================================================== */

export function AboutContactBlock() {
  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      <ContactBackground />

      <div className="container-x relative z-10">
        <motion.header
          variants={revealContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-10% 0%" }}
          className="mb-12 grid max-w-[760px] gap-3.5 md:mb-16 lg:mx-[120px]"
        >
          <motion.span variants={reveal} className="eyebrow">
            {aboutPage.contactBlock.eyebrow}
          </motion.span>
          <motion.h2 variants={reveal} className="display-h2">
            {aboutPage.contactBlock.headline.lead}{" "}
            <em>{aboutPage.contactBlock.headline.emphasis}</em>
          </motion.h2>
        </motion.header>

        <motion.div
          variants={revealContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-5% 0%" }}
          className="grid gap-5 md:grid-cols-2 md:gap-6 lg:mx-[120px]"
        >
          <ContactRow
            icon={<Smartphone className="size-4" strokeWidth={1.6} />}
            label={aboutPage.contactBlock.rows.mobile}
            value={site.phone}
            href={`tel:${site.phone.replace(/\s/g, "")}`}
          />
          <ContactRow
            icon={<Phone className="size-4" strokeWidth={1.6} />}
            label={aboutPage.contactBlock.rows.office}
            value={site.officePhone}
            href={`tel:${site.officePhone.replace(/[^0-9+]/g, "")}`}
          />
          <ContactRow
            icon={<Mail className="size-4" strokeWidth={1.6} />}
            label={aboutPage.contactBlock.rows.email}
            value={site.email}
            href={`mailto:${site.email}`}
          />
          <ContactRow
            icon={<Printer className="size-4" strokeWidth={1.6} />}
            label={aboutPage.contactBlock.rows.fax}
            value={site.fax}
          />
          <motion.a
            variants={reveal}
            href="#"
            className="group flex items-start gap-4 rounded-[20px] border border-line bg-bg-elev/85 p-5 backdrop-blur-md transition-all duration-500 hover:border-[color:var(--color-accent)] md:col-span-2 md:p-6"
          >
            <span className="mt-1 grid size-9 shrink-0 place-items-center rounded-full border border-line-strong bg-bg-warm text-[color:var(--color-accent)] transition-all duration-500 group-hover:border-[color:var(--color-accent)] group-hover:bg-[color:var(--color-accent)] group-hover:text-white">
              <MapPin className="size-4" strokeWidth={1.6} />
            </span>
            <div className="grid gap-1">
              <span className="text-[10.5px] font-medium uppercase tracking-[0.16em] text-ink-3">
                {aboutPage.contactBlock.rows.officeAddress}
              </span>
              <p className="font-serif text-[18px] tracking-[-0.01em] text-ink md:text-[20px]">
                {site.address.line1}
              </p>
              <p className="text-[14px] text-ink-2">
                {site.address.city} {site.address.postal}
              </p>
              <p className="mt-1 text-[10.5px] font-medium uppercase tracking-[0.14em] text-ink-3">
                {site.brokerage}
              </p>
            </div>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}

function ContactRow({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}) {
  const Inner = (
    <div className="group flex items-center gap-4 rounded-[18px] border border-line bg-bg-elev/85 p-5 backdrop-blur-md transition-all duration-500 hover:border-[color:var(--color-accent)] md:p-6">
      <span className="grid size-9 shrink-0 place-items-center rounded-full border border-line-strong bg-bg-warm text-[color:var(--color-accent)] transition-all duration-500 group-hover:border-[color:var(--color-accent)] group-hover:bg-[color:var(--color-accent)] group-hover:text-white">
        {icon}
      </span>
      <div className="grid gap-0.5">
        <span className="text-[10.5px] font-medium uppercase tracking-[0.16em] text-ink-3">
          {label}
        </span>
        <span className="font-serif text-[18px] tabular-nums tracking-[-0.01em] text-ink transition-colors duration-300 group-hover:text-accent md:text-[20px]">
          {value}
        </span>
      </div>
    </div>
  );

  return (
    <motion.div variants={reveal}>
      {href ? (
        <a href={href} className="block">
          {Inner}
        </a>
      ) : (
        Inner
      )}
    </motion.div>
  );
}

/* ============================================================== */
/*  BACKGROUNDS                                                   */
/* ============================================================== */

function HeroBackground() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(170deg, #FAFAF7 0%, #F4EFE0 35%, #ECE7F2 70%, #E4DCEE 100%)",
        }}
      />
      <div
        className="absolute -inset-1/4 opacity-[0.18]"
        style={{
          background:
            "conic-gradient(from 200deg at 50% 50%, transparent 0%, var(--color-accent-soft) 22%, transparent 45%, var(--color-gold-soft) 68%, transparent 90%, var(--color-accent-soft) 100%)",
          animation: "spin-slow 110s linear infinite",
          filter: "blur(50px)",
        }}
      />
      <div
        className="absolute -right-32 -top-24 size-[540px] rounded-full opacity-45 blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, rgba(90,42,156,0.32) 0%, transparent 70%)",
          animation: "mesh-1 30s var(--ease-soft) infinite",
        }}
      />
      <div
        className="absolute -left-28 bottom-0 size-[480px] rounded-full opacity-50 blur-[110px]"
        style={{
          background:
            "radial-gradient(circle, var(--color-gold-soft) 0%, transparent 70%)",
          animation: "mesh-2 32s var(--ease-soft) infinite",
        }}
      />
    </div>
  );
}

function ManifestoBackground() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(165deg, #FAF6EC 0%, #F4F2EA 40%, #FAFAF7 75%, #ECE7F2 100%)",
        }}
      />
      <div
        className="absolute -bottom-32 -right-24 size-[520px] rounded-full opacity-45 blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, rgba(90,42,156,0.28) 0%, transparent 70%)",
          animation: "mesh-1 32s var(--ease-soft) infinite",
        }}
      />
      <div
        className="absolute left-1/3 top-1/4 size-[420px] rounded-full opacity-35 blur-[100px]"
        style={{
          background: "radial-gradient(circle, #FFFFFF 0%, transparent 65%)",
          animation: "mesh-3 28s var(--ease-soft) infinite",
        }}
      />
    </div>
  );
}

function WeDoBetterBackground() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(170deg, #ECE7F2 0%, #F2EAD9 50%, #FAF6EC 100%)",
        }}
      />
      <div
        className="absolute -inset-1/4 opacity-[0.18]"
        style={{
          background:
            "conic-gradient(from 90deg at 50% 50%, transparent 0%, var(--color-accent-soft) 22%, transparent 45%, var(--color-gold-soft) 68%, transparent 90%, var(--color-accent-soft) 100%)",
          animation: "spin-slow 110s linear infinite",
          filter: "blur(50px)",
        }}
      />
      <div
        className="absolute -right-28 -top-32 size-[500px] rounded-full opacity-45 blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, var(--color-gold-soft) 0%, transparent 70%)",
          animation: "mesh-2 30s var(--ease-soft) infinite",
        }}
      />
    </div>
  );
}

function CertificationsBackground() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(168deg, #FAF6EC 0%, #F4EFE0 40%, #ECE7F2 100%)",
        }}
      />
      <div
        className="absolute -left-28 top-1/3 size-[460px] rounded-full opacity-45 blur-[110px]"
        style={{
          background:
            "radial-gradient(circle, rgba(90,42,156,0.28) 0%, transparent 70%)",
          animation: "mesh-1 32s var(--ease-soft) infinite",
        }}
      />
      <div
        className="absolute -right-24 bottom-0 size-[480px] rounded-full opacity-45 blur-[110px]"
        style={{
          background:
            "radial-gradient(circle, var(--color-gold-soft) 0%, transparent 70%)",
          animation: "mesh-2 32s var(--ease-soft) infinite",
        }}
      />
    </div>
  );
}

function ContactBackground() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(170deg, #ECE7F2 0%, #F4EFE0 60%, #FAFAF7 100%)",
        }}
      />
      <div
        className="absolute -right-32 -top-24 size-[520px] rounded-full opacity-45 blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, rgba(90,42,156,0.32) 0%, transparent 70%)",
          animation: "mesh-1 30s var(--ease-soft) infinite",
        }}
      />
      <div
        className="absolute -left-28 -bottom-32 size-[460px] rounded-full opacity-45 blur-[110px]"
        style={{
          background:
            "radial-gradient(circle, var(--color-gold-soft) 0%, transparent 70%)",
          animation: "mesh-2 32s var(--ease-soft) infinite",
        }}
      />
    </div>
  );
}
