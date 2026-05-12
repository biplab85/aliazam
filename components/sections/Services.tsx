import Link from "next/link";
import { services, servicesIntro } from "@/content";

/**
 * Services — three quiet editorial cards. No icons-as-decoration,
 * no gradient backgrounds, no hover glow. Hairline top rule, roman
 * numeral, title, summary, link. Copy verbatim from content.tsx.
 */
export function Services() {
  return (
    <section id="services" className="bg-bg-muted py-24 md:py-32">
      <div className="container-x">
        <div className="mb-14 md:mb-20 md:flex md:items-end md:justify-between md:gap-12">
          <div className="max-w-2xl">
            <span className="eyebrow">Services</span>
            <h2 className="display-h2 mt-4">
              Expert guidance through the entire process —{" "}
              <em>whether you are buying, selling, or investing.</em>
            </h2>
            <span className="rule mt-6" />
          </div>
          <p className="lede mt-6 md:mt-0 md:max-w-sm">{servicesIntro.lede}</p>
        </div>

        <div className="grid gap-px overflow-hidden rounded-md border border-line-strong bg-line-strong md:grid-cols-3">
          {services.map((s, i) => (
            <article
              key={s.id}
              className="group relative flex flex-col bg-bg-elev p-8 md:p-10"
            >
              <div className="flex items-baseline gap-3 text-[12px] uppercase tracking-[0.22em] text-ink-3">
                <span className="mono text-ink">{`0${i + 1}`}</span>
                <span className="h-px flex-1 bg-line" />
              </div>
              <h3 className="display-h3 mt-6">{s.title}</h3>
              <p className="mt-4 text-[15px] leading-relaxed text-ink-2">
                {s.summary}
              </p>
              <Link
                href={`/services#${s.id}-services`}
                className="mt-8 inline-flex items-center gap-2 text-[12.5px] uppercase tracking-[0.16em] text-accent transition-colors hover:text-accent-2"
              >
                Learn more
                <span aria-hidden>→</span>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
