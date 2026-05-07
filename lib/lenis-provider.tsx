"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Wires Lenis smooth scroll to GSAP's ticker so ScrollTrigger and Lenis
 * stay in lockstep. No own RAF loop — GSAP drives both.
 *
 * Disabled when the user prefers reduced motion.
 */
export function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.4,
    });

    function raf(time: number) {
      // GSAP ticker passes seconds; Lenis wants ms.
      lenis.raf(time * 1000);
    }

    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // Tell ScrollTrigger to update when Lenis scrolls.
    lenis.on("scroll", ScrollTrigger.update);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
