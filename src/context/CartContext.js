"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { PRODUCTS_BY_ID } from "@/lib/data/products";

const CART_STORAGE_KEY = "sbs_cart";
const CartContext = createContext(null);

export function CartProvider({ children }) {
  // { [productId]: quantity }. Starts empty on the server so the first
  // render always matches between server and client (no hydration warning),
  // then hydrates from localStorage right after mount.
  const [items, setItems] = useState({});
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(CART_STORAGE_KEY) || "{}");
      // Hydrating from localStorage must happen after mount (server has no
      // localStorage), so this one-time sync-on-mount is the correct use of an effect.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setItems(saved || {});
    } catch {
      setItems({});
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) return; // don't overwrite storage with the initial empty state
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  }, [items, hydrated]);

  function addItem(productId) {
    setItems((prev) => ({ ...prev, [productId]: (prev[productId] || 0) + 1 }));
  }

  function changeQty(productId, delta) {
    setItems((prev) => {
      const next = { ...prev };
      const qty = (next[productId] || 0) + delta;
      if (qty <= 0) delete next[productId];
      else next[productId] = qty;
      return next;
    });
  }

  function removeItem(productId) {
    setItems((prev) => {
      const next = { ...prev };
      delete next[productId];
      return next;
    });
  }

  /** Empties the cart — used after a successful checkout. */
  function clearCart() {
    setItems({});
  }

  const value = useMemo(() => {
    const lines = Object.entries(items)
      .map(([id, qty]) => ({ product: PRODUCTS_BY_ID[id], qty }))
      .filter((line) => Boolean(line.product));

    const count = lines.reduce((sum, l) => sum + l.qty, 0);
    const subtotal = lines.reduce((sum, l) => sum + l.product.price * l.qty, 0);
    const savings = lines.reduce((sum, l) => sum + (l.product.orig - l.product.price) * l.qty, 0);

    return {
      lines,
      count,
      subtotal,
      savings,
      hydrated,
      addItem,
      changeQty,
      removeItem,
      clearCart,
    };
  }, [items, hydrated]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}