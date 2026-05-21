import Link from "next/link";
import { Heart } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getCurrentUser } from "@/lib/session";
import { getUserFavoriteListings } from "@/lib/favorites";
import { ListingGrid } from "@/components/listings/listing-grid";

export const metadata = {
  title: "Favorites",
};

export default async function FavoritesPage() {
  const user = await getCurrentUser();

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-16 flex flex-col items-center text-center gap-4 max-w-md">
        <Heart className="size-12 text-muted-foreground" />
        <h1 className="text-2xl font-semibold">Save your favorite homes</h1>
        <p className="text-muted-foreground">
          Sign in to save listings and come back to them anytime.
        </p>
        <Link href="/login" className={cn(buttonVariants(), "mt-2")}>
          Log in
        </Link>
      </div>
    );
  }

  const listings = await getUserFavoriteListings(user.id);
  const favoriteIds = new Set(listings.map((l) => l.id));

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Heart className="size-7 fill-rose-500 text-rose-500" />
          Your favorites
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          {listings.length} saved {listings.length === 1 ? "listing" : "listings"}
        </p>
      </div>

      {listings.length === 0 ? (
        <div className="border border-dashed rounded-lg p-12 text-center">
          <p className="font-medium">You haven&apos;t saved any listings yet.</p>
          <p className="text-sm text-muted-foreground mt-1 mb-4">
            Tap the heart on any listing to save it here.
          </p>
          <Link href="/listings" className={cn(buttonVariants())}>
            Browse listings
          </Link>
        </div>
      ) : (
        <ListingGrid listings={listings} favoriteIds={favoriteIds} />
      )}
    </div>
  );
}