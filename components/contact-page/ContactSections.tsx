"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { contactPage, site } from "@/content";

/**
 * /contact — calm broker-professional sections. Verbatim copy from
 * content.tsx#contactPage. Form opens user's mail client (mailto:).
 */

export function ContactPageHero() {
  const h = contactPage.hero;
  return (
    <section className="bg-bg pt-[120px] md:pt-[150px] pb-20 md:pb-28">
      <div className="container-x">
        <div className="max-w-3xl fade-up">
          <div className="text-[11px] uppercase tracking-[0.22em] text-ink-3">
            {h.letterhead.label}
          </div>
          <div className="mt-2 text-[14px] text-ink-2">
            {h.letterhead.person}
            <span aria-hidden className="mx-2 text-ink-3">·</span>
            <span className="text-ink-3">{h.letterhead.brokerage}</span>
          </div>

          <h1 className="display-h1 mt-8">{h.headline}</h1>
          <span className="rule mt-6" />
          <p className="lede mt-8">{h.lede}</p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Link href="#message" className="btn btn-primary">
              {h.primaryCta.label}
            </Link>
            <Link href={`tel:${site.phone}`} className="btn btn-ghost">
              {h.secondaryCta.label}
            </Link>
          </div>
        </div>

        <dl className="mt-16 grid grid-cols-2 gap-x-10 gap-y-6 border-t border-line pt-8 text-[13px] md:grid-cols-4">
          <div>
            <dt className="text-[11px] uppercase tracking-[0.18em] text-ink-3">
              {h.pills.direct}
            </dt>
            <dd className="mono mt-1 text-ink-2">
              <a href={`tel:${site.phone}`} className="hover:text-accent">
                {site.phone}
              </a>
            </dd>
          </div>
          <div>
            <dt className="text-[11px] uppercase tracking-[0.18em] text-ink-3">
              {h.pills.email}
            </dt>
            <dd className="mt-1 text-ink-2 break-all">
              <a href={`mailto:${site.email}`} className="hover:text-accent">
                {site.email}
              </a>
            </dd>
          </div>
          <div>
            <dt className="text-[11px] uppercase tracking-[0.18em] text-ink-3">
              {h.pills.office}
            </dt>
            <dd className="mt-1 text-ink-2">{h.pills.officeValue}</dd>
          </div>
          <div>
            <dt className="text-[11px] uppercase tracking-[0.18em] text-ink-3">
              {h.replyCard.label}
            </dt>
            <dd className="mt-1 text-ink-2">{h.replyCard.value}</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}

export function GetInTouch() {
  const g = contactPage.getInTouch;
  const f = g.form;
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") ?? "");
    const email = String(fd.get("email") ?? "");
    const phone = String(fd.get("phone") ?? "");
    const interest = String(fd.get("interest") ?? "");
    const message = String(fd.get("message") ?? "");

    const subject = encodeURIComponent(`Enquiry from ${name || "the website"}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nInterest: ${interest}\n\n${message}`,
    );
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
    setSent(true);
  }

  return (
    <section id="message" className="bg-bg-muted py-24 md:py-32">
      <div className="container-x">
        <div className="grid gap-16 md:grid-cols-12 md:gap-20">
          {/* Channels */}
          <div className="md:col-span-5">
            <span className="eyebrow">{g.eyebrow}</span>
            <h2 className="display-h2 mt-4">{g.headline}</h2>
            <span className="rule mt-6" />
            <p className="lede mt-6">{g.lede}</p>

            <dl className="mt-10 space-y-6 border-t border-line pt-8 text-[14px]">
              {[
                { k: g.rows.email, v: site.email, href: `mailto:${site.email}` },
                { k: g.rows.direct, v: site.phone, href: `tel:${site.phone}` },
                { k: g.rows.office, v: site.officePhone, href: `tel:${site.officePhone}` },
                { k: g.rows.fax, v: site.fax },
              ].map((row) => (
                <div key={row.k} className="grid grid-cols-3 gap-4">
                  <dt className="text-[11px] uppercase tracking-[0.18em] text-ink-3">
                    {row.k}
                  </dt>
                  <dd className="col-span-2 mono text-ink-2">
                    {row.href ? (
                      <a href={row.href} className="hover:text-accent">
                        {row.v}
                      </a>
                    ) : (
                      row.v
                    )}
                  </dd>
                </div>
              ))}
            </dl>

            <address className="mt-10 border-t border-line pt-8 not-italic text-[14px] leading-relaxed text-ink-2">
              <div className="text-[11px] uppercase tracking-[0.18em] text-ink-3">
                {site.address.label}
              </div>
              <div className="mt-2">
                {site.address.line1}
                <br />
                {site.address.city} {site.address.postal}
              </div>
            </address>
          </div>

          {/* Form */}
          <div className="md:col-span-7">
            <div className="rounded-md border border-line bg-bg-elev p-8 md:p-10">
              <span className="eyebrow">{f.eyebrow}</span>
              <h3 className="display-h3 mt-3">
                {f.headline.lead}{" "}
                <em className="text-ink-3">{f.headline.emphasis}</em>
              </h3>
              <span className="rule mt-5" />

              {sent ? (
                <div className="mt-8">
                  <h4 className="font-serif text-2xl text-ink">{f.thankYou.title}</h4>
                  <p className="mt-4 text-[15px] leading-relaxed text-ink-2">
                    {f.thankYou.body}
                  </p>
                  <button
                    type="button"
                    className="mt-6 inline-flex items-center gap-2 text-[12.5px] uppercase tracking-[0.16em] text-accent hover:text-accent-2"
                    onClick={() => setSent(false)}
                  >
                    {f.thankYou.reset}
                  </button>
                </div>
              ) : (
                <form className="mt-8 grid gap-5" onSubmit={onSubmit}>
                  <Field name="name" label={f.fields.name.label} placeholder={f.fields.name.placeholder} required />
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field type="email" name="email" label={f.fields.email.label} placeholder={f.fields.email.placeholder} required />
                    <Field type="tel" name="phone" label={f.fields.phone.label} placeholder={f.fields.phone.placeholder} />
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="interest" className="text-[11px] uppercase tracking-[0.18em] text-ink-3">
                      {f.fields.interest.label}
                    </label>
                    <select
                      id="interest"
                      name="interest"
                      className="rounded-sm border border-line-strong bg-bg-elev px-3 py-3 text-[15px] text-ink-2 focus:border-accent focus:outline-none"
                    >
                      {f.fields.interest.options.map((opt) => (
                        <option key={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="message" className="text-[11px] uppercase tracking-[0.18em] text-ink-3">
                      {f.fields.message.label}
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      placeholder={f.fields.message.placeholder}
                      className="rounded-sm border border-line-strong bg-bg-elev px-3 py-3 text-[15px] text-ink-2 focus:border-accent focus:outline-none"
                      required
                    />
                  </div>
                  <p className="text-[12px] text-ink-3">
                    {f.privacyTemplate.replace("{email}", site.email)}
                  </p>
                  <button type="submit" className="btn btn-primary mt-2 w-fit">
                    {f.submitLabel}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  name,
  label,
  placeholder,
  type = "text",
  required = false,
}: {
  name: string;
  label: string;
  placeholder: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div className="grid gap-2">
      <label htmlFor={name} className="text-[11px] uppercase tracking-[0.18em] text-ink-3">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        className="rounded-sm border border-line-strong bg-bg-elev px-3 py-3 text-[15px] text-ink-2 focus:border-accent focus:outline-none"
      />
    </div>
  );
}

export function ContactClosing() {
  const c = contactPage.closing;
  return (
    <section className="bg-accent py-24 text-bg md:py-32">
      <div className="container-x">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-bg/70">
            <span className="h-px w-8 bg-[color:var(--color-gold)]" />
            {c.eyebrow}
          </span>
          <h2 className="display-h2 mt-6 text-bg">
            {c.headline.lead} <em>{c.headline.emphasis}</em>
          </h2>
          <p className="mt-6 text-[17px] leading-relaxed text-bg/85">{c.body}</p>
          <div className="mt-10">
            <a
              href={`tel:${site.phone}`}
              className="btn"
              style={{ background: "var(--color-bg)", color: "var(--color-accent)" }}
            >
              {c.primaryLabel} · {site.phone}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
