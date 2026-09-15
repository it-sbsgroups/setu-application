// src/components/account/VerificationBadge.js
export default function VerificationBadge({ kind, verified, pending }) {
  const base = "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-bold";
  if (pending) {
    return (
      <span className={`${base} bg-amber-50 text-amber-700`}>
        ⏳ {kind} verification pending
      </span>
    );
  }
  if (verified) {
    return (
      <span className={`${base} bg-green-50 text-green-700`}>
        ✅ {kind} verified
      </span>
    );
  }
  return (
    <span className={`${base} bg-gray-100 text-gray-600`}>
      ⚠️ {kind} not verified
    </span>
  );
}