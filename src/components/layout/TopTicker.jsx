
import { TICKER_ITEMS } from "@/lib/data";
export default function TopTicker() {
  return (
    <div className="text-xs py-1 overflow-hidden bg-[#FF6B35] text-white">
      <div className="ticker-inner flex whitespace-nowrap">
        {[...TICKER_ITEMS, ...TICKER_ITEMS].map((t,i) => (
          <span key={i} className="mr-12 font-medium whitespace-nowrap">{t}</span>
        ))}
      </div>
    </div>
  );
}
