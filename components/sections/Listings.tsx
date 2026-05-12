import Link from "next/link";
import { listings } from "@/content";
import { formatPrice, formatSqft } from "@/lib/format";

/**
 * Listings — clean editorial grid of the first six featured properties.
 * One photograph per card, address, city, key facts, price. No parallax,
 * no asymmetric bento, no scroll choreography.
 */
export function Listings() {
  const featured = listings.slice(0, 6);

  return (
    <section id="listings" className="bg-bg-muted py-24 md:py-32">
      <div className="container-x">
        <div className="mb-14 md:mb-20 md:flex md:items-end md:justify-between md:gap-12">
          <div className="max-w-2xl">
            <span className="eyebrow">Featured listings</span>
            <h2 className="display-h2 mt-4">
              Hand-curated properties across the GTA.
            </h2>
            <span className="rule mt-6" />
          </div>
          <Link
            href="/listings"
            className="mt-6 inline-flex items-center gap-2 text-[12.5px] uppercase tracking-[0.16em] text-accent transition-colors hover:text-accent-2 md:mt-0"
          >
            View all listings
            <span aria-hidden>→</span>
          </Link>
        </div>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((l) => (
            <article key={l.slug} className="group">
              <Link
                href={`/listings#${l.slug}`}
                className="block"
                aria-label={`${l.address} — ${formatPrice(l.price)}`}
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-md bg-bg-muted">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={l.image}
                    alt={`${l.address}, ${l.city}`}
                    className="absolute inset-0 size-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    loading="lazy"
                    width={800}
                    height={600}
                  />
                  {l.status && (
                    <span className="absolute left-4 top-4 rounded-sm bg-bg/90 px-2.5 py-1 text-[10.5px] uppercase tracking-[0.18em] text-ink backdrop-blur-sm">
                      {l.status}
                    </span>
                  )}
                </div>

                <div className="mt-5 flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-serif text-[22px] leading-tight text-ink">
                      {l.address}
                    </h3>
                    <p className="mt-1 text-[13px] uppercase tracking-[0.14em] text-ink-3">
                      {l.city}
                    </p>
                  </div>
                  <div className="mono shrink-0 text-right">
                    <div className="font-serif text-[20px] leading-tight text-ink">
                      {formatPrice(l.price)}
                    </div>
                  </div>
                </div>

                <dl className="mono mt-4 flex gap-5 border-t border-line pt-4 text-[12.5px] text-ink-3">
                  <div className="flex gap-1.5">
                    <dt>Beds</dt>
                    <dd className="text-ink-2">{l.beds}</dd>
                  </div>
                  <div className="flex gap-1.5">
                    <dt>Baths</dt>
                    <dd className="text-ink-2">{l.baths}</dd>
                  </div>
                  <div className="flex gap-1.5">
                    <dt>Area</dt>
                    <dd className="text-ink-2">{formatSqft(l.sqft)}</dd>
                  </div>
                </dl>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
