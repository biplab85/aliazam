"use client";

import { usePathname } from "next/navigation";
import {
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  Phone,
  Smartphone,
  Printer,
  Mail,
  Award,
  ArrowUpRight,
  Heart,
} from "lucide-react";
import { site, footer } from "@/content";
import { cn } from "@/lib/cn";

/**
 * Premium footer.
 *
 * Layered top-to-bottom:
 *   1. Decorative ambient layer — soft accent + gold blooms in opposite
 *      corners and a thin gradient hairline along the very top edge.
 *   2. Top brand band — pulsing-dot status pill + giant serif tagline +
 *      a primary CTA that sits flush right.
 *   3. Four-column body — brand block (logo, achievement badge, brokerage
 *      address, social), Navigate, Services, Contact (with icon-leading
 *      items — phone / smartphone / printer / email).
 *   4. Bottom legal row — copyright + RECO disclaimer.
 *
 * Every link in the column groups gets an animated arrow on hover.
 */
export function Footer() {
  const year = new Date().getFullYear();
  const pathname = usePathname();
  const norm = (s: string) => s.replace(/\/+$/, "") || "/";
  const isActive = (href: string) =>
    href.startsWith("/") && norm(pathname) === norm(href);

  return (
    <footer className="relative isolate overflow-hidden bg-ink text-bg/[0.78]">
      <FooterDecoration />

      <div className="container-x relative z-10">
        {/* ---------- 1. Top brand band ---------- */}
        <div className="border-b border-bg/10 pb-12 pt-20 md:pb-16 md:pt-24">
          <div className="grid gap-10 md:grid-cols-[1fr_auto] md:items-end md:gap-12">
            <div>
              {/* Status pill */}
              <div className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-bg/15 bg-bg/[0.04] px-3.5 py-1.5 backdrop-blur-sm">
                <span className="relative inline-flex size-2.5 items-center justify-center">
                  <span className="absolute inline-flex size-full rounded-full bg-emerald-400 opacity-60 [animation:ping_2.4s_cubic-bezier(0,0,0.2,1)_infinite]" />
                  <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
                </span>
                <span className="text-[12.5px] font-medium text-bg/85">
                  Available Mon–Sat · 9am–7pm EST
                </span>
              </div>

              {/* Giant tagline */}
              <h2
                className="font-serif font-normal leading-[1.02] tracking-[-0.025em] text-white"
                style={{ fontSize: "clamp(36px, 5.2vw, 68px)" }}
              >
                For all your{" "}
                <em
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage:
                      "linear-gradient(110deg, var(--color-accent-2) 0%, #6E7E48 45%, var(--color-gold) 100%)",
                  }}
                >
                  real&nbsp;estate
                </em>{" "}
                needs.
              </h2>
            </div>

            {/* Primary CTA */}
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 justify-self-center self-end rounded-full bg-white px-6 py-3.5 text-[14px] font-medium text-ink transition-all duration-300 hover:bg-bg md:justify-self-auto"
            >
              Book a 15-min consult
              <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </div>
        </div>

        {/* ---------- 2. Footer columns ---------- */}
        {/* Mobile: 2 cols — Brand & Contact span both, so Navigate + Services
            share a single row in the middle. Desktop overrides via
            `md:grid-cols-[1.6fr_1fr_1fr_1.3fr]` + `md:col-span-1`. */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 py-14 md:grid-cols-[1.6fr_1fr_1fr_1.3fr] md:gap-14 md:py-16">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={site.logoFooter}
              alt={site.name}
              className="mb-6 block h-12 w-auto"
              width={200}
              height={48}
            />
            <p className="mb-6 max-w-[30ch] text-sm leading-[1.65]">
              {footer.tagline}
            </p>

            {/* Achievement badge */}
            <div className="mb-7 inline-flex items-center gap-3 rounded-2xl border border-bg/15 bg-bg/[0.04] px-3.5 py-3 backdrop-blur-sm">
              <span className="grid size-10 place-items-center rounded-xl bg-gold/15">
                <Award className="size-[18px] text-gold" strokeWidth={1.6} />
              </span>
              <div className="grid">
                <span className="text-[10.5px] font-medium uppercase tracking-[0.14em] text-bg/55">
                  Established
                </span>
                <span className="text-[14px] font-medium tabular-nums text-white">
                  15+ years · GTA
                </span>
              </div>
            </div>

            {/* Brokerage block */}
            <div className="text-[13px] leading-[1.7] text-bg/55">
              <strong className="mb-1 block font-semibold text-bg/85">
                {site.brokerage}
              </strong>
              <span>
                {site.address.line1}
                <br />
                {site.address.city} {site.address.postal}
              </span>
            </div>

            {/* Social */}
            <div className="mt-7 flex gap-2.5" aria-label="Social links">
              <SocialLink href={site.social.facebook} label="Facebook">
                <Facebook className="size-[15px]" />
              </SocialLink>
              <SocialLink href={site.social.instagram} label="Instagram">
                <Instagram className="size-[15px]" />
              </SocialLink>
              <SocialLink href={site.social.linkedin} label="LinkedIn">
                <Linkedin className="size-[15px]" />
              </SocialLink>
              <SocialLink href={site.social.twitter} label="Twitter">
                <Twitter className="size-[15px]" />
              </SocialLink>
            </div>
          </div>

          {/* Navigate + Services columns (from content.tsx) */}
          {footer.groups.map((group) => (
            <div key={group.heading}>
              <h4 className="mb-6 text-[10.5px] font-medium uppercase tracking-[0.16em] text-bg/45">
                {group.heading}
              </h4>
              <ul className="grid gap-3.5 text-[14px]">
                {group.links.map((l) => {
                  const active = isActive(l.href);
                  return (
                    <li key={`${group.heading}-${l.label}`}>
                      <a
                        href={l.href}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "group/link inline-flex items-center gap-1.5 transition-colors duration-300",
                          active
                            ? "is-active font-medium text-white"
                            : "text-bg/75 hover:text-white",
                        )}
                      >
                        {/* Active marker — small gold dot before the label */}
                        {active && (
                          <span
                            aria-hidden
                            className="size-1.5 rounded-full bg-[color:var(--color-gold)]"
                          />
                        )}
                        <span>{l.label}</span>
                        <span
                          aria-hidden
                          className={cn(
                            "transition-all duration-300",
                            active
                              ? "translate-x-0 text-[color:var(--color-gold)] opacity-100"
                              : "-translate-x-1 opacity-0 group-hover/link:translate-x-0 group-hover/link:opacity-100",
                          )}
                        >
                          →
                        </span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}

          {/* Contact column */}
          <div className="col-span-2 md:col-span-1">
            <h4 className="mb-6 text-[10.5px] font-medium uppercase tracking-[0.16em] text-bg/45">
              Contact
            </h4>
            <ul className="grid gap-3.5 text-[14px] tabular-nums">
              <li>
                <a
                  href={`tel:${site.phone.replace(/\s/g, "")}`}
                  className="group/link inline-flex items-center gap-3 text-bg/80 transition-colors hover:text-white"
                >
                  <span className="grid size-8 place-items-center rounded-full border border-bg/15 transition-colors group-hover/link:border-bg/40">
                    <Smartphone
                      className="size-3.5 text-bg/65 transition-colors group-hover/link:text-white"
                      strokeWidth={1.75}
                    />
                  </span>
                  {site.phone}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${site.officePhone.replace(/[^\d+]/g, "")}`}
                  className="group/link inline-flex items-center gap-3 text-bg/80 transition-colors hover:text-white"
                >
                  <span className="grid size-8 place-items-center rounded-full border border-bg/15 transition-colors group-hover/link:border-bg/40">
                    <Phone
                      className="size-3.5 text-bg/65 transition-colors group-hover/link:text-white"
                      strokeWidth={1.75}
                    />
                  </span>
                  {site.officePhone}
                  <span className="text-bg/40">office</span>
                </a>
              </li>
              <li className="inline-flex items-center gap-3 text-bg/55">
                <span className="grid size-8 place-items-center rounded-full border border-bg/15">
                  <Printer
                    className="size-3.5 text-bg/55"
                    strokeWidth={1.75}
                  />
                </span>
                {site.fax} <span className="text-bg/40">fax</span>
              </li>
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="group/link inline-flex items-center gap-3 text-bg/80 transition-colors hover:text-white"
                >
                  <span className="grid size-8 place-items-center rounded-full border border-bg/15 transition-colors group-hover/link:border-bg/40">
                    <Mail
                      className="size-3.5 text-bg/65 transition-colors group-hover/link:text-white"
                      strokeWidth={1.75}
                    />
                  </span>
                  <span className="break-all">{site.email}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* ---------- 3. Bottom legal row ---------- */}
        <div className="grid gap-3 border-t border-bg/10 py-6 text-[12.5px] text-bg/45 md:grid-cols-[1fr_auto] md:items-center">
          <span>
            © {footer.copyright} · {year} · All rights reserved.
          </span>
          <span className="inline-flex items-center gap-1.5 text-bg/35">
            Made by
            <Heart
              className="size-3.5 text-[color:var(--color-gold)]"
              fill="currentColor"
              strokeWidth={0}
              aria-hidden
            />
            Sklentr
          </span>
        </div>
      </div>
    </footer>
  );
}

/* ============================================================== */
/*  Decoration                                                    */
/* ============================================================== */

function FooterDecoration() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      {/* Top hairline gradient — accent fades in from center */}
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, var(--color-accent-2) 50%, transparent 100%)",
          opacity: 0.55,
        }}
      />

      {/* Top-left accent bloom */}
      <div
        className="absolute -left-40 -top-32 size-[560px] rounded-full opacity-[0.18] blur-[110px]"
        style={{
          background:
            "radial-gradient(circle, var(--color-accent-2) 0%, transparent 70%)",
        }}
      />

      {/* Bottom-right gold bloom */}
      <div
        className="absolute -bottom-40 -right-40 size-[520px] rounded-full opacity-[0.13] blur-[110px]"
        style={{
          background:
            "radial-gradient(circle, var(--color-gold) 0%, transparent 70%)",
        }}
      />

      {/* Subtle organic curve — top-left */}
      <svg
        className="absolute -left-10 top-8 w-[300px] opacity-[0.06]"
        viewBox="0 0 300 400"
        fill="none"
      >
        <path
          d="M -10 80 C 80 30, 220 220, 270 110 S 380 320, 200 400"
          stroke="var(--color-accent-2)"
          strokeWidth="1.5"
        />
      </svg>

      {/* Subtle organic curve — bottom-right */}
      <svg
        className="absolute -right-10 bottom-10 w-[300px] opacity-[0.05]"
        viewBox="0 0 300 400"
        fill="none"
      >
        <path
          d="M 320 0 C 200 100, 270 220, 120 280 S 0 380, 60 460"
          stroke="var(--color-gold)"
          strokeWidth="1.5"
        />
      </svg>

      {/* Faint dotted texture */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(250,250,247,0.6) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
    </div>
  );
}

/* ============================================================== */
/*  Social link                                                    */
/* ============================================================== */

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      className="group/social grid size-[38px] place-items-center rounded-full border border-bg/15 transition-all duration-300 hover:-translate-y-0.5 hover:border-bg/45 hover:bg-bg/[0.05]"
    >
      <span className="text-bg/70 transition-colors group-hover/social:text-white">
        {children}
      </span>
    </a>
  );
}
