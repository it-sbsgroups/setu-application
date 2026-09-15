import { SITE_URL, SITE_NAME } from "@/lib/seo";
import PageHero from "@/components/pages/PageHero";
import {
  SUSTAINABILITY_PILLARS,
  SUSTAINABILITY_INITIATIVES,
  SUSTAINABILITY_PROGRESS,
} from "@/lib/data/company";

export const metadata = {
  title: "Sustainability",
  description: `${SITE_NAME}'s commitment to environmental, social and governance responsibility.`,
  alternates: { canonical: "/sustainability" },
  openGraph: { type: "website", url: `${SITE_URL}/sustainability` },
};

export default function SustainabilityPage() {
  return (
    <>
      <PageHero
        eyebrow="SUSTAINABILITY"
        title="Responsible Commerce, Built to Last"
        subtitle="We're committed to running a carbon-neutral, ethically sourced, and transparently governed supply chain by 2028."
        breadcrumbs={[{ label: "Sustainability" }]}
      />

      <div className="mx-auto max-w-screen-2xl space-y-12 px-4 py-12">
        {/* Pillars */}
        <section>
          <div className="mb-6 text-center">
            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-primary">
              Our Approach
            </p>
            <h2 className="font-display text-2xl font-black text-gray-900 sm:text-3xl">
              Three pillars of sustainability
            </h2>
          </div>
          <div className="grid gap-4 lg:grid-cols-3">
            {SUSTAINABILITY_PILLARS.map((p) => (
              <div
                key={p.title}
                className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-orange-50 text-2xl">
                  {p.icon}
                </div>
                <h3 className="font-display mb-2 text-lg font-bold text-gray-900">
                  {p.title}
                </h3>
                <p className="text-sm leading-relaxed text-gray-600">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Progress */}
        <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="font-display mb-6 text-2xl font-black text-gray-900">
            2028 Progress Tracker
          </h2>
          <div className="space-y-5">
            {SUSTAINABILITY_PROGRESS.map((p) => (
              <div key={p.label}>
                <div className="mb-2 flex items-center justify-between text-xs">
                  <span className="font-semibold text-gray-700">
                    {p.label}
                  </span>
                  <span className="font-bold text-gray-900">{p.value}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                  <div
                    className="h-full rounded-full bg-primary"
                    style={{ width: `${p.value}%` }}
                    role="progressbar"
                    aria-valuenow={p.value}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Initiatives */}
        <section>
          <h2 className="font-display mb-6 text-2xl font-black text-gray-900">
            What we&apos;re doing today
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SUSTAINABILITY_INITIATIVES.map((i) => (
              <div
                key={i.title}
                className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm"
              >
                <h3 className="font-display mb-2 text-sm font-bold text-gray-900">
                  {i.title}
                </h3>
                <p className="text-xs leading-relaxed text-gray-500">
                  {i.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Report CTA */}
        <section className="rounded-2xl bg-gradient-to-br from-navy to-navylight p-8 text-center sm:p-12">
          <h2 className="font-display mb-3 text-2xl font-black text-white sm:text-3xl">
            Read our 2026 Impact Report
          </h2>
          <p className="mx-auto mb-6 max-w-xl text-sm text-gray-300">
            Full transparency on emissions, audits, and vendor compliance.
          </p>
          <a
            href="mailto:sustainability@sbsindustrial.in?subject=Impact Report Request"
            className="rounded-lg bg-primary px-6 py-2.5 text-sm font-bold text-white hover:bg-primarydark"
          >
            Request Report
          </a>
        </section>
      </div>
    </>
  );
}