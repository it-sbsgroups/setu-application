"use client";

import { useState } from "react";

export default function ProductDescription({ paragraphs }) {
  const [expanded, setExpanded] = useState(false);
  if (!paragraphs?.length) return null;

  const visible = expanded ? paragraphs : paragraphs.slice(0, 1);

  return (
    <div className="rounded-xl border border-gray-100 bg-white p-5">
      <h2 className="font-display mb-3 text-base font-bold text-gray-900">Product Details</h2>
      <div className="space-y-3 text-sm leading-relaxed text-gray-600">
        {visible.map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>
      {paragraphs.length > 1 && (
        <button type="button" onClick={() => setExpanded((v) => !v)} className="mt-3 text-xs font-semibold text-primary">
          {expanded ? "Show less ▲" : "Read more ▼"}
        </button>
      )}
    </div>
  );
}
