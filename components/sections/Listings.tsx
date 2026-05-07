"use client";

import { motion } from "framer-motion";
import { listings } from "@/content";
import { formatPrice, formatSqft } from "@/lib/format";
import { reveal, revealContainer } from "@/lib/motion";

/**
 * Bento grid using the per-listing `span` declared in content.tsx.
 * Stylized SVG/gradient placeholders stand in until real photos download
 * from aliazam.ca per task.md Phase 1.
 */
const PLACEHOLDER_GRADIENTS: Record<number, string> = {
  0: "linear-gradient(135deg, #2A6B53 0%, #1A4D3A 60%, #0F3326 100%)",
  1: "linear-gradient(160deg, #B8945A 0%, #8C6E3F 100%)",
  2: "linear-gradient(170deg, #3A3A3A 0%, #0A0A0A 100%)",
  3: "linear-gradient(155deg, #ECE9E0 0%, #C9C6BA 100%)",
  4: "linear-gradient(150deg, #1A4D3A 0%, #2D2D2A 100%)",
  5: "linear-gradient(140deg, #B8945A 0%, #4A3A1F 100%)",
};

// Static mapping so Tailwind's JIT picks up these classes (dynamic strings would not be detected).
const COL_CLASS: Record<number, string> = {
  2: "md:col-span-2",
  3: "md:col-span-3",
  4: "md:col-span-4",
};
const ROW_CLASS: Record<number, string> = {
  2: "md:row-span-2",
};

function spanClass(span?: { col: number; row?: number }) {
  if (!span) return "";
  return `${COL_CLASS[span.col] ?? ""} ${span.row ? ROW_CLASS[span.row] ?? "" : ""}`;
}

export function Listings() {
  return (
    <section id="listings" className="py-24 md:py-[132px]">
      <div className="container-x">
        <motion.header
          variants={revealContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-10% 0%" }}
          className="mb-14 grid items-end gap-6 md:mb-20 md:grid-cols-[1fr_auto]"
        >
          <div className="grid gap-3.5">
            <motion.span variants={reveal} className="eyebrow">
              Featured listings
            </motion.span>
            <motion.h2 variants={reveal} className="display-h2">
              Currently <em>on the market.</em>
            </motion.h2>
          </div>
          <motion.a
            variants={reveal}
            href="#contact"
            className="btn btn-ghost"
          >
            View all listings <span className="arrow">→</span>
          </motion.a>
        </motion.header>

        <motion.div
          variants={revealContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-5% 0%" }}
          className="grid grid-cols-1 gap-5 md:auto-rows-[220px] md:grid-cols-6"
        >
          {listings.map((listing, i) => (
            <motion.a
              key={listing.slug}
              variants={reveal}
              href="#contact"
              className={`group relative isolate min-h-[260px] cursor-pointer overflow-hidden rounded-[20px] bg-bg-warm ${spanClass(
                listing.span,
              )}`}
            >
              {/* Gradient sits below as a graceful fallback if the photo 404s. */}
              <div
                className="absolute inset-0 z-0"
                style={{ background: PLACEHOLDER_GRADIENTS[i] }}
                aria-hidden
              />
              {/* Real photo from /public. eslint-disable for static export. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={listing.image}
                alt={`${listing.address}, ${listing.city}`}
                className="absolute inset-0 z-[1] size-full object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.04]"
                loading="lazy"
              />
              <div
                className="absolute inset-0 z-[2]"
                style={{
                  background:
                    "linear-gradient(180deg, transparent 40%, rgba(10,10,10,0.82) 100%)",
                }}
                aria-hidden
              />

              <span className="absolute left-[22px] top-[22px] z-10 inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.12em] text-ink-2">
                <span className="size-[5px] rounded-full bg-accent" />
                {listing.status ?? "For sale"}
              </span>

              <div className="absolute inset-x-[22px] bottom-[22px] z-10 grid gap-2 text-white">
                <h3 className="font-serif text-[clamp(22px,2.4vw,28px)] font-normal leading-[1.05] tracking-[-0.015em] text-white">
                  {listing.address}
                </h3>
                <span className="text-[12.5px] tracking-[0.04em] text-white/[0.78]">
                  {listing.city}
                </span>
                <div className="mt-1.5 flex flex-wrap gap-x-3.5 gap-y-1 text-[12.5px] tabular-nums text-white/90">
                  <span>{formatSqft(listing.sqft)}</span>
                  <span className="before:mr-2 before:text-white/50 before:content-['·']">
                    {listing.beds} bed
                  </span>
                  <span className="before:mr-2 before:text-white/50 before:content-['·']">
                    {listing.baths} bath
                  </span>
                </div>
                <span className="mt-1 font-serif text-[clamp(20px,2.2vw,26px)] font-normal tracking-[-0.015em] tabular-nums text-white">
                  {formatPrice(listing.price)}
                </span>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
