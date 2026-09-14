import Hero from "@/components/home/Hero";
import TrustBadges from "@/components/home/TrustBadges";
import ProductGrid from "@/components/home/ProductGrid";
import MidBanners from "@/components/home/MidBanners";
import BrandStrip from "@/components/home/BrandStrip";
import CategorySection from "@/components/home/CategorySection";
import HomeBottomSection from "@/components/home/bottom/HomeBottomSection"; // ← NEW
import { SECTIONS, TRENDING, LATEST } from "@/lib/data/products";

export default function HomePage() {
  return (
    <>
      <div className="mx-auto max-w-screen-2xl space-y-6 px-4 py-6">
        <Hero />
        <TrustBadges />

        <ProductGrid eyebrow="JUST LANDED" title="🆕 New Launches" subtitle="Fresh stock from top industrial brands, added this week" products={LATEST} viewAllHref="/new-arrivals" />

        <div className="rounded-xl p-5" style={{ background: "linear-gradient(135deg,#1B2B4B 0%,#2A4070 100%)" }}>
          <ProductGrid eyebrow="TRENDING NOW" title="🔥 Trending in Your Area" subtitle="What businesses near you are buying the most" products={TRENDING} dark accentClassName="text-orange-400" viewAllHref="/deals" />
        </div>

        <MidBanners />
        <BrandStrip />
      </div>

      {SECTIONS.map((section) => (
        <CategorySection key={section.name} section={section} />
      ))}
      <HomeBottomSection />
    </>
  );
}
