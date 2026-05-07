"use client";

import { motion } from "framer-motion";
import { hero } from "@/content";
import { BackgroundMesh } from "./BackgroundMesh";
import { FeaturedListing } from "./FeaturedListing";

/**
 * Editorial-cover hero. Replaces the previous SaaS-style "fake dashboard" pattern.
 *
 * Layout (desktop, 12-col grid):
 *   - Top hairline strip: location · role · est. year (documentary feel)
 *   - Cols 1–7: massive serif headline, asymmetric line offsets, italic accent on
 *     a single word. Below the headline: lede, dual CTAs, trust marks.
 *   - Cols 8–12: a single auto-rotating featured listing card (real photo + price).
 *
 * No floating SaaS pills, no fake "live" sparklines. Type-forward and
 * grounded in real listings — premium consulting / quiet luxury aesthetic.
 */
export function Hero() {
  const ease = [0.22, 1, 0.36, 1] as const;

  return (
    <section className="relative overflow-hidden pt-[80px] md:pt-[88px]">
      <BackgroundMesh />

      <div className="container-x relative z-10">
        {/* ---------- Main hero grid ---------- */}
        <div className="grid grid-cols-1 gap-12 py-14 md:py-20 lg:grid-cols-12 lg:gap-12 lg:py-24">
          {/* Headline column */}
          <div className="flex flex-col justify-between gap-12 lg:col-span-7">
            <motion.h1
              initial="hidden"
              animate="show"
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
              }}
              className="font-serif font-normal leading-[0.92] tracking-[-0.03em] text-ink"
              style={{ fontSize: "clamp(56px, 9.4vw, 156px)" }}
            >
              <motion.span
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease } },
                }}
                className="block whitespace-nowrap"
              >
                Let&rsquo;s find
              </motion.span>
              <motion.span
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease } },
                }}
                className="block whitespace-nowrap lg:pl-[14%]"
              >
                your{" "}
                <span className="relative inline-block">
                  <em
                    className="bg-clip-text text-transparent"
                    style={{
                      backgroundImage:
                        "linear-gradient(110deg, #2f066d 0%, #4A1B9F 35%, #7B4FCC 62%, #2f066d 100%)",
                    }}
                  >
                    dream
                  </em>
                  {/*
                    Hand-drawn underline. SVG path is two soft quadratic curves;
                    `pathLength={1}` normalizes the length so we can animate
                    `pathLength` from 0 → 1 for the draw-in effect. Delay timed
                    to fire just after the third headline line settles.
                  */}
                  <svg
                    aria-hidden
                    viewBox="0 0 200 14"
                    preserveAspectRatio="none"
                    className="pointer-events-none absolute -bottom-[0.08em] left-[2%] h-[0.16em] w-[96%] overflow-visible"
                  >
                    <motion.path
                      d="M 3 8 Q 55 2, 100 6 T 197 5"
                      fill="none"
                      stroke="#2f066d"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      pathLength={1}
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{
                        pathLength: { duration: 1.1, delay: 1.35, ease },
                        opacity: { duration: 0.25, delay: 1.35 },
                      }}
                    />
                  </svg>
                </span>
              </motion.span>
              <motion.span
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease } },
                }}
                className="block whitespace-nowrap lg:pl-[6%]"
              >
                home.
              </motion.span>
            </motion.h1>

            {/* Lede + CTAs + trust row */}
            <div className="grid gap-7">
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.55, ease }}
                className="lede max-w-[44ch]"
              >
                {hero.sub}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7, ease }}
                className="flex flex-wrap gap-3"
              >
                <a href={hero.primaryCta.href} className="btn btn-primary">
                  {hero.primaryCta.label} <span className="arrow">→</span>
                </a>
                <a href={hero.secondaryCta.href} className="btn btn-ghost">
                  {hero.secondaryCta.label} <span className="arrow">→</span>
                </a>
              </motion.div>

              <motion.dl
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.95, ease }}
                className="mt-2 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-line pt-6 text-[11px] font-medium uppercase tracking-[0.14em] text-ink-3"
              >
                <TrustItem label="GTA" value="15 yrs" />
                <Sep />
                <TrustItem label="Licensed" value="RECO Realtor®" />
                <Sep />
                <TrustItem label="Mortgage" value="FSRA Agent" />
                <Sep />
                <TrustItem label="Brokerage" value="Right At Home Realty" />
              </motion.dl>
            </div>
          </div>

          {/* Featured listing column */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.05, delay: 0.4, ease }}
            className="lg:col-span-5 lg:pl-2"
          >
            <FeaturedListing />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function TrustItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="inline-flex items-baseline gap-2">
      <span className="text-ink-3/70">{label}</span>
      <span className="text-ink">{value}</span>
    </div>
  );
}

function Sep() {
  return (
    <span aria-hidden className="hidden h-3 w-px bg-line-strong sm:inline-block" />
  );
}
