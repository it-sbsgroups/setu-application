
"use client";
import { createContext, useContext, useState, useMemo } from "react";
const CartCtx = createContext(null);
export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const add = (product) => {
    setItems(prev => {
      const f = prev.find(i => i.id === product.id);
      if (f) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { id: product.id, qty: 1, product }];
    });
    setIsOpen(true);
  };
  const setQty = (id, delta) => {
    setItems(prev => prev.map(i => i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i));
  };
  const remove = (id) => setItems(prev => prev.filter(i => i.id !== id));
  const count = useMemo(() => items.reduce((s,i)=>s+i.qty,0), [items]);
  const total = useMemo(() => items.reduce((s,i)=>s+i.product.price*i.qty,0), [items]);
  return (
    <CartCtx.Provider value={{ items, add, setQty, remove, count, total, isOpen, setIsOpen }}>
      {children}
    </CartCtx.Provider>
  );
}
export const useCart = () => useContext(CartCtx);
