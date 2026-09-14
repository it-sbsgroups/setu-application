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

export const ADDRESS_TYPES = ["Home", "Office", "Factory", "Warehouse"];

export const CHECKOUT_STEPS = [
  { id: "address", label: "Address" },
  { id: "payment", label: "Payment" },
  { id: "review", label: "Review" },
];