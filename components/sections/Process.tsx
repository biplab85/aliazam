"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { process as steps, processIntro } from "@/content";
import { reveal, revealContainer } from "@/lib/motion";

/**
 * Process — "Simple steps".
 *
 * Premium scroll-driven interaction:
 *   1. A connector line runs across the row of step icons (horizontal on
 *      desktop, vertical on mobile). It has a faint dashed track and an
 *      accent-coloured progress overlay that grows via `scaleX` / `scaleY`
 *      as the section scrolls through the viewport.
 *   2. The raw `scrollYProgress` is fed through `useSpring` so the bar and
 *      all parallax values move with a buttery, slightly-damped feel —
 *      no harsh jumps, no jitter.
 *   3. As the bar passes each card's icon, that card's icon badge swaps to
 *      a filled-accent state (background + border + icon colour) with a
 *      smooth colour transition. Reverses on scroll-up automatically.
 *   4. Each card has its own parallax Y so they drift past each other.
 *   5. The right-edge "Process" stroke title parallaxes opposite to the cards.
 *
 * Works on desktop, tablet, and mobile. The bar is horizontal at md+ and
 * vertical below md, but the same scroll progress drives both via a single
 * shared motion value.
 */

/**
 * Connector path geometry.
 *
 *   DESKTOP_PATH — viewBox 0 0 1000 120, stretched horizontally across the
 *     row. A gentle S-wave: starts mid-height, dips up to crest near
 *     Card 02's column (~x=500), then back down past Card 03 (~x=970).
 *
 *   MOBILE_PATH — viewBox 0 0 80 1000, stretched vertically. A vertical
 *     S-wave through the stacked cards.
 */
const DESKTOP_PATH =
  "M 30 60 C 200 -10, 320 130, 500 60 S 800 -10, 970 60";
const MOBILE_PATH =
  "M 40 30 C 80 200, 0 320, 40 500 S 80 800, 40 970";

export function Process() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Smooth the raw scroll progress with a spring — premium dampened feel.
  const smooth = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.4,
    restDelta: 0.0008,
  });

  // Right-side vertical title parallax (mirror to Services' left title).
  const titleY = useTransform(smooth, [0, 1], ["-22%", "22%"]);

  // Connector progress — clamped so the bar reaches Card 01 → 03 within
  // the scroll window where the section is meaningfully on-screen.
  // Card 01 is the start, Card 03 is the end. Bar grows 0 → 1.
  const progressScale = useTransform(smooth, [0.18, 0.78], [0, 1], {
    clamp: true,
  });

  // Per-step parallax Y. Alternating directions so they pass each other.
  const step1Y = useTransform(smooth, [0, 1], [0, 60]);
  const step2Y = useTransform(smooth, [0, 1], [0, -50]);
  const step3Y = useTransform(smooth, [0, 1], [0, 70]);

  return (
    <section
      ref={sectionRef}
      id="process"
      className="relative overflow-hidden py-20 md:py-28"
    >
      <ProcessBackground />

      {/* Right-side vertical "Process" — gold text-stroke + parallax */}
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
            opacity: 0.65,
          }}
        >
          Steps
        </span>
      </motion.div>

      <div className="container-x relative z-10">
        <motion.header
          variants={revealContainer}
          initial="hidden"
          animate="show"
          className="mb-14 grid max-w-[720px] gap-4 md:mb-20"
        >
          <motion.span variants={reveal} className="eyebrow">
            Simple steps
          </motion.span>
          <motion.h2 variants={reveal} className="display-h2">
            The process, <em>made easy.</em>
          </motion.h2>
          <motion.p variants={reveal} className="lede">
            {processIntro.lede}
          </motion.p>
        </motion.header>

        <motion.div
          variants={revealContainer}
          initial="hidden"
          animate="show"
          className="relative grid grid-cols-1 gap-14 md:grid-cols-3 md:gap-8 lg:gap-12 lg:pr-[120px]"
        >
          {/*
            DESKTOP CONNECTOR — curved SVG path connecting the 3 cards as
            a soft wave. Track is dashed and faint; progress draws itself
            in via `pathLength` bound to the spring-smoothed scroll value.
            A wider blurred halo trails the same path for a premium glow.
          */}
          <svg
            aria-hidden
            viewBox="0 0 1000 120"
            preserveAspectRatio="none"
            className="absolute left-[6%] right-[6%] top-[10px] hidden h-[110px] md:block lg:right-[16%]"
          >
            {/* Halo — wide, blurred, behind everything */}
            <motion.path
              d={DESKTOP_PATH}
              fill="none"
              stroke="var(--color-accent)"
              strokeWidth="9"
              strokeLinecap="round"
              opacity="0.18"
              pathLength={1}
              style={{ pathLength: progressScale, filter: "blur(6px)" }}
            />
            {/* Dashed track */}
            <path
              d={DESKTOP_PATH}
              fill="none"
              stroke="var(--color-line-strong)"
              strokeWidth="1.5"
              strokeDasharray="4 7"
              strokeLinecap="round"
            />
            {/* Progress fill */}
            <motion.path
              d={DESKTOP_PATH}
              fill="none"
              stroke="var(--color-accent)"
              strokeWidth="2.2"
              strokeLinecap="round"
              pathLength={1}
              style={{ pathLength: progressScale }}
            />
          </svg>

          {/*
            MOBILE CONNECTOR — vertical wave SVG. Same scroll-driven
            pathLength logic, just rotated 90° conceptually via the path.
          */}
          <svg
            aria-hidden
            viewBox="0 0 80 1000"
            preserveAspectRatio="none"
            className="absolute right-[6px] top-[40px] bottom-[40px] w-[60px] md:hidden"
          >
            <motion.path
              d={MOBILE_PATH}
              fill="none"
              stroke="var(--color-accent)"
              strokeWidth="9"
              strokeLinecap="round"
              opacity="0.18"
              pathLength={1}
              style={{ pathLength: progressScale, filter: "blur(6px)" }}
            />
            <path
              d={MOBILE_PATH}
              fill="none"
              stroke="var(--color-line-strong)"
              strokeWidth="1.5"
              strokeDasharray="4 7"
              strokeLinecap="round"
            />
            <motion.path
              d={MOBILE_PATH}
              fill="none"
              stroke="var(--color-accent)"
              strokeWidth="2.2"
              strokeLinecap="round"
              pathLength={1}
              style={{ pathLength: progressScale }}
            />
          </svg>

          {steps.map((step, i) => {
            const yMap = [step1Y, step2Y, step3Y][i];

            return (
              <motion.div
                key={step.step}
                variants={reveal}
                className="relative"
              >
                <motion.div
                  style={{ y: yMap }}
                  className="grid content-start gap-5 pt-10"
                >
                  {/* Giant italic step number */}
                  <span
                    className="font-serif leading-[0.82] tracking-[-0.04em] text-ink"
                    style={{ fontSize: "clamp(80px, 8.4vw, 132px)" }}
                  >
                    <em className="text-accent">{step.step}</em>
                  </span>

                  {/* Title */}
                  <h3 className="font-serif text-[26px] font-normal leading-[1.05] tracking-[-0.02em] text-ink md:text-[28px]">
                    {step.title}
                  </h3>

                  {/* Body */}
                  <p className="max-w-[34ch] text-[15px] leading-[1.6] text-ink-2">
                    {step.body}
                  </p>
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
/*  BACKGROUND — warm dawn gradient                               */
/* ============================================================== */

function ProcessBackground() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      {/* Base wash — warm peach → cream → soft sage */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(155deg, #F5E6D3 0%, #F4F0E2 28%, #FAFAF7 55%, #EDEFEA 80%, #DEE6DC 100%)",
        }}
      />

      {/* Slow conic — gold + accent rotating very slowly */}
      <div
        className="absolute -inset-1/4 opacity-[0.22]"
        style={{
          background:
            "conic-gradient(from 90deg at 50% 50%, transparent 0%, var(--color-gold-soft) 22%, transparent 45%, var(--color-accent-soft) 68%, transparent 90%, var(--color-gold-soft) 100%)",
          animation: "spin-slow 100s linear infinite",
          filter: "blur(45px)",
        }}
      />

      {/* Top-left gold bloom — "morning light" */}
      <div
        className="absolute -left-36 -top-32 size-[600px] rounded-full opacity-55 blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, var(--color-gold-soft) 0%, transparent 70%)",
          animation: "mesh-1 28s var(--ease-soft) infinite",
        }}
      />

      {/* Right peach bloom */}
      <div
        className="absolute right-[8%] top-[20%] size-[440px] rounded-full opacity-50 blur-[110px]"
        style={{
          background: "radial-gradient(circle, #F5E0C5 0%, transparent 70%)",
          animation: "mesh-2 34s var(--ease-soft) infinite",
        }}
      />

      {/* Bottom sage bloom — grounding */}
      <div
        className="absolute -bottom-36 left-[28%] size-[460px] rounded-full opacity-40 blur-[110px]"
        style={{
          background:
            "radial-gradient(circle, var(--color-accent-soft) 0%, transparent 70%)",
          animation: "mesh-3 32s var(--ease-soft) infinite",
        }}
      />

      {/* Cool bloom on the right edge */}
      <div
        className="absolute -right-20 bottom-[10%] size-[360px] rounded-full opacity-30 blur-[100px]"
        style={{
          background: "radial-gradient(circle, #DCE5D9 0%, transparent 70%)",
          animation: "mesh-1 30s var(--ease-soft) infinite",
          animationDelay: "-10s",
        }}
      />
    </div>
  );
}
