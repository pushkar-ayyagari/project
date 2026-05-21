import { Suspense } from "react";
import { getListings, parseFiltersFromSearchParams } from "@/lib/listings";
import { getUserFavoriteIds } from "@/lib/favorites";
import { getCurrentUser } from "@/lib/session";
import { ListingGrid } from "@/components/listings/listing-grid";
import { FilterSidebar } from "@/components/listings/filter-sidebar";
import { SortSelect } from "@/components/listings/sort-select";
import { SearchBar } from "@/components/listings/search-bar";

export const metadata = {
  title: "Browse listings",
};

type PageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function ListingsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const filters = parseFiltersFromSearchParams(params);
  const [listings, user] = await Promise.all([getListings(filters), getCurrentUser()]);
  const favoriteIds = user ? await getUserFavoriteIds(user.id) : undefined;

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold">Browse listings</h1>
        <Suspense fallback={<div className="h-12 rounded-full border" />}>
          <SearchBar />
        </Suspense>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-6">
        <Suspense fallback={<div className="h-96 border rounded-lg" />}>
          <FilterSidebar />
        </Suspense>

        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {listings.length} {listings.length === 1 ? "result" : "results"}
            </p>
            <Suspense fallback={null}>
              <SortSelect />
            </Suspense>
          </div>
          <ListingGrid listings={listings} favoriteIds={favoriteIds} />
        </div>
      </div>
    </div>
  );
}