"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

type ProofImage = {
  src: string;
  alt: string;
};

function PhoneFrame({ image, spotlight = false }: { image: ProofImage; spotlight?: boolean }) {
  return (
    <div className="proof-phone-shell">
      <div className="proof-phone-bezel">
        <div className="proof-phone-screen">
          <Image
            src={image.src}
            alt={image.alt}
            width={1290}
            height={2235}
            className={cn("proof-phone-media", spotlight && "proof-phone-media-spotlight")}
            sizes={spotlight ? "min(420px, 70vw)" : "(min-width: 1280px) 15vw, (min-width: 1024px) 16vw, (min-width: 640px) 29vw, 46vw"}
          />
          <div className="proof-phone-overlay" />
          <div className="proof-phone-reflection" />
        </div>
        <span className="proof-phone-notch" />
        <span className="proof-phone-home" />
      </div>
    </div>
  );
}

export function AuthorityProofGallery({ images }: { images: readonly ProofImage[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const activeImage = activeIndex !== null ? images[activeIndex] : null;

  return (
    <>
      <div className={cn("proof-phone-grid mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6 lg:gap-5", activeIndex !== null && "proof-grid-is-open")}>
        {images.map((image, index) => (
          <article key={image.src} className={cn("proof-phone-cell", activeIndex === index && "is-active")}>
            <button
              type="button"
              className="proof-phone-trigger"
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex((current) => (current === index ? null : current))}
              onFocus={() => setActiveIndex(index)}
              onBlur={() => setActiveIndex((current) => (current === index ? null : current))}
              aria-label={`Preview ${image.alt}`}
            >
              <PhoneFrame image={image} />
            </button>
          </article>
        ))}
      </div>

      {activeImage && (
        <>
          <div className="proof-phone-spotlight-backdrop" aria-hidden="true" />
          <div className="proof-phone-spotlight-shell" aria-hidden="true">
            <PhoneFrame image={activeImage} spotlight />
          </div>
        </>
      )}
    </>
  );
}
