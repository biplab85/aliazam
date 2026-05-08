"use client";

import { useRef, useState, type FormEvent } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import {
  ArrowUpRight,
  Check,
  Mail,
  MapPin,
  Phone,
  Printer,
  Smartphone,
} from "lucide-react";
import { contactPage, site } from "@/content";
import { reveal, revealContainer } from "@/lib/motion";

/**
 * /contact page — every string lives in `content.tsx#contactPage`. This
 * file is composition + visual treatment only. Copy edits happen there.
 *
 * Visual language is the third distinct treatment in the route family:
 *   • /about — monogram crest + dot-grid backdrop + Roman year stamp.
 *   • /listings — scrolling marquee + blueprint grid + cards collage.
 *   • /contact — telegram letterhead: ruled-paper backdrop, wax-seal
 *     envelope SVG, contact list + form pair beneath the hero.
 */

/* ============================================================== */
/*  HERO — telegram letterhead                                    */
/* ============================================================== */

export function ContactPageHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const smooth = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.4,
    restDelta: 0.0008,
  });
  // Envelope counter-parallax + slow rotation for a hand-set feel.
  const envelopeY = useTransform(smooth, [0, 1], [40, -40]);
  const envelopeRotate = useTransform(smooth, [0, 1], [-5, 5]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden pb-16 pt-28 md:pb-20 md:pt-32"
    >
      <ContactHeroBackground />
      <RuledPaper />

      <div className="container-x relative z-10">
        <motion.div
          variants={revealContainer}
          initial="hidden"
          animate="show"
          className="grid items-center gap-12 md:grid-cols-[1.2fr_0.8fr] md:gap-16 lg:mx-[40px]"
        >
          {/* ============== LEFT — letterhead typography ============== */}
          <div className="grid gap-7">
            {/* From-the-office-of letterhead block — copy in content.tsx */}
            <motion.div variants={reveal} className="grid gap-2">
              <span className="text-[10.5px] font-medium uppercase tracking-[0.22em] text-ink-3">
                {contactPage.hero.letterhead.label}
              </span>
              <span className="font-serif text-[18px] italic tracking-[-0.005em] text-ink">
                {contactPage.hero.letterhead.person}
              </span>
              <span className="text-[10.5px] font-medium uppercase tracking-[0.18em] text-ink-3">
                {contactPage.hero.letterhead.brokerage}
              </span>
            </motion.div>

            {/* Massive editorial display — verbatim "Contact us" headline */}
            <motion.h1
              variants={reveal}
              className="font-serif font-normal text-ink"
              style={{
                fontSize: "clamp(64px, 10vw, 156px)",
                lineHeight: 0.96,
                letterSpacing: "-0.035em",
              }}
            >
              {contactPage.hero.headline.split(" ")[0]}{" "}
              <em
                className="text-accent"
                style={{ fontStyle: "italic" }}
              >
                {contactPage.hero.headline.split(" ").slice(1).join(" ")}.
              </em>
            </motion.h1>

            {/* Verbatim lede — italic serif so it reads as a personal note */}
            <motion.p
              variants={reveal}
              className="max-w-[60ch] font-serif italic leading-[1.45] tracking-[-0.005em] text-ink-2"
              style={{ fontSize: "clamp(18px, 1.5vw, 22px)" }}
            >
              {contactPage.hero.lede}
            </motion.p>

            {/* Three channel pills — Phone / Email / Office */}
            <motion.div
              variants={reveal}
              className="flex flex-wrap items-center gap-2.5 pt-2"
            >
              <ChannelPill
                icon={<Smartphone className="size-3.5" strokeWidth={1.75} />}
                label={contactPage.hero.pills.direct}
                value={site.phone}
                href={`tel:${site.phone.replace(/\s/g, "")}`}
              />
              <ChannelPill
                icon={<Mail className="size-3.5" strokeWidth={1.75} />}
                label={contactPage.hero.pills.email}
                value={site.email}
                href={`mailto:${site.email}`}
              />
              <ChannelPill
                icon={<MapPin className="size-3.5" strokeWidth={1.75} />}
                label={contactPage.hero.pills.office}
                value={contactPage.hero.pills.officeValue}
              />
            </motion.div>

            {/* CTA strip */}
            <motion.div
              variants={reveal}
              className="flex flex-wrap items-center gap-3 pt-2"
            >
              <a
                href={`mailto:${site.email}`}
                className="btn btn-primary px-6 py-3.5 text-[15px]"
              >
                {contactPage.hero.primaryCta.label}{" "}
                <span className="arrow">→</span>
              </a>
              <a
                href={`tel:${site.phone.replace(/\s/g, "")}`}
                className="btn btn-ghost px-5 py-3.5 text-[15px]"
              >
                <Phone className="size-4" strokeWidth={1.75} />
                {contactPage.hero.secondaryCta.label}
                <ArrowUpRight className="size-4" strokeWidth={1.75} />
              </a>
            </motion.div>
          </div>

          {/* ============== RIGHT — vintage envelope + wax seal ============== */}
          <motion.div
            variants={reveal}
            className="relative mx-auto w-full max-w-[440px]"
          >
            <motion.div
              style={{ y: envelopeY, rotate: envelopeRotate }}
              className="relative"
            >
              <EnvelopeWithSeal />
            </motion.div>

            {/* Floating "POSTED" stamp — top-right */}
            <motion.div
              initial={{ opacity: 0, scale: 0.86, rotate: 12 }}
              animate={{ opacity: 1, scale: 1, rotate: -8 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="absolute -right-2 -top-2 grid place-items-center rounded-md border-2 border-[color:var(--color-accent)]/55 bg-bg-elev/95 px-3 py-2 text-center shadow-[0_14px_28px_-14px_rgba(68,28,124,0.32)] backdrop-blur md:-right-6"
            >
              <span className="font-serif text-[10px] font-medium uppercase leading-none tracking-[0.22em] text-[color:var(--color-accent)]">
                {contactPage.hero.postedStamp.label}
              </span>
              <span
                className="mt-1 font-serif italic leading-none tracking-[-0.02em] text-[color:var(--color-accent)]"
                style={{ fontSize: "16px" }}
              >
                {contactPage.hero.postedStamp.value}
              </span>
            </motion.div>

            {/* Floating reply-card — bottom-left */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.6 }}
              className="absolute -bottom-4 -left-3 max-w-[220px] rounded-2xl border border-line bg-bg-elev/95 p-4 shadow-[0_24px_60px_-22px_rgba(10,10,10,0.32)] backdrop-blur md:-left-8"
            >
              <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-ink-3">
                {contactPage.hero.replyCard.label}
              </span>
              <span className="mt-1 block font-serif text-[24px] tabular-nums tracking-[-0.018em] text-ink">
                {contactPage.hero.replyCard.value}
              </span>
              <span className="mt-1 block font-serif text-[12px] italic text-ink-3">
                {contactPage.hero.replyCard.hours}
              </span>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ──────────────────────── Hero subcomponents ──────────────────────── */

function ChannelPill({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}) {
  const Inner = (
    <span className="inline-flex items-center gap-2.5 rounded-full border border-line bg-bg-elev/80 px-3.5 py-2 text-[12.5px] tracking-[-0.005em] text-ink-2 backdrop-blur-sm transition-all duration-300 hover:border-[color:var(--color-accent)]/50 hover:text-ink">
      <span className="grid size-6 place-items-center rounded-full bg-bg-warm text-[color:var(--color-accent)]">
        {icon}
      </span>
      <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-ink-3">
        {label}
      </span>
      <span className="font-serif tabular-nums">{value}</span>
    </span>
  );
  return href ? <a href={href}>{Inner}</a> : Inner;
}

/**
 * SquiggleUnderline — hand-drawn wavy underline that draws itself on
 * scroll into view. Sits beneath the italic phrase ("in touch.") so the
 * heading reads like marker-on-paper editorial copy.
 */
function SquiggleUnderline() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 320 18"
      preserveAspectRatio="none"
      className="pointer-events-none absolute -bottom-2 left-0 h-[12px] w-full md:-bottom-3 md:h-[14px]"
      fill="none"
    >
      {/* Main wavy stroke — gold, draws left-to-right on view. */}
      <motion.path
        d="M 4 12 C 56 4, 118 16, 176 8 S 268 14, 316 6"
        stroke="var(--color-gold)"
        strokeWidth="2.6"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-15% 0%" }}
        transition={{
          pathLength: { duration: 1.3, ease: [0.22, 1, 0.36, 1], delay: 0.45 },
          opacity: { duration: 0.2, delay: 0.45 },
        }}
      />
      {/* Tiny accent flourish — short purple tick that lands after the
          main stroke finishes drawing, like an underline-emphasis dot. */}
      <motion.path
        d="M 312 4 q 6 0 6 6"
        stroke="var(--color-accent)"
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-15% 0%" }}
        transition={{
          pathLength: { duration: 0.5, ease: "easeOut", delay: 1.6 },
          opacity: { duration: 0.2, delay: 1.6 },
        }}
      />
    </svg>
  );
}

/**
 * EnvelopeWithSeal — vintage telegram envelope, wax seal at the centre,
 * decorative cancellation strikes. All SVG, no images.
 */
function EnvelopeWithSeal() {
  const ink = "var(--color-ink-2)";
  const gold = "var(--color-gold)";
  const accent = "var(--color-accent)";
  return (
    <svg
      viewBox="0 0 360 280"
      className="block size-full"
      aria-hidden
      role="presentation"
    >
      <defs>
        <linearGradient id="envFill" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FAF6EC" />
          <stop offset="100%" stopColor="#F4EFE0" />
        </linearGradient>
        <radialGradient id="sealFill" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#5a2a9c" />
          <stop offset="100%" stopColor="#441c7c" />
        </radialGradient>
      </defs>

      {/* Soft shadow under envelope */}
      <ellipse
        cx="180"
        cy="266"
        rx="150"
        ry="6"
        fill="rgba(10,10,10,0.18)"
        opacity="0.4"
      />

      {/* Envelope body */}
      <rect
        x="40"
        y="58"
        width="280"
        height="190"
        rx="10"
        fill="url(#envFill)"
        stroke={ink}
        strokeWidth="1.4"
      />

      {/* Top flap (open, folded back so the seal sits on top) */}
      <path
        d="M 40 70 L 180 162 L 320 70"
        fill="none"
        stroke={ink}
        strokeWidth="1.4"
      />

      {/* Inner letter peeking out — top edge */}
      <line x1="62" y1="86" x2="298" y2="86" stroke={gold} strokeWidth="0.8" opacity="0.55" />
      <line x1="62" y1="98" x2="298" y2="98" stroke={ink} strokeWidth="0.7" opacity="0.35" strokeDasharray="3 3" />

      {/* Decorative postmark cancellation strikes — top-left */}
      <g opacity="0.6">
        <line x1="62" y1="76" x2="98" y2="76" stroke={accent} strokeWidth="0.8" />
        <line x1="62" y1="80" x2="92" y2="80" stroke={accent} strokeWidth="0.8" />
        <line x1="62" y1="84" x2="88" y2="84" stroke={accent} strokeWidth="0.8" />
      </g>

      {/* Postage stamp — top-right corner */}
      <rect
        x="244"
        y="76"
        width="56"
        height="46"
        rx="2"
        fill="#FAF6EC"
        stroke={accent}
        strokeWidth="0.9"
        strokeDasharray="2 2"
      />
      <text
        x="272"
        y="93"
        textAnchor="middle"
        fontFamily="serif"
        fontSize="9"
        fontStyle="italic"
        fill={accent}
        opacity="0.85"
      >
        {contactPage.hero.envelope.stampLine1}
      </text>
      <text
        x="272"
        y="105"
        textAnchor="middle"
        fontFamily="serif"
        fontSize="13"
        fontStyle="italic"
        fill={gold}
      >
        {contactPage.hero.envelope.stampMonogram}
      </text>
      <text
        x="272"
        y="115"
        textAnchor="middle"
        fontFamily="serif"
        fontSize="6"
        fontStyle="italic"
        fill={accent}
        opacity="0.7"
      >
        {contactPage.hero.envelope.stampLine2}
      </text>

      {/* Address lines — centre of envelope */}
      <g>
        <line x1="80" y1="142" x2="240" y2="142" stroke={ink} strokeWidth="0.8" opacity="0.42" />
        <line x1="80" y1="154" x2="220" y2="154" stroke={ink} strokeWidth="0.8" opacity="0.42" />
        <line x1="80" y1="166" x2="200" y2="166" stroke={ink} strokeWidth="0.8" opacity="0.42" />
      </g>

      {/* Wax seal — centre-bottom, sits on top of flap */}
      <g>
        <circle
          cx="180"
          cy="208"
          r="34"
          fill="url(#sealFill)"
          stroke={gold}
          strokeWidth="1.2"
        />
        <circle cx="180" cy="208" r="26" fill="none" stroke={gold} strokeWidth="0.8" opacity="0.65" />
        {/* Spokes radiating outward from the seal */}
        {Array.from({ length: 12 }).map((_, i) => {
          const a = (i * 360) / 12;
          const r1 = 36;
          const r2 = 42;
          const x1 = 180 + r1 * Math.cos((a * Math.PI) / 180);
          const y1 = 208 + r1 * Math.sin((a * Math.PI) / 180);
          const x2 = 180 + r2 * Math.cos((a * Math.PI) / 180);
          const y2 = 208 + r2 * Math.sin((a * Math.PI) / 180);
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke={gold}
              strokeWidth="1"
              strokeLinecap="round"
              opacity="0.85"
            />
          );
        })}
        {/* Centre monogram in the wax */}
        <text
          x="180"
          y="218"
          textAnchor="middle"
          fontFamily="serif"
          fontStyle="italic"
          fontSize="32"
          fill={gold}
          letterSpacing="-2"
        >
          {contactPage.hero.envelope.stampMonogram}
        </text>
      </g>
    </svg>
  );
}

/* ============================================================== */
/*  GET IN TOUCH — channel cards                                  */
/* ============================================================== */

export function GetInTouch() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const smooth = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.4,
    restDelta: 0.0008,
  });
  // Form drifts upward as the section scrolls past — counter-parallax to
  // the static contact list on the left so the two columns feel layered.
  const formY = useTransform(smooth, [0, 1], [60, -60]);

  return (
    <section
      ref={sectionRef}
      id="get-in-touch"
      className="relative overflow-hidden py-24 md:py-28"
    >
      <GetInTouchBackground />

      <div className="container-x relative z-10">
        <motion.header
          variants={revealContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-10% 0%" }}
          className="mb-12 grid max-w-[760px] gap-3.5 md:mb-16 lg:mx-[60px]"
        >
          <motion.span variants={reveal} className="eyebrow">
            {contactPage.getInTouch.eyebrow}
          </motion.span>
          <motion.h2 variants={reveal} className="display-h2">
            {contactPage.getInTouch.headline.split(" ")[0]}{" "}
            <span className="relative inline-block">
              <em>
                {contactPage.getInTouch.headline.split(" ").slice(1).join(" ")}.
              </em>
              <SquiggleUnderline />
            </span>
          </motion.h2>
          <motion.p variants={reveal} className="lede mt-1 max-w-[58ch]">
            {contactPage.getInTouch.lede}
          </motion.p>
        </motion.header>

        {/* Two-column layout: editorial contact list (left) + form (right) */}
        <motion.div
          variants={revealContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-5% 0%" }}
          className="grid gap-12 lg:mx-[60px] lg:grid-cols-[0.95fr_1fr] lg:gap-16"
        >
          {/* ============== LEFT — clean editorial list ============== */}
          <div className="grid gap-9">
            <ContactList />
          </div>

          {/* ============== RIGHT — contact form (parallax) ============== */}
          <motion.div style={{ y: formY }} className="will-change-transform">
            <ContactForm />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/**
 * ContactList — editorial-style stack of the verbatim contact details
 * from the source page. No cards: just dividers, labels, and values
 * organised like a letterhead. Each callable row is a real link.
 */
function ContactList() {
  const rows = contactPage.getInTouch.rows;
  return (
    <div className="grid divide-y divide-line">
      <ContactRow
        label={rows.email}
        value={site.email}
        href={`mailto:${site.email}`}
        icon={<Mail className="size-4" strokeWidth={1.6} />}
      />
      <ContactRow
        label={rows.direct}
        value={site.phone}
        href={`tel:${site.phone.replace(/\s/g, "")}`}
        icon={<Smartphone className="size-4" strokeWidth={1.6} />}
      />
      <ContactRow
        label={rows.office}
        value={site.officePhone}
        href={`tel:${site.officePhone.replace(/[^0-9+]/g, "")}`}
        icon={<Phone className="size-4" strokeWidth={1.6} />}
      />
      <ContactRow
        label={rows.fax}
        value={site.fax}
        icon={<Printer className="size-4" strokeWidth={1.6} />}
      />

      {/* Personal Office Address — verbatim from content.tsx#site.address */}
      <ContactRow
        label={site.address.label ?? rows.office}
        value={site.address.line1}
        sub={`${site.address.city} ${site.address.postal}`}
        tag={site.brokerage}
        icon={<MapPin className="size-4" strokeWidth={1.6} />}
      />

      {/* Second office address — verbatim from content.tsx#site.addressSecondary */}
      <ContactRow
        label={site.addressSecondary.label}
        value={site.addressSecondary.line1}
        sub={`${site.addressSecondary.city}, ${site.addressSecondary.postal}`}
        icon={<MapPin className="size-4" strokeWidth={1.6} />}
      />
    </div>
  );
}

function ContactRow({
  label,
  value,
  sub,
  tag,
  href,
  icon,
}: {
  label: string;
  value: string;
  sub?: string;
  tag?: string;
  href?: string;
  icon: React.ReactNode;
}) {
  const body = (
    <div className="group flex items-start gap-4 py-5 transition-colors duration-300">
      <span className="grid size-9 shrink-0 place-items-center rounded-full border border-line text-[color:var(--color-accent)] transition-all duration-500 group-hover:border-[color:var(--color-accent)] group-hover:bg-[color:var(--color-accent)] group-hover:text-white">
        {icon}
      </span>
      <div className="grid gap-0.5">
        <span className="text-[10.5px] font-medium uppercase tracking-[0.18em] text-ink-3">
          {label}
        </span>
        <span
          className="font-serif font-normal tabular-nums tracking-[-0.012em] text-ink transition-colors duration-300 group-hover:text-accent"
          style={{ fontSize: "clamp(20px, 1.6vw, 24px)", lineHeight: 1.2 }}
        >
          {value}
        </span>
        {sub ? (
          <span className="text-[13px] tracking-[-0.005em] text-ink-2">
            {sub}
          </span>
        ) : null}
        {tag ? (
          <span className="mt-0.5 text-[10.5px] font-medium uppercase tracking-[0.14em] text-ink-3">
            {tag}
          </span>
        ) : null}
      </div>
    </div>
  );
  return (
    <motion.div variants={reveal}>
      {href ? <a href={href}>{body}</a> : body}
    </motion.div>
  );
}

/**
 * ContactForm — premium message form. No backend exists, so on submit it
 * opens the user's email client with the values pre-filled to Ali's
 * inbox via a mailto: link. Honest, working, no fabrication.
 */
function ContactForm() {
  const form = contactPage.getInTouch.form;
  const defaultInterest = form.fields.interest.options[0];
  const [state, setState] = useState({
    name: "",
    email: "",
    phone: "",
    interest: defaultInterest,
    message: "",
  });
  const [sent, setSent] = useState(false);

  function update<K extends keyof typeof state>(
    key: K,
    value: (typeof state)[K],
  ) {
    setState((prev) => ({ ...prev, [key]: value }));
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const subject = `${state.interest} inquiry from ${state.name || "a website visitor"}`;
    const lines = [
      `Name: ${state.name}`,
      `Email: ${state.email}`,
      state.phone ? `Phone: ${state.phone}` : null,
      `Interest: ${state.interest}`,
      "",
      "Message:",
      state.message,
    ].filter(Boolean) as string[];
    const body = lines.join("\n");
    // Open the visitor's mail client pre-filled to Ali's inbox.
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  return (
    <motion.div
      variants={reveal}
      className="relative overflow-hidden rounded-[24px] border border-line-strong bg-bg-elev/85 p-7 shadow-[0_30px_70px_-22px_rgba(68,28,124,0.22)] backdrop-blur-md md:p-9"
    >
      {/* Inner ambient mesh */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-55"
        style={{
          background:
            "radial-gradient(circle at 82% 14%, var(--color-accent-soft) 0%, transparent 55%), radial-gradient(circle at 14% 86%, var(--color-gold-soft) 0%, transparent 55%)",
        }}
      />

      {/* Form heading — copy in content.tsx */}
      <header className="mb-7 grid gap-2">
        <span className="text-[10.5px] font-medium uppercase tracking-[0.2em] text-ink-3">
          {form.eyebrow}
        </span>
        <h3
          className="font-serif font-normal tracking-[-0.022em] text-ink"
          style={{ fontSize: "clamp(26px, 2.4vw, 36px)", lineHeight: 1.1 }}
        >
          {form.headline.lead}{" "}
          <em className="text-accent">{form.headline.emphasis}</em>
        </h3>
      </header>

      {sent ? (
        <ThankYou
          onReset={() => {
            setSent(false);
            setState({
              name: "",
              email: "",
              phone: "",
              interest: defaultInterest,
              message: "",
            });
          }}
        />
      ) : (
        <form
          onSubmit={handleSubmit}
          action={`mailto:${site.email}`}
          method="post"
          className="grid gap-5"
        >
          <div className="grid gap-5 md:grid-cols-2">
            <Field
              label={form.fields.name.label}
              required
              type="text"
              name="name"
              value={state.name}
              onChange={(v) => update("name", v)}
              placeholder={form.fields.name.placeholder}
            />
            <Field
              label={form.fields.email.label}
              required
              type="email"
              name="email"
              value={state.email}
              onChange={(v) => update("email", v)}
              placeholder={form.fields.email.placeholder}
            />
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <Field
              label={form.fields.phone.label}
              type="tel"
              name="phone"
              value={state.phone}
              onChange={(v) => update("phone", v)}
              placeholder={form.fields.phone.placeholder}
            />
            <SelectField
              label={form.fields.interest.label}
              name="interest"
              value={state.interest}
              onChange={(v) => update("interest", v)}
              options={[...form.fields.interest.options]}
            />
          </div>

          <TextareaField
            label={form.fields.message.label}
            required
            name="message"
            value={state.message}
            onChange={(v) => update("message", v)}
            placeholder={form.fields.message.placeholder}
          />

          {/* Submit + privacy strip */}
          <div className="mt-2 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <p className="text-[11.5px] leading-[1.5] text-ink-3 md:max-w-[34ch]">
              {form.privacyTemplate.split("{email}")[0]}
              <span className="font-medium text-ink-2">{site.email}</span>
              {form.privacyTemplate.split("{email}")[1]}
            </p>
            <button
              type="submit"
              className="btn btn-primary px-7 py-3.5 text-[15px]"
            >
              {form.submitLabel} <span className="arrow">→</span>
            </button>
          </div>
        </form>
      )}

      {/* Top hairline */}
      <span
        aria-hidden
        className="pointer-events-none absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-[color:var(--color-gold)] to-transparent opacity-60"
      />
    </motion.div>
  );
}

function ThankYou({ onReset }: { onReset: () => void }) {
  const t = contactPage.getInTouch.form.thankYou;
  return (
    <div className="grid gap-5 py-4">
      <div className="grid size-12 place-items-center rounded-full border border-[color:var(--color-accent)]/40 bg-[color:var(--color-accent-soft)] text-[color:var(--color-accent)]">
        <Check className="size-5" strokeWidth={2} />
      </div>
      <h4
        className="font-serif font-normal tracking-[-0.022em] text-ink"
        style={{ fontSize: "clamp(22px, 2vw, 28px)", lineHeight: 1.15 }}
      >
        {t.title}
      </h4>
      <p className="max-w-[44ch] text-[15px] leading-[1.6] text-ink-2">
        {t.body}
      </p>
      <button
        type="button"
        onClick={onReset}
        className="self-start text-[12.5px] font-medium uppercase tracking-[0.14em] text-ink-2 underline-offset-4 transition-colors duration-300 hover:text-accent hover:underline"
      >
        {t.reset}
      </button>
    </div>
  );
}

function Field({
  label,
  required,
  type,
  name,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  required?: boolean;
  type: "text" | "email" | "tel";
  name: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
}) {
  return (
    <label className="grid gap-2">
      <span className="flex items-center gap-1.5 text-[10.5px] font-medium uppercase tracking-[0.18em] text-ink-3">
        {label}
        {required ? (
          <span aria-hidden className="text-[color:var(--color-accent)]">
            *
          </span>
        ) : null}
      </span>
      <input
        type={type}
        name={name}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="rounded-[12px] border border-line bg-bg-warm/60 px-4 py-3 font-serif text-[15.5px] tracking-[-0.005em] text-ink placeholder:font-sans placeholder:text-[14px] placeholder:tracking-[-0.005em] placeholder:text-ink-3 transition-all duration-300 hover:border-line-strong focus:border-[color:var(--color-accent)] focus:outline-none focus:ring-2 focus:ring-[color:var(--color-accent)]/15"
      />
    </label>
  );
}

function SelectField({
  label,
  name,
  value,
  onChange,
  options,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <label className="grid gap-2">
      <span className="text-[10.5px] font-medium uppercase tracking-[0.18em] text-ink-3">
        {label}
      </span>
      <div className="relative">
        <select
          name={name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none rounded-[12px] border border-line bg-bg-warm/60 px-4 py-3 pr-10 font-serif text-[15.5px] tracking-[-0.005em] text-ink transition-all duration-300 hover:border-line-strong focus:border-[color:var(--color-accent)] focus:outline-none focus:ring-2 focus:ring-[color:var(--color-accent)]/15"
        >
          {options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
        <span
          aria-hidden
          className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 font-serif text-[12px] text-ink-3"
        >
          ▾
        </span>
      </div>
    </label>
  );
}

function TextareaField({
  label,
  required,
  name,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  required?: boolean;
  name: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
}) {
  return (
    <label className="grid gap-2">
      <span className="flex items-center gap-1.5 text-[10.5px] font-medium uppercase tracking-[0.18em] text-ink-3">
        {label}
        {required ? (
          <span aria-hidden className="text-[color:var(--color-accent)]">
            *
          </span>
        ) : null}
      </span>
      <textarea
        name={name}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={5}
        className="rounded-[12px] border border-line bg-bg-warm/60 px-4 py-3 font-serif text-[15.5px] leading-[1.55] tracking-[-0.005em] text-ink placeholder:font-sans placeholder:text-[14px] placeholder:tracking-[-0.005em] placeholder:text-ink-3 transition-all duration-300 hover:border-line-strong focus:border-[color:var(--color-accent)] focus:outline-none focus:ring-2 focus:ring-[color:var(--color-accent)]/15"
      />
    </label>
  );
}

/* ============================================================== */
/*  CLOSING CTA                                                   */
/* ============================================================== */

export function ContactClosing() {
  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      <div
        aria-hidden
        className="absolute inset-0 z-0"
        style={{
          background:
            "linear-gradient(170deg, #0F0B1A 0%, #1A0F2E 50%, #0F0B1A 100%)",
        }}
      />
      <div
        aria-hidden
        className="absolute -inset-1/4 z-0 opacity-[0.18]"
        style={{
          background:
            "conic-gradient(from 90deg at 50% 50%, transparent 0%, rgba(184,148,90,0.4) 22%, transparent 45%, rgba(90,42,156,0.4) 68%, transparent 90%)",
          animation: "spin-slow 110s linear infinite",
          filter: "blur(60px)",
        }}
      />

      <div className="container-x relative z-10">
        <motion.div
          variants={revealContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-10% 0%" }}
          className="grid items-center gap-8 lg:mx-[60px] lg:grid-cols-[1.2fr_0.8fr]"
        >
          <div className="grid gap-4">
            <motion.span
              variants={reveal}
              className="text-[10.5px] font-medium uppercase tracking-[0.22em] text-white/60"
            >
              {contactPage.closing.eyebrow}
            </motion.span>
            <motion.h2
              variants={reveal}
              className="font-serif font-normal leading-[1.02] tracking-[-0.025em] text-white"
              style={{ fontSize: "clamp(36px, 5vw, 64px)" }}
            >
              {contactPage.closing.headline.lead}{" "}
              <em className="text-[color:var(--color-gold)]">
                {contactPage.closing.headline.emphasis}
              </em>
            </motion.h2>
            <motion.p
              variants={reveal}
              className="max-w-[58ch] text-[16px] leading-[1.6] text-white/75 md:text-[17px]"
            >
              {contactPage.closing.body}
            </motion.p>
          </div>

          <motion.div
            variants={reveal}
            className="flex flex-col gap-3 lg:items-end"
          >
            <a
              href={`tel:${site.phone.replace(/\s/g, "")}`}
              className="inline-flex items-center gap-3 rounded-full border border-white/30 bg-white/8 px-7 py-4 font-serif text-[20px] tabular-nums tracking-[-0.015em] text-white backdrop-blur-sm transition-all duration-500 hover:border-[color:var(--color-gold)] hover:bg-white/12 md:text-[22px]"
            >
              <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/60">
                {contactPage.closing.primaryLabel}
              </span>
              {site.phone}
              <ArrowUpRight
                className="size-4 text-[color:var(--color-gold)]"
                strokeWidth={1.75}
              />
            </a>
            <a
              href={`mailto:${site.email}`}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-transparent px-5 py-3 text-[13px] tracking-[-0.005em] text-white/80 transition-colors duration-300 hover:text-white"
            >
              {site.email}
              <ArrowUpRight className="size-3.5" strokeWidth={1.75} />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ============================================================== */
/*  BACKGROUNDS / DECORATIONS                                     */
/* ============================================================== */

/**
 * RuledPaper — horizontal rule lines reading like a stationery sheet.
 * Visually distinct from About's dot grid and Listings' blueprint grid.
 */
function RuledPaper() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-[1] opacity-[0.16]"
      style={{
        backgroundImage:
          "repeating-linear-gradient(0deg, transparent 0 31px, rgba(68,28,124,0.4) 31px 32px), linear-gradient(0deg, rgba(184,148,90,0.5) 1px, transparent 1px)",
        backgroundSize: "100% 32px, 100% 256px",
        maskImage:
          "radial-gradient(ellipse at 30% 50%, black 0%, transparent 75%)",
        WebkitMaskImage:
          "radial-gradient(ellipse at 30% 50%, black 0%, transparent 75%)",
      }}
    />
  );
}

function ContactHeroBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(168deg, #FAFAF7 0%, #F4EFE0 30%, #ECE7F2 70%, #DCD3EC 100%)",
        }}
      />
      <div
        className="absolute -inset-1/4 opacity-[0.18]"
        style={{
          background:
            "conic-gradient(from 320deg at 50% 50%, transparent 0%, var(--color-gold-soft) 22%, transparent 45%, rgba(90,42,156,0.42) 68%, transparent 90%, var(--color-gold-soft) 100%)",
          animation: "spin-slow 110s linear infinite",
          filter: "blur(60px)",
        }}
      />
      <div
        className="absolute -right-24 -top-32 size-[520px] rounded-full opacity-50 blur-[110px]"
        style={{
          background:
            "radial-gradient(circle, rgba(90,42,156,0.32) 0%, transparent 70%)",
          animation: "mesh-1 30s var(--ease-soft) infinite",
        }}
      />
      <div
        className="absolute -left-32 bottom-0 size-[480px] rounded-full opacity-45 blur-[110px]"
        style={{
          background:
            "radial-gradient(circle, var(--color-gold-soft) 0%, transparent 70%)",
          animation: "mesh-2 32s var(--ease-soft) infinite",
        }}
      />
    </div>
  );
}

function GetInTouchBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(168deg, #FAF6EC 0%, #F4EFE0 40%, #ECE7F2 100%)",
        }}
      />
      <div
        className="absolute -right-24 top-1/3 size-[440px] rounded-full opacity-40 blur-[110px]"
        style={{
          background:
            "radial-gradient(circle, rgba(90,42,156,0.28) 0%, transparent 70%)",
          animation: "mesh-1 32s var(--ease-soft) infinite",
        }}
      />
      <div
        className="absolute -left-24 bottom-0 size-[460px] rounded-full opacity-45 blur-[110px]"
        style={{
          background:
            "radial-gradient(circle, var(--color-gold-soft) 0%, transparent 70%)",
          animation: "mesh-2 30s var(--ease-soft) infinite",
        }}
      />
    </div>
  );
}
