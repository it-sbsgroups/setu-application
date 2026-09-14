"use client";

import { useState } from "react";
import { PAYMENT_METHODS } from "@/lib/data/checkout";

export default function PaymentStep({ initial, subtotal, onBack, onContinue }) {
  const [selected, setSelected] = useState(initial?.method || "");

  const isCod = selected === "cod";
  const isCredit = selected === "credit-terms";

  return (
    <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
      <h2 className="font-display mb-4 text-lg font-bold text-gray-900">
        Payment Method
      </h2>

      <ul className="space-y-2">
        {PAYMENT_METHODS.map((method) => {
          const active = selected === method.id;
          return (
            <li key={method.id}>
              <button
                type="button"
                onClick={() => setSelected(method.id)}
                aria-pressed={active}
                className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left transition-all ${
                  active
                    ? "border-primary bg-orange-50/60"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-lg shadow-sm">
                  {method.icon}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-semibold text-gray-800">
                    {method.title}
                  </div>
                  <div className="text-xs text-gray-400">{method.sub}</div>
                </div>
                <span
                  className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 ${
                    active ? "border-primary" : "border-gray-300"
                  }`}
                >
                  {active && <span className="h-2 w-2 rounded-full bg-primary" />}
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      {isCod && (
        <p className="mt-3 rounded-lg bg-amber-50 px-3 py-2 text-[11px] text-amber-800">
          ⚠️ Cash on Delivery is available for orders up to ₹20,000. A ₹49
          handling fee applies at delivery.
        </p>
      )}

      {isCredit && (
        <p className="mt-3 rounded-lg bg-blue-50 px-3 py-2 text-[11px] text-blue-800">
          📄 Business Credit Terms require GSTIN verification. Our B2B team will
          reach out within 24 hours. Order will be dispatched once approved.
        </p>
      )}

      <div className="mt-6 flex justify-between">
        <button
          type="button"
          onClick={onBack}
          className="rounded-lg border border-gray-200 px-5 py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-50"
        >
          ← Back
        </button>
        <button
          type="button"
          disabled={!selected}
          onClick={() => onContinue({ method: selected })}
          className="rounded-lg bg-primary px-6 py-2.5 text-sm font-bold text-white transition-colors hover:bg-primarydark disabled:cursor-not-allowed disabled:opacity-50"
        >
          Review Order →
        </button>
      </div>
    </div>
  );
}