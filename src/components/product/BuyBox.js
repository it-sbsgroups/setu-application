"use client";

import { useState } from "react";
import { formatMoney } from "@/lib/format";
import { useCart } from "@/context/CartContext";
import { useUI } from "@/context/UIContext";

const BULK_TIERS = [
  { qty: 3, extraOff: 0 },
  { qty: 5, extraOff: 2 },
  { qty: 10, extraOff: 4 },
  { qty: 25, extraOff: 6 },
];

export default function BuyBox({ product }) {
  const [qty, setQty] = useState(1);
  const [pincode, setPincode] = useState("");
  const [checkedPincode, setCheckedPincode] = useState(null);
  const { addItem } = useCart();
  const { openCart, showToast } = useUI();

  const discountPct = Math.round(((product.orig - product.price) / product.orig) * 100);
  const gstPrice = Math.round(product.price * 1.18);

  function handleAddToCart() {
    for (let i = 0; i < qty; i++) addItem(product.id);
    showToast(`Added ${qty} × ${product.name.slice(0, 28)}… to cart`);
  }

  function handleBuyNow() {
    for (let i = 0; i < qty; i++) addItem(product.id);
    openCart();
  }

  function checkPincode() {
    if (!/^\d{6}$/.test(pincode)) return showToast("Enter a valid 6-digit pincode");
    setCheckedPincode(pincode);
  }

  return (
    <div className="rounded-xl border border-gray-100 bg-white p-5">
      <div className="mb-1 flex items-baseline gap-2">
        <span className="text-2xl font-black text-gray-900">{formatMoney(product.price)}</span>
        <span className="text-sm text-gray-400 line-through">{formatMoney(product.orig)}</span>
        <span className="text-sm font-bold text-green-600">{discountPct}% OFF</span>
      </div>
      <p className="mb-4 text-xs text-gray-400">{formatMoney(gstPrice)} (incl. of all taxes) · GST invoice available</p>

      <div className="mb-4 rounded-lg border border-gray-100 bg-gray-50/60 p-3">
        <p className="mb-2 text-xs font-bold text-gray-600">Buy More &amp; Save More</p>
        <div className="grid grid-cols-4 gap-2 text-center">
          {BULK_TIERS.map((tier) => {
            const tierPrice = Math.round(product.price * (1 - tier.extraOff / 100));
            return (
              <div key={tier.qty} className="rounded-lg bg-white p-2 shadow-sm">
                <div className="text-[10px] text-gray-400">Qty {tier.qty}+</div>
                <div className="text-xs font-bold text-gray-800">{formatMoney(tierPrice)}</div>
                {tier.extraOff > 0 && <div className="text-[10px] font-semibold text-green-600">Extra {tier.extraOff}% off</div>}
              </div>
            );
          })}
        </div>
      </div>

      <div className="mb-4 flex items-center gap-3">
        <span className="text-xs font-medium text-gray-500">Quantity</span>
        <div className="flex items-center overflow-hidden rounded-lg border border-gray-200">
          <button type="button" aria-label="Decrease quantity" onClick={() => setQty((q) => Math.max(1, q - 1))} className="flex h-8 w-8 items-center justify-center text-gray-500 hover:bg-gray-100">
            −
          </button>
          <span className="w-10 text-center text-sm font-semibold">{qty}</span>
          <button type="button" aria-label="Increase quantity" onClick={() => setQty((q) => q + 1)} className="flex h-8 w-8 items-center justify-center text-gray-500 hover:bg-gray-100">
            +
          </button>
        </div>
      </div>

      <div className="flex gap-3">
        <button type="button" onClick={handleAddToCart} className="flex-1 rounded-lg border-2 border-primary py-2.5 text-sm font-bold text-primary transition-colors hover:bg-orange-50">
          Add to Cart
        </button>
        <button type="button" onClick={handleBuyNow} className="flex-1 rounded-lg bg-primary py-2.5 text-sm font-bold text-white transition-colors hover:bg-primarydark">
          Buy Now
        </button>
      </div>

      <div className="mt-5 border-t border-gray-100 pt-4">
        <p className="mb-2 text-xs font-semibold text-gray-600">Delivery Details</p>
        <p className="mb-2 text-[11px] text-gray-400">Free delivery applies only when the vendor supports it — otherwise delivery charges are payable by the buyer.</p>
        <div className="flex gap-2">
          <input
            value={pincode}
            onChange={(e) => setPincode(e.target.value.replace(/\D/g, "").slice(0, 6))}
            placeholder="Enter pincode"
            className="flex-1 rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none"
          />
          <button type="button" onClick={checkPincode} className="rounded-lg bg-navy px-4 text-xs font-bold text-white hover:bg-navylight">
            Check
          </button>
        </div>
        {checkedPincode && (
          <div className="mt-3 space-y-1 rounded-lg bg-green-50 p-3 text-xs text-green-800">
            <p>✅ Delivery available at {checkedPincode}</p>
            <p>🚚 Delivery in 2–4 business days · charges as per vendor</p>
            <p>🔄 Free replacement if wrong/damaged item is delivered</p>
          </div>
        )}
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2 border-t border-gray-100 pt-4 text-[11px] text-gray-500">
        <span>🔄 Replacement-Only Policy</span>
        <span>🧾 GST Invoice</span>
        <span>🔒 End-to-End Encrypted</span>
        <span>🛡️ Pre &amp; Post-Warranty Support</span>
      </div>
    </div>
  );
}
