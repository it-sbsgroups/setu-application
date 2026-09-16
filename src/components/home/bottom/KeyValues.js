import { KEY_VALUES } from "@/lib/data/homeBottom";

export default function KeyValues() {
  return (
    <section
      aria-labelledby="key-values-heading"
      className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm sm:p-5"
    >
      <div className="mb-4">
        <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-primary sm:text-xs">
          TRUSTED BY INDUSTRIES LEADERS
        </p>
        <h2
          id="key-values-heading"
          className="font-display text-lg font-black text-gray-900 sm:text-xl md:text-2xl"
        >
          Why Industries Choose Us
        </h2>
        <p className="mt-1 text-xs text-gray-500 sm:text-sm">
          Everything your procurement team needs — verified brands, project pricing, and delivery to MIDC, SEZ, and industrial estates.
        </p>
      </div>

      <ul className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 sm:gap-3 lg:grid-cols-3">
        {KEY_VALUES.map((value) => (
          <li
            key={value.title}
            className="flex gap-3 rounded-lg border border-gray-100 p-3 transition-colors hover:border-primary/30"
          >
            <span
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-orange-50 text-xl"
              aria-hidden="true"
            >
              {value.icon}
            </span>
            <div className="min-w-0">
              <h3 className="text-sm font-semibold text-gray-800">
                {value.title}
              </h3>
              <p className="mt-0.5 text-xs leading-relaxed text-gray-500">
                {value.desc}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}