import { Suspense } from "react";
import SearchClient from "./SearchClient";
import { SITE_URL, SITE_NAME } from "@/lib/seo";

export const metadata = {
  title: "Search Products",
  description: `Search across 10 lakh+ industrial, safety and engineering products on ${SITE_NAME}.`,
  alternates: { canonical: "/search" },
  openGraph: { type: "website", url: `${SITE_URL}/search` },
  robots: { index: false, follow: true },
};

export default function SearchPage() {
  return (
    <Suspense fallback={<SearchFallback />}>
      <SearchClient />
    </Suspense>
  );
}

function SearchFallback() {
  return (
    <div className="mx-auto max-w-screen-2xl space-y-6 px-4 py-10">
      <div className="h-10 w-72 animate-pulse rounded-lg bg-gray-200" />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-44 animate-pulse rounded-lg bg-gray-100" />
        ))}
      </div>
    </div>
  );
}