"use client";

import { useState } from "react";
import Modal from "@/components/ui/Modal";
import { NEGOTIATION_CHANNELS, CONFIRM_METHODS } from "@/lib/data/checkout";
import { formatMoney } from "@/lib/format";

/* ─────────────────────────────────────────────────────────────
   Modal 1 — "Have you received the quotation via email?"
   ───────────────────────────────────────────────────────────── */
export function ReceivedCheckModal({ open, email, onYes, onResend, onDownload }) {
  const [showFallback, setShowFallback] = useState(false);
  const [busy, setBusy] = useState(false);

  async function handleResend() {
    setBusy(true);
    await onResend();
    setBusy(false);
  }

  return (
    <Modal open={open} onClose={() => {}}>
      <div className="pop-animate rounded-2xl bg-white p-6 text-center">
        <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-orange-50 text-2xl">
          ✉️
        </div>
        <h3 className="font-display text-xl font-black text-gray-900">
          Have you received the quotation via email?
        </h3>
        <p className="mt-1 text-xs text-gray-500">
          We sent it to <b className="text-gray-700">{email}</b>
        </p>

        {!showFallback ? (
          <div className="mt-6 grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setShowFallback(true)}
              className="rounded-lg border border-gray-200 py-3 text-sm font-bold text-gray-700 hover:bg-gray-50"
            >
              No
            </button>
            <button
              type="button"
              onClick={onYes}
              className="rounded-lg bg-primary py-3 text-sm font-bold text-white hover:bg-primarydark"
            >
              Yes
            </button>
          </div>
        ) : (
          <div className="mt-6 space-y-3 text-left">
            <p className="rounded-lg bg-gray-50 p-3 text-xs text-gray-600">
              No problem — download it now, or resend the email to{" "}
              <b>{email}</b>.
            </p>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={onDownload}
                className="rounded-lg border border-gray-200 py-3 text-xs font-bold text-gray-700 hover:bg-gray-50"
              >
                📥 Download
              </button>
              <button
                type="button"
                disabled={busy}
                onClick={handleResend}
                className="rounded-lg border border-primary py-3 text-xs font-bold text-primary hover:bg-orange-50 disabled:opacity-50"
              >
                {busy ? "Resending…" : "📨 Resend Email"}
              </button>
            </div>
            <button
              type="button"
              onClick={() => setShowFallback(false)}
              className="mt-2 w-full text-center text-xs font-semibold text-gray-400 hover:text-gray-600"
            >
              ← Back
            </button>
          </div>
        )}
      </div>
    </Modal>
  );
}

/* ─────────────────────────────────────────────────────────────
   Modal 2 — "Are you satisfied with the price?"
   ───────────────────────────────────────────────────────────── */
export function PriceSatisfactionModal({ open, onYes, onNo }) {
  return (
    <Modal open={open} onClose={() => {}}>
      <div className="pop-animate rounded-2xl bg-white p-6 text-center">
        <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-green-50 text-2xl">
          💰
        </div>
        <h3 className="font-display text-xl font-black text-gray-900">
          Are you satisfied with the price?
        </h3>
        <p className="mt-1 text-xs text-gray-500">
          You can confirm the order as-is, or negotiate with our pricing team.
        </p>
        <div className="mt-6 grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={onNo}
            className="rounded-lg border border-gray-200 py-3 text-sm font-bold text-gray-700 hover:bg-gray-50"
          >
            No — Negotiate
          </button>
          <button
            type="button"
            onClick={onYes}
            className="rounded-lg bg-primary py-3 text-sm font-bold text-white hover:bg-primarydark"
          >
            Yes — Proceed
          </button>
        </div>
      </div>
    </Modal>
  );
}

/* ─────────────────────────────────────────────────────────────
   Modal 3 — "How do you want to negotiate?"
   ───────────────────────────────────────────────────────────── */
export function NegotiationModal({ open, onChoose }) {
  return (
    <Modal open={open} onClose={() => {}}>
      <div className="pop-animate rounded-2xl bg-white p-6">
        <div className="mb-5 text-center">
          <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-orange-50 text-2xl">
            🤝
          </div>
          <h3 className="font-display text-xl font-black text-gray-900">
            Negotiate with our experts
          </h3>
          <p className="mt-1 text-xs text-gray-500">
            Choose a channel — we&apos;ll assign a pricing specialist.
          </p>
        </div>
        <div className="space-y-3">
          {NEGOTIATION_CHANNELS.map((ch) => (
            <button
              key={ch.id}
              type="button"
              onClick={() => onChoose(ch.id)}
              className="flex w-full items-center gap-3 rounded-xl border border-gray-200 px-4 py-3 text-left transition-all hover:border-primary hover:bg-orange-50/50"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-50 text-lg">
                {ch.icon}
              </span>
              <div className="flex-1">
                <div className="text-sm font-semibold text-gray-800">{ch.title}</div>
                <div className="text-xs text-gray-400">{ch.sub}</div>
              </div>
              <span className="text-gray-300">›</span>
            </button>
          ))}
        </div>
      </div>
    </Modal>
  );
}

/* ─────────────────────────────────────────────────────────────
   Modal 4 — Confirm: OTP or PO upload
   Used both from "price-satisfied = yes" and after "negotiated".
   ───────────────────────────────────────────────────────────── */
export function ConfirmOrderModal({ open, email, lines, locked, onConfirm }) {
  const [method, setMethod] = useState("");
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [poFile, setPoFile] = useState(null);
  const [busy, setBusy] = useState(false);

  const total = locked
    ? locked.total
    : lines.reduce((s, l) => s + l.product.orig * l.qty, 0);

  function pickMethod(id) {
    setMethod(id);
    setOtp("");
    setOtpSent(false);
    setPoFile(null);
    if (id === "otp" && !otpSent) {
      const code = String(Math.floor(100000 + Math.random() * 900000));
      setGeneratedOtp(code);
      setOtpSent(true);
    }
  }

  async function submit() {
    if (method === "otp") {
      if (otp.replace(/\D/g, "").length !== 6) return;
      if (otp !== generatedOtp) return;
    } else if (method === "po") {
      if (!poFile) return;
    } else return;

    setBusy(true);
    await onConfirm(method);
    setBusy(false);
  }

  return (
    <Modal open={open} onClose={() => {}}>
      <div className="pop-animate max-h-[92vh] overflow-y-auto rounded-2xl bg-white p-6">
        <h3 className="font-display mb-1 text-xl font-black text-gray-900">
          Confirm your order
        </h3>
        <p className="mb-4 text-xs text-gray-500">
          Total payable: <b className="text-gray-800">{formatMoney(total)}</b>
        </p>

        <div className="space-y-3">
          {CONFIRM_METHODS.map((m) => {
            const active = method === m.id;
            return (
              <div key={m.id}>
                <button
                  type="button"
                  onClick={() => pickMethod(m.id)}
                  aria-pressed={active}
                  className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left transition-all ${
                    active ? "border-primary bg-orange-50/60" : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-lg shadow-sm">
                    {m.icon}
                  </span>
                  <div className="flex-1">
                    <div className="text-sm font-semibold text-gray-800">{m.title}</div>
                    <div className="text-xs text-gray-400">{m.sub}</div>
                  </div>
                  <span className={`flex h-4 w-4 items-center justify-center rounded-full border-2 ${active ? "border-primary" : "border-gray-300"}`}>
                    {active && <span className="h-2 w-2 rounded-full bg-primary" />}
                  </span>
                </button>

                {active && m.id === "otp" && (
                  <div className="mt-3 rounded-lg border border-gray-100 bg-gray-50/60 p-3">
                    <p className="mb-2 text-xs text-gray-600">
                      OTP sent to <b>{email}</b>. Demo OTP:{" "}
                      <b className="font-mono tracking-widest text-orange-700">{generatedOtp}</b>
                    </p>
                    <input
                      inputMode="numeric"
                      maxLength={6}
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                      placeholder="••••••"
                      className="otp-input w-full rounded-lg border-2 border-gray-200 px-4 py-3 text-center text-xl font-black tracking-[0.5em]"
                    />
                  </div>
                )}

                {active && m.id === "po" && (
                  <div className="mt-3 rounded-lg border border-gray-100 bg-gray-50/60 p-3">
                    <label className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 py-4 text-xs text-gray-500 hover:border-primary hover:text-primary">
                      <input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => setPoFile(e.target.files?.[0] || null)}
                        className="hidden"
                      />
                      <span className="text-lg">📄</span>
                      {poFile ? (
                        <span className="mt-1 font-semibold text-gray-700">{poFile.name}</span>
                      ) : (
                        <span className="mt-1 font-semibold">Upload signed PO</span>
                      )}
                      <span className="mt-0.5 text-[11px] text-gray-400">PDF, JPG or PNG · up to 5 MB</span>
                    </label>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <button
          type="button"
          disabled={
            busy ||
            !method ||
            (method === "otp" && otp !== generatedOtp) ||
            (method === "po" && !poFile)
          }
          onClick={submit}
          className="mt-5 w-full rounded-lg bg-primary py-3 text-sm font-bold text-white transition-colors hover:bg-primarydark disabled:cursor-not-allowed disabled:opacity-50"
        >
          {busy ? "Confirming…" : "Confirm Order"}
        </button>
      </div>
    </Modal>
  );
}

/* ─────────────────────────────────────────────────────────────
   Modal 5 — "Your negotiated price is locked" (shows item-wise)
   Reuses ConfirmOrderModal for the actual verification.
   ───────────────────────────────────────────────────────────── */
export function LockedPriceModal({ open, locked, email, lines, onConfirm }) {
  if (!locked) return null;
  return (
    <Modal open={open} onClose={() => {}}>
      <div className="pop-animate max-h-[92vh] overflow-y-auto rounded-2xl bg-white p-6">
        <div className="mb-4 text-center">
          <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-green-50 text-2xl">
            🔒
          </div>
          <h3 className="font-display text-xl font-black text-gray-900">
            Price locked by our expert
          </h3>
          <p className="mt-1 text-xs text-gray-500">
            Review the final item-wise pricing and confirm your order.
          </p>
        </div>

        <ul className="divide-y divide-gray-100 rounded-xl border border-gray-100">
          {locked.lines.map((l) => (
            <li key={l.product.id} className="flex items-start justify-between gap-3 p-3">
              <div className="min-w-0 flex-1">
                <p className="line-clamp-2 text-xs font-medium text-gray-800">
                  {l.product.name}
                </p>
                <p className="mt-0.5 text-[11px] text-gray-400">
                  Qty {l.qty} × {formatMoney(l.unitPrice)}
                </p>
              </div>
              <div className="shrink-0 text-right">
                <p className="text-sm font-bold text-gray-900">
                  {formatMoney(l.lineTotal)}
                </p>
                {l.product.orig > l.unitPrice && (
                  <p className="text-[11px] text-green-600">
                    Save {formatMoney((l.product.orig - l.unitPrice) * l.qty)}
                  </p>
                )}
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-4 flex items-center justify-between rounded-lg bg-gray-50 px-4 py-3">
          <span className="text-sm font-bold text-gray-700">Final Total</span>
          <span className="font-display text-lg font-black text-gray-900">
            {formatMoney(locked.total)}
          </span>
        </div>

        <div className="mt-4">
          <ConfirmOrderInline
            email={email}
            lines={locked.lines}
            total={locked.total}
            onConfirm={onConfirm}
          />
        </div>
      </div>
    </Modal>
  );
}

/** Compact inline version of the confirm form used inside LockedPriceModal. */
function ConfirmOrderInline({ email, lines, total, onConfirm }) {
  const [method, setMethod] = useState("");
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [poFile, setPoFile] = useState(null);
  const [busy, setBusy] = useState(false);

  function pick(id) {
    setMethod(id);
    setOtp("");
    setPoFile(null);
    if (id === "otp") {
      setGeneratedOtp(String(Math.floor(100000 + Math.random() * 900000)));
    }
  }

  async function submit() {
    if (method === "otp") {
      if (otp !== generatedOtp) return;
    } else if (method === "po") {
      if (!poFile) return;
    } else return;
    setBusy(true);
    await onConfirm(method);
    setBusy(false);
  }

  return (
    <div className="rounded-xl border border-orange-100 bg-orange-50/60 p-3">
      <p className="mb-2 text-xs font-bold text-orange-800">Confirm & save order</p>
      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => pick("otp")}
          className={`rounded-lg border py-2 text-xs font-semibold transition-colors ${
            method === "otp" ? "border-primary bg-white text-primary" : "border-gray-200 bg-white text-gray-600"
          }`}
        >
          🔐 Email OTP
        </button>
        <button
          type="button"
          onClick={() => pick("po")}
          className={`rounded-lg border py-2 text-xs font-semibold transition-colors ${
            method === "po" ? "border-primary bg-white text-primary" : "border-gray-200 bg-white text-gray-600"
          }`}
        >
          📄 Upload PO
        </button>
      </div>

      {method === "otp" && (
        <div className="mt-3">
          <p className="mb-1 text-[11px] text-gray-500">
            OTP sent to <b>{email}</b>. Demo:{" "}
            <b className="font-mono tracking-widest text-orange-700">{generatedOtp}</b>
          </p>
          <input
            inputMode="numeric"
            maxLength={6}
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
            placeholder="••••••"
            className="otp-input w-full rounded-lg border-2 border-gray-200 px-3 py-2 text-center text-lg font-black tracking-[0.4em]"
          />
        </div>
      )}

      {method === "po" && (
        <label className="mt-3 flex cursor-pointer items-center gap-2 rounded-lg border-2 border-dashed border-gray-300 p-3 text-xs text-gray-600 hover:border-primary hover:text-primary">
          <input
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={(e) => setPoFile(e.target.files?.[0] || null)}
            className="hidden"
          />
          <span className="text-lg">📄</span>
          <span className="font-semibold">{poFile ? poFile.name : "Upload signed PO"}</span>
        </label>
      )}

      <button
        type="button"
        disabled={
          busy ||
          !method ||
          (method === "otp" && otp !== generatedOtp) ||
          (method === "po" && !poFile)
        }
        onClick={submit}
        className="mt-3 w-full rounded-lg bg-primary py-2.5 text-sm font-bold text-white hover:bg-primarydark disabled:cursor-not-allowed disabled:opacity-50"
      >
        {busy ? "Confirming…" : `Confirm · ${formatMoney(total)}`}
      </button>
    </div>
  );
}