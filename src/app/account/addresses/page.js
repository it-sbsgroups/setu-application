"use client";

import { useState } from "react";
import { useAccount } from "@/context/AccountContext";
import { useUI } from "@/context/UIContext";
import Modal from "@/components/ui/Modal";
import { DISTRICTS_BY_STATE } from "@/lib/data/location";

const STATES = Object.keys(DISTRICTS_BY_STATE);
const TYPES = ["Home", "Office", "Factory", "Warehouse"];

const EMPTY = {
  label: "",
  type: "Office",
  name: "",
  mobile: "",
  pincode: "",
  city: "",
  state: "",
  line1: "",
  line2: "",
  landmark: "",
};

function validate(form) {
  const e = {};
  if (!form.label.trim()) e.label = "Give this address a label";
  if (!form.name.trim() || form.name.trim().length < 2) e.name = "Enter recipient's full name";
  if (!/^\d{10}$/.test(form.mobile)) e.mobile = "Enter a 10-digit mobile";
  if (!/^\d{6}$/.test(form.pincode)) e.pincode = "Enter a 6-digit pincode";
  if (!form.city.trim()) e.city = "Enter your city";
  if (!form.state) e.state = "Select a state";
  if (!form.line1.trim() || form.line1.trim().length < 8) e.line1 = "Enter a complete address";
  return e;
}

function typeIcon(type) {
  if (type === "Office") return "🏢";
  if (type === "Factory") return "🏭";
  if (type === "Warehouse") return "🏬";
  return "🏠";
}

export default function AddressesPage() {
  const { account, addAddress, updateAddress, removeAddress, setDefaultAddress } = useAccount();
  const { showToast } = useUI();
  const [editingId, setEditingId] = useState(null); // null | "new" | addrId
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});

  if (!account) return null;
  const addresses = account.addresses || [];

  function openNew() {
    setEditingId("new");
    setForm(EMPTY);
    setErrors({});
  }

  function openEdit(addr) {
    setEditingId(addr.id);
    setForm({ ...EMPTY, ...addr });
    setErrors({});
  }

  function close() {
    setEditingId(null);
    setForm(EMPTY);
    setErrors({});
  }

  function update(patch) {
    setForm((p) => ({ ...p, ...patch }));
    setErrors((p) => {
      const n = { ...p };
      Object.keys(patch).forEach((k) => delete n[k]);
      return n;
    });
  }

  function save() {
    const found = validate(form);
    setErrors(found);
    if (Object.keys(found).length) return;

    if (editingId === "new") {
      addAddress(form);
      showToast("Address added");
    } else {
      updateAddress(editingId, form);
      showToast("Address updated");
    }
    close();
  }

  function handleRemove(addr) {
    if (addresses.length === 1) {
      return showToast("You need at least one saved address");
    }
    if (!confirm(`Remove "${addr.label}"?`)) return;
    removeAddress(addr.id);
    showToast("Address removed");
  }

  function handleDefault(addr) {
    setDefaultAddress(addr.id);
    showToast(`${addr.label} set as default`);
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-black text-gray-900">Delivery Addresses</h1>
          <p className="mt-1 text-sm text-gray-500">
            Save multiple delivery locations — pick one when uploading a PO or at checkout.
          </p>
        </div>
        <button
          onClick={openNew}
          className="rounded-lg bg-primary px-5 py-2.5 text-sm font-bold text-white hover:bg-primarydark"
        >
          + Add New Address
        </button>
      </div>

      {addresses.length === 0 ? (
        <div className="rounded-xl border border-gray-100 bg-white py-16 text-center shadow-sm">
          <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-orange-50 text-2xl">📍</div>
          <p className="text-sm font-semibold text-gray-700">No addresses yet</p>
          <p className="mt-1 text-xs text-gray-400">Add your first delivery location to get started.</p>
          <button
            onClick={openNew}
            className="mt-4 rounded-lg bg-primary px-5 py-2 text-xs font-bold text-white hover:bg-primarydark"
          >
            Add Address
          </button>
        </div>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2">
          {addresses.map((addr) => (
            <li
              key={addr.id}
              className={`relative rounded-xl border bg-white p-5 shadow-sm transition-colors ${
                addr.isDefault ? "border-primary ring-1 ring-primary/20" : "border-gray-100 hover:border-gray-200"
              }`}
            >
              <div className="mb-2 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-lg" aria-hidden="true">{typeIcon(addr.type)}</span>
                  <div>
                    <p className="text-sm font-bold text-gray-900">{addr.label}</p>
                    <span className="rounded bg-gray-100 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-gray-500">
                      {addr.type}
                    </span>
                  </div>
                </div>
                {addr.isDefault && (
                  <span className="rounded-full bg-orange-50 px-2 py-0.5 text-[10px] font-bold text-primary">
                    DEFAULT
                  </span>
                )}
              </div>

              <p className="mt-3 text-xs font-semibold text-gray-800">{addr.name}</p>
              <p className="mt-1 text-xs leading-relaxed text-gray-600">
                {addr.line1}
                {addr.line2 ? `, ${addr.line2}` : ""}
                {addr.landmark ? `, near ${addr.landmark}` : ""}
                <br />
                {addr.city}, {addr.state} — {addr.pincode}
              </p>
              <p className="mt-1 text-xs text-gray-500">📞 +91 {addr.mobile}</p>

              <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-gray-100 pt-3">
                <button
                  onClick={() => openEdit(addr)}
                  className="text-xs font-semibold text-primary hover:underline"
                >
                  Edit
                </button>
                {!addr.isDefault && (
                  <>
                    <span className="text-gray-300">·</span>
                    <button
                      onClick={() => handleDefault(addr)}
                      className="text-xs font-semibold text-gray-600 hover:underline"
                    >
                      Set as default
                    </button>
                  </>
                )}
                <span className="text-gray-300">·</span>
                <button
                  onClick={() => handleRemove(addr)}
                  className="text-xs font-semibold text-gray-400 hover:text-red-500"
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <Modal open={editingId !== null} onClose={close}>
        <div className="pop-animate max-h-[92vh] w-full overflow-y-auto rounded-2xl bg-white p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-lg font-black text-gray-900">
              {editingId === "new" ? "Add New Address" : "Edit Address"}
            </h2>
            <button
              onClick={close}
              className="text-gray-400 hover:text-gray-600"
              aria-label="Close"
            >
              ✕
            </button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Label" error={errors.label}>
              <input
                value={form.label}
                onChange={(e) => update({ label: e.target.value })}
                placeholder="e.g. Head Office"
                className="checkout-input"
              />
            </Field>

            <Field label="Address Type">
              <div className="flex flex-wrap gap-2">
                {TYPES.map((t) => (
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

            <Field label="Recipient Name" error={errors.name}>
              <input
                value={form.name}
                onChange={(e) => update({ name: e.target.value })}
                placeholder="e.g. Rahul Sharma"
                className="checkout-input"
              />
            </Field>

            <Field label="Mobile" error={errors.mobile}>
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
                  placeholder="98765 43210"
                  className="checkout-input flex-1 border-0 focus:ring-0"
                />
              </div>
            </Field>

            <div className="sm:col-span-2">
              <Field label="Address Line 1" error={errors.line1}>
                <input
                  value={form.line1}
                  onChange={(e) => update({ line1: e.target.value })}
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

            <Field label="Pincode" error={errors.pincode}>
              <input
                value={form.pincode}
                onChange={(e) =>
                  update({ pincode: e.target.value.replace(/\D/g, "").slice(0, 6) })
                }
                inputMode="numeric"
                placeholder="400093"
                className="checkout-input"
              />
            </Field>

            <Field label="City" error={errors.city}>
              <input
                value={form.city}
                onChange={(e) => update({ city: e.target.value })}
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
          </div>

          <div className="mt-6 flex justify-end gap-2">
            <button
              onClick={close}
              className="rounded-lg border border-gray-200 px-5 py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={save}
              className="rounded-lg bg-primary px-6 py-2.5 text-sm font-bold text-white hover:bg-primarydark"
            >
              {editingId === "new" ? "Add Address" : "Save Changes"}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

function Field({ label, error, children }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-medium text-gray-500">{label}</span>
      {children}
      {error && (
        <span className="mt-1 block text-[11px] font-medium text-red-500">{error}</span>
      )}
    </label>
  );
}