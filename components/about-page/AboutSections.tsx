import Link from "next/link";
import { aboutPage, site } from "@/content";

/**
 * /about — calm broker-professional sections. Verbatim copy from
 * content.tsx#aboutPage. Replaces the prior decorative-heavy version.
 */

export function AboutPageHero() {
  const h = aboutPage.hero;
  return (
    <section className="bg-bg pt-[120px] md:pt-[150px] pb-20 md:pb-28">
      <div className="container-x">
        <div className="grid gap-12 md:gap-20 md:grid-cols-12 md:items-center">
          <div className="md:col-span-7 fade-up">
            <span className="eyebrow">{h.eyebrow}</span>
            <h1 className="display-h1 mt-6">
              {h.headline.lead} <em>{h.headline.emphasis}</em>
            </h1>
            <span className="rule mt-6" />
            <p className="lede mt-8">{h.strapline}</p>

            <ul className="mt-10 flex flex-wrap gap-2">
              {h.credentials.map((c) => (
                <li
                  key={c}
                  className="rounded-sm border border-line-strong px-3 py-1.5 text-[12px] uppercase tracking-[0.14em] text-ink-2"
                >
                  {c}
                </li>
              ))}
            </ul>

            <div className="mt-10 grid grid-cols-2 gap-x-10 gap-y-4 border-t border-line pt-6 text-[13px] sm:grid-cols-3">
              <div>
                <div className="text-[11px] uppercase tracking-[0.18em] text-ink-3">
                  {h.serviceArea.label}
                </div>
                <div className="mt-1 text-ink-2">{h.serviceArea.value}</div>
              </div>
              <div>
                <div className="text-[11px] uppercase tracking-[0.18em] text-ink-3">
                  Established
                </div>
                <div className="mt-1 text-ink-2">
                  {h.yearStamp.year}
                </div>
              </div>
              <div>
                <div className="text-[11px] uppercase tracking-[0.18em] text-ink-3">
                  Brokerage
                </div>
                <div className="mt-1 text-ink-2">{site.brokerage}</div>
              </div>
            </div>
          </div>

          <div className="md:col-span-5 fade-up">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-md bg-bg-muted">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/ali-azam.webp"
                alt={site.name}
                className="absolute inset-0 size-full object-cover"
                width={800}
                height={1000}
              />
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

export function AboutMeManifesto() {
  const m = aboutPage.manifesto;
  return (
    <section className="bg-bg-muted py-24 md:py-32">
      <div className="container-x">
        <div className="mx-auto max-w-3xl">
          <span className="eyebrow">{m.chapter.label}</span>
          <h2 className="display-h2 mt-4">
            {m.headline.lead} <em>{m.headline.emphasis}</em>
          </h2>
          <span className="rule mt-6" />

          <div className="mt-10 space-y-6">
            {m.paragraphs.map((p, i) => (
              <p key={i} className="lede">
                {p}
              </p>
            ))}
          </div>

          {/* Pull-quote */}
          <blockquote className="mt-12 border-l-2 border-[color:var(--color-gold)] pl-6 font-serif text-2xl italic leading-snug text-ink md:text-3xl">
            “{m.pullQuote}”
          </blockquote>

          {/* Signature */}
          <div className="mt-12 border-t border-line pt-8">
            <div className="text-[11px] uppercase tracking-[0.22em] text-ink-3">
              Signed
            </div>
            <div className="mt-2 font-serif text-2xl text-ink">{m.signature.name}</div>
            <div className="mt-1 text-[13px] text-ink-3">{m.signature.role}</div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function AboutStats() {
  return (
    <section className="bg-bg py-20 md:py-24">
      <div className="container-x">
        <dl className="grid grid-cols-3 gap-6 md:gap-12">
          {aboutPage.stats.map((s) => (
            <div key={s.label} className="border-t border-line pt-6">
              <dt className="text-[11px] uppercase tracking-[0.22em] text-ink-3">
                {s.label}
              </dt>
              <dd className="mono mt-3 font-serif text-5xl leading-none text-ink md:text-6xl">
                {s.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

export function WeDoBetter() {
  const w = aboutPage.weDoBetter;
  return (
    <section className="bg-bg-muted py-24 md:py-32">
      <div className="container-x">
        <div className="grid gap-12 md:gap-20 md:grid-cols-12 md:items-center">
          <div className="md:col-span-5">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-md bg-bg">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={w.portraitSrc}
                alt={w.portraitAlt}
                className="absolute inset-0 size-full object-cover"
                width={800}
                height={1000}
              />
            </div>
          </div>
          <div className="md:col-span-7">
            <span className="eyebrow">{w.eyebrow}</span>
            <h2 className="display-h2 mt-4">
              {w.headline.lead} <em>{w.headline.emphasis}</em>
            </h2>
            <span className="rule mt-6" />
            <p className="lede mt-8">{w.body}</p>
            <p className="mt-10 text-[12px] uppercase tracking-[0.22em] text-ink-3">
              {w.closingStrip}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Certifications() {
  const c = aboutPage.certifications;
  return (
    <section className="bg-bg py-24 md:py-32">
      <div className="container-x">
        <div className="mb-12 max-w-2xl">
          <span className="eyebrow">{c.eyebrow}</span>
          <h2 className="display-h2 mt-4">{c.headline}</h2>
          <span className="rule mt-6" />
          <p className="lede mt-6">{c.lede}</p>
        </div>
        <div className="grid gap-10 sm:grid-cols-2">
          {c.cards.map((card) => (
            <figure
              key={card.src}
              className="rounded-md border border-line bg-bg-elev p-6"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm bg-bg-muted">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={card.src}
                  alt={card.label}
                  className="absolute inset-0 size-full object-contain"
                  width={800}
                  height={600}
                />
              </div>
              <figcaption className="mt-4 flex items-baseline justify-between text-[12px] uppercase tracking-[0.18em]">
                <span className="text-ink-3">{card.badge}</span>
                <span className="text-ink-2">{card.label}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

export function AboutContactBlock() {
  const c = aboutPage.contactBlock;
  return (
    <section className="bg-bg-muted py-24 md:py-32">
      <div className="container-x">
        <div className="mx-auto max-w-3xl text-center">
          <span className="eyebrow" style={{ justifyContent: "center" }}>
            {c.eyebrow}
          </span>
          <h2 className="display-h2 mt-4">
            {c.headline.lead} <em>{c.headline.emphasis}</em>
          </h2>
          <span className="rule mx-auto mt-6" />
        </div>

        <dl className="mx-auto mt-12 grid max-w-3xl gap-px overflow-hidden rounded-md border border-line-strong bg-line-strong md:grid-cols-2">
          {[
            { k: c.rows.mobile, v: site.phone, href: `tel:${site.phone}` },
            { k: c.rows.office, v: site.officePhone, href: `tel:${site.officePhone}` },
            { k: c.rows.email, v: site.email, href: `mailto:${site.email}` },
            { k: c.rows.fax, v: site.fax, href: undefined },
          ].map((row) => (
            <div key={row.k} className="bg-bg-elev p-6">
              <dt className="text-[11px] uppercase tracking-[0.22em] text-ink-3">
                {row.k}
              </dt>
              <dd className="mono mt-2 text-ink-2">
                {row.href ? (
                  <Link href={row.href} className="hover:text-accent">
                    {row.v}
                  </Link>
                ) : (
                  row.v
                )}
              </dd>
            </div>
          ))}
        </dl>

        <div className="mx-auto mt-12 max-w-3xl text-center">
          <Link href="/contact" className="btn btn-primary">
            Get in touch
          </Link>
        </div>
      </div>
    </section>
  );
}
