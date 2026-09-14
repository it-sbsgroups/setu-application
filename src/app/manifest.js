import { SITE_NAME } from "@/lib/seo";

export default function manifest() {
  return {
    name: SITE_NAME,
    short_name: "SbS",
    description: "India's B2B marketplace for industrial, safety & engineering supplies.",
    start_url: "/",
    display: "standalone",
    background_color: "#f1f3f6",
    theme_color: "#1b2b4b",
    icons: [
      { src: "/icon", sizes: "32x32", type: "image/png" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}
