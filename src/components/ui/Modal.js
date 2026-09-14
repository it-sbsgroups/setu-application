"use client";

import { useEffect } from "react";

/**
 * Centered modal shell: dims the page, closes on backdrop click or Escape,
 * and pauses body scroll while open. `align="start"` (used by the location
 * picker) pins the panel near the top instead of vertically centering it.
 */
export default function Modal({ open, onClose, children, align = "center", widthClassName = "max-w-md" }) {
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";

    function handleKeyDown(e) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex justify-center bg-black/55 p-4 ${
        align === "start" ? "items-start pt-20" : "items-center"
      }`}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className={`dropdown-animate relative w-full ${widthClassName}`}>{children}</div>
    </div>
  );
}
