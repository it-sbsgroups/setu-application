"use client";

import { useState } from "react";
import { DISTRICTS_BY_STATE } from "@/lib/data/location";
import { ADDRESS_TYPES, CONTACT_PREFERENCES } from "@/lib/data/checkout";

const STATES = Object.keys(DISTRICTS_BY_STATE);

const INITIAL = {
  name: "",
  mobile: "",
  email: "",
  ccEmails: [],
  pincode: "",
  city: "",
  state: "",
  line1: "",
  line2: "",
  landmark: "",
  type: "Office",
  contactPref: "email",
  gstin: "",
};

/**
 * Merges `initial` over INITIAL, but ignores undefined/null values so we
 * never overwrite a controlled default with `undefined` (which would flip
 * React inputs from controlled → uncontrolled and back).
 */
function mergeInitial(initial) {
  const merged = { ...INITIAL };
  if (initial && typeof initial === "object") {
    for (const key of Object.keys(INITIAL)) {
      const value = initial[key];
      if (value !== undefined && value !== null) {
        merged[key] = value;
      }
    }
  }
  return merged;
}

function validate(form) {
  const e = {};
  if (!form.name.trim() || form.name.trim().length < 2) e.name = "Enter your full name";
  if (!/^\d{10}$/.test(form.mobile)) e.mobile = "Enter a 10-digit mobile";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email)) e.email = "Enter a valid email";
  if (!/^\d{6}$/.test(form.pincode)) e.pincode = "Enter a 6-digit pincode";
  if (!form.city.trim()) e.city = "Enter your city";
  if (!form.state) e.state = "Select a state";
  if (!form.line1.trim() || form.line1.trim().length < 8)
    e.line1 = "Enter a complete address (min 8 chars)";
  if (
    form.gstin &&
    !/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{3}$/.test(form.gstin.trim().toUpperCase())
  )
    e.gstin = "Enter a valid 15-char GSTIN or leave blank";
  return e;
}

export default function QuoteDetailsStep({ initial, submitting, onSubmit }) {
  // Lazy initializer — runs once on mount with a guaranteed-safe shape.
  const [form, setForm] = useState(() => mergeInitial(initial));
  const [errors, setErrors] = useState({});
  const [ccInput, setCcInput] = useState("");
  const [ccError, setCcError] = useState("");

  function update(patch) {
    setForm((p) => ({ ...p, ...patch }));
    setErrors((p) => {
      const n = { ...p };
      Object.keys(patch).forEach((k) => delete n[k]);
      return n;
    });
  }

  function addCcEmail() {
    const value = ccInput.trim().toLowerCase();
    if (!value) return;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) return setCcError("Enter a valid email address");
    if (value === form.email.trim().toLowerCase()) return setCcError("That's already the primary recipient");
    if (form.ccEmails.includes(value)) return setCcError("Already added");
    if (form.ccEmails.length >= 5) return setCcError("You can add up to 5 additional recipients");
    update({ ccEmails: [...form.ccEmails, value] });
    setCcInput("");
    setCcError("");
  }

  function removeCcEmail(value) {
    update({ ccEmails: form.ccEmails.filter((e) => e !== value) });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const found = validate(form);
    setErrors(found);
    if (Object.keys(found).length) {
      document
        .querySelector("[data-error='true']")
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    onSubmit({
      address: {
        name: form.name,
        mobile: form.mobile,
        pincode: form.pincode,
        city: form.city,
        state: form.state,
        line1: form.line1,
        line2: form.line2,
        landmark: form.landmark,
        type: form.type,
      },
      contact: {
        name: form.name,
        email: form.email,
        ccEmails: form.ccEmails,
        mobile: form.mobile,
        contactPref: form.contactPref,
        gstin: form.gstin ? form.gstin.trim().toUpperCase() : null,
      },
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm"
    >
      <h2 className="font-display mb-1 text-lg font-bold text-gray-900">
        Request a Quotation
      </h2>
      <p className="mb-5 text-xs text-gray-500">
        We&apos;ll email you a quotation (highest price of the range). You can
        negotiate before confirming.
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Full Name" error={errors.name}>
          <input
            value={form.name}
            onChange={(e) => update({ name: e.target.value })}
            autoComplete="name"
            placeholder="e.g. Rahul Sharma"
            className="checkout-input"
          />
        </Field>

        <Field label="Mobile Number" error={errors.mobile}>
          <div className="flex items-center overflow-hidden rounded-lg border border-gray-200 focus-within:border-primary">
            <span className="border-r border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-500">
              +91
            </span>
            <input
              value={form.mobile}
              onChange={(e) =>
                update({ mobile: e.target.value.replace(/\D/g, "").slice(0, 10) })
              }
              inputMode="numeric"
              autoComplete="tel"
              placeholder="98765 43210"
              className="checkout-input flex-1 border-0 focus:ring-0"
            />
          </div>
        </Field>

        <div className="sm:col-span-2">
          <Field label="Email (quotation will be sent here)" error={errors.email}>
            <input
              type="email"
              value={form.email}
              onChange={(e) => update({ email: e.target.value })}
              autoComplete="email"
              placeholder="you@company.com"
              className="checkout-input"
            />
          </Field>
        </div>

        <div className="sm:col-span-2">
          <Field label="Also send this quotation to (optional — e.g. your manager or finance team)" error={ccError}>
            <div className="flex gap-2">
              <input
                type="email"
                value={ccInput}
                onChange={(e) => {
                  setCcInput(e.target.value);
                  setCcError("");
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addCcEmail();
                  }
                }}
                placeholder="colleague@company.com"
                className="checkout-input flex-1"
              />
              <button
                type="button"
                onClick={addCcEmail}
                className="shrink-0 rounded-lg border border-gray-200 px-4 text-sm font-semibold text-gray-600 transition-colors hover:border-primary hover:text-primary"
              >
                Add
              </button>
            </div>
            {form.ccEmails.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {form.ccEmails.map((email) => (
                  <span key={email} className="flex items-center gap-1.5 rounded-full bg-orange-50 py-1 pl-3 pr-1.5 text-xs font-medium text-primary">
                    {email}
                    <button
                      type="button"
                      onClick={() => removeCcEmail(email)}
                      aria-label={`Remove ${email}`}
                      className="flex h-4 w-4 items-center justify-center rounded-full text-primary hover:bg-orange-100"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </Field>
        </div>

        <Field label="Pincode" error={errors.pincode}>
          <input
            value={form.pincode}
            onChange={(e) =>
              update({ pincode: e.target.value.replace(/\D/g, "").slice(0, 6) })
            }
            inputMode="numeric"
            autoComplete="postal-code"
            placeholder="400093"
            className="checkout-input"
          />
        </Field>

        <Field label="City" error={errors.city}>
          <input
            value={form.city}
            onChange={(e) => update({ city: e.target.value })}
            autoComplete="address-level2"
            placeholder="Mumbai"
            className="checkout-input"
          />
        </Field>

        <Field label="State" error={errors.state}>
          <select
            value={form.state}
            onChange={(e) => update({ state: e.target.value })}
            className="checkout-input"
          >
            <option value="">Select State</option>
            {STATES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Address Type">
          <div className="flex flex-wrap gap-2">
            {ADDRESS_TYPES.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => update({ type: t })}
                className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${
                  form.type === t
                    ? "border-primary bg-orange-50 text-primary"
                    : "border-gray-200 text-gray-500 hover:border-gray-300"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </Field>

        <div className="sm:col-span-2">
          <Field label="Address Line 1" error={errors.line1}>
            <input
              value={form.line1}
              onChange={(e) => update({ line1: e.target.value })}
              autoComplete="address-line1"
              placeholder="Plot / Building / Street"
              className="checkout-input"
            />
          </Field>
        </div>

        <div className="sm:col-span-2">
          <Field label="Address Line 2 (Optional)">
            <input
              value={form.line2}
              onChange={(e) => update({ line2: e.target.value })}
              autoComplete="address-line2"
              placeholder="Area / Industrial Estate"
              className="checkout-input"
            />
          </Field>
        </div>

        <Field label="Landmark (Optional)">
          <input
            value={form.landmark}
            onChange={(e) => update({ landmark: e.target.value })}
            placeholder="Near a landmark"
            className="checkout-input"
          />
        </Field>

        <Field label="GSTIN (Optional — for B2B invoicing)" error={errors.gstin}>
          <input
            value={form.gstin}
            onChange={(e) =>
              update({ gstin: e.target.value.toUpperCase().slice(0, 15) })
            }
            placeholder="27AABCU9603R1ZM"
            className="checkout-input font-mono uppercase"
          />
        </Field>

        <div className="sm:col-span-2">
          <Field label="Preferred Contact">
            <div className="flex flex-wrap gap-2">
              {CONTACT_PREFERENCES.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => update({ contactPref: p.id })}
                  className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${
                    form.contactPref === p.id
                      ? "border-primary bg-orange-50 text-primary"
                      : "border-gray-200 text-gray-500 hover:border-gray-300"
                  }`}
                >
                  <span>{p.icon}</span>
                  {p.label}
                </button>
              ))}
            </div>
          </Field>
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <button
          type="submit"
          disabled={submitting}
          className="rounded-lg bg-primary px-6 py-2.5 text-sm font-bold text-white transition-colors hover:bg-primarydark disabled:cursor-wait disabled:opacity-70"
        >
          {submitting ? "Sending quotation…" : "Request Quotation →"}
        </button>
      </div>
    </form>
  );
}

function Field({ label, error, children }) {
  return (
    <label className="block" data-error={error ? "true" : undefined}>
      <span className="mb-1 block text-xs font-medium text-gray-500">
        {label}
      </span>
      {children}
      {error && (
        <span className="mt-1 block text-[11px] font-medium text-red-500">
          {error}
        </span>
      )}
    </label>
  );
}