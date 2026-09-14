"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { CATEGORIES, slugifyCategory } from "@/lib/data/categories";
import { MenuIcon, ChevronDownIcon } from "@/components/ui/Icons";

const HIDE_DELAY_MS = 180;

export default function CategoryNav() {
  const [activeCategory, setActiveCategory] = useState(null); // null = closed, "__all" = open with nothing highlighted
  const hideTimer = useRef(null);

  useEffect(() => {
    function handleScroll() {
      setActiveCategory(null);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function show(category) {
    clearTimeout(hideTimer.current);
    setActiveCategory(category);
  }

  function scheduleHide() {
    clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => setActiveCategory(null), HIDE_DELAY_MS);
  }

  const isOpen = activeCategory !== null;

  return (
    <div className="relative" onMouseLeave={scheduleHide}>
      <nav className="relative z-30 border-b border-gray-200 bg-white shadow-sm">
        <div className="mx-auto max-w-screen-2xl px-4">
          <div className="hide-scrollbar flex items-center overflow-x-auto">
            <Link
              href="/categories"
              onMouseEnter={() => show("__all")}
              className="flex shrink-0 items-center gap-2 whitespace-nowrap bg-navy px-3 py-3 text-sm font-semibold text-white"
            >
              <MenuIcon />
              All Categories
              <ChevronDownIcon className="h-3 w-3" />
            </Link>

            {CATEGORIES.map((c) => (
              <div key={c.name} className="relative shrink-0" onMouseEnter={() => show(c.name)}>
                <Link
                  href={`/category/${slugifyCategory(c.name)}`}
                  className="flex items-center gap-1 whitespace-nowrap border-b-2 border-transparent px-3 py-3 text-sm font-medium text-gray-600 transition-colors hover:border-primary hover:text-primary"
                >
                  <span className="text-base">{c.icon}</span>
                  {c.name}
                </Link>
              </div>
            ))}

            <div className="ml-auto hidden shrink-0 items-center gap-4 pl-4 xl:flex">
              <Link href="/deals" className="whitespace-nowrap text-xs text-gray-500 transition-colors hover:text-primary">Today&apos;s Deals</Link>
              <Link href="/new-arrivals" className="whitespace-nowrap text-xs text-gray-500 transition-colors hover:text-primary">New Arrivals</Link>
              <span className="whitespace-nowrap rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white">B2B Pricing</span>
            </div>
          </div>
        </div>
      </nav>

      {isOpen && (
        <div
          className="absolute left-0 right-0 top-full z-50 border-t border-gray-200 bg-white shadow-2xl"
          onMouseEnter={() => clearTimeout(hideTimer.current)}
        >
          <div className="mx-auto max-w-screen-2xl px-4 py-6">
            <div className="grid grid-cols-2 gap-x-5 gap-y-6 md:grid-cols-3 lg:grid-cols-5">
              {CATEGORIES.map((c) => (
                <div
                  key={c.name}
                  className={`mega-col px-2 py-1 transition-colors ${activeCategory === c.name ? "active" : ""}`}
                >
                  <Link href={`/category/${slugifyCategory(c.name)}`} onClick={() => setActiveCategory(null)} className="mega-head mb-2 flex items-center gap-2 border-b border-gray-100 pb-2">
                    <span className="text-lg">{c.icon}</span>
                    <span className="font-display text-sm font-bold text-gray-900">{c.name}</span>
                  </Link>
                  <ul className="space-y-0.5">
                    {c.subs.map((sub) => (
                      <li key={sub}>
                        <Link
                          href={`/category/${slugifyCategory(c.name)}`}
                          onClick={() => setActiveCategory(null)}
                          className="block w-full rounded px-1.5 py-1 text-left text-xs text-gray-500 transition-colors hover:bg-orange-50 hover:text-primary"
                        >
                          {sub}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap items-center justify-between gap-2 border-t border-gray-100 pt-4">
              <p className="text-xs text-gray-400">Over 10 lakh products across 10 categories — 50,000+ verified brands</p>
              <Link href="/categories" onClick={() => setActiveCategory(null)} className="text-xs font-semibold" style={{ color: "#FF6B35" }}>
                Browse all categories →
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
