"use client";

import Link from "next/link";
import { useState } from "react";
import { useAccount } from "@/context/AccountContext";
import { useUI } from "@/context/UIContext";
import VerificationBadge from "@/components/account/VerificationBadge";

const CHANNELS = [
  { id: "email",    label: "Email",    icon: "✉️", hint: "rahul@acmeindustries.in" },
  { id: "sms",      label: "SMS",      icon: "📱", hint: "+91 ••••••43210" },
  { id: "whatsapp", label: "WhatsApp", icon: "💬", hint: "Business number" },
];

const TOPICS = [
  { id: "orderUpdates",       label: "Order status updates",     hint: "Dispatch, transit, delivery" },
  { id: "negotiationReplies", label: "Negotiation replies",      hint: "When Pricing Desk responds" },
  { id: "supportReplies",     label: "Support ticket replies",   hint: "When our team responds" },
  { id: "marketing",          label: "Offers & new arrivals",    hint: "Promotional content" },
  { id: "weeklyDigest",       label: "Weekly spend digest",      hint: "Every Monday 9 AM IST" },
];

const LANGUAGES = [
  { id: "en-IN", label: "English (India)" },
  { id: "hi-IN", label: "हिन्दी (Hindi)" },
  { id: "mr-IN", label: "मराठी (Marathi)" },
  { id: "ta-IN", label: "தமிழ் (Tamil)" },
];

export default function ProfilePage() {
  const { account, updateProfile, updatePreferences, cancelAadharChange } = useAccount();
  const { showToast } = useUI();
  const [form, setForm] = useState(() => account?.profile || {});
  const [altContact, setAltContact] = useState(() => account?.profile.alternateContact || {});
  const [dirty, setDirty] = useState(false);

  if (!account) return null;
  const pending = account.profile.pendingAadharChange;
  const prefs = account.preferences;

  function change(patch) {
    setForm((f) => ({ ...f, ...patch }));
    setDirty(true);
  }

  function save() {
    updateProfile({
      name: form.name,
      mobile: form.mobile,
      email: form.email,
      designation: form.designation,
      employeeId: form.employeeId,
      gstin: form.gstin,
      alternateContact: altContact,
    });
    setDirty(false);
    showToast("Profile updated");
  }

  function toggleChannel(id) {
    updatePreferences({ channels: { [id]: !prefs.channels[id] } });
  }

  function toggleTopic(id) {
    updatePreferences({ topics: { [id]: !prefs.topics[id] } });
  }

  function setLanguage(lang) {
    updatePreferences({ language: lang });
    showToast("Language preference saved");
  }

  return (
    <div className="space-y-5">
      <div>
        <h1 className="font-display text-2xl font-black text-gray-900">Profile & Preferences</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage your details, communication preferences, and how we reach you.
        </p>
      </div>

      {pending && (
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="font-bold text-amber-900">
                ⏳ Pending changes — Aadhaar re-verification needed
              </p>
              <p className="mt-1 text-xs text-amber-800">
                {Object.entries(pending)
                  .filter(([k]) => ["name", "mobile", "email"].includes(k))
                  .map(([k, v]) => `${k}: "${v}"`)
                  .join(" · ")}
              </p>
            </div>
            <div className="flex gap-2">
              <Link
                href="/account/verification"
                className="rounded-lg bg-primary px-4 py-2 text-xs font-bold text-white hover:bg-primarydark"
              >
                Complete verification →
              </Link>
              <button
                onClick={cancelAadharChange}
                className="rounded-lg border border-gray-200 px-3 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Identity */}
      <section className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-gray-100 pb-4">
          <h2 className="font-display text-base font-bold text-gray-900">Identity</h2>
          <div className="flex flex-wrap gap-1.5">
            <VerificationBadge
              kind="Aadhaar"
              verified={account.profile.aadharVerified}
              pending={!!account.profile.pendingAadharChange}
            />
            <VerificationBadge
              kind="Org"
              verified={account.profile.orgVerified}
              pending={!!account.profile.pendingOrgVerification}
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Full Name (Aadhaar-verified name)">
            <input
              value={form.name || ""}
              onChange={(e) => change({ name: e.target.value })}
              className="checkout-input"
            />
          </Field>
          <Field label="Mobile">
            <div className="flex items-center overflow-hidden rounded-lg border border-gray-200 focus-within:border-primary">
              <span className="border-r border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-500">
                +91
              </span>
              <input
                value={form.mobile || ""}
                onChange={(e) =>
                  change({ mobile: e.target.value.replace(/\D/g, "").slice(0, 10) })
                }
                inputMode="numeric"
                className="checkout-input flex-1 border-0 focus:ring-0"
              />
            </div>
          </Field>
          <Field label="Email (quotation delivery)">
            <input
              value={form.email || ""}
              onChange={(e) => change({ email: e.target.value })}
              type="email"
              className="checkout-input"
            />
          </Field>
          <Field label="Designation">
            <input
              value={form.designation || ""}
              onChange={(e) => change({ designation: e.target.value })}
              className="checkout-input"
            />
          </Field>
          <Field label="Organization / Employee ID">
            <input
              value={form.employeeId || ""}
              onChange={(e) => change({ employeeId: e.target.value })}
              className="checkout-input"
            />
          </Field>
          <Field label="GSTIN (for B2B invoicing)">
            <input
              value={form.gstin || ""}
              onChange={(e) =>
                change({ gstin: e.target.value.toUpperCase().slice(0, 15) })
              }
              className="checkout-input font-mono"
            />
          </Field>
        </div>

        <div className="mt-5 flex items-center justify-end gap-2">
          <button
            disabled={!dirty}
            onClick={save}
            className="rounded-lg bg-primary px-6 py-2.5 text-sm font-bold text-white hover:bg-primarydark disabled:opacity-50"
          >
            Save changes
          </button>
        </div>
      </section>

      {/* Alternate contact */}
      <section className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
        <h2 className="font-display mb-1 text-base font-bold text-gray-900">
          Alternate Contact
        </h2>
        <p className="mb-4 text-xs text-gray-500">
          Someone we can reach if you&apos;re unavailable (e.g. your manager or finance lead).
        </p>
        <div className="grid gap-4 sm:grid-cols-3">
          <Field label="Name">
            <input
              value={altContact.name || ""}
              onChange={(e) => {
                setAltContact((a) => ({ ...a, name: e.target.value }));
                setDirty(true);
              }}
              placeholder="e.g. Priya Nair"
              className="checkout-input"
            />
          </Field>
          <Field label="Email">
            <input
              value={altContact.email || ""}
              onChange={(e) => {
                setAltContact((a) => ({ ...a, email: e.target.value }));
                setDirty(true);
              }}
              placeholder="colleague@company.com"
              className="checkout-input"
            />
          </Field>
          <Field label="Mobile">
            <input
              value={altContact.mobile || ""}
              onChange={(e) => {
                setAltContact((a) => ({
                  ...a,
                  mobile: e.target.value.replace(/\D/g, "").slice(0, 10),
                }));
                setDirty(true);
              }}
              inputMode="numeric"
              placeholder="98765 43210"
              className="checkout-input"
            />
          </Field>
        </div>
      </section>

      {/* Notification preferences */}
      <section className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
        <h2 className="font-display mb-1 text-base font-bold text-gray-900">
          Notification Preferences
        </h2>
        <p className="mb-4 text-xs text-gray-500">
          Choose how and what we notify you about.
        </p>

        {/* Channels */}
        <div className="mb-5">
          <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-gray-500">
            Channels
          </p>
          <div className="grid gap-2 sm:grid-cols-3">
            {CHANNELS.map((c) => {
              const on = !!prefs.channels[c.id];
              return (
                <button
                  key={c.id}
                  onClick={() => toggleChannel(c.id)}
                  className={`flex items-center gap-3 rounded-xl border p-3 text-left transition-colors ${
                    on
                      ? "border-primary bg-orange-50/60"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-lg shadow-sm">
                    {c.icon}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold text-gray-800">{c.label}</p>
                    <p className="truncate text-[11px] text-gray-400">{c.hint}</p>
                  </div>
                  <span
                    className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 ${
                      on ? "border-primary" : "border-gray-300"
                    }`}
                  >
                    {on && <span className="h-2 w-2 rounded-full bg-primary" />}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Topics */}
        <div>
          <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-gray-500">
            Topics
          </p>
          <ul className="divide-y divide-gray-100 rounded-xl border border-gray-100">
            {TOPICS.map((t) => {
              const on = !!prefs.topics[t.id];
              return (
                <li key={t.id}>
                  <label className="flex cursor-pointer items-center gap-3 px-4 py-3">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-gray-800">
                        {t.label}
                      </p>
                      <p className="text-[11px] text-gray-400">{t.hint}</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={on}
                      onChange={() => toggleTopic(t.id)}
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    />
                  </label>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Localization */}
      <section className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
        <h2 className="font-display mb-1 text-base font-bold text-gray-900">
          Language &amp; Region
        </h2>
        <p className="mb-4 text-xs text-gray-500">
          Used for quotations, invoices, and notification emails.
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Preferred language">
            <select
              value={prefs.language}
              onChange={(e) => setLanguage(e.target.value)}
              className="checkout-input"
            >
              {LANGUAGES.map((l) => (
                <option key={l.id} value={l.id}>
                  {l.label}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Timezone">
            <input
              value={prefs.timezone}
              readOnly
              className="checkout-input bg-gray-50 text-gray-500"
            />
          </Field>
        </div>
      </section>

      {/* Organization */}
      <section className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
        <h2 className="font-display mb-2 text-base font-bold text-gray-900">
          Organization
        </h2>
        <p className="text-xs text-gray-500">
          Organization details can only be changed by contacting your onboarding
          manager.
        </p>
        <div className="mt-3 grid gap-2 text-sm">
          <p>
            <span className="text-gray-500">Company:</span>{" "}
            <b className="text-gray-800">{account.profile.orgName}</b>
          </p>
          <p>
            <span className="text-gray-500">CIN:</span>{" "}
            <span className="font-mono text-xs">{account.profile.orgCIN}</span>
          </p>
          {account.profile.orgVerified && (
            <p className="text-xs text-green-700">
              ✅ Verified by {account.profile.orgVerifierName} on{" "}
              {new Date(account.profile.orgVerifiedAt).toLocaleDateString("en-IN")}
            </p>
          )}
        </div>
      </section>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-medium text-gray-500">
        {label}
      </span>
      {children}
    </label>
  );
}