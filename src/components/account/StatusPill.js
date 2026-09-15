// src/components/account/StatusPill.js
import { STATUS_META, TONE_CLASSES } from "@/lib/data/account";

export default function StatusPill({ status, size = "sm" }) {
  const meta = STATUS_META[status] || { label: status, tone: "gray", icon: "•" };
  const cls = TONE_CLASSES[meta.tone] || TONE_CLASSES.gray;
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full ring-1 ${cls} ${
        size === "sm" ? "px-2 py-0.5 text-[11px] font-semibold" : "px-2.5 py-1 text-xs font-semibold"
      }`}
    >
      <span aria-hidden="true">{meta.icon}</span>
      {meta.label}
    </span>
  );
}