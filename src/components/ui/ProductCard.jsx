"use client";
import { thumb } from "@/lib/data";
import { formatRange } from "@/lib/utils";
import { useCart } from "@/components/layout/CartContext";
function Stars({ r }) {
  return <div className="flex items-center gap-0.5">{[1,2,3,4,5].map(i=>{const cls=i<=Math.floor(r)?'text-amber-400':(i-0.5<=r?'text-amber-300':'text-gray-300');return <span key={i} className={cls} style={{fontSize:11}}>★</span>;})}</div>;
}
export default function ProductCard({ product }) {
  const { add } = useCart();
  return (
    <div className="product-card group bg-white rounded-lg border border-gray-100 overflow-hidden flex flex-col hover:shadow-md transition-shadow">
      <div className="relative overflow-hidden bg-gray-50 h-40">
        <img src={thumb(product.img)} alt={product.name} loading="lazy" className="product-img w-full h-full object-cover transition-transform duration-300" />
        {product.badge && <span className="absolute top-2 left-2 text-white font-semibold px-1.5 py-0.5 rounded text-[11px] bg-[#FF6B35]">{product.badge}</span>}
      </div>
      <div className="p-3 flex flex-col flex-1">
        <h3 className="text-xs text-gray-700 leading-tight line-clamp-2 mb-2 flex-1 font-medium">{product.name}</h3>
        <div className="flex items-center gap-1 mb-1"><Stars r={product.rating} /><span className="text-xs text-gray-400">({product.reviews.toLocaleString('en-IN')})</span></div>
        <div className="mb-2"><div className="text-[10px] uppercase tracking-wide text-gray-400 font-semibold">Price range</div><div className="font-bold text-sm text-gray-900">{formatRange(product)}</div></div>
        <button onClick={()=>add(product)} className="mt-1 w-full text-xs font-semibold py-1.5 rounded text-white bg-[#FF6B35] hover:bg-[#E85A20]">Add to Cart</button>
      </div>
    </div>
  );
}
