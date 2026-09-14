"use client";

import { useUI } from "@/context/UIContext";
import { LocationPinIcon, ChevronDownIcon } from "@/components/ui/Icons";

export default function LocationButton() {
  const { deliveryLabel, openLocation } = useUI();

  return (
    <button
      type="button"
      onClick={openLocation}
      className="hidden shrink-0 items-center gap-1.5 rounded-lg border border-white/20 px-2.5 py-1.5 transition-colors hover:bg-white/10 md:flex"
    >
      <LocationPinIcon className="h-4 w-4 shrink-0" style={{ color: "#FF6B35" }} />
      <div className="text-left">
        <div className="text-xs leading-none text-gray-400">Deliver to</div>
        <div className="text-xs font-semibold leading-tight text-white">{deliveryLabel}</div>
      </div>
      <ChevronDownIcon className="ml-0.5 h-3 w-3 text-gray-400" />
    </button>
  );
}
