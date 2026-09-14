import Link from "next/link";
import ProductCard from "@/components/home/ProductCard";

/**
 * A titled block of product cards. `dark` switches the panel to the navy
 * "Trending in Your Area" treatment; everything else stays the plain white card.
 * `viewAllHref`, when provided, turns "View All" into a real link — omitted
 * entirely (rather than a dead button) when there's nowhere for it to go.
 */
export default function ProductGrid({ eyebrow, title, subtitle, products, dark = false, accentClassName = "text-primary", viewAllHref }) {
  return (
    <div className={dark ? "" : "rounded-xl border border-gray-100 bg-white p-5 shadow-sm"}>
      <div className="mb-4 flex items-end justify-between">
        <div>
          {eyebrow && <p className={`mb-1 text-xs font-semibold ${dark ? "text-orange-400" : "text-gray-500"}`}>{eyebrow}</p>}
          <h2 className={`font-display text-xl font-black leading-tight ${dark ? "text-white" : "text-gray-900"}`}>{title}</h2>
          <p className={`mt-0.5 text-xs ${dark ? "text-gray-400" : "text-gray-500"}`}>{subtitle}</p>
        </div>
        {viewAllHref && (
          <Link
            href={viewAllHref}
            className={`flex shrink-0 items-center gap-1 text-sm font-semibold transition-all hover:gap-2 ${accentClassName}`}
          >
            View All <span aria-hidden="true">→</span>
          </Link>
        )}
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
