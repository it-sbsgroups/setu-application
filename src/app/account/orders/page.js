// src/app/account/orders/page.js
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useAccount } from "@/context/AccountContext";
import StatusPill from "@/components/account/StatusPill";
import { formatMoney } from "@/lib/format";

const FILTERS = [
  { id: "all",         label: "All" },
  { id: "open",        label: "Open",       test: (s) => !["delivered", "closed", "cancelled"].includes(s) },
  { id: "negotiation", label: "Negotiating", test: (s) => s === "negotiation" },
  { id: "awaiting-po", label: "Awaiting PO", test: (s) => s === "awaiting-po" },
  { id: "in-transit",  label: "In Transit",  test: (s) => ["dispatched", "in-transit"].includes(s) },
  { id: "delivered",   label: "Delivered",   test: (s) => s === "delivered" },
];

export default function OrdersPage() {
  const { account } = useAccount();
  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState("");

  const visible = useMemo(() => {
    if (!account) return [];
    let list = account.orders;
    const f = FILTERS.find((x) => x.id === filter);
    if (f?.test) list = list.filter((o) => f.test(o.status));
    const q = query.trim().toLowerCase();
    if (q) list = list.filter((o) =>
      o.orn.toLowerCase().includes(q) ||
      o.quoteId.toLowerCase().includes(q) ||
      (o.poNumber || "").toLowerCase().includes(q) ||
      o.items.some((l) => l.product.name.toLowerCase().includes(q))
    );
    return list;
  }, [account, filter, query]);

  if (!account) return null;

  return (
    <div className="space-y-5">
      <div>
        <h1 className="font-display text-2xl font-black text-gray-900">Your Orders</h1>
        <p className="mt-1 text-sm text-gray-500">Every RFQ, negotiation, PO and delivery — in one timeline.</p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="hide-scrollbar flex gap-1.5 overflow-x-auto">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`shrink-0 rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${
                filter === f.id
                  ? "border-primary bg-orange-50 text-primary"
                  : "border-gray-200 text-gray-600 hover:border-gray-300"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search ORN, quote, PO or product…"
          className="checkout-input flex-1 sm:max-w-xs"
        />
      </div>

      {visible.length === 0 ? (
        <div className="rounded-xl border border-gray-100 bg-white py-16 text-center shadow-sm">
          <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-orange-50 text-2xl">📦</div>
          <p className="text-sm font-semibold text-gray-700">No orders match this filter</p>
          <p className="mt-1 text-xs text-gray-400">Try a different filter or start a new RFQ from the catalogue.</p>
          <Link href="/categories" className="mt-4 inline-block rounded-lg bg-primary px-5 py-2 text-xs font-bold text-white hover:bg-primarydark">
            Browse Catalogue
          </Link>
        </div>
      ) : (
        <ul className="space-y-3">
          {visible.map((o) => (
            <li key={o.orn}>
              <Link
                href={`/account/orders/${o.orn}`}
                className="block rounded-xl border border-gray-100 bg-white p-4 shadow-sm transition-colors hover:border-primary/40"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-xs font-bold text-gray-800">{o.orn}</span>
                      <StatusPill status={o.status} />
                    </div>
                    <p className="mt-1.5 text-xs text-gray-500">
                      Placed {new Date(o.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                      {o.poNumber && <> · PO {o.poNumber}</>}
                      {o.negotiationId && <> · Negotiation {o.negotiationId}</>}
                    </p>
                    <p className="mt-2 line-clamp-1 text-sm text-gray-700">
                      {o.items.map((l) => l.product.name).join(" · ")}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-[11px] text-gray-400">{o.lockedTotal ? "Locked" : "Quoted"}</p>
                    <p className="font-display text-lg font-black text-gray-900">{formatMoney(o.lockedTotal ?? o.quotedTotal)}</p>
                    <p className="text-[11px] text-gray-400">{o.items.length} item{o.items.length > 1 ? "s" : ""}</p>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}