import { ABOUT } from "@/lib/data/homeBottom";

export default function AboutSection() {
  return (
    <section
      aria-labelledby="about-sbs-heading"
      className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm"
    >
      <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-primary">
        {ABOUT.eyebrow}
      </p>
      <h2
        id="about-sbs-heading"
        className="font-display mb-3 text-xl font-black leading-tight text-gray-900 sm:text-2xl"
      >
        {ABOUT.heading}
      </h2>

      <p className="text-sm leading-relaxed text-gray-600">{ABOUT.intro}</p>

      {/* Native <details>/<summary> — progressive enhancement, no client JS. */}
      <details className="group mt-3">
        <summary className="flex list-none cursor-pointer items-center gap-1 text-sm font-semibold text-primary hover:text-primarydark [&::-webkit-details-marker]:hidden">
          <span className="group-open:hidden">Read more ▾</span>
          <span className="hidden group-open:inline">Show less ▴</span>
        </summary>
        <div className="mt-3 space-y-3">
          {ABOUT.more.map((para, i) => (
            <p key={i} className="text-sm leading-relaxed text-gray-600">
              {para}
            </p>
          ))}
        </div>
      </details>

      <div className="mt-5 grid grid-cols-2 gap-3 border-t border-gray-100 pt-5 sm:grid-cols-4">
        {ABOUT.stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-lg bg-gray-50/70 p-3 text-center"
          >
            <div className="font-display text-lg font-black text-gray-900">
              {stat.value}
            </div>
            <div className="mt-0.5 text-xs text-gray-500">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}