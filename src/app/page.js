import Header from "@/components/layout/Header";
import MegaMenu from "@/components/layout/MegaMenu";
import Footer from "@/components/layout/Footer";
import HeroSlider from "@/components/home/HeroSlider";
import TrustBadges from "@/components/home/TrustBadges";
import SectionGrid from "@/components/home/SectionGrid";
import CategorySection from "@/components/home/CategorySection";
import { BrandStrip, MidBanners } from "@/components/home/BrandAndBanners";
import CartDrawer from "@/components/modals/CartDrawer";
import LocationModal from "@/components/modals/LocationModal";
import { SECTIONS, TRENDING, LATEST } from "@/lib/data";

export const metadata = {
  title: "SbS Industrial & B2B Marketplace - Home | 10 Lakh+ Industrial Products",
  description: "Shop power tools, safety & PPE, electrical, hand tools, plumbing, fasteners, abrasives, welding, material handling, IT & office supplies. Same-day dispatch, GST invoice, bulk pricing.",
  openGraph: {
    title: "SbS Industrial & B2B Marketplace",
    description: "India's leading B2B industrial marketplace - 10 lakh+ products, same-day dispatch.",
  }
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#F1F3F6]">
      <Header />
      <MegaMenu />
      <main>
        <HeroSlider />
        <TrustBadges />
        <SectionGrid title="🆕 New Launches & Latest Updates" subtitle="Fresh arrivals from top brands — be the first to order" products={LATEST} />
        <SectionGrid title="🔥 Trending in Your Area" subtitle="Products flying off shelves near you this week" products={TRENDING} dark />
        <MidBanners />
        <BrandStrip />
        {/* 10 Category Sections - component based, reusable */}
        {SECTIONS.map(sec => <CategorySection key={sec.name} section={sec} />)}
      </main>
      <Footer />
      <CartDrawer />
      <LocationModal />
    </div>
  );
}
