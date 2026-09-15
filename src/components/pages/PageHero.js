import Link from "next/link";

/**
 * Reusable hero for inner pages. Keeps every page below consistent with
 * the navy → navy-light gradient used across the storefront.
 */
export default function PageHero({
  eyebrow,
  title,
  subtitle,
  breadcrumbs,
  children,
}) {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg,#1B2B4B 0%,#2A4070 100%)",
      }}
    >
      <div className="mx-auto max-w-screen-2xl px-4 py-10 sm:py-14 lg:py-16">
        {breadcrumbs && (
          <nav
            aria-label="Breadcrumb"
            className="mb-4 flex flex-wrap items-center gap-1 text-xs text-gray-400"
          >
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            {breadcrumbs.map((b) => (
              <span key={b.label} className="flex items-center gap-1">
                <span aria-hidden="true">/</span>
                {b.href ? (
                  <Link href={b.href} className="hover:text-white">
                    {b.label}
                  </Link>
                ) : (
                  <span className="text-gray-300">{b.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}

        {eyebrow && (
          <p className="mb-2 text-xs font-bold uppercase tracking-widest text-orange-400">
            {eyebrow}
          </p>
        )}
        <h1 className="font-display text-3xl font-black leading-tight text-white sm:text-4xl lg:text-5xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-gray-300 sm:text-base">
            {subtitle}
          </p>
        )}
        {children}
      </div>
    </section>
  );
}