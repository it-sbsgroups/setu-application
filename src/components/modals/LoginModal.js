"use client";

import { useEffect, useState } from "react";
import Modal from "@/components/ui/Modal";
import Logo from "@/components/layout/Logo";
import { useAuth } from "@/context/AuthContext";
import { useUI } from "@/context/UIContext";
import { generateOtp, isValidEmail, isValidMobile, maskContact } from "@/lib/mockApi";

const METHODS = [
  { id: "mobile", icon: "📱", iconBg: "bg-orange-50", title: "Continue with Mobile", sub: "OTP on your registered number" },
  { id: "email", icon: "✉️", iconBg: "bg-blue-50", title: "Continue with Email", sub: "We'll email you a one-time code" },
  { id: "google", icon: "🔴", iconBg: "bg-red-50", title: "Continue with Google", sub: "Use your Google workspace account" },
];

const INITIAL_FORM = { step: "choose", method: "", value: "", name: "", signup: false, otp: "", masked: "" };

export default function LoginModal() {
  const { overlay, closeOverlay, openTrack, showToast } = useUI();
  const { user, login, logout } = useAuth();
  const open = overlay === "login";
  const [form, setForm] = useState(INITIAL_FORM);

  // Reset to "choose" (or straight to the account view if already signed in) every time the modal opens.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- resetting form state when the modal's visibility flips is the correct use of an effect here
    if (open) setForm(user ? { ...INITIAL_FORM, step: "loggedin" } : INITIAL_FORM);
  }, [open, user]);

  function update(patch) {
    setForm((prev) => ({ ...prev, ...patch }));
  }

  function selectMethod(method) {
    update({ method, value: method === "google" ? "you@company.com" : "", step: "identify" });
  }

  function sendOtp() {
    const raw = form.value.trim();
    let value = raw;

    if (form.method === "mobile") {
      const digits = raw.replace(/\D/g, "");
      if (!isValidMobile(digits)) return showToast("Enter a valid 10-digit mobile number");
      value = digits;
    } else if (form.method === "email" && !isValidEmail(raw)) {
      return showToast("Enter a valid email address");
    }
    if (form.signup && !form.name.trim()) return showToast("Please enter your name / company");

    const otp = generateOtp();
    const masked = maskContact(form.method, value);
    update({ value, otp, masked, step: "otp" });
    showToast("OTP sent to " + masked);
  }

  function resendOtp() {
    const otp = generateOtp();
    update({ otp });
    showToast("New OTP sent");
  }

  function verifyOtp(entered) {
    const digits = entered.replace(/\D/g, "");
    if (digits.length !== 6) return showToast("Enter the 6-digit OTP");
    if (digits !== form.otp) return showToast("Incorrect OTP. Please try again.");

    const nextUser = {
      name: form.name.trim() || (form.method === "mobile" ? "SbS Customer" : form.value.split("@")[0] || "SbS Customer"),
      contact: form.method === "mobile" ? "+91 " + form.value : form.value,
    };
    login(nextUser);
    update({ step: "success" });
    showToast("Verified successfully");
  }

  function handleLogout() {
    logout();
    closeOverlay();
    showToast("Logged out");
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
          {form.step === "choose" && (
            <ChooseStep form={form} onSelectMethod={selectMethod} onToggleSignup={() => update({ signup: !form.signup, step: "choose" })} />
          )}
          {form.step === "identify" && <IdentifyStep form={form} onChange={update} onBack={() => update({ step: "choose" })} onSubmit={sendOtp} />}
          {form.step === "otp" && (
            <OtpStep form={form} onBack={() => update({ step: "identify" })} onResend={resendOtp} onVerify={verifyOtp} />
          )}
          {form.step === "success" && <SuccessStep signup={form.signup} onFinish={closeOverlay} />}
          {form.step === "loggedin" && user && (
            <LoggedInStep
              user={user}
              onTrackOrder={() => {
                closeOverlay();
                openTrack();
              }}
              onLogout={handleLogout}
            />
          )}
        </div>
      </div>
    </Modal>
  );
}

function ChooseStep({ form, onSelectMethod, onToggleSignup }) {
  return (
    <>
      <div className="mb-6 text-center">
        <div className="mb-3 flex justify-center">
          <div className="font-display flex items-baseline leading-none font-black" style={{ fontSize: 30, letterSpacing: "-.04em" }}>
            <span style={{ color: "#172554" }}>S</span>
            <span style={{ color: "#84cc16", marginLeft: -4, marginRight: -5, fontSize: 24 }}>b</span>
            <span style={{ color: "#172554" }}>S</span>
          </div>
        </div>
        <h3 className="font-display text-xl font-black text-gray-900">{form.signup ? "Create your account" : "Login to SbS"}</h3>
        <p className="mt-1 text-xs text-gray-400">
          {form.signup ? "Join 50,000+ businesses buying smarter" : "Access bulk pricing, orders & fast checkout"}
        </p>
      </div>

      <div className="space-y-3">
        {METHODS.map((m) => (
          <button
            key={m.id}
            type="button"
            onClick={() => onSelectMethod(m.id)}
            className="flex w-full items-center gap-3 rounded-xl border border-gray-200 px-4 py-3 text-left transition-all hover:border-primary hover:bg-orange-50/50"
          >
            <span className={`flex h-9 w-9 items-center justify-center rounded-lg text-lg ${m.iconBg}`}>{m.icon}</span>
            <div className="flex-1">
              <div className="text-sm font-semibold text-gray-800">{m.title}</div>
              <div className="text-xs text-gray-400">{m.sub}</div>
            </div>
            <span className="text-gray-300">›</span>
          </button>
        ))}
      </div>

      <div className="mt-5 text-center text-xs text-gray-500">
        {form.signup ? "Already have an account?" : "New to SbS?"}
        <button type="button" onClick={onToggleSignup} className="ml-1 font-semibold" style={{ color: "#FF6B35" }}>
          {form.signup ? "Login instead" : "Create an account"}
        </button>
      </div>
      <p className="mt-4 text-center text-[10px] leading-relaxed text-gray-400">
        By continuing you agree to our <span className="underline">Terms of Use</span> and <span className="underline">Privacy Policy</span>.
      </p>
    </>
  );
}

function IdentifyStep({ form, onChange, onBack, onSubmit }) {
  const isMobile = form.method === "mobile";
  const isGoogle = form.method === "google";

  return (
    <>
      <button type="button" onClick={onBack} className="mb-4 flex items-center gap-1 text-xs text-gray-400 hover:text-gray-700">
        ‹ Back
      </button>
      <h3 className="font-display mb-1 text-xl font-black text-gray-900">
        {isGoogle ? "Sign in with Google" : isMobile ? "Enter your mobile number" : "Enter your email address"}
      </h3>
      <p className="mb-5 text-xs text-gray-400">
        {isGoogle ? "We will send a verification code to the mobile linked with your Google account." : "We will send you a 6-digit one-time password."}
      </p>

      {form.signup && (
        <div className="mb-3">
          <label className="text-xs font-medium text-gray-500">Full name / Company</label>
          <input
            value={form.name}
            onChange={(e) => onChange({ name: e.target.value })}
            className="auth-input mt-1 w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm transition-all"
            placeholder="e.g. Rahul Sharma"
          />
        </div>
      )}

      <label className="text-xs font-medium text-gray-500">{isGoogle ? "Google account" : isMobile ? "Mobile number" : "Email address"}</label>
      <div className="mt-1 flex items-center overflow-hidden rounded-lg border border-gray-200 transition-all">
        {isMobile && <span className="border-r border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-500">+91</span>}
        <input
          type={isMobile ? "tel" : "email"}
          value={form.value}
          onChange={(e) => onChange({ value: e.target.value })}
          maxLength={isMobile ? 10 : 60}
          className="auth-input flex-1 border-0 px-3 py-2.5 text-sm focus:outline-none"
          placeholder={isMobile ? "98765 43210" : "you@company.com"}
        />
      </div>

      <button type="button" onClick={onSubmit} className="mt-5 w-full rounded-lg bg-primary py-3 text-sm font-bold text-white transition-colors hover:bg-primarydark">
        Send OTP
      </button>
    </>
  );
}

function OtpStep({ form, onBack, onResend, onVerify }) {
  const [entered, setEntered] = useState("");

  return (
    <>
      <button type="button" onClick={onBack} className="mb-4 flex items-center gap-1 text-xs text-gray-400 hover:text-gray-700">
        ‹ Back
      </button>
      <div className="mb-5 text-center">
        <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-orange-50 text-2xl">🔐</div>
        <h3 className="font-display text-xl font-black text-gray-900">Verify OTP</h3>
        <p className="mt-1 text-xs text-gray-400">
          6-digit code sent to <span className="font-semibold text-gray-600">{form.masked}</span>
        </p>
      </div>

      <input
        autoFocus
        inputMode="numeric"
        maxLength={6}
        value={entered}
        onChange={(e) => setEntered(e.target.value)}
        placeholder="••••••"
        className="otp-input w-full rounded-xl border-2 border-gray-200 px-4 py-4 text-center text-2xl font-black tracking-[0.5em] transition-all"
      />

      <div className="mt-3 flex items-center justify-between">
        <span className="text-xs text-gray-400">Didn&apos;t get it?</span>
        <button type="button" onClick={onResend} className="text-xs font-semibold" style={{ color: "#FF6B35" }}>
          Resend OTP
        </button>
      </div>

      <div className="mt-4 rounded-lg border border-orange-100 bg-orange-50 px-3 py-2 text-center">
        <span className="text-xs text-orange-700">
          Demo OTP: <b className="font-mono tracking-widest">{form.otp}</b>
        </span>
      </div>

      <button
        type="button"
        onClick={() => onVerify(entered)}
        className="mt-5 w-full rounded-lg bg-primary py-3 text-sm font-bold text-white transition-colors hover:bg-primarydark"
      >
        Verify &amp; Continue
      </button>
    </>
  );
}

function SuccessStep({ signup, onFinish }) {
  const { user } = useAuth();
  if (!user) return null;

  return (
    <div className="py-4 text-center">
      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-50 text-3xl">✅</div>
      <h3 className="font-display mb-1 text-xl font-black text-gray-900">{signup ? "Account created!" : "You're logged in!"}</h3>
      <p className="mb-6 text-xs text-gray-400">
        Welcome, <span className="font-semibold text-gray-700">{user.name}</span>
      </p>
      <div className="mb-5 rounded-xl bg-gray-50 p-4 text-left">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-navy font-bold text-white">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div className="min-w-0">
            <div className="truncate text-sm font-semibold text-gray-800">{user.name}</div>
            <div className="truncate text-xs text-gray-400">{user.contact}</div>
          </div>
        </div>
      </div>
      <button type="button" onClick={onFinish} className="w-full rounded-lg bg-primary py-3 text-sm font-bold text-white transition-colors hover:bg-primarydark">
        Start Shopping
      </button>
    </div>
  );
}

function LoggedInStep({ user, onTrackOrder, onLogout }) {
  return (
    <div className="py-4 text-center">
      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-navy text-2xl font-black text-white">
        {user.name.charAt(0).toUpperCase()}
      </div>
      <h3 className="font-display mb-1 text-xl font-black text-gray-900">{user.name}</h3>
      <p className="mb-6 text-xs text-gray-400">{user.contact}</p>
      <div className="space-y-2 text-left">
        <button type="button" className="flex w-full items-center gap-3 rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50">
          <span>📦</span> My Orders
        </button>
        <button type="button" onClick={onTrackOrder} className="flex w-full items-center gap-3 rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50">
          <span>🚚</span> Track an Order
        </button>
        <button type="button" className="flex w-full items-center gap-3 rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50">
          <span>🏭</span> Business Profile
        </button>
      </div>
      <button type="button" onClick={onLogout} className="mt-5 w-full rounded-lg bg-gray-800 py-3 text-sm font-bold text-white transition-colors hover:bg-gray-900">
        Logout
      </button>
    </div>
  );
}
