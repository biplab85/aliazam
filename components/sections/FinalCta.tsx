import Link from "next/link";
import { finalCta, site } from "@/content";

/**
 * Final CTA — single-line invitation in deep navy. One primary action,
 * one secondary. Verbatim copy from content.tsx.
 */
export function FinalCta() {
  return (
    <section id="contact" className="bg-accent py-24 text-bg md:py-32">
      <div className="container-x">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-bg/70">
            <span className="h-px w-8 bg-[color:var(--color-gold)]" />
            Get in touch
          </span>

          <h2 className="display-h2 mt-6 text-bg">
            {finalCta.headline}
          </h2>

          <p className="mt-6 text-[17px] leading-relaxed text-bg/85">
            {finalCta.sub}
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link
              href={finalCta.primary.href}
              className="btn"
              style={{ background: "var(--color-bg)", color: "var(--color-accent)" }}
            >
              {finalCta.primary.label}
            </Link>
            <Link
              href={finalCta.secondary.href}
              className="btn"
              style={{
                background: "transparent",
                color: "var(--color-bg)",
                border: "1px solid rgba(248,246,242,0.35)",
              }}
            >
              {finalCta.secondary.label}
            </Link>
          </div>

          <div className="mt-10 text-[12.5px] uppercase tracking-[0.18em] text-bg/60">
            <span className="mono">{site.phone}</span>
            <span aria-hidden className="mx-3">·</span>
            <span>{site.email}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
