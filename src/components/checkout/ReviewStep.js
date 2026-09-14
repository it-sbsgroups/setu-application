"use client";

import Image from "next/image";
import { thumb, formatMoney } from "@/lib/format";
import { PAYMENT_METHODS } from "@/lib/data/checkout";

export default function ReviewStep({
  address,
  payment,
  lines,
  onBack,
  onEditAddress,
  onEditPayment,
  onPlaceOrder,
  placing,
}) {
  const method = PAYMENT_METHODS.find((m) => m.id === payment.method);

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-display text-base font-bold text-gray-900">
            Delivery Address
          </h2>
          <button
            type="button"
            onClick={onEditAddress}
            className="text-xs font-semibold text-primary hover:text-primarydark"
          >
            Edit
          </button>
        </div>
        <p className="text-sm font-semibold text-gray-800">
          {address.name}{" "}
          <span className="ml-1 rounded bg-gray-100 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-gray-500">
            {address.type}
          </span>
        </p>
        <p className="mt-1 text-xs leading-relaxed text-gray-600">
          {address.line1}
          {address.line2 ? `, ${address.line2}` : ""}
          {address.landmark ? `, near ${address.landmark}` : ""}, {address.city},{" "}
          {address.state} — {address.pincode}
        </p>
        <p className="mt-1 text-xs text-gray-500">📞 +91 {address.mobile}</p>
      </div>

      <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-display text-base font-bold text-gray-900">
            Payment Method
          </h2>
          <button
            type="button"
            onClick={onEditPayment}
            className="text-xs font-semibold text-primary hover:text-primarydark"
          >
            Edit
          </button>
        </div>
        <p className="text-sm font-semibold text-gray-800">
          {method?.icon} {method?.title}
        </p>
        <p className="mt-0.5 text-xs text-gray-400">{method?.sub}</p>
      </div>

      <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
        <h2 className="font-display mb-3 text-base font-bold text-gray-900">
          Items ({lines.length})
        </h2>
        <ul className="divide-y divide-gray-100">
          {lines.map(({ product, qty }) => (
            <li key={product.id} className="flex gap-3 py-3 first:pt-0 last:pb-0">
              <Image
                src={thumb(product.img)}
                alt=""
                width={48}
                height={48}
                className="h-12 w-12 shrink-0 rounded-lg bg-gray-50 object-cover"
              />
              <div className="min-w-0 flex-1">
                <p className="line-clamp-2 text-xs leading-snug text-gray-700">
                  {product.name}
                </p>
                <p className="mt-0.5 text-[11px] text-gray-400">
                  Qty {qty} × {formatMoney(product.price)}
                </p>
              </div>
              <div className="shrink-0 text-sm font-semibold text-gray-900">
                {formatMoney(product.price * qty)}
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex justify-between">
        <button
          type="button"
          onClick={onBack}
          disabled={placing}
          className="rounded-lg border border-gray-200 px-5 py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-50 disabled:opacity-50"
        >
          ← Back
        </button>
        <button
          type="button"
          onClick={onPlaceOrder}
          disabled={placing}
          className="rounded-lg bg-primary px-6 py-2.5 text-sm font-bold text-white transition-colors hover:bg-primarydark disabled:cursor-wait disabled:opacity-70"
        >
          {placing ? "Placing Order…" : `Place Order · ${formatMoney(lines.reduce((s, l) => s + l.product.price * l.qty, 0))}`}
        </button>
      </div>
    </div>
  );
}