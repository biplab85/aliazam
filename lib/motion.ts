"use client";

import { useEffect, useState } from "react";
import type { Variants, Transition } from "framer-motion";

/**
 * Shared easing — cubic-bezier(0.22, 1, 0.36, 1). Out-expo. Calm and confident.
 * Use this everywhere instead of "easeOut" so the whole site feels of one piece.
 */
export const easeOut: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const baseTransition: Transition = {
  duration: 0.7,
  ease: easeOut,
};

/** Reveal-on-scroll: 16px Y + opacity. Stagger children where applicable. */
export const reveal: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: baseTransition },
};

export const revealContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.06, delayChildren: 0.05 },
  },
};

/** Word-by-word headline rise. */
export const wordRise: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { ...baseTransition, delay: 0.05 + i * 0.06 },
  }),
};

/**
 * Hook: respects `prefers-reduced-motion`. When true, components should
 * skip GSAP timelines and pass `initial={false}` / set durations to 0
 * on Framer Motion.
 */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}
