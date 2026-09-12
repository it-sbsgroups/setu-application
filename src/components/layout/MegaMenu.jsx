
"use client";
import { useState } from "react";
import { CATEGORIES } from "@/lib/data";
export default function MegaMenu() {
  const [active, setActive] = useState(null);
  const [open, setOpen] = useState(false);
  return (
    <nav className="bg-white border-b border-gray-100 sticky top-[57px] z-30 shadow-sm" onMouseLeave={()=>setOpen(false)}>
      <div className="max-w-screen-2xl mx-auto px-4 flex items-center gap-1 overflow-x-auto hide-scrollbar">
        {CATEGORIES.map(c=>(
          <div key={c.name} onMouseEnter={()=>{setActive(c.name); setOpen(true);}} className="shrink-0">
            <button className={`flex items-center gap-1 px-3 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${active===c.name && open ? 'text-[#FF6B35] border-[#FF6B35] bg-orange-50/50' : 'text-gray-600 border-transparent hover:text-[#FF6B35]'}`}><span>{c.icon}</span>{c.name}</button>
          </div>
        ))}
      </div>
      {open && active && (
        <div className="absolute left-0 right-0 bg-white shadow-2xl border-t border-gray-100 dropdown-animate">
          <div className="max-w-screen-2xl mx-auto px-4 py-6">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {CATEGORIES.filter(c=>c.name===active).map(col=>(
                <div key={col.name}><div className="flex items-center gap-2 mb-2 pb-2 border-b border-gray-100"><span>{col.icon}</span><span className="font-display font-bold text-sm">{col.name}</span></div><ul className="space-y-0.5">{col.subs.map(s=> <li key={s}><a href={`#${col.name}`} className="block text-xs text-gray-500 hover:text-[#FF6B35] py-1 px-1.5 rounded hover:bg-orange-50">{s}</a></li>)}</ul></div>
              ))}
              <div className="col-span-full lg:col-span-2"><div className="bg-[#FFF6F2] rounded-xl p-4"><p className="text-xs font-bold text-[#FF6B35] uppercase tracking-widest mb-2">Quick Access</p><p className="text-sm text-gray-700">Over 10 lakh products across 10 categories — 50,000+ verified brands</p></div></div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
