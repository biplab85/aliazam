import Link from "next/link";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import { site, footer, nav } from "@/content";

/**
 * Footer — quiet, broker-professional. Three columns + bottom bar.
 * No decorative blooms, no giant ghost-type, no gradient hairlines.
 */
export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-bg-muted text-ink-2">
      <div className="container-x py-20 md:py-24">
        {/* Brand line + tagline */}
        <div className="mb-16 grid gap-10 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <Link href="/" aria-label={`${site.name} — home`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={site.logo}
                alt={site.name}
                className="h-9 w-auto"
                width={180}
                height={36}
              />
            </Link>
            <p className="display-h3 mt-8 max-w-2xl">{footer.tagline}</p>
          </div>
          <div className="md:col-span-5 md:text-right">
            <a
              href={`mailto:${site.email}`}
              className="btn btn-primary"
            >
              {site.email}
            </a>
          </div>
        </div>

        {/* Columns */}
        <div className="grid gap-12 border-t border-line pt-12 md:grid-cols-4">
          <div>
            <div className="text-[11px] uppercase tracking-[0.22em] text-ink-3">
              Brokerage
            </div>
            <p className="mt-4 text-[14px] leading-relaxed text-ink-2">
              {site.brokerage}
              <br />
              <span className="text-ink-3">Independently owned & operated</span>
            </p>
          </div>

          <div>
            <div className="text-[11px] uppercase tracking-[0.22em] text-ink-3">
              Navigate
            </div>
            <ul className="mt-4 space-y-2.5 text-[14px]">
              {nav.map((n) => (
                <li key={n.href}>
                  <Link
                    href={n.href}
                    className="text-ink-2 transition-colors hover:text-accent"
                  >
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="text-[11px] uppercase tracking-[0.22em] text-ink-3">
              Office
            </div>
            <address className="mt-4 not-italic text-[14px] leading-relaxed text-ink-2">
              {site.address.line1}
              <br />
              {site.address.city} {site.address.postal}
            </address>
            <div className="mono mt-4 text-[14px] text-ink-2">
              <div>{site.phone}</div>
              <div className="text-ink-3">{site.officePhone}</div>
            </div>
          </div>

          <div>
            <div className="text-[11px] uppercase tracking-[0.22em] text-ink-3">
              Follow
            </div>
            <ul className="mt-4 flex gap-3">
              {[
                { href: site.social.facebook, Icon: Facebook, label: "Facebook" },
                { href: site.social.instagram, Icon: Instagram, label: "Instagram" },
                { href: site.social.linkedin, Icon: Linkedin, label: "LinkedIn" },
                { href: site.social.twitter, Icon: Twitter, label: "Twitter" },
              ].map(({ href, Icon, label }) => (
                <li key={label}>
                  <a
                    href={href}
                    aria-label={label}
                    className="grid size-9 place-items-center rounded-sm border border-line-strong text-ink-3 transition-colors hover:border-accent hover:text-accent"
                  >
                    <Icon className="size-4" strokeWidth={1.5} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col items-start justify-between gap-3 border-t border-line pt-6 text-[12.5px] text-ink-3 md:flex-row md:items-center">
          <div>
            © {year} {footer.copyright}. All rights reserved.
          </div>
          <div className="uppercase tracking-[0.18em]">
            Realtor® · Mortgage Agent · GTA
          </div>
        </div>
      </div>
    </footer>
  );
}
