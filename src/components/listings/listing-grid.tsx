import { ListingCard } from "@/components/listings/listing-card";
import type { Listing, ListingImage } from "@prisma/client";

type ListingWithImage = Listing & { images: ListingImage[] };

export function ListingGrid({
  listings,
  favoriteIds,
}: {
  listings: ListingWithImage[];
  favoriteIds?: Set<string>;
}) {
  if (listings.length === 0) {
    return (
      <div className="border border-dashed rounded-lg p-12 text-center">
        <p className="font-medium">No listings match your search.</p>
        <p className="text-sm text-muted-foreground mt-1">
          Try removing some filters or browsing a different city.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {listings.map((l) => (
        <ListingCard
          key={l.id}
          listing={l}
          isFavorited={favoriteIds?.has(l.id) ?? false}
        />
      ))}
    </div>
  );
}