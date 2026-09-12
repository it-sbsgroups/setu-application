import ProductCard from "@/components/ui/ProductCard";
export default function SectionGrid({ title, subtitle, products, dark=false }) {
  return (
    <section className="max-w-screen-2xl mx-auto px-4 py-6">
      <div className={`${dark ? 'rounded-xl overflow-hidden p-5' : 'bg-white rounded-xl p-5 shadow-sm border border-gray-100'}`} style={dark?{background:'linear-gradient(135deg,#1B2B4B 0%,#2A4070 100%)'}:undefined}>
        <div className="flex items-end justify-between mb-4"><div><h2 className={`text-xl font-black font-display leading-tight ${dark?'text-white':'text-gray-900'}`}>{title}</h2><p className={`text-xs mt-0.5 ${dark?'text-gray-400':'text-gray-500'}`}>{subtitle}</p></div><button className={`text-sm font-semibold ${dark?'text-orange-400':'text-[#FF6B35]'}`}>View All →</button></div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">{products.map(p=><ProductCard key={p.id} product={p} />)}</div>
      </div>
    </section>
  );
}
