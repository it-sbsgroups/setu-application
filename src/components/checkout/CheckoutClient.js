"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useUI } from "@/context/UIContext";
import {
  sendQuotationEmail,
  resendQuotationEmail,
  downloadQuotation,
  createNegotiationTicket,
  lockNegotiatedPrice,
  confirmOrder,
  quotationTotal,
} from "@/lib/checkoutApi";

import Stepper from "@/components/checkout/Stepper";
import QuoteDetailsStep from "@/components/checkout/QuoteDetailsStep";
import EmailSentScreen from "@/components/checkout/EmailSentScreen";
import OrderSummary from "@/components/checkout/OrderSummary";
import OrderPlacedScreen from "@/components/checkout/OrderPlacedScreen";
import NegotiationScreen from "@/components/checkout/NegotiationScreen";
import {
  ReceivedCheckModal,
  PriceSatisfactionModal,
  NegotiationModal,
  ConfirmOrderModal,
  LockedPriceModal,
} from "@/components/checkout/QuotationModals";

const STAGES = {
  DETAILS: "details",
  RECEIVED_CHECK: "received-check",
  PRICE_SAT: "price-sat",
  CONFIRM: "confirm",
  NEGOTIATION: "negotiation",
  CHAT: "chat",
  TELEPHONIC: "telephonic",
  LOCKED_PRICE: "locked-price",
  PLACED: "placed",
};

export default function CheckoutClient() {
  const router = useRouter();
  const { lines, count, clearCart } = useCart();
  const { user } = useAuth();
  const { openLogin, showToast } = useUI();

  const [stage, setStage] = useState(STAGES.DETAILS);
  const [address, setAddress] = useState(null);
  const [contact, setContact] = useState(null);
  const [quote, setQuote] = useState(null);
  const [ticket, setTicket] = useState(null);
  const [locked, setLocked] = useState(null);
  const [order, setOrder] = useState(null);
  const [sending, setSending] = useState(false);

  // Auth gate
  useEffect(() => {
    if (!user) {
      showToast("Please login to request a quotation");
      openLogin();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- run once on mount
  }, []);

  // Empty-cart guard (except when we've just placed the order)
  useEffect(() => {
    if (count === 0 && !order) router.replace("/");
  }, [count, order, router]);

  /* ── handlers ─────────────────────────────────────────────── */

  async function handleDetailsSubmit({ address: a, contact: c }) {
    setAddress(a);
    setContact(c);
    setSending(true);
    try {
      const q = await sendQuotationEmail({ lines, contact: c, address: a });
      setQuote(q);
      setStage(STAGES.RECEIVED_CHECK);
      showToast(`Quotation emailed to ${c.email}`);
    } catch {
      showToast("Could not send quotation. Please retry.");
    } finally {
      setSending(false);
    }
  }

  async function handleResend() {
    if (!quote) return;
    await resendQuotationEmail(quote.quoteId);
    showToast(`Quotation resent to ${contact.email}`);
  }

  function handleDownload() {
    if (!quote) return;
    downloadQuotation({ lines, address, contact, quote });
    showToast("Quotation downloaded");
  }

  async function handleNegotiationStart(mode) {
    const t = await createNegotiationTicket({ quoteId: quote.quoteId, mode });
    setTicket(t);
    setStage(mode === "chat" ? STAGES.CHAT : STAGES.TELEPHONIC);
  }

  async function handlePriceLocked() {
    const l = await lockNegotiatedPrice({ lines });
    setLocked(l);
    setStage(STAGES.LOCKED_PRICE);
    showToast("Price locked — please review and confirm");
  }

  async function handleConfirm(method) {
    const total = locked ? locked.total : quotationTotal(lines);
    const res = await confirmOrder({
      quoteId: quote.quoteId,
      method,
      lockedTotal: total,
    });
    setOrder(res);
    clearCart();
    setStage(STAGES.PLACED);
    showToast("Order confirmed successfully!");
  }

  /* ── render gates ─────────────────────────────────────────── */

  if (!user) return <AuthGate onLogin={openLogin} />;
  if (user.orgVerification === "pending") return <VerificationPendingGate user={user} />;
  if (order) return <OrderPlacedScreen order={order} address={address} contact={contact} locked={locked} lines={lines} />;

  const isModalStage = [
    STAGES.RECEIVED_CHECK,
    STAGES.PRICE_SAT,
    STAGES.CONFIRM,
    STAGES.NEGOTIATION,
    STAGES.LOCKED_PRICE,
  ].includes(stage);

  const isChat = stage === STAGES.CHAT;
  const isTelephonic = stage === STAGES.TELEPHONIC;

  return (
    <div className="mx-auto max-w-screen-2xl px-4 py-6">
      <div className="mb-6">
        <Link
          href="/"
          className="mb-3 inline-flex items-center gap-1 text-xs font-semibold text-gray-500 hover:text-primary"
        >
          ← Continue browsing
        </Link>
        <Stepper stage={stage} />
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_380px]">
        <div className="order-2 space-y-4 lg:order-1">
          {stage === STAGES.DETAILS && (
            <QuoteDetailsStep
              initial={
                address || contact
                  ? {
                      ...(address || {}),
                      ...(contact?.email ? { email: contact.email } : {}),
                      ...(contact?.contactPref ? { contactPref: contact.contactPref } : {}),
                    }
                  : undefined
              }
              submitting={sending}
              onSubmit={handleDetailsSubmit}
            />
          )}
          {isModalStage && <EmailSentScreen contact={contact} quote={quote} />}
          {isChat && (
            <NegotiationScreen
              mode="chat"
              ticket={ticket}
              onPriceLocked={handlePriceLocked}
              onCancel={() => setStage(STAGES.NEGOTIATION)}
            />
          )}
          {isTelephonic && (
            <NegotiationScreen
              mode="telephonic"
              ticket={ticket}
              onPriceLocked={handlePriceLocked}
              onCancel={() => setStage(STAGES.NEGOTIATION)}
            />
          )}
        </div>

        <div className="order-1 lg:order-2">
          <OrderSummary />
        </div>
      </div>

      {/* ── Modals (only the one matching the current stage opens) ── */}
      <ReceivedCheckModal
        open={stage === STAGES.RECEIVED_CHECK}
        email={contact?.email}
        onYes={() => setStage(STAGES.PRICE_SAT)}
        onResend={handleResend}
        onDownload={handleDownload}
      />
      <PriceSatisfactionModal
        open={stage === STAGES.PRICE_SAT}
        onYes={() => setStage(STAGES.CONFIRM)}
        onNo={() => setStage(STAGES.NEGOTIATION)}
      />
      <NegotiationModal
        open={stage === STAGES.NEGOTIATION}
        onChoose={handleNegotiationStart}
      />
      <ConfirmOrderModal
        open={stage === STAGES.CONFIRM}
        email={contact?.email}
        lines={lines}
        onConfirm={handleConfirm}
      />
      <LockedPriceModal
        open={stage === STAGES.LOCKED_PRICE}
        locked={locked}
        email={contact?.email}
        lines={lines}
        onConfirm={handleConfirm}
      />
    </div>
  );
}

/* ── inline subcomponents ─────────────────────────────────── */

function VerificationPendingGate({ user }) {
  return (
    <div className="mx-auto max-w-md px-4 py-20 text-center">
      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-amber-50 text-3xl">
        ⏳
      </div>
      <h1 className="font-display text-xl font-black text-gray-900">
        {user.orgName || "Your organization"} is pending verification
      </h1>
      <p className="mt-2 text-sm text-gray-500">
        Our team verifies every new organization account before quotations can be raised — this
        usually takes a few hours. You can keep browsing and building your cart in the meantime.
      </p>
      <div className="mt-6">
        <Link href="/" className="rounded-lg bg-primary px-6 py-2.5 text-sm font-bold text-white hover:bg-primarydark">
          Continue Browsing
        </Link>
      </div>
    </div>
  );
}

function AuthGate({ onLogin }) {
  return (
    <div className="mx-auto max-w-md px-4 py-20 text-center">
      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-orange-50 text-3xl">
        🔐
      </div>
      <h1 className="font-display text-xl font-black text-gray-900">
        Login required to request a quotation
      </h1>
      <p className="mt-2 text-sm text-gray-500">
        Please sign in to continue. Your enquiry list is saved.
      </p>
      <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-center">
        <button
          type="button"
          onClick={onLogin}
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