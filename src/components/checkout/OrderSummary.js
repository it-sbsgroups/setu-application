"use client";

import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { thumb, formatMoney } from "@/lib/format";

export default function OrderSummary() {
  const { lines, count } = useCart();

  const totalLow = lines.reduce((s, l) => s + l.product.price * l.qty, 0);
  const totalHigh = lines.reduce((s, l) => s + l.product.orig * l.qty, 0);

  return (
    <aside
      aria-label="Quotation summary"
      className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm lg:sticky lg:top-24"
    >
      <h2 className="font-display mb-3 text-base font-bold text-gray-900">
        Quotation Summary
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
            <div className="shrink-0 text-right text-xs font-semibold text-gray-900">
              <div>{formatMoney(product.price)}</div>
              <div className="text-[10px] font-normal text-gray-400">
                – {formatMoney(product.orig)}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-2 border-t border-gray-100 pt-4 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-500">
            Items ({count})
          </span>
          <span className="text-right text-xs font-semibold text-gray-700">
            {formatMoney(totalLow)} – {formatMoney(totalHigh)}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Quotation value</span>
          <span className="text-right text-xs font-medium text-gray-500">
            Highest of range
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Delivery</span>
          <span className="text-right text-xs font-medium text-gray-500">
            As per vendor
          </span>
        </div>
      </div>

      <div className="mt-3 border-t border-gray-100 pt-3">
        <div className="flex justify-between text-base">
          <span className="font-bold">Quoted Total</span>
          <span className="font-black">{formatMoney(totalHigh)}</span>
        </div>
        <p className="mt-1 text-[10px] leading-relaxed text-gray-400">
          Final price may reduce after negotiation. Delivery charges as per
          vendor (free only if vendor supports it).
        </p>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2 border-t border-gray-100 pt-4 text-[11px] text-gray-500">
        <span>🤝 Negotiable</span>
        <span>🧾 GST Invoice</span>
        <span>🔒 End-to-End Encrypted</span>
        <span>📞 10 AM–6 PM Support</span>
      </div>
    </aside>
  );
}