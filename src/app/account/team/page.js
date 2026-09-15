// src/app/account/team/page.js
"use client";

import { useState } from "react";
import { useAccount } from "@/context/AccountContext";
import { useUI } from "@/context/UIContext";

const PERMS = [
  { id: "viewOrders",         label: "View all orders" },
  { id: "monitorDeliveries",  label: "Monitor deliveries" },
  { id: "negotiate",          label: "Participate in negotiations" },
  { id: "approvePO",          label: "Approve / upload PO" },
];

export default function TeamPage() {
  const { account, inviteTeamMember, updateTeamMember, removeTeamMember } = useAccount();
  const { showToast } = useUI();
  const [showInvite, setShowInvite] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", mobile: "", role: "" });

  if (!account) return null;

  function handleInvite() {
    if (!form.name.trim() || !form.email.trim()) return showToast("Name and email are required");
    inviteTeamMember({
      name: form.name.trim(),
      email: form.email.trim(),
      mobile: form.mobile.trim(),
      role: form.role.trim() || "Team member",
    });
    setShowInvite(false);
    setForm({ name: "", email: "", mobile: "", role: "" });
    showToast(`Invite sent to ${form.email}`);
  }

  function togglePerm(memberId, permId, value) {
    const member = account.team.find((m) => m.id === memberId);
    updateTeamMember(memberId, { permissions: { ...member.permissions, [permId]: value } });
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-black text-gray-900">Team & Access</h1>
          <p className="mt-1 text-sm text-gray-500">Invite colleagues to monitor deliveries, join negotiations, or approve POs.</p>
        </div>
        <button onClick={() => setShowInvite((v) => !v)} className="rounded-lg bg-primary px-5 py-2.5 text-sm font-bold text-white hover:bg-primarydark">
          + Invite Member
        </button>
      </div>

      {showInvite && (
        <section className="rounded-xl border border-primary/30 bg-orange-50/40 p-5 shadow-sm">
          <h2 className="font-display mb-3 text-base font-bold text-gray-900">Invite a team member</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            <input value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} placeholder="Full name" className="checkout-input" />
            <input value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} placeholder="Work email" type="email" className="checkout-input" />
            <input value={form.mobile} onChange={(e) => setForm((f) => ({ ...f, mobile: e.target.value.replace(/\D/g, "").slice(0, 10) }))} placeholder="Mobile (optional)" inputMode="numeric" className="checkout-input" />
            <input value={form.role} onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))} placeholder="Role (e.g. Finance Lead)" className="checkout-input" />
          </div>
          <p className="mt-3 text-[11px] text-gray-500">An invite email will be sent. Permissions can be adjusted after they accept.</p>
          <div className="mt-3 flex gap-2">
            <button onClick={handleInvite} className="rounded-lg bg-primary px-5 py-2 text-xs font-bold text-white hover:bg-primarydark">Send invite</button>
            <button onClick={() => setShowInvite(false)} className="rounded-lg border border-gray-200 px-5 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-50">Cancel</button>
          </div>
        </section>
      )}

      <ul className="space-y-3">
        {account.team.map((m) => (
          <li key={m.id} className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-navy text-sm font-black text-white">
                  {m.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-sm font-bold text-gray-900">{m.name}</p>
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                      m.status === "active" ? "bg-green-50 text-green-700" : "bg-amber-50 text-amber-700"
                    }`}>{m.status === "active" ? "Active" : "Invite pending"}</span>
                  </div>
                  <p className="mt-0.5 text-xs text-gray-500">{m.role} · {m.email}</p>
                  {m.mobile && <p className="text-[11px] text-gray-400">📞 +91 {m.mobile}</p>}
                </div>
              </div>
              <button onClick={() => removeTeamMember(m.id)} className="text-xs font-semibold text-gray-400 hover:text-red-500">Remove</button>
            </div>

            <div className="mt-4 border-t border-gray-100 pt-4">
              <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-gray-500">Permissions</p>
              <div className="grid gap-2 sm:grid-cols-2">
                {PERMS.map((p) => {
                  const checked = !!m.permissions[p.id];
                  return (
                    <label key={p.id} className="flex items-center gap-2 text-xs text-gray-700">
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={(e) => togglePerm(m.id, p.id, e.target.checked)}
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                      />
                      {p.label}
                    </label>
                  );
                })}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}