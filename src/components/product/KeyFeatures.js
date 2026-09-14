export default function KeyFeatures({ features }) {
  if (!features?.length) return null;
  return (
    <div className="rounded-xl border border-gray-100 bg-white p-5">
      <h2 className="font-display mb-3 text-base font-bold text-gray-900">Key Features</h2>
      <ul className="space-y-2">
        {features.map((feature) => (
          <li key={feature} className="flex gap-2 text-sm text-gray-600">
            <span className="mt-0.5 shrink-0 text-primary">●</span>
            {feature}
          </li>
        ))}
      </ul>
    </div>
  );
}
