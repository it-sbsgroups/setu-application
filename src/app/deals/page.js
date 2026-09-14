import { TRENDING } from "@/lib/data/products";
import { SITE_URL, SITE_NAME } from "@/lib/seo";
import ProductGrid from "@/components/home/ProductGrid";

export const metadata = {
  title: "Today's Deals",
  description: `The most popular industrial and safety products businesses are buying right now on ${SITE_NAME}.`,
  alternates: { canonical: "/deals" },
  openGraph: { type: "website", url: `${SITE_URL}/deals` },
};

export default function DealsPage() {
  return (
    <div className="mx-auto max-w-screen-2xl px-4 py-6">
      <ProductGrid eyebrow="TRENDING NOW" title="🔥 Today's Deals" subtitle="What businesses across India are buying the most right now" products={TRENDING} />
    </div>
  );
}
