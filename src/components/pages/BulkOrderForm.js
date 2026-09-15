"use client";

import { useState } from "react";
import { useUI } from "@/context/UIContext";

const INITIAL = {
  name: "",
  company: "",
  email: "",
  phone: "",
  gstin: "",
  category: "",
  quantity: "",
  message: "",
};

const CATEGORY_OPTIONS = [
  "Power Tools",
  "Hand Tools",
  "Safety & PPE",
  "Electrical",
  "Plumbing",
  "Fasteners",
  "Abrasives",
  "Welding",
  "Material Handling",
  "IT & Office",
  "Multiple Categories",
];

export default function BulkOrderForm() {
  const { showToast } = useUI();
  const [form, setForm] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [busy, setBusy] = useState(false);

  function update(patch) {
    setForm((p) => ({ ...p, ...patch }));
    setErrors((p) => {
      const n = { ...p };
      Object.keys(patch).forEach((k) => delete n[k]);
      return n;
    });
  }

  function validate() {
    const e = {};
    if (!form.name.trim()) e.name = "Enter your name";
    if (!form.company.trim()) e.company = "Enter your company";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email))
      e.email = "Enter a valid email";
    if (!/^\d{10}$/.test(form.phone)) e.phone = "Enter a 10-digit mobile";
    if (!form.category) e.category = "Select a category";
    if (!form.quantity.trim()) e.quantity = "Mention approximate quantity";
    if (!form.message.trim() || form.message.trim().length < 15)
      e.message = "Describe your requirement (min 15 chars)";
    return e;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length) return;
    setBusy(true);
    await new Promise((r) => setTimeout(r, 900));
    setBusy(false);
    showToast("Bulk enquiry sent — our team will reach out within 24 hours");
    setForm(INITIAL);
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm"
    >
      <h2 className="font-display mb-1 text-lg font-bold text-gray-900">
        Raise a Bulk Enquiry
      </h2>
      <p className="mb-5 text-xs text-gray-500">
        Share your requirement and our B2B team will get back within 24 hours
        with a tailored quote.
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Full Name" error={errors.name}>
          <input
            value={form.name}
            onChange={(e) => update({ name: e.target.value })}
            placeholder="Rahul Sharma"
            className="checkout-input"
          />
        </Field>

        <Field label="Company" error={errors.company}>
          <input
            value={form.company}
            onChange={(e) => update({ company: e.target.value })}
            placeholder="Acme Industries Pvt Ltd"
            className="checkout-input"
          />
        </Field>

        <Field label="Email" error={errors.email}>
          <input
            type="email"
            value={form.email}
            onChange={(e) => update({ email: e.target.value })}
            placeholder="you@company.com"
            className="checkout-input"
          />
        </Field>

        <Field label="Mobile" error={errors.phone}>
          <input
            inputMode="numeric"
            value={form.phone}
            onChange={(e) =>
              update({ phone: e.target.value.replace(/\D/g, "").slice(0, 10) })
            }
            placeholder="98765 43210"
            className="checkout-input"
          />
        </Field>

        <Field label="GSTIN (Optional)">
          <input
            value={form.gstin}
            onChange={(e) =>
              update({ gstin: e.target.value.toUpperCase().slice(0, 15) })
            }
            placeholder="27AABCU9603R1ZM"
            className="checkout-input font-mono uppercase"
          />
        </Field>

        <Field label="Category" error={errors.category}>
          <select
            value={form.category}
            onChange={(e) => update({ category: e.target.value })}
            className="checkout-input"
          >
            <option value="">Select a category</option>
            {CATEGORY_OPTIONS.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </Field>

        <div className="sm:col-span-2">
          <Field label="Approximate Quantity" error={errors.quantity}>
            <input
              value={form.quantity}
              onChange={(e) => update({ quantity: e.target.value })}
              placeholder="e.g. 500 units, or ₹5 lakh per month"
              className="checkout-input"
            />
          </Field>
        </div>

        <div className="sm:col-span-2">
          <Field label="Requirement Details" error={errors.message}>
            <textarea
              rows={5}
              value={form.message}
              onChange={(e) => update({ message: e.target.value })}
              placeholder="List specific products, specs, or delivery timelines…"
              className="checkout-input resize-y"
            />
          </Field>
        </div>
      </div>

      <button
        type="submit"
        disabled={busy}
        className="mt-5 w-full rounded-lg bg-primary py-3 text-sm font-bold text-white hover:bg-primarydark disabled:opacity-70 sm:w-auto sm:px-8"
      >
        {busy ? "Sending…" : "Send Bulk Enquiry →"}
      </button>
    </form>
  );
}

function Field({ label, error, children }) {
  return (
    <label className="block">
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