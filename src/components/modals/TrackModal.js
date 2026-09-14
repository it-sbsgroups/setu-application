"use client";

import { useEffect, useState } from "react";
import Modal from "@/components/ui/Modal";
import { useUI } from "@/context/UIContext";
import { buildTrackingInfo, generateOtp, isValidOrn } from "@/lib/mockApi";

const INITIAL_FORM = { step: "orn", orn: "", otp: "", info: null };

export default function TrackModal() {
  const { overlay, closeOverlay, showToast, trackOrn } = useUI();
  const open = overlay === "track";
  const [form, setForm] = useState(INITIAL_FORM);
  const [ornInput, setOrnInput] = useState("");
  const [otpInput, setOtpInput] = useState("");

  useEffect(() => {
    if (open) {
      // Prefill from trackOrn (e.g. a freshly-placed order) when provided,
      // otherwise start clean. Resetting on open is the correct use of an
      // effect here — the modal is a fresh session each time it appears.
      const prefill = trackOrn || "";
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setForm({ ...INITIAL_FORM, orn: prefill });
      setOrnInput(prefill);
      setOtpInput("");
    }
  }, [open, trackOrn]);

  function sendOtp() {
    const value = ornInput.trim().toUpperCase();
    if (!isValidOrn(value))
      return showToast('Invalid ORN. It must start with "ORN" e.g. ORN24519873');
    setForm({ ...form, orn: value, otp: generateOtp(), step: "otp" });
    showToast("OTP sent to +91 ••••••4321");
  }

  function resendOtp() {
    setForm((prev) => ({ ...prev, otp: generateOtp() }));
    showToast("New OTP sent");
  }

  function verifyOtp() {
    const digits = otpInput.replace(/\D/g, "");
    if (digits.length !== 6) return showToast("Enter the 6-digit OTP");
    if (digits !== form.otp) return showToast("Incorrect OTP. Please try again.");
    setForm((prev) => ({ ...prev, step: "status", info: buildTrackingInfo(prev.orn) }));
    showToast("Order found!");
  }

  function trackAnother() {
    setForm(INITIAL_FORM);
    setOrnInput("");
    setOtpInput("");
  }

  return (
    <Modal open={open} onClose={closeOverlay}>
      <div className="pop-animate relative max-h-[92vh] w-full overflow-y-auto rounded-2xl bg-white">
        <button
          type="button"
          onClick={closeOverlay}
          aria-label="Close"
          className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100"
        >
          ✕
        </button>

        <div className="p-6">
          {form.step === "orn" && (
            <OrnStep value={ornInput} onChange={setOrnInput} onSubmit={sendOtp} />
          )}
          {form.step === "otp" && (
            <OtpStep
              orn={form.orn}
              otp={form.otp}
              value={otpInput}
              onChange={setOtpInput}
              onBack={() => setForm((p) => ({ ...p, step: "orn" }))}
              onResend={resendOtp}
              onVerify={verifyOtp}
            />
          )}
          {form.step === "status" && form.info && (
            <StatusStep
              orn={form.orn}
              info={form.info}
              onTrackAnother={trackAnother}
              onDone={closeOverlay}
            />
          )}
        </div>
      </div>
    </Modal>
  );
}

function OrnStep({ value, onChange, onSubmit }) {
  return (
    <>
      <div className="mb-6 text-center">
        <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-orange-50 text-2xl">
          🚚
        </div>
        <h3 className="font-display text-xl font-black text-gray-900">Track your order</h3>
        <p className="mt-1 text-xs text-gray-400">
          Enter your Order Reference Number to see live status
        </p>
      </div>
      <label className="text-xs font-medium text-gray-500">
        Order Reference Number (ORN)
      </label>
      <input
        autoFocus
        value={value}
        onChange={(e) => onChange(e.target.value)}
        maxLength={16}
        placeholder="e.g. ORN24519873"
        className="orn-input mt-1 w-full rounded-xl border-2 border-gray-200 px-4 py-3 font-mono text-sm uppercase tracking-wider transition-all"
      />
      <p className="mt-2 text-[11px] text-gray-400">
        Your ORN starts with <b>ORN</b> — you&apos;ll find it in your order
        confirmation email/SMS.
      </p>
      <button
        type="button"
        onClick={onSubmit}
        className="mt-5 w-full rounded-lg bg-primary py-3 text-sm font-bold text-white transition-colors hover:bg-primarydark"
      >
        Send OTP
      </button>
      <div className="mt-4 rounded-lg bg-gray-50 px-3 py-2 text-center">
        <span className="text-[11px] text-gray-500">
          Demo ORN: <b className="font-mono">ORN24519873</b>
        </span>
      </div>
    </>
  );
}

function OtpStep({ orn, otp, value, onChange, onBack, onResend, onVerify }) {
  return (
    <>
      <button
        type="button"
        onClick={onBack}
        className="mb-4 flex items-center gap-1 text-xs text-gray-400 hover:text-gray-700"
      >
        ‹ Back
      </button>
      <div className="mb-5 text-center">
        <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-orange-50 text-2xl">
          🔐
        </div>
        <h3 className="font-display text-xl font-black text-gray-900">Verify to track</h3>
        <p className="mt-1 text-xs text-gray-400">
          OTP sent to <span className="font-semibold text-gray-600">+91 ••••••4321</span>
        </p>
        <p className="mt-1 font-mono text-[11px] text-gray-400">{orn}</p>
      </div>
      <input
        autoFocus
        inputMode="numeric"
        maxLength={6}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="••••••"
        className="otp-input w-full rounded-xl border-2 border-gray-200 px-4 py-4 text-center text-2xl font-black tracking-[0.5em] transition-all"
      />
      <div className="mt-3 flex items-center justify-between">
        <span className="text-xs text-gray-400">Didn&apos;t get it?</span>
        <button
          type="button"
          onClick={onResend}
          className="text-xs font-semibold"
          style={{ color: "#FF6B35" }}
        >
          Resend OTP
        </button>
      </div>
      <div className="mt-4 rounded-lg border border-orange-100 bg-orange-50 px-3 py-2 text-center">
        <span className="text-xs text-orange-700">
          Demo OTP: <b className="font-mono tracking-widest">{otp}</b>
        </span>
      </div>
      <button
        type="button"
        onClick={onVerify}
        className="mt-5 w-full rounded-lg bg-primary py-3 text-sm font-bold text-white transition-colors hover:bg-primarydark"
      >
        Verify &amp; Track
      </button>
    </>
  );
}

function StatusStep({ orn, info, onTrackAnother, onDone }) {
  return (
    <>
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h3 className="font-display text-xl font-black text-gray-900">Order Status</h3>
          <p className="mt-0.5 font-mono text-xs text-gray-400">{orn}</p>
        </div>
        <span className="rounded-full bg-green-50 px-2.5 py-1 text-[11px] font-bold text-green-700">
          IN TRANSIT
        </span>
      </div>

      <div className="mb-4 rounded-xl p-4" style={{ background: "linear-gradient(135deg,#1B2B4B,#2A4070)" }}>
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/15 text-lg">
            📍
          </div>
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-orange-400">
              Currently arrived at
            </div>
            <div className="mt-0.5 text-sm font-bold text-white">{info.current}</div>
            <div className="mt-1 text-xs text-gray-300">Last scanned {info.scanTime}</div>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
              Expected delivery
            </div>
            <div className="mt-0.5 text-sm font-bold text-white">{info.eta}</div>
          </div>
          <div className="text-right">
            <div className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
              Items
            </div>
            <div className="mt-0.5 text-sm font-bold text-white">
              {info.items} item{info.items > 1 ? "s" : ""}
            </div>
          </div>
        </div>
      </div>

      <div className="mb-4 rounded-xl border border-gray-100 bg-white p-4">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
            Shipment progress
          </span>
          <span className="text-xs text-gray-400">{info.progress}%</span>
        </div>
        <div className="mb-4 h-1.5 overflow-hidden rounded-full bg-gray-100">
          <div
            className="h-full rounded-full"
            style={{ width: `${info.progress}%`, background: "#FF6B35" }}
          />
        </div>
        <ol className="relative ml-1.5 space-y-4 border-l border-gray-200">
          {info.steps.map((step, i) => (
            <li key={i} className="relative ml-4">
              <span
                className={`absolute -left-[22px] top-0.5 h-3 w-3 rounded-full border-2 ${
                  step.done ? "border-primary bg-primary" : "border-gray-300 bg-white"
                }`}
              />
              <div
                className={`text-xs font-semibold ${
                  step.done ? "text-gray-800" : "text-gray-400"
                }`}
              >
                {step.title}
              </div>
              <div className="mt-0.5 text-[11px] text-gray-400">{step.meta}</div>
            </li>
          ))}
        </ol>
      </div>

      <div className="mb-4 rounded-xl bg-gray-50 p-4">
        <div className="mb-2 text-xs font-bold uppercase tracking-wider text-gray-500">
          Delivery address
        </div>
        <p className="text-xs leading-relaxed text-gray-600">{info.address}</p>
      </div>

      <div className="flex gap-2">
        <button
          type="button"
          onClick={onTrackAnother}
          className="flex-1 rounded-lg bg-gray-100 py-3 text-sm font-bold text-gray-700 transition-colors hover:bg-gray-200"
        >
          Track another
        </button>
        <button
          type="button"
          onClick={onDone}
          className="flex-1 rounded-lg bg-primary py-3 text-sm font-bold text-white transition-colors hover:bg-primarydark"
        >
          Done
        </button>
      </div>
    </>
  );
}