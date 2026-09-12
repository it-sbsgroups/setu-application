import { BRANDS, MID_BANNERS } from "@/lib/data";
export function BrandStrip() {
  return (
    <section className="max-w-screen-2xl mx-auto px-4 py-4"><div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100"><p className="text-xs font-bold text-gray-400 uppercase tracking-widest text-center mb-4">Trusted Brands</p><div className="flex items-center gap-6 overflow-x-auto pb-1 hide-scrollbar">{BRANDS.map(b=> <div key={b} className="shrink-0 text-sm font-black text-gray-500 tracking-wide border border-gray-100 px-4 py-2 rounded-lg bg-gray-50">{b}</div>)}</div></div></section>
  );
}
export function MidBanners() {
  return (
    <section className="max-w-screen-2xl mx-auto px-4 py-4"><div className="grid grid-cols-1 md:grid-cols-3 gap-4">{MID_BANNERS.map(b=><div key={b.title} className="rounded-xl p-5 text-white" style={{background:b.bg}}><h3 className="font-black font-display text-lg">{b.title}</h3><p className="text-sm text-white/80 mt-1">{b.sub}</p></div>)}</div></section>
  );
}
