
import { FOOTER_COLS } from "@/lib/data";
export default function Footer() {
  return (
    <footer className="mt-8 bg-[#1B2B4B]">
      <div className="max-w-screen-2xl mx-auto px-4 pt-12 pb-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-10 gap-x-6 gap-y-8 mb-10">
          {FOOTER_COLS.map(col=>(
            <div key={col.title}><p className="foot-col-title">{col.title}</p>{col.links.map(l=> <a key={l} href="#" className="foot-link">{l}</a>)}</div>
          ))}
        </div>
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-10">
            <div className="shrink-0 flex items-center gap-2"><div className="flex items-baseline leading-none select-none font-display font-black" style={{fontSize:34,letterSpacing:'-0.04em'}}><span className="text-white">S</span><span style={{color:'#84cc16',marginLeft:-5,marginRight:-6,fontSize:27}}>b</span><span className="text-white">S</span></div><div className="text-xs leading-tight" style={{color:'#FF6B35'}}>Industrial<br/>& B2B</div></div>
            <div className="hidden lg:block h-14 w-px bg-white/15"></div>
            <div className="flex-1 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
              <p className="text-xs text-gray-400 leading-relaxed max-w-2xl">India&apos;s leading B2B marketplace for industrial, engineering, and safety products — 10 lakh+ SKUs, 50,000+ verified brands, and same-day dispatch for businesses across the country.</p>
              <div className="flex items-center gap-2 shrink-0 sm:ml-auto">
                {['FB','IG','X','LI','YT'].map(s=><a key={s} href="#" className="soc-btn">{s}</a>)}
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 mt-8 pt-6 flex flex-col md:flex-row items-center justify-between gap-4"><p className="text-xs text-gray-500">© 2024 Setu India Pvt Ltd. All rights reserved.</p><div className="flex items-center gap-3"><span className="text-xs text-gray-500">We accept:</span><span className="text-xs text-gray-400 bg-white/5 px-2 py-1 rounded">Visa</span><span className="text-xs text-gray-400 bg-white/5 px-2 py-1 rounded">UPI</span></div></div>
      </div>
    </footer>
  );
}
