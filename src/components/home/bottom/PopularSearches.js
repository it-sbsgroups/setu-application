"use client";

import { useState } from "react";
import Link from "next/link";
import { POPULAR_SEARCHES } from "@/lib/data/homeBottom";

export default function PopularSearches() {
  const [active, setActive] = useState(POPULAR_SEARCHES[0].id);

  return (
    <section
      aria-labelledby="popular-searches-heading"
      className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm"
    >
      <h2
        id="popular-searches-heading"
        className="font-display mb-3 text-xl font-black text-gray-900 sm:text-2xl"
      >
        Popular Searches
      </h2>

      <div
        role="tablist"
        aria-label="Popular searches"
        className="hide-scrollbar mb-4 flex gap-2 overflow-x-auto border-b border-gray-100"
      >
        {POPULAR_SEARCHES.map((tab) => {
          const isActive = tab.id === active;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              id={`ps-tab-${tab.id}`}
              aria-selected={isActive}
              aria-controls={`ps-panel-${tab.id}`}
              onClick={() => setActive(tab.id)}
              className={`shrink-0 whitespace-nowrap border-b-2 px-3 py-2 text-xs font-semibold transition-colors ${
                isActive
                  ? "border-primary text-primary"
                  : "border-transparent text-gray-500 hover:text-gray-800"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {POPULAR_SEARCHES.map((tab) => (
        <div
          key={tab.id}
          role="tabpanel"
          id={`ps-panel-${tab.id}`}
          aria-labelledby={`ps-tab-${tab.id}`}
          hidden={tab.id !== active}
          className="flex flex-wrap gap-2"
        >
          {tab.links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="rounded-full border border-gray-100 bg-gray-50 px-3 py-1.5 text-xs text-gray-600 transition-colors hover:border-primary hover:bg-orange-50/60 hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </div>
      ))}
    </section>
  );
}