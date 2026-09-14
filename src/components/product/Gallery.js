"use client";

import { useState } from "react";
import Image from "next/image";

export default function Gallery({ images, alt, badge }) {
  const [active, setActive] = useState(0);

  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <div className="order-2 flex gap-2 overflow-x-auto sm:order-1 sm:w-16 sm:flex-col sm:overflow-visible">
        {images.map((src, i) => (
          <button
            key={src + i}
            type="button"
            onClick={() => setActive(i)}
            aria-label={`View image ${i + 1}`}
            className={`relative h-14 w-14 shrink-0 overflow-hidden rounded-lg border transition-colors ${
              active === i ? "border-primary" : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <Image src={src} alt="" fill sizes="56px" className="object-cover" />
          </button>
        ))}
      </div>

      <div className="relative order-1 aspect-square flex-1 overflow-hidden rounded-xl border border-gray-100 bg-white sm:order-2">
        <Image
          key={images[active]}
          src={images[active]}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 480px"
          priority
          className="object-contain p-4"
        />
        {badge && (
          <span
            className="absolute left-3 top-3 rounded px-2 py-1 text-xs font-semibold text-white"
            style={{ background: "#FF6B35" }}
          >
            {badge}
          </span>
        )}
      </div>
    </div>
  );
}
