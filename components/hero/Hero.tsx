import Link from "next/link";
import { hero, site } from "@/content";

/**
 * Hero — restrained, editorial, broker-professional.
 * Left: eyebrow / headline / lede / CTAs / credentials row.
 * Right: a single luxury property photograph, full-bleed to the page edge.
 * No mesh, no parallax, no floating shapes. One photo, one message.
 */
export function Hero() {
  // Verbatim headline from content.tsx, flattened (no italic accent now).
  const headline = hero.headlineLines.flat().join(" ");

  return (
    <section className="relative pt-[112px] md:pt-[140px] pb-20 md:pb-28">
      <div className="container-x">
        <div className="grid gap-12 md:gap-16 md:grid-cols-12 md:items-center">
          {/* Editorial copy column */}
          <div className="md:col-span-6 fade-up">
            <span className="eyebrow">{hero.eyebrow}</span>

            <h1 className="display-h1 mt-6">
              {headline}
            </h1>

            <p className="lede mt-6">{hero.sub}</p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Link href={hero.primaryCta.href} className="btn btn-primary">
                {hero.primaryCta.label}
              </Link>
              <Link href={hero.secondaryCta.href} className="btn btn-ghost">
                {hero.secondaryCta.label}
              </Link>
            </div>

            {/* Quiet credibility row — brokerage + direct line, hairline-led */}
            <div className="mt-12 grid gap-y-4 gap-x-10 border-t border-line pt-6 text-[13px] text-ink-3 sm:grid-cols-3">
              <div>
                <div className="text-[11px] uppercase tracking-[0.18em] text-ink-3/80">
                  Brokerage
                </div>
                <div className="mt-1 text-ink-2">{site.brokerage}</div>
              </div>
              <div>
                <div className="text-[11px] uppercase tracking-[0.18em] text-ink-3/80">
                  Direct
                </div>
                <div className="mono mt-1 text-ink-2">{site.phone}</div>
              </div>
              <div>
                <div className="text-[11px] uppercase tracking-[0.18em] text-ink-3/80">
                  Established
                </div>
                <div className="mt-1 text-ink-2">2010 · GTA</div>
              </div>
            </div>
          </div>

          {/* Image column — single cinematic photograph */}
          <div className="md:col-span-6 fade-up">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-md bg-bg-muted md:aspect-[5/6]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/50.webp"
                alt="Greater Toronto Area property — featured by Ali Azam"
                className="absolute inset-0 size-full object-cover"
                loading="eager"
                fetchPriority="high"
                width={1200}
                height={1500}
              />
              {/* Subtle bottom vignette only — no glow, no gradient overlay */}
              <div
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/25 to-transparent"
              />
              {/* Gold corner rule — single ornament */}
              <span
                aria-hidden
                className="absolute left-6 top-6 h-px w-10 bg-[color:var(--color-gold)]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
