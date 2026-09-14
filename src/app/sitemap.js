import { SITE_URL } from "@/lib/seo";
import { CATEGORIES, slugifyCategory } from "@/lib/data/categories";
import { ALL_PRODUCTS } from "@/lib/data/products";

export default function sitemap() {
  const now = new Date();

  const staticEntries = [
    { url: SITE_URL, lastModified: now, changeFrequency: "daily", priority: 1 },
    { url: `${SITE_URL}/categories`, lastModified: now, changeFrequency: "weekly", priority: 0.6 },
    { url: `${SITE_URL}/new-arrivals`, lastModified: now, changeFrequency: "daily", priority: 0.7 },
    { url: `${SITE_URL}/deals`, lastModified: now, changeFrequency: "daily", priority: 0.7 },
  ];

  const categoryEntries = CATEGORIES.map((c) => ({
    url: `${SITE_URL}/category/${slugifyCategory(c.name)}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const productEntries = ALL_PRODUCTS.map((p) => ({
    url: `${SITE_URL}/product/${p.id}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticEntries, ...categoryEntries, ...productEntries];
}
