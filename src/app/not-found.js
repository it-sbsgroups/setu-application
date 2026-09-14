import Link from "next/link";

export const metadata = { title: "Page Not Found" };

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-screen-2xl flex-col items-center px-4 py-24 text-center">
      <div className="font-display mb-2 flex items-baseline font-black leading-none" style={{ fontSize: 64, letterSpacing: "-0.04em" }}>
        <span style={{ color: "#172554" }}>S</span>
        <span style={{ color: "#84cc16", marginLeft: -9, marginRight: -11, fontSize: 50 }}>b</span>
        <span style={{ color: "#172554" }}>S</span>
      </div>
      <h1 className="font-display mb-2 text-2xl font-black text-gray-900">404 — Page Not Found</h1>
      <p className="mb-8 max-w-sm text-sm text-gray-500">
        The page you&apos;re looking for doesn&apos;t exist or may have been moved. Let&apos;s get you back on track.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <Link href="/" className="rounded-lg bg-primary px-5 py-2.5 text-sm font-bold text-white hover:bg-primarydark">
          Back to Home
        </Link>
        <Link href="/categories" className="rounded-lg border border-gray-200 px-5 py-2.5 text-sm font-bold text-gray-700 hover:bg-gray-50">
          Browse Categories
        </Link>
      </div>
    </div>
  );
}
