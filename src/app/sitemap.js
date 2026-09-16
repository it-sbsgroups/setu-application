import { SITE_URL } from "@/lib/seo";
import { CATEGORIES, slugifyCategory } from "@/lib/data/categories";
import { ALL_PRODUCTS } from "@/lib/data/products";
import { BRANDS } from "@/lib/data/brands";
import { TRUST_PILLARS } from "@/lib/data/trustPillars";
import { VALID_STAT_SLUGS } from "@/lib/data/brandDetails";

export default function sitemap() {
  const now = new Date();

  const staticEntries = [
    { url: SITE_URL, lastModified: now, changeFrequency: "daily", priority: 1 },
    { url: `${SITE_URL}/categories`, lastModified: now, changeFrequency: "weekly", priority: 0.6 },
    { url: `${SITE_URL}/new-arrivals`, lastModified: now, changeFrequency: "daily", priority: 0.7 },
    { url: `${SITE_URL}/deals`, lastModified: now, changeFrequency: "daily", priority: 0.7 },
    { url: `${SITE_URL}/brands`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE_URL}/trust`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE_URL}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/help`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/bulk-orders`, lastModified: now, changeFrequency: "weekly", priority: 0.6 },
    { url: `${SITE_URL}/return-policy`, lastModified: now, changeFrequency: "monthly", priority: 0.4 },
    { url: `${SITE_URL}/careers`, lastModified: now, changeFrequency: "weekly", priority: 0.4 },
    { url: `${SITE_URL}/press`, lastModified: now, changeFrequency: "weekly", priority: 0.4 },
    { url: `${SITE_URL}/sustainability`, lastModified: now, changeFrequency: "monthly", priority: 0.4 },
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

  const brandEntries = BRANDS.map((b) => ({
    url: `${SITE_URL}/brand/${b.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  // Brand stat pages: /brand/bosch/founded, /brand/bosch/origin, etc.
  const brandStatEntries = BRANDS.flatMap((b) =>
    VALID_STAT_SLUGS.map((stat) => ({
      url: `${SITE_URL}/brand/${b.slug}/${stat}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    }))
  );

  const trustEntries = TRUST_PILLARS.map((p) => ({
    url: `${SITE_URL}/trust/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [
    ...staticEntries,
    ...categoryEntries,
    ...brandEntries,
    ...brandStatEntries,
    ...trustEntries,
    ...productEntries,
  ];
}