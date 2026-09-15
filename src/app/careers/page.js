import { SITE_URL, SITE_NAME } from "@/lib/seo";
import PageHero from "@/components/pages/PageHero";
import { CAREERS_BENEFITS, CAREERS_OPENINGS } from "@/lib/data/company";

export const metadata = {
  title: "Careers",
  description: `Join ${SITE_NAME} and help build India's most trusted B2B industrial marketplace.`,
  alternates: { canonical: "/careers" },
  openGraph: { type: "website", url: `${SITE_URL}/careers` },
};

export default function CareersPage() {
  return (
    <>
      <PageHero
        eyebrow="CAREERS"
        title="Build the backbone of Indian industry"
        subtitle={`We're a team of engineers, category experts, and operators working to make industrial procurement radically simpler. Come build it with us.`}
        breadcrumbs={[{ label: "Careers" }]}
      />

      <div className="mx-auto max-w-screen-2xl space-y-12 px-4 py-12">
        {/* Benefits */}
        <section>
          <div className="mb-6 text-center">
            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-primary">Why {SITE_NAME}</p>
            <h2 className="font-display text-2xl font-black text-gray-900 sm:text-3xl">Life at {SITE_NAME}</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {CAREERS_BENEFITS.map((b) => (
              <div key={b.title} className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-orange-50 text-2xl">{b.icon}</div>
                <h3 className="font-display mb-2 text-lg font-bold text-gray-900">{b.title}</h3>
                <p className="text-sm leading-relaxed text-gray-600">{b.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Open roles */}
        <section>
          <h2 className="font-display mb-6 text-2xl font-black text-gray-900">Open Positions</h2>
          <div className="divide-y divide-gray-100 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
            {CAREERS_OPENINGS.map((role) => (
              <div key={role.id} className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
                <div>
                  <h3 className="font-display text-base font-bold text-gray-900">{role.title}</h3>
                  <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-500">
                    <span className="rounded-full bg-orange-50 px-2 py-0.5 font-semibold text-primary">{role.team}</span>
                    <span>📍 {role.location}</span>
                    <span>🕐 {role.type}</span>
                  </div>
                </div>
                <a
                  href={`mailto:careers@sbsindustrial.in?subject=Application: ${role.title} (${role.id})`}
                  className="shrink-0 rounded-lg border border-gray-200 px-5 py-2 text-center text-sm font-bold text-gray-700 transition-colors hover:border-primary hover:text-primary"
                >
                  Apply Now
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* CTA for roles not listed */}
        <section className="rounded-2xl bg-gradient-to-br from-navy to-navylight p-8 text-center sm:p-12">
          <h2 className="font-display mb-3 text-2xl font-black text-white sm:text-3xl">Don&apos;t see your role?</h2>
          <p className="mx-auto mb-6 max-w-xl text-sm text-gray-300">
            We&apos;re always looking for great people. Send us your resume and tell us how you can help.
          </p>
          <a
            href="mailto:careers@sbsindustrial.in?subject=General Application"
            className="rounded-lg bg-primary px-6 py-2.5 text-sm font-bold text-white hover:bg-primarydark"
          >
            Send General Application
          </a>
        </section>
      </div>
    </>
  );
}
