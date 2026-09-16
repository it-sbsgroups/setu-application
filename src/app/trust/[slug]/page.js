import { notFound } from "next/navigation";
import Link from "next/link";
import { SITE_URL, SITE_NAME } from "@/lib/seo";
import { TRUST_PILLARS, getPillarBySlug } from "@/lib/data/trustPillars";
import { getCardsForPillar } from "@/lib/data/detailCards";
import { BRANDS, getProductsByBrand } from "@/lib/data/brands";
import { slugifyCategory } from "@/lib/data/categories";
import PageHero from "@/components/pages/PageHero";
import ProductGrid from "@/components/home/ProductGrid";

export function generateStaticParams() {
  return TRUST_PILLARS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const pillar = getPillarBySlug(slug);
  if (!pillar) return {};

  const title = `${pillar.title} — Why It Matters for Industry`;
  const description = `${pillar.shortDesc} Learn how ${SITE_NAME} delivers on ${pillar.title.toLowerCase()} for manufacturing plants, EPC contractors, and MSMEs across India.`;

  return {
    title,
    description,
    alternates: { canonical: `/trust/${slug}` },
    openGraph: {
      type: "website",
      title,
      description,
      url: `${SITE_URL}/trust/${slug}`,
    },
  };
}

function PillarJsonLd({ pillar }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: pillar.title,
    description: pillar.shortDesc,
    author: { "@type": "Organization", name: SITE_NAME },
    publisher: { "@type": "Organization", name: SITE_NAME },
    url: `${SITE_URL}/trust/${pillar.slug}`,
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export default async function TrustPillarPage({ params }) {
  const { slug } = await params;
  const pillar = getPillarBySlug(slug);
  if (!pillar) notFound();

  // Get clickable cards (delivers + matters with slugs)
  const { delivers, matters } = getCardsForPillar(pillar.slug);

  // Find brands that feature this pillar
  const featuredBrands = BRANDS.filter((brand) =>
    brand.highlights.some((h) => {
      const { HIGHLIGHT_TITLE_TO_SLUG } = require("@/lib/data/trustPillars");
      return HIGHLIGHT_TITLE_TO_SLUG[h.title] === pillar.slug;
    })
  );

  // Pick 6 sample products
  const sampleProducts = featuredBrands
    .flatMap((b) => getProductsByBrand(b).slice(0, 2))
    .filter((p, i, arr) => arr.findIndex((x) => x.id === p.id) === i)
    .slice(0, 6);

  return (
    <>
      <PillarJsonLd pillar={pillar} />

      <PageHero
        eyebrow="TRUST PILLAR"
        title={pillar.title}
        subtitle={pillar.shortDesc}
        breadcrumbs={[
          { label: "Why Buy from SbS", href: "/trust" },
          { label: pillar.title },
        ]}
      />

      <div className="mx-auto max-w-screen-2xl space-y-10 px-4 py-10 sm:space-y-12 sm:py-12">
        {/* Description */}
        <section className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-start">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-orange-50 text-3xl">
                {pillar.icon}
              </span>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-primary sm:text-xs">
                  {pillar.category}
                </p>
                <h2 className="font-display text-lg font-black text-gray-900 sm:text-xl md:text-2xl">
                  What it means
                </h2>
              </div>
            </div>
            <div className="space-y-4 text-sm leading-relaxed text-gray-600">
              {pillar.description.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
            <h3 className="font-display mb-3 text-sm font-bold text-gray-900">
              Quick Facts
            </h3>
            <ul className="space-y-3 text-xs">
              <li className="flex items-start justify-between gap-3 border-b border-gray-100 pb-3">
                <span className="text-gray-500">Category</span>
                <span className="text-right font-semibold text-gray-800">
                  {pillar.category}
                </span>
              </li>
              <li className="flex items-start justify-between gap-3 border-b border-gray-100 pb-3">
                <span className="text-gray-500">Featured by</span>
                <span className="text-right font-semibold text-gray-800">
                  {featuredBrands.length} brands
                </span>
              </li>
              <li className="flex items-start justify-between gap-3">
                <span className="text-gray-500">Applies to</span>
                <span className="text-right font-semibold text-gray-800">
                  {pillar.relatedCategories?.length || 0} categories
                </span>
              </li>
            </ul>
          </div>
        </section>

        {/* ── How SbS delivers — cards now clickable ── */}
        <section>
          <div className="mb-5">
            <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-primary sm:text-xs">
              HOW SBS DELIVERS IT
            </p>
            <h2 className="font-display text-xl font-black text-gray-900 sm:text-2xl">
              What you get on every order
            </h2>
            <p className="mt-1 text-xs text-gray-500 sm:text-sm">
              Tap any card to see how we deliver it end-to-end.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
            {delivers.map((d) => (
              <Link
                key={d.slug}
                href={`/trust/${pillar.slug}/${d.slug}`}
                className="group block"
              >
                <div className="flex h-full flex-col rounded-xl border border-gray-100 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md">
                  <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-lg bg-orange-50 text-2xl">
                    {d.icon}
                  </div>
                  <h3 className="font-display mb-1 text-sm font-bold text-gray-900 group-hover:text-primary">
                    {d.title}
                  </h3>
                  <p className="text-xs leading-relaxed text-gray-500">
                    {d.desc}
                  </p>
                  <span className="mt-3 text-[11px] font-bold text-primary group-hover:underline">
                    Learn more →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ── Why it matters — cards now clickable ── */}
        <section>
          <div className="mb-5">
            <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-primary sm:text-xs">
              WHY IT MATTERS
            </p>
            <h2 className="font-display text-xl font-black text-gray-900 sm:text-2xl">
              What this means for your plant
            </h2>
            <p className="mt-1 text-xs text-gray-500 sm:text-sm">
              Tap any card to understand the real business impact.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-3 sm:gap-4">
            {matters.map((m) => (
              <Link
                key={m.slug}
                href={`/trust/${pillar.slug}/${m.slug}`}
                className="group block"
              >
                <div className="flex h-full flex-col rounded-xl border border-gray-100 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md">
                  <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-lg bg-green-50 text-2xl">
                    {m.icon}
                  </div>
                  <h3 className="font-display mb-1 text-sm font-bold text-gray-900 group-hover:text-primary">
                    {m.title}
                  </h3>
                  <p className="text-xs leading-relaxed text-gray-500">
                    {m.desc}
                  </p>
                  <span className="mt-3 text-[11px] font-bold text-primary group-hover:underline">
                    Learn more →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Featured brands */}
        {featuredBrands.length > 0 && (
          <section>
            <div className="mb-5">
              <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-primary sm:text-xs">
                FEATURED BY
              </p>
              <h2 className="font-display text-xl font-black text-gray-900 sm:text-2xl">
                Brands that deliver this
              </h2>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
              {featuredBrands.map((brand) => (
                <Link
                  key={brand.slug}
                  href={`/brand/${brand.slug}`}
                  className="group flex flex-col items-center rounded-xl border border-gray-100 bg-white p-4 text-center shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
                >
                  <div
                    className="mb-3 flex h-14 w-14 items-center justify-center rounded-lg text-sm font-black text-white"
                    style={{ background: brand.accent || "#1B2B4B" }}
                  >
                    {brand.displayName.slice(0, 3)}
                  </div>
                  <p className="text-sm font-bold text-gray-900 group-hover:text-primary">
                    {brand.name}
                  </p>
                  <p className="mt-0.5 text-[10px] text-gray-400">
                    {brand.origin}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Sample products */}
        {sampleProducts.length > 0 && (
          <ProductGrid
            eyebrow="RELATED PRODUCTS"
            title="Products backed by this pillar"
            subtitle="Sample products from brands that deliver on this promise"
            products={sampleProducts}
            viewAllHref="/categories"
          />
        )}

        {/* Related categories */}
        {pillar.relatedCategories?.length > 0 && (
          <section className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
            <h3 className="font-display mb-3 text-sm font-bold text-gray-900">
              Browse related categories
            </h3>
            <div className="flex flex-wrap gap-2">
              {pillar.relatedCategories.map((cat) => (
                <Link
                  key={cat}
                  href={`/category/${slugifyCategory(cat)}`}
                  className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs font-medium text-gray-700 transition-colors hover:border-primary hover:bg-orange-50 hover:text-primary"
                >
                  {cat} →
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* FAQ */}
        <section className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="font-display mb-4 text-lg font-black text-gray-900 sm:text-xl">
            Frequently Asked Questions
          </h2>
          <div className="divide-y divide-gray-100">
            {pillar.faqs.map((faq) => (
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
            Ready to buy with confidence?
          </h2>
          <p className="mx-auto mb-6 max-w-xl text-xs text-gray-300 sm:text-sm">
            Every order on SbS is backed by this pillar and every other reason
            Indian industry chooses us.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/categories"
              className="rounded-lg bg-primary px-5 py-2.5 text-xs font-bold text-white hover:bg-primarydark sm:px-6 sm:text-sm"
            >
              Browse Categories
            </Link>
            <Link
              href="/trust"
              className="rounded-lg border border-white/20 bg-white/10 px-5 py-2.5 text-xs font-bold text-white backdrop-blur-sm hover:bg-white/20 sm:px-6 sm:text-sm"
            >
              All Trust Pillars
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}