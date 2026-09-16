import Link from "next/link";
import { SITE_URL, SITE_NAME } from "@/lib/seo";
import { BRANDS, getProductsByBrand } from "@/lib/data/brands";
import PageHero from "@/components/pages/PageHero";

export const metadata = {
  title: "Shop by Brand",
  description: `Browse 50,000+ verified brands on ${SITE_NAME} — Bosch, DeWalt, Makita, 3M, Havells, Honeywell, Legrand, ABB, Schneider and more.`,
  alternates: { canonical: "/brands" },
  openGraph: { type: "website", url: `${SITE_URL}/brands` },
};

export default function BrandsPage() {
  const brands = BRANDS.map((b) => ({
    ...b,
    productCount: getProductsByBrand(b).length,
  }));

  return (
    <>
      <PageHero
        eyebrow="BRANDS"
        title="Shop by Brand"
        subtitle="50,000+ verified brands — from global leaders to Indian industry staples. All genuine, GST-invoiced, and backed by warranty."
        breadcrumbs={[{ label: "Brands" }]}
      />

      <div className="mx-auto max-w-screen-2xl px-4 py-10 sm:py-12">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="font-display text-xl font-black text-gray-900 sm:text-2xl">
              Featured Brands
            </h2>
            <p className="mt-1 text-xs text-gray-500 sm:text-sm">
              {brands.length} brands with dedicated pages — click to explore products,
              specs, and bulk options.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
          {brands.map((brand) => (
            <Link
              key={brand.slug}
              href={`/brand/${brand.slug}`}
              className="group flex flex-col overflow-hidden rounded-xl border border-gray-100 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
            >
              <div className="mb-3 flex items-start justify-between gap-3">
                <div
                  className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg text-sm font-black text-white"
                  style={{ background: brand.accent || "#1B2B4B" }}
                  aria-hidden="true"
                >
                  {brand.displayName.slice(0, 3)}
                </div>
                <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-bold text-gray-600">
                  {brand.origin}
                </span>
              </div>

              <h3 className="font-display text-base font-black text-gray-900 group-hover:text-primary">
                {brand.name}
              </h3>
              <p className="mt-0.5 text-[11px] italic text-gray-400">
                “{brand.tagline}”
              </p>

              <p className="mt-3 line-clamp-2 text-xs leading-relaxed text-gray-500">
                {brand.description[0]}
              </p>

              <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-3">
                <span className="text-[11px] font-semibold text-gray-500">
                  {brand.productCount} product{brand.productCount === 1 ? "" : "s"}
                </span>
                <span className="text-xs font-bold text-primary group-hover:underline">
                  Explore →
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Not seeing your brand */}
        <section className="mt-12 rounded-2xl bg-gradient-to-br from-navy to-navylight p-6 text-center sm:p-10">
          <h2 className="font-display mb-3 text-xl font-black text-white sm:text-2xl md:text-3xl">
            Can&apos;t find your brand?
          </h2>
          <p className="mx-auto mb-6 max-w-xl text-xs text-gray-300 sm:text-sm">
            We source from 50,000+ brands across India. Raise a bulk enquiry
            with your required brand and quantity — our team will source it
            within 24 hours.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/bulk-orders"
              className="rounded-lg bg-primary px-5 py-2.5 text-xs font-bold text-white hover:bg-primarydark sm:px-6 sm:text-sm"
            >
              Raise Bulk Enquiry
            </Link>
            <Link
              href="/categories"
              className="rounded-lg border border-white/20 bg-white/10 px-5 py-2.5 text-xs font-bold text-white backdrop-blur-sm hover:bg-white/20 sm:px-6 sm:text-sm"
            >
              Browse Categories
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}