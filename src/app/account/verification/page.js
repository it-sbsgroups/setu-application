// src/app/account/verification/page.js
"use client";

import { useState } from "react";
import { useAccount } from "@/context/AccountContext";
import { useUI } from "@/context/UIContext";

const VIDEO_SLOTS = ["Today, 3:00 PM", "Today, 5:30 PM", "Tomorrow, 10:00 AM", "Tomorrow, 12:00 PM"];

export default function VerificationPage() {
  const {
    account, completeAadharVerification, startOrgVerification, completeOrgVerification, cancelAadharChange,
  } = useAccount();
  const { showToast } = useUI();

  const [step, setStep] = useState("overview"); // overview | aadhar | org-id | org-video
  const [digilockerId, setDigilockerId] = useState("");
  const [idCardName, setIdCardName] = useState("");
  const [videoSlot, setVideoSlot] = useState("");

  if (!account) return null;
  const p = account.profile;

  function handleAadhaar() {
    // In production: redirect to DigiLocker OAuth. Here we simulate a successful callback.
    if (!digilockerId.trim()) return showToast("Enter or paste your DigiLocker ID");
    completeAadharVerification(digilockerId.trim());
    setDigilockerId("");
    setStep("overview");
    showToast("Aadhaar verified via DigiLocker");
  }

  function handleOrgStart() {
    if (!idCardName.trim()) return showToast("Upload / name your employee ID card");
    if (!videoSlot) return showToast("Pick a video verification slot");
    startOrgVerification({ idCardName: idCardName.trim(), videoSlot });
    setStep("overview");
    showToast("ID submitted — join the video call at your chosen slot");
  }

  function simulateVideoComplete() {
    completeOrgVerification("Neha (Onboarding)");
    showToast("Organization verified ✅");
  }

  return (
    <div className="space-y-5">
      <div>
        <h1 className="font-display text-2xl font-black text-gray-900">Verification Center</h1>
        <p className="mt-1 text-sm text-gray-500">Two-step verification keeps every B2B transaction safe — Aadhaar for you, employee ID + video for your org.</p>
      </div>

      {step === "overview" && (
        <>
          {/* Aadhaar card */}
          <section className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-50 text-xl">🆔</div>
                <div>
                  <h2 className="font-display text-base font-bold text-gray-900">Aadhaar (via DigiLocker)</h2>
                  <p className="mt-0.5 text-xs text-gray-500">Required to place orders and change sensitive profile fields.</p>
                  {p.aadharVerified ? (
                    <p className="mt-2 text-xs text-green-700">✅ Verified as <b>{p.aadharName}</b> · {new Date(p.aadharVerifiedAt).toLocaleDateString("en-IN")} · {p.digilockerId}</p>
                  ) : (
                    <p className="mt-2 text-xs text-amber-700">⏳ Not yet verified</p>
                  )}
                  {p.pendingAadharChange && (
                    <p className="mt-2 rounded-lg bg-amber-50 px-2 py-1 text-[11px] text-amber-800">
                      Pending change: {Object.entries(p.pendingAadharChange).filter(([k]) => ["name","mobile","email"].includes(k)).map(([k, v]) => `${k} → "${v}"`).join(" · ")}
                    </p>
                  )}
                </div>
              </div>
              {p.aadharVerified && !p.pendingAadharChange ? (
                <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-bold text-green-700">Verified</span>
              ) : (
                <button onClick={() => setStep("aadhar")} className="rounded-lg bg-primary px-4 py-2 text-xs font-bold text-white hover:bg-primarydark">
                  {p.pendingAadharChange ? "Re-verify now" : "Verify via DigiLocker"}
                </button>
              )}
            </div>
          </section>

          {/* Org card */}
          <section className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-orange-50 text-xl">🏭</div>
                <div>
                  <h2 className="font-display text-base font-bold text-gray-900">Organization Verification</h2>
                  <p className="mt-0.5 text-xs text-gray-500">Employee ID card + live video call with our onboarding team.</p>
                  {p.orgVerified ? (
                    <p className="mt-2 text-xs text-green-700">✅ Verified by {p.orgVerifierName} · {new Date(p.orgVerifiedAt).toLocaleDateString("en-IN")}</p>
                  ) : p.pendingOrgVerification ? (
                    <p className="mt-2 text-xs text-amber-700">⏳ Video slot: {p.pendingOrgVerification.videoSlot} · ID: {p.pendingOrgVerification.idCardName}</p>
                  ) : (
                    <p className="mt-2 text-xs text-gray-500">Not yet verified</p>
                  )}
                </div>
              </div>
              {p.orgVerified ? (
                <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-bold text-green-700">Verified</span>
              ) : p.pendingOrgVerification ? (
                <button onClick={simulateVideoComplete} className="rounded-lg bg-navy px-4 py-2 text-xs font-bold text-white hover:bg-navylight">
                  ✅ Simulate video complete
                </button>
              ) : (
                <button onClick={() => setStep("org-id")} className="rounded-lg bg-primary px-4 py-2 text-xs font-bold text-white hover:bg-primarydark">
                  Start verification
                </button>
              )}
            </div>
          </section>
        </>
      )}

      {step === "aadhar" && (
        <section className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
          <button onClick={() => setStep("overview")} className="mb-4 text-xs font-semibold text-gray-500 hover:text-primary">← Back</button>
          <div className="mx-auto max-w-md text-center">
            <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 text-2xl">🆔</div>
            <h2 className="font-display text-xl font-black text-gray-900">Verify with DigiLocker</h2>
            <p className="mt-2 text-xs text-gray-500">
              You&apos;ll be redirected to DigiLocker to authorise Aadhaar-based KYC. We only receive your name, photo, and Aadhaar reference — never your full Aadhaar number.
            </p>
            <div className="mt-5 rounded-lg bg-gray-50 p-3 text-left text-[11px] text-gray-600">
              <p className="font-bold text-gray-700">Demo mode</p>
              <p className="mt-1">In production this button opens the DigiLocker consent screen. Paste any ID to simulate a successful callback:</p>
            </div>
            <input value={digilockerId} onChange={(e) => setDigilockerId(e.target.value)} placeholder="e.g. DL-XXXX-1234" className="checkout-input mt-3 font-mono" />
            <div className="mt-4 flex flex-col gap-2">
              <button onClick={handleAadhaar} className="rounded-lg bg-primary py-3 text-sm font-bold text-white hover:bg-primarydark">Continue to DigiLocker →</button>
              {p.pendingAadharChange && (
                <button onClick={() => { cancelAadharChange(); setStep("overview"); }} className="text-xs font-semibold text-gray-500 hover:text-gray-700">
                  Cancel pending change
                </button>
              )}
            </div>
          </div>
        </section>
      )}

      {step === "org-id" && (
        <section className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
          <button onClick={() => setStep("overview")} className="mb-4 text-xs font-semibold text-gray-500 hover:text-primary">← Back</button>
          <div className="mx-auto max-w-md">
            <h2 className="font-display text-xl font-black text-gray-900">Step 1 of 2 — Employee ID</h2>
            <p className="mt-2 text-xs text-gray-500">Upload a clear photo of your company-issued ID card. Our team verifies it against your organization record.</p>
            <label className="mt-5 flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 py-8 text-xs text-gray-500 hover:border-primary hover:text-primary">
              <input type="file" accept="image/*,.pdf" onChange={(e) => setIdCardName(e.target.files?.[0]?.name || "my-id-card.jpg")} className="hidden" />
              <span className="text-2xl">📄</span>
              <span className="mt-1 font-semibold">{idCardName || "Click to upload employee ID"}</span>
              <span className="mt-0.5 text-[11px] text-gray-400">JPG, PNG or PDF · up to 5 MB</span>
            </label>
            <div className="mt-5">
              <p className="mb-2 text-xs font-medium text-gray-500">Pick a video verification slot</p>
              <div className="grid grid-cols-2 gap-2">
                {VIDEO_SLOTS.map((s) => (
                  <button key={s} onClick={() => setVideoSlot(s)} className={`rounded-lg border px-3 py-2 text-xs font-semibold ${
                    videoSlot === s ? "border-primary bg-orange-50 text-primary" : "border-gray-200 text-gray-600 hover:border-gray-300"
                  }`}>{s}</button>
                ))}
              </div>
            </div>
            <button onClick={handleOrgStart} className="mt-5 w-full rounded-lg bg-primary py-3 text-sm font-bold text-white hover:bg-primarydark">
              Submit & schedule video call →
            </button>
          </div>
        </section>
      )}
    </div>
  );
}