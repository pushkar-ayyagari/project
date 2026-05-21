import Image from "next/image";
import Link from "next/link";
import { BedDouble, Bath, Ruler, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { StatusBadge } from "@/components/listings/status-badge";
import { FavoriteButton } from "@/components/favorites/favorite-button";
import {
  formatPrice,
  formatBeds,
  formatBaths,
  formatSqft,
} from "@/lib/format";
import type { Listing, ListingImage } from "@prisma/client";

type ListingWithImage = Listing & { images: ListingImage[] };

export function ListingCard({
  listing,
  isFavorited = false,
}: {
  listing: ListingWithImage;
  isFavorited?: boolean;
}) {
  const cover = listing.images[0];

  return (
    <div className="group relative h-full">
      <Link href={`/listings/${listing.id}`} className="block h-full">
        <Card className="overflow-hidden h-full p-0 gap-0">
          <div className="relative aspect-[4/3] bg-muted">
            {cover ? (
              <Image
                src={cover.imageUrl}
                alt={cover.altText ?? listing.title}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform group-hover:scale-105"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-muted-foreground text-sm">
                No photo
              </div>
            )}
            <div className="absolute top-3 left-3 z-10">
              <StatusBadge status={listing.listingStatus} />
            </div>
          </div>

          <CardContent className="p-4 flex flex-col gap-2">
            <div className="flex items-start justify-between gap-2">
              <p className="text-lg font-semibold leading-tight">
                {formatPrice(listing.price, listing.listingStatus)}
              </p>
            </div>

            <h3 className="font-medium leading-tight line-clamp-1">
              {listing.title}
            </h3>

            <p className="text-sm text-muted-foreground flex items-center gap-1 line-clamp-1">
              <MapPin className="size-3.5 shrink-0" />
              {listing.address}, {listing.city}, {listing.state}
            </p>

            <div className="mt-1 flex items-center gap-3 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <BedDouble className="size-4" />
                {formatBeds(listing.bedrooms)}
              </span>
              <span className="flex items-center gap-1">
                <Bath className="size-4" />
                {formatBaths(listing.bathrooms)}
              </span>
              <span className="flex items-center gap-1">
                <Ruler className="size-4" />
                {formatSqft(listing.squareFeet)}
              </span>
            </div>
          </CardContent>
        </Card>
      </Link>

      <FavoriteButton listingId={listing.id} initialFavorited={isFavorited} />
    </div>
  );
}