"use client";

import { useState } from "react";

function buildFaqs(product) {
  return [
    {
      q: `Is ${product.brand} a genuine/authorised brand on SbS?`,
      a: `Yes. ${product.brand} products sold on SbS are 100% genuine and sourced from verified sellers, with full GST invoicing.`,
    },
    {
      q: "What is the warranty on this product?",
      a: "This product comes with the manufacturer's standard warranty — see the Product Specifications section above for the exact duration.",
    },
    {
      q: "Do you offer returns?",
      a: "No. SbS follows a replacement-only policy. If you receive a wrong, damaged, or defective item, we replace it free of cost — you are never asked to return the item. Vendors found responsible face instant action under our seller agreement.",
    },
    {
      q: "What if I receive a wrong or damaged item?",
      a: "Raise a replacement request from your order page. Our team verifies and dispatches a replacement within 2–4 business days. No return shipment is required from your side.",
    },
    {
      q: "Do you provide support before and after warranty?",
      a: "Yes. Our tele-caller team assists at every step — installation, usage guidance, warranty claims, and post-warranty service coordination. Available 10 AM to 6 PM on all working days.",
    },
    {
      q: "Is delivery free?",
      a: "Delivery is vendor-driven. If the vendor supports free delivery for your pin code, it is free. Otherwise, delivery charges are payable by the buyer and are shown at dispatch.",
    },
    {
      q: "Is my personal data safe with SbS?",
      a: "Yes. All communication is end-to-end encrypted. Your data is never shared with any third party or individual — it is used only internally by SbS Private Limited to improve our platform and deliver specialised features to you.",
    },
    {
      q: "Can I get a bulk discount for large quantities?",
      a: 'Yes, use the "Buy More & Save More" pricing above, or click "Raise Request" for a custom bulk quote.',
    },
  ];
}

export default function Faq({ product }) {
  const [openIndex, setOpenIndex] = useState(null);
  const faqs = buildFaqs(product);

  return (
    <div className="rounded-xl border border-gray-100 bg-white p-5">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="font-display text-base font-bold text-gray-900">Frequently Asked Questions</h2>
        <button type="button" className="rounded-lg bg-primary px-4 py-2 text-xs font-bold text-white hover:bg-primarydark">
          Ask Now
        </button>
      </div>
      <div className="divide-y divide-gray-100">
        {faqs.map((faq, i) => {
          const isOpen = openIndex === i;
          return (
            <div key={faq.q}>
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-3 py-3 text-left text-sm font-medium text-gray-700"
                aria-expanded={isOpen}
              >
                {faq.q}
                <span className="shrink-0 text-gray-400">{isOpen ? "−" : "+"}</span>
              </button>
              {isOpen && <p className="pb-3 text-sm text-gray-500">{faq.a}</p>}
            </div>
          );
        })}
      </div>
    </div>
  );
}
