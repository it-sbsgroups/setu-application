"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CATEGORIES } from "@/lib/data/categories";
import { ALL_PRODUCTS } from "@/lib/data/products";
import { thumb, formatPriceRange } from "@/lib/format";
import { useCart } from "@/context/CartContext";
import { useUI } from "@/context/UIContext";
import { SearchIcon } from "@/components/ui/Icons";

const RESULTS_LIMIT = 6;

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);
  const { addItem } = useCart();
  const { showToast } = useUI();

  useEffect(() => {
    function handleClickOutside(e) {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const matches = useMemo(() => {
    let list = ALL_PRODUCTS;
    if (category !== "All") list = list.filter((p) => p.cat === category);
    const q = query.trim().toLowerCase();
    if (q) list = list.filter((p) => p.name.toLowerCase().includes(q));
    return list;
  }, [query, category]);

  const shouldShowDropdown = open && (query.trim() || category !== "All");

  function handleAdd(product) {
    addItem(product.id);
    showToast("Added to cart — " + product.name.slice(0, 32) + (product.name.length > 32 ? "…" : ""));
  }

  return (
    <div className="relative flex-1" ref={wrapRef}>
      <div className="flex overflow-hidden rounded-lg bg-white shadow-sm">
        <select
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setOpen(true);
          }}
          className="hidden max-w-[150px] cursor-pointer border-r border-gray-200 bg-gray-50 px-2 py-2 text-xs text-gray-600 focus:outline-none md:block"
          aria-label="Search category"
        >
          <option value="All">All Categories</option>
          {CATEGORIES.map((c) => (
            <option key={c.name} value={c.name}>
              {c.name}
            </option>
          ))}
        </select>
        <input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          autoComplete="off"
          placeholder="Search for products, brands and categories…"
          className="min-w-0 flex-1 px-3 py-2 text-sm text-gray-700 focus:outline-none"
          aria-label="Search products"
        />
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="flex shrink-0 items-center gap-1.5 bg-primary px-4 text-sm font-semibold text-white transition-colors hover:bg-primarydark"
        >
          <SearchIcon />
          <span className="hidden sm:inline">Search</span>
        </button>
      </div>

      {shouldShowDropdown && (
        <div className="absolute left-0 right-0 top-full z-[60] mt-2 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-2xl">
          <div className="flex items-center justify-between border-b border-gray-100 px-4 py-2.5">
            <span className="text-xs font-semibold text-gray-500">
              {query.trim() ? `Results for "${query}"` : `Top in ${category}`}
            </span>
            <span className="text-xs text-gray-400">
              {matches.length} product{matches.length === 1 ? "" : "s"}
            </span>
          </div>

          {matches.length === 0 ? (
            <div className="px-4 py-6 text-center">
              <div className="mb-2 text-3xl">🔍</div>
              <p className="text-sm font-semibold text-gray-700">No products found</p>
              <p className="mt-1 text-xs text-gray-400">Try a different keyword or category</p>
            </div>
          ) : (
            <div className="max-h-80 overflow-y-auto">
              {matches.slice(0, RESULTS_LIMIT).map((product) => (
                <div key={product.id} className="flex items-center gap-3 px-4 py-2.5 transition-colors hover:bg-orange-50/60">
                  <Link href={`/product/${product.id}`} onClick={() => setOpen(false)} className="flex min-w-0 flex-1 items-center gap-3">
                    <Image src={thumb(product.img)} alt="" width={40} height={40} className="shrink-0 rounded-lg bg-gray-50 object-cover" />
                    <div className="min-w-0 flex-1">
                      <p className="line-clamp-2 text-xs leading-snug text-gray-800">{product.name}</p>
                      <p className="mt-0.5 text-[11px] font-bold text-gray-900">
                        {formatPriceRange(product)} <span className="font-normal text-gray-400">· {product.cat}</span>
                      </p>
                    </div>
                  </Link>
                  <button
                    type="button"
                    onClick={() => handleAdd(product)}
                    className="shrink-0 rounded bg-primary px-2.5 py-1 text-[11px] font-semibold text-white transition-colors hover:bg-primarydark"
                  >
                    Add
                  </button>
                </div>
              ))}
            </div>
          )}

          {matches.length > RESULTS_LIMIT && (
            <div className="border-t border-gray-100 px-4 py-2 text-center">
              <button type="button" className="text-xs font-semibold text-primary">
                View all {matches.length} results →
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
