import { process as steps, processIntro } from "@/content";

/**
 * Process — three numbered steps in a calm horizontal row.
 * Source has three "Simple steps"; we render them with restraint:
 * tabular number, title, short body, hairline divider. No animation.
 */
export function Process() {
  return (
    <section id="process" className="bg-bg py-24 md:py-32">
      <div className="container-x">
        <div className="mb-14 md:mb-20 md:grid md:grid-cols-12 md:items-end md:gap-12">
          <div className="md:col-span-7">
            <span className="eyebrow">The process</span>
            <h2 className="display-h2 mt-4">
              Simple steps, from first viewing to{" "}
              <em>keys in hand.</em>
            </h2>
            <span className="rule mt-6" />
          </div>
          <p className="lede mt-6 md:col-span-5 md:mt-0">
            {processIntro.lede}
          </p>
        </div>

        <ol className="grid gap-px overflow-hidden rounded-md border border-line-strong bg-line-strong md:grid-cols-3">
          {steps.map((s) => (
            <li key={s.step} className="bg-bg-elev p-8 md:p-10">
              <div className="mono font-serif text-4xl text-[color:var(--color-gold)] md:text-5xl">
                {s.step}
              </div>
              <h3 className="mt-6 font-serif text-[22px] leading-tight text-ink">
                {s.title}
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-ink-2">
                {s.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
