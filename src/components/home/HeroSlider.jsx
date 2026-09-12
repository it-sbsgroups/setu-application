"use client";
import { useState, useEffect } from "react";
import { HERO_SLIDES, thumb } from "@/lib/data";
export default function HeroSlider() {
  const [idx, setIdx] = useState(0);
  useEffect(()=>{const t=setInterval(()=>setIdx(i=>(i+1)%HERO_SLIDES.length),5000);return()=>clearInterval(t);},[]);
  const s = HERO_SLIDES[idx];
  return (
    <section className="max-w-screen-2xl mx-auto px-4 py-4">
      <div className="flex gap-4">
        <div className="relative rounded-xl overflow-hidden flex-1 h-72 transition-all duration-700" style={{background:s.bg}}>
          <div className="absolute inset-0 flex items-center p-6 sm:p-8">
            <div className="flex-1 z-10"><span className="inline-block text-[10px] font-bold tracking-widest px-2 py-1 rounded bg-white/20 text-white mb-3">{s.badge}</span><h1 className="text-3xl sm:text-4xl font-black text-white font-display leading-tight mb-2">{s.title}</h1><p className="text-sm text-white/80 mb-4 max-w-md">{s.sub}</p><button className="px-5 py-2 rounded-lg bg-white text-gray-900 text-sm font-semibold hover:bg-gray-100">{s.cta}</button></div>
            <img src={thumb(s.img)} alt="" className="hidden sm:block w-48 h-48 object-cover rounded-xl opacity-80" />
          </div>
          <button onClick={()=>setIdx((idx-1+HERO_SLIDES.length)%HERO_SLIDES.length)} className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/20 hover:bg-white/40 rounded-full flex items-center justify-center text-white backdrop-blur-sm">‹</button>
          <button onClick={()=>setIdx((idx+1)%HERO_SLIDES.length)} className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/20 hover:bg-white/40 rounded-full flex items-center justify-center text-white backdrop-blur-sm">›</button>
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">{HERO_SLIDES.map((_,i)=><button key={i} onClick={()=>setIdx(i)} className={`w-2 h-2 rounded-full transition-all ${i===idx?'bg-white w-6':'bg-white/50'}`} />)}</div>
        </div>
        <div className="hidden lg:flex flex-col gap-3 w-56"><div className="flex-1 rounded-xl p-3 flex flex-col justify-end text-white" style={{background:'linear-gradient(135deg,#7C3AED 0%,#4F46E5 100%)'}}><div className="text-xs font-bold text-yellow-300">FLAT 30% OFF</div><div className="text-sm font-black font-display">PPE Safety Gear</div><div className="text-xs text-white/70 mt-0.5">Shop Now →</div></div><div className="flex-1 rounded-xl p-3 flex flex-col justify-end text-white" style={{background:'linear-gradient(135deg,#0F766E 0%,#0D9488 100%)'}}><div className="text-xs font-bold text-yellow-300">NEW ARRIVALS</div><div className="text-sm font-black font-display">Hand Tools 2024</div><div className="text-xs text-white/70 mt-0.5">Explore →</div></div></div>
      </div>
    </section>
  );
}
