import { notFound } from "next/navigation";
import Link from "next/link";
import { SITE_URL, SITE_NAME } from "@/lib/seo";
import { getPillarBySlug } from "@/lib/data/trustPillars";
import {
  getCardDetail,
  getAllCardParams,
} from "@/lib/data/detailCards";
import { getBrandBySlug, getProductsByBrand } from "@/lib/data/brands";
import { slugifyCategory } from "@/lib/data/categories";
import PageHero from "@/components/pages/PageHero";
import ProductGrid from "@/components/home/ProductGrid";

/* ─── Static params: every card of every pillar ──────── */
export function generateStaticParams() {
  return getAllCardParams();
}

export async function generateMetadata({ params }) {
  const { slug, card } = await params;
  const detail = getCardDetail(slug, card);
  if (!detail) return {};

  const title = `${detail.title} — ${detail.pillarTitle}`;
  const description = detail.shortDesc;

  return {
    title,
    description,
    alternates: { canonical: `/trust/${slug}/${card}` },
    openGraph: {
      type: "article",
      title,
      description,
      url: `${SITE_URL}/trust/${slug}/${card}`,
    },
  };
}

function CardJsonLd({ detail }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: detail.title,
    description: detail.shortDesc,
    author: { "@type": "Organization", name: SITE_NAME },
    publisher: { "@type": "Organization", name: SITE_NAME },
    url: `${SITE_URL}/trust/${detail.pillarSlug}/${detail.slug}`,
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export default async function CardDetailPage({ params }) {
  const { slug, card } = await params;
  const pillar = getPillarBySlug(slug);
  if (!pillar) notFound();

  const detail = getCardDetail(slug, card);
  if (!detail) notFound();

  // Resolve related brands (if provided)
  const relatedBrands = (detail.relatedBrands || [])
    .map((brandSlug) => getBrandBySlug(brandSlug))
    .filter(Boolean);

  // Pick sample products from related brands
  const sampleProducts = relatedBrands
    .flatMap((b) => getProductsByBrand(b).slice(0, 2))
    .filter((p, i, arr) => arr.findIndex((x) => x.id === p.id) === i)
    .slice(0, 6);

  const typeLabel = detail.type === "deliver" ? "How SbS Delivers It" : "Why It Matters";

  return (
    <>
      <CardJsonLd detail={detail} />

      <PageHero
        eyebrow={`${pillar.title.toUpperCase()} · ${detail.type === "deliver" ? "DELIVERS" : "MATTERS"}`}
        title={detail.title}
        subtitle={detail.shortDesc}
        breadcrumbs={[
          { label: "Why Buy from SbS", href: "/trust" },
          { label: pillar.title, href: `/trust/${pillar.slug}` },
          { label: detail.title },
        ]}
      />

      {/* Sibling tabs — jump to other cards in the same pillar */}
      <div className="border-b border-gray-100 bg-white">
        <div className="mx-auto max-w-screen-2xl px-3 sm:px-4">
          <div className="hide-scrollbar -mx-1 flex gap-1 overflow-x-auto px-1 py-2 sm:py-3">
            <Link
              href={`/trust/${pillar.slug}`}
              className="flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-lg px-3 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-50 sm:text-sm"
            >
              ← {pillar.title}
            </Link>
            {(pillar.delivers || []).map((d) => {
              const dSlug = d.title
                .toLowerCase()
                .replace(/&/g, "")
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/(^-|-$)/g, "");
              const isActive = dSlug === card;
              return (
                <Link
                  key={d.title}
                  href={`/trust/${pillar.slug}/${dSlug}`}
                  className={`flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-lg px-3 py-2 text-xs font-semibold transition-colors sm:text-sm ${
                    isActive
                      ? "bg-orange-50 text-primary"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <span aria-hidden="true">{d.icon}</span>
                  {d.title}
                </Link>
              );
            })}
            {(pillar.matters || []).map((m) => {
              const mSlug = m.title
                .toLowerCase()
                .replace(/&/g, "")
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/(^-|-$)/g, "");
              const isActive = mSlug === card;
              return (
                <Link
                  key={m.title}
                  href={`/trust/${pillar.slug}/${mSlug}`}
                  className={`flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-lg px-3 py-2 text-xs font-semibold transition-colors sm:text-sm ${
                    isActive
                      ? "bg-orange-50 text-primary"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <span aria-hidden="true">{m.icon}</span>
                  {m.title}
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-screen-2xl space-y-10 px-4 py-10 sm:space-y-12 sm:py-12">
        {/* Big icon + long description */}
        <section className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-start">
          <div>
            <div className="mb-4 flex items-center gap-4">
              <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-orange-50 text-3xl sm:h-20 sm:w-20 sm:text-4xl">
                {detail.icon}
              </span>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-primary sm:text-xs">
                  {typeLabel}
                </p>
                <h2 className="font-display text-lg font-black text-gray-900 sm:text-xl md:text-2xl">
                  {detail.title}
                </h2>
              </div>
            </div>
            <div className="space-y-4 text-sm leading-relaxed text-gray-600 sm:text-base">
              {detail.longDescription.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>

          {/* Quick facts card */}
          <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
            <h3 className="font-display mb-3 text-sm font-bold text-gray-900">
              Quick Facts
            </h3>
            <ul className="space-y-3 text-xs">
              <li className="flex items-start justify-between gap-3 border-b border-gray-100 pb-3">
                <span className="text-gray-500">Pillar</span>
                <Link
                  href={`/trust/${pillar.slug}`}
                  className="text-right font-semibold text-primary hover:underline"
                >
                  {pillar.title} →
                </Link>
              </li>
              <li className="flex items-start justify-between gap-3 border-b border-gray-100 pb-3">
                <span className="text-gray-500">Category</span>
                <span className="text-right font-semibold text-gray-800">
                  {pillar.category}
                </span>
              </li>
              <li className="flex items-start justify-between gap-3 border-b border-gray-100 pb-3">
                <span className="text-gray-500">Type</span>
                <span className="text-right font-semibold text-gray-800">
                  {detail.type === "deliver" ? "Delivery pillar" : "Value pillar"}
                </span>
              </li>
              <li className="flex items-start justify-between gap-3">
                <span className="text-gray-500">Cost to you</span>
                <span className="text-right font-semibold text-green-700">
                  Included free
                </span>
              </li>
            </ul>
          </div>
        </section>

        {/* How it works */}
        <section>
          <div className="mb-5">
            <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-primary sm:text-xs">
              HOW IT WORKS
            </p>
            <h2 className="font-display text-xl font-black text-gray-900 sm:text-2xl">
              Step by step
            </h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
            {detail.howItWorks.map((step) => (
              <div
                key={step.step}
                className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm"
              >
                <p className="font-display text-2xl font-black text-primary sm:text-3xl">
                  {step.step}
                </p>
                <h3 className="font-display mt-2 text-sm font-bold text-gray-900 sm:text-base">
                  {step.title}
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-gray-500 sm:text-sm">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Benefits */}
        <section>
          <div className="mb-5">
            <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-primary sm:text-xs">
              WHAT YOU GET
            </p>
            <h2 className="font-display text-xl font-black text-gray-900 sm:text-2xl">
              Benefits for your business
            </h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
            {detail.benefits.map((b) => (
              <div
                key={b.title}
                className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm transition-colors hover:border-primary/30"
              >
                <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-lg bg-green-50 text-2xl">
                  {b.icon}
                </div>
                <h3 className="font-display mb-1 text-sm font-bold text-gray-900">
                  {b.title}
                </h3>
                <p className="text-xs leading-relaxed text-gray-500">{b.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Related brands */}
        {relatedBrands.length > 0 && (
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
              {relatedBrands.map((brand) => (
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
        {detail.relatedCategories?.length > 0 && (
          <section className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
            <h3 className="font-display mb-3 text-sm font-bold text-gray-900">
              Browse related categories
            </h3>
            <div className="flex flex-wrap gap-2">
              {detail.relatedCategories.map((cat) => (
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
            {detail.faqs.map((faq) => (
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

        {/* Cross-link CTA — back to pillar */}
        <section className="rounded-2xl bg-gradient-to-br from-navy to-navylight p-6 text-center sm:p-10">
          <h2 className="font-display mb-3 text-xl font-black text-white sm:text-2xl md:text-3xl">
            Explore the full {pillar.title} pillar
          </h2>
          <p className="mx-auto mb-6 max-w-xl text-xs text-gray-300 sm:text-sm">
            See every card in the {pillar.title.toLowerCase()} section and how
            they work together for your industry.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href={`/trust/${pillar.slug}`}
              className="rounded-lg bg-primary px-5 py-2.5 text-xs font-bold text-white hover:bg-primarydark sm:px-6 sm:text-sm"
            >
              View {pillar.title}
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