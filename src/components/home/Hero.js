"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { HERO_SLIDES } from "@/lib/data/products";
import { thumb, PHOTO } from "@/lib/format";
import { ChevronLeftIcon, ChevronRightIcon } from "@/components/ui/Icons";

const AUTO_ROTATE_MS = 5000;

const SIDE_PROMOS = [
  { gradient: "linear-gradient(135deg,#7C3AED 0%,#4F46E5 100%)", img: thumb(PHOTO.safety), badge: "FLAT 30% OFF", title: "PPE Safety Gear", cta: "Shop Now →" },
  { gradient: "linear-gradient(135deg,#0F766E 0%,#0D9488 100%)", img: thumb(PHOTO.tool3), badge: "NEW ARRIVALS", title: "Hand Tools 2024", cta: "Explore →" },
];

export default function Hero() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const id = setInterval(() => goTo(index + 1), AUTO_ROTATE_MS);
    return () => clearInterval(id);
  }, [index]);

  function goTo(nextIndex) {
    const wrapped = (nextIndex + HERO_SLIDES.length) % HERO_SLIDES.length;
    setVisible(false);
    setTimeout(() => {
      setIndex(wrapped);
      setVisible(true);
    }, 250);
  }

  const slide = HERO_SLIDES[index];

  return (
    <div className="flex gap-4">
      <div
        className="relative h-72 flex-1 overflow-hidden rounded-xl transition-all duration-700"
        style={{ background: slide.bg }}
      >
        <div className={`absolute inset-0 flex items-center transition-opacity duration-300 ${visible ? "opacity-100" : "opacity-0"}`}>
          <div className="z-10 flex-1 p-6 sm:p-8">
            <span className="mb-3 inline-block rounded-full px-2.5 py-1 text-xs font-bold text-white" style={{ background: "#FF6B35" }}>
              {slide.badge}
            </span>
            <h2 className="font-display mb-2 text-2xl font-black leading-tight text-white sm:text-3xl">{slide.title}</h2>
            <p className="mb-5 max-w-xs text-sm text-white/80">{slide.sub}</p>
            <button type="button" className="rounded-lg px-6 py-2.5 text-sm font-bold text-white transition-transform hover:scale-105 active:scale-95" style={{ background: "#FF6B35" }}>
              {slide.cta} →
            </button>
          </div>
          <div className="relative hidden h-full w-64 overflow-hidden opacity-90 sm:block">
            <Image src={slide.img} alt={slide.title} fill sizes="256px" className="object-cover" />
            <div className="absolute inset-0" style={{ background: `linear-gradient(to right, ${slide.base} 0%, transparent 100%)` }} />
          </div>
        </div>

        <button
          type="button"
          aria-label="Previous slide"
          onClick={() => goTo(index - 1)}
          className="absolute left-3 top-1/2 z-20 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition-colors hover:bg-white/40"
        >
          <ChevronLeftIcon />
        </button>
        <button
          type="button"
          aria-label="Next slide"
          onClick={() => goTo(index + 1)}
          className="absolute right-3 top-1/2 z-20 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition-colors hover:bg-white/40"
        >
          <ChevronRightIcon />
        </button>

        <div className="absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 gap-1.5">
          {HERO_SLIDES.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => goTo(i)}
              className={`rounded-full transition-all ${i === index ? "h-1.5 w-6 bg-white" : "h-1.5 w-1.5 bg-white/50"}`}
            />
          ))}
        </div>
      </div>

      <div className="hidden w-56 flex-col gap-3 lg:flex">
        {SIDE_PROMOS.map((promo) => (
          <div key={promo.title} className="group relative flex-1 cursor-pointer overflow-hidden rounded-xl" style={{ background: promo.gradient }}>
            <Image src={promo.img} alt={promo.title} fill sizes="224px" className="object-cover opacity-60 transition-opacity group-hover:opacity-70" />
            <div className="absolute inset-0 flex flex-col justify-end p-3">
              <div className="mb-0.5 text-xs font-bold text-yellow-300">{promo.badge}</div>
              <div className="font-display text-sm font-black leading-tight text-white">{promo.title}</div>
              <div className="mt-0.5 text-xs text-white/70">{promo.cta}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
