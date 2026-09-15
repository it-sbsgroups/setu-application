/**
 * Mock quotation API. Every function has the same shape as a real REST
 * call (input → Promise<Result>) so swapping in fetch() later is a
 * one-line change per function.
 */

function generateOrn() {
  return `ORN${Math.floor(10000000 + Math.random() * 90000000)}`;
}

function generateTicket() {
  return `TKT${Math.floor(100000 + Math.random() * 900000)}`;
}

function generateQuoteId() {
  return `Q${Date.now().toString().slice(-8)}`;
}

/** Highest price of the range is the initial quote value. */
export function quoteLineTotal(line) {
  return line.product.orig * line.qty;
}

export function quotationTotal(lines) {
  return lines.reduce((s, l) => s + quoteLineTotal(l), 0);
}

export function sendQuotationEmail({ lines, contact, address }) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        quoteId: generateQuoteId(),
        sentAt: new Date().toISOString(),
        validTill: new Date(Date.now() + 7 * 86400000).toISOString(),
        email: contact.email,
        totalHigh: quotationTotal(lines),
      });
    }, 900);
  });
}

export function resendQuotationEmail(quoteId) {
  return new Promise((resolve) =>
    setTimeout(() => resolve({ ok: true, sentAt: new Date().toISOString() }), 700)
  );
}

/** Generates the .txt quotation file and triggers browser download. */
export function downloadQuotation({ lines, address, contact, quote }) {
  const L = "═".repeat(60);
  const l = "─".repeat(60);
  const money = (n) => "₹" + n.toLocaleString("en-IN");

  const out = [
    L,
    "   SbS INDUSTRIAL & B2B — QUOTATION",
    L,
    "",
    `Quotation ID  : ${quote.quoteId}`,
    `Issued On     : ${new Date(quote.sentAt).toLocaleString("en-IN")}`,
    `Valid Till    : ${new Date(quote.validTill).toLocaleDateString("en-IN")}`,
    "",
    "BILL TO:",
    `  ${contact.name}`,
    `  ${address.line1}${address.line2 ? ", " + address.line2 : ""}`,
    `  ${address.city}, ${address.state} — ${address.pincode}`,
    `  +91 ${address.mobile}  ·  ${contact.email}`,
    "",
    l,
    "ITEMS (Highest price of the quotation range)",
    l,
  ];

  lines.forEach((line, i) => {
    const unit = line.product.orig;
    out.push(
      `${i + 1}. ${line.product.name}`,
      `   Qty ${line.qty} × ${money(unit)}  =  ${money(unit * line.qty)}`,
      ""
    );
  });

  out.push(
    l,
    `TOTAL (highest of range)  :  ${money(quotationTotal(lines))}`,
    "",
    "NOTES:",
    "• Prices shown are the upper end of the quotation range.",
    "• Final price confirmed after negotiation, if any.",
    "• Replacement-only policy — wrong/damaged items replaced free.",
    "• Delivery charges as per vendor (free only if vendor supports it).",
    "• Support: 10 AM – 6 PM · all working days.",
    "",
    "For queries reply to this email or contact our B2B desk.",
    L
  );

  const blob = new Blob([out.join("\n")], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `Quotation-${quote.quoteId}.txt`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

export function createNegotiationTicket({ quoteId, mode }) {
  return new Promise((resolve) => {
    setTimeout(
      () =>
        resolve({
          ticket: generateTicket(),
          quoteId,
          mode,
          createdAt: new Date().toISOString(),
        }),
      500
    );
  });
}

/**
 * Called when the executive "locks" a negotiated price. Applies a small
 * deterministic-looking discount (3–8%) on top of the highest range.
 */
export function lockNegotiatedPrice({ lines }) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const lockedLines = lines.map((line) => {
        const discount = 0.03 + Math.random() * 0.05;
        const lockedPrice = Math.round(line.product.orig * (1 - discount));
        return { ...line, unitPrice: lockedPrice, lineTotal: lockedPrice * line.qty };
      });
      resolve({
        lockedAt: new Date().toISOString(),
        lines: lockedLines,
        total: lockedLines.reduce((s, l) => s + l.lineTotal, 0),
      });
    }, 800);
  });
}

export function confirmOrder({ quoteId, method, lockedTotal, orn }) {
  return new Promise((resolve) => {
    setTimeout(
      () =>
        resolve({
          orn: orn || generateOrn(),
          quoteId,
          method,
          confirmedAt: new Date().toISOString(),
          total: lockedTotal,
        }),
      900
    );
  });
}