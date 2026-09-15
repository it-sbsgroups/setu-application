import { Outfit, Inter } from "next/font/google";
import Header from "@/components/layout/Header";
import CategoryNav from "@/components/layout/CategoryNav";
import Footer from "@/components/layout/Footer";
import AppProviders from "@/providers/AppProviders";
import { SITE_URL, SITE_NAME, SITE_TITLE, SITE_DESCRIPTION, SITE_KEYWORDS, TWITTER_HANDLE } from "@/lib/seo";
import "./globals.css";

// next/font self-hosts + subsets Google Fonts at build time — no render-blocking
// <link> to fonts.googleapis.com like the original static page had.
const outfit = { variable: "--font-outfit" };
const inter = { variable: "--font-inter" };

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: SITE_KEYWORDS,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME }],
  generator: "Next.js",
  referrer: "origin-when-cross-origin",
  category: "shopping",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: SITE_NAME,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: TWITTER_HANDLE,
    creator: TWITTER_HANDLE,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/opengraph-image"],
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport = {
  themeColor: "#1b2b4b",
  width: "device-width",
  initialScale: 1,
};

/** Organization + WebSite JSON-LD so search engines understand the brand and can show a sitelinks searchbox. */
function StructuredData() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: SITE_NAME,
        url: SITE_URL,
        logo: `${SITE_URL}/favicon.ico`,
        description: SITE_DESCRIPTION,
        sameAs: [
          "https://facebook.com/sbsindustrial",
          "https://instagram.com/sbsindustrial",
          "https://x.com/sbsindustrial",
          "https://linkedin.com/company/sbsindustrial",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        publisher: { "@id": `${SITE_URL}/#organization` },
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export default function RootLayout({ children }) {
  return (
    <html lang="en-IN" className={`${outfit.variable} ${inter.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-page font-body text-gray-800">
        <StructuredData />
        <AppProviders>
          <Header />
          <CategoryNav />
          <main className="flex-1">{children}</main>
          <Footer />
        </AppProviders>
      </body>
    </html>
  );
}
