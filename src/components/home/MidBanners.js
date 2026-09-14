import Image from "next/image";
import { wide, PHOTO } from "@/lib/format";

const BANNERS = [
  { bg: "linear-gradient(135deg,#92400E,#B45309)", img: wide(PHOTO.drill), title: "Bulk Orders?", sub: "Save up to 30% on bulk purchases", cta: "Get Quote" },
  { bg: "linear-gradient(135deg,#1E3A5F,#2563EB)", img: wide(PHOTO.safety), title: "Credit for Business", sub: "30-day credit terms for verified businesses", cta: "Apply Now" },
  { bg: "linear-gradient(135deg,#065F46,#059669)", img: wide(PHOTO.weld), title: "Same-Day Delivery", sub: "Order before 2 PM for same-day delivery", cta: "Shop Fast" },
];

export default function MidBanners() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {BANNERS.map((banner) => (
        <div key={banner.title} className="group relative h-32 cursor-pointer overflow-hidden rounded-xl" style={{ background: banner.bg }}>
          <Image
            src={banner.img}
            alt={banner.title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover opacity-25 transition-all duration-500 group-hover:scale-105 group-hover:opacity-35"
          />
          <div className="absolute inset-0 flex flex-col justify-between p-4">
            <div>
              <h4 className="font-display text-base font-black text-white">{banner.title}</h4>
              <p className="mt-0.5 text-xs text-white/70">{banner.sub}</p>
            </div>
            <button type="button" className="self-start rounded-lg bg-white/20 px-3 py-1 text-xs font-bold text-white backdrop-blur-sm transition-colors hover:bg-white/30">
              {banner.cta} →
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
