import Link from "next/link";
import { SITE_URL, SITE_NAME } from "@/lib/seo";
import { TRUST_PILLARS } from "@/lib/data/trustPillars";
import PageHero from "@/components/pages/PageHero";

export const metadata = {
  title: "Why Buy from SbS",
  description: `Every reason to trust ${SITE_NAME} — from nationwide service and manufacturer warranty to certified compliance and bulk procurement.`,
  alternates: { canonical: "/trust" },
  openGraph: { type: "website", url: `${SITE_URL}/trust` },
};

export default function TrustPage() {
  // Group pillars by category for a cleaner layout
  const grouped = TRUST_PILLARS.reduce((acc, p) => {
    const cat = p.category || "Other";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(p);
    return acc;
  }, {});

  return (
    <>
      <PageHero
        eyebrow="WHY BUY FROM SBS"
        title="Built for the way industry buys"
        subtitle="From warranty to logistics to vendor accountability — every pillar that makes SbS the right choice for your plant."
        breadcrumbs={[{ label: "Why Buy from SbS" }]}
      />

      <div className="mx-auto max-w-screen-2xl space-y-12 px-4 py-10 sm:py-12">
        {Object.entries(grouped).map(([category, pillars]) => (
          <section key={category}>
            <div className="mb-5 flex items-center gap-3">
              <h2 className="font-display text-lg font-black text-gray-900 sm:text-xl">
                {category}
              </h2>
              <span className="rounded-full bg-orange-50 px-2.5 py-0.5 text-[11px] font-bold text-primary">
                {pillars.length}
              </span>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
              {pillars.map((pillar) => (
                <Link
                  key={pillar.slug}
                  href={`/trust/${pillar.slug}`}
                  className="group flex flex-col rounded-xl border border-gray-100 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
                >
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-orange-50 text-2xl">
                    {pillar.icon}
                  </div>
                  <h3 className="font-display text-base font-black text-gray-900 group-hover:text-primary">
                    {pillar.title}
                  </h3>
                  <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-gray-500 sm:text-sm">
                    {pillar.shortDesc}
                  </p>
                  <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-3">
                    <span className="text-[11px] font-semibold text-gray-400">
                      {pillar.relatedCategories?.length || 0} categories
                    </span>
                    <span className="text-xs font-bold text-primary group-hover:underline">
                      Learn more →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ))}

        {/* Bottom CTA */}
        <section className="rounded-2xl bg-gradient-to-br from-navy to-navylight p-6 text-center sm:p-10">
          <h2 className="font-display mb-3 text-xl font-black text-white sm:text-2xl md:text-3xl">
            Ready to procure with confidence?
          </h2>
          <p className="mx-auto mb-6 max-w-xl text-xs text-gray-300 sm:text-sm">
            Join 50,000+ industries that buy from SbS for these exact reasons.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/categories"
              className="rounded-lg bg-primary px-5 py-2.5 text-xs font-bold text-white hover:bg-primarydark sm:px-6 sm:text-sm"
            >
              Browse Categories
            </Link>
            <Link
              href="/bulk-orders"
              className="rounded-lg border border-white/20 bg-white/10 px-5 py-2.5 text-xs font-bold text-white backdrop-blur-sm hover:bg-white/20 sm:px-6 sm:text-sm"
            >
              Raise Bulk Enquiry
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}