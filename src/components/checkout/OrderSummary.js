"use client";

import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { thumb, formatMoney } from "@/lib/format";

export default function OrderSummary() {
  const { lines, count, subtotal, savings } = useCart();

  return (
    <aside
      aria-label="Order summary"
      className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm lg:sticky lg:top-24"
    >
      <h2 className="font-display mb-3 text-base font-bold text-gray-900">
        Order Summary
      </h2>

      <div className="mb-4 max-h-56 space-y-3 overflow-y-auto pr-1">
        {lines.map(({ product, qty }) => (
          <div key={product.id} className="flex gap-3">
            <Image
              src={thumb(product.img)}
              alt=""
              width={40}
              height={40}
              className="h-10 w-10 shrink-0 rounded-lg bg-gray-50 object-cover"
            />
            <div className="min-w-0 flex-1">
              <p className="line-clamp-2 text-xs leading-snug text-gray-700">
                {product.name}
              </p>
              <p className="text-[11px] text-gray-400">Qty {qty}</p>
            </div>
            <div className="shrink-0 text-xs font-semibold text-gray-900">
              {formatMoney(product.price * qty)}
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-2 border-t border-gray-100 pt-4 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-500">
            Subtotal ({count} item{count === 1 ? "" : "s"})
          </span>
          <span className="font-semibold">{formatMoney(subtotal)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">You save</span>
          <span className="font-semibold text-green-600">
            {formatMoney(savings)}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Delivery</span>
          <span className="text-right text-xs font-medium text-gray-500">
            As per vendor
          </span>
        </div>
      </div>

      <div className="mt-3 flex justify-between border-t border-gray-100 pt-3 text-base">
        <span className="font-bold">Total</span>
        <span className="font-black">{formatMoney(subtotal)}</span>
      </div>
      <p className="mt-1 text-[11px] text-gray-400">
        GST invoice generated at dispatch. Delivery charges added by vendor if
        free delivery is not supported.
      </p>

      <div className="mt-4 grid grid-cols-2 gap-2 border-t border-gray-100 pt-4 text-[11px] text-gray-500">
        <span>🔄 Replacement-Only</span>
        <span>🧾 GST Invoice</span>
        <span>🔒 End-to-End Encrypted</span>
        <span>📞 10 AM–6 PM Support</span>
      </div>
    </aside>
  );
}