import { notFound } from "next/navigation";
import { ALL_PRODUCTS, PRODUCTS_BY_ID } from "@/lib/data/products";
import { getProductDetail, getSimilarProducts } from "@/lib/data/productDetails";
import { formatMoney, thumb } from "@/lib/format";
import { SITE_URL, SITE_NAME } from "@/lib/seo";

import Breadcrumb from "@/components/product/Breadcrumb";
import Gallery from "@/components/product/Gallery";
import BuyBox from "@/components/product/BuyBox";
import TrustRibbon from "@/components/product/TrustRibbon";
import KeyFeatures from "@/components/product/KeyFeatures";
import Specifications from "@/components/product/Specifications";
import ProductDescription from "@/components/product/ProductDescription";
import ReturnPolicy from "@/components/product/ReturnPolicy";
import BulkEnquiry from "@/components/product/BulkEnquiry";
import ReviewsSection from "@/components/product/ReviewsSection";
import Faq from "@/components/product/Faq";
import ProductGrid from "@/components/home/ProductGrid";
import StarRating from "@/components/ui/StarRating";

// Pre-renders every product page at build time (SSG) — fast loads and
// fully crawlable HTML for search engines, no client-side data fetch needed.
export function generateStaticParams() {
  return ALL_PRODUCTS.map((p) => ({ id: String(p.id) }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const product = PRODUCTS_BY_ID[id];
  if (!product) return {};

  const detail = getProductDetail(product);
  const title = `${product.name} | Buy Online at Best Price`;
  const description = `${product.name} by ${detail.brand} — ${formatMoney(product.price)} (${Math.round(((product.orig - product.price) / product.orig) * 100)}% off). ${detail.features[0] || ""} Free delivery, GST invoice, bulk pricing available on ${SITE_NAME}.`;
  const image = thumb(product.img, 800);

  return {
    title,
    description,
    alternates: { canonical: `/product/${product.id}` },
    openGraph: {
      type: "website",
      title,
      description,
      url: `${SITE_URL}/product/${product.id}`,
      images: [{ url: image, width: 800, height: 800, alt: product.name }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

function ProductJsonLd({ product, detail }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    brand: { "@type": "Brand", name: detail.brand },
    category: product.cat,
    image: detail.gallery,
    description: detail.description[0],
    sku: String(product.id),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviews,
    },
    offers: {
      "@type": "Offer",
      url: `${SITE_URL}/product/${product.id}`,
      priceCurrency: "INR",
      price: product.price,
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export default async function ProductPage({ params }) {
  const { id } = await params;
  const product = PRODUCTS_BY_ID[id];
  if (!product) notFound();

  const detail = getProductDetail(product);
  const similar = getSimilarProducts(product, 6);

  return (
    <>
      <ProductJsonLd product={product} detail={detail} />
      <Breadcrumb category={product.cat} productName={product.name} />

      <div className="mx-auto max-w-screen-2xl space-y-6 px-4 py-5">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_380px]">
          <div className="space-y-4">
            <Gallery images={detail.gallery} alt={product.name} badge={product.badge} />

            <div className="rounded-xl border border-gray-100 bg-white p-5">
              <p className="mb-1 text-xs font-semibold text-primary">{detail.brand}</p>
              <h1 className="font-display text-xl font-bold leading-snug text-gray-900 sm:text-2xl">{product.name}</h1>
              <div className="mt-2 flex items-center gap-2">
                <div className="flex items-center gap-1 rounded bg-green-600 px-1.5 py-0.5">
                  <span className="text-xs font-bold text-white">{product.rating}</span>
                  <StarRating rating={product.rating} />
                </div>
                <span className="text-xs text-gray-400">{product.reviews.toLocaleString("en-IN")} ratings</span>
              </div>
            </div>
          </div>

          <div className="lg:sticky lg:top-20 lg:self-start">
            <BuyBox product={product} />
          </div>
        </div>

        <TrustRibbon />
        <KeyFeatures features={detail.features} />
        <Specifications specs={detail.specs} />
        <ProductDescription paragraphs={detail.description} />
        <ReturnPolicy />
        <BulkEnquiry productName={product.name} />

        {similar.length > 0 && (
          <ProductGrid eyebrow="YOU MAY ALSO LIKE" title="Similar Products" subtitle={`More from ${product.cat}`} products={similar} />
        )}

        <ReviewsSection product={detail} />
        <Faq product={detail} />
      </div>
    </>
  );
}
