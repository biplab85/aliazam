"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Menu,
  X,
  User,
  Briefcase,
  ListChecks,
  Home,
  Mail,
  type LucideIcon,
} from "lucide-react";
import { nav, site, type NavIconName } from "@/content";
import { cn } from "@/lib/cn";

const NAV_ICON: Record<NavIconName, LucideIcon> = {
  user: User,
  briefcase: Briefcase,
  "list-checks": ListChecks,
  home: Home,
  mail: Mail,
};

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile drawer on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background,border-color,backdrop-filter] duration-300 ease-out",
          "border-b border-transparent",
          scrolled &&
            "border-line bg-bg/75 backdrop-blur-xl backdrop-saturate-150",
        )}
      >
        <div className="container-x flex items-center justify-between gap-6 py-[18px] md:py-[22px]">
          <Link
            href="/"
            className="flex items-center text-ink"
            aria-label={`${site.name} — home`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={site.logo}
              alt={site.name}
              className="block h-8 w-auto md:h-9"
              width={160}
              height={36}
            />
          </Link>

          <ul className="hidden gap-6 lg:flex">
            {nav.map((item) => {
              const Icon = NAV_ICON[item.icon];
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="group relative inline-flex items-center gap-1.5 text-sm font-medium text-ink-2 transition-colors hover:text-ink"
                  >
                    <Icon className="size-[14px] text-ink-3 transition-colors group-hover:text-accent" strokeWidth={1.75} />
                    {item.label}
                    <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-accent transition-all duration-300 ease-out group-hover:w-full" />
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-3">
            <a
              href={`tel:${site.phone.replace(/\s/g, "")}`}
              className="hidden items-center gap-2 text-[13px] font-medium tabular-nums text-ink-2 md:inline-flex"
            >
              <span className="size-[5px] rounded-full bg-accent" />
              {site.phone}
            </a>
            <a href="#contact" className="btn btn-primary btn-sm">
              Book a call <span className="arrow">→</span>
            </a>
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="grid size-9 place-items-center rounded-full border border-line-strong text-ink lg:hidden"
              aria-label="Open menu"
            >
              <Menu className="size-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-[60] lg:hidden" role="dialog" aria-modal="true">
          <div
            className="absolute inset-0 bg-ink/30 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <div className="absolute inset-x-0 top-0 bg-bg p-6 shadow-deep">
            <div className="mb-8 flex items-center justify-between">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={site.logo}
                alt={site.name}
                className="block h-8 w-auto"
                width={160}
                height={32}
              />
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="grid size-9 place-items-center rounded-full border border-line-strong text-ink"
                aria-label="Close menu"
              >
                <X className="size-4" />
              </button>
            </div>
            <nav>
              <ul className="grid gap-4 font-serif text-3xl text-ink">
                {nav.map((item) => {
                  const Icon = NAV_ICON[item.icon];
                  return (
                    <li key={item.href}>
                      <a
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className="group inline-flex items-center gap-4"
                      >
                        <Icon className="size-5 text-ink-3 transition-colors group-hover:text-accent" strokeWidth={1.5} />
                        {item.label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="btn btn-primary mt-10 w-full justify-center"
            >
              Book a call <span className="arrow">→</span>
            </a>
          </div>
        </div>
      )}
    </>
  );
}
