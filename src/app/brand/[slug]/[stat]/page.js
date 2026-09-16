import { notFound } from "next/navigation";
import Link from "next/link";
import { SITE_URL, SITE_NAME } from "@/lib/seo";
import { BRANDS, getBrandBySlug, getProductsByBrand } from "@/lib/data/brands";
import {
  getBrandDetails,
  VALID_STAT_SLUGS,
  STAT_META,
} from "@/lib/data/brandDetails";
import { slugifyCategory } from "@/lib/data/categories";
import PageHero from "@/components/pages/PageHero";
import ProductGrid from "@/components/home/ProductGrid";

/* ─── Static params: brand × stat ─────────────────────── */
export function generateStaticParams() {
  const params = [];
  for (const brand of BRANDS) {
    for (const stat of VALID_STAT_SLUGS) {
      params.push({ slug: brand.slug, stat });
    }
  }
  return params;
}

export async function generateMetadata({ params }) {
  const { slug, stat } = await params;
  if (!VALID_STAT_SLUGS.includes(stat)) return {};

  const brand = getBrandBySlug(slug);
  if (!brand) return {};

  const meta = STAT_META[stat];
  const title = `${brand.name} — ${meta.label} | History, Origin & Industry`;
  const description = `${meta.blurb} — full details about ${brand.name} on ${SITE_NAME}.`;

  return {
    title,
    description,
    alternates: { canonical: `/brand/${slug}/${stat}` },
    openGraph: {
      type: "website",
      title,
      description,
      url: `${SITE_URL}/brand/${slug}/${stat}`,
    },
  };
}

/* ─── Page ─────────────────────────────────────────────── */
export default async function BrandStatPage({ params }) {
  const { slug, stat } = await params;
  if (!VALID_STAT_SLUGS.includes(stat)) notFound();

  const details = getBrandDetails(slug);
  if (!details) notFound();

  const { brand, history, originStory, industryCoverage } = details;
  const meta = STAT_META[stat];

  return (
    <>
      <PageHero
        eyebrow={`${brand.name.toUpperCase()} · ${meta.label.toUpperCase()}`}
        title={
          stat === "founded"
            ? `Founded in ${brand.founded}`
            : stat === "origin"
            ? originStory.country
            : stat === "industry"
            ? "Industry Coverage"
            : `${brand.name} Products`
        }
        subtitle={meta.blurb}
        breadcrumbs={[
          { label: "Brands", href: "/brands" },
          { label: brand.name, href: `/brand/${brand.slug}` },
          { label: meta.label },
        ]}
      />

      {/* Stat tabs — switch between the 4 stat views */}
      <div className="border-b border-gray-100 bg-white">
        <div className="mx-auto max-w-screen-2xl px-3 sm:px-4">
          <div className="hide-scrollbar -mx-1 flex gap-1 overflow-x-auto px-1 py-2 sm:py-3">
            {VALID_STAT_SLUGS.map((s) => {
              const m = STAT_META[s];
              const isActive = s === stat;
              return (
                <Link
                  key={s}
                  href={`/brand/${brand.slug}/${s}`}
                  className={`flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-lg px-3 py-2 text-xs font-semibold transition-colors sm:text-sm ${
                    isActive
                      ? "bg-orange-50 text-primary"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <span aria-hidden="true">{m.icon}</span>
                  {m.label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-screen-2xl space-y-10 px-4 py-10 sm:space-y-12 sm:py-12">
        {/* ─── FOUNDED ─────────────────────────────────── */}
        {stat === "founded" && (
          <>
            {/* Founder + Founding city */}
            <section className="grid gap-4 sm:grid-cols-2 sm:gap-5">
              <InfoCard
                icon="👤"
                label="Founder"
                value={history.founder}
              />
              <InfoCard
                icon="📍"
                label="Founding City"
                value={history.foundingCity}
              />
            </section>

            {/* Story */}
            <section className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-start">
              <div>
                <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-primary sm:text-xs">
                  THE FOUNDING STORY
                </p>
                <h2 className="font-display mb-4 text-xl font-black text-gray-900 sm:text-2xl md:text-3xl">
                  How {brand.name} began
                </h2>
                <p className="text-sm leading-relaxed text-gray-600 sm:text-base">
                  {history.story}
                </p>
              </div>

              {/* Fun facts */}
              <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
                <h3 className="font-display mb-3 text-sm font-bold text-gray-900">
                  Quick Facts
                </h3>
                <ul className="space-y-3">
                  {history.funFacts.map((f) => (
                    <li key={f.title} className="flex gap-3">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-orange-50 text-lg">
                        {f.icon}
                      </span>
                      <div>
                        <p className="text-xs font-bold text-gray-800 sm:text-sm">
                          {f.title}
                        </p>
                        <p className="mt-0.5 text-[11px] leading-relaxed text-gray-500">
                          {f.desc}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Timeline */}
            <section>
              <div className="mb-5">
                <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-primary sm:text-xs">
                  MILESTONES
                </p>
                <h2 className="font-display text-xl font-black text-gray-900 sm:text-2xl">
                  {new Date().getFullYear() - brand.founded}+ years of evolution
                </h2>
              </div>

              <ol className="relative ml-2 space-y-5 border-l-2 border-gray-100 pl-5 sm:ml-3 sm:space-y-6 sm:pl-6">
                {history.timeline.map((event, i) => (
                  <li key={i} className="relative">
                    <span
                      className="absolute -left-[30px] top-1 flex h-4 w-4 items-center justify-center rounded-full border-2 border-primary bg-white sm:-left-[34px]"
                      aria-hidden="true"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    </span>
                    <div className="font-display text-xs font-black text-primary sm:text-sm">
                      {event.year}
                    </div>
                    <div className="font-display mt-0.5 text-sm font-bold text-gray-900 sm:text-base">
                      {event.title}
                    </div>
                    <p className="mt-1 text-xs leading-relaxed text-gray-600 sm:text-sm">
                      {event.desc}
                    </p>
                  </li>
                ))}
              </ol>
            </section>
          </>
        )}

        {/* ─── ORIGIN ──────────────────────────────────── */}
        {stat === "origin" && (
          <>
            {/* Country hero card */}
            <section className="overflow-hidden rounded-2xl border border-gray-100 bg-gradient-to-br from-navy to-navylight p-6 text-white shadow-sm sm:p-10">
              <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center">
                <div className="text-6xl leading-none sm:text-7xl">
                  {originStory.flag}
                </div>
                <div className="flex-1">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-orange-400 sm:text-xs">
                    ORIGIN COUNTRY
                  </p>
                  <h2 className="font-display mt-1 text-2xl font-black sm:text-3xl md:text-4xl">
                    Made in {originStory.country}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-gray-300 sm:text-base">
                    {originStory.countryBlurb}
                  </p>
                </div>
              </div>
            </section>

            {/* Why it matters */}
            <section>
              <div className="mb-5">
                <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-primary sm:text-xs">
                  WHY ORIGIN MATTERS
                </p>
                <h2 className="font-display text-xl font-black text-gray-900 sm:text-2xl">
                  What {originStory.country} engineering means for you
                </h2>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
                {originStory.whyItMatters.map((m) => (
                  <div
                    key={m.title}
                    className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm"
                  >
                    <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-lg bg-orange-50 text-2xl">
                      {m.icon}
                    </div>
                    <h3 className="font-display mb-1 text-sm font-bold text-gray-900">
                      {m.title}
                    </h3>
                    <p className="text-xs leading-relaxed text-gray-500">
                      {m.desc}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Manufacturing footprint */}
            <section className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
              <h2 className="font-display mb-4 text-base font-bold text-gray-900 sm:text-lg">
                Manufacturing &amp; Distribution
              </h2>
              <ul className="divide-y divide-gray-100">
                {originStory.manufacturing.map((mfg, i) => (
                  <li
                    key={i}
                    className="flex flex-col gap-1 py-3 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <span className="text-sm font-semibold text-gray-800">
                      📍 {mfg.location}
                    </span>
                    <span className="text-xs text-gray-500 sm:text-right">
                      {mfg.role}
                    </span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Certifications */}
            <section className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
              <h2 className="font-display mb-3 text-base font-bold text-gray-900 sm:text-lg">
                Certifications
              </h2>
              <div className="flex flex-wrap gap-2">
                {originStory.certifications.map((cert) => (
                  <span
                    key={cert}
                    className="rounded-full border border-green-200 bg-green-50 px-3 py-1.5 text-xs font-semibold text-green-700"
                  >
                    ✓ {cert}
                  </span>
                ))}
              </div>
            </section>
          </>
        )}

        {/* ─── INDUSTRY ────────────────────────────────── */}
        {stat === "industry" && (
          <>
            {/* Sectors covered */}
            <section>
              <div className="mb-5">
                <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-primary sm:text-xs">
                  SECTORS SERVED
                </p>
                <h2 className="font-display text-xl font-black text-gray-900 sm:text-2xl">
                  {industryCoverage.sectors.length} sectors trust {brand.name}
                </h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {industryCoverage.sectors.map((sector) => (
                  <span
                    key={sector}
                    className="rounded-full border border-gray-200 bg-white px-3.5 py-2 text-xs font-semibold text-gray-700 shadow-sm sm:text-sm"
                  >
                    {sector}
                  </span>
                ))}
              </div>
            </section>

            {/* Applications */}
            <section>
              <div className="mb-5">
                <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-primary sm:text-xs">
                  APPLICATIONS
                </p>
                <h2 className="font-display text-xl font-black text-gray-900 sm:text-2xl">
                  How industry uses {brand.name}
                </h2>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
                {industryCoverage.applications.map((app, i) => (
                  <div
                    key={i}
                    className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm transition-colors hover:border-primary/30"
                  >
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-primary">
                      {app.sector}
                    </p>
                    <p className="text-xs leading-relaxed text-gray-600 sm:text-sm">
                      {app.uses}
                    </p>
                    {app.products?.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-1.5 border-t border-gray-100 pt-3">
                        {app.products.slice(0, 3).map((p) => (
                          <span
                            key={p}
                            className="rounded bg-gray-100 px-2 py-0.5 text-[10px] font-semibold text-gray-600"
                          >
                            {p}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* Case study */}
            {industryCoverage.caseStudy && (
              <section className="rounded-2xl border border-orange-100 bg-orange-50/60 p-5 shadow-sm sm:p-8">
                <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-primary sm:text-xs">
                  CASE STUDY
                </p>
                <h2 className="font-display mb-3 text-lg font-black text-gray-900 sm:text-xl">
                  {industryCoverage.caseStudy.title}
                </h2>
                <p className="text-sm leading-relaxed text-gray-700">
                  {industryCoverage.caseStudy.body}
                </p>
              </section>
            )}
          </>
        )}

        {/* ─── PRODUCTS ───────────────────────────────── */}
        {stat === "products" && (
          <BrandProductsView brand={brand} />
        )}

        {/* Cross-link CTAs — only show on non-product pages */}
        {stat !== "products" && (
          <section className="rounded-2xl bg-gradient-to-br from-navy to-navylight p-6 text-center sm:p-10">
            <h2 className="font-display mb-3 text-xl font-black text-white sm:text-2xl">
              Explore {brand.name} products
            </h2>
            <p className="mx-auto mb-6 max-w-xl text-xs text-gray-300 sm:text-sm">
              Browse the full {brand.name} catalogue on SbS — GST-invoiced,
              bulk-priced, and delivered to your plant gate.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href={`/brand/${brand.slug}/products`}
                className="rounded-lg bg-primary px-5 py-2.5 text-xs font-bold text-white hover:bg-primarydark sm:px-6 sm:text-sm"
              >
                View Products
              </Link>
              <Link
                href={`/brand/${brand.slug}`}
                className="rounded-lg border border-white/20 bg-white/10 px-5 py-2.5 text-xs font-bold text-white backdrop-blur-sm hover:bg-white/20 sm:px-6 sm:text-sm"
              >
                Back to {brand.name}
              </Link>
            </div>
          </section>
        )}
      </div>
    </>
  );
}

/* ─── Sub-components ──────────────────────────────────── */

function InfoCard({ icon, label, value }) {
  return (
    <div className="flex items-start gap-4 rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-2xl">
        {icon}
      </span>
      <div className="min-w-0">
        <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 sm:text-xs">
          {label}
        </p>
        <p className="mt-1 text-sm font-bold leading-snug text-gray-900 sm:text-base">
          {value}
        </p>
      </div>
    </div>
  );
}

/**
 * Full product catalogue for the brand with category filter pills.
 * This is a server component — the filter pills are just anchor links
 * with the `?cat=` param, so no client JS is needed.
 */
async function BrandProductsView({ brand }) {
  const products = getProductsByBrand(brand);

  // Group by category
  const byCategory = products.reduce((acc, p) => {
    const cat = p.cat || "Other";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(p);
    return acc;
  }, {});

  const categories = Object.keys(byCategory);

  return (
    <>
      {/* Stats strip */}
      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <InfoCard icon="📦" label="Total Products" value={`${products.length}`} />
        <InfoCard icon="🗂️" label="Categories" value={`${categories.length}`} />
        <InfoCard icon="⭐" label="Avg. Rating" value="4.5+" />
        <InfoCard icon="🛡️" label="Warranty" value="Manufacturer backed" />
      </section>

      {products.length === 0 ? (
        <div className="rounded-xl border border-gray-100 bg-white py-16 text-center shadow-sm">
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
      ) : (
        <>
          {/* Category filter pills (anchor-based) */}
          <section className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
            <p className="mb-3 text-[10px] font-bold uppercase tracking-wider text-gray-500 sm:text-xs">
              FILTER BY CATEGORY
            </p>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <a
                  key={cat}
                  href={`#cat-${slugifyCategory(cat)}`}
                  className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs font-medium text-gray-700 transition-colors hover:border-primary hover:bg-orange-50 hover:text-primary"
                >
                  {cat} · {byCategory[cat].length}
                </a>
              ))}
            </div>
          </section>

          {/* Grouped product grids */}
          {categories.map((cat) => (
            <section key={cat} id={`cat-${slugifyCategory(cat)}`} className="scroll-mt-24">
              <div className="mb-4 flex items-center justify-between gap-2">
                <h2 className="font-display text-base font-black text-gray-900 sm:text-lg">
                  {cat}
                </h2>
                <Link
                  href={`/category/${slugifyCategory(cat)}`}
                  className="text-xs font-semibold text-primary hover:underline"
                >
                  Browse all {cat} →
                </Link>
              </div>
              <ProductGrid
                title=""
                products={byCategory[cat]}
                viewAllHref={`/category/${slugifyCategory(cat)}`}
              />
            </section>
          ))}
        </>
      )}
    </>
  );
}