"use client";

import Link from "next/link";
import { useUI } from "@/context/UIContext";
import { formatMoney } from "@/lib/format";

export default function OrderSuccess({ order, address, payment }) {
  const { openTrack } = useUI();

  const etaLabel = new Date(order.eta).toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "short",
  });

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <div className="rounded-2xl border border-gray-100 bg-white p-6 text-center shadow-sm sm:p-8">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-50 text-3xl">
          ✅
        </div>
        <h1 className="font-display text-2xl font-black text-gray-900">
          Order Placed Successfully!
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Thanks{address?.name ? `, ${address.name.split(" ")[0]}` : ""} — your
          order has been confirmed and will be dispatched shortly.
        </p>

        <div className="mt-5 rounded-xl border border-orange-100 bg-orange-50/60 p-4">
          <p className="text-[11px] font-bold uppercase tracking-wider text-orange-700">
            Order Reference Number (ORN)
          </p>
          <p className="mt-1 font-mono text-xl font-black tracking-wider text-gray-900">
            {order.orn}
          </p>
          <p className="mt-1 text-[11px] text-gray-500">
            Save this — you&apos;ll need it to track your order.
          </p>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3 text-left">
          <div className="rounded-lg bg-gray-50 p-3">
            <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
              Expected Delivery
            </p>
            <p className="mt-0.5 text-sm font-semibold text-gray-800">
              {etaLabel}
            </p>
          </div>
          <div className="rounded-lg bg-gray-50 p-3">
            <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
              Total Paid
            </p>
            <p className="mt-0.5 text-sm font-semibold text-gray-800">
              {formatMoney(order.total)}
            </p>
          </div>
        </div>

        <div className="mt-5 rounded-xl border border-gray-100 p-4 text-left">
          <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
            Delivering To
          </p>
          <p className="mt-1 text-xs leading-relaxed text-gray-600">
            {address.line1}
            {address.line2 ? `, ${address.line2}` : ""}, {address.city},{" "}
            {address.state} — {address.pincode}
          </p>
        </div>

        <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-center">
          <button
            type="button"
            onClick={() => openTrack(order.orn)}
            className="rounded-lg bg-primary px-6 py-2.5 text-sm font-bold text-white transition-colors hover:bg-primarydark"
          >
            Track Order
          </button>
          <Link
            href="/"
            className="rounded-lg border border-gray-200 px-6 py-2.5 text-sm font-bold text-gray-700 transition-colors hover:bg-gray-50"
          >
            Continue Shopping
          </Link>
        </div>

        <p className="mt-5 text-[11px] leading-relaxed text-gray-400">
          📞 Our tele-caller team will contact you during 10 AM – 6 PM for
          delivery coordination. For any issue, we operate on a
          replacement-only policy — wrong or damaged items are replaced free of
          cost.
        </p>
      </div>
    </div>
  );
}