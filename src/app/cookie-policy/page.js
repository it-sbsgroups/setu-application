import LegalPage from "@/components/pages/LegalPage";
import { LEGAL_PAGES } from "@/lib/data/legal";
import { SITE_URL, SITE_NAME } from "@/lib/seo";

export const metadata = {
  title: "Cookie Policy",
  description: `What cookies ${SITE_NAME} uses and why.`,
  alternates: { canonical: "/cookie-policy" },
  openGraph: { type: "website", url: `${SITE_URL}/cookie-policy` },
};

export default function Page() {
  return <LegalPage page={LEGAL_PAGES["cookie-policy"]} />;
}