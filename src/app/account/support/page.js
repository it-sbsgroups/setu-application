"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useAccount } from "@/context/AccountContext";
import { useUI } from "@/context/UIContext";
import { formatMoney, thumb } from "@/lib/format";
import Image from "next/image";

const PRIORITIES = [
  { id: "normal", label: "Normal", tone: "bg-gray-100 text-gray-700" },
  { id: "high",   label: "High",   tone: "bg-amber-100 text-amber-700" },
  { id: "urgent", label: "Urgent", tone: "bg-red-100 text-red-700" },
];

const EMPTY_FORM = {
  subject: "",
  orderOrn: "",
  productId: "",
  priority: "normal",
  message: "",
};

export default function SupportPage() {
  const searchParams = useSearchParams();
  const prefillOrn = searchParams.get("orn") || "";
  const prefillProductId = searchParams.get("productId") || "";

  const { account, createTicket, replyToTicket } = useAccount();
  const { showToast } = useUI();

  const [activeId, setActiveId] = useState(null);
  const [form, setForm] = useState(() => ({
    ...EMPTY_FORM,
    orderOrn: prefillOrn,
    productId: prefillProductId,
  }));
  const [reply, setReply] = useState("");
  const endRef = useRef(null);

  const active = useMemo(
    () => account?.tickets.find((t) => t.id === activeId) || account?.tickets[0],
    [account, activeId]
  );

  // Selected order for the create-ticket form
  const selectedOrder = useMemo(
    () => account?.orders.find((o) => o.orn === form.orderOrn),
    [account, form.orderOrn]
  );

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [active?.messages.length]);

  if (!account) return null;

  function updateForm(patch) {
    setForm((f) => ({ ...f, ...patch }));
  }

  function handleOrderChange(orn) {
    // Reset the product picker whenever the order changes
    updateForm({ orderOrn: orn, productId: "" });
  }

  function handleCreate() {
    if (!form.subject.trim() || form.subject.trim().length < 4)
      return showToast("Add a subject (min 4 chars)");
    if (form.message.trim().length < 8)
      return showToast("Describe the issue (min 8 chars)");

    createTicket({
      subject: form.subject.trim(),
      orderOrn: form.orderOrn || null,
      productId: form.productId ? Number(form.productId) : null,
      priority: form.priority,
      message: form.message.trim(),
    });
    setForm(EMPTY_FORM);
    showToast("Ticket created — our team will respond shortly");
  }

  function handleReply() {
    const text = reply.trim();
    if (!text || !active) return;
    replyToTicket(active.id, "user", text);
    setReply("");
    setTimeout(() => {
      replyToTicket(
        active.id,
        "agent",
        "Thanks — I've updated your ticket and will follow up within a few hours.",
        "Apurva · Support"
      );
    }, 1000);
  }

  function handleCall() {
    showToast("Connecting to a support specialist…");
    setTimeout(() => showToast("📞 Line busy — we'll call you back within 5 minutes"), 1800);
  }

  return (
    <div className="space-y-5">
      {/* Page header */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-black text-gray-900">Support</h1>
          <p className="mt-1 text-sm text-gray-500">
            Chat, call, or raise a ticket for any order — we&apos;re here 10 AM – 6 PM on working days.
          </p>
        </div>
        <button
          onClick={handleCall}
          className="rounded-lg border border-primary px-4 py-2 text-sm font-bold text-primary hover:bg-orange-50"
        >
          📞 One-to-one call
        </button>
      </div>

      {/* 2-column layout: chat left (main), sticky sidebar right */}
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-start">
        {/* ── Chat thread (left / main) ─────────────────── */}
        {active ? (
          <section className="flex min-h-[600px] flex-col overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
            {/* Thread header */}
            <div className="flex items-start justify-between gap-3 border-b border-gray-100 px-4 py-3">
              <div className="min-w-0">
                <p className="truncate text-sm font-bold text-gray-900">{active.subject}</p>
                <div className="mt-1 flex flex-wrap items-center gap-2 text-[11px] text-gray-400">
                  <span className="font-mono font-bold text-gray-600">{active.id}</span>
                  {active.orderOrn && (
                    <>
                      <span>·</span>
                      <Link
                        href={`/account/orders/${active.orderOrn}`}
                        className="font-mono text-primary hover:underline"
                      >
                        {active.orderOrn}
                      </Link>
                    </>
                  )}
                  <span>·</span>
                  <span
                    className={`rounded-full px-2 py-0.5 font-bold uppercase ${
                      PRIORITIES.find((p) => p.id === active.priority)?.tone || "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {active.priority}
                  </span>
                  <span
                    className={`rounded-full px-2 py-0.5 font-bold ${
                      active.status === "resolved"
                        ? "bg-green-100 text-green-700"
                        : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {active.status}
                  </span>
                </div>
              </div>
              <button
                onClick={handleCall}
                className="shrink-0 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-semibold text-gray-700 hover:bg-gray-50"
              >
                📞 Call
              </button>
            </div>

            {/* Optional: linked product preview */}
            {active.productId && account.orders.find((o) => o.orn === active.orderOrn)?.items.find((l) => l.productId === active.productId) && (
              <div className="border-b border-gray-100 bg-gray-50/60 px-4 py-2.5">
                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">About this product</p>
                <div className="mt-1.5 flex items-center gap-3">
                  <Image
                    src={thumb(account.orders
                      .find((o) => o.orn === active.orderOrn)
                      .items.find((l) => l.productId === active.productId).product.img)}
                    alt=""
                    width={36}
                    height={36}
                    className="h-9 w-9 rounded-lg bg-white object-cover"
                  />
                  <p className="line-clamp-2 flex-1 text-xs text-gray-700">
                    {account.orders
                      .find((o) => o.orn === active.orderOrn)
                      .items.find((l) => l.productId === active.productId).product.name}
                  </p>
                </div>
              </div>
            )}

            {/* Messages */}
            <div className="flex-1 space-y-3 overflow-y-auto bg-gray-50/40 px-4 py-4">
              {active.messages.map((m) => (
                <Bubble key={m.id} {...m} />
              ))}
              <div ref={endRef} />
            </div>

            {/* Reply */}
            <div className="border-t border-gray-100 p-3">
              <div className="flex items-center gap-2">
                <input
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleReply()}
                  placeholder="Reply to support…"
                  className="checkout-input flex-1"
                />
                <button
                  onClick={handleReply}
                  disabled={!reply.trim()}
                  className="rounded-lg bg-primary px-4 py-2 text-xs font-bold text-white hover:bg-primarydark disabled:opacity-50"
                >
                  Send
                </button>
              </div>
            </div>
          </section>
        ) : (
          <div className="flex min-h-[600px] flex-col items-center justify-center rounded-xl border border-gray-100 bg-white p-10 text-center shadow-sm">
            <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-orange-50 text-2xl">
              📞
            </div>
            <p className="text-sm font-semibold text-gray-700">No ticket selected</p>
            <p className="mt-1 text-xs text-gray-400">
              Raise a new ticket from the right, or open one from the list to chat.
            </p>
          </div>
        )}

        {/* ── Sticky right sidebar: Create + List ────────── */}
        <aside className="lg:sticky lg:top-24">
          <div className="space-y-4">
            {/* Create Ticket form */}
            <section className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
              <div className="mb-3 flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-50 text-base">
                  ✏️
                </span>
                <h2 className="font-display text-sm font-bold text-gray-900">
                  Raise a New Ticket
                </h2>
              </div>

              <div className="space-y-3">
                {/* Order selector */}
                <div>
                  <label className="mb-1 block text-[11px] font-semibold uppercase tracking-wider text-gray-500">
                    Which order is this about?
                  </label>
                  <select
                    value={form.orderOrn}
                    onChange={(e) => handleOrderChange(e.target.value)}
                    className="checkout-input"
                  >
                    <option value="">— Not order related —</option>
                    {account.orders.map((o) => (
                      <option key={o.orn} value={o.orn}>
                        {o.orn} · {o.items.length} item{o.items.length > 1 ? "s" : ""} · {formatMoney(o.lockedTotal ?? o.quotedTotal)}
                      </option>
                    ))}
                  </select>
                  {selectedOrder && (
                    <p className="mt-1 truncate text-[11px] text-gray-500">
                      {selectedOrder.items
                        .map((l) => l.product.name.split(" ").slice(0, 3).join(" "))
                        .join(" · ")}
                    </p>
                  )}
                </div>

                {/* Product selector — only if an order is chosen */}
                {selectedOrder && (
                  <div>
                    <label className="mb-1 block text-[11px] font-semibold uppercase tracking-wider text-gray-500">
                      Which product? (optional)
                    </label>
                    <select
                      value={form.productId}
                      onChange={(e) => updateForm({ productId: e.target.value })}
                      className="checkout-input"
                    >
                      <option value="">— Entire order —</option>
                      {selectedOrder.items.map((l) => (
                        <option key={l.productId} value={l.productId}>
                          {l.product.name.length > 60
                            ? l.product.name.slice(0, 60) + "…"
                            : l.product.name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Subject */}
                <div>
                  <label className="mb-1 block text-[11px] font-semibold uppercase tracking-wider text-gray-500">
                    Subject
                  </label>
                  <input
                    value={form.subject}
                    onChange={(e) => updateForm({ subject: e.target.value })}
                    placeholder="e.g. Bearing rattle on GSB 750"
                    className="checkout-input"
                  />
                </div>

                {/* Priority */}
                <div>
                  <label className="mb-1 block text-[11px] font-semibold uppercase tracking-wider text-gray-500">
                    Priority
                  </label>
                  <div className="flex gap-1.5">
                    {PRIORITIES.map((p) => {
                      const isActive = form.priority === p.id;
                      return (
                        <button
                          key={p.id}
                          type="button"
                          onClick={() => updateForm({ priority: p.id })}
                          className={`flex-1 rounded-lg border px-2 py-1.5 text-[11px] font-bold transition-colors ${
                            isActive
                              ? "border-primary bg-orange-50 text-primary"
                              : "border-gray-200 text-gray-500 hover:border-gray-300"
                          }`}
                        >
                          {p.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="mb-1 block text-[11px] font-semibold uppercase tracking-wider text-gray-500">
                    Describe the issue
                  </label>
                  <textarea
                    rows={3}
                    value={form.message}
                    onChange={(e) => updateForm({ message: e.target.value })}
                    placeholder="What went wrong? Add any error codes, model numbers, timestamps…"
                    className="checkout-input resize-y"
                  />
                </div>
              </div>

              <button
                onClick={handleCreate}
                className="mt-4 w-full rounded-lg bg-primary py-2.5 text-xs font-bold text-white hover:bg-primarydark"
              >
                Create ticket
              </button>

              <p className="mt-2 text-center text-[10px] leading-relaxed text-gray-400">
                🔒 Your ticket is end-to-end encrypted and visible only to our support team.
              </p>
            </section>

            {/* Existing tickets list */}
            <section className="rounded-xl border border-gray-100 bg-white p-3 shadow-sm">
              <div className="mb-2 flex items-center justify-between px-1">
                <h2 className="font-display text-sm font-bold text-gray-900">Your Tickets</h2>
                <span className="rounded-full bg-orange-50 px-2 py-0.5 text-[10px] font-bold text-primary">
                  {account.tickets.length}
                </span>
              </div>

              {account.tickets.length === 0 ? (
                <p className="px-1 py-4 text-xs text-gray-400">No tickets yet.</p>
              ) : (
                <ul className="hide-scrollbar max-h-[calc(100vh-32rem)] space-y-1 overflow-y-auto">
                  {account.tickets.map((t) => {
                    const isActive = t.id === active?.id;
                    return (
                      <li key={t.id}>
                        <button
                          onClick={() => setActiveId(t.id)}
                          className={`w-full rounded-lg px-3 py-2.5 text-left transition-colors ${
                            isActive ? "bg-orange-50 ring-1 ring-primary/20" : "hover:bg-gray-50"
                          }`}
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span className="font-mono text-[11px] font-bold text-gray-700">
                              {t.id}
                            </span>
                            <span
                              className={`rounded-full px-1.5 py-0.5 text-[9px] font-bold ${
                                t.status === "resolved"
                                  ? "bg-green-100 text-green-700"
                                  : "bg-amber-100 text-amber-700"
                              }`}
                            >
                              {t.status}
                            </span>
                          </div>
                          <p className="mt-1 line-clamp-2 text-xs text-gray-700">{t.subject}</p>
                          {t.orderOrn && (
                            <p className="mt-1 font-mono text-[10px] text-gray-400">{t.orderOrn}</p>
                          )}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </section>
          </div>
        </aside>
      </div>
    </div>
  );
}

/* ── Chat bubble ───────────────────────────────────────────── */

function Bubble({ from, text, at, author }) {
  if (from === "system") {
    return (
      <div className="text-center">
        <span className="rounded-full bg-gray-100 px-3 py-1 text-[10px] font-semibold text-gray-500">
          {text}
        </span>
      </div>
    );
  }
  const mine = from === "user";
  return (
    <div className={`flex ${mine ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[80%] rounded-2xl px-3.5 py-2 text-sm leading-relaxed ${
          mine
            ? "rounded-br-sm bg-primary text-white"
            : "rounded-bl-sm bg-white text-gray-700 shadow-sm"
        }`}
      >
        {!mine && author && (
          <div className="mb-0.5 text-[10px] font-bold opacity-70">{author}</div>
        )}
        {text}
        <div
          className={`mt-1 text-[10px] ${
            mine ? "text-white/70" : "text-gray-400"
          }`}
        >
          {new Date(at).toLocaleTimeString("en-IN", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      </div>
    </div>
  );
}