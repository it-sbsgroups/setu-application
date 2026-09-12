import { TRUST_BADGES } from "@/lib/data";
export default function TrustBadges() {
  return (
    <div className="max-w-screen-2xl mx-auto px-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {TRUST_BADGES.map(b=>(
          <div key={b.title} className="bg-white rounded-xl p-4 flex items-center gap-3 border border-gray-100 shadow-sm"><div className="text-2xl">{b.icon}</div><div><div className="text-sm font-bold text-gray-900">{b.title}</div><div className="text-xs text-gray-500">{b.sub}</div></div></div>
        ))}
      </div>
    </div>
  );
}
