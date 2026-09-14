import CheckoutClient from "@/components/checkout/CheckoutClient";

export const metadata = {
  title: "Secure Checkout",
  description: "Complete your industrial supplies order securely.",
  robots: { index: false, follow: false },
};

export default function CheckoutPage() {
  return <CheckoutClient />;
}