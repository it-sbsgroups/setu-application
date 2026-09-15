import Link from "next/link";
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from "@/lib/seo";
import PageHero from "@/components/pages/PageHero";
import {
  ABOUT_STATS,
  ABOUT_VALUES,
  ABOUT_MILESTONES,
} from "@/lib/data/company";

export const metadata = {
  title: "About Us",
  description: `Learn about ${SITE_NAME} — India's trusted B2B marketplace for industrial, safety and engineering supplies.`,
  alternates: { canonical: "/about" },
  openGraph: { type: "website", url: `${SITE_URL}/about` },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="ABOUT US"
        title={`Building India's Most Trusted B2B Marketplace`}
        subtitle={SITE_DESCRIPTION}
        breadcrumbs={[{ label: "About Us" }]}
      />

      {/* Stats strip */}
      <section className="border-b border-gray-100 bg-white">
        <div className="mx-auto grid max-w-screen-2xl grid-cols-2 gap-4 px-4 py-8 sm:grid-cols-4">
          {ABOUT_STATS.map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-display text-2xl font-black text-gray-900 sm:text-3xl">
                {s.value}
              </div>
              <div className="mt-1 text-xs text-gray-500">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      <div className="mx-auto max-w-screen-2xl space-y-12 px-4 py-12">
        {/* Story */}
        <section className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-start">
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-primary">
              Our Story
            </p>
            <h2 className="font-display mb-4 text-2xl font-black text-gray-900 sm:text-3xl">
              From a small idea to India's industrial backbone
            </h2>
            <div className="space-y-4 text-sm leading-relaxed text-gray-600">
              <p>
                {SITE_NAME} began in 2014 with a simple observation: procuring
                industrial supplies in India was slow, opaque, and riddled with
                middlemen. Contractors, factories, and MSMEs deserved the same
                seamless buying experience that consumers had begun to expect
                from e-commerce.
              </p>
              <p>
                A decade later, we serve over 50,000 businesses across 19,000+
                pin codes with a catalogue of 10 lakh+ SKUs — spanning power
                tools, safety PPE, electrical, plumbing, fasteners, welding,
                abrasives, material handling, and IT & office supplies. Every
                product is sourced from verified sellers, backed by GST
                invoicing, and dispatched with speed you can plan around.
              </p>
              <p>
                We operate on a replacement-only model: if a wrong or damaged
                item reaches you, we replace it free of cost and take instant
                action against the responsible vendor. Our tele-caller team
                supports customers before and after warranty, every working day
                from 10 AM to 6 PM.
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
            <h3 className="font-display mb-4 text-base font-bold text-gray-900">
              Milestones
            </h3>
            <ol className="relative space-y-5 border-l border-gray-200 pl-5">
              {ABOUT_MILESTONES.map((m) => (
                <li key={m.year} className="relative">
                  <span className="absolute -left-[26px] top-1 h-3 w-3 rounded-full border-2 border-primary bg-white" />
                  <div className="text-xs font-bold uppercase tracking-wider text-primary">
                    {m.year}
                  </div>
                  <div className="font-display text-sm font-bold text-gray-900">
                    {m.title}
                  </div>
                  <p className="mt-1 text-xs leading-relaxed text-gray-500">
                    {m.desc}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Values */}
        <section>
          <div className="mb-6 text-center">
            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-primary">
              What We Stand For
            </p>
            <h2 className="font-display text-2xl font-black text-gray-900 sm:text-3xl">
              Our Core Values
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {ABOUT_VALUES.map((v) => (
              <div
                key={v.title}
                className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm transition-colors hover:border-primary/30"
              >
                <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-lg bg-orange-50 text-2xl">
                  {v.icon}
                </div>
                <h3 className="font-display mb-1 text-sm font-bold text-gray-900">
                  {v.title}
                </h3>
                <p className="text-xs leading-relaxed text-gray-500">
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="rounded-2xl bg-gradient-to-br from-navy to-navylight p-8 text-center sm:p-12">
          <h2 className="font-display mb-3 text-2xl font-black text-white sm:text-3xl">
            Ready to transform your procurement?
          </h2>
          <p className="mx-auto mb-6 max-w-xl text-sm text-gray-300">
            Join 50,000+ businesses buying smarter, faster, and more reliably
            from SbS.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/categories"
              className="rounded-lg bg-primary px-6 py-2.5 text-sm font-bold text-white hover:bg-primarydark"
            >
              Browse Categories
            </Link>
            <Link
              href="/contact"
              className="rounded-lg border border-white/20 bg-white/10 px-6 py-2.5 text-sm font-bold text-white backdrop-blur-sm hover:bg-white/20"
            >
              Talk to Our Team
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}