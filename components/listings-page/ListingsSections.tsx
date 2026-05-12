import Link from "next/link";
import { listings, listingsPage, site } from "@/content";
import { formatPrice, formatSqft } from "@/lib/format";

/**
 * /listings — calm broker-professional sections. Verbatim copy from
 * content.tsx#listingsPage. Replaces the prior parallax/bento version.
 */

export function ListingsPageHero() {
  const h = listingsPage.hero;
  const active = listings.length;
  const max = Math.max(...listings.map((l) => l.price));
  const cities = new Set(listings.map((l) => l.city.split(",")[0].trim())).size;

  return (
    <section className="bg-bg pt-[120px] md:pt-[150px] pb-20 md:pb-28">
      <div className="container-x">
        <div className="max-w-3xl fade-up">
          <span className="eyebrow">{h.portfolioLabel}</span>
          <h1 className="display-h1 mt-6">
            {h.headline.lead} <em>{h.headline.emphasis}</em>
          </h1>
          <span className="rule mt-6" />
          <p className="lede mt-8">{active} {h.strapline}</p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Link href={h.primaryCta.href} className="btn btn-primary">
              {h.primaryCta.label}
            </Link>
            <Link href={`tel:${site.phone}`} className="btn btn-ghost">
              {h.secondaryCta.label}
            </Link>
          </div>
        </div>

        <dl className="mt-16 grid grid-cols-3 gap-6 border-t border-line pt-8 md:gap-12">
          <div>
            <dt className="text-[11px] uppercase tracking-[0.22em] text-ink-3">
              {h.stats.activeLabel}
            </dt>
            <dd className="mono mt-3 font-serif text-4xl text-ink md:text-5xl">{active}</dd>
          </div>
          <div>
            <dt className="text-[11px] uppercase tracking-[0.22em] text-ink-3">
              {h.stats.rangeLabel}
            </dt>
            <dd className="mono mt-3 font-serif text-4xl text-ink md:text-5xl">
              {formatPrice(max)}
            </dd>
          </div>
          <div>
            <dt className="text-[11px] uppercase tracking-[0.22em] text-ink-3">
              {h.stats.citiesLabel}
            </dt>
            <dd className="mono mt-3 font-serif text-4xl text-ink md:text-5xl">{cities}</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}

export function AllListings() {
  const g = listingsPage.grid;
  const lede = g.lede.replace("{count}", String(listings.length));
  return (
    <section id="all-listings" className="bg-bg-muted py-24 md:py-32">
      <div className="container-x">
        <div className="mb-12 max-w-2xl">
          <span className="eyebrow">{g.eyebrow}</span>
          <h2 className="display-h2 mt-4">
            {g.headline.lead} <em>{g.headline.emphasis}</em>
          </h2>
          <span className="rule mt-6" />
          <p className="lede mt-6">{lede}</p>
        </div>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {listings.map((l) => (
            <article key={l.slug} className="group" id={l.slug}>
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-md bg-bg">
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
                <div className="mono shrink-0 text-right font-serif text-[20px] leading-tight text-ink">
                  {formatPrice(l.price)}
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

              <Link
                href={`/contact`}
                className="mt-5 inline-flex items-center gap-2 text-[12.5px] uppercase tracking-[0.16em] text-accent transition-colors hover:text-accent-2"
              >
                {g.cardCta}
                <span aria-hidden>→</span>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ListingsCtaBanner() {
  const b = listingsPage.ctaBanner;
  const totalSqft = listings.reduce((s, l) => s + l.sqft, 0).toLocaleString("en-CA");
  const cities = new Set(listings.map((l) => l.city.split(",")[0].trim())).size;
  const body = b.bodyTemplate
    .replace("{count}", String(listings.length))
    .replace("{cities}", String(cities))
    .replace("{sqft}", `${totalSqft} sqft`);

  return (
    <section className="bg-accent py-24 text-bg md:py-32">
      <div className="container-x">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-bg/70">
            <span className="h-px w-8 bg-[color:var(--color-gold)]" />
            {b.eyebrow}
          </span>
          <h2 className="display-h2 mt-6 text-bg">
            {b.headline.lead} <em>{b.headline.emphasis}</em>
          </h2>
          <p className="mt-6 text-[17px] leading-relaxed text-bg/85">{body}</p>
          <div className="mt-10">
            <Link
              href={`tel:${site.phone}`}
              className="btn"
              style={{ background: "var(--color-bg)", color: "var(--color-accent)" }}
            >
              {b.primaryLabel} · {site.phone}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
