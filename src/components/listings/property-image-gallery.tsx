"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";
import type { ListingImage } from "@prisma/client";

export function PropertyImageGallery({
  images,
  title,
}: {
  images: ListingImage[];
  title: string;
}) {
  const [activeIdx, setActiveIdx] = useState(0);

  if (images.length === 0) {
    return (
      <div className="aspect-[16/9] rounded-lg bg-muted flex items-center justify-center text-muted-foreground">
        No photos available
      </div>
    );
  }

  const active = images[activeIdx];

  return (
    <div className="space-y-3">
      <div className="relative aspect-[16/9] rounded-lg overflow-hidden bg-muted">
        <Image
          src={active.imageUrl}
          alt={active.altText ?? title}
          fill
          sizes="(min-width: 1024px) 66vw, 100vw"
          priority
          className="object-cover"
        />
      </div>

      {images.length > 1 && (
        <div className="grid grid-cols-5 gap-2">
          {images.map((img, i) => (
            <button
              key={img.id}
              type="button"
              onClick={() => setActiveIdx(i)}
              className={cn(
                "relative aspect-[4/3] rounded-md overflow-hidden bg-muted ring-offset-2 transition",
                i === activeIdx ? "ring-2 ring-primary" : "opacity-80 hover:opacity-100"
              )}
              aria-label={`Show photo ${i + 1}`}
            >
              <Image
                src={img.imageUrl}
                alt={img.altText ?? `${title} – photo ${i + 1}`}
                fill
                sizes="200px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}