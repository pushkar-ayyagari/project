import Link from "next/link";
import { Search, MapPin, Home as HomeIcon, Building2 } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ListingCard } from "@/components/listings/listing-card";
import { getFeaturedListings } from "@/lib/listings";
import { getCurrentUser } from "@/lib/session";
import { getUserFavoriteIds } from "@/lib/favorites";

export default async function HomePage() {
  const [featured, user] = await Promise.all([
    getFeaturedListings(6),
    getCurrentUser(),
  ]);
  const favoriteIds = user ? await getUserFavoriteIds(user.id) : undefined;

  return (
    <div className="flex-1 flex flex-col">
      <section className="relative border-b">
        <div className="container mx-auto px-4 py-20 md:py-28 flex flex-col items-center text-center gap-6">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight max-w-3xl">
            Find your next place to call home.
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
            Browse thousands of homes, apartments, and condos for sale or rent.
            Save your favorites and connect with sellers directly.
          </p>

          <form
            action="/listings"
            method="GET"
            className="mt-4 w-full max-w-2xl flex items-center gap-2 rounded-full border bg-background pl-4 pr-2 py-2 shadow-sm"
          >
            <Search className="size-5 text-muted-foreground shrink-0" />
            <input
              type="text"
              name="q"
              placeholder="City, neighborhood, or ZIP code"
              className="flex-1 bg-transparent outline-none text-sm md:text-base placeholder:text-muted-foreground"
            />
            <button
              type="submit"
              className={cn(buttonVariants(), "rounded-full")}
            >
              Search
            </button>
          </form>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Popular:</span>
            <Link href="/listings?q=Austin" className="underline-offset-4 hover:underline">
              Austin
            </Link>
            <span>·</span>
            <Link href="/listings?q=Seattle" className="underline-offset-4 hover:underline">
              Seattle
            </Link>
            <span>·</span>
            <Link href="/listings?q=Brooklyn" className="underline-offset-4 hover:underline">
              Brooklyn
            </Link>
          </div>
        </div>
      </section>

      {featured.length > 0 && (
        <section className="container mx-auto px-4 py-12 md:py-16">
          <div className="flex items-end justify-between mb-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">Featured listings</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Recently added homes and rentals.
              </p>
            </div>
            <Link
              href="/listings"
              className="text-sm font-medium hover:underline underline-offset-4"
            >
              View all →
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((l) => (
              <ListingCard
                key={l.id}
                listing={l}
                isFavorited={favoriteIds?.has(l.id) ?? false}
              />
            ))}
          </div>
        </section>
      )}

      <section className="container mx-auto px-4 py-12 md:py-16 border-t">
        <div className="grid gap-4 md:grid-cols-3">
          <FeatureCard
            icon={<HomeIcon className="size-6" />}
            title="Curated listings"
            body="Every listing is verified with detailed photos, location, and pricing info."
          />
          <FeatureCard
            icon={<MapPin className="size-6" />}
            title="Map-first search"
            body="See exactly where every property sits. Filter by city, ZIP, or address."
          />
          <FeatureCard
            icon={<Building2 className="size-6" />}
            title="From condos to land"
            body="House, apartment, condo, townhouse, land, commercial — find every property type."
          />
        </div>

        <div className="mt-12 flex justify-center">
          <Link href="/listings" className={cn(buttonVariants({ size: "lg" }))}>
            Browse all listings
          </Link>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  body,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
}) {
  return (
    <div className="border rounded-lg p-6 flex flex-col gap-3 bg-card">
      <div className="size-10 rounded-md bg-primary/10 text-primary flex items-center justify-center">
        {icon}
      </div>
      <h3 className="font-semibold text-lg">{title}</h3>
      <p className="text-sm text-muted-foreground">{body}</p>
    </div>
  );
}