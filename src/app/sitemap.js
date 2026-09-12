export default function sitemap() {
  const base = "https://www.sbsindustrial.com";
  return [
    { url: base, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    { url: `${base}/categories`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/brands`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.6 },
  ];
}
