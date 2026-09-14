"use client";

import Image from "next/image";
import Link from "next/link";
import { thumb } from "@/lib/format";
import { formatPriceRange } from "@/lib/format";
import StarRating from "@/components/ui/StarRating";
import { useCart } from "@/context/CartContext";
import { useUI } from "@/context/UIContext";

export default function ProductCard({ product }) {
  const { addItem } = useCart();
  const { showToast } = useUI();

  function handleAddToCart() {
    addItem(product.id);
    const shortName = product.name.length > 32 ? product.name.slice(0, 32) + "…" : product.name;
    showToast("Added to cart — " + shortName);
  }

  return (
    <div className="product-card group relative flex flex-col overflow-hidden rounded-lg border border-gray-100 bg-white">
      <Link href={`/product/${product.id}`} className="flex flex-1 flex-col">
        <div className="relative h-40 overflow-hidden bg-gray-50">
          <Image
            src={thumb(product.img)}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 16vw"
            className="product-img object-cover transition-transform duration-300"
          />
          {product.badge && (
            <span
              className="absolute left-2 top-2 rounded px-1.5 py-0.5 font-semibold text-white"
              style={{ fontSize: 11, background: "#FF6B35" }}
            >
              {product.badge}
            </span>
          )}
        </div>

        <div className="flex flex-1 flex-col p-3">
          <p className="line-clamp-2 mb-2 flex-1 text-xs leading-tight text-gray-700">{product.name}</p>

          <div className="mb-1 flex items-center gap-1">
            <StarRating rating={product.rating} />
            <span className="text-xs text-gray-400">({product.reviews.toLocaleString("en-IN")})</span>
          </div>

          <div className="mb-2">
            <div className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">Price range</div>
            <div className="text-sm font-bold text-gray-900">{formatPriceRange(product)}</div>
          </div>
        </div>
      </Link>

      <div className="px-3 pb-3">
        <button
          type="button"
          aria-label="Add to wishlist"
          className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-white text-gray-400 opacity-0 shadow transition-opacity hover:text-red-500 group-hover:opacity-100"
        >
          ♥
        </button>
        <button
          type="button"
          onClick={handleAddToCart}
          className="w-full rounded bg-primary py-1.5 text-xs font-semibold text-white transition-colors hover:bg-primarydark"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
