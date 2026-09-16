import Link from "next/link";
import { BRANDS } from "@/lib/data/brands";

export default function BrandStrip() {
  return (
    <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm sm:p-5">
      <div className="mb-4 flex items-end justify-between gap-2">
        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 sm:text-xs">
          Trusted Brands
        </p>
        <Link
          href="/brands"
          className="text-xs font-semibold text-primary hover:underline"
        >
          View all →
        </Link>
      </div>

      <div className="hide-scrollbar -mx-1 flex items-center gap-2 overflow-x-auto px-1 pb-1 sm:gap-4">
        {BRANDS.map((brand) => (
          <Link
            key={brand.slug}
            href={`/brand/${brand.slug}`}
            className="shrink-0 whitespace-nowrap rounded-lg border border-gray-100 px-3 py-2 text-xs font-black tracking-wide text-gray-400 transition-colors hover:border-primary/40 hover:text-primary sm:text-sm"
          >
            {brand.displayName}
          </Link>
        ))}
      </div>
    </div>
  );
}