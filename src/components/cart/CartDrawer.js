"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useUI } from "@/context/UIContext";
import { useAuth } from "@/context/AuthContext";
import { thumb, formatMoney, formatPriceRange } from "@/lib/format";

export default function CartDrawer() {
  const { lines, count, subtotal, savings, changeQty, removeItem } = useCart();
  const { overlay, closeOverlay, showToast, openLogin } = useUI();
  const { user } = useAuth();
  const router = useRouter();
  const open = overlay === "cart";

  function handleStartShopping() {
    closeOverlay();
    setTimeout(() => {
      document
        .getElementById("category-Power Tools")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 150);
  }

  /**
   * Auth-gated checkout. If the user isn't logged in, close the drawer,
   * open the login modal, and show a toast explaining why. Once logged in,
   * the user can re-open the cart and proceed — or click "Proceed to
   * Checkout" again from wherever they are.
   */
  function handleProceedToCheckout() {
    if (!user) {
      closeOverlay();
      showToast("Please login to continue to checkout");
      openLogin();
      return;
    }
    closeOverlay();
    router.push("/checkout");
  }

  return (
    <>
      <div
        className={`fixed inset-0 z-[65] bg-black/50 transition-opacity ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={closeOverlay}
        aria-hidden="true"
      />
      <aside
        className={`fixed bottom-0 right-0 top-0 z-[66] flex w-full max-w-md flex-col bg-white shadow-2xl transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
      >
        <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
          <div>
            <h3 className="font-display text-lg font-black text-gray-900">Your Cart</h3>
            <p className="text-xs text-gray-400">
              {count === 0 ? "0 items" : `${count} item${count > 1 ? "s" : ""}`}
            </p>
          </div>
          <button
            type="button"
            onClick={closeOverlay}
            aria-label="Close cart"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {lines.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center py-16 text-center">
              <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-orange-50 text-4xl">
                🛒
              </div>
              <h4 className="font-display mb-1 font-bold text-gray-800">
                Your cart is empty
              </h4>
              <p className="mb-5 max-w-[220px] text-xs text-gray-400">
                Looks like you haven&apos;t added anything yet. Start exploring
                our top industrial picks.
              </p>
              <button
                type="button"
                onClick={handleStartShopping}
                className="rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-white hover:bg-primarydark"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            lines.map(({ product, qty }) => (
              <div
                key={product.id}
                className="flex gap-3 border-b border-gray-100 py-3 last:border-0"
              >
                <Link
                  href={`/product/${product.id}`}
                  onClick={closeOverlay}
                  className="shrink-0"
                >
                  <Image
                    src={thumb(product.img)}
                    alt={product.name}
                    width={64}
                    height={64}
                    className="h-16 w-16 rounded-lg bg-gray-50 object-cover"
                  />
                </Link>
                <div className="min-w-0 flex-1">
                  <Link href={`/product/${product.id}`} onClick={closeOverlay}>
                    <p className="line-clamp-2 mb-1 text-xs leading-snug text-gray-800 hover:text-primary">
                      {product.name}
                    </p>
                  </Link>
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">
                    Price range
                  </p>
                  <p className="mb-2 text-xs font-bold text-gray-900">
                    {formatPriceRange(product)}
                  </p>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center overflow-hidden rounded-lg border border-gray-200">
                      <button
                        type="button"
                        onClick={() => changeQty(product.id, -1)}
                        aria-label="Decrease quantity"
                        className="flex h-7 w-7 items-center justify-center text-gray-500 hover:bg-gray-100"
                      >
                        −
                      </button>
                      <span className="w-8 text-center text-xs font-semibold">
                        {qty}
                      </span>
                      <button
                        type="button"
                        onClick={() => changeQty(product.id, 1)}
                        aria-label="Increase quantity"
                        className="flex h-7 w-7 items-center justify-center text-gray-500 hover:bg-gray-100"
                      >
                        +
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        removeItem(product.id);
                        showToast("Item removed");
                      }}
                      className="text-xs text-gray-400 transition-colors hover:text-red-500"
                    >
                      Remove
                    </button>
                    <span className="ml-auto text-sm font-bold text-gray-900">
                      {formatMoney(product.price * qty)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {lines.length > 0 && (
          <div className="border-t border-gray-100 px-5 py-4">
            <div className="mb-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Subtotal</span>
                <span className="font-semibold">{formatMoney(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">You save</span>
                <span className="font-semibold text-green-600">
                  {formatMoney(savings)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Delivery</span>
                <span className="text-right text-xs font-medium text-gray-500">
                  As per vendor
                </span>
              </div>
              <p className="text-[10px] leading-relaxed text-gray-400">
                Free delivery applies only when the vendor supports it —
                otherwise delivery charges are payable by the buyer.
              </p>
              <div className="flex justify-between border-t border-gray-100 pt-2 text-base">
                <span className="font-bold">Total</span>
                <span className="font-black">{formatMoney(subtotal)}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleProceedToCheckout}
              className="w-full rounded-lg bg-primary py-3 text-sm font-bold text-white hover:bg-primarydark"
            >
              Proceed to Checkout
            </button>
            <button
              type="button"
              onClick={closeOverlay}
              className="mt-2 w-full rounded-lg py-2 text-sm font-semibold text-gray-600 hover:bg-gray-50"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </aside>
    </>
  );
}