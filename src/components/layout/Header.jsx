
"use client";
import { useState, useRef, useEffect } from "react";
import { useCart } from "./CartContext";
import { useLocationCtx } from "./LocationContext";
import { CATEGORIES, ALL_PRODUCTS, thumb } from "@/lib/data";
import TopTicker from "./TopTicker";
export default function Header() {
  const { count, setIsOpen } = useCart();
  const { location, setIsOpen: setLocOpen } = useLocationCtx();
  const [query, setQuery] = useState("");
  const [showSuggest, setShowSuggest] = useState(false);
  const wrapRef = useRef(null);
  const filtered = query.length > 1 ? ALL_PRODUCTS.filter(p => p.name.toLowerCase().includes(query.toLowerCase())).slice(0,6) : [];
  useEffect(() => {
    const h = (e) => { if (wrapRef.current && !wrapRef.current.contains(e.target)) setShowSuggest(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);
  return (
    <header className="sticky top-0 z-40 shadow-md bg-[#1B2B4B]">
      <TopTicker />
      <div className="max-w-screen-2xl mx-auto px-4 py-2.5 flex items-center gap-3">
        <div className="flex items-center gap-2 shrink-0 cursor-pointer" onClick={() => window.scrollTo({top:0,behavior:'smooth'})}>
          <div className="flex items-baseline leading-none select-none font-display font-black" style={{fontSize:28,letterSpacing:'-0.04em'}}>
            <span className="text-white">S</span><span style={{color:'#84cc16',marginLeft:-4,marginRight:-5,fontSize:22}}>b</span><span className="text-white">S</span>
          </div>
          <div className="text-xs leading-none hidden sm:block" style={{color:'#FF6B35'}}>Industrial & B2B</div>
        </div>
        <button onClick={() => setLocOpen(true)} className="hidden md:flex items-center gap-1.5 shrink-0 hover:bg-white/10 rounded-lg px-2.5 py-1.5 border border-white/20">
          <span className="text-[#FF6B35]">📍</span>
          <div className="text-left"><div className="text-xs text-gray-400 leading-none">Deliver to</div><div className="text-white text-xs font-semibold leading-tight">{location}</div></div>
        </button>
        <div ref={wrapRef} className="flex-1 relative">
          <div className="flex bg-white rounded-lg overflow-hidden shadow-sm">
            <select className="border-r border-gray-200 px-2 py-2 text-xs text-gray-600 bg-gray-50 focus:outline-none hidden md:block max-w-[150px]"><option>All Categories</option>{CATEGORIES.map(c=> <option key={c.name}>{c.name}</option>)}</select>
            <input value={query} onChange={e=>{setQuery(e.target.value); setShowSuggest(true);}} onFocus={()=>setShowSuggest(true)} placeholder="Search for products, brands and categories..." className="flex-1 px-3 py-2 text-sm focus:outline-none text-gray-700 min-w-0" />
            <button className="px-4 flex items-center gap-1.5 text-white font-semibold text-sm bg-[#FF6B35] hover:bg-[#E85A20]">Search</button>
          </div>
          {showSuggest && filtered.length>0 && (
            <div className="absolute top-full mt-2 w-full bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-50 dropdown-animate">
              {filtered.map(p=>(
                <div key={p.id} className="w-full flex items-center gap-3 px-3 py-2 hover:bg-orange-50 text-left"><img src={thumb(p.img)} alt="" className="w-10 h-10 rounded object-cover" /><span className="text-sm text-gray-700 line-clamp-2">{p.name}</span></div>
              ))}
            </div>
          )}
        </div>
        <div className="flex items-center gap-1">
          <button className="hidden md:flex items-center gap-1.5 text-white text-xs px-3 py-2 hover:bg-white/10 rounded-lg">Login</button>
          <button onClick={()=>setIsOpen(true)} className="relative flex items-center gap-1.5 text-white px-3 py-2 hover:bg-white/10 rounded-lg"><span>🛒</span><span className="hidden sm:inline text-xs font-semibold">Cart</span>{count>0 && <span className="absolute -top-1 -right-1 bg-[#FF6B35] text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold">{count}</span>}</button>
        </div>
      </div>
    </header>
  );
}
