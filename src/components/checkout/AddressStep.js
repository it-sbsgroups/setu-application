"use client";

import { useState } from "react";
import { DISTRICTS_BY_STATE } from "@/lib/data/location";
import { ADDRESS_TYPES } from "@/lib/data/checkout";

const STATES = Object.keys(DISTRICTS_BY_STATE);

function validate(form) {
  const errors = {};
  if (!form.name.trim() || form.name.trim().length < 2)
    errors.name = "Enter your full name";
  if (!/^\d{10}$/.test(form.mobile)) errors.mobile = "Enter a 10-digit mobile";
  if (!/^\d{6}$/.test(form.pincode)) errors.pincode = "Enter a 6-digit pincode";
  if (!form.city.trim()) errors.city = "Enter your city";
  if (!form.state) errors.state = "Select a state";
  if (!form.line1.trim() || form.line1.trim().length < 8)
    errors.line1 = "Enter a complete address (min 8 chars)";
  return errors;
}

const INITIAL = {
  name: "",
  mobile: "",
  pincode: "",
  city: "",
  state: "",
  line1: "",
  line2: "",
  landmark: "",
  type: "Office",
};

export default function AddressStep({ initial, onContinue }) {
  const [form, setForm] = useState(initial || INITIAL);
  const [errors, setErrors] = useState({});

  function update(patch) {
    setForm((prev) => ({ ...prev, ...patch }));
    setErrors((prev) => {
      const next = { ...prev };
      Object.keys(patch).forEach((k) => delete next[k]);
      return next;
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const found = validate(form);
    setErrors(found);
    if (Object.keys(found).length === 0) onContinue(form);
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm"
    >
      <h2 className="font-display mb-4 text-lg font-bold text-gray-900">
        Delivery Address
      </h2>

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

        <div className="sm:col-span-2">
          <Field label="Landmark (Optional)">
            <input
              value={form.landmark}
              onChange={(e) => update({ landmark: e.target.value })}
              placeholder="Near a well-known landmark"
              className="checkout-input"
            />
          </Field>
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <button
          type="submit"
          className="rounded-lg bg-primary px-6 py-2.5 text-sm font-bold text-white transition-colors hover:bg-primarydark"
        >
          Continue to Payment →
        </button>
      </div>
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