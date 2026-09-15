"use client";

import { use, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAccount } from "@/context/AccountContext";
import { useUI } from "@/context/UIContext";
import { useCart } from "@/context/CartContext";
import StatusPill from "@/components/account/StatusPill";
import { formatMoney, thumb } from "@/lib/format";
import {
  downloadQuotation,
  downloadInvoice,
  downloadPOAck,
  downloadChallan,
} from "@/lib/documents";

const TABS = [
  { id: "overview", label: "Overview" },
  { id: "items", label: "Items" },
  { id: "timeline", label: "Timeline" },
  { id: "documents", label: "Documents" },
];

const CANCELLABLE = ["rfq-sent", "negotiation"];

export default function OrderDetailPage({ params }) {
  const { orn } = use(params);
  const router = useRouter();
  const {
    account,
    uploadPO,
    cancelOrder,
    requestExchange,
    submitReview,
  } = useAccount();
  const { showToast } = useUI();
  const { addItem } = useCart();

  const [tab, setTab] = useState("overview");
  const [poNumber, setPoNumber] = useState("");
  const [showPOForm, setShowPOForm] = useState(false);
  const [showCancel, setShowCancel] = useState(false);
  const [cancelReason, setCancelReason] = useState("");
  const [showExchange, setShowExchange] = useState(null);
  const [exchangeReason, setExchangeReason] = useState("");
  const [reviewProduct, setReviewProduct] = useState(null);
  const [review, setReview] = useState({ rating: 5, title: "", body: "" });

  const order = account?.orders.find((o) => o.orn === orn);
  const negotiation = useMemo(
    () => account?.negotiations.find((n) => n.id === order?.negotiationId),
    [account, order]
  );
  const total = order ? (order.lockedTotal ?? order.quotedTotal) : 0;

  if (!order) {
    return (
      <div className="rounded-xl border border-gray-100 bg-white p-10 text-center shadow-sm">
        <p className="text-sm text-gray-500">Order not found.</p>
        <Link
          href="/account/orders"
          className="mt-3 inline-block text-sm font-semibold text-primary"
        >
          ← Back to orders
        </Link>
      </div>
    );
  }

  const canCancel = CANCELLABLE.includes(order.status);
  const isDelivered = order.status === "delivered" || order.status === "exchange-requested";

  function handleUploadPO() {
    if (!poNumber.trim() || poNumber.trim().length < 4)
      return showToast("Enter a valid PO number");
    uploadPO(order.orn, poNumber.trim());
    setShowPOForm(false);
    setPoNumber("");
    showToast("PO received — order is now in processing");
  }

  function handleCancel() {
    if (!cancelReason.trim() || cancelReason.trim().length < 5)
      return showToast("Give a short reason for cancellation");
    cancelOrder(order.orn, cancelReason.trim());
    setShowCancel(false);
    setCancelReason("");
    showToast("Order cancelled");
  }

  function handleExchange(productId) {
    if (!exchangeReason.trim() || exchangeReason.trim().length < 8)
      return showToast("Describe the issue (min 8 chars)");
    requestExchange(order.orn, productId, exchangeReason.trim());
    setShowExchange(null);
    setExchangeReason("");
    showToast("Exchange request submitted");
  }

  function handleReviewSubmit() {
    if (!review.title.trim() || !review.body.trim())
      return showToast("Add a title and review text");
    submitReview({
      orderOrn: order.orn,
      productId: reviewProduct.productId,
      rating: review.rating,
      title: review.title.trim(),
      body: review.body.trim(),
    });
    setReviewProduct(null);
    setReview({ rating: 5, title: "", body: "" });
    showToast("Review published — thank you!");
  }

  function handleReorder() {
    order.items.forEach((l) => {
      for (let i = 0; i < l.qty; i++) addItem(l.productId);
    });
    showToast(`Added ${order.items.length} item${order.items.length > 1 ? "s" : ""} to cart`);
    router.push("/checkout");
  }

  return (
    <div className="space-y-4">
      <Link
        href="/account/orders"
        className="text-xs font-semibold text-gray-500 hover:text-primary"
      >
        ← Back to orders
      </Link>

      {/* Header */}
      <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="font-display text-xl font-black text-gray-900">{order.orn}</h1>
              <StatusPill status={order.status} size="md" />
            </div>
            <p className="mt-1 text-xs text-gray-500">
              Placed{" "}
              {new Date(order.createdAt).toLocaleString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
              {" · "}Quote {order.quoteId}
              {order.poNumber && <> · PO {order.poNumber}</>}
              {order.invoiceNumber && <> · Invoice {order.invoiceNumber}</>}
            </p>
          </div>
          <div className="text-right">
            <p className="text-[11px] uppercase tracking-wider text-gray-400">
              {order.lockedTotal ? "Locked total" : "Quoted total"}
            </p>
            <p className="font-display text-2xl font-black text-gray-900">
              {formatMoney(total)}
            </p>
          </div>
        </div>

        {/* CTAs */}
        <div className="mt-4 flex flex-wrap gap-2">
          {order.status === "negotiation" && negotiation && (
            <Link
              href={`/account/negotiations?thread=${negotiation.id}`}
              className="rounded-lg bg-primary px-4 py-2 text-xs font-bold text-white hover:bg-primarydark"
            >
              💬 Continue Negotiation
            </Link>
          )}
          {order.status === "awaiting-po" && (
            <button
              onClick={() => setShowPOForm(true)}
              className="rounded-lg bg-primary px-4 py-2 text-xs font-bold text-white hover:bg-primarydark"
            >
              📄 Upload PO
            </button>
          )}
          {isDelivered && (
            <>
              <button
                onClick={() => setReviewProduct(order.items[0])}
                className="rounded-lg bg-primary px-4 py-2 text-xs font-bold text-white hover:bg-primarydark"
              >
                ⭐ Write a Review
              </button>
              <button
                onClick={handleReorder}
                className="rounded-lg border border-primary px-4 py-2 text-xs font-bold text-primary hover:bg-orange-50"
              >
                🔁 Reorder
              </button>
            </>
          )}
          <Link
            href={`/account/support?orn=${order.orn}`}
            className="rounded-lg border border-gray-200 px-4 py-2 text-xs font-bold text-gray-700 hover:bg-gray-50"
          >
            📞 Contact Support
          </Link>
          {canCancel && (
            <button
              onClick={() => setShowCancel(true)}
              className="rounded-lg border border-red-200 px-4 py-2 text-xs font-bold text-red-600 hover:bg-red-50"
            >
              ✕ Cancel Order
            </button>
          )}
        </div>

        {/* Cancel panel */}
        {showCancel && (
          <div className="mt-4 rounded-lg border border-red-100 bg-red-50/60 p-3">
            <p className="text-xs font-semibold text-red-900">
              Cancel this order?
            </p>
            <p className="mt-0.5 text-[11px] text-red-700">
              Once cancelled, negotiation and PO flow for this order will stop.
            </p>
            <textarea
              rows={2}
              value={cancelReason}
              onChange={(e) => setCancelReason(e.target.value)}
              placeholder="Reason (e.g. duplicate RFQ, budget revised)"
              className="checkout-input mt-2 resize-y"
            />
            <div className="mt-2 flex gap-2">
              <button
                onClick={handleCancel}
                className="rounded-lg bg-red-600 px-4 py-2 text-xs font-bold text-white hover:bg-red-700"
              >
                Confirm Cancel
              </button>
              <button
                onClick={() => setShowCancel(false)}
                className="rounded-lg border border-gray-200 px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-50"
              >
                Keep Order
              </button>
            </div>
          </div>
        )}

        {/* PO upload panel (from order detail — same as negotiation) */}
        {showPOForm && (
          <div className="mt-4 rounded-lg border border-orange-100 bg-orange-50/60 p-3">
            <label className="block text-xs font-semibold text-orange-900">
              Purchase Order number
            </label>
            <div className="mt-2 flex gap-2">
              <input
                value={poNumber}
                onChange={(e) => setPoNumber(e.target.value)}
                placeholder="e.g. PO-2026-AC-119"
                className="checkout-input flex-1 font-mono"
              />
              <button
                onClick={handleUploadPO}
                className="rounded-lg bg-primary px-4 text-xs font-bold text-white hover:bg-primarydark"
              >
                Submit
              </button>
              <button
                onClick={() => setShowPOForm(false)}
                className="rounded-lg border border-gray-200 px-3 text-xs font-semibold text-gray-500 hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="rounded-xl border border-gray-100 bg-white shadow-sm">
        <div className="hide-scrollbar flex gap-1 overflow-x-auto border-b border-gray-100 px-2">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`shrink-0 border-b-2 px-4 py-3 text-sm font-semibold transition-colors ${
                tab === t.id
                  ? "border-primary text-primary"
                  : "border-transparent text-gray-500 hover:text-gray-800"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="p-5">
          {tab === "overview" && (
            <div className="grid gap-4 lg:grid-cols-2">
              <div className="rounded-lg border border-gray-100 p-4">
                <h3 className="font-display mb-2 text-sm font-bold text-gray-900">
                  Delivery Address
                </h3>
                <p className="text-xs font-semibold text-gray-800">
                  {order.address.name}{" "}
                  <span className="ml-1 rounded bg-gray-100 px-1.5 py-0.5 text-[10px] uppercase tracking-wide text-gray-500">
                    {order.address.type}
                  </span>
                </p>
                <p className="mt-1 text-xs leading-relaxed text-gray-600">
                  {order.address.line1}
                  {order.address.line2 ? `, ${order.address.line2}` : ""},{" "}
                  {order.address.city}, {order.address.state} —{" "}
                  {order.address.pincode}
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  📞 +91 {order.address.mobile}
                </p>
              </div>

              <div className="rounded-lg border border-gray-100 p-4">
                <h3 className="font-display mb-2 text-sm font-bold text-gray-900">
                  Contact &amp; CC
                </h3>
                <p className="text-xs text-gray-600">📧 {order.contact.email}</p>
                <p className="mt-1 text-xs text-gray-600">
                  📞 +91 {order.contact.mobile}
                </p>
                {order.contact.ccEmails?.length > 0 && (
                  <p className="mt-2 text-xs text-gray-500">
                    CC: {order.contact.ccEmails.join(", ")}
                  </p>
                )}
              </div>

              <div className="rounded-lg border border-gray-100 p-4 lg:col-span-2">
                <h3 className="font-display mb-2 text-sm font-bold text-gray-900">
                  Order Summary
                </h3>
                <div className="grid gap-3 text-xs sm:grid-cols-3">
                  <div>
                    <p className="text-gray-400">Items</p>
                    <p className="font-semibold text-gray-800">
                      {order.items.length}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-400">Total Quantity</p>
                    <p className="font-semibold text-gray-800">
                      {order.items.reduce((s, l) => s + l.qty, 0)} units
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-400">Value</p>
                    <p className="font-semibold text-gray-800">
                      {formatMoney(total)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {tab === "items" && (
            <>
              <ul className="divide-y divide-gray-100">
                {order.items.map((l) => (
                  <li
                    key={l.productId}
                    className="flex gap-3 py-3 first:pt-0 last:pb-0"
                  >
                    <Image
                      src={thumb(l.product.img)}
                      alt=""
                      width={56}
                      height={56}
                      className="h-14 w-14 shrink-0 rounded-lg bg-gray-50 object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      <Link
                        href={`/product/${l.productId}`}
                        className="line-clamp-2 text-sm font-medium text-gray-800 hover:text-primary"
                      >
                        {l.product.name}
                      </Link>
                      <p className="mt-1 text-xs text-gray-400">
                        Qty {l.qty} × {formatMoney(l.unitPrice)}
                      </p>
                      {isDelivered && (
                        <div className="mt-2 flex flex-wrap gap-2">
                          <button
                            onClick={() => setReviewProduct(l)}
                            className="text-[11px] font-semibold text-primary hover:underline"
                          >
                            Write review
                          </button>
                          <span className="text-gray-300">·</span>
                          <button
                            onClick={() => {
                              setShowExchange(l.productId);
                              setExchangeReason("");
                            }}
                            className="text-[11px] font-semibold text-primary hover:underline"
                          >
                            Request exchange
                          </button>
                          <span className="text-gray-300">·</span>
                          <Link
                            href={`/account/support?orn=${order.orn}&productId=${l.productId}`}
                            className="text-[11px] font-semibold text-primary hover:underline"
                          >
                            Get help with this item
                          </Link>
                        </div>
                      )}
                    </div>
                    <div className="shrink-0 text-right">
                      <p className="text-sm font-bold text-gray-900">
                        {formatMoney(l.unitPrice * l.qty)}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>

              {showExchange !== null && (
                <div className="mt-4 rounded-lg border border-orange-100 bg-orange-50/60 p-3">
                  <label className="block text-xs font-semibold text-orange-900">
                    Describe the issue
                  </label>
                  <textarea
                    rows={3}
                    value={exchangeReason}
                    onChange={(e) => setExchangeReason(e.target.value)}
                    placeholder="e.g. Bearing rattle above 2000 rpm; wrong model shipped…"
                    className="checkout-input mt-2 resize-y"
                  />
                  <div className="mt-2 flex gap-2">
                    <button
                      onClick={() => handleExchange(showExchange)}
                      className="rounded-lg bg-primary px-4 py-2 text-xs font-bold text-white hover:bg-primarydark"
                    >
                      Submit Request
                    </button>
                    <button
                      onClick={() => setShowExchange(null)}
                      className="rounded-lg border border-gray-200 px-4 py-2 text-xs font-semibold text-gray-500 hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {reviewProduct && (
                <div className="mt-4 rounded-lg border border-primary/30 bg-orange-50/40 p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <h3 className="font-display text-sm font-bold text-gray-900">
                      Write a Review
                    </h3>
                    <button
                      onClick={() => setReviewProduct(null)}
                      className="text-xs font-semibold text-gray-500 hover:text-gray-700"
                    >
                      Cancel
                    </button>
                  </div>
                  <p className="mb-3 text-xs text-gray-600">
                    {reviewProduct.product.name}
                  </p>
                  <div className="mb-3 flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <button
                        key={n}
                        onClick={() => setReview((r) => ({ ...r, rating: n }))}
                        className={`text-2xl ${
                          n <= review.rating ? "text-amber-400" : "text-gray-300"
                        }`}
                      >
                        ★
                      </button>
                    ))}
                  </div>
                  <input
                    value={review.title}
                    onChange={(e) =>
                      setReview((r) => ({ ...r, title: e.target.value }))
                    }
                    placeholder="Headline"
                    className="checkout-input mb-2"
                  />
                  <textarea
                    rows={3}
                    value={review.body}
                    onChange={(e) =>
                      setReview((r) => ({ ...r, body: e.target.value }))
                    }
                    placeholder="What did you like or dislike?"
                    className="checkout-input resize-y"
                  />
                  <button
                    onClick={handleReviewSubmit}
                    className="mt-3 rounded-lg bg-primary px-5 py-2 text-xs font-bold text-white hover:bg-primarydark"
                  >
                    Publish Review
                  </button>
                </div>
              )}
            </>
          )}

          {tab === "timeline" && (
            <ol className="relative ml-1.5 space-y-5 border-l border-gray-200">
              {order.timeline.map((t, i) => {
                const isLast = i === order.timeline.length - 1;
                return (
                  <li key={i} className="relative ml-4">
                    <span
                      className={`absolute -left-[22px] top-1 h-3 w-3 rounded-full border-2 ${
                        isLast ? "border-primary bg-primary" : "border-gray-300 bg-white"
                      }`}
                    />
                    <div className="text-sm font-semibold text-gray-800">
                      {t.label}
                    </div>
                    {t.note && (
                      <div className="mt-0.5 text-xs text-gray-500">{t.note}</div>
                    )}
                    <div className="mt-0.5 text-[11px] text-gray-400">
                      {new Date(t.at).toLocaleString("en-IN", {
                        day: "numeric",
                        month: "short",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </li>
                );
              })}
            </ol>
          )}

          {tab === "documents" && (
            <div className="grid gap-3 sm:grid-cols-2">
              <DocCard
                icon="📄"
                title="Quotation"
                sub={`Quote ${order.quoteId}`}
                disabled={false}
                onClick={() => {
                  downloadQuotation(order);
                  showToast("Quotation downloaded");
                }}
              />
              <DocCard
                icon="📋"
                title="Purchase Order (ack)"
                sub={order.poNumber || "Upload PO to unlock"}
                disabled={!order.poNumber}
                onClick={() => {
                  downloadPOAck(order);
                  showToast("PO acknowledgment downloaded");
                }}
              />
              <DocCard
                icon="🧾"
                title="Tax Invoice"
                sub={order.invoiceNumber || "Available after PO"}
                disabled={!order.invoiceNumber || order.status !== "delivered"}
                onClick={() => {
                  downloadInvoice(order);
                  showToast("Invoice downloaded");
                }}
              />
              <DocCard
                icon="🚚"
                title="Delivery Challan"
                sub={
                  ["dispatched", "in-transit", "delivered"].includes(order.status)
                    ? "Shipment in progress"
                    : "Available after dispatch"
                }
                disabled={
                  !["dispatched", "in-transit", "delivered", "exchange-requested"].includes(
                    order.status
                  )
                }
                onClick={() => {
                  downloadChallan(order);
                  showToast("Challan downloaded");
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function DocCard({ icon, title, sub, disabled, onClick }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flex items-start gap-3 rounded-xl border p-4 text-left transition-colors ${
        disabled
          ? "cursor-not-allowed border-gray-100 bg-gray-50/60 opacity-60"
          : "border-gray-100 bg-white hover:border-primary/40 hover:bg-orange-50/40"
      }`}
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-orange-50 text-lg">
        {icon}
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-bold text-gray-900">{title}</p>
        <p className="mt-0.5 truncate text-[11px] text-gray-500">{sub}</p>
      </div>
      {!disabled && (
        <span className="text-xs font-bold text-primary">⬇</span>
      )}
    </button>
  );
}