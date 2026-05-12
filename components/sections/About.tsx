import { about, aboutPage } from "@/content";

/**
 * About — merged Mission + About + key stats. Editorial split, calm.
 * Left: portrait. Right: section eyebrow, headline, two paragraphs
 * (bio + mission verbatim), credentials chips, key numbers.
 */
export function About() {
  return (
    <section id="about" className="bg-bg py-24 md:py-32">
      <div className="container-x">
        <div className="grid gap-12 md:gap-20 md:grid-cols-12 md:items-center">
          {/* Portrait */}
          <div className="md:col-span-5">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-md bg-bg-muted">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={about.portrait}
                alt={about.name}
                className="absolute inset-0 size-full object-cover"
                loading="lazy"
                width={800}
                height={1000}
              />
            </div>
          </div>

          {/* Copy */}
          <div className="md:col-span-7">
            <span className="eyebrow">About</span>
            <h2 className="display-h2 mt-4">
              A reliable and trusted advisor — over a decade in
              the Greater Toronto Area.
            </h2>
            <span className="rule mt-6" />

            {/* Bio + mission, both verbatim from content.tsx */}
            <p className="lede mt-8">{about.bio}</p>
            <p className="lede mt-5">{about.mission}</p>

            {/* Credentials chips */}
            <ul className="mt-10 flex flex-wrap gap-2">
              {about.credentials.map((c) => (
                <li
                  key={c}
                  className="rounded-sm border border-line-strong px-3 py-1.5 text-[12px] uppercase tracking-[0.14em] text-ink-2"
                >
                  {c}
                </li>
              ))}
            </ul>

            {/* Key stats — real values from aboutPage.stats */}
            <dl className="mt-12 grid grid-cols-3 gap-6 border-t border-line pt-8">
              {aboutPage.stats.map((s) => (
                <div key={s.label}>
                  <dt className="text-[11px] uppercase tracking-[0.18em] text-ink-3">
                    {s.label}
                  </dt>
                  <dd className="mono mt-2 font-serif text-4xl text-ink md:text-5xl">
                    {s.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
