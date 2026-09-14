"use client";

import { useUI } from "@/context/UIContext";

export default function BulkEnquiry({ productName }) {
  const { showToast } = useUI();

  return (
    <div className="flex flex-col items-center gap-4 rounded-xl border border-orange-100 bg-orange-50/60 p-5 sm:flex-row sm:justify-between">
      <div>
        <p className="text-sm font-bold text-gray-800">Looking to purchase {productName} in bulk?</p>
        <p className="mt-1 text-xs text-gray-500">✓ Purchase in bulk quantity &nbsp; ✓ Get the best price for your business</p>
      </div>
      <button
        type="button"
        onClick={() => showToast("Bulk enquiry request sent — our team will reach out shortly")}
        className="shrink-0 whitespace-nowrap rounded-lg bg-primary px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-primarydark"
      >
        Click to Raise Request
      </button>
    </div>
  );
}
