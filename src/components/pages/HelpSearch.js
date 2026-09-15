"use client";

import { useMemo, useState } from "react";
import { HELP_CATEGORIES } from "@/lib/data/help";

export default function HelpSearch() {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return null;
    const out = [];
    HELP_CATEGORIES.forEach((cat) => {
      cat.faqs.forEach((faq) => {
        if (
          faq.q.toLowerCase().includes(q) ||
          faq.a.toLowerCase().includes(q)
        ) {
          out.push({ ...faq, category: cat.title });
        }
      });
    });
    return out.slice(0, 8);
  }, [query]);

  return (
    <div className="relative -mt-6 rounded-xl border border-gray-100 bg-white p-3 shadow-lg">
      <div className="flex items-center gap-2">
        <span className="pl-2 text-lg" aria-hidden="true">
          🔍
        </span>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for orders, delivery, returns, GST…"
          className="min-w-0 flex-1 border-0 bg-transparent px-1 py-2 text-sm text-gray-700 focus:outline-none"
          aria-label="Search help topics"
        />
      </div>

      {results && (
        <div className="mt-2 max-h-80 overflow-y-auto border-t border-gray-100">
          {results.length === 0 ? (
            <p className="p-4 text-center text-sm text-gray-400">
              No results for “{query}”. Try a different keyword.
            </p>
          ) : (
            <ul className="divide-y divide-gray-50">
              {results.map((r, i) => (
                <li key={i} className="px-3 py-3">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-primary">
                    {r.category}
                  </p>
                  <p className="mt-0.5 text-sm font-semibold text-gray-800">
                    {r.q}
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-gray-500">
                    {r.a}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}