const POLICIES = [
  {
    icon: "🔄",
    title: "Replacement Only",
    sub: "No returns — wrong/damaged items replaced free",
  },
  {
    icon: "⚖️",
    title: "Vendor Accountability",
    sub: "Instant action against vendors at fault",
  },
  {
    icon: "🛡️",
    title: "Pre & Post-Warranty",
    sub: "Full support before and after warranty",
  },
  {
    icon: "📞",
    title: "Tele-Caller Support",
    sub: "10 AM – 6 PM · all working days",
  },
];

export default function ReturnPolicy() {
  return (
    <div className="rounded-xl border border-gray-100 bg-white p-5">
      <h2 className="font-display mb-2 text-base font-bold text-gray-900">
        Replacement &amp; Support Policy
      </h2>

      <p className="mb-4 text-sm leading-relaxed text-gray-600">
        We don&apos;t accept returns. If you receive a <strong>wrong, damaged, or defective item</strong>,
        we replace it free of cost — so the burden of resolving the issue never falls on you.
        Vendors found responsible face <strong>instant action</strong> under our seller agreement.
      </p>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {POLICIES.map((policy) => (
          <div
            key={policy.title}
            className="rounded-lg bg-gray-50/60 p-3 text-center"
          >
            <div className="mb-1 text-xl">{policy.icon}</div>
            <div className="text-xs font-semibold text-gray-700">
              {policy.title}
            </div>
            <div className="mt-0.5 text-[11px] text-gray-400">{policy.sub}</div>
          </div>
        ))}
      </div>
    </div>
  );
}