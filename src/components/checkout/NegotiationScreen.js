"use client";

import { useEffect, useRef, useState } from "react";
import { useUI } from "@/context/UIContext";

export default function NegotiationScreen({
  mode,
  ticket,
  onPriceLocked,
  onCancel,
}) {
  if (mode === "chat") return <ChatMode ticket={ticket} onPriceLocked={onPriceLocked} onCancel={onCancel} />;
  return <TelephonicMode ticket={ticket} onPriceLocked={onPriceLocked} onCancel={onCancel} />;
}

/* ────────────────────── CHAT MODE ────────────────────── */
function ChatMode({ ticket, onPriceLocked, onCancel }) {
  const [messages, setMessages] = useState([
    { from: "system", text: `Chat started · Ticket ${ticket.ticket}` },
    { from: "exec", text: "Hi! This is Priya from the SbS pricing team. How can I help with this quotation?" },
  ]);
  const [input, setInput] = useState("");
  const [phase, setPhase] = useState("chatting"); // chatting → locking → locked
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function send() {
    const text = input.trim();
    if (!text || phase !== "chatting") return;
    setMessages((m) => [...m, { from: "user", text }]);
    setInput("");

    setTimeout(() => {
      setMessages((m) => [
        ...m,
        { from: "exec", text: "Thanks! Let me check with my manager for the best possible price. One moment…" },
      ]);
    }, 800);

    setTimeout(() => {
      setMessages((m) => [
        ...m,
        {
          from: "exec",
          text: "I can offer an additional 3–8% off the highest range. Locking the price now…",
        },
      ]);
      setPhase("locking");
    }, 2200);

    setTimeout(async () => {
      setMessages((m) => [
        ...m,
        { from: "system", text: "✅ Price locked by executive." },
      ]);
      setPhase("locked");
      await onPriceLocked();
    }, 3600);
  }

  return (
    <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-navy text-xs font-bold text-white">P</div>
          <div>
            <p className="text-xs font-bold text-gray-800">Priya · Pricing Desk</p>
            <p className="flex items-center gap-1 text-[11px] text-green-600">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
              Online · Ticket {ticket.ticket}
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={onCancel}
          className="text-xs font-semibold text-gray-400 hover:text-red-500"
        >
          Exit
        </button>
      </div>

      <div className="h-80 space-y-3 overflow-y-auto bg-gray-50/40 px-4 py-4">
        {messages.map((m, i) => (
          <ChatBubble key={i} {...m} />
        ))}
        <div ref={endRef} />
      </div>

      <div className="flex items-center gap-2 border-t border-gray-100 p-3">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          disabled={phase !== "chatting"}
          placeholder={phase === "chatting" ? "Type your message…" : "Waiting for price lock…"}
          className="checkout-input flex-1"
        />
        <button
          type="button"
          onClick={send}
          disabled={phase !== "chatting" || !input.trim()}
          className="rounded-lg bg-primary px-4 py-2 text-xs font-bold text-white hover:bg-primarydark disabled:opacity-50"
        >
          Send
        </button>
      </div>
    </div>
  );
}

function ChatBubble({ from, text }) {
  if (from === "system") {
    return (
      <div className="text-center">
        <span className="rounded-full bg-gray-100 px-3 py-1 text-[10px] font-semibold text-gray-500">
          {text}
        </span>
      </div>
    );
  }
  const mine = from === "user";
  return (
    <div className={`flex ${mine ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[78%] rounded-2xl px-3 py-2 text-xs leading-relaxed ${
          mine
            ? "rounded-br-sm bg-primary text-white"
            : "rounded-bl-sm bg-white text-gray-700 shadow-sm"
        }`}
      >
        {text}
      </div>
    </div>
  );
}

/* ────────────────────── TELEPHONIC MODE ────────────────────── */
function TelephonicMode({ ticket, onPriceLocked, onCancel }) {
  const [phase, setPhase] = useState("waiting"); // waiting → calling → locked
  const { showToast } = useUI();

  function callNow() {
    setPhase("calling");
    showToast("Dialling customer executive…");
    setTimeout(async () => {
      showToast("Executive joined · negotiating…");
      setTimeout(async () => {
        await onPriceLocked();
      }, 2000);
    }, 2000);
  }

  return (
    <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
      <div className="text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-orange-50 text-3xl">
          📞
        </div>
        <h2 className="font-display text-xl font-black text-gray-900">
          Telephonic Negotiation
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          A pricing specialist has been assigned to your case.
        </p>
      </div>

      <div className="mt-6 rounded-xl border border-orange-100 bg-orange-50/60 p-4 text-center">
        <p className="text-[11px] font-bold uppercase tracking-wider text-orange-700">
          Your Ticket Number
        </p>
        <p className="mt-1 font-mono text-2xl font-black tracking-wider text-gray-900">
          {ticket.ticket}
        </p>
        <p className="mt-2 text-[11px] text-gray-500">
          Keep this handy — our executive will ask for it to pull your quotation.
        </p>
      </div>

      {phase === "waiting" && (
        <>
          <button
            type="button"
            onClick={callNow}
            className="mt-5 w-full rounded-lg bg-primary py-3 text-sm font-bold text-white hover:bg-primarydark"
          >
            📞 Call Now
          </button>
          <p className="mt-3 rounded-lg bg-gray-50 px-3 py-2 text-[11px] leading-relaxed text-gray-500">
            If you don&apos;t call within 2 minutes, our executive will call you
            on your registered mobile and quote the ticket number{" "}
            <b className="font-mono">{ticket.ticket}</b> to begin negotiation.
          </p>
          <button
            type="button"
            onClick={onCancel}
            className="mt-3 w-full text-center text-xs font-semibold text-gray-400 hover:text-gray-600"
          >
            Cancel
          </button>
        </>
      )}

      {phase === "calling" && (
        <div className="mt-6 rounded-lg bg-green-50 p-4 text-center">
          <p className="animate-pulse text-sm font-bold text-green-700">
            📞 Call in progress…
          </p>
          <p className="mt-1 text-xs text-green-600">
            Negotiating your pricing. Please stay on the line.
          </p>
        </div>
      )}
    </div>
  );
}