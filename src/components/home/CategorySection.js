import Image from "next/image";
import Link from "next/link";
import { wide } from "@/lib/format";
import { slugifyCategory } from "@/lib/data/categories";
import ProductGrid from "@/components/home/ProductGrid";

export default function CategorySection({ section }) {
  const href = `/category/${slugifyCategory(section.name)}`;

  return (
    <section id={`category-${section.name}`} className="mx-auto max-w-screen-2xl px-4 py-6" aria-label={section.name}>
      <Link href={href} className="group relative mb-6 block h-48 cursor-pointer overflow-hidden rounded-xl" style={{ background: section.bg }}>
        <Image
          src={wide(section.img)}
          alt={section.name}
          fill
          sizes="100vw"
          className="object-cover opacity-30 transition-all duration-500 group-hover:scale-105 group-hover:opacity-40"
        />
        <div className="absolute inset-0 flex items-center justify-between p-6 sm:p-8">
          <div>
            <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-white/70">{section.name}</p>
            <h3 className="font-display mb-3 text-2xl font-black text-white sm:text-3xl">{section.tagline}</h3>
            <div className="flex flex-wrap gap-2">
              {section.features.map((feature) => (
                <span key={feature} className="rounded-full bg-white/20 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm">
                  {feature}
                </span>
              ))}
            </div>
          </div>
          <div className="hidden flex-col items-end gap-2 md:flex">
            <span className="rounded-lg bg-white px-5 py-2.5 text-sm font-bold transition-colors group-hover:bg-gray-100" style={{ color: "#FF6B35" }}>
              Shop {section.name} →
            </span>
            <p className="text-xs text-white/60">100+ brands available</p>
          </div>
        </div>
      </Link>

      <ProductGrid title={section.title} subtitle={section.subtitle} products={section.products} viewAllHref={href} />
    </section>
  );
}
