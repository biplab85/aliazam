import Link from "next/link";
import { servicesPage, site } from "@/content";

/**
 * /services — calm broker-professional sections. Verbatim copy from
 * content.tsx#servicesPage. Replaces the prior heavy-motion version.
 */

export function ServicesPageHero() {
  const h = servicesPage.hero;
  return (
    <section className="bg-bg pt-[120px] md:pt-[150px] pb-20 md:pb-28">
      <div className="container-x">
        <div className="max-w-3xl fade-up">
          <span className="eyebrow">{h.eyebrow}</span>
          <h1 className="display-h1 mt-6">
            {h.headline.lead} <em>{h.headline.emphasis}</em>
          </h1>
          <span className="rule mt-6" />
          <p className="lede mt-8">{h.strapline}</p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Link href={h.primaryCta.href} className="btn btn-primary">
              {h.primaryCta.label}
            </Link>
            <Link href={`tel:${site.phone}`} className="btn btn-ghost">
              {h.secondaryCta.label}
            </Link>
          </div>
        </div>

        {/* Chapter index */}
        <ol className="mt-16 grid gap-px overflow-hidden rounded-md border border-line-strong bg-line-strong md:grid-cols-3">
          {h.chapters.map((c) => (
            <li key={c.num} className="bg-bg-elev">
              <Link
                href={c.href}
                className="group flex items-baseline gap-4 p-6 transition-colors hover:bg-bg-muted md:p-8"
              >
                <span className="mono text-[12px] uppercase tracking-[0.22em] text-[color:var(--color-gold)]">
                  {c.num}
                </span>
                <span className="font-serif text-[20px] leading-tight text-ink">
                  {c.label}
                </span>
                <span
                  aria-hidden
                  className="ml-auto text-accent transition-transform duration-300 group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function ServicesIntro() {
  const i = servicesPage.intro;
  return (
    <section id="all-services" className="bg-bg-muted py-24 md:py-32">
      <div className="container-x">
        <div className="mx-auto max-w-3xl">
          <span className="eyebrow">{i.eyebrow}</span>
          <h2 className="display-h2 mt-4">
            {i.headline.lead} <em>{i.headline.emphasis}</em>
          </h2>
          <span className="rule mt-6" />

          <div className="mt-10 space-y-6">
            {i.paragraphs.map((p, idx) => (
              <p key={idx} className="lede">{p}</p>
            ))}
          </div>

          <ul className="mt-12 grid gap-x-8 gap-y-3 sm:grid-cols-2">
            {i.bullets.map((b) => (
              <li
                key={b}
                className="flex gap-3 text-[15px] leading-relaxed text-ink-2"
              >
                <span
                  aria-hidden
                  className="mt-2.5 h-px w-4 shrink-0 bg-[color:var(--color-gold)]"
                />
                {b}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export function FeaturedServices() {
  const f = servicesPage.featured;
  return (
    <section className="bg-bg py-24 md:py-32">
      <div className="container-x">
        <div className="mb-16 max-w-2xl">
          <span className="eyebrow">{f.sectionEyebrow}</span>
          <h2 className="display-h2 mt-4">
            {f.sectionHeadline.lead} <em>{f.sectionHeadline.emphasis}</em>
          </h2>
          <span className="rule mt-6" />
        </div>

        <div className="space-y-20 md:space-y-28">
          {f.items.map((it) => (
            <article id={it.anchor} key={it.anchor} className="scroll-mt-24">
              <div className="grid gap-10 md:grid-cols-12 md:gap-16">
                <div className="md:col-span-4">
                  <div className="mono text-[12px] uppercase tracking-[0.22em] text-[color:var(--color-gold)]">
                    Pillar · {it.roman}
                  </div>
                  <h3 className="display-h3 mt-4">{it.title}</h3>
                  <p className="mt-3 text-[14.5px] uppercase tracking-[0.14em] text-ink-3">
                    {it.tagline}
                  </p>
                </div>
                <div className="md:col-span-8 space-y-5">
                  {it.paragraphs.map((p, i) => (
                    <p key={i} className="text-[15.5px] leading-relaxed text-ink-2">
                      {p}
                    </p>
                  ))}
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 pt-4 text-[12.5px] uppercase tracking-[0.16em] text-accent transition-colors hover:text-accent-2"
                  >
                    {it.ctaLabel}
                    <span aria-hidden>→</span>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function PropertyTypes() {
  const p = servicesPage.propertyTypes;
  return (
    <section className="bg-bg-muted py-24 md:py-32">
      <div className="container-x">
        <div className="mb-12 max-w-2xl">
          <span className="eyebrow">{p.eyebrow}</span>
          <h2 className="display-h2 mt-4">
            {p.headline.lead} <em>{p.headline.emphasis}</em>
          </h2>
          <span className="rule mt-6" />
          <p className="lede mt-6">{p.lede}</p>
        </div>

        <ul className="grid gap-px overflow-hidden rounded-md border border-line-strong bg-line-strong sm:grid-cols-3 lg:grid-cols-6">
          {p.items.map((it) => (
            <li
              key={it.label}
              className="bg-bg-elev p-6 text-center text-[14px] uppercase tracking-[0.16em] text-ink-2"
            >
              {it.label}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function ServiceAlerts() {
  const a = servicesPage.alerts;
  return (
    <section className="bg-bg py-24 md:py-32">
      <div className="container-x">
        <div className="mb-14 max-w-2xl">
          <span className="eyebrow">{a.eyebrow}</span>
          <h2 className="display-h2 mt-4">
            {a.headline.lead} <em>{a.headline.emphasis}</em>
          </h2>
          <span className="rule mt-6" />
        </div>

        <div className="grid gap-px overflow-hidden rounded-md border border-line-strong bg-line-strong md:grid-cols-3">
          {a.cards.map((c) => (
            <article key={c.title} className="bg-bg-elev p-8 md:p-10">
              <h3 className="font-serif text-[22px] leading-tight text-ink">
                {c.title}
              </h3>
              <span className="rule mt-5" />
              <p className="mt-5 text-[15px] leading-relaxed text-ink-2">{c.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function BuyingSelling() {
  const bs = servicesPage.buyingSelling;
  return (
    <section className="bg-bg-muted py-24 md:py-32">
      <div className="container-x">
        <div className="mx-auto max-w-3xl">
          <span className="eyebrow">{bs.eyebrow}</span>
          <h2 className="display-h2 mt-4">
            {bs.headline.lead} <em>{bs.headline.emphasis}</em>
          </h2>
          <span className="rule mt-6" />
          <div className="mt-10 space-y-6">
            {bs.paragraphs.map((p, i) => (
              <p key={i} className="lede">{p}</p>
            ))}
          </div>
        </div>

        <div className="mt-16 grid gap-10 md:grid-cols-2">
          {bs.columns.map((col) => (
            <div key={col.title} className="rounded-md border border-line bg-bg-elev p-8 md:p-10">
              <h3 className="font-serif text-[22px] leading-tight text-ink">
                {col.title}
              </h3>
              <span className="rule mt-5" />
              <ul className="mt-6 space-y-3 text-[15px] leading-relaxed text-ink-2">
                {col.bullets.map((b) => (
                  <li key={b} className="flex gap-3">
                    <span
                      aria-hidden
                      className="mt-2.5 h-px w-4 shrink-0 bg-[color:var(--color-gold)]"
                    />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ServicesCtaBanner() {
  const b = servicesPage.ctaBanner;
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
          <p className="mt-6 text-[17px] leading-relaxed text-bg/85">{b.body}</p>
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
