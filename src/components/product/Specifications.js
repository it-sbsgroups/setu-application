export default function Specifications({ specs }) {
  if (!specs?.length) return null;
  return (
    <div className="rounded-xl border border-gray-100 bg-white p-5">
      <h2 className="font-display mb-3 text-base font-bold text-gray-900">Product Specifications</h2>
      <table className="w-full text-sm">
        <tbody>
          {specs.map((spec, i) => (
            <tr key={spec.label} className={i % 2 === 0 ? "bg-gray-50/60" : ""}>
              <td className="w-1/3 px-3 py-2 align-top text-gray-500">{spec.label}</td>
              <td className="px-3 py-2 font-medium text-gray-800">{spec.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
