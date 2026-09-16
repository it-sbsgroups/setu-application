"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { CATEGORIES, slugifyCategory } from "@/lib/data/categories";
import { MenuIcon, ChevronDownIcon } from "@/components/ui/Icons";

const HIDE_DELAY_MS = 180;

/* ── Touch-device detection via useSyncExternalStore ─────────────
   Subscribes to the "(hover: none)" media query without calling
   setState inside an effect. */
function subscribeTouch(callback) {
  if (typeof window === "undefined") return () => {};
  const mq = window.matchMedia("(hover: none)");
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}
function getTouchSnapshot() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(hover: none)").matches;
}
function getTouchServerSnapshot() {
  return false;
}

export default function CategoryNav() {
  const [activeCategory, setActiveCategory] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const hideTimer = useRef(null);

  const isTouch = useSyncExternalStore(
    subscribeTouch,
    getTouchSnapshot,
    getTouchServerSnapshot
  );

  useEffect(() => {
    function handleScroll() {
      if (!isTouch) setActiveCategory(null);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isTouch]);

  // Lock body scroll when the mobile drawer is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

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
    <>
      <div className="relative" onMouseLeave={scheduleHide}>
        <nav className="relative z-30 border-b border-gray-200 bg-white shadow-sm">
          <div className="mx-auto max-w-screen-2xl px-4">
            <div className="hide-scrollbar flex items-center overflow-x-auto">
              {/* Mobile: hamburger opens a drawer instead of the mega menu */}
              <button
                type="button"
                onClick={() => setMobileOpen(true)}
                className="flex shrink-0 items-center gap-2 whitespace-nowrap bg-navy px-3 py-3 text-sm font-semibold text-white lg:hidden"
                aria-label="Open categories menu"
              >
                <MenuIcon />
                <span>All Categories</span>
              </button>

              {/* Desktop: All Categories hover trigger */}
              <Link
                href="/categories"
                onMouseEnter={() => !isTouch && show("__all")}
                className="hidden shrink-0 items-center gap-2 whitespace-nowrap bg-navy px-3 py-3 text-sm font-semibold text-white lg:flex"
              >
                <MenuIcon />
                All Categories
                <ChevronDownIcon className="h-3 w-3" />
              </Link>

              {CATEGORIES.map((c) => (
                <div
                  key={c.name}
                  className="relative shrink-0"
                  onMouseEnter={() => !isTouch && show(c.name)}
                >
                  <Link
                    href={`/category/${slugifyCategory(c.name)}`}
                    className="flex items-center gap-1 whitespace-nowrap border-b-2 border-transparent px-3 py-3 text-sm font-medium text-gray-600 transition-colors hover:border-primary hover:text-primary"
                  >
                    <span className="text-base">{c.icon}</span>
                    <span className="hidden sm:inline">{c.name}</span>
                  </Link>
                </div>
              ))}

              <div className="ml-auto hidden shrink-0 items-center gap-4 pl-4 xl:flex">
                <Link
                  href="/deals"
                  className="whitespace-nowrap text-xs text-gray-500 transition-colors hover:text-primary"
                >
                  Today&apos;s Deals
                </Link>
                <Link
                  href="/new-arrivals"
                  className="whitespace-nowrap text-xs text-gray-500 transition-colors hover:text-primary"
                >
                  New Arrivals
                </Link>
                <span className="whitespace-nowrap rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white">
                  B2B Pricing
                </span>
              </div>
            </div>
          </div>
        </nav>

        {/* Desktop mega menu (hover only, not shown on touch) */}
        {isOpen && !isTouch && (
          <div
            className="absolute left-0 right-0 top-full z-50 border-t border-gray-200 bg-white shadow-2xl"
            onMouseEnter={() => clearTimeout(hideTimer.current)}
          >
            <div className="mx-auto max-w-screen-2xl px-4 py-6">
              <div className="grid grid-cols-2 gap-x-5 gap-y-6 md:grid-cols-3 lg:grid-cols-5">
                {CATEGORIES.map((c) => (
                  <div
                    key={c.name}
                    className={`mega-col px-2 py-1 transition-colors ${
                      activeCategory === c.name ? "active" : ""
                    }`}
                  >
                    <Link
                      href={`/category/${slugifyCategory(c.name)}`}
                      onClick={() => setActiveCategory(null)}
                      className="mega-head mb-2 flex items-center gap-2 border-b border-gray-100 pb-2"
                    >
                      <span className="text-lg">{c.icon}</span>
                      <span className="font-display text-sm font-bold text-gray-900">
                        {c.name}
                      </span>
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
                <p className="text-xs text-gray-400">
                  Over 10 lakh products across 10 categories — 50,000+ verified brands
                </p>
                <Link
                  href="/categories"
                  onClick={() => setActiveCategory(null)}
                  className="text-xs font-semibold text-primary"
                >
                  Browse all categories →
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Mobile slide-in drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[80] lg:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />
          <aside className="absolute bottom-0 right-0 top-0 flex w-[85%] max-w-sm flex-col bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3">
              <h2 className="font-display text-base font-black text-gray-900">
                All Categories
              </h2>
              <button
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
                className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 active:bg-gray-100"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto">
              {CATEGORIES.map((c) => (
                <div key={c.name} className="border-b border-gray-50">
                  <Link
                    href={`/category/${slugifyCategory(c.name)}`}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 text-sm font-semibold text-gray-800 active:bg-orange-50"
                  >
                    <span className="text-lg">{c.icon}</span>
                    {c.name}
                  </Link>
                  <ul className="pb-2 pl-12 pr-4">
                    {c.subs.slice(0, 6).map((sub) => (
                      <li key={sub}>
                        <Link
                          href={`/category/${slugifyCategory(c.name)}`}
                          onClick={() => setMobileOpen(false)}
                          className="block py-1.5 text-xs text-gray-500 active:text-primary"
                        >
                          {sub}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-100 p-4 safe-bottom">
              <Link
                href="/categories"
                onClick={() => setMobileOpen(false)}
                className="block w-full rounded-lg bg-primary py-3 text-center text-sm font-bold text-white active:bg-primarydark"
              >
                Browse all categories
              </Link>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}