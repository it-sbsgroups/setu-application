import LegalPage from "@/components/pages/LegalPage";
import { LEGAL_PAGES } from "@/lib/data/legal";
import { SITE_URL, SITE_NAME } from "@/lib/seo";

export const metadata = {
  title: "Terms of Use",
  description: `The rules that govern your use of the ${SITE_NAME} platform.`,
  alternates: { canonical: "/terms-of-use" },
  openGraph: { type: "website", url: `${SITE_URL}/terms-of-use` },
};

export default function Page() {
  return <LegalPage page={LEGAL_PAGES["terms-of-use"]} />;
}