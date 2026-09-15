"use client";

import { useState } from "react";
import { useUI } from "@/context/UIContext";

const SUBJECTS = [
  "General Enquiry",
  "B2B / Bulk Orders",
  "Customer Support",
  "Vendor / Seller",
  "Press & Media",
  "Grievance",
];

export default function ContactForm() {
  const { showToast } = useUI();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: SUBJECTS[0],
    message: "",
  });
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
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email))
      e.email = "Enter a valid email";
    if (form.phone && !/^\d{10}$/.test(form.phone))
      e.phone = "Enter a 10-digit number";
    if (!form.message.trim() || form.message.trim().length < 10)
      e.message = "Message must be at least 10 characters";
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
    showToast("Message sent — we'll reply within 1 business day");
    setForm({ name: "", email: "", phone: "", subject: SUBJECTS[0], message: "" });
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm"
    >
      <h2 className="font-display mb-4 text-lg font-bold text-gray-900">
        Send us a message
      </h2>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Full Name" error={errors.name}>
          <input
            value={form.name}
            onChange={(e) => update({ name: e.target.value })}
            placeholder="e.g. Rahul Sharma"
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

        <Field label="Mobile (Optional)" error={errors.phone}>
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

        <Field label="Subject">
          <select
            value={form.subject}
            onChange={(e) => update({ subject: e.target.value })}
            className="checkout-input"
          >
            {SUBJECTS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </Field>

        <div className="sm:col-span-2">
          <Field label="Message" error={errors.message}>
            <textarea
              rows={5}
              value={form.message}
              onChange={(e) => update({ message: e.target.value })}
              placeholder="Tell us what you need…"
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
        {busy ? "Sending…" : "Send Message →"}
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