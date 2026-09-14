import Link from "next/link";
import { CATEGORIES, slugifyCategory } from "@/lib/data/categories";
import { CATEGORY_PRODUCTS } from "@/lib/data/products";
import { SITE_URL, SITE_NAME } from "@/lib/seo";

export const metadata = {
  title: "Shop by Category",
  description: `Browse every product category on ${SITE_NAME} — power tools, safety & PPE, electrical, plumbing, fasteners, welding and more.`,
  alternates: { canonical: "/categories" },
  openGraph: { type: "website", url: `${SITE_URL}/categories` },
};

export default function CategoriesPage() {
  return (
    <div className="mx-auto max-w-screen-2xl px-4 py-6">
      <div className="mb-6">
        <h1 className="font-display text-2xl font-black text-gray-900">Shop by Category</h1>
        <p className="mt-1 text-sm text-gray-500">Over 10 lakh products across {CATEGORIES.length} categories — 50,000+ verified brands</p>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {CATEGORIES.map((c) => (
          <Link
            key={c.name}
            href={`/category/${slugifyCategory(c.name)}`}
            className="group flex flex-col items-center gap-2 rounded-xl border border-gray-100 bg-white p-5 text-center transition-colors hover:border-primary hover:bg-orange-50/40"
          >
            <span className="text-3xl">{c.icon}</span>
            <span className="text-sm font-semibold text-gray-800 group-hover:text-primary">{c.name}</span>
            <span className="text-xs text-gray-400">{(CATEGORY_PRODUCTS[c.name] || []).length} products</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
