export default function robots() {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/api/", "/admin/"] },
    sitemap: "https://www.sbsindustrial.com/sitemap.xml",
  };
}
