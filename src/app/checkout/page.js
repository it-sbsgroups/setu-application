import CheckoutClient from "@/components/checkout/CheckoutClient";

export const metadata = {
  title: "Request Quotation",
  description:
    "Request a B2B quotation for industrial, safety and engineering supplies.",
  robots: { index: false, follow: false },
};

export default function CheckoutPage() {
  return <CheckoutClient />;
}