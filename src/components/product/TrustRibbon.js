const STATS = [
  { value: "4.7★", label: "Avg. Rating" },
  { value: "50+ Lac", label: "Orders Delivered" },
  { value: "10–6 PM", label: "Support Hours" },
];

const GUARANTEES = [
  "🔄 Replacement-Only Policy",
  "🧾 GST Invoice",
  "🔒 End-to-End Encrypted",
  "📞 10 AM–6 PM Support",
];

export default function TrustRibbon() {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-100 bg-white">
      <div className="flex items-center justify-between gap-3 border-b border-gray-100 px-5 py-3">
        <span className="text-xs font-bold text-gray-700">🛡️ India&apos;s Leading B2B Online Store</span>
        <span className="text-[11px] text-gray-400">Trusted by 3 Cr+ Members</span>
      </div>
      <div className="grid grid-cols-3 divide-x divide-gray-100 px-5 py-3">
        {STATS.map((stat) => (
          <div key={stat.label} className="text-center">
            <div className="text-sm font-black text-gray-900">{stat.value}</div>
            <div className="text-[11px] text-gray-400">{stat.label}</div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-2 bg-navy px-5 py-3 text-[11px] font-medium text-white sm:grid-cols-4">
        {GUARANTEES.map((g) => (
          <span key={g} className="text-center">{g}</span>
        ))}
      </div>
    </div>
  );
}
