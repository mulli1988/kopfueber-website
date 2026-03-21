"use client";

import { useState } from "react";
import Image from "next/image";

interface Props {
  images: string[];
  title: string;
  videoUrl?: string;
}

export default function ProductImageGallery({ images, title, videoUrl }: Props) {
  // -1 = Video aktiv, 0+ = Bild-Index
  const [active, setActive] = useState(videoUrl ? -1 : 0);
  const [lightbox, setLightbox] = useState(false);

  const showVideo = active === -1 && !!videoUrl;

  if (images.length === 0 && !videoUrl) {
    return (
      <div className="relative aspect-square w-full bg-muted border-2 border-dark rounded-[var(--radius-xl)] overflow-hidden flex items-center justify-center text-8xl">
        🖼
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {/* Hauptanzeige */}
      <div
        className={`relative aspect-square w-full bg-muted border-2 border-dark rounded-[var(--radius-xl)] overflow-hidden ${!showVideo ? "cursor-zoom-in" : ""}`}
        onClick={() => { if (!showVideo) setLightbox(true); }}
      >
        {showVideo ? (
          <video src={videoUrl} controls className="w-full h-full object-contain" />
        ) : (
          <>
            <Image
              src={images[active]}
              alt={title}
              fill
              className="object-cover transition-opacity duration-200"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
            <div className="absolute bottom-3 right-3 bg-black/40 text-white text-xs px-2 py-1 rounded-full">
              Vergrößern
            </div>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {(images.length > 1 || (images.length > 0 && videoUrl)) && (
        <div className="grid grid-cols-5 gap-2">
          {/* Video-Thumbnail */}
          {videoUrl && (
            <button
              onClick={() => setActive(-1)}
              className={`relative aspect-square rounded-[var(--radius-md)] overflow-hidden border-2 transition-all flex items-center justify-center bg-muted ${
                active === -1 ? "border-primary scale-105" : "border-dark opacity-70 hover:opacity-100 hover:border-primary"
              }`}
            >
              <span className="text-2xl">▶</span>
            </button>
          )}
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`relative aspect-square rounded-[var(--radius-md)] overflow-hidden border-2 transition-all ${
                active === i
                  ? "border-primary scale-105"
                  : "border-dark opacity-70 hover:opacity-100 hover:border-primary"
              }`}
            >
              <Image src={img} alt={`${title} ${i + 1}`} fill className="object-cover" sizes="20vw" />
            </button>
          ))}
        </div>
      )}

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4"
          onClick={() => setLightbox(false)}
        >
          <div className="relative max-w-4xl max-h-[90vh] w-full h-full" onClick={(e) => e.stopPropagation()}>
            <Image
              src={images[active]}
              alt={title}
              fill
              className="object-contain"
              sizes="100vw"
            />
          </div>
          <button
            onClick={() => setLightbox(false)}
            className="absolute top-4 right-4 text-white text-3xl font-bold leading-none hover:opacity-70"
          >
            ×
          </button>
          {images.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); setActive((active - 1 + images.length) % images.length); }}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-4xl font-bold hover:opacity-70"
              >
                ‹
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); setActive((active + 1) % images.length); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-4xl font-bold hover:opacity-70"
              >
                ›
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
