"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useUI } from "@/context/UIContext";
import { placeOrder } from "@/lib/checkoutApi";

import Stepper from "@/components/checkout/Stepper";
import AddressStep from "@/components/checkout/AddressStep";
import PaymentStep from "@/components/checkout/PaymentStep";
import ReviewStep from "@/components/checkout/ReviewStep";
import OrderSummary from "@/components/checkout/OrderSummary";
import OrderSuccess from "@/components/checkout/OrderSuccess";

export default function CheckoutClient() {
  const router = useRouter();
  const { lines, count, subtotal, clearCart } = useCart();
  const { user } = useAuth();
  const { openLogin, showToast } = useUI();

  const [step, setStep] = useState("address");
  const [address, setAddress] = useState(null);
  const [payment, setPayment] = useState(null);
  const [placing, setPlacing] = useState(false);
  const [order, setOrder] = useState(null);

  // Redirect to home if cart is empty and no order was just placed.
  useEffect(() => {
    if (count === 0 && !order) {
      router.replace("/");
    }
  }, [count, order, router]);

  // Auth gate — auto-open login modal once if user lands here unauthenticated.
  useEffect(() => {
    if (!user) {
      showToast("Please login to continue to checkout");
      openLogin();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- run only on mount
  }, []);

  async function handlePlaceOrder() {
    if (!address || !payment) return;
    setPlacing(true);
    try {
      const placed = await placeOrder({
        lines,
        subtotal,
        address,
        payment,
      });
      // Set order BEFORE clearing cart so the empty-cart redirect doesn't fire.
      setOrder(placed);
      clearCart();
      showToast("Order placed successfully!");
    } catch {
      showToast("Could not place order. Please try again.");
    } finally {
      setPlacing(false);
    }
  }

  // Success view
  if (order) {
    return <OrderSuccess order={order} address={address} payment={payment} />;
  }

  // Not logged in — show a login gate.
  if (!user) {
    return (
      <div className="mx-auto max-w-md px-4 py-20 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-orange-50 text-3xl">
          🔐
        </div>
        <h1 className="font-display text-xl font-black text-gray-900">
          Login required to checkout
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          Please sign in to continue with your order. Your cart will be saved.
        </p>
        <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-center">
          <button
            type="button"
            onClick={openLogin}
            className="rounded-lg bg-primary px-6 py-2.5 text-sm font-bold text-white hover:bg-primarydark"
          >
            Login / Sign Up
          </button>
          <Link
            href="/"
            className="rounded-lg border border-gray-200 px-6 py-2.5 text-sm font-bold text-gray-700 hover:bg-gray-50"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-screen-2xl px-4 py-6">
      <div className="mb-6">
        <Link
          href="/"
          className="mb-3 inline-flex items-center gap-1 text-xs font-semibold text-gray-500 hover:text-primary"
        >
          ← Continue shopping
        </Link>
        <Stepper current={step} />
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_380px]">
        <div className="order-2 space-y-4 lg:order-1">
          {step === "address" && (
            <AddressStep
              initial={address}
              onContinue={(a) => {
                setAddress(a);
                setStep("payment");
              }}
            />
          )}
          {step === "payment" && (
            <PaymentStep
              initial={payment}
              subtotal={subtotal}
              onBack={() => setStep("address")}
              onContinue={(p) => {
                setPayment(p);
                setStep("review");
              }}
            />
          )}
          {step === "review" && (
            <ReviewStep
              address={address}
              payment={payment}
              lines={lines}
              onBack={() => setStep("payment")}
              onEditAddress={() => setStep("address")}
              onEditPayment={() => setStep("payment")}
              onPlaceOrder={handlePlaceOrder}
              placing={placing}
            />
          )}
        </div>

        <div className="order-1 lg:order-2">
          <OrderSummary />
        </div>
      </div>
    </div>
  );
}