"use client";

import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import {
  Building,
  Building2,
  Briefcase,
  ChevronDown,
  Compass,
  Handshake,
  Home as HomeIcon,
  KeyRound,
  Store,
  type LucideIcon,
} from "lucide-react";
import { homeBuying } from "@/content";
import { reveal, revealContainer } from "@/lib/motion";

/**
 * Home page "Home buying" section — verbatim copy from aliazam.ca/.
 *
 *   • Property type categories — 6-chip horizontal strip.
 *   • Three-item accordion — "Home buying process", "Making An Offer",
 *     "Finding The Right Home". Each body paragraph verbatim from source.
 *
 * Accordion behaviour: only one item is open at a time, the first item
 * is open by default, height + opacity animate via Framer Motion's
 * AnimatePresence with a quart ease-out, and the gold left rule on the
 * row brightens to mark the active item.
 *
 * Visual language matches sibling sections: vertical stroke title with
 * scroll parallax, gradient mesh background, serif italics, gold + purple
 * accents.
 */

const CATEGORY_ICONS: Record<string, LucideIcon> = {
  "building-2": Building2,
  building: Building,
  buildings: Building, // Lucide doesn't ship "Buildings" — fall back to Building.
  home: HomeIcon,
  briefcase: Briefcase,
  store: Store,
};

const ACCORDION_ICONS: Record<string, LucideIcon> = {
  compass: Compass,
  handshake: Handshake,
  "key-round": KeyRound,
};

export function HomeBuying() {
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
  // Vertical "Buying" title drifts opposite to scroll.
  const titleY = useTransform(smooth, [0, 1], ["18%", "-22%"]);

  return (
    <section
      ref={sectionRef}
      id="home-buying"
      className="relative overflow-hidden py-24 md:py-32"
    >
      <HomeBuyingBackground />

      {/* Vertical "Buying" stroke title — LEFT, accent purple, parallax */}
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
          {homeBuying.titleStroke}
        </span>
      </motion.div>

      <div className="container-x relative z-10">
        {/* ============== HEADER ============== */}
        <motion.header
          variants={revealContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-10% 0%" }}
          className="mb-12 grid max-w-[820px] gap-3.5 md:mb-16 lg:mx-[120px]"
        >
          <motion.span variants={reveal} className="eyebrow">
            {homeBuying.eyebrow}
          </motion.span>
          <motion.h2 variants={reveal} className="display-h2">
            {homeBuying.headline.lead} <em>{homeBuying.headline.emphasis}</em>
          </motion.h2>
        </motion.header>

        {/* ============== PROPERTY CATEGORIES STRIP ============== */}
        <motion.div
          variants={revealContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-10% 0%" }}
          className="mb-16 lg:mx-[120px]"
        >
          <motion.div
            variants={reveal}
            className="mb-5 flex items-center gap-3"
          >
            <span className="h-px w-10 bg-[color:var(--color-gold)]" />
            <span className="text-[10.5px] font-medium uppercase tracking-[0.22em] text-ink-2">
              {homeBuying.categoriesEyebrow}
            </span>
            <span aria-hidden className="h-px flex-1 bg-line" />
            <span className="font-serif text-[12px] italic tracking-[-0.005em] text-ink-3">
              {homeBuying.categoriesHeading}
            </span>
          </motion.div>

          <motion.ul
            variants={revealContainer}
            className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4 lg:grid-cols-6"
          >
            {homeBuying.categories.map((c) => {
              const Icon = CATEGORY_ICONS[c.icon] ?? HomeIcon;
              return (
                <motion.li
                  key={c.label}
                  variants={reveal}
                  className="group relative isolate flex flex-col items-center gap-2.5 overflow-hidden rounded-[16px] border border-line bg-bg-elev/85 p-4 backdrop-blur-md transition-all duration-500 hover:border-[color:var(--color-accent)]/55 hover:shadow-[0_18px_44px_-22px_rgba(68,28,124,0.32)]"
                >
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 -z-10 opacity-50"
                    style={{
                      background:
                        "radial-gradient(circle at 50% 0%, var(--color-gold-soft) 0%, transparent 60%)",
                    }}
                  />
                  <span className="grid size-10 place-items-center rounded-full border border-line-strong bg-bg-warm text-[color:var(--color-accent)] transition-all duration-500 group-hover:border-[color:var(--color-accent)] group-hover:bg-[color:var(--color-accent)] group-hover:text-white">
                    <Icon className="size-[18px]" strokeWidth={1.5} />
                  </span>
                  <span className="font-serif text-[14.5px] tracking-[-0.012em] text-ink">
                    {c.label}
                  </span>
                  <span
                    aria-hidden
                    className="absolute left-0 top-0 h-px w-0 bg-[color:var(--color-gold)] transition-all duration-500 group-hover:w-full"
                  />
                </motion.li>
              );
            })}
          </motion.ul>
        </motion.div>

        {/* ============== ACCORDION ============== */}
        <motion.div
          variants={revealContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-10% 0%" }}
          className="lg:mx-[120px]"
        >
          {/* Accordion eyebrow row */}
          <motion.div
            variants={reveal}
            className="mb-5 flex items-center gap-3"
          >
            <span className="font-serif text-[12px] italic tracking-[0.18em] text-[color:var(--color-gold)]">
              ◆
            </span>
            <span className="text-[10.5px] font-medium uppercase tracking-[0.22em] text-ink-2">
              {homeBuying.accordionEyebrow}
            </span>
            <span aria-hidden className="h-px flex-1 bg-line" />
          </motion.div>

          <Accordion items={homeBuying.accordion} />
        </motion.div>
      </div>
    </section>
  );
}

/* ============================================================== */
/*  ACCORDION                                                     */
/* ============================================================== */

type AccordionItem = {
  roman: string;
  title: string;
  icon: string;
  body: string;
};

function Accordion({ items }: { items: ReadonlyArray<AccordionItem> }) {
  // Index of the currently open item. -1 means none open. First open by default.
  const [openIndex, setOpenIndex] = useState<number>(0);

  return (
    <motion.div
      variants={revealContainer}
      className="overflow-hidden rounded-[24px] border border-line-strong bg-bg-elev/85 shadow-[0_2px_6px_-2px_rgba(10,10,10,0.05),0_18px_44px_-22px_rgba(10,10,10,0.18)] backdrop-blur-md"
    >
      {items.map((item, i) => (
        <AccordionRow
          key={item.title}
          item={item}
          isOpen={openIndex === i}
          isLast={i === items.length - 1}
          onToggle={() => setOpenIndex((cur) => (cur === i ? -1 : i))}
        />
      ))}
    </motion.div>
  );
}

function AccordionRow({
  item,
  isOpen,
  isLast,
  onToggle,
}: {
  item: AccordionItem;
  isOpen: boolean;
  isLast: boolean;
  onToggle: () => void;
}) {
  const Icon = ACCORDION_ICONS[item.icon] ?? Compass;

  return (
    <motion.div
      variants={reveal}
      className={`relative ${isLast ? "" : "border-b border-line"}`}
    >
      {/* Active gold left rule — fades in when open */}
      <span
        aria-hidden
        className={`pointer-events-none absolute inset-y-0 left-0 w-[2.5px] origin-top transition-all duration-500 ${
          isOpen
            ? "scale-y-100 opacity-100"
            : "scale-y-50 opacity-0"
        }`}
        style={{ background: "var(--color-gold)" }}
      />

      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="group flex w-full items-center gap-5 px-6 py-6 text-left transition-colors duration-300 hover:bg-bg-warm/40 md:gap-7 md:px-9 md:py-7"
      >
        {/* Roman numeral */}
        <span
          className={`shrink-0 font-serif italic leading-none tracking-[-0.02em] transition-colors duration-500 ${
            isOpen
              ? "text-[color:var(--color-gold)]"
              : "text-[color:var(--color-gold)]/65"
          }`}
          style={{ fontSize: "clamp(28px, 2.4vw, 36px)" }}
        >
          {item.roman}
        </span>

        {/* Icon disc */}
        <span
          className={`grid size-11 shrink-0 place-items-center rounded-full border transition-all duration-500 md:size-12 ${
            isOpen
              ? "border-[color:var(--color-accent)] bg-[color:var(--color-accent)] text-white"
              : "border-line-strong bg-bg-warm text-[color:var(--color-accent)] group-hover:border-[color:var(--color-accent)]/50"
          }`}
        >
          <Icon className="size-5" strokeWidth={1.5} />
        </span>

        {/* Title */}
        <h3
          className={`flex-1 font-serif font-normal tracking-[-0.018em] transition-colors duration-300 ${
            isOpen ? "text-accent" : "text-ink group-hover:text-accent"
          }`}
          style={{
            fontSize: "clamp(20px, 1.8vw, 26px)",
            lineHeight: 1.15,
          }}
        >
          {item.title}
          <span
            className={`transition-colors duration-300 ${
              isOpen ? "text-[color:var(--color-gold)]" : "text-accent"
            }`}
          >
            .
          </span>
        </h3>

        {/* Chevron — rotates 180° when open */}
        <span
          aria-hidden
          className={`grid size-9 shrink-0 place-items-center rounded-full border transition-all duration-500 ${
            isOpen
              ? "border-[color:var(--color-gold)] text-[color:var(--color-gold)] [transform:rotate(180deg)]"
              : "border-line-strong text-ink-2 group-hover:border-[color:var(--color-accent)]/45 group-hover:text-accent"
          }`}
        >
          <ChevronDown className="size-4" strokeWidth={1.8} />
        </span>
      </button>

      {/* Expanding body */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              height: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
              opacity: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
            }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-7 pt-1 md:px-9 md:pb-9">
              {/* Indented to line up with the title (under the icon disc) */}
              <div className="ml-0 grid gap-4 md:ml-[calc(36px+44px+1.75rem)] lg:ml-[calc(36px+48px+1.75rem)]">
                <p className="max-w-[68ch] text-[15.5px] leading-[1.7] text-ink-2 md:text-[16.5px]">
                  {item.body}
                </p>

                {/* Closing gold hairline — anchors the body without a CTA */}
                <span
                  aria-hidden
                  className="h-px w-12 bg-gradient-to-r from-[color:var(--color-gold)] to-transparent"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ============================================================== */
/*  BACKGROUND                                                    */
/* ============================================================== */

function HomeBuyingBackground() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      {/* Base wash — cream → soft gold → pearl */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(170deg, #FAFAF7 0%, #F4EFE0 30%, #FAF6EC 65%, #ECE7F2 100%)",
        }}
      />
      <div
        className="absolute -inset-1/4 opacity-[0.18]"
        style={{
          background:
            "conic-gradient(from 200deg at 50% 50%, transparent 0%, var(--color-gold-soft) 22%, transparent 45%, rgba(90,42,156,0.42) 68%, transparent 90%, var(--color-gold-soft) 100%)",
          animation: "spin-slow 110s linear infinite",
          filter: "blur(60px)",
        }}
      />
      {/* Right gold bloom */}
      <div
        className="absolute -right-32 -top-24 size-[520px] rounded-full opacity-45 blur-[110px]"
        style={{
          background:
            "radial-gradient(circle, var(--color-gold-soft) 0%, transparent 70%)",
          animation: "mesh-1 30s var(--ease-soft) infinite",
        }}
      />
      {/* Left accent bloom */}
      <div
        className="absolute -left-24 -bottom-32 size-[480px] rounded-full opacity-45 blur-[110px]"
        style={{
          background:
            "radial-gradient(circle, rgba(90,42,156,0.28) 0%, transparent 70%)",
          animation: "mesh-2 32s var(--ease-soft) infinite",
        }}
      />
      {/* Centre pearl */}
      <div
        className="absolute left-1/2 top-1/3 size-[420px] -translate-x-1/2 rounded-full opacity-35 blur-[100px]"
        style={{
          background:
            "radial-gradient(circle, #FFFFFF 0%, transparent 65%)",
          animation: "mesh-3 30s var(--ease-soft) infinite",
        }}
      />
    </div>
  );
}
