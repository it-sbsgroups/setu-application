import ProductCard from "@/components/ui/ProductCard";
import { thumb } from "@/lib/data";
export default function CategorySection({ section }) {
  return (
    <section id={section.name} className="max-w-screen-2xl mx-auto px-4 py-4 scroll-mt-28">
      <div className="rounded-xl overflow-hidden shadow-sm border border-gray-100">
        <div className="p-6 flex flex-col md:flex-row items-start md:items-center gap-6" style={{background:section.bg}}>
          <img src={thumb(section.img)} alt={section.name} loading="lazy" className="w-24 h-24 rounded-xl object-cover shrink-0" />
          <div className="flex-1 text-white"><div className="text-xs font-bold tracking-widest text-white/60 uppercase mb-1">{section.tagline}</div><h2 className="text-2xl font-black font-display leading-tight">{section.title}</h2><p className="text-sm text-white/70 mt-1">{section.subtitle}</p></div>
          <div className="flex flex-wrap gap-2">{section.features.map(f=> <span key={f} className="text-xs px-2.5 py-1 rounded-full bg-white/15 text-white border border-white/10">{f}</span>)}</div>
        </div>
        <div className="bg-white p-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">{section.products.map(p=><ProductCard key={p.id} product={p} />)}</div>
      </div>
    </section>
  );
}
