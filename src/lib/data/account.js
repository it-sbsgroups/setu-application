import { PRODUCTS_BY_ID } from "@/lib/data/products";

export const ORDER_STATUS = {
  RFQ_SENT: "rfq-sent",
  NEGOTIATION: "negotiation",
  AWAITING_PO: "awaiting-po",
  PO_RECEIVED: "po-received",
  PROCESSING: "processing",
  DISPATCHED: "dispatched",
  IN_TRANSIT: "in-transit",
  DELIVERED: "delivered",
  EXCHANGE_REQUESTED: "exchange-requested",
  CLOSED: "closed",
  CANCELLED: "cancelled",
};

export const STATUS_META = {
  "rfq-sent":           { label: "RFQ Sent",           tone: "blue",   icon: "📧" },
  negotiation:          { label: "Negotiation",        tone: "amber",  icon: "🤝" },
  "awaiting-po":        { label: "Awaiting PO",        tone: "purple", icon: "📄" },
  "po-received":        { label: "PO Received",        tone: "indigo", icon: "✅" },
  processing:           { label: "Processing",         tone: "cyan",   icon: "⚙️" },
  dispatched:           { label: "Dispatched",         tone: "sky",    icon: "📦" },
  "in-transit":         { label: "In Transit",         tone: "sky",    icon: "🚚" },
  delivered:            { label: "Delivered",          tone: "green",  icon: "🎉" },
  "exchange-requested": { label: "Exchange Requested", tone: "orange", icon: "🔄" },
  closed:               { label: "Closed",             tone: "gray",   icon: "🏁" },
  cancelled:            { label: "Cancelled",          tone: "red",    icon: "✕" },
};

export const TONE_CLASSES = {
  blue:   "bg-blue-50 text-blue-700 ring-blue-200",
  amber:  "bg-amber-50 text-amber-700 ring-amber-200",
  purple: "bg-purple-50 text-purple-700 ring-purple-200",
  indigo: "bg-indigo-50 text-indigo-700 ring-indigo-200",
  cyan:   "bg-cyan-50 text-cyan-700 ring-cyan-200",
  sky:    "bg-sky-50 text-sky-700 ring-sky-200",
  green:  "bg-green-50 text-green-700 ring-green-200",
  orange: "bg-orange-50 text-orange-700 ring-orange-200",
  gray:   "bg-gray-100 text-gray-600 ring-gray-200",
  red:    "bg-red-50 text-red-700 ring-red-200",
};

const ago = (d, h = 0) =>
  new Date(Date.now() - d * 86400000 - h * 3600000).toISOString();

function line(productId, qty, unitPrice) {
  const product = PRODUCTS_BY_ID[productId];
  return { productId, qty, unitPrice: unitPrice ?? product.orig, product };
}

/** Seeds a realistic account the first time the panel is opened. */
export function seedAccount() {
  const orders = [
    {
      orn: "ORN24519873",
      quoteId: "Q48210021",
      createdAt: ago(6, 3),
      status: ORDER_STATUS.IN_TRANSIT,
      items: [line(1, 2), line(7, 4, 1199)],
      quotedTotal: 2 * 4999 + 4 * 1800,
      lockedTotal: null,
      poNumber: null,
      invoiceNumber: "INV-2026-00119",
      address: {
        name: "Rahul Sharma",
        line1: "Plot 42, MIDC Industrial Area",
        line2: "Andheri East",
        city: "Mumbai",
        state: "Maharashtra",
        pincode: "400093",
        mobile: "9876543210",
        type: "Factory",
      },
      contact: {
        name: "Rahul Sharma",
        email: "rahul@acmeindustries.in",
        mobile: "9876543210",
        ccEmails: ["finance@acmeindustries.in"],
      },
      negotiationId: null,
      timeline: [
        { at: ago(6, 3), label: "RFQ emailed to rahul@acmeindustries.in", note: "Quote Q48210021" },
        { at: ago(6, 2), label: "You confirmed the quoted price" },
        { at: ago(5, 20), label: "PO received", note: "PO-2026-AC-119" },
        { at: ago(3), label: "Dispatched from Bhiwandi warehouse" },
        { at: ago(1), label: "Arrived at Nagpur Transit Hub" },
      ],
    },
    {
      orn: "ORN24519712",
      quoteId: "Q48203988",
      createdAt: ago(3, 5),
      status: ORDER_STATUS.NEGOTIATION,
      items: [line(43, 1, 24999), line(45, 2, 3299)],
      quotedTotal: 32000 + 2 * 4500,
      lockedTotal: null,
      poNumber: null,
      address: {
        name: "Rahul Sharma",
        line1: "Plot 42, MIDC Industrial Area",
        line2: "Andheri East",
        city: "Mumbai",
        state: "Maharashtra",
        pincode: "400093",
        mobile: "9876543210",
        type: "Factory",
      },
      contact: { name: "Rahul Sharma", email: "rahul@acmeindustries.in", mobile: "9876543210", ccEmails: [] },
      negotiationId: "NEG-2418",
      timeline: [
        { at: ago(3, 5), label: "RFQ emailed — quotation Q48203988" },
        { at: ago(3, 4), label: "You opened negotiation with Pricing Desk" },
      ],
    },
    {
      orn: "ORN24518540",
      quoteId: "Q48198701",
      createdAt: ago(12, 6),
      status: ORDER_STATUS.DELIVERED,
      items: [line(13, 30, 1799), line(17, 4, 599)],
      quotedTotal: 30 * 2200 + 4 * 899,
      lockedTotal: 30 * 1799 + 4 * 599,
      poNumber: "PO-2026-AC-082",
      invoiceNumber: "INV-2026-00082",
      address: {
        name: "Rahul Sharma",
        line1: "Plot 42, MIDC Industrial Area",
        line2: "Andheri East",
        city: "Mumbai",
        state: "Maharashtra",
        pincode: "400093",
        mobile: "9876543210",
        type: "Factory",
      },
      contact: { name: "Rahul Sharma", email: "rahul@acmeindustries.in", mobile: "9876543210", ccEmails: [] },
      negotiationId: "NEG-2401",
      timeline: [
        { at: ago(12, 6), label: "RFQ emailed — quotation Q48198701" },
        { at: ago(12, 1), label: "Negotiation opened with Pricing Desk" },
        { at: ago(11, 20), label: "Price locked at ₹2,96,166 (5% off)" },
        { at: ago(11, 4), label: "PO received", note: "PO-2026-AC-082" },
        { at: ago(9), label: "Dispatched from Bhiwandi warehouse" },
        { at: ago(4), label: "Delivered", note: "Signed by R. Sharma" },
      ],
    },
    {
      orn: "ORN24517333",
      quoteId: "Q48189002",
      createdAt: ago(20),
      status: ORDER_STATUS.AWAITING_PO,
      items: [line(55, 3, 19999)],
      quotedTotal: 3 * 26000,
      lockedTotal: 3 * 18999,
      poNumber: null,
      address: {
        name: "Rahul Sharma",
        line1: "Plot 42, MIDC Industrial Area",
        line2: "Andheri East",
        city: "Mumbai",
        state: "Maharashtra",
        pincode: "400093",
        mobile: "9876543210",
        type: "Factory",
      },
      contact: { name: "Rahul Sharma", email: "rahul@acmeindustries.in", mobile: "9876543210", ccEmails: [] },
      negotiationId: null,
      timeline: [
        { at: ago(20), label: "RFQ emailed — quotation Q48189002" },
        { at: ago(19, 20), label: "You confirmed the quoted price" },
        { at: ago(19, 18), label: "Awaiting PO upload" },
      ],
    },
    {
      orn: "ORN24516998",
      quoteId: "Q48181245",
      createdAt: ago(28),
      status: ORDER_STATUS.DELIVERED,
      items: [line(31, 500, 449), line(33, 200, 599)],
      quotedTotal: 500 * 650 + 200 * 850,
      lockedTotal: 500 * 449 + 200 * 599,
      poNumber: "PO-2026-AC-021",
      invoiceNumber: "INV-2026-00021",
      address: {
        name: "Rahul Sharma",
        line1: "Plot 42, MIDC Industrial Area",
        line2: "Andheri East",
        city: "Mumbai",
        state: "Maharashtra",
        pincode: "400093",
        mobile: "9876543210",
        type: "Factory",
      },
      contact: { name: "Rahul Sharma", email: "rahul@acmeindustries.in", mobile: "9876543210", ccEmails: [] },
      negotiationId: null,
      timeline: [
        { at: ago(28), label: "RFQ emailed — quotation Q48181245" },
        { at: ago(27, 20), label: "You confirmed the quoted price" },
        { at: ago(27, 18), label: "PO received", note: "PO-2026-AC-021" },
        { at: ago(24), label: "Dispatched from Bhiwandi warehouse" },
        { at: ago(22), label: "Delivered" },
      ],
    },
  ];

  const negotiations = [
    {
      id: "NEG-2418",
      orderOrn: "ORN24519712",
      status: "open",
      assignedTo: "Priya · Pricing Desk",
      createdAt: ago(3, 4),
      participants: ["TM-001"],
      messages: [
        { id: "m1", from: "system", text: "Chat started · Ticket TKT482910", at: ago(3, 4) },
        { id: "m2", from: "exec",   text: "Hi Rahul — Priya here from the SbS pricing team. I see you've asked for a review on the Lincoln Invertec + regulators combo. What target were you hoping for?", at: ago(3, 4) },
        { id: "m3", from: "user",   text: "We need it around 12% below the quoted range. Volume is recurring — 4 units per quarter.", at: ago(3, 3) },
        { id: "m4", from: "exec",   text: "Understood. For a quarterly commitment I can push 8% right away and escalate the rest to my manager. Give me a few minutes.", at: ago(3, 3) },
      ],
      lockedAt: null,
      lockedLines: null,
    },
    {
      id: "NEG-2401",
      orderOrn: "ORN24518540",
      status: "locked",
      assignedTo: "Priya · Pricing Desk",
      createdAt: ago(12, 1),
      participants: ["TM-001", "TM-002"],
      messages: [
        { id: "m1", from: "system", text: "Chat started · Ticket TKT482311", at: ago(12, 1) },
        { id: "m2", from: "user",   text: "Quoted range feels high for 30 reels of FR PVC. Can we do better?", at: ago(12, 1) },
        { id: "m3", from: "exec",   text: "Yes — 5% off across the line for this quantity.", at: ago(11, 23) },
        { id: "m4", from: "user",   text: "Works for us. Please lock it.", at: ago(11, 22) },
        { id: "m5", from: "system", text: "✅ Price locked by executive", at: ago(11, 20) },
      ],
      lockedAt: ago(11, 20),
      lockedLines: [
        { productId: 13, qty: 30, unitPrice: 1799 },
        { productId: 17, qty: 4,  unitPrice: 599  },
      ],
    },
  ];

  const team = [
    {
      id: "TM-001",
      name: "Priya Nair",
      email: "priya@acmeindustries.in",
      mobile: "9876543211",
      role: "Finance Lead",
      status: "active",
      permissions: { viewOrders: true, negotiate: true, approvePO: false, monitorDeliveries: true },
      invitedAt: ago(40),
    },
    {
      id: "TM-002",
      name: "Vikram Singh",
      email: "vikram@acmeindustries.in",
      mobile: "9876543212",
      role: "Plant Manager",
      status: "active",
      permissions: { viewOrders: true, negotiate: false, approvePO: true, monitorDeliveries: true },
      invitedAt: ago(35),
    },
    {
      id: "TM-003",
      name: "Anita Desai",
      email: "anita@acmeindustries.in",
      mobile: "9876543213",
      role: "Stores",
      status: "invited",
      permissions: { viewOrders: true, negotiate: false, approvePO: false, monitorDeliveries: true },
      invitedAt: ago(2),
    },
  ];

  const tickets = [
    {
      id: "TKT-50021",
      subject: "Bearing noise from GSB 750 drill (ORN24518540)",
      orderOrn: "ORN24518540",
      productId: 1,
      priority: "high",
      status: "in-progress",
      createdAt: ago(1, 4),
      messages: [
        { id: "t1", from: "system", text: "Ticket raised", at: ago(1, 4) },
        { id: "t2", from: "user",   text: "Drill in ORN24518540 has a bearing rattle above 2000 rpm. Need a replacement.", at: ago(1, 4) },
        { id: "t3", from: "agent",  text: "Hi Rahul, Apurva here. I've looped in Bosch warranty. Can you share a 10-second video of the noise?", at: ago(1, 2), author: "Apurva · Support" },
      ],
    },
  ];

  const addresses = [
    {
      id: "ADDR-001",
      label: "Head Office",
      type: "Office",
      name: "Rahul Sharma",
      mobile: "9876543210",
      line1: "Plot 42, MIDC Industrial Area",
      line2: "Andheri East",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400093",
      landmark: "Near Metro Station",
      isDefault: true,
    },
    {
      id: "ADDR-002",
      label: "Factory Unit 2",
      type: "Factory",
      name: "Vikram Singh",
      mobile: "9876543212",
      line1: "Gat No. 118, Chakan MIDC",
      line2: "Phase II",
      city: "Pune",
      state: "Maharashtra",
      pincode: "410501",
      landmark: "Opposite Bajaj Auto Gate 3",
      isDefault: false,
    },
    {
      id: "ADDR-003",
      label: "Bhiwandi Warehouse",
      type: "Warehouse",
      name: "Rahul Sharma",
      mobile: "9876543210",
      line1: "Bhiwandi Logistics Park",
      line2: "Unit 7, Kalyan Road",
      city: "Bhiwandi",
      state: "Maharashtra",
      pincode: "421302",
      landmark: "",
      isDefault: false,
    },
  ];

  const notifications = [
    {
      id: "NT-001",
      type: "order",
      title: "Order dispatched",
      body: "ORN24519873 has been dispatched from Bhiwandi warehouse.",
      href: "/account/orders/ORN24519873",
      at: ago(3),
      read: false,
    },
    {
      id: "NT-002",
      type: "negotiation",
      title: "New reply from Pricing Desk",
      body: "Priya replied on NEG-2418 — additional 8% off is available.",
      href: "/account/negotiations?thread=NEG-2418",
      at: ago(3, 3),
      read: false,
    },
    {
      id: "NT-003",
      type: "support",
      title: "Support replied on TKT-50021",
      body: "Apurva asked for a short video of the noise to raise the Bosch warranty claim.",
      href: "/account/support",
      at: ago(1, 2),
      read: true,
    },
  ];

  const preferences = {
    channels: {
      email: true,
      sms: true,
      whatsapp: false,
    },
    topics: {
      orderUpdates: true,
      negotiationReplies: true,
      supportReplies: true,
      marketing: false,
      weeklyDigest: true,
    },
    language: "en-IN",
    timezone: "Asia/Kolkata",
  };

  return {
    profile: {
      name: "Rahul Sharma",
      mobile: "9876543210",
      email: "rahul@acmeindustries.in",
      designation: "Procurement Manager",
      employeeId: "EMP-2291",
      role: "owner",
      orgName: "Acme Industries Pvt Ltd",
      orgCIN: "U29299MH2014PTC254120",
      gstin: "27AABCU9603R1ZM",
      alternateContact: {
        name: "",
        email: "",
        mobile: "",
      },
      aadharVerified: true,
      aadharName: "Rahul Sharma",
      digilockerId: "DL-XXXX-8891",
      aadharVerifiedAt: ago(60),
      orgVerified: true,
      orgVerifiedAt: ago(58),
      orgVerifierName: "Neha (Onboarding)",
      pendingAadharChange: null,
      pendingOrgVerification: null,
    },
    preferences,
    addresses,
    orders,
    negotiations,
    team,
    tickets,
    reviews: [
      {
        id: "RV-1001",
        orderOrn: "ORN24518540",
        productId: 13,
        rating: 5,
        title: "Consistent quality, ISI marked as advertised",
        body: "Used 30 reels across two sites. Insulation is clean, no cracking on bends. Will reorder.",
        createdAt: ago(3),
      },
    ],
    notifications,
  };
}

export function findOrder(account, orn) {
  return account.orders.find((o) => o.orn === orn);
}
export function findNegotiation(account, id) {
  return account.negotiations.find((n) => n.id === id);
}
export function ordersForStatus(account, statusList) {
  return account.orders.filter((o) => statusList.includes(o.status));
}
export function orderTotal(order) {
  const lines = order.lockedTotal ? order.items.map((l) => ({ ...l, unitPrice: l.unitPrice })) : order.items;
  return lines.reduce((s, l) => s + l.unitPrice * l.qty, 0);
}