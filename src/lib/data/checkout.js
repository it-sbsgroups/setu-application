export const PAYMENT_METHODS = [
  {
    id: "upi",
    icon: "📲",
    title: "UPI",
    sub: "Google Pay, PhonePe, Paytm, BHIM & more",
  },
  {
    id: "card",
    icon: "💳",
    title: "Credit / Debit Card",
    sub: "Visa, Mastercard, RuPay, Amex",
  },
  {
    id: "netbanking",
    icon: "🏦",
    title: "Net Banking",
    sub: "All major Indian banks",
  },
  {
    id: "credit-terms",
    icon: "📄",
    title: "Business Credit Terms",
    sub: "30-day credit for verified businesses",
  },
  {
    id: "cod",
    icon: "💵",
    title: "Cash on Delivery",
    sub: "Pay when the order arrives (₹20,000 cap)",
  },
];

export const CONTACT_PREFERENCES = [
  { id: "email", icon: "✉️", label: "Email" },
  { id: "phone", icon: "📞", label: "Phone" },
  { id: "whatsapp", icon: "💬", label: "WhatsApp" },
];

export const NEGOTIATION_CHANNELS = [
  {
    id: "chat",
    icon: "💬",
    title: "Chat with our experts",
    sub: "Instant messaging with a pricing specialist",
  },
  {
    id: "telephonic",
    icon: "📞",
    title: "Talk on the phone",
    sub: "Get a ticket & a callback from our team",
  },
];

export const CONFIRM_METHODS = [
  {
    id: "otp",
    icon: "🔐",
    title: "Acknowledge via Email OTP",
    sub: "Quick verification on your registered email",
  },
  {
    id: "po",
    icon: "📄",
    title: "Send Legal Purchase Order",
    sub: "Upload your signed PO (PDF, JPEG, PNG)",
  },
];

export const ADDRESS_TYPES = ["Home", "Office", "Factory", "Warehouse"];

/**
 * Stepper shows the *macro* milestones — not every sub-stage — so users
 * don't get confused by the negotiation loop feeling like "going back".
 */
export const CHECKOUT_STEPS = [
  { id: "details", label: "Details" },
  { id: "quotation", label: "Quotation" },
  { id: "review", label: "Review" },
  { id: "confirm", label: "Confirm" },
];

/** Maps each internal stage → index into CHECKOUT_STEPS. */
export const STAGE_TO_STEP = {
  details: 0,
  "received-check": 1,
  "price-sat": 2,
  negotiation: 2,
  chat: 2,
  telephonic: 2,
  confirm: 3,
  "locked-price": 3,
};