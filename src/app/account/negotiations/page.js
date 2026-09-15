"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useAccount } from "@/context/AccountContext";
import { useUI } from "@/context/UIContext";
import { formatMoney } from "@/lib/format";

export default function NegotiationsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { account, sendNegotiationMessage, lockPrice, uploadPO } = useAccount();
  const { showToast } = useUI();

  const threadId = searchParams.get("thread");
  const negotiations = account?.negotiations || [];
  const active = useMemo(
    () => negotiations.find((n) => n.id === threadId) || negotiations[0],
    [negotiations, threadId]
  );

  // The order that this negotiation belongs to (if any).
  const linkedOrder = useMemo(
    () => account?.orders.find((o) => o.negotiationId === active?.id),
    [account, active]
  );

  const [input, setInput] = useState("");
  const [uploading, setUploading] = useState(false);
  const endRef = useRef(null);
  const lastLenRef = useRef(0);

  useEffect(() => {
    if (!active) return;
    if (active.messages.length !== lastLenRef.current) {
      endRef.current?.scrollIntoView({ behavior: "smooth" });
      lastLenRef.current = active.messages.length;
    }
  }, [active]);

  if (!account) return null;

  function handleSend() {
    const text = input.trim();
    if (!text || !active || active.status !== "open") return;
    sendNegotiationMessage(active.id, "user", text);
    setInput("");
    // Simulated exec reply — swap for a real socket in production.
    setTimeout(() => {
      sendNegotiationMessage(
        active.id,
        "exec",
        "Noted. Let me check with my manager and lock the best price for you.",
        "Priya · Pricing Desk"
      );
    }, 1200);
  }

  function handleLock() {
    if (!active || !linkedOrder) return;
    const lockedLines = linkedOrder.items.map((l) => {
      const discount = 0.05 + Math.random() * 0.05;
      const unit = Math.round(l.product.orig * (1 - discount));
      return { productId: l.productId, qty: l.qty, unitPrice: unit };
    });
    const total = lockedLines.reduce((s, l) => s + l.unitPrice * l.qty, 0);
    lockPrice(active.id, lockedLines, total);
    showToast(`Price locked at ${formatMoney(total)}`);
  }

  function handlePOUpload({ poNumber, addressId, fileName }) {
    if (!linkedOrder) return;
    setUploading(true);
    setTimeout(() => {
      uploadPO(linkedOrder.orn, { poNumber, addressId, fileName });
      setUploading(false);
      showToast(`PO ${poNumber} received — order moved to processing`);
    }, 900);
  }

  if (negotiations.length === 0) {
    return (
      <div className="rounded-xl border border-gray-100 bg-white py-16 text-center shadow-sm">
        <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-orange-50 text-2xl">
          🤝
        </div>
        <p className="text-sm font-semibold text-gray-700">No negotiations yet</p>
        <p className="mt-1 text-xs text-gray-400">
          Open a negotiation from any order that&apos;s currently in review.
        </p>
      </div>
    );
  }

  const hasPO = !!linkedOrder?.poNumber;
  const isLocked = active.status === "locked";

  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
      {/* ── Chat panel (left / main) ───────────────────────── */}
      <section className="flex min-h-[560px] flex-col overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
        {/* Linked order summary */}
        {linkedOrder && <LinkedOrderCard order={linkedOrder} />}

        {/* Chat header */}
        <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-navy text-xs font-bold text-white">
              P
            </div>
            <div>
              <p className="text-xs font-bold text-gray-800">{active.assignedTo}</p>
              <p className="flex items-center gap-1 text-[11px] text-green-600">
                <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                {active.status === "open" ? "Online" : hasPO ? "PO received" : "Locked"} · {active.id}
              </p>
            </div>
          </div>
          {linkedOrder && (
            <Link
              href={`/account/orders/${linkedOrder.orn}`}
              className="text-xs font-semibold text-primary hover:underline"
            >
              View order →
            </Link>
          )}
        </div>

        {/* Messages */}
        <div className="flex-1 space-y-3 overflow-y-auto bg-gray-50/40 px-4 py-4">
          {active.messages.map((m) => (
            <Bubble key={m.id} {...m} />
          ))}
          <div ref={endRef} />
        </div>

        {/* Footer — 3 states: chat / PO upload / PO received */}
        {active.status === "open" && (
          <div className="border-t border-gray-100 p-3">
            <div className="flex items-center gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Type your message…"
                className="checkout-input flex-1"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim()}
                className="rounded-lg bg-primary px-4 py-2 text-xs font-bold text-white hover:bg-primarydark disabled:opacity-50"
              >
                Send
              </button>
            </div>
            <div className="mt-2 flex items-center justify-between">
              <p className="text-[11px] text-gray-400">
                Tip: share your target price and volume commitment for the best offer.
              </p>
              <button
                onClick={handleLock}
                className="text-[11px] font-bold text-green-700 hover:underline"
              >
                ✅ Accept current offer
              </button>
            </div>
          </div>
        )}

        {isLocked && linkedOrder && !hasPO && (
          <POUploadPanel
            order={linkedOrder}
            addresses={account.addresses || []}
            uploading={uploading}
            onSubmit={handlePOUpload}
          />
        )}

        {isLocked && linkedOrder && hasPO && <POReceivedPanel order={linkedOrder} />}
      </section>

      {/* ── Threads sidebar (right, sticky) ────────────────── */}
      <aside className="lg:sticky lg:top-24">
        <div className="rounded-xl border border-gray-100 bg-white p-3 shadow-sm">
          <div className="mb-3 flex items-center justify-between px-1">
            <h2 className="font-display text-sm font-bold text-gray-900">Your Negotiations</h2>
            <span className="rounded-full bg-orange-50 px-2 py-0.5 text-[10px] font-bold text-primary">
              {negotiations.length}
            </span>
          </div>

          <ul className="hide-scrollbar max-h-[calc(100vh-11rem)] space-y-1 overflow-y-auto">
            {negotiations.map((n) => {
              const isActive = n.id === active.id;
              const last = n.messages[n.messages.length - 1];
              const linkedOrd = account.orders.find((o) => o.negotiationId === n.id);
              const total = linkedOrd?.lockedTotal ?? linkedOrd?.quotedTotal ?? 0;
              return (
                <li key={n.id}>
                  <button
                    onClick={() => router.push(`/account/negotiations?thread=${n.id}`)}
                    className={`w-full rounded-lg px-3 py-2.5 text-left transition-colors ${
                      isActive
                        ? "bg-orange-50 ring-1 ring-primary/20"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono text-[11px] font-bold text-gray-700">
                        {n.id}
                      </span>
                      <span
                        className={`rounded-full px-1.5 py-0.5 text-[9px] font-bold ${
                          n.status === "open"
                            ? "bg-amber-100 text-amber-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {n.status}
                      </span>
                    </div>
                    <p className="mt-1 font-mono text-[11px] text-gray-400">
                      {n.orderOrn}
                    </p>
                    {linkedOrd && (
                      <div className="mt-1 flex items-center justify-between text-[11px]">
                        <span className="text-gray-500">
                          {linkedOrd.items.length} item{linkedOrd.items.length > 1 ? "s" : ""}
                        </span>
                        <span className="font-bold text-gray-700">
                          {formatMoney(total)}
                        </span>
                      </div>
                    )}
                    <p className="mt-1 line-clamp-2 text-[11px] leading-relaxed text-gray-400">
                      {last?.text}
                    </p>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </aside>
    </div>
  );
}

/* ── Linked Order Card ─────────────────────────────────────── */

function LinkedOrderCard({ order }) {
  const total = order.lockedTotal ?? order.quotedTotal;
  const shortNames = order.items
    .map((l) => l.product.name.split(" ").slice(0, 3).join(" "))
    .join(" · ");

  return (
    <div className="border-b border-white/10 bg-gradient-to-r from-navy to-navylight px-4 py-3 text-white">
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-white/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider">
              Linked Order
            </span>
            <span className="font-mono text-xs">{order.orn}</span>
          </div>
          <p className="mt-1 truncate text-xs text-white/80">
            {order.items.length} item{order.items.length > 1 ? "s" : ""} · {shortNames}
          </p>
        </div>
        <div className="shrink-0 text-right">
          <p className="text-[10px] uppercase tracking-wider text-white/60">
            {order.lockedTotal ? "Locked" : "Quoted"}
          </p>
          <p className="font-display text-base font-black">{formatMoney(total)}</p>
        </div>
      </div>
    </div>
  );
}

/* ── PO Upload Panel ───────────────────────────────────────── */

function POUploadPanel({ order, addresses, uploading, onSubmit }) {
  const defaultAddrId =
    addresses.find((a) => a.isDefault)?.id || addresses[0]?.id || "";
  const [poNumber, setPoNumber] = useState("");
  const [addressId, setAddressId] = useState(defaultAddrId);
  const [fileName, setFileName] = useState("");
  const [error, setError] = useState("");

  function handleSubmit() {
    if (!poNumber.trim() || poNumber.trim().length < 4) {
      setError("Enter your PO number (min 4 chars)");
      return;
    }
    setError("");
    onSubmit({ poNumber: poNumber.trim(), addressId, fileName });
  }

  return (
    <div className="border-t border-gray-100 bg-amber-50/40 p-4">
      <div className="mb-3 flex items-center gap-2">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-100 text-base">
          📄
        </span>
        <div>
          <p className="text-sm font-bold text-gray-900">Upload Purchase Order</p>
          <p className="text-[11px] text-gray-500">
            Price locked — share your PO to move the order to processing.
          </p>
        </div>
      </div>

      <div className="space-y-3">
        <div>
          <label className="mb-1 block text-[11px] font-semibold uppercase tracking-wider text-gray-500">
            Deliver to
          </label>
          {addresses.length === 0 ? (
            <Link
              href="/account/addresses"
              className="block rounded-lg border border-dashed border-gray-300 px-3 py-2.5 text-xs text-primary hover:bg-orange-50"
            >
              📍 Add a delivery address first →
            </Link>
          ) : (
            <select
              value={addressId}
              onChange={(e) => setAddressId(e.target.value)}
              className="checkout-input"
            >
              {addresses.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.label} — {a.city}, {a.state} {a.pincode}
                </option>
              ))}
            </select>
          )}
        </div>

        <div>
          <label className="mb-1 block text-[11px] font-semibold uppercase tracking-wider text-gray-500">
            PO Number
          </label>
          <input
            value={poNumber}
            onChange={(e) => {
              setPoNumber(e.target.value);
              setError("");
            }}
            placeholder="e.g. PO-2026-AC-119"
            className="checkout-input font-mono"
          />
          {error && (
            <p className="mt-1 text-[11px] font-medium text-red-500">{error}</p>
          )}
        </div>

        <div>
          <label className="mb-1 block text-[11px] font-semibold uppercase tracking-wider text-gray-500">
            Attach signed PO (optional)
          </label>
          <label className="flex cursor-pointer items-center gap-2 rounded-lg border-2 border-dashed border-gray-300 bg-white px-3 py-2.5 text-xs text-gray-500 hover:border-primary hover:text-primary">
            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={(e) => setFileName(e.target.files?.[0]?.name || "")}
              className="hidden"
            />
            <span className="text-lg">📎</span>
            <span className="truncate font-semibold">
              {fileName || "Choose file (PDF, JPG, PNG)"}
            </span>
          </label>
        </div>
      </div>

      <button
        onClick={handleSubmit}
        disabled={uploading || addresses.length === 0}
        className="mt-4 w-full rounded-lg bg-primary py-3 text-sm font-bold text-white hover:bg-primarydark disabled:opacity-70"
      >
        {uploading ? "Uploading…" : "Submit PO →"}
      </button>

      <p className="mt-2 text-center text-[10px] leading-relaxed text-gray-500">
        🔒 Your PO is end-to-end encrypted and visible only to our B2B team.
      </p>
    </div>
  );
}

/* ── PO Received Panel ─────────────────────────────────────── */

function POReceivedPanel({ order }) {
  return (
    <div className="border-t border-gray-100 bg-green-50/60 p-4">
      <div className="flex items-center gap-2">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-green-100 text-lg">
          ✅
        </span>
        <div>
          <p className="text-sm font-bold text-green-900">PO uploaded successfully</p>
          <p className="text-[11px] text-green-800">
            Order moved to processing — our team will confirm within 24 hours.
          </p>
        </div>
      </div>

      <div className="mt-3 rounded-lg border border-green-200 bg-white p-3 text-xs">
        <div className="flex justify-between border-b border-green-100 py-1.5">
          <span className="text-gray-500">PO Number</span>
          <span className="font-mono font-bold text-gray-800">{order.poNumber}</span>
        </div>
        {order.poFileName && (
          <div className="flex justify-between border-b border-green-100 py-1.5">
            <span className="text-gray-500">Attachment</span>
            <span className="truncate font-semibold text-gray-700">
              {order.poFileName}
            </span>
          </div>
        )}
        <div className="flex justify-between py-1.5">
          <span className="text-gray-500">Delivering to</span>
          <span className="text-right font-semibold text-gray-700">
            {order.address.city}, {order.address.state}
          </span>
        </div>
      </div>

      <Link
        href={`/account/orders/${order.orn}`}
        className="mt-3 block w-full rounded-lg border border-primary py-2.5 text-center text-xs font-bold text-primary hover:bg-orange-50"
      >
        View order timeline →
      </Link>
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