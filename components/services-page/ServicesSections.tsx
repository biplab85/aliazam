"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import {
  ArrowUpRight,
  BadgePercent,
  Bell,
  Building,
  Building2,
  Briefcase,
  Compass,
  Home as HomeIcon,
  KeyRound,
  Quote,
  Store,
  TrendingDown,
  TrendingUp,
  Sparkles,
  Check,
  type LucideIcon,
} from "lucide-react";
import { servicesPage, site } from "@/content";
import { reveal, revealContainer } from "@/lib/motion";

/**
 * /services page — every string lives in `content.tsx#servicesPage`.
 *
 * Visual language is the fourth distinct treatment in the route family:
 *   • /about — monogram crest + dot-grid backdrop + Roman year stamp.
 *   • /listings — scrolling marquee + blueprint grid + cards collage.
 *   • /contact — telegram letterhead + ruled paper + wax-seal envelope.
 *   • /services — magazine table-of-contents: a numbered chapter index
 *     on the right, concentric-arc backdrop, "Index" letterhead corner.
 */

/* ============================================================== */
/*  HERO — editorial table of contents                            */
/* ============================================================== */

export function ServicesPageHero() {
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
  const titleY = useTransform(smooth, [0, 1], ["18%", "-22%"]);
  const indexY = useTransform(smooth, [0, 1], [40, -40]);
  const compassRotate = useTransform(smooth, [0, 1], [-12, 12]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden pb-16 pt-28 md:pb-20 md:pt-32"
    >
      <ServicesHeroBackground />
      <ConcentricArcs />

      {/* Vertical "Services" stroke title — RIGHT, parallax */}
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
          {servicesPage.hero.titleStroke}
        </span>
      </motion.div>

      {/* Index letterhead — top-left, like a magazine TOC stamp */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="pointer-events-none absolute left-[60px] top-[112px] z-[2] hidden flex-col items-start gap-1 lg:flex"
      >
        <span className="text-[10.5px] font-medium uppercase tracking-[0.22em] text-ink-3">
          {servicesPage.hero.indexLabel}
        </span>
        <span
          className="font-serif italic leading-none tracking-[-0.02em] text-[color:var(--color-gold)]"
          style={{ fontSize: "44px" }}
        >
          §
        </span>
        <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-ink-3">
          {servicesPage.hero.chapters.length} chapters
        </span>
      </motion.div>

      <div className="container-x relative z-10">
        <motion.div
          variants={revealContainer}
          initial="hidden"
          animate="show"
          className="grid items-center gap-12 md:grid-cols-[1.2fr_0.8fr] md:gap-16 lg:mx-[40px]"
        >
          {/* ============== LEFT — editorial title card ============== */}
          <div className="grid gap-7">
            {/* Eyebrow + hairline */}
            <motion.div
              variants={reveal}
              className="flex items-center gap-3.5"
            >
              <span className="h-px w-16 bg-[color:var(--color-gold)]" />
              <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-ink-2">
                {servicesPage.hero.eyebrow}
              </span>
            </motion.div>

            {/* Massive editorial display headline */}
            <motion.h1
              variants={reveal}
              className="font-serif font-normal text-ink"
              style={{
                fontSize: "clamp(64px, 10vw, 156px)",
                lineHeight: 0.96,
                letterSpacing: "-0.035em",
              }}
            >
              {servicesPage.hero.headline.lead}{" "}
              <em
                className="text-accent"
                style={{ fontStyle: "italic" }}
              >
                {servicesPage.hero.headline.emphasis}
              </em>
            </motion.h1>

            {/* Italic strapline */}
            <motion.p
              variants={reveal}
              className="max-w-[58ch] font-serif italic leading-[1.45] tracking-[-0.005em] text-ink-2"
              style={{ fontSize: "clamp(18px, 1.5vw, 22px)" }}
            >
              {servicesPage.hero.strapline}
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={reveal}
              className="flex flex-wrap items-center gap-3 pt-2"
            >
              <a
                href={servicesPage.hero.primaryCta.href}
                className="btn btn-primary px-6 py-3.5 text-[15px]"
              >
                {servicesPage.hero.primaryCta.label}{" "}
                <span className="arrow">→</span>
              </a>
              <a
                href={`tel:${site.phone.replace(/\s/g, "")}`}
                className="btn btn-ghost px-5 py-3.5 text-[15px]"
              >
                {servicesPage.hero.secondaryCta.label}
                <ArrowUpRight className="size-4" strokeWidth={1.75} />
              </a>
            </motion.div>
          </div>

          {/* ============== RIGHT — chapter index card ============== */}
          <motion.div
            variants={reveal}
            className="relative mx-auto w-full max-w-[460px]"
          >
            <motion.div style={{ y: indexY }} className="relative">
              <ChapterIndex chapters={servicesPage.hero.chapters} />
            </motion.div>

            {/* Floating compass — top-right, slow rotates */}
            <motion.div
              style={{ rotate: compassRotate }}
              initial={{ opacity: 0, scale: 0.86 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="absolute -right-3 -top-4 grid size-16 place-items-center rounded-full border border-line bg-bg-elev/95 shadow-[0_18px_44px_-22px_rgba(184,148,90,0.45)] backdrop-blur md:-right-6"
            >
              <Compass
                className="size-7 text-[color:var(--color-gold)]"
                strokeWidth={1.4}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function ChapterIndex({
  chapters,
}: {
  chapters: ReadonlyArray<{ num: string; label: string; href: string }>;
}) {
  return (
    <div className="relative overflow-hidden rounded-[24px] border border-line-strong bg-bg-elev/85 p-5 shadow-[0_30px_70px_-22px_rgba(68,28,124,0.22)] backdrop-blur-md md:p-6">
      {/* Header — like a magazine "CONTENTS" plate */}
      <div className="mb-4 flex items-center justify-between border-b border-line pb-3">
        <span className="text-[10.5px] font-medium uppercase tracking-[0.22em] text-ink-3">
          Contents
        </span>
        <span className="font-serif text-[12px] italic tracking-[-0.005em] text-ink-3">
          {String(chapters.length).padStart(2, "0")} sections
        </span>
      </div>

      {/* Chapter rows */}
      <ul className="grid divide-y divide-line">
        {chapters.map((c) => (
          <li key={c.href}>
            <a
              href={c.href}
              className="group flex items-center gap-4 py-4 transition-colors duration-300"
            >
              <span
                className="font-serif italic leading-none tracking-[-0.02em] text-[color:var(--color-gold)]"
                style={{ fontSize: "30px" }}
              >
                {c.num}
              </span>
              <span className="font-serif text-[18px] tracking-[-0.012em] text-ink transition-colors duration-300 group-hover:text-accent md:text-[20px]">
                {c.label}
              </span>
              <ArrowUpRight
                className="ml-auto size-4 -translate-x-1 text-ink-3 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:text-accent group-hover:opacity-100"
                strokeWidth={1.75}
              />
            </a>
          </li>
        ))}
      </ul>

      {/* Top hairline */}
      <span
        aria-hidden
        className="pointer-events-none absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-[color:var(--color-gold)] to-transparent opacity-60"
      />
    </div>
  );
}

/* ============================================================== */
/*  INTRO — "Real Estate Services" with bullet checklist          */
/* ============================================================== */

export function ServicesIntro() {
  return (
    <section
      id="all-services"
      className="relative overflow-hidden py-24 md:py-28"
    >
      <IntroBackground />

      <div className="container-x relative z-10">
        <motion.header
          variants={revealContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-10% 0%" }}
          className="mb-12 grid max-w-[820px] gap-3.5 md:mb-16 lg:mx-[60px]"
        >
          <motion.span variants={reveal} className="eyebrow">
            {servicesPage.intro.eyebrow}
          </motion.span>
          <motion.h2 variants={reveal} className="display-h2">
            {servicesPage.intro.headline.lead}{" "}
            <em>{servicesPage.intro.headline.emphasis}</em>
          </motion.h2>
        </motion.header>

        <motion.div
          variants={revealContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-5% 0%" }}
          className="grid gap-12 lg:mx-[60px] lg:grid-cols-[1fr_1fr] lg:gap-16"
        >
          {/* Left — verbatim paragraphs */}
          <div className="grid gap-6">
            {servicesPage.intro.paragraphs.map((p, i) => (
              <motion.p
                key={i}
                variants={reveal}
                className={
                  i === 0
                    ? "text-[17px] leading-[1.7] text-ink-2 first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:font-serif first-letter:text-[64px] first-letter:font-normal first-letter:leading-[0.85] first-letter:tracking-[-0.02em] first-letter:text-accent md:text-[18px]"
                    : "text-[17px] leading-[1.7] text-ink-2 md:text-[18px]"
                }
              >
                {p}
              </motion.p>
            ))}
          </div>

          {/* Right — checklist */}
          <motion.div
            variants={reveal}
            className="rounded-[22px] border border-line bg-bg-elev/85 p-6 backdrop-blur-md md:p-8"
          >
            <span className="mb-4 block text-[10.5px] font-medium uppercase tracking-[0.18em] text-ink-3">
              What&apos;s included
            </span>
            <ul className="grid gap-3">
              {servicesPage.intro.bullets.map((b, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-[15px] leading-[1.55] text-ink-2 md:text-[15.5px]"
                >
                  <span className="mt-[3px] grid size-5 shrink-0 place-items-center rounded-full border border-[color:var(--color-accent)]/40 bg-[color:var(--color-accent-soft)] text-[color:var(--color-accent)]">
                    <Check className="size-3" strokeWidth={2.4} />
                  </span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ============================================================== */
/*  FEATURED SERVICES — three numbered chapters with anchors      */
/* ============================================================== */

export function FeaturedServices() {
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
      className="relative overflow-hidden py-24 md:py-28"
    >
      <FeaturedBackground />

      {/* Vertical "Pillars" stroke — LEFT, gold */}
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
            WebkitTextStroke: "1.5px var(--color-gold)",
            color: "transparent",
            letterSpacing: "0.04em",
            opacity: 0.5,
          }}
        >
          Pillars
        </span>
      </motion.div>

      <div className="container-x relative z-10">
        <motion.header
          variants={revealContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-10% 0%" }}
          className="mb-14 grid max-w-[760px] gap-3.5 md:mb-20 lg:mx-[60px]"
        >
          <motion.span variants={reveal} className="eyebrow">
            {servicesPage.featured.sectionEyebrow}
          </motion.span>
          <motion.h2 variants={reveal} className="display-h2">
            {servicesPage.featured.sectionHeadline.lead}{" "}
            <em>{servicesPage.featured.sectionHeadline.emphasis}</em>
          </motion.h2>
        </motion.header>

        <div className="grid gap-10 lg:mx-[60px] lg:gap-14">
          {servicesPage.featured.items.map((item, i) => (
            <div key={item.anchor}>
              <FeaturedCard
                item={item}
                flip={i % 2 === 1}
                indexOfTotal={`${item.roman}/${toRoman(servicesPage.featured.items.length)}`}
              />
              {/* Decorative connector between pillars (not after the last) */}
              {i < servicesPage.featured.items.length - 1 && (
                <PillarConnector />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/** ICON_MAP — string-key icon lookup so the data can stay JSON-safe. */
const FEATURED_ICONS: Record<string, LucideIcon> = {
  home: HomeIcon,
  building: Building2,
  "trending-up": TrendingUp,
};

/** Convert 1..3 to Roman numerals. (Tiny helper — only used for pillar count.) */
function toRoman(n: number): string {
  return ["", "I", "II", "III", "IV", "V"][n] ?? String(n);
}

function FeaturedCard({
  item,
  flip,
  indexOfTotal,
}: {
  item: {
    roman: string;
    anchor: string;
    title: string;
    tagline: string;
    icon: string;
    ctaLabel: string;
    paragraphs: readonly string[];
  };
  flip: boolean;
  indexOfTotal: string;
}) {
  const Icon = FEATURED_ICONS[item.icon] ?? KeyRound;

  return (
    <motion.article
      id={item.anchor}
      variants={revealContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10% 0%" }}
      className="group relative scroll-mt-28"
    >
      {/* Premium card frame — outer shadow + gradient hairline ring */}
      <div className="relative isolate overflow-hidden rounded-[28px] border border-line-strong bg-bg-elev/85 backdrop-blur-md shadow-[0_2px_6px_-2px_rgba(10,10,10,0.05),0_18px_44px_-22px_rgba(10,10,10,0.18)] transition-all duration-700 ease-out group-hover:shadow-[0_4px_10px_-2px_rgba(10,10,10,0.08),0_36px_80px_-22px_rgba(184,148,90,0.32)]">
        {/* Outer gradient stroke — diagonal gold/accent threads */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[28px] p-[1.5px] opacity-70 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              "linear-gradient(140deg, rgba(184,148,90,0.55) 0%, transparent 30%, transparent 70%, rgba(68,28,124,0.5) 100%)",
          }}
        >
          <span className="block size-full rounded-[26.5px] bg-bg-elev/90" />
        </span>

        {/* Ambient mesh — soft gold + accent blooms */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 opacity-55"
          style={{
            background:
              "radial-gradient(circle at 88% 12%, var(--color-gold-soft) 0%, transparent 55%), radial-gradient(circle at 12% 88%, var(--color-accent-soft) 0%, transparent 55%)",
          }}
        />

        {/* Top hairline that sweeps in on hover */}
        <span
          aria-hidden
          className="pointer-events-none absolute left-0 top-0 h-px w-0 bg-[color:var(--color-gold)] transition-all duration-700 ease-out group-hover:w-full"
        />

        {/* Outer corner ornaments */}
        <CardCorner position="tl" color="var(--color-gold)" />
        <CardCorner position="tr" color="var(--color-gold)" />

        {/* Pillar count chip — top-right floating */}
        <span className="absolute right-5 top-5 z-10 inline-flex items-center gap-1.5 rounded-full border border-[color:var(--color-gold)]/40 bg-bg-elev/95 px-2.5 py-1 font-serif text-[10.5px] italic tracking-[0.16em] text-[color:var(--color-gold)] backdrop-blur md:right-7 md:top-7">
          {indexOfTotal}
        </span>

        <div className="relative grid gap-10 p-7 md:grid-cols-[0.42fr_0.58fr] md:items-center md:gap-14 md:p-12 lg:p-16">
          {/* ============== LEFT — pillar identity ============== */}
          <motion.div
            variants={reveal}
            className={flip ? "md:order-2" : ""}
          >
            <div className="grid gap-5">
              {/* Eyebrow — "PILLAR" with hairline */}
              <div className="flex items-center gap-3" aria-hidden>
                <span className="h-px w-10 bg-[color:var(--color-gold)]" />
                <span className="text-[10.5px] font-medium uppercase tracking-[0.22em] text-ink-2">
                  Service Pillar
                </span>
              </div>

              {/* Icon disc + Roman numeral row */}
              <div className="flex items-center gap-5">
                <span
                  className="grid size-[68px] shrink-0 place-items-center rounded-2xl border border-[color:var(--color-gold)]/45 text-[color:var(--color-accent)] shadow-[0_8px_24px_-12px_rgba(184,148,90,0.45)]"
                  style={{
                    background:
                      "linear-gradient(140deg, rgba(184,148,90,0.18) 0%, rgba(255,255,255,0.4) 60%, rgba(184,148,90,0.10) 100%)",
                  }}
                >
                  <Icon className="size-7" strokeWidth={1.4} />
                </span>
                <span
                  className="font-serif italic leading-none tracking-[-0.04em] text-[color:var(--color-gold)]"
                  style={{ fontSize: "clamp(80px, 10vw, 152px)" }}
                >
                  {item.roman}
                </span>
              </div>

              {/* Hairline rule */}
              <span
                aria-hidden
                className="h-px w-20 bg-gradient-to-r from-[color:var(--color-gold)] to-transparent"
              />

              {/* Title */}
              <h3
                className="font-serif font-normal tracking-[-0.025em] text-ink"
                style={{
                  fontSize: "clamp(28px, 3.2vw, 48px)",
                  lineHeight: 1.05,
                }}
              >
                {item.title}
                <span className="text-accent">.</span>
              </h3>

              {/* Tagline */}
              <p className="font-serif text-[14px] italic tracking-[-0.005em] text-ink-3 md:text-[15.5px]">
                {item.tagline}
              </p>

              {/* Bottom anchor — hairline + gold tick + brand stamp.
                  Editorial footer so the identity stack feels weighted
                  rather than floating in the column. */}
              <div className="mt-3 flex items-center gap-3">
                <span
                  aria-hidden
                  className="size-1.5 rounded-full bg-[color:var(--color-gold)]"
                />
                <span aria-hidden className="h-px flex-1 bg-line-strong" />
                <span className="font-serif text-[10.5px] italic tracking-[0.16em] text-ink-3">
                  GTA · Since 2010
                </span>
              </div>
            </div>
          </motion.div>

          {/* ============== RIGHT — paragraphs + CTA ============== */}
          <motion.div
            variants={reveal}
            className={flip ? "md:order-1" : ""}
          >
            <div className="grid gap-5">
              {item.paragraphs.map((p, i) => (
                <p
                  key={i}
                  className={
                    i === 0
                      ? "text-[16.5px] leading-[1.7] text-ink-2 first-letter:float-left first-letter:mr-2.5 first-letter:mt-1 first-letter:font-serif first-letter:text-[56px] first-letter:font-normal first-letter:leading-[0.85] first-letter:tracking-[-0.02em] first-letter:text-accent md:text-[17.5px]"
                      : "text-[16.5px] leading-[1.7] text-ink-2 md:text-[17.5px]"
                  }
                >
                  {p}
                </p>
              ))}

              {/* CTA — gold-underline link */}
              <a
                href="/contact"
                className="group/cta mt-4 inline-flex items-center gap-2 self-start text-[11.5px] font-medium uppercase tracking-[0.2em] text-ink-2 transition-colors duration-300 hover:text-accent"
              >
                <span className="relative">
                  {item.ctaLabel}
                  <span
                    aria-hidden
                    className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-100 bg-[color:var(--color-gold)] transition-transform duration-300 group-hover/cta:scale-x-110"
                  />
                </span>
                <ArrowUpRight
                  className="size-3.5 transition-transform duration-300 group-hover/cta:-translate-y-0.5 group-hover/cta:translate-x-0.5"
                  strokeWidth={1.8}
                />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.article>
  );
}

/**
 * PillarConnector — decorative hairline + diamond ornament that sits
 * between pillars in the Featured Services stack. Editorial flourish.
 */
function PillarConnector() {
  return (
    <div
      aria-hidden
      className="my-10 flex items-center justify-center gap-3 md:my-14"
    >
      <span className="h-px w-20 bg-gradient-to-r from-transparent to-line-strong md:w-32" />
      <span className="text-[color:var(--color-gold)] opacity-60">◆</span>
      <span className="font-serif text-[10px] italic tracking-[0.18em] text-ink-3">
        ·  ·  ·
      </span>
      <span className="text-[color:var(--color-gold)] opacity-60">◆</span>
      <span className="h-px w-20 bg-gradient-to-l from-transparent to-line-strong md:w-32" />
    </div>
  );
}

/* ============================================================== */
/*  PROPERTY TYPES — small grid of category chips                 */
/* ============================================================== */

const PROPERTY_ICONS: Record<string, LucideIcon> = {
  "building-2": Building2,
  building: Building,
  buildings: Building,
  home: HomeIcon,
  briefcase: Briefcase,
  store: Store,
};

export function PropertyTypes() {
  return (
    <section className="relative overflow-hidden py-24 md:py-28">
      <PropertyTypesBackground />

      <div className="container-x relative z-10">
        <motion.header
          variants={revealContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-10% 0%" }}
          className="mb-12 grid max-w-[760px] gap-3.5 md:mb-16 lg:mx-[60px]"
        >
          <motion.span variants={reveal} className="eyebrow">
            {servicesPage.propertyTypes.eyebrow}
          </motion.span>
          <motion.h2 variants={reveal} className="display-h2">
            {servicesPage.propertyTypes.headline.lead}{" "}
            <em>{servicesPage.propertyTypes.headline.emphasis}</em>
          </motion.h2>
          <motion.p variants={reveal} className="lede mt-1 max-w-[58ch]">
            {servicesPage.propertyTypes.lede}
          </motion.p>
        </motion.header>

        <motion.ul
          variants={revealContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-5% 0%" }}
          className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:mx-[60px] lg:grid-cols-6"
        >
          {servicesPage.propertyTypes.items.map((p) => {
            const Icon = PROPERTY_ICONS[p.icon] ?? HomeIcon;
            return (
              <motion.li
                key={p.label}
                variants={reveal}
                className="group relative isolate flex flex-col items-center gap-3 overflow-hidden rounded-[18px] border border-line bg-bg-elev/85 p-5 backdrop-blur-md transition-all duration-500 hover:border-[color:var(--color-accent)]/55 hover:shadow-[0_24px_60px_-22px_rgba(68,28,124,0.32)]"
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 -z-10 opacity-50"
                  style={{
                    background:
                      "radial-gradient(circle at 50% 0%, var(--color-gold-soft) 0%, transparent 60%)",
                  }}
                />
                <span className="grid size-12 place-items-center rounded-full border border-line-strong bg-bg-warm text-[color:var(--color-accent)] transition-all duration-500 group-hover:border-[color:var(--color-accent)] group-hover:bg-[color:var(--color-accent)] group-hover:text-white">
                  <Icon className="size-5" strokeWidth={1.5} />
                </span>
                <span className="font-serif text-[16px] tracking-[-0.012em] text-ink">
                  {p.label}
                </span>
              </motion.li>
            );
          })}
        </motion.ul>
      </div>
    </section>
  );
}

/* ============================================================== */
/*  ALERTS — three "always-on" feature cards                       */
/* ============================================================== */

const ALERT_ICONS = [Bell, TrendingDown, Sparkles];

export function ServiceAlerts() {
  return (
    <section className="relative overflow-hidden py-24 md:py-28">
      <AlertsBackground />

      <div className="container-x relative z-10">
        <motion.header
          variants={revealContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-10% 0%" }}
          className="mb-12 grid max-w-[760px] gap-3.5 md:mb-16 lg:mx-[60px]"
        >
          <motion.span variants={reveal} className="eyebrow">
            {servicesPage.alerts.eyebrow}
          </motion.span>
          <motion.h2 variants={reveal} className="display-h2">
            {servicesPage.alerts.headline.lead}{" "}
            <em>{servicesPage.alerts.headline.emphasis}</em>
          </motion.h2>
        </motion.header>

        <motion.div
          variants={revealContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-5% 0%" }}
          className="grid gap-6 md:grid-cols-3 md:gap-8 lg:mx-[60px]"
        >
          {servicesPage.alerts.cards.map((card, i) => {
            const Icon = ALERT_ICONS[i] ?? Bell;
            return (
              <motion.article
                key={card.title}
                variants={reveal}
                className="group relative isolate flex h-full flex-col gap-5 overflow-hidden rounded-[22px] border border-line bg-bg-elev/85 p-6 backdrop-blur-md transition-all duration-700 ease-out hover:shadow-[0_28px_70px_-22px_rgba(184,148,90,0.32)] md:p-7"
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 -z-10 opacity-55"
                  style={{
                    background:
                      "radial-gradient(circle at 80% 12%, var(--color-gold-soft) 0%, transparent 55%), radial-gradient(circle at 12% 88%, var(--color-accent-soft) 0%, transparent 55%)",
                  }}
                />

                <header className="flex items-start justify-between gap-4">
                  <span className="grid size-12 place-items-center rounded-full border border-line-strong bg-bg-warm text-[color:var(--color-gold)] transition-all duration-500 group-hover:border-[color:var(--color-gold)] group-hover:bg-[color:var(--color-gold)] group-hover:text-white">
                    <Icon className="size-5" strokeWidth={1.5} />
                  </span>
                  <span
                    className="font-serif italic leading-none tracking-[-0.02em] text-[color:var(--color-accent)]/70"
                    style={{ fontSize: "22px" }}
                  >
                    0{i + 1}
                  </span>
                </header>

                <h3
                  className="font-serif font-normal tracking-[-0.018em] text-ink"
                  style={{ fontSize: "clamp(22px, 2vw, 28px)", lineHeight: 1.15 }}
                >
                  {card.title}
                </h3>
                <span
                  aria-hidden
                  className="block h-px w-12 bg-gradient-to-r from-[color:var(--color-gold)] to-transparent transition-all duration-500 group-hover:w-32"
                />
                <p className="text-[14.5px] leading-[1.65] text-ink-2 md:text-[15px]">
                  {card.body}
                </p>

                <span
                  aria-hidden
                  className="pointer-events-none absolute left-0 top-0 h-px w-0 bg-[color:var(--color-accent)] transition-all duration-700 ease-out group-hover:w-full"
                />
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

/* ============================================================== */
/*  BUYING vs SELLING — long-form expanded section                */
/* ============================================================== */

export function BuyingSelling() {
  const data = servicesPage.buyingSelling;
  // Source order:
  //   p0 — sets up the buy/sell distinction (intro)
  //   p1 — buyer-focused
  //   p2 — seller-focused
  //   p3 — closing summary, used as the pull-quote at the end
  const [intro, buyParagraph, sellParagraph, closingQuote] = data.paragraphs;
  const [buyCol, sellCol] = data.columns;

  // Scroll-driven parallax for the vertical stroke title.
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
  // Drifts opposite to scroll (mirrors siblings on this page).
  const titleY = useTransform(smooth, [0, 1], ["18%", "-22%"]);
  // Illustration drifts the opposite direction from the right-side title,
  // and rotates a touch — gives the section depth without competing.
  const illustrationY = useTransform(smooth, [0, 1], ["-14%", "18%"]);
  const illustrationRotate = useTransform(smooth, [0, 1], [-3, 3]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-28 md:py-36"
    >
      <BuyingSellingBackground />

      {/* Vertical "Partner" stroke title — RIGHT, accent purple, parallax.
          Counter-balances the "Pillars" gold stroke on the left of the
          Featured Services section just above. */}
      <motion.div
        aria-hidden
        style={{ y: titleY }}
        className="pointer-events-none absolute inset-y-0 right-[24px] z-[1] hidden w-[140px] items-center justify-center md:flex lg:right-[40px] lg:w-[160px]"
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
          {data.titleStroke}
        </span>
      </motion.div>

      {/* Editorial vector illustration — LEFT, absolute, vertical column,
          scroll parallax. Mirrors the vertical "Partner" stroke on the
          right. Hidden below lg+ to avoid crowding the cards on tablet/
          phone. Sits behind foreground (z-[1]) so content is never
          interrupted; opacity-90 so it reads as a decorative companion. */}
      <motion.div
        aria-hidden
        style={{ y: illustrationY, rotate: illustrationRotate }}
        className="pointer-events-none absolute inset-y-0 left-[-10px] z-[1] hidden w-[180px] items-center justify-center opacity-90 lg:flex xl:left-[40px] xl:w-[220px]"
      >
        <CrossroadsIllustration />
      </motion.div>

      <div className="container-x relative z-10">
        {/* ============== CHAPTER MARKER + HEADLINE ============== */}
        <motion.header
          variants={revealContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-10% 0%" }}
          className="mb-12 grid max-w-[920px] gap-7 md:mb-16 lg:mx-[60px]"
        >
          {/* Chapter marker — Roman numeral + small-caps eyebrow + hairline */}
          <motion.div
            variants={reveal}
            className="flex items-center gap-3.5"
          >
            <span
              className="font-serif italic leading-none tracking-[-0.02em] text-[color:var(--color-gold)]"
              style={{ fontSize: "32px" }}
            >
              IV.
            </span>
            <span
              aria-hidden
              className="h-px w-12 bg-[color:var(--color-gold)]"
            />
            <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-ink-2">
              {data.eyebrow}
            </span>
            <span aria-hidden className="h-px flex-1 bg-line" />
          </motion.div>

          {/* Display headline */}
          <motion.h2
            variants={reveal}
            className="font-serif font-normal text-ink"
            style={{
              fontSize: "clamp(40px, 5.6vw, 80px)",
              lineHeight: 1.0,
              letterSpacing: "-0.03em",
            }}
          >
            {data.headline.lead}{" "}
            <em className="text-accent" style={{ fontStyle: "italic" }}>
              {data.headline.emphasis}
            </em>
          </motion.h2>

          {/* Lead paragraph (intro) — drop cap, larger type */}
          <motion.p
            variants={reveal}
            className="max-w-[68ch] text-[17px] leading-[1.7] text-ink-2 first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:font-serif first-letter:text-[68px] first-letter:font-normal first-letter:leading-[0.85] first-letter:tracking-[-0.02em] first-letter:text-accent md:text-[18.5px]"
          >
            {intro}
          </motion.p>
        </motion.header>

        {/* ============== ORNAMENTAL DIVIDER ============== */}
        <motion.div
          variants={reveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-10% 0%" }}
          className="my-14 flex items-center justify-center gap-4 md:my-20"
          aria-hidden
        >
          <span className="h-px w-20 bg-gradient-to-r from-transparent to-[color:var(--color-gold)]" />
          <span className="text-[color:var(--color-gold)] opacity-60">◆</span>
          <span className="font-serif text-[12px] italic tracking-[0.18em] text-ink-3">
            BUY  ·  or  ·  SELL
          </span>
          <span className="text-[color:var(--color-gold)] opacity-60">◆</span>
          <span className="h-px w-20 bg-gradient-to-l from-transparent to-[color:var(--color-gold)]" />
        </motion.div>

        {/* ============== TWO-COLUMN COMPARISON ============== */}
        <motion.div
          variants={revealContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-5% 0%" }}
          className="grid gap-6 md:gap-8 lg:mx-[40px] lg:grid-cols-2"
        >
          <ComparisonCard
            numeral="I"
            eyebrow={buyCol.title}
            title="If you decide to buy"
            verb="Buy"
            paragraph={buyParagraph}
            bullets={buyCol.bullets}
            icon={<KeyRound className="size-6" strokeWidth={1.4} />}
            theme="accent"
          />
          <ComparisonCard
            numeral="II"
            eyebrow={sellCol.title}
            title="If you decide to sell"
            verb="Sell"
            paragraph={sellParagraph}
            bullets={sellCol.bullets}
            icon={<BadgePercent className="size-6" strokeWidth={1.4} />}
            theme="gold"
          />
        </motion.div>

        {/* ============== CLOSING PULL-QUOTE ============== */}
        <motion.figure
          variants={revealContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-10% 0%" }}
          className="relative mx-auto mt-20 max-w-[920px] md:mt-28 lg:mx-[40px]"
        >
          {/* Top + bottom hairlines that anchor the quote like a print pull-out */}
          <motion.span
            variants={reveal}
            aria-hidden
            className="block h-px w-full bg-gradient-to-r from-transparent via-line-strong to-transparent"
          />
          <motion.div
            variants={reveal}
            className="relative grid gap-5 px-3 py-10 md:grid-cols-[auto_1fr] md:items-start md:gap-8 md:px-8 md:py-14"
          >
            {/* Big oversized opening quote glyph */}
            <span
              aria-hidden
              className="inline-grid size-14 place-items-center rounded-full border border-[color:var(--color-gold)]/45 bg-bg-elev/85 text-[color:var(--color-gold)] shadow-[0_18px_44px_-22px_rgba(184,148,90,0.45)] backdrop-blur md:size-16"
            >
              <Quote className="size-6 md:size-7" strokeWidth={1.5} />
            </span>

            <blockquote
              className="font-serif italic tracking-[-0.018em] text-ink"
              style={{
                fontSize: "clamp(22px, 2.4vw, 32px)",
                lineHeight: 1.3,
              }}
            >
              <span className="text-accent">{closingQuote.split(" ").slice(0, 2).join(" ")}</span>
              {closingQuote.length > 0 ? " " : ""}
              {closingQuote.split(" ").slice(2).join(" ")}
            </blockquote>
          </motion.div>
          <motion.span
            variants={reveal}
            aria-hidden
            className="block h-px w-full bg-gradient-to-r from-transparent via-line-strong to-transparent"
          />
        </motion.figure>
      </div>
    </section>
  );
}

/**
 * ComparisonCard — premium buy/sell card. Distinct accent (purple) vs
 * gold themes, big serif Roman numeral, oversized icon, paragraph,
 * "What I'll do for you" sub-label, and a custom-styled bullet list.
 */
function ComparisonCard({
  numeral,
  eyebrow,
  title,
  verb,
  paragraph,
  bullets,
  icon,
  theme,
}: {
  numeral: string;
  eyebrow: string;
  title: string;
  verb: string;
  paragraph: string;
  bullets: readonly string[];
  icon: React.ReactNode;
  theme: "accent" | "gold";
}) {
  const accentVar =
    theme === "accent" ? "var(--color-accent)" : "var(--color-gold)";
  const accentSoftVar =
    theme === "accent" ? "var(--color-accent-soft)" : "var(--color-gold-soft)";

  return (
    <motion.article
      variants={reveal}
      className="group relative isolate flex h-full flex-col overflow-hidden rounded-[26px] border border-line-strong bg-bg-elev/90 p-7 shadow-[0_2px_6px_-2px_rgba(10,10,10,0.05),0_24px_60px_-22px_rgba(10,10,10,0.16)] backdrop-blur-md transition-all duration-700 ease-out hover:shadow-[0_4px_10px_-2px_rgba(10,10,10,0.08),0_36px_80px_-22px_rgba(68,28,124,0.32)] md:p-9"
    >
      {/* Inner ambient mesh — themed */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-65"
        style={{
          background: `radial-gradient(circle at 82% 14%, ${accentSoftVar} 0%, transparent 55%), radial-gradient(circle at 14% 86%, var(--color-gold-soft) 0%, transparent 55%)`,
        }}
      />

      {/* Top hairline that sweeps in on hover — themed */}
      <span
        aria-hidden
        className="pointer-events-none absolute left-0 top-0 h-px w-0 transition-all duration-700 ease-out group-hover:w-full"
        style={{ background: accentVar }}
      />

      {/* Outer gold corner ornaments — fade in on hover */}
      <CardCorner position="tl" color={accentVar} />
      <CardCorner position="tr" color={accentVar} />

      {/* HEADER — verb badge + numeral + icon */}
      <header className="mb-7 flex items-start justify-between gap-4">
        <div className="grid gap-2.5">
          {/* Verb badge — small pill */}
          <span
            className="inline-flex w-fit items-center gap-1.5 rounded-full border px-3 py-1 text-[10.5px] font-medium uppercase tracking-[0.16em]"
            style={{
              borderColor: `color-mix(in oklch, ${accentVar} 50%, transparent)`,
              color: accentVar,
              background: `color-mix(in oklch, ${accentVar} 8%, transparent)`,
            }}
          >
            <span
              aria-hidden
              className="size-1.5 rounded-full"
              style={{ background: accentVar }}
            />
            {verb}
          </span>
          <span className="text-[10.5px] font-medium uppercase tracking-[0.18em] text-ink-3">
            {eyebrow}
          </span>
          <h3
            className="font-serif font-normal leading-[1.05] tracking-[-0.022em] text-ink"
            style={{ fontSize: "clamp(26px, 2.6vw, 36px)" }}
          >
            {title}
            <span style={{ color: accentVar }}>.</span>
          </h3>
        </div>

        {/* Big icon disc + Roman numeral stacked */}
        <div className="flex flex-col items-end gap-3">
          <span
            className="grid size-14 shrink-0 place-items-center rounded-2xl border border-line-strong bg-bg-warm transition-all duration-500 group-hover:scale-[1.04]"
            style={{ color: accentVar }}
          >
            {icon}
          </span>
          <span
            className="font-serif italic leading-none tracking-[-0.04em]"
            style={{
              fontSize: "clamp(38px, 3.6vw, 56px)",
              color: accentVar,
              opacity: 0.55,
            }}
          >
            {numeral}
          </span>
        </div>
      </header>

      {/* HAIRLINE WITH GOLD TICK */}
      <div className="mb-6 flex items-center gap-3" aria-hidden>
        <span
          className="size-1.5 rounded-full"
          style={{ background: "var(--color-gold)" }}
        />
        <span className="h-px flex-1 bg-line-strong" />
        <span
          className="size-1.5 rounded-full"
          style={{ background: accentVar, opacity: 0.55 }}
        />
      </div>

      {/* PARAGRAPH */}
      <p className="text-[15.5px] leading-[1.7] text-ink-2 md:text-[16.5px]">
        {paragraph}
      </p>

      {/* SUB-LABEL */}
      <span className="mb-3 mt-7 block text-[10.5px] font-medium uppercase tracking-[0.18em] text-ink-3">
        What you can expect
      </span>

      {/* BULLETS */}
      <ul className="grid gap-3.5">
        {bullets.map((b, j) => (
          <li
            key={j}
            className="flex items-start gap-3 text-[14.5px] leading-[1.6] text-ink-2 md:text-[15px]"
          >
            <span
              className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full border"
              style={{
                borderColor: `color-mix(in oklch, ${accentVar} 35%, transparent)`,
                background: accentSoftVar,
                color: accentVar,
              }}
            >
              <span className="font-serif text-[10.5px] italic tabular-nums">
                {String(j + 1).padStart(2, "0")}
              </span>
            </span>
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </motion.article>
  );
}

function CardCorner({
  position,
  color,
}: {
  position: "tl" | "tr";
  color: string;
}) {
  const positionClass = {
    tl: "left-3 top-3",
    tr: "right-3 top-3",
  }[position];
  const rotate = { tl: 0, tr: 90 }[position];
  return (
    <span
      aria-hidden
      className={`pointer-events-none absolute size-4 opacity-0 transition-opacity duration-500 group-hover:opacity-100 ${positionClass}`}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <svg
        viewBox="0 0 16 16"
        fill="none"
        stroke={color}
        strokeWidth="1.4"
        strokeLinecap="round"
      >
        <path d="M 2 9 L 2 2 L 9 2" />
        <circle cx="2" cy="2" r="1" fill={color} stroke="none" />
      </svg>
    </span>
  );
}

/* ============================================================== */
/*  CROSSROADS ILLUSTRATION — heritage key bridging two homes      */
/* ============================================================== */

/**
 * CrossroadsIllustration — vertical editorial vector. Read top-to-bottom:
 * a peak-roofed cottage, a long dotted connector, an ornate skeleton key
 * (oriented vertically with the bow up and the bit pointing right), a
 * second connector, then a three-storey townhouse anchoring the bottom.
 * Every outline draws on view (Framer Motion's `pathLength`), the key
 * gently sways, the connectors carry continuous dash flow, and three
 * gold particles bob alongside the column. No text labels — the
 * composition is purely figurative.
 *
 * Returns the bare SVG (no figure wrapper / captions) so the parent can
 * position it freely. Currently used as an absolute-placed parallax
 * decoration on the left side of the Buying-vs-Selling section.
 */
function CrossroadsIllustration() {
  const accent = "var(--color-accent)";
  const gold = "var(--color-gold)";
  const ink2 = "var(--color-ink-2)";

  // Reusable path-draw transition — quart ease-out, ~1.5s, slight stagger.
  const drawTransition = (delay = 0) => ({
    pathLength: { duration: 1.5, ease: [0.22, 1, 0.36, 1], delay },
    opacity: { duration: 0.3, delay },
  });
  const drawProps = (delay = 0) => ({
    initial: { pathLength: 0, opacity: 0 },
    whileInView: { pathLength: 1, opacity: 1 },
    viewport: { once: true, margin: "-10% 0%" },
    transition: drawTransition(delay),
  });

  // Vertical viewBox: 280 wide × 880 tall (~1:3 portrait).
  return (
    <div className="relative aspect-[280/880] w-full">
      <svg
        viewBox="0 0 280 880"
        className="absolute inset-0 size-full"
        fill="none"
        aria-hidden
        role="presentation"
      >
        {/* ----------------------------- DEFS ----------------------------- */}
        <defs>
          <linearGradient id="cs-key-v" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor={gold} />
            <stop offset="50%" stopColor={accent} />
            <stop offset="100%" stopColor={gold} />
          </linearGradient>
          <radialGradient id="cs-bow-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={gold} stopOpacity="0.18" />
            <stop offset="100%" stopColor={gold} stopOpacity="0" />
          </radialGradient>
          <radialGradient id="cs-floor-v" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={ink2} stopOpacity="0.08" />
            <stop offset="100%" stopColor={ink2} stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* ============================================================ */}
        {/*  TOP COTTAGE — y 60 → 240                                    */}
        {/* ============================================================ */}
        <g>
          {/* Body + peaked roof outline */}
          <motion.path
            d="M 70 240 L 70 158 L 140 92 L 210 158 L 210 240 Z"
            stroke={accent}
            strokeWidth="1.6"
            strokeLinejoin="round"
            {...drawProps(0.1)}
          />
          {/* Chimney */}
          <motion.path
            d="M 178 119 L 178 100 L 192 100 L 192 132"
            stroke={accent}
            strokeWidth="1.4"
            strokeLinecap="round"
            {...drawProps(0.35)}
          />
          {/* Door */}
          <motion.path
            d="M 128 240 L 128 198 Q 128 188 140 188 Q 152 188 152 198 L 152 240"
            stroke={accent}
            strokeWidth="1.4"
            {...drawProps(0.55)}
          />
          <motion.circle
            cx="148"
            cy="216"
            r="1.4"
            fill={gold}
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, margin: "-10% 0%" }}
            transition={{ duration: 0.4, delay: 1.1 }}
          />
          {/* Windows — two squares flanking the door */}
          <motion.rect
            x="86"
            y="180"
            width="32"
            height="32"
            rx="2"
            stroke={accent}
            strokeWidth="1.2"
            strokeOpacity="0.7"
            {...drawProps(0.7)}
          />
          <motion.path
            d="M 86 196 L 118 196 M 102 180 L 102 212"
            stroke={accent}
            strokeWidth="1"
            strokeOpacity="0.5"
            {...drawProps(0.85)}
          />
          <motion.rect
            x="162"
            y="180"
            width="32"
            height="32"
            rx="2"
            stroke={accent}
            strokeWidth="1.2"
            strokeOpacity="0.7"
            {...drawProps(0.75)}
          />
          <motion.path
            d="M 162 196 L 194 196 M 178 180 L 178 212"
            stroke={accent}
            strokeWidth="1"
            strokeOpacity="0.5"
            {...drawProps(0.9)}
          />
          {/* Doorstep */}
          <motion.path
            d="M 60 240 L 220 240"
            stroke={accent}
            strokeWidth="1.4"
            strokeLinecap="round"
            {...drawProps(0.0)}
          />
          {/* Roof attic vent — gold accent diamond */}
          <motion.path
            d="M 140 130 L 150 140 L 140 150 L 130 140 Z"
            stroke={gold}
            strokeWidth="1.2"
            fill={gold}
            fillOpacity="0.18"
            {...drawProps(0.95)}
          />
        </g>

        {/* ============================================================ */}
        {/*  TOP CONNECTOR — y 240 → 332                                 */}
        {/* ============================================================ */}
        <motion.path
          d="M 140 248 L 140 332"
          stroke={gold}
          strokeWidth="1.4"
          strokeDasharray="3 7"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 0.85 }}
          viewport={{ once: true, margin: "-10% 0%" }}
          transition={{
            pathLength: { duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.6 },
            opacity: { duration: 0.4, delay: 0.6 },
          }}
        />
        {/* Continuous downward dash flow on the connector */}
        <motion.path
          d="M 140 248 L 140 332"
          stroke={accent}
          strokeWidth="1.2"
          strokeOpacity="0.4"
          strokeDasharray="2 16"
          strokeLinecap="round"
          initial={{ strokeDashoffset: 0 }}
          animate={{ strokeDashoffset: -120 }}
          transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
        />
        <motion.circle cx="140" cy="248" r="3" fill={gold} {...drawProps(2.0)} />
        <motion.circle cx="140" cy="332" r="3" fill={gold} {...drawProps(2.1)} />

        {/* ============================================================ */}
        {/*  HERITAGE KEY — vertical, bow ABOVE shaft, teeth on RIGHT    */}
        {/*  Bow centred at (140, 380); shaft from y 408 → 552; tip 552  */}
        {/* ============================================================ */}
        <motion.g
          style={{ transformOrigin: "140px 460px", transformBox: "fill-box" }}
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-10% 0%" }}
          transition={{ duration: 0.9, delay: 1.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.g
            style={{ transformOrigin: "140px 460px", transformBox: "fill-box" }}
            animate={{ rotate: [-4, 4, -4] }}
            transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
          >
            {/* Soft glow halo behind the bow */}
            <circle cx="140" cy="380" r="44" fill="url(#cs-bow-glow)" />
            {/* Bow — outer ring */}
            <circle
              cx="140"
              cy="380"
              r="26"
              stroke="url(#cs-key-v)"
              strokeWidth="2.2"
              fill="none"
            />
            {/* Bow — inner ring */}
            <circle
              cx="140"
              cy="380"
              r="18"
              stroke={accent}
              strokeWidth="1"
              strokeOpacity="0.6"
              fill="none"
            />
            {/* Bow — cross (heritage motif) */}
            <line x1="130" y1="380" x2="150" y2="380" stroke={accent} strokeWidth="1" strokeOpacity="0.55" />
            <line x1="140" y1="370" x2="140" y2="390" stroke={accent} strokeWidth="1" strokeOpacity="0.55" />
            <circle cx="140" cy="380" r="2.5" fill={gold} />
            {/* Connector — between bow and shaft */}
            <line
              x1="140"
              y1="406"
              x2="140"
              y2="414"
              stroke="url(#cs-key-v)"
              strokeWidth="2.4"
              strokeLinecap="round"
            />
            {/* Shaft — vertical */}
            <line
              x1="140"
              y1="414"
              x2="140"
              y2="552"
              stroke="url(#cs-key-v)"
              strokeWidth="3.2"
              strokeLinecap="round"
            />
            {/* Bit — two teeth pointing right */}
            <path
              d="M 140 510 L 154 510 L 154 518 L 140 518"
              stroke="url(#cs-key-v)"
              strokeWidth="2.6"
              fill="none"
              strokeLinejoin="miter"
            />
            <path
              d="M 140 528 L 158 528 L 158 538 L 140 538"
              stroke="url(#cs-key-v)"
              strokeWidth="2.6"
              fill="none"
              strokeLinejoin="miter"
            />
            {/* Tip cap */}
            <circle cx="140" cy="552" r="3.5" fill={gold} />
          </motion.g>
        </motion.g>

        {/* ============================================================ */}
        {/*  BOTTOM CONNECTOR — y 580 → 660                              */}
        {/* ============================================================ */}
        <motion.path
          d="M 140 580 L 140 660"
          stroke={gold}
          strokeWidth="1.4"
          strokeDasharray="3 7"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 0.85 }}
          viewport={{ once: true, margin: "-10% 0%" }}
          transition={{
            pathLength: { duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 1.0 },
            opacity: { duration: 0.4, delay: 1.0 },
          }}
        />
        <motion.path
          d="M 140 580 L 140 660"
          stroke={accent}
          strokeWidth="1.2"
          strokeOpacity="0.4"
          strokeDasharray="2 16"
          strokeLinecap="round"
          initial={{ strokeDashoffset: 0 }}
          animate={{ strokeDashoffset: -120 }}
          transition={{ duration: 7, repeat: Infinity, ease: "linear", delay: 0.5 }}
        />
        <motion.circle cx="140" cy="580" r="3" fill={gold} {...drawProps(2.4)} />
        <motion.circle cx="140" cy="660" r="3" fill={gold} {...drawProps(2.5)} />

        {/* ============================================================ */}
        {/*  BOTTOM TOWNHOUSE — y 660 → 840 (3-storey, narrow)           */}
        {/* ============================================================ */}
        <g>
          {/* Outer outline — flat-top stepped roof + body */}
          <motion.path
            d="M 70 840 L 70 700 L 110 670 L 170 670 L 210 700 L 210 840 Z"
            stroke={accent}
            strokeWidth="1.6"
            strokeLinejoin="round"
            {...drawProps(1.4)}
          />
          {/* Floor lines */}
            <motion.path
            d="M 70 740 L 210 740 M 70 790 L 210 790"
            stroke={accent}
            strokeWidth="1"
            strokeOpacity="0.45"
            {...drawProps(1.55)}
          />
          {/* Top window (in roof gable) */}
          <motion.rect
            x="124"
            y="688"
            width="32"
            height="22"
            rx="2"
            stroke={accent}
            strokeWidth="1.2"
            strokeOpacity="0.7"
            {...drawProps(1.7)}
          />
          <motion.path
            d="M 124 699 L 156 699 M 140 688 L 140 710"
            stroke={accent}
            strokeWidth="1"
            strokeOpacity="0.5"
            {...drawProps(1.8)}
          />
          {/* Mid windows row — two */}
          <motion.rect
            x="86"
            y="752"
            width="44"
            height="26"
            rx="2"
            stroke={accent}
            strokeWidth="1.2"
            strokeOpacity="0.7"
            {...drawProps(1.85)}
          />
          <motion.rect
            x="150"
            y="752"
            width="44"
            height="26"
            rx="2"
            stroke={accent}
            strokeWidth="1.2"
            strokeOpacity="0.7"
            {...drawProps(1.9)}
          />
          {/* Door */}
          <motion.path
            d="M 122 840 L 122 802 L 158 802 L 158 840"
            stroke={accent}
            strokeWidth="1.4"
            {...drawProps(1.95)}
          />
          <motion.path
            d="M 122 821 L 158 821"
            stroke={accent}
            strokeWidth="1"
            strokeOpacity="0.4"
            {...drawProps(2.05)}
          />
          <motion.circle
            cx="153"
            cy="822"
            r="1.4"
            fill={gold}
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, margin: "-10% 0%" }}
            transition={{ duration: 0.4, delay: 2.2 }}
          />
          {/* Side windows flanking door */}
          <motion.rect
            x="86"
            y="806"
            width="28"
            height="26"
            rx="2"
            stroke={accent}
            strokeWidth="1.2"
            strokeOpacity="0.7"
            {...drawProps(2.0)}
          />
          <motion.rect
            x="166"
            y="806"
            width="28"
            height="26"
            rx="2"
            stroke={accent}
            strokeWidth="1.2"
            strokeOpacity="0.7"
            {...drawProps(2.05)}
          />
          {/* Doorstep + soft floor shadow */}
          <ellipse cx="140" cy="850" rx="120" ry="6" fill="url(#cs-floor-v)" />
          <motion.path
            d="M 60 840 L 220 840"
            stroke={accent}
            strokeWidth="1.4"
            strokeLinecap="round"
            {...drawProps(1.45)}
          />
        </g>

        {/* ============================================================ */}
        {/*  FLOATING PARTICLES — gold + accent dots beside the column   */}
        {/* ============================================================ */}
        <motion.circle
          cx="42"
          cy="440"
          r="2.4"
          fill={gold}
          animate={{ y: [0, -12, 0], opacity: [0.45, 0.95, 0.45] }}
          transition={{ duration: 4.4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.circle
          cx="238"
          cy="500"
          r="2"
          fill={accent}
          fillOpacity="0.6"
          animate={{ y: [0, -10, 0], opacity: [0.4, 0.8, 0.4] }}
          transition={{
            duration: 3.6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.6,
          }}
        />
        <motion.circle
          cx="46"
          cy="560"
          r="1.8"
          fill={gold}
          animate={{ y: [0, -8, 0], opacity: [0.35, 0.75, 0.35] }}
          transition={{
            duration: 5.2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.4,
          }}
        />
        <motion.circle
          cx="232"
          cy="380"
          r="2.6"
          fill={gold}
          animate={{ y: [0, -14, 0], opacity: [0.5, 0.9, 0.5] }}
          transition={{
            duration: 4.8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.2,
          }}
        />
      </svg>
    </div>
  );
}

/* ============================================================== */
/*  CTA BANNER                                                    */
/* ============================================================== */

export function ServicesCtaBanner() {
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
              {servicesPage.ctaBanner.eyebrow}
            </motion.span>
            <motion.h2
              variants={reveal}
              className="font-serif font-normal leading-[1.02] tracking-[-0.025em] text-white"
              style={{ fontSize: "clamp(36px, 5vw, 64px)" }}
            >
              {servicesPage.ctaBanner.headline.lead}{" "}
              <em className="text-[color:var(--color-gold)]">
                {servicesPage.ctaBanner.headline.emphasis}
              </em>
            </motion.h2>
            <motion.p
              variants={reveal}
              className="max-w-[58ch] text-[16px] leading-[1.6] text-white/75 md:text-[17px]"
            >
              {servicesPage.ctaBanner.body}
            </motion.p>
          </div>

          <motion.div
            variants={reveal}
            className="flex flex-col gap-3 lg:items-end"
          >
            <a
              href={`tel:${site.phone.replace(/\s/g, "")}`}
              className="inline-flex items-center gap-3 rounded-full border border-white/30 bg-white/8 px-7 py-4 font-serif text-[20px] tabular-nums tracking-[-0.015em] text-white backdrop-blur-sm transition-all duration-500 hover:border-[color:var(--color-gold)] hover:bg-white/12 md:text-[22px]"
            >
              <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/60">
                {servicesPage.ctaBanner.primaryLabel}
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
/*  BACKGROUNDS / DECORATIONS                                     */
/* ============================================================== */

/**
 * ConcentricArcs — radial backdrop unique to /services. Distinct from
 * About's dot grid, Listings' blueprint grid, and Contact's ruled paper.
 */
function ConcentricArcs() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 1200 800"
      preserveAspectRatio="xMidYMid slice"
      className="pointer-events-none absolute inset-0 z-[1] h-full w-full opacity-[0.13]"
      fill="none"
      style={{
        maskImage:
          "radial-gradient(ellipse at 75% 60%, black 0%, transparent 75%)",
        WebkitMaskImage:
          "radial-gradient(ellipse at 75% 60%, black 0%, transparent 75%)",
      }}
    >
      {Array.from({ length: 14 }).map((_, i) => {
        const r = 80 + i * 60;
        return (
          <circle
            key={i}
            cx="900"
            cy="430"
            r={r}
            stroke={i % 4 === 0 ? "var(--color-gold)" : "var(--color-accent)"}
            strokeWidth={i % 4 === 0 ? 1.4 : 0.9}
            strokeOpacity={0.7 - i * 0.04}
            strokeDasharray={i % 3 === 1 ? "2 6" : undefined}
          />
        );
      })}
    </svg>
  );
}

function ServicesHeroBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(168deg, #FAFAF7 0%, #F4EFE0 30%, #ECE7F2 70%, #DCD3EC 100%)",
        }}
      />
      <div
        className="absolute -inset-1/4 opacity-[0.18]"
        style={{
          background:
            "conic-gradient(from 40deg at 70% 50%, transparent 0%, var(--color-gold-soft) 22%, transparent 45%, rgba(90,42,156,0.42) 68%, transparent 90%, var(--color-gold-soft) 100%)",
          animation: "spin-slow 110s linear infinite",
          filter: "blur(60px)",
        }}
      />
      <div
        className="absolute -right-32 -top-24 size-[520px] rounded-full opacity-50 blur-[110px]"
        style={{
          background:
            "radial-gradient(circle, rgba(90,42,156,0.32) 0%, transparent 70%)",
          animation: "mesh-1 30s var(--ease-soft) infinite",
        }}
      />
      <div
        className="absolute -left-32 bottom-0 size-[480px] rounded-full opacity-45 blur-[110px]"
        style={{
          background:
            "radial-gradient(circle, var(--color-gold-soft) 0%, transparent 70%)",
          animation: "mesh-2 32s var(--ease-soft) infinite",
        }}
      />
    </div>
  );
}

function IntroBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(170deg, #FAF6EC 0%, #F4F2EA 50%, #ECE7F2 100%)",
        }}
      />
      <div
        className="absolute -right-24 top-1/3 size-[440px] rounded-full opacity-40 blur-[110px]"
        style={{
          background:
            "radial-gradient(circle, rgba(90,42,156,0.28) 0%, transparent 70%)",
          animation: "mesh-1 32s var(--ease-soft) infinite",
        }}
      />
    </div>
  );
}

function FeaturedBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(165deg, #FAFAF7 0%, #ECE7F2 50%, #FAF6EC 100%)",
        }}
      />
      <div
        className="absolute -left-28 top-1/4 size-[480px] rounded-full opacity-45 blur-[110px]"
        style={{
          background:
            "radial-gradient(circle, var(--color-gold-soft) 0%, transparent 70%)",
          animation: "mesh-2 30s var(--ease-soft) infinite",
        }}
      />
      <div
        className="absolute -right-24 bottom-0 size-[460px] rounded-full opacity-40 blur-[110px]"
        style={{
          background:
            "radial-gradient(circle, rgba(90,42,156,0.28) 0%, transparent 70%)",
          animation: "mesh-1 32s var(--ease-soft) infinite",
        }}
      />
    </div>
  );
}

function PropertyTypesBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(168deg, #ECE7F2 0%, #FAF6EC 60%, #FAFAF7 100%)",
        }}
      />
      <div
        className="absolute left-1/2 top-1/3 size-[460px] -translate-x-1/2 rounded-full opacity-40 blur-[110px]"
        style={{
          background:
            "radial-gradient(circle, var(--color-gold-soft) 0%, transparent 70%)",
        }}
      />
    </div>
  );
}

function AlertsBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(170deg, #FAF6EC 0%, #F4EFE0 60%, #ECE7F2 100%)",
        }}
      />
      <div
        className="absolute -right-28 -top-24 size-[520px] rounded-full opacity-45 blur-[110px]"
        style={{
          background:
            "radial-gradient(circle, var(--color-gold-soft) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute -left-24 bottom-0 size-[460px] rounded-full opacity-45 blur-[110px]"
        style={{
          background:
            "radial-gradient(circle, rgba(90,42,156,0.28) 0%, transparent 70%)",
        }}
      />
    </div>
  );
}

function BuyingSellingBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(168deg, #FAFAF7 0%, #F4F2EA 40%, #ECE7F2 100%)",
        }}
      />
    </div>
  );
}
