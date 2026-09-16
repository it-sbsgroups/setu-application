import { notFound } from "next/navigation";
import Link from "next/link";
import { SITE_URL, SITE_NAME } from "@/lib/seo";
import { slugifyCategory } from "@/lib/data/categories";
import {
  BRANDS,
  getBrandBySlug,
  getProductsByBrand,
} from "@/lib/data/brands";
import { getPillarSlugForHighlight } from "@/lib/data/trustPillars";
import PageHero from "@/components/pages/PageHero";
import ProductGrid from "@/components/home/ProductGrid";

/* Pre-render every brand page at build time (SSG). */
export function generateStaticParams() {
  return BRANDS.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const brand = getBrandBySlug(slug);
  if (!brand) return {};

  const title = `${brand.name} — Buy Online at Best B2B Prices`;
  const description = `Shop genuine ${brand.name} products on ${SITE_NAME}. ${brand.tagline} — GST-invoiced, with bulk pricing and plant-gate delivery across India.`;

  return {
    title,
    description,
    alternates: { canonical: `/brand/${slug}` },
    openGraph: {
      type: "website",
      title,
      description,
      url: `${SITE_URL}/brand/${slug}`,
    },
  };
}

function BrandJsonLd({ brand }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Brand",
    name: brand.name,
    description: brand.description[0],
    slogan: brand.tagline,
    foundingDate: String(brand.founded),
    url: `${SITE_URL}/brand/${brand.slug}`,
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export default async function BrandPage({ params }) {
  const { slug } = await params;
  const brand = getBrandBySlug(slug);
  if (!brand) notFound();

  const products = getProductsByBrand(brand);

  return (
    <>
      <BrandJsonLd brand={brand} />

      <PageHero
        eyebrow="BRAND"
        title={brand.name}
        subtitle={brand.tagline}
        breadcrumbs={[
          { label: "Brands", href: "/brands" },
          { label: brand.name },
        ]}
      />

      {/* ── Stats strip — every stat is now clickable ── */}
      <section className="border-b border-gray-100 bg-white">
        <div className="mx-auto grid max-w-screen-2xl grid-cols-2 gap-3 px-3 py-5 sm:grid-cols-4 sm:gap-4 sm:px-4 sm:py-6">
          <ClickableStat
            slug={slug}
            stat="founded"
            label="Founded"
            value={String(brand.founded)}
            icon="🏛️"
          />
          <ClickableStat
            slug={slug}
            stat="origin"
            label="Origin"
            value={brand.origin}
            icon="🌍"
          />
          <ClickableStat
            slug={slug}
            stat="industry"
            label="Industry"
            value={brand.industry}
            icon="🏭"
          />
          <ClickableStat
            slug={slug}
            stat="products"
            label="Products on SbS"
            value={products.length > 0 ? `${products.length}+` : "Enquire"}
            icon="📦"
          />
        </div>
      </section>

      <div className="mx-auto max-w-screen-2xl space-y-10 px-4 py-10 sm:space-y-12 sm:py-12">
        {/* About the brand */}
        <section className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-start">
          <div>
            <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-primary sm:text-xs">
              ABOUT THE BRAND
            </p>
            <h2 className="font-display mb-4 text-xl font-black text-gray-900 sm:text-2xl md:text-3xl">
              Why {brand.name} is a benchmark in {brand.industry.toLowerCase()}
            </h2>
            <div className="space-y-4 text-sm leading-relaxed text-gray-600">
              {brand.description.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>

          {/* Categories they operate in */}
          <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
            <h3 className="font-display mb-3 text-sm font-bold text-gray-900">
              Categories on SbS
            </h3>
            <div className="flex flex-wrap gap-2">
              {brand.categories.map((cat) => (
                <Link
                  key={cat}
                  href={`/category/${slugifyCategory(cat)}`}
                  className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs font-medium text-gray-700 transition-colors hover:border-primary hover:bg-orange-50 hover:text-primary"
                >
                  {cat} →
                </Link>
              ))}
            </div>
            <p className="mt-4 text-[11px] leading-relaxed text-gray-400">
              Browse brand-specific categories, or view the full catalogue on SbS.
            </p>
          </div>
        </section>

        {/* Highlights (clickable → trust pillar pages) */}
        <section>
          <div className="mb-5 text-center">
            <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-primary sm:text-xs">
              WHY BUY FROM SBS
            </p>
            <h2 className="font-display text-xl font-black text-gray-900 sm:text-2xl md:text-3xl">
              {brand.name} on SbS Industrial &amp; B2B
            </h2>
            <p className="mt-1 text-xs text-gray-500 sm:text-sm">
              Tap any pillar to see how SbS delivers it end-to-end.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
            {brand.highlights.map((h) => {
              const pillarSlug = getPillarSlugForHighlight(h.title);
              const card = (
                <div className="flex h-full flex-col rounded-xl border border-gray-100 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md">
                  <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-lg bg-orange-50 text-2xl">
                    {h.icon}
                  </div>
                  <h3 className="font-display mb-1 text-sm font-bold text-gray-900">
                    {h.title}
                  </h3>
                  <p className="text-xs leading-relaxed text-gray-500">
                    {h.desc}
                  </p>
                  {pillarSlug && (
                    <span className="mt-3 text-[11px] font-bold text-primary group-hover:underline">
                      Learn more →
                    </span>
                  )}
                </div>
              );

              if (pillarSlug) {
                return (
                  <Link
                    key={h.title}
                    href={`/trust/${pillarSlug}`}
                    className="group block"
                  >
                    {card}
                  </Link>
                );
              }
              return <div key={h.title}>{card}</div>;
            })}
          </div>
        </section>

        {/* Products */}
        {products.length > 0 ? (
          <ProductGrid
            eyebrow={`${brand.name.toUpperCase()} ON SBS`}
            title={`${brand.name} Products`}
            subtitle={`${products.length} product${products.length === 1 ? "" : "s"} available — GST-invoiced with bulk pricing`}
            products={products}
            viewAllHref={`/brand/${brand.slug}/products`}
          />
        ) : (
          <div className="rounded-xl border border-gray-100 bg-white py-12 text-center shadow-sm">
            <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-orange-50 text-2xl">
              🔍
            </div>
            <p className="text-sm font-semibold text-gray-700">
              No {brand.name} products listed yet
            </p>
            <p className="mt-1 text-xs text-gray-400">
              Raise a bulk enquiry and our team will source it for you within 24 hours.
            </p>
            <Link
              href="/bulk-orders"
              className="mt-4 inline-block rounded-lg bg-primary px-5 py-2 text-xs font-bold text-white hover:bg-primarydark"
            >
              Raise Bulk Enquiry
            </Link>
          </div>
        )}

        {/* FAQ */}
        <section className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="font-display mb-4 text-lg font-black text-gray-900 sm:text-xl">
            {brand.name} — Frequently Asked Questions
          </h2>
          <div className="divide-y divide-gray-100">
            {brand.faqs.map((faq) => (
              <details key={faq.q} className="group py-3">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-sm font-medium text-gray-700 [&::-webkit-details-marker]:hidden">
                  {faq.q}
                  <span className="shrink-0 text-gray-400 transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-2 text-xs leading-relaxed text-gray-500 sm:text-sm">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="rounded-2xl bg-gradient-to-br from-navy to-navylight p-6 text-center sm:p-10">
          <h2 className="font-display mb-3 text-xl font-black text-white sm:text-2xl md:text-3xl">
            Looking for {brand.name} in bulk?
          </h2>
          <p className="mx-auto mb-6 max-w-xl text-xs text-gray-300 sm:text-sm">
            Get project pricing, credit terms, and plant-gate delivery on {brand.name}{" "}
            products for your industry.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/bulk-orders"
              className="rounded-lg bg-primary px-5 py-2.5 text-xs font-bold text-white hover:bg-primarydark sm:px-6 sm:text-sm"
            >
              Raise Bulk Enquiry
            </Link>
            <Link
              href="/brands"
              className="rounded-lg border border-white/20 bg-white/10 px-5 py-2.5 text-xs font-bold text-white backdrop-blur-sm hover:bg-white/20 sm:px-6 sm:text-sm"
            >
              Browse All Brands
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}

/* ─── Clickable stat card ──────────────────────────────── */
function ClickableStat({ slug, stat, label, value, icon }) {
  return (
    <Link
      href={`/brand/${slug}/${stat}`}
      className="group flex flex-col items-center rounded-xl border border-transparent p-3 text-center transition-colors hover:border-primary/30 hover:bg-orange-50/40"
    >
      <span
        className="mb-1.5 text-lg sm:text-xl"
        aria-hidden="true"
      >
        {icon}
      </span>
      <span className="font-display text-sm font-black text-gray-900 group-hover:text-primary sm:text-base md:text-lg">
        {value}
      </span>
      <span className="mt-0.5 flex items-center gap-1 text-[10px] uppercase tracking-wider text-gray-500 sm:text-xs">
        {label}
        <span className="text-primary opacity-0 transition-opacity group-hover:opacity-100">
          →
        </span>
      </span>
    </Link>
  );
}