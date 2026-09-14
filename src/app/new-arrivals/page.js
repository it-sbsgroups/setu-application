import { LATEST } from "@/lib/data/products";
import { SITE_URL, SITE_NAME } from "@/lib/seo";
import ProductGrid from "@/components/home/ProductGrid";

export const metadata = {
  title: "New Arrivals",
  description: `Freshly added industrial, safety and engineering products on ${SITE_NAME}. Browse the latest stock from top brands.`,
  alternates: { canonical: "/new-arrivals" },
  openGraph: { type: "website", url: `${SITE_URL}/new-arrivals` },
};

export default function NewArrivalsPage() {
  return (
    <div className="mx-auto max-w-screen-2xl px-4 py-6">
      <ProductGrid eyebrow="JUST LANDED" title="🆕 New Arrivals" subtitle="Fresh stock from top industrial brands, added this week" products={LATEST} />
    </div>
  );
}
