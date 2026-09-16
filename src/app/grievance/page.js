import LegalPage from "@/components/pages/LegalPage";
import { LEGAL_PAGES } from "@/lib/data/legal";
import { SITE_URL, SITE_NAME } from "@/lib/seo";

export const metadata = {
  title: "Grievance Officer",
  description: `Grievance redressal contact and timelines for ${SITE_NAME}, as required under Indian e-commerce rules.`,
  alternates: { canonical: "/grievance" },
  openGraph: { type: "website", url: `${SITE_URL}/grievance` },
};

export default function Page() {
  return <LegalPage page={LEGAL_PAGES.grievance} />;
}