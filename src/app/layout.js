import { Outfit, Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/components/layout/CartContext";
import { LocationProvider } from "@/components/layout/LocationContext";
import ToastProvider from "@/components/ui/ToastProvider";

const outfit = Outfit({ subsets: ["latin"], weight: ["400","500","600","700","800","900"], variable: "--font-outfit", display: "swap" });
const inter = Inter({ subsets: ["latin"], weight: ["400","500","600"], variable: "--font-inter", display: "swap" });

export const metadata = {
  metadataBase: new URL("https://www.sbsindustrial.com"),
  title: { default: "SbS Industrial & B2B Marketplace — 10 Lakh+ Products | Power Tools, Safety, Electrical", template: "%s | SbS Industrial" },
  description: "India's leading B2B marketplace for industrial, engineering & safety products. 10 lakh+ SKUs, 50k+ verified brands, same-day dispatch. Power tools, PPE, electrical, plumbing & more.",
  keywords: ["B2B industrial marketplace India","power tools","safety equipment","PPE","electrical","plumbing","fasteners","welding","material handling","Bosch","DeWalt"],
  authors: [{ name: "SbS Industrial" }],
  creator: "Setu India Pvt Ltd",
  publisher: "Setu India Pvt Ltd",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website", locale: "en_IN", url: "https://www.sbsindustrial.com", siteName: "SbS Industrial & B2B",
    title: "SbS Industrial & B2B Marketplace — 10 Lakh+ Products",
    description: "India's leading B2B marketplace for industrial products. Same-day dispatch, GST invoices, bulk pricing.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "SbS Industrial & B2B Marketplace" }],
  },
  twitter: { card: "summary_large_image", title: "SbS Industrial & B2B Marketplace", description: "10 lakh+ industrial products, 50k+ brands, same-day dispatch across India.", images: ["/og-image.jpg"], creator: "@sbsindustrial" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 } },
  category: "B2B Industrial",
};
export const viewport = { width: "device-width", initialScale: 1, themeColor: "#1B2B4B" };

export default function RootLayout({ children }) {
  const org = { "@context": "https://schema.org", "@type": "Organization", name: "SbS Industrial & B2B", url: "https://www.sbsindustrial.com", logo: "https://www.sbsindustrial.com/logo.png", sameAs: ["https://facebook.com/sbsindustrial","https://instagram.com/sbsindustrial","https://linkedin.com/company/sbsindustrial","https://youtube.com/@sbsindustrial"], contactPoint: { "@type": "ContactPoint", telephone: "+91-1800-XXX-XXXX", contactType: "customer service", areaServed: "IN", availableLanguage: "en" } };
  const website = { "@context": "https://schema.org", "@type": "WebSite", name: "SbS Industrial", url: "https://www.sbsindustrial.com", potentialAction: { "@type": "SearchAction", target: "https://www.sbsindustrial.com/search?q={search_term_string}", "query-input": "required name=search_term_string" } };
  return (
    <html lang="en" className={`${outfit.variable} ${inter.variable} h-full antialiased`}>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(org) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }} />
      </head>
      <body className="min-h-full flex flex-col bg-[#F1F3F6]">
        <LocationProvider><CartProvider><ToastProvider />{children}</CartProvider></LocationProvider>
      </body>
    </html>
  );
}
