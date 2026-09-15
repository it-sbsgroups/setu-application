"use client";

import Link from "next/link";
import { useUI } from "@/context/UIContext";
import { formatMoney } from "@/lib/format";

export default function OrderPlacedScreen({ order, address, contact, locked, lines }) {
  const { openTrack } = useUI();

  const total = locked?.total ?? lines.reduce((s, l) => s + l.product.orig * l.qty, 0);

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <div className="rounded-2xl border border-gray-100 bg-white p-6 text-center shadow-sm sm:p-8">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-50 text-3xl">
          ✅
        </div>
        <h1 className="font-display text-2xl font-black text-gray-900">
          Order Confirmed!
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Thanks{address?.name ? `, ${address.name.split(" ")[0]}` : ""} — your
          order is now locked and will be scheduled for dispatch.
        </p>

        <div className="mt-5 rounded-xl border border-orange-100 bg-orange-50/60 p-4">
          <p className="text-[11px] font-bold uppercase tracking-wider text-orange-700">
            Order Reference Number (ORN)
          </p>
          <p className="mt-1 font-mono text-xl font-black tracking-wider text-gray-900">
            {order.orn}
          </p>
          <p className="mt-1 text-[11px] text-gray-500">
            Confirmed via {order.method === "po" ? "Legal Purchase Order" : "Email OTP"}
          </p>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3 text-left">
          <div className="rounded-lg bg-gray-50 p-3">
            <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
              Total Locked
            </p>
            <p className="mt-0.5 text-sm font-semibold text-gray-800">
              {formatMoney(total)}
            </p>
          </div>
          <div className="rounded-lg bg-gray-50 p-3">
            <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
              Quotation ID
            </p>
            <p className="mt-0.5 font-mono text-xs font-semibold text-gray-800">
              {order.quoteId}
            </p>
          </div>
        </div>

        <div className="mt-5 rounded-xl border border-gray-100 p-4 text-left">
          <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
            Confirmation Sent To
          </p>
          <p className="mt-1 text-xs leading-relaxed text-gray-600">
            {contact?.email} · +91 {address?.mobile}
          </p>
        </div>

        <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-center">
          <button
            type="button"
            onClick={() => openTrack(order.orn)}
            className="rounded-lg bg-primary px-6 py-2.5 text-sm font-bold text-white hover:bg-primarydark"
          >
            Track Order
          </button>
          <Link
            href="/"
            className="rounded-lg border border-gray-200 px-6 py-2.5 text-sm font-bold text-gray-700 hover:bg-gray-50"
          >
            Continue Browsing
          </Link>
        </div>

        <p className="mt-5 text-[11px] leading-relaxed text-gray-400">
          📞 Our tele-caller team will coordinate delivery during 10 AM – 6 PM
          on working days. Replacement-only policy applies — wrong or damaged
          items are replaced free of cost.
        </p>
      </div>
    </div>
  );
}