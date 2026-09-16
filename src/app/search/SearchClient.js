"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ALL_PRODUCTS } from "@/lib/data/products";
import { CATEGORIES, slugifyCategory } from "@/lib/data/categories";
import { BRANDS } from "@/lib/data/brands";
import PageHero from "@/components/pages/PageHero";
import ProductGrid from "@/components/home/ProductGrid";
import { SearchIcon } from "@/components/ui/Icons";

const SUGGESTED = ["Drill", "Helmet", "Wire", "Grinder", "N95", "Welding", "Bearing", "Trolley"];

export default function SearchClient() {
  const params = useSearchParams();
  const initial = params.get("q") || "";
  const [query, setQuery] = useState(initial);
  const [activeCategory, setActiveCategory] = useState("All");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return ALL_PRODUCTS.filter((p) => {
      if (activeCategory !== "All" && p.cat !== activeCategory) return false;
      if (!q) return false;
      return (
        p.name.toLowerCase().includes(q) ||
        (p.cat || "").toLowerCase().includes(q) ||
        (p.badge || "").toLowerCase().includes(q)
      );
    });
  }, [query, activeCategory]);

  return (
    <>
      <PageHero
        eyebrow="SEARCH"
        title={query ? `Results for “${query}”` : "Search our catalogue"}
        subtitle="Find products across 10 lakh+ SKUs, 50,000+ verified brands."
        breadcrumbs={[{ label: "Search" }]}
      />

      <div className="mx-auto max-w-screen-2xl space-y-6 px-4 py-8">
        <div className="flex items-center gap-2 rounded-xl border border-gray-100 bg-white p-2 shadow-sm">
          <span className="pl-2 text-lg text-gray-400" aria-hidden="true">
            <SearchIcon />
          </span>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            placeholder="Search products, brands, categories…"
            className="min-w-0 flex-1 border-0 bg-transparent px-2 py-2 text-sm text-gray-700 focus:outline-none"
            aria-label="Search"
          />
        </div>

        {/* Category chips */}
        <div className="hide-scrollbar flex gap-2 overflow-x-auto pb-1">
          <button
            onClick={() => setActiveCategory("All")}
            className={`shrink-0 whitespace-nowrap rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${
              activeCategory === "All"
                ? "border-primary bg-orange-50 text-primary"
                : "border-gray-200 text-gray-600 hover:border-gray-300"
            }`}
          >
            All Categories
          </button>
          {CATEGORIES.map((c) => {
            const on = activeCategory === c.name;
            return (
              <button
                key={c.name}
                onClick={() => setActiveCategory(c.name)}
                className={`shrink-0 whitespace-nowrap rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${
                  on
                    ? "border-primary bg-orange-50 text-primary"
                    : "border-gray-200 text-gray-600 hover:border-gray-300"
                }`}
              >
                {c.icon} {c.name}
              </button>
            );
          })}
        </div>

        {query.trim() === "" ? (
          <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
            <h2 className="font-display mb-3 text-lg font-black text-gray-900">
              Popular searches
            </h2>
            <div className="flex flex-wrap gap-2">
              {SUGGESTED.map((s) => (
                <button
                  key={s}
                  onClick={() => setQuery(s)}
                  className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs font-medium text-gray-700 transition-colors hover:border-primary hover:bg-orange-50 hover:text-primary"
                >
                  {s}
                </button>
              ))}
            </div>

            <h2 className="font-display mb-3 mt-8 text-lg font-black text-gray-900">
              Top brands
            </h2>
            <div className="flex flex-wrap gap-2">
              {BRANDS.slice(0, 10).map((b) => (
                <Link
                  key={b.slug}
                  href={`/brand/${b.slug}`}
                  className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs font-medium text-gray-700 transition-colors hover:border-primary hover:bg-orange-50 hover:text-primary"
                >
                  {b.name}
                </Link>
              ))}
            </div>
          </div>
        ) : results.length === 0 ? (
          <div className="rounded-xl border border-gray-100 bg-white py-16 text-center shadow-sm">
            <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-orange-50 text-2xl">
              🔍
            </div>
            <p className="text-sm font-semibold text-gray-700">
              No results for “{query}”
            </p>
            <p className="mt-1 text-xs text-gray-400">
              Try a different keyword, or browse categories.
            </p>
            <Link
              href="/categories"
              className="mt-4 inline-block rounded-lg bg-primary px-5 py-2 text-xs font-bold text-white hover:bg-primarydark"
            >
              Browse Categories
            </Link>
          </div>
        ) : (
          <ProductGrid
            eyebrow={`${results.length} RESULT${results.length === 1 ? "" : "S"}`}
            title={`Results for “${query}”`}
            subtitle={
              activeCategory !== "All" ? `Filtered by ${activeCategory}` : undefined
            }
            products={results}
          />
        )}
      </div>
    </>
  );
}