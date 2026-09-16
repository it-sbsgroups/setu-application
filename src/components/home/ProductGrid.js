import Link from "next/link";
import ProductCard from "@/components/home/ProductCard";

/**
 * A titled block of product cards. `dark` switches the panel to the navy
 * "Trending in Your Area" treatment; everything else stays the plain white card.
 * `viewAllHref`, when provided, turns "View All" into a real link — omitted
 * entirely (rather than a dead button) when there's nowhere for it to go.
 */
export default function ProductGrid({
  eyebrow,
  title,
  subtitle,
  products,
  dark = false,
  accentClassName = "text-primary",
  viewAllHref,
}) {
  return (
    <div
      className={
        dark ? "" : "rounded-xl border border-gray-100 bg-white p-3 shadow-sm sm:p-5"
      }
    >
      <div className="mb-3 flex items-end justify-between gap-2 sm:mb-4">
        <div className="min-w-0">
          {eyebrow && (
            <p
              className={`mb-0.5 text-[10px] font-semibold sm:text-xs ${
                dark ? "text-orange-400" : "text-gray-500"
              }`}
            >
              {eyebrow}
            </p>
          )}
          <h2
            className={`font-display text-base font-black leading-tight sm:text-xl ${
              dark ? "text-white" : "text-gray-900"
            }`}
          >
            {title}
          </h2>
          {subtitle && (
            <p
              className={`mt-0.5 line-clamp-1 text-[11px] sm:text-xs ${
                dark ? "text-gray-400" : "text-gray-500"
              }`}
            >
              {subtitle}
            </p>
          )}
        </div>
        {viewAllHref && (
          <Link
            href={viewAllHref}
            className={`flex shrink-0 items-center gap-1 text-xs font-semibold transition-all hover:gap-2 sm:text-sm ${accentClassName}`}
          >
            View All <span aria-hidden="true">→</span>
          </Link>
        )}
      </div>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 md:grid-cols-4 lg:grid-cols-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}