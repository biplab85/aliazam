"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { listings } from "@/content";
import { formatPrice, formatSqft } from "@/lib/format";

/**
 * Auto-rotating featured-listing card. Magazine-style.
 *
 * Crossfade strategy: every listing's image, price overlay, and caption are
 * mounted simultaneously and stacked absolutely. Only opacity (and a tiny
 * scale on the photo) animates per-index. No `AnimatePresence`, no
 * remount-on-key — eliminates the empty-flash gap that comes from
 * `mode="wait"` and guarantees a fully seamless crossfade because both the
 * outgoing and incoming images are always already painted.
 *
 * Cycles every 5.5s and pauses while the tab is hidden.
 */
const ROTATE_MS = 5500;
const FADE_MS = 900;
const FADE_EASE = [0.4, 0, 0.6, 1] as const; // symmetric ease-in-out

export function FeaturedListing() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      if (document.hidden) return;
      setI((prev) => (prev + 1) % listings.length);
    }, ROTATE_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative">
      {/* Magazine-style index header */}
      <div className="mb-4 flex items-center justify-between text-[11px] font-medium uppercase tracking-[0.16em] text-ink-3">
        <span className="tabular-nums">
          Featured · {String(i + 1).padStart(2, "0")}
          <span className="text-ink-3/50"> / {String(listings.length).padStart(2, "0")}</span>
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="size-1 rounded-full bg-accent" />
          For sale
        </span>
      </div>

      {/* Photo */}
      <div className="relative aspect-[4/5] overflow-hidden rounded-[18px] bg-bg-warm shadow-deep ring-1 ring-line">
        {/* All photos stacked. Only the current one is visible. */}
        {listings.map((l, idx) => {
          const active = idx === i;
          return (
            <motion.img
              key={l.slug}
              src={l.image}
              alt={`${l.address}, ${l.city}`}
              loading={idx <= 1 ? "eager" : "lazy"}
              decoding="async"
              draggable={false}
              animate={{
                opacity: active ? 1 : 0,
                scale: active ? 1 : 1.04,
              }}
              transition={{
                opacity: { duration: FADE_MS / 1000, ease: FADE_EASE },
                scale: { duration: 1.6, ease: [0.22, 1, 0.36, 1] },
              }}
              className="absolute inset-0 size-full object-cover"
              style={{ willChange: "opacity, transform" }}
            />
          );
        })}

        {/* Circular progress + counter — top-right of the image */}
        <div className="absolute right-4 top-4 z-[3]">
          <div className="relative size-14 rounded-full bg-black/30 backdrop-blur-md ring-1 ring-white/15">
            <svg viewBox="0 0 56 56" className="absolute inset-0 size-full">
              <circle
                cx="28"
                cy="28"
                r="22"
                fill="none"
                stroke="rgba(255,255,255,0.22)"
                strokeWidth="1.5"
              />
              {/* Restart animation each tick via key={i} */}
              <motion.circle
                key={i}
                cx="28"
                cy="28"
                r="22"
                fill="none"
                stroke="rgba(255,255,255,0.95)"
                strokeWidth="1.5"
                strokeLinecap="round"
                pathLength={1}
                strokeDasharray={1}
                initial={{ strokeDashoffset: 1 }}
                animate={{ strokeDashoffset: 0 }}
                transition={{ duration: ROTATE_MS / 1000, ease: "linear" }}
                transform="rotate(-90 28 28)"
              />
            </svg>
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center text-[11px] font-medium tabular-nums tracking-tight text-white">
              <span>
                {i + 1}/{listings.length}
              </span>
            </div>
          </div>
        </div>

        {/* Static dark gradient at bottom — always visible */}
        <div
          aria-hidden
          className="absolute inset-0 z-[1]"
          style={{
            background:
              "linear-gradient(180deg, transparent 50%, rgba(10,10,10,0.78) 100%)",
          }}
        />

        {/* Price overlay — all listings stacked, opacity per index. */}
        <div className="pointer-events-none absolute inset-x-5 bottom-5 z-[2] h-[34px] text-white">
          {listings.map((l, idx) => {
            const active = idx === i;
            return (
              <motion.div
                key={l.slug}
                className="absolute inset-0 flex items-baseline justify-between"
                animate={{ opacity: active ? 1 : 0 }}
                transition={{ duration: FADE_MS / 1000, ease: FADE_EASE }}
              >
                <span className="font-serif text-[26px] leading-none tracking-[-0.015em] tabular-nums">
                  {formatPrice(l.price)}
                </span>
                <span className="text-[11.5px] uppercase tracking-[0.12em] text-white/80">
                  {formatSqft(l.sqft)}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Caption — also stacked + opacity-keyed for the seamless crossfade. */}
      <div className="relative mt-5 min-h-[78px]">
        {listings.map((l, idx) => {
          const active = idx === i;
          return (
            <motion.div
              key={l.slug}
              className="absolute inset-0"
              animate={{ opacity: active ? 1 : 0 }}
              transition={{ duration: FADE_MS / 1000, ease: FADE_EASE }}
              aria-hidden={!active}
            >
              <h3 className="font-serif text-[22px] font-normal leading-[1.1] tracking-[-0.015em] text-ink">
                {l.address}
              </h3>
              <p className="mt-1 text-[12.5px] tracking-[0.04em] text-ink-3">
                {l.city} &nbsp;·&nbsp; {l.beds} bed &nbsp;·&nbsp; {l.baths} bath
              </p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
