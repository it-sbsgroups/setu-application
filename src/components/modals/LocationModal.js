"use client";

import { useEffect, useState } from "react";
import Modal from "@/components/ui/Modal";
import { useUI } from "@/context/UIContext";
import { DISTRICTS_BY_STATE } from "@/lib/data/location";
import { LocationPinIcon } from "@/components/ui/Icons";

const INITIAL_FORM = { state: "", district: "", pincode: "", detecting: false };

export default function LocationModal() {
  const { overlay, closeOverlay, setDeliveryLabel, showToast } = useUI();
  const open = overlay === "location";
  const [form, setForm] = useState(INITIAL_FORM);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- resetting the form when the modal's visibility flips is the correct use of an effect here
    if (open) setForm(INITIAL_FORM);
  }, [open]);

  function detectLocation() {
    setForm((prev) => ({ ...prev, detecting: true }));
    setTimeout(() => {
      setForm({ state: "Maharashtra", district: "Mumbai", pincode: "400001", detecting: false });
      showToast("Location detected");
    }, 1100);
  }

  function applyLocation() {
    if (!form.state) return showToast("Please select a state");
    const label = (form.district ? form.district + ", " : "") + (form.pincode || form.state);
    setDeliveryLabel(label);
    closeOverlay();
    showToast("Delivering to " + label);
  }

  const districts = form.state ? DISTRICTS_BY_STATE[form.state] || [] : [];

  return (
    <Modal open={open} onClose={closeOverlay} align="start" widthClassName="max-w-xs">
      <div className="relative w-full rounded-xl bg-white p-5 shadow-2xl">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-display text-base font-semibold text-gray-900">Select Delivery Location</h3>
          <button type="button" onClick={closeOverlay} aria-label="Close" className="text-gray-400 hover:text-gray-600">
            ✕
          </button>
        </div>

        <button
          type="button"
          onClick={detectLocation}
          className="mb-4 flex w-full items-center gap-2 rounded-lg border-2 border-dashed border-orange-300 p-3 text-sm font-medium transition-colors hover:bg-orange-50"
          style={{ color: "#FF6B35" }}
        >
          <LocationPinIcon className="h-4 w-4 shrink-0" />
          <span>{form.detecting ? "Detecting your location…" : "Use my current location"}</span>
        </button>

        <div className="mb-4 text-center text-xs text-gray-400">— or enter manually —</div>

        <div className="space-y-3">
          <div>
            <label className="text-xs font-medium text-gray-500">Country</label>
            <input value="India" readOnly className="mt-1 w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-500" />
          </div>
          <div>
            <label className="text-xs font-medium text-gray-500">State</label>
            <select
              value={form.state}
              onChange={(e) => setForm({ ...form, state: e.target.value, district: "" })}
              className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none"
            >
              <option value="">Select State</option>
              {Object.keys(DISTRICTS_BY_STATE).map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>
          {form.state && (
            <div>
              <label className="text-xs font-medium text-gray-500">District</label>
              <select
                value={form.district}
                onChange={(e) => setForm({ ...form, district: e.target.value })}
                className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none"
              >
                <option value="">Select District</option>
                {districts.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>
          )}
          <div>
            <label className="text-xs font-medium text-gray-500">Pincode</label>
            <input
              value={form.pincode}
              onChange={(e) => setForm({ ...form, pincode: e.target.value.replace(/\D/g, "") })}
              placeholder="Enter 6-digit pincode"
              maxLength={6}
              className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none"
            />
          </div>
        </div>

        <button type="button" onClick={applyLocation} className="mt-4 w-full rounded-lg bg-primary py-2 text-sm font-semibold text-white transition-colors hover:bg-primarydark">
          Apply Location
        </button>
      </div>
    </Modal>
  );
}
