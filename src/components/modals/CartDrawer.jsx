"use client";
import { useCart } from "@/components/layout/CartContext";
import { thumb } from "@/lib/data";
export default function CartDrawer() {
  const { items, setQty, remove, total, count, isOpen, setIsOpen } = useCart();
  if (!isOpen) return null;
  const formatINR = (n) => "₹" + n.toLocaleString("en-IN");
  return (
    <>
      <div onClick={()=>setIsOpen(false)} className="fixed inset-0 bg-black/50 z-[65]" />
      <aside className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-white shadow-2xl flex flex-col z-[66] drawer-animate">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100"><div><h3 className="font-display font-black text-lg">Your Cart</h3><p className="text-xs text-gray-400">{count} items</p></div><button onClick={()=>setIsOpen(false)} className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-400">✕</button></div>
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
          {items.length===0 ? <div className="text-center py-20"><p className="text-5xl mb-4">🛒</p><p className="text-sm text-gray-500">Your cart is empty</p></div> : items.map(i=>(
            <div key={i.id} className="flex gap-3 border border-gray-100 rounded-lg p-3"><img src={thumb(i.product.img)} alt="" className="w-14 h-14 rounded object-cover" /><div className="flex-1 min-w-0"><p className="text-xs font-medium text-gray-700 line-clamp-2">{i.product.name}</p><p className="text-sm font-bold mt-1">{formatINR(i.product.price)}</p><div className="flex items-center gap-2 mt-2"><button onClick={()=>setQty(i.id,-1)} className="w-6 h-6 rounded border flex items-center justify-center text-xs">−</button><span className="text-xs font-semibold w-4 text-center">{i.qty}</span><button onClick={()=>setQty(i.id,1)} className="w-6 h-6 rounded border flex items-center justify-center text-xs">+</button><button onClick={()=>remove(i.id)} className="ml-auto text-xs text-red-500">Remove</button></div></div></div>
          ))}
        </div>
        {items.length>0 && <div className="border-t px-5 py-4 space-y-3"><div className="flex justify-between text-sm"><span className="text-gray-500">Subtotal</span><span className="font-bold">{formatINR(total)}</span></div><button onClick={()=>window.toast("Checkout is a demo")} className="w-full py-2.5 rounded-lg text-sm font-semibold text-white bg-[#FF6B35]">Proceed to Checkout</button></div>}
      </aside>
    </>
  );
}
