"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Calculator,
  ChevronDown,
  Menu,
  X,
  User,
  Briefcase,
  ListChecks,
  Home,
  Mail,
  type LucideIcon,
} from "lucide-react";
import { mortgageCalculator, nav, site, type NavIconName } from "@/content";
import { MortgageCalculator } from "@/components/mortgage/MortgageCalculator";
import { cn } from "@/lib/cn";

const NAV_ICON: Record<NavIconName, LucideIcon> = {
  user: User,
  briefcase: Briefcase,
  "list-checks": ListChecks,
  home: Home,
  mail: Mail,
};

/** True when `href` is a full route (starts with "/") that matches the
 *  current pathname. Hash anchors like "#about" never match — they're not
 *  routes, so we leave their active state to scroll-spy elsewhere. */
function useIsActive() {
  const pathname = usePathname();
  const norm = (s: string) => s.replace(/\/+$/, "") || "/";
  return (href: string) => href.startsWith("/") && norm(pathname) === norm(href);
}

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [mcOpen, setMcOpen] = useState(false);
  const isActive = useIsActive();

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
              const active = isActive(item.href);
              const hasChildren = !!item.children?.length;
              return (
                <li key={item.href} className="group/item relative">
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    aria-haspopup={hasChildren ? "menu" : undefined}
                    className={cn(
                      "group relative inline-flex items-center gap-1.5 text-sm font-medium transition-colors",
                      active
                        ? "is-active text-ink"
                        : "text-ink-2 hover:text-ink",
                    )}
                  >
                    <Icon
                      className={cn(
                        "size-[14px] transition-colors",
                        active
                          ? "text-accent"
                          : "text-ink-3 group-hover:text-accent",
                      )}
                      strokeWidth={1.75}
                    />
                    {item.label}
                    {hasChildren && (
                      <ChevronDown
                        className={cn(
                          "size-3 transition-transform duration-300 group-hover/item:rotate-180",
                          active ? "text-accent" : "text-ink-3",
                        )}
                        strokeWidth={2}
                      />
                    )}
                    <span
                      className={cn(
                        "absolute -bottom-1.5 left-0 h-px bg-accent transition-all duration-300 ease-out",
                        active ? "w-full" : "w-0 group-hover:w-full",
                      )}
                    />
                  </Link>

                  {/* Desktop dropdown — hover-reveals from the parent <li>.
                      Hidden by default, becomes visible/clickable when the
                      parent is hovered or has keyboard focus. */}
                  {hasChildren && (
                    <div
                      role="menu"
                      className="invisible absolute left-1/2 top-full z-50 mt-3 w-[260px] -translate-x-1/2 translate-y-1 opacity-0 transition-all duration-300 ease-out group-hover/item:visible group-hover/item:translate-y-0 group-hover/item:opacity-100 group-focus-within/item:visible group-focus-within/item:translate-y-0 group-focus-within/item:opacity-100"
                    >
                      <div className="overflow-hidden rounded-2xl border border-line bg-bg-elev/95 p-1.5 shadow-[0_24px_60px_-22px_rgba(10,10,10,0.32)] backdrop-blur-md">
                        {/* Tiny arrow pointing back at the parent */}
                        <span
                          aria-hidden
                          className="absolute -top-1 left-1/2 size-2 -translate-x-1/2 rotate-45 border-l border-t border-line bg-bg-elev"
                        />
                        <ul className="grid gap-0.5">
                          {item.children!.map((child) => (
                            <li key={child.href}>
                              <Link
                                href={child.href}
                                role="menuitem"
                                className="group/sub flex items-center gap-2 rounded-xl px-3 py-2.5 text-[13.5px] tracking-[-0.005em] text-ink-2 transition-colors duration-200 hover:bg-bg-warm hover:text-ink"
                              >
                                <span
                                  aria-hidden
                                  className="size-1 shrink-0 rounded-full bg-[color:var(--color-gold)] opacity-60 transition-opacity duration-200 group-hover/sub:opacity-100"
                                />
                                <span className="font-serif text-[14.5px] tracking-[-0.005em]">
                                  {child.label}
                                </span>
                                <span
                                  aria-hidden
                                  className="ml-auto -translate-x-1 text-[color:var(--color-accent)] opacity-0 transition-all duration-200 group-hover/sub:translate-x-0 group-hover/sub:opacity-100"
                                >
                                  →
                                </span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
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
            {/* Mortgage Calculator trigger — opens modal client-side */}
            <button
              type="button"
              onClick={() => setMcOpen(true)}
              aria-haspopup="dialog"
              aria-expanded={mcOpen}
              className="group hidden items-center gap-2 rounded-full border border-line-strong bg-bg-elev/85 px-4 py-2 text-[13px] font-medium text-ink-2 backdrop-blur-sm transition-all duration-300 hover:border-[color:var(--color-accent)] hover:text-accent md:inline-flex"
            >
              <Calculator
                className="size-3.5 text-[color:var(--color-gold)] transition-transform duration-300 group-hover:rotate-[-6deg]"
                strokeWidth={1.75}
              />
              <span className="hidden lg:inline">{mortgageCalculator.triggerLabel}</span>
              <span className="lg:hidden">Calculator</span>
            </button>
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
                  const active = isActive(item.href);
                  const hasChildren = !!item.children?.length;
                  return (
                    <li key={item.href} className="grid gap-3">
                      <Link
                        href={item.href}
                        onClick={() => setOpen(false)}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "group inline-flex items-center gap-4 transition-colors",
                          active && "is-active text-accent",
                        )}
                      >
                        <Icon
                          className={cn(
                            "size-5 transition-colors",
                            active
                              ? "text-accent"
                              : "text-ink-3 group-hover:text-accent",
                          )}
                          strokeWidth={1.5}
                        />
                        <span className="inline-flex items-center gap-3">
                          {item.label}
                          {active && (
                            <span
                              aria-hidden
                              className="size-1.5 rounded-full bg-accent"
                            />
                          )}
                        </span>
                      </Link>
                      {/* Mobile sub-menu — indented chips under parent */}
                      {hasChildren && (
                        <ul className="ml-9 grid gap-2 border-l border-line pl-4 text-base">
                          {item.children!.map((child) => (
                            <li key={child.href}>
                              <Link
                                href={child.href}
                                onClick={() => setOpen(false)}
                                className="inline-flex items-center gap-2 font-serif text-[16px] tracking-[-0.005em] text-ink-2 transition-colors hover:text-accent"
                              >
                                <span
                                  aria-hidden
                                  className="size-1 rounded-full bg-[color:var(--color-gold)]"
                                />
                                {child.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  );
                })}
              </ul>
            </nav>
            {/* Mortgage Calculator trigger inside the mobile drawer */}
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                setMcOpen(true);
              }}
              className="mt-10 inline-flex w-full items-center justify-center gap-2 rounded-full border border-line-strong bg-bg-elev/85 px-5 py-3.5 text-[15px] font-medium text-ink-2 transition-all duration-300 hover:border-[color:var(--color-accent)] hover:text-accent"
            >
              <Calculator
                className="size-4 text-[color:var(--color-gold)]"
                strokeWidth={1.75}
              />
              {mortgageCalculator.triggerLabel}
            </button>
          </div>
        </div>
      )}

      {/* Mortgage calculator modal — mounted at the root of the nav so it
          sits above every other layer (z-[80]) and survives route changes. */}
      <MortgageCalculator open={mcOpen} onClose={() => setMcOpen(false)} />
    </>
  );
}
