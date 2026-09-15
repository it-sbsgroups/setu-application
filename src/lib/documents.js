/**
 * Client-side document generators. In production these would be fetched
 * as PDFs from the server. Here we build plain-text files so the download
 * flow is demonstrable without a backend.
 */

const L = "═".repeat(64);
const l = "─".repeat(64);
const money = (n) => "₹" + Number(n).toLocaleString("en-IN");
const fmtDate = (iso) =>
  new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

const COMPANY_HEADER = [
  L,
  "   SBS INDUSTRIAL & B2B",
  "   Setu India Pvt. Ltd. · CIN: U74999DL2014PTC274263",
  "   GSTIN: 27AABCU9603R1ZM · support@sbsindustrial.in",
  L,
  "",
];

function buildAddressBlock(order) {
  const a = order.address;
  return [
    `  ${a.name}`,
    `  ${a.line1}${a.line2 ? ", " + a.line2 : ""}`,
    `  ${a.city}, ${a.state} — ${a.pincode}`,
    `  +91 ${a.mobile}  ·  ${order.contact.email}`,
  ];
}

function itemsBlock(items) {
  const out = [l, "ITEMS", l];
  items.forEach((li, i) => {
    out.push(
      `${i + 1}. ${li.product.name}`,
      `   Qty ${li.qty} × ${money(li.unitPrice)}  =  ${money(li.unitPrice * li.qty)}`,
      ""
    );
  });
  return out;
}

function itemsTotal(items) {
  return items.reduce((s, li) => s + li.unitPrice * li.qty, 0);
}

function triggerDownload(filename, content) {
  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

/* ─────────────────────── QUOTATION ─────────────────────── */

export function downloadQuotation(order) {
  const lines = [];
  lines.push(...COMPANY_HEADER);
  lines.push("   QUOTATION", "");
  lines.push(`Quotation ID  : ${order.quoteId}`);
  lines.push(`Issued On     : ${fmtDate(order.createdAt)}`);
  lines.push(`Valid Till    : ${fmtDate(new Date(new Date(order.createdAt).getTime() + 7 * 86400000))}`);
  lines.push("");
  lines.push("BILL TO:");
  lines.push(...buildAddressBlock(order));
  if (order.contact.ccEmails?.length) {
    lines.push(`  CC: ${order.contact.ccEmails.join(", ")}`);
  }
  lines.push("");
  lines.push(...itemsBlock(order.items));
  lines.push(l);
  lines.push(`TOTAL (highest of range)  :  ${money(order.quotedTotal)}`);
  lines.push("");
  lines.push("NOTES:");
  lines.push("• Prices shown are the upper end of the quotation range.");
  lines.push("• Final price confirmed after negotiation, if any.");
  lines.push("• Replacement-only policy — wrong/damaged items replaced free.");
  lines.push("• Delivery charges as per vendor (free only if vendor supports it).");
  lines.push(L);

  triggerDownload(`Quotation-${order.quoteId}.txt`, lines.join("\n"));
}

/* ─────────────────────── INVOICE (GST) ──────────────────── */

export function downloadInvoice(order) {
  const invoiceNo = order.invoiceNumber || `INV-${order.orn.slice(-8)}`;
  const invoiceDate = order.timeline.find((t) => t.label === "Delivered")?.at || order.createdAt;
  const subtotal = itemsTotal(order.items);
  const gstRate = 18;
  const gstAmount = Math.round((subtotal * gstRate) / 100);
  const grandTotal = subtotal + gstAmount;

  const lines = [];
  lines.push(...COMPANY_HEADER);
  lines.push("   TAX INVOICE", "");
  lines.push(`Invoice No.   : ${invoiceNo}`);
  lines.push(`Invoice Date  : ${fmtDate(invoiceDate)}`);
  lines.push(`Order (ORN)   : ${order.orn}`);
  lines.push(`PO Number     : ${order.poNumber || "—"}`);
  lines.push("");
  lines.push("BILL TO:");
  lines.push(...buildAddressBlock(order));
  lines.push("");
  lines.push("SHIP TO:");
  lines.push(...buildAddressBlock(order));
  lines.push("");
  lines.push(...itemsBlock(order.items));

  lines.push(l);
  lines.push(`Subtotal              :  ${money(subtotal)}`);
  lines.push(`IGST @ ${gstRate}%            :  ${money(gstAmount)}`);
  lines.push(l);
  lines.push(`GRAND TOTAL           :  ${money(grandTotal)}`);
  lines.push("");
  lines.push("Declaration:");
  lines.push("We declare that this invoice shows the actual price of the goods");
  lines.push("described and that all particulars are true and correct.");
  lines.push("");
  lines.push("This is a computer-generated invoice.");
  lines.push(L);

  triggerDownload(`${invoiceNo}.txt`, lines.join("\n"));
}

/* ─────────────────────── PO ACK ─────────────────────────── */

export function downloadPOAck(order) {
  const lines = [];
  lines.push(...COMPANY_HEADER);
  lines.push("   PURCHASE ORDER ACKNOWLEDGEMENT", "");
  lines.push(`PO Number     : ${order.poNumber}`);
  lines.push(`Order (ORN)   : ${order.orn}`);
  lines.push(`Quotation ID  : ${order.quoteId}`);
  lines.push(`Received On   : ${fmtDate(new Date())}`);
  lines.push("");
  lines.push("VENDOR:");
  lines.push("  SbS Industrial & B2B");
  lines.push("  Setu India Pvt. Ltd.");
  lines.push("");
  lines.push("DELIVER TO:");
  lines.push(...buildAddressBlock(order));
  lines.push("");
  lines.push(...itemsBlock(order.items));

  lines.push(l);
  lines.push(`PO VALUE      :  ${money(itemsTotal(order.items))}`);
  lines.push("");
  lines.push("STATUS: Acknowledged by SbS Industrial & B2B");
  lines.push("Next step: Order moves to processing and dispatch.");
  lines.push(L);

  triggerDownload(`PO-Ack-${order.poNumber}.txt`, lines.join("\n"));
}

/* ─────────────────────── DELIVERY CHALLAN ───────────────── */

export function downloadChallan(order) {
  const lines = [];
  lines.push(...COMPANY_HEADER);
  lines.push("   DELIVERY CHALLAN", "");
  lines.push(`Challan No.   :  DC-${order.orn.slice(-8)}`);
  lines.push(`Order (ORN)   :  ${order.orn}`);
  lines.push(`PO Number     :  ${order.poNumber || "—"}`);
  lines.push(`Date          :  ${fmtDate(new Date())}`);
  lines.push("");
  lines.push("DELIVER TO:");
  lines.push(...buildAddressBlock(order));
  lines.push("");
  lines.push(...itemsBlock(order.items));

  lines.push(l);
  lines.push(`Total Qty     :  ${order.items.reduce((s, l) => s + l.qty, 0)} units`);
  lines.push("");
  lines.push("RECEIVED BY: _______________________");
  lines.push("");
  lines.push("Name: ______________________  Date: ____________");
  lines.push("");
  lines.push("Note: Replacement-only policy applies.");
  lines.push("      Wrong or damaged items are replaced free of cost.");
  lines.push(L);

  triggerDownload(`Challan-${order.orn}.txt`, lines.join("\n"));
}