// src/app/account/page.js
"use client";

import Link from "next/link";
import { useAccount } from "@/context/AccountContext";
import { useCart } from "@/context/CartContext";
import StatusPill from "@/components/account/StatusPill";
import { formatMoney } from "@/lib/format";

export default function AccountDashboard() {
  const { account, findOrder } = useAccount();
  const { count } = useCart();
  if (!account) return null;

  const openOrders = account.orders.filter((o) => !["delivered", "closed", "cancelled"].includes(o.status));
  const inTransit = account.orders.filter((o) => ["dispatched", "in-transit"].includes(o.status));
  const negotiating = account.orders.filter((o) => o.status === "negotiation");
  const openTickets = account.tickets.filter((t) => t.status !== "resolved");

  const recent = account.orders.slice(0, 4);

  const stats = [
    { label: "Open Orders",       value: openOrders.length,    icon: "📦", href: "/account/orders" },
    { label: "In Transit",        value: inTransit.length,     icon: "🚚", href: "/account/orders" },
    { label: "In Negotiation",    value: negotiating.length,   icon: "🤝", href: "/account/negotiations" },
    { label: "Open Tickets",      value: openTickets.length,   icon: "📞", href: "/account/support" },
  ];

  return (
    <div className="space-y-6">
      {/* Verification banner (only when something needs attention) */}
      {(!account.profile.aadharVerified || !account.profile.orgVerified || account.profile.pendingAadharChange) && (
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm">
          <p className="font-bold text-amber-900">⚠️ Action needed</p>
          <p className="mt-1 text-amber-800">
            {account.profile.pendingAadharChange
              ? "You have profile changes pending Aadhaar re-verification."
              : !account.profile.aadharVerified
              ? "Verify your identity via DigiLocker to unlock ordering."
              : "Complete organization verification to unlock bulk procurement."}
          </p>
          <Link href="/account/verification" className="mt-3 inline-block rounded-lg bg-primary px-4 py-2 text-xs font-bold text-white hover:bg-primarydark">
            Go to Verification Center →
          </Link>
        </div>
      )}

      <div>
        <h1 className="font-display text-2xl font-black text-gray-900">Welcome back, {account.profile.name.split(" ")[0]}</h1>
        <p className="mt-1 text-sm text-gray-500">{account.profile.designation} · {account.profile.orgName}</p>
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {stats.map((s) => (
          <Link key={s.label} href={s.href} className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm transition-colors hover:border-primary/40">
            <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-orange-50 text-lg">{s.icon}</div>
            <div className="font-display text-2xl font-black text-gray-900">{s.value}</div>
            <div className="text-xs text-gray-500">{s.label}</div>
          </Link>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.5fr_1fr]">
        {/* Recent orders */}
        <section className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-base font-bold text-gray-900">Recent Orders</h2>
            <Link href="/account/orders" className="text-xs font-semibold text-primary hover:underline">View all →</Link>
          </div>
          {recent.length === 0 ? (
            <p className="py-8 text-center text-sm text-gray-400">No orders yet.</p>
          ) : (
            <ul className="divide-y divide-gray-100">
              {recent.map((o) => (
                <li key={o.orn}>
                  <Link href={`/account/orders/${o.orn}`} className="flex items-center gap-3 py-3 hover:bg-gray-50/60">
                    <div className="min-w-0 flex-1">
                      <p className="font-mono text-xs font-bold text-gray-700">{o.orn}</p>
                      <p className="mt-0.5 truncate text-xs text-gray-500">
                        {o.items.length} item{o.items.length > 1 ? "s" : ""} · {formatMoney(o.lockedTotal ?? o.quotedTotal)}
                      </p>
                    </div>
                    <StatusPill status={o.status} />
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Quick actions */}
        <section className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
          <h2 className="font-display mb-4 text-base font-bold text-gray-900">Quick Actions</h2>
          <div className="grid gap-2">
            <Link href="/categories" className="flex items-center justify-between rounded-lg border border-gray-100 px-3 py-2.5 text-sm hover:border-primary/40">
              <span>🛒 Browse catalogue</span><span className="text-gray-300">›</span>
            </Link>
            <Link href="/bulk-orders" className="flex items-center justify-between rounded-lg border border-gray-100 px-3 py-2.5 text-sm hover:border-primary/40">
              <span>📋 Raise a bulk enquiry</span><span className="text-gray-300">›</span>
            </Link>
            <Link href="/account/team" className="flex items-center justify-between rounded-lg border border-gray-100 px-3 py-2.5 text-sm hover:border-primary/40">
              <span>👥 Invite a team member</span><span className="text-gray-300">›</span>
            </Link>
            <Link href="/account/support" className="flex items-center justify-between rounded-lg border border-gray-100 px-3 py-2.5 text-sm hover:border-primary/40">
              <span>📞 Open a support request</span><span className="text-gray-300">›</span>
            </Link>
            {count > 0 && (
              <div className="mt-1 rounded-lg bg-orange-50 px-3 py-2.5 text-xs font-semibold text-orange-800">
                🛒 You have {count} item{count > 1 ? "s" : ""} in your enquiry cart.
              </div>
            )}
          </div>
        </section>
      </div>

      {/* Latest support ticket */}
      {account.tickets[0] && (
        <section className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-display text-base font-bold text-gray-900">Latest Support Activity</h2>
            <Link href="/account/support" className="text-xs font-semibold text-primary hover:underline">Open support →</Link>
          </div>
          <div className="rounded-lg bg-gray-50 p-3">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-gray-700">{account.tickets[0].id}</span>
              <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                account.tickets[0].status === "resolved" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"
              }`}>{account.tickets[0].status}</span>
            </div>
            <p className="mt-1 text-sm font-semibold text-gray-800">{account.tickets[0].subject}</p>
            <p className="mt-1 line-clamp-2 text-xs text-gray-500">
              {account.tickets[0].messages[account.tickets[0].messages.length - 1]?.text}
            </p>
          </div>
        </section>
      )}
    </div>
  );
}