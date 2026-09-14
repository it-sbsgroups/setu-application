import AboutSection from "@/components/home/bottom/AboutSection";
import PopularSearches from "@/components/home/bottom/PopularSearches";
import KeyValues from "@/components/home/bottom/KeyValues";

/**
 * Moglix-style bottom-of-homepage block: brand story → discoverable links →
 * trust values. Sits directly above the site footer. Two of the three child
 * sections are pure Server Components (0 JS), the third is a tiny tab widget.
 */
export default function HomeBottomSection() {
  return (
    <section
      aria-label="About SbS and popular searches"
      className="mx-auto max-w-screen-2xl space-y-6 px-4 py-6"
    >
      <AboutSection />
      <PopularSearches />
      <KeyValues />
    </section>
  );
}