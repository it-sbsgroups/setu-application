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
      <div className="mx-auto flex max-w-screen-2xl items-center gap-3 px-4 py-2.5">
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <Logo />
          <span className="hidden text-xs sm:block" style={{ color: "#FF6B35" }}>
            Industrial &amp; B2B
          </span>
        </Link>

        <LocationButton />
        <SearchBar />
        <HeaderActions />
      </div>
    </header>
  );
}
