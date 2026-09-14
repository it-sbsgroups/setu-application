import { notFound } from "next/navigation";
import Image from "next/image";
import { CATEGORIES, categoryFromSlug, slugifyCategory } from "@/lib/data/categories";
import { CATEGORY_PRODUCTS, SECTIONS } from "@/lib/data/products";
import { wide } from "@/lib/format";
import { SITE_URL, SITE_NAME } from "@/lib/seo";
import Breadcrumb from "@/components/product/Breadcrumb";
import ProductGrid from "@/components/home/ProductGrid";

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ slug: slugifyCategory(c.name) }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const name = categoryFromSlug(slug);
  if (!name) return {};

  const section = SECTIONS.find((s) => s.name === name);
  const title = `${name} — Buy Online at Best B2B Prices`;
  const description = `Shop ${name.toLowerCase()} online on ${SITE_NAME}. ${section?.subtitle || ""} Verified brands, bulk pricing and fast delivery across India.`;

  return {
    title,
    description,
    alternates: { canonical: `/category/${slug}` },
    openGraph: { type: "website", title, description, url: `${SITE_URL}/category/${slug}` },
  };
}

export default async function CategoryPage({ params }) {
  const { slug } = await params;
  const name = categoryFromSlug(slug);
  if (!name) notFound();

  const category = CATEGORIES.find((c) => c.name === name);
  const section = SECTIONS.find((s) => s.name === name);
  const products = CATEGORY_PRODUCTS[name] || [];

  return (
    <>
      <Breadcrumb category={name} productName={name} />

      <div className="mx-auto max-w-screen-2xl space-y-6 px-4 py-5">
        {section && (
          <div className="relative h-40 overflow-hidden rounded-xl sm:h-52" style={{ background: section.bg }}>
            <Image src={wide(section.img)} alt={name} fill sizes="100vw" className="object-cover opacity-30" />
            <div className="absolute inset-0 flex flex-col justify-center p-6 sm:p-8">
              <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-white/70">Category</p>
              <h1 className="font-display text-2xl font-black text-white sm:text-3xl">{name}</h1>
              <p className="mt-2 max-w-xl text-sm text-white/80">{section.subtitle}</p>
            </div>
          </div>
        )}

        {category && (
          <div className="hide-scrollbar flex gap-2 overflow-x-auto rounded-xl border border-gray-100 bg-white p-3">
            {category.subs.map((sub) => (
              <span key={sub} className="shrink-0 whitespace-nowrap rounded-full bg-gray-50 px-3 py-1.5 text-xs font-medium text-gray-600">
                {sub}
              </span>
            ))}
          </div>
        )}

        <ProductGrid title={`All ${name} Products`} subtitle={`${products.length} products available`} products={products} />
      </div>
    </>
  );
}
