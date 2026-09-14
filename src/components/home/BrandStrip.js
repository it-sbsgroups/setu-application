import { BRANDS } from "@/lib/data/footer";

export default function BrandStrip() {
  return (
    <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
      <p className="mb-4 text-center text-xs font-bold uppercase tracking-widest text-gray-400">Trusted Brands</p>
      <div className="hide-scrollbar flex items-center gap-6 overflow-x-auto pb-1">
        {BRANDS.map((brand) => (
          <button key={brand} type="button" className="shrink-0 whitespace-nowrap text-sm font-black tracking-wide text-gray-300 transition-colors hover:text-gray-600">
            {brand}
          </button>
        ))}
      </div>
    </div>
  );
}
