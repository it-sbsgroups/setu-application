import { TRUST_BADGES } from "@/lib/data/footer";

export default function TrustBadges() {
  return (
    <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
      {TRUST_BADGES.map((badge) => (
        <div key={badge.title} className="flex items-center gap-3 rounded-lg border border-gray-100 bg-white p-3 shadow-sm">
          <span className="text-2xl" aria-hidden="true">{badge.icon}</span>
          <div>
            <div className="text-sm font-semibold text-gray-800">{badge.title}</div>
            <div className="text-xs text-gray-400">{badge.sub}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
