import LegalPage from "@/components/pages/LegalPage";
import { LEGAL_PAGES } from "@/lib/data/legal";
import { SITE_URL, SITE_NAME } from "@/lib/seo";

export const metadata = {
  title: "Privacy Policy",
  description: `How ${SITE_NAME} collects, uses and protects your data.`,
  alternates: { canonical: "/privacy-policy" },
  openGraph: { type: "website", url: `${SITE_URL}/privacy-policy` },
};

export default function Page() {
  return <LegalPage page={LEGAL_PAGES["privacy-policy"]} />;
}