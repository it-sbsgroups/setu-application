import Link from "next/link";
import PageHero from "@/components/pages/PageHero";

export default function LegalPage({ page }) {
  return (
    <>
      <PageHero
        eyebrow={page.eyebrow}
        title={page.title}
        subtitle={page.subtitle}
        breadcrumbs={[{ label: page.title }]}
      />

      <div className="mx-auto max-w-4xl px-4 py-12">
        <p className="mb-8 text-xs font-medium uppercase tracking-wider text-gray-400">
          Last updated:{" "}
          {new Date(page.updated).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>

        <div className="space-y-8">
          {page.sections.map((section, i) => (
            <section
              key={i}
              className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6"
            >
              <h2 className="font-display mb-3 text-lg font-black text-gray-900 sm:text-xl">
                {section.heading}
              </h2>
              <div className="space-y-3 text-sm leading-relaxed text-gray-600">
                {section.body.map((p, j) => (
                  <p key={j}>{p}</p>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-10 rounded-xl border border-orange-100 bg-orange-50/60 p-5 text-center text-sm text-gray-700">
          Questions? Email{" "}
          <a
            href="mailto:legal@sbsindustrial.in"
            className="font-semibold text-primary hover:underline"
          >
            legal@sbsindustrial.in
          </a>{" "}
          or visit our{" "}
          <Link href="/contact" className="font-semibold text-primary hover:underline">
            Contact page
          </Link>
          .
        </div>
      </div>
    </>
  );
}