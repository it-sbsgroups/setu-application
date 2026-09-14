"use client";

import { useUI } from "@/context/UIContext";

export default function Toast() {
  const { toastMessage } = useUI();

  if (!toastMessage) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-6 left-1/2 z-[9999] -translate-x-1/2 rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white shadow-2xl"
    >
      {toastMessage}
    </div>
  );
}
