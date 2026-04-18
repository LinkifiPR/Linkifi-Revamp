import Image from "next/image";

type ProofImage = {
  src: string;
  alt: string;
};

function PhoneFrame({ image }: { image: ProofImage }) {
  return (
    <div className="proof-phone-shell">
      <div className="proof-phone-bezel">
        <div className="proof-phone-screen">
          <Image
            src={image.src}
            alt={image.alt}
            width={1290}
            height={2235}
            className="proof-phone-media"
            sizes="(min-width: 1280px) 15vw, (min-width: 1024px) 16vw, (min-width: 640px) 29vw, 46vw"
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
  return (
    <div className="proof-phone-grid mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6 lg:gap-5">
      {images.map((image) => (
        <article key={image.src} className="proof-phone-cell">
          <PhoneFrame image={image} />
        </article>
      ))}
    </div>
  );
}
