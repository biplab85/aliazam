"use client";

import {
  Fragment,
  useEffect,
  useRef,
  useState,
  type FormEvent,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronLeft, X } from "lucide-react";
import { mortgageCalculator } from "@/content";

/**
 * Mortgage calculator modal. Triggered from the header's "Mortgage
 * Calculator" button. Math mirrors aliazam.ca's WordPress plugin
 * (Responsive Mortgage Calculator) verbatim:
 *
 *   loan      = totalAmount − downPayment
 *   r         = annualRate / 12 / 100        (monthly periodic rate)
 *   n         = years × 12                   (number of payments)
 *   payment   = loan × r·(1+r)ⁿ / ((1+r)ⁿ−1) (zero-rate special-case
 *                                              loan / n)
 *
 * Runs entirely client-side, no network round-trip.
 */

export type MortgageCalculatorProps = {
  open: boolean;
  onClose: () => void;
};

type ScheduleRow = {
  /** 1-based payment index (1 → numPayments). */
  index: number;
  /** Date this payment lands on (start = today, then +1 month per index). */
  date: Date;
  /** Principal portion of this month's payment. */
  principal: number;
  /** Interest portion of this month's payment. */
  interest: number;
  /** Remaining balance after this payment. */
  balance: number;
};

type YearGroup = {
  year: number;
  principal: number;
  interest: number;
  /** Balance at the END of the year (last month's balance). */
  endBalance: number;
};

type Result = {
  principal: number;
  monthlyPayment: number;
  totalPaid: number;
  totalInterest: number;
  totalCost: number;
  numPayments: number;
  schedule: ScheduleRow[];
  byYear: YearGroup[];
  payoffDate: Date;
};

const c = mortgageCalculator.modal;
const f = c.fields;

function formatCurrency(value: number): string {
  // Match the source plugin's output: bare "$" prefix, comma-grouped,
  // 2 decimal places. en-CA's currency formatter prepends "US$" when the
  // locale and currency disagree, so format the number manually.
  const grouped = new Intl.NumberFormat("en-CA", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Math.abs(value));
  return `${value < 0 ? "-" : ""}$${grouped}`;
}

function formatNumber(value: number): string {
  return new Intl.NumberFormat("en-CA", {
    maximumFractionDigits: 0,
  }).format(value);
}

/** "May, 2031" — used for the payoff KPI and the table's Date column. */
function formatMonthYear(d: Date): string {
  return d.toLocaleString("en-US", { month: "short", year: "numeric" });
}

/**
 * Build the full amortization schedule + per-year aggregates from the
 * computed monthly payment. Each row's interest = current balance ×
 * monthly periodic rate; principal portion = monthly payment − interest.
 */
function buildSchedule(input: {
  principal: number;
  monthlyRate: number;
  numPayments: number;
  monthlyPayment: number;
}): { schedule: ScheduleRow[]; byYear: YearGroup[]; payoffDate: Date } {
  const { principal, monthlyRate, numPayments, monthlyPayment } = input;
  const schedule: ScheduleRow[] = [];
  let balance = principal;
  const start = new Date();
  // Roll into next month so the first row is "1 month from now".
  start.setDate(1);

  for (let i = 1; i <= numPayments; i++) {
    const interest = balance * monthlyRate;
    let principalPaid = monthlyPayment - interest;
    if (i === numPayments) {
      // Last payment: clear any tiny floating-point residue.
      principalPaid = balance;
    }
    balance = Math.max(0, balance - principalPaid);
    const date = new Date(start);
    date.setMonth(start.getMonth() + i);
    schedule.push({ index: i, date, principal: principalPaid, interest, balance });
  }

  // Aggregate per calendar year for the chart + table-totals rows.
  const byYearMap = new Map<number, YearGroup>();
  schedule.forEach((row) => {
    const year = row.date.getFullYear();
    const cur = byYearMap.get(year) ?? {
      year,
      principal: 0,
      interest: 0,
      endBalance: row.balance,
    };
    cur.principal += row.principal;
    cur.interest += row.interest;
    cur.endBalance = row.balance; // last entry wins → end-of-year
    byYearMap.set(year, cur);
  });

  const payoffDate = schedule[schedule.length - 1]?.date ?? new Date();
  return {
    schedule,
    byYear: Array.from(byYearMap.values()),
    payoffDate,
  };
}

export function MortgageCalculator({ open, onClose }: MortgageCalculatorProps) {
  const [totalAmount, setTotalAmount] = useState<string>(
    String(f.totalAmount.defaultValue),
  );
  const [downPayment, setDownPayment] = useState<string>(
    String(f.downPayment.defaultValue),
  );
  const [interestRate, setInterestRate] = useState<string>(
    String(f.interestRate.defaultValue),
  );
  const [amortization, setAmortization] = useState<string>(
    String(f.amortization.defaultValue),
  );
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState<string | null>(null);
  /** Three-stage view machine: form → loading → result. */
  const [view, setView] = useState<"form" | "loading" | "result">("form");
  /** Ref to the modal's scrollable body — used to stop wheel/touch events
   *  from bubbling up to Lenis's window-level smooth-scroll listener. */
  const bodyRef = useRef<HTMLDivElement>(null);

  // Escape key closes the modal.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // Lock background scroll while the modal is open.
  // `position: fixed` on body neutralises Lenis (which drives scroll on the
  // documentElement) — overflow:hidden alone isn't enough for smooth-scroll
  // wrappers. Capture + restore the scroll position so closing the modal
  // doesn't jump the page back to the top.
  useEffect(() => {
    if (!open) return;
    const html = document.documentElement;
    const body = document.body;
    const scrollY = window.scrollY;
    const orig = {
      htmlOverflow: html.style.overflow,
      bodyOverflow: body.style.overflow,
      bodyPosition: body.style.position,
      bodyTop: body.style.top,
      bodyWidth: body.style.width,
    };
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.width = "100%";
    return () => {
      html.style.overflow = orig.htmlOverflow;
      body.style.overflow = orig.bodyOverflow;
      body.style.position = orig.bodyPosition;
      body.style.top = orig.bodyTop;
      body.style.width = orig.bodyWidth;
      window.scrollTo(0, scrollY);
    };
  }, [open]);

  // Reset to a clean form when the modal closes.
  useEffect(() => {
    if (open) return;
    setResult(null);
    setError(null);
    setView("form");
  }, [open]);

  // Lenis (lib/lenis-provider) attaches a wheel listener to window with
  // smoothWheel: true and preventDefault, which intercepts EVERY wheel
  // event in the page — including ones over our modal's overflow-y-auto
  // body. Result: the mouse-wheel doesn't scroll the result panel.
  //
  // Fix: attach wheel + touchmove listeners on the body element that
  // call stopPropagation, so the events never reach window where Lenis
  // is listening. Native scroll on the inner scroll container fires
  // normally. We also re-fire the events on this dataset for tests.
  useEffect(() => {
    if (!open) return;
    const el = bodyRef.current;
    if (!el) return;
    const stop = (e: Event) => e.stopPropagation();
    el.addEventListener("wheel", stop, { passive: true });
    el.addEventListener("touchmove", stop, { passive: true });
    return () => {
      el.removeEventListener("wheel", stop);
      el.removeEventListener("touchmove", stop);
    };
  }, [open, view]);

  function handleCalculate(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const ta = parseFloat(totalAmount);
    const dp = parseFloat(downPayment);
    const ir = parseFloat(interestRate);
    const am = parseFloat(amortization);

    // Basic validation — surface a single error string at the top of the form
    if ([ta, dp, ir, am].some((n) => Number.isNaN(n))) {
      setError("Please fill in every field with a number.");
      return;
    }
    if (ta <= 0) {
      setError("Total amount must be greater than zero.");
      return;
    }
    if (dp < 0 || dp >= ta) {
      setError("Down payment must be between zero and the total amount.");
      return;
    }
    if (ir < 0) {
      setError("Interest rate cannot be negative.");
      return;
    }
    if (am <= 0) {
      setError("Amortization period must be greater than zero years.");
      return;
    }

    const principal = ta - dp;
    const n = am * 12; // monthly payments
    const r = ir / 100 / 12; // monthly periodic rate
    const monthlyPayment =
      ir === 0
        ? principal / n
        : (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPaid = monthlyPayment * n;
    const totalInterest = totalPaid - principal;
    const totalCost = totalPaid + dp;

    const { schedule, byYear, payoffDate } = buildSchedule({
      principal,
      monthlyRate: r,
      numPayments: n,
      monthlyPayment,
    });

    // Flip to the loading view so the spinner has a moment to read; the
    // calculation itself is synchronous, but a brief delay communicates
    // intent without feeling artificial.
    setView("loading");
    setTimeout(() => {
      setResult({
        principal,
        monthlyPayment,
        totalPaid,
        totalInterest,
        totalCost,
        numPayments: n,
        schedule,
        byYear,
        payoffDate,
      });
      setView("result");
    }, 700);
  }

  function handleBack() {
    // Keep form values + computed result so re-submitting from the same
    // inputs is instant; just flip the view back to the form.
    setView("form");
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="mc-modal-title"
          className="fixed inset-0 z-[80] grid place-items-center p-4 md:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Backdrop */}
          <motion.div
            aria-hidden
            className="absolute inset-0 bg-ink/45 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 8 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex w-full max-w-[1080px] max-h-[calc(100vh-2rem)] flex-col overflow-hidden rounded-[24px] border border-line-strong bg-bg shadow-[0_30px_70px_-22px_rgba(68,28,124,0.35)] md:max-h-[calc(100vh-4rem)]"
          >
            {/* Inner ambient mesh */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 -z-10 opacity-55"
              style={{
                background:
                  "radial-gradient(circle at 88% 12%, var(--color-gold-soft) 0%, transparent 55%), radial-gradient(circle at 12% 88%, var(--color-accent-soft) 0%, transparent 55%)",
              }}
            />
            {/* Top hairline accent */}
            <span
              aria-hidden
              className="pointer-events-none absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-[color:var(--color-gold)] to-transparent opacity-70"
            />

            {/* HEADER — back-arrow icon button (only in result view) sits
                inline with the title; close X stays at the right.
                `shrink-0` pins the header at the top while only the body
                region below scrolls. */}
            <header className="flex shrink-0 items-center justify-between gap-4 border-b border-line bg-bg px-7 py-5 md:px-9">
              <div className="flex items-center gap-3 md:gap-4">
                {view === "result" && (
                  <button
                    type="button"
                    onClick={handleBack}
                    aria-label="Back to form"
                    title="Back to form"
                    className="group/back grid size-9 shrink-0 place-items-center rounded-full border border-line-strong text-ink-2 transition-all duration-300 hover:border-[color:var(--color-accent)] hover:bg-[color:var(--color-accent-soft)] hover:text-accent"
                  >
                    <ChevronLeft
                      className="size-4 transition-transform duration-300 group-hover/back:-translate-x-0.5"
                      strokeWidth={1.75}
                    />
                  </button>
                )}
                <h2
                  id="mc-modal-title"
                  className="font-serif font-normal tracking-[-0.022em] text-ink"
                  style={{
                    fontSize: "clamp(24px, 2.2vw, 32px)",
                    lineHeight: 1.05,
                  }}
                >
                  {c.headline.lead}{" "}
                  <em className="text-accent">{c.headline.emphasis}</em>
                </h2>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label={c.closeLabel}
                className="grid size-9 shrink-0 place-items-center rounded-full border border-line-strong text-ink-2 transition-all duration-300 hover:border-[color:var(--color-accent)] hover:text-accent"
              >
                <X className="size-4" strokeWidth={1.75} />
              </button>
            </header>

            {/* BODY — switches between form / loader / result.
                `flex-1` + `overflow-y-auto` makes only the body scroll,
                so the modal panel stays inside the viewport even when the
                amortization table is long. `overscroll-contain` keeps the
                page underneath from scrolling once you reach a body edge.
                The ref + effect above stops wheel/touch events from
                bubbling out to Lenis. */}
            <div
              ref={bodyRef}
              className="flex-1 overflow-y-auto overscroll-contain"
            >
              <AnimatePresence mode="wait" initial={false}>
              {view === "form" && (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="grid gap-7 px-7 py-7 md:px-9 md:py-8"
                >
                  <p className="max-w-[58ch] text-[14.5px] leading-[1.6] text-ink-2">
                    {c.lede}
                  </p>

                  <form onSubmit={handleCalculate} className="grid gap-5">
                    <div className="grid gap-5 md:grid-cols-2">
                      <CurrencyField
                        label={f.totalAmount.label}
                        placeholder={f.totalAmount.placeholder}
                        value={totalAmount}
                        onChange={setTotalAmount}
                      />
                      <CurrencyField
                        label={f.downPayment.label}
                        placeholder={f.downPayment.placeholder}
                        value={downPayment}
                        onChange={setDownPayment}
                      />
                      <CurrencyField
                        label={f.interestRate.label}
                        placeholder={f.interestRate.placeholder}
                        value={interestRate}
                        onChange={setInterestRate}
                      />
                      <CurrencyField
                        label={f.amortization.label}
                        placeholder={f.amortization.placeholder}
                        value={amortization}
                        onChange={setAmortization}
                      />
                    </div>

                    {error && (
                      <p
                        role="alert"
                        className="rounded-[12px] border border-[color:var(--color-accent)]/40 bg-[color:var(--color-accent-soft)] px-4 py-3 text-[13px] text-[color:var(--color-accent)]"
                      >
                        {error}
                      </p>
                    )}

                    <div className="flex flex-wrap items-center gap-3 pt-1">
                      <button
                        type="submit"
                        className="btn btn-primary px-7 py-3.5 text-[15px]"
                      >
                        {c.submitLabel} <span className="arrow">→</span>
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}

              {view === "loading" && (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="grid place-items-center gap-5 px-7 py-20 md:py-28"
                >
                  <Loader />
                </motion.div>
              )}

              {view === "result" && result && (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="px-5 py-5 md:px-7 md:py-7"
                >
                  <ResultPanel result={result} />
                </motion.div>
              )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ============================================================== */
/*  CURRENCY FIELD                                                */
/* ============================================================== */

function CurrencyField({
  label,
  placeholder,
  value,
  onChange,
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-[10.5px] font-medium uppercase tracking-[0.18em] text-ink-3">
        {label}
      </span>
      <input
        type="text"
        inputMode="decimal"
        autoComplete="off"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value.replace(/[^0-9.]/g, ""))}
        className="rounded-[12px] border border-line bg-bg-warm/60 px-4 py-3 font-serif text-[16px] tabular-nums tracking-[-0.005em] text-ink placeholder:font-sans placeholder:text-[14px] placeholder:tracking-[-0.005em] placeholder:text-ink-3 transition-all duration-300 hover:border-line-strong focus:border-[color:var(--color-accent)] focus:outline-none focus:ring-2 focus:ring-[color:var(--color-accent)]/15"
      />
    </label>
  );
}

/* ============================================================== */
/*  RESULT PANEL                                                  */
/* ============================================================== */

function ResultPanel({ result }: { result: Result }) {
  const r = mortgageCalculator.modal.result;
  return (
    <div className="overflow-hidden rounded-[20px] border border-line-strong bg-bg-elev/85 backdrop-blur-md">
      {/* Eyebrow */}
      <div className="flex items-center gap-3 border-b border-line bg-bg-warm/40 px-5 py-4 md:px-7">
        <span className="grid size-7 place-items-center rounded-full border border-[color:var(--color-accent)]/40 bg-[color:var(--color-accent-soft)] text-[color:var(--color-accent)]">
          <Check className="size-3.5" strokeWidth={2.4} />
        </span>
        <span className="text-[10.5px] font-medium uppercase tracking-[0.22em] text-ink-2">
          {r.eyebrow}
        </span>
        <span aria-hidden className="h-px flex-1 bg-line" />
      </div>

      {/* ============== KPI STRIP — 3 colour-coded columns ============== */}
      <div className="grid grid-cols-1 divide-y divide-line border-b border-line md:grid-cols-3 md:divide-x md:divide-y-0">
        <KpiCell
          label={r.kpis.monthly}
          value={formatCurrency(result.monthlyPayment)}
          color="#1d6f1d"
        />
        <KpiCell
          label={r.kpis.totalPayments.replace(
            "{n}",
            formatNumber(result.numPayments),
          )}
          value={formatCurrency(result.totalPaid)}
          color="#7a5f1a"
        />
        <KpiCell
          label={r.kpis.payoffDate}
          value={formatMonthYear(result.payoffDate)}
          color="#9b2b2b"
        />
      </div>

      {/* ============== STACKED BAR CHART ============== */}
      <div className="border-b border-line px-5 py-6 md:px-7 md:py-8">
        <div
          className="rounded-[14px] border border-line bg-bg-warm/40 px-4 py-5 md:px-6 md:py-6"
          style={{
            background:
              "linear-gradient(180deg, rgba(244,239,224,0.55) 0%, rgba(250,250,247,0.85) 100%)",
          }}
        >
          <YearlyChart byYear={result.byYear} />
        </div>
      </div>

      {/* ============== AMORTIZATION SCHEDULE TABLE ============== */}
      <ScheduleTable result={result} />

      {/* Footer fine print */}
      <p className="border-t border-line px-5 py-4 text-[11px] leading-[1.55] text-ink-3 md:px-7">
        {r.footer}
      </p>
    </div>
  );
}

function KpiCell({
  label,
  value,
  color,
}: {
  label: string;
  value: string;
  color?: string;
}) {
  return (
    <div className="grid place-items-center gap-1 px-4 py-3.5 text-center md:py-4">
      <span
        className="font-serif font-normal tabular-nums leading-none tracking-[-0.025em]"
        style={{
          fontSize: "clamp(22px, 2.4vw, 32px)",
          color: color ?? "var(--color-ink)",
        }}
      >
        {value}
      </span>
      <span className="text-[11.5px] tracking-[-0.005em] text-ink-2">
        {label}
      </span>
    </div>
  );
}

/* ============================================================== */
/*  LOADER — premium spinner + serif label                        */
/* ============================================================== */

function Loader() {
  return (
    <>
      <span className="relative inline-grid size-14 place-items-center">
        {/* Static base ring */}
        <span
          aria-hidden
          className="absolute inset-0 rounded-full border-[2.5px] border-line"
        />
        {/* Spinning gold + accent arc */}
        <span
          aria-hidden
          className="absolute inset-0 rounded-full border-[2.5px] border-transparent"
          style={{
            borderTopColor: "var(--color-gold)",
            borderRightColor: "var(--color-accent)",
            animation: "spin 0.9s linear infinite",
          }}
        />
        {/* Centre dot */}
        <span
          aria-hidden
          className="size-1.5 rounded-full bg-[color:var(--color-gold)]"
        />
      </span>
      <span
        className="font-serif italic tracking-[-0.005em] text-ink-2"
        style={{ fontSize: "clamp(16px, 1.6vw, 20px)" }}
      >
        Calculating
        <span className="inline-block w-5 text-left text-[color:var(--color-accent)]">
          <DotPulse />
        </span>
      </span>
    </>
  );
}

/** Three-dot pulse — sequenced opacity so dots appear one at a time. */
function DotPulse() {
  const dot = (delay: number) => (
    <span
      style={{
        animation: `mc-dot 1.4s ${delay}s infinite`,
        display: "inline-block",
      }}
    >
      .
    </span>
  );
  return (
    <>
      <style>{`
        @keyframes mc-dot {
          0%, 60%, 100% { opacity: 0.2; }
          30% { opacity: 1; }
        }
      `}</style>
      {dot(0)}
      {dot(0.2)}
      {dot(0.4)}
    </>
  );
}

/* ============================================================== */
/*  YEARLY CHART — stacked principal / interest bars + balance    */
/*  line. Pure SVG, no external charting deps.                    */
/* ============================================================== */

function YearlyChart({ byYear }: { byYear: YearGroup[] }) {
  const r = mortgageCalculator.modal.result.chart;
  if (byYear.length === 0) return null;

  // Colours match the reference output (light green / yellow / coral)
  const greenFill = "#aee396";
  const greenStroke = "#5fbf5f";
  const yellowFill = "#f5e389";
  const yellowStroke = "#d4b94a";
  const lineStroke = "#ef4444";

  // SVG geometry — tightened from 800×280 to 800×200 so the chart reads
  // as a slim companion to the KPI strip rather than a full hero panel.
  const W = 800;
  const H = 200;
  const padX = 36;
  const padTop = 20;
  const padBottom = 32;
  const innerW = W - padX * 2;
  const innerH = H - padTop - padBottom;
  const n = byYear.length;
  const slot = innerW / n;
  const barW = Math.min(60, slot * 0.5);

  // Scales
  const maxStack = Math.max(
    ...byYear.map((y) => y.principal + y.interest),
    1,
  );
  const maxBalance = Math.max(...byYear.map((y) => y.endBalance), 1);
  const yStack = (v: number) => (v / maxStack) * innerH;
  const yBal = (v: number) => padTop + innerH - (v / maxBalance) * innerH;

  // Polyline points for the declining-balance line
  const linePts = byYear
    .map((y, i) => {
      const cx = padX + slot * i + slot / 2;
      return `${cx},${yBal(y.endBalance)}`;
    })
    .join(" ");

  return (
    <div>
      {/* Title + legend */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3 px-2">
        <span className="text-[10.5px] font-medium uppercase tracking-[0.22em] text-ink-2">
          {r.title}
        </span>
        <div className="flex items-center gap-4 text-[11px] text-ink-2">
          <LegendDot color={greenFill} label={r.legend.principal} />
          <LegendDot color={yellowFill} label={r.legend.interest} />
          <LegendLine color={lineStroke} label={r.legend.balance} />
        </div>
      </div>

      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="block h-auto w-full"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label={r.title}
      >
        {/* baseline */}
        <line
          x1={padX}
          y1={padTop + innerH}
          x2={W - padX}
          y2={padTop + innerH}
          stroke="var(--color-line)"
          strokeWidth="1"
        />

        {/* faint horizontal grid (4 lines) */}
        {[0.25, 0.5, 0.75].map((t, i) => (
          <line
            key={i}
            x1={padX}
            y1={padTop + innerH * (1 - t)}
            x2={W - padX}
            y2={padTop + innerH * (1 - t)}
            stroke="var(--color-line)"
            strokeWidth="0.6"
            strokeDasharray="2 4"
            opacity="0.6"
          />
        ))}

        {/* stacked bars per year */}
        {byYear.map((y, i) => {
          const cx = padX + slot * i + slot / 2;
          const x = cx - barW / 2;
          const pH = yStack(y.principal);
          const iH = yStack(y.interest);
          const principalY = padTop + innerH - pH;
          const interestY = principalY - iH;
          return (
            <g key={y.year}>
              {/* principal (bottom, green) */}
              <rect
                x={x}
                y={principalY}
                width={barW}
                height={pH}
                fill={greenFill}
                stroke={greenStroke}
                strokeWidth="0.8"
                rx="2"
              />
              {/* interest (top, yellow) */}
              <rect
                x={x}
                y={interestY}
                width={barW}
                height={iH}
                fill={yellowFill}
                stroke={yellowStroke}
                strokeWidth="0.8"
                rx="2"
              />
              {/* year label */}
              <text
                x={cx}
                y={padTop + innerH + 18}
                textAnchor="middle"
                fontFamily="var(--font-sans)"
                fontSize="10.5"
                fill="var(--color-ink-3)"
              >
                {y.year}
              </text>
            </g>
          );
        })}

        {/* balance polyline */}
        <polyline
          fill="none"
          stroke={lineStroke}
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          points={linePts}
        />

        {/* balance dots */}
        {byYear.map((y, i) => {
          const cx = padX + slot * i + slot / 2;
          return (
            <circle
              key={`d-${y.year}`}
              cx={cx}
              cy={yBal(y.endBalance)}
              r="4"
              fill="white"
              stroke={lineStroke}
              strokeWidth="2"
            />
          );
        })}
      </svg>
    </div>
  );
}

function LegendDot({ color, label }: { color: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span
        aria-hidden
        className="size-2.5 rounded-sm"
        style={{ background: color }}
      />
      {label}
    </span>
  );
}

function LegendLine({ color, label }: { color: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span
        aria-hidden
        className="block h-[2px] w-5 rounded-full"
        style={{ background: color }}
      />
      {label}
    </span>
  );
}

/* ============================================================== */
/*  AMORTIZATION SCHEDULE TABLE                                   */
/*  Per-month rows + per-year subtotal rows + a Totals row.       */
/*  Matches the colour-coded headers in the reference output.     */
/* ============================================================== */

function ScheduleTable({ result }: { result: Result }) {
  const r = mortgageCalculator.modal.result.table;
  const { schedule, byYear, principal, totalInterest } = result;

  // Group rows by year so we can interleave a subtotal row after each year.
  const rowsByYear = new Map<number, ScheduleRow[]>();
  schedule.forEach((row) => {
    const y = row.date.getFullYear();
    if (!rowsByYear.has(y)) rowsByYear.set(y, []);
    rowsByYear.get(y)!.push(row);
  });

  return (
    <div className="grid">
      <div className="flex items-center gap-3 px-5 pb-3 pt-5 md:px-7">
        <span className="text-[10.5px] font-medium uppercase tracking-[0.22em] text-ink-2">
          {r.title}
        </span>
        <span aria-hidden className="h-px flex-1 bg-line" />
      </div>

      <div className="border-t border-line">
        <table className="w-full border-collapse text-[13px] tabular-nums">
          <thead className="sticky top-0 z-10">
            <tr className="text-[11px] font-semibold uppercase tracking-[0.14em]">
              <th className="border-b border-line bg-white px-4 py-3 text-left text-ink-2">
                {r.headers.date}
              </th>
              <th
                className="border-b border-line px-4 py-3 text-right"
                style={{ background: "#aee396", color: "#1d4d1d" }}
              >
                {r.headers.principal}
              </th>
              <th
                className="border-b border-line px-4 py-3 text-right"
                style={{ background: "#f5e389", color: "#5b4516" }}
              >
                {r.headers.interest}
              </th>
              <th
                className="border-b border-line px-4 py-3 text-right"
                style={{ background: "#f5a3a3", color: "#651e1e" }}
              >
                {r.headers.balance}
              </th>
            </tr>
          </thead>
          <tbody>
            {byYear.map((yg) => {
              const rows = rowsByYear.get(yg.year) ?? [];
              return (
                <Fragment key={yg.year}>
                  {rows.map((row, i) => (
                    <tr
                      key={row.index}
                      className={
                        i % 2 === 1 ? "bg-bg-warm/30" : ""
                      }
                    >
                      <td className="border-b border-line/60 px-4 py-2.5 text-ink-2">
                        {formatMonthYear(row.date)}
                      </td>
                      <td
                        className="border-b border-line/60 px-4 py-2.5 text-right"
                        style={{ color: "#1d6f1d" }}
                      >
                        {formatCurrency(row.principal)}
                      </td>
                      <td
                        className="border-b border-line/60 px-4 py-2.5 text-right"
                        style={{ color: "#7a5f1a" }}
                      >
                        {formatCurrency(row.interest)}
                      </td>
                      <td
                        className="border-b border-line/60 px-4 py-2.5 text-right"
                        style={{ color: "#9b2b2b" }}
                      >
                        {formatCurrency(row.balance)}
                      </td>
                    </tr>
                  ))}
                  {/* Year subtotal row — gold-tinted band so it's clearly
                      a roll-up rather than another monthly entry. */}
                  <tr
                    className="font-semibold"
                    style={{ background: "rgba(245,227,137,0.32)" }}
                  >
                    <td className="border-y-2 border-[color:var(--color-gold)]/60 px-4 py-3 text-ink">
                      {yg.year}
                    </td>
                    <td
                      className="border-y-2 border-[color:var(--color-gold)]/60 px-4 py-3 text-right"
                      style={{ color: "#1d6f1d" }}
                    >
                      {formatCurrency(yg.principal)}
                    </td>
                    <td
                      className="border-y-2 border-[color:var(--color-gold)]/60 px-4 py-3 text-right"
                      style={{ color: "#7a5f1a" }}
                    >
                      {formatCurrency(yg.interest)}
                    </td>
                    <td
                      className="border-y-2 border-[color:var(--color-gold)]/60 px-4 py-3 text-right"
                      style={{ color: "#9b2b2b" }}
                    >
                      {formatCurrency(yg.endBalance)}
                    </td>
                  </tr>
                </Fragment>
              );
            })}

            {/* Grand totals row — bolder and ink-dark text so it reads as
                the final summary distinct from the gold year-subtotals. */}
            <tr
              className="text-[14.5px] font-bold uppercase tracking-[0.06em]"
              style={{ background: "rgba(10,10,10,0.04)" }}
            >
              <td className="border-t-2 border-ink/30 px-4 py-4 text-ink">
                {r.totalsLabel}
              </td>
              <td
                className="border-t-2 border-ink/30 px-4 py-4 text-right"
                style={{ color: "#155e15" }}
              >
                {formatCurrency(principal)}
              </td>
              <td
                className="border-t-2 border-ink/30 px-4 py-4 text-right"
                style={{ color: "#5b4a16" }}
              >
                {formatCurrency(totalInterest)}
              </td>
              <td
                className="border-t-2 border-ink/30 px-4 py-4 text-right"
                style={{ color: "#7a1f1f" }}
              >
                {formatCurrency(0)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
