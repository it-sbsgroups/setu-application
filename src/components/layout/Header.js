import Link from "next/link";
import Ticker from "@/components/layout/Ticker";
import Logo from "@/components/layout/Logo";
import LocationButton from "@/components/layout/LocationButton";
import SearchBar from "@/components/layout/SearchBar";
import HeaderActions from "@/components/layout/HeaderActions";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 bg-navy shadow-md">
      <Ticker />

      {/* ── Desktop (lg+) : single row ─────────────────────── */}
      <div className="mx-auto hidden max-w-screen-2xl items-center gap-3 px-4 py-2.5 lg:flex">
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <Logo />
          <span className="hidden text-xs xl:block" style={{ color: "#FF6B35" }}>
            Industrial &amp; B2B
          </span>
        </Link>
        <LocationButton />
        <SearchBar />
        <HeaderActions />
      </div>

      {/* ── Mobile / tablet : two rows ─────────────────────── */}
      <div className="mx-auto max-w-screen-2xl px-3 pb-2 pt-2 lg:hidden">
        <div className="flex items-center justify-between gap-2">
          <Link href="/" className="flex shrink-0 items-center">
            <Logo size={24} />
          </Link>
          <HeaderActions compact />
        </div>
        <div className="mt-2">
          <SearchBar compact />
        </div>
      </div>
    </header>
  );
}