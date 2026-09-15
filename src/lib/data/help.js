export const HELP_CATEGORIES = [
  {
    id: "orders",
    icon: "📦",
    title: "Orders & Quotations",
    faqs: [
      { q: "How do I request a quotation?", a: "Add products to your enquiry list, click “Request Quotation”, and fill in your delivery details. We'll email you a quotation within minutes." },
      { q: "Can I negotiate the quoted price?", a: "Yes. After you acknowledge the quotation, choose “Negotiate with our experts” and either chat or call our pricing team." },
      { q: "How do I confirm an order?", a: "Once pricing is agreed, confirm via email OTP or by uploading a signed Purchase Order." },
    ],
  },
  {
    id: "delivery",
    icon: "🚚",
    title: "Delivery & Shipping",
    faqs: [
      { q: "Do you offer free delivery?", a: "Free delivery is vendor-driven. If the vendor supports free delivery for your pin code, it is free. Otherwise delivery charges are payable by the buyer." },
      { q: "How long does delivery take?", a: "Typically 2–5 business days depending on your pin code and the vendor's dispatch location." },
      { q: "Can I track my order?", a: "Yes — enter your ORN on the “Track Order” page and verify via OTP to see live shipment status." },
    ],
  },
  {
    id: "returns",
    icon: "🔄",
    title: "Replacement & Warranty",
    faqs: [
      { q: "Do you accept returns?", a: "No. We operate on a replacement-only model. Wrong or damaged items are replaced free of cost — the burden never falls on you." },
      { q: "What if I receive a wrong item?", a: "Raise a replacement request from your order page. We verify and dispatch a replacement within 2–4 business days." },
      { q: "Is warranty support covered?", a: "Yes — our tele-caller team assists before and after warranty, from 10 AM to 6 PM on all working days." },
    ],
  },
  {
    id: "account",
    icon: "👤",
    title: "Account & Security",
    faqs: [
      { q: "Is my data safe?", a: "Yes. All communication is end-to-end encrypted. Your data is never shared with third parties — it is used only internally to improve our platform." },
      { q: "How do I reset my password?", a: "Use the “Login” modal and choose “Forgot password” — we'll send an OTP to your registered email or mobile." },
      { q: "Can I manage multiple business addresses?", a: "Yes. You can save Home, Office, Factory, and Warehouse addresses from your account dashboard." },
    ],
  },
  {
    id: "billing",
    icon: "🧾",
    title: "Billing & GST",
    faqs: [
      { q: "Do you provide GST invoices?", a: "Yes — every order includes a full GST invoice available for immediate download." },
      { q: "Do you offer credit terms?", a: "Yes, 30-day credit terms are available for verified businesses. Apply during checkout." },
      { q: "What payment methods are supported?", a: "UPI, Credit/Debit Card, Net Banking, Business Credit, and Cash on Delivery (up to ₹20,000)." },
    ],
  },
  {
    id: "vendors",
    icon: "🏭",
    title: "Selling on SbS",
    faqs: [
      { q: "How do I become a seller?", a: "Apply via our Seller Registration page — our onboarding team will complete your KYC within 3 business days." },
      { q: "What are the seller fees?", a: "A flat 4–8% commission depending on category, with no listing fees." },
      { q: "What is the vendor accountability policy?", a: "Vendors found delivering wrong, damaged, or substandard items face instant action under our seller agreement." },
    ],
  },
];