import { notFound } from "next/navigation";
import { BedDouble, Bath, Ruler, MapPin, Calendar, Building, Trees } from "lucide-react";
import { getListingById } from "@/lib/listings";
import { getCurrentUser } from "@/lib/session";
import { getUserFavoriteIds } from "@/lib/favorites";
import { PropertyImageGallery } from "@/components/listings/property-image-gallery";
import { PropertyMap } from "@/components/listings/property-map";
import { StatusBadge } from "@/components/listings/status-badge";
import { FavoriteButton } from "@/components/favorites/favorite-button";
import { InquiryForm } from "@/components/inquiries/inquiry-form";
import {
  formatPrice,
  formatBeds,
  formatBaths,
  formatSqft,
  formatPropertyType,
} from "@/lib/format";
import { Separator } from "@/components/ui/separator";
import type { Metadata } from "next";

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const listing = await getListingById(id);
  if (!listing) return { title: "Listing not found" };
  return {
    title: listing.title,
    description: listing.description.slice(0, 160),
  };
}

export default async function ListingDetailPage({ params }: PageProps) {
  const { id } = await params;
  const [listing, user] = await Promise.all([getListingById(id), getCurrentUser()]);
  if (!listing) notFound();

  const favoriteIds = user ? await getUserFavoriteIds(user.id) : new Set<string>();
  const isFavorited = favoriteIds.has(listing.id);

  return (
    <article className="container mx-auto px-4 py-8 flex flex-col gap-8 max-w-6xl">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <StatusBadge status={listing.listingStatus} />
          <span className="text-sm text-muted-foreground">
            {formatPropertyType(listing.propertyType)}
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{listing.title}</h1>
        <p className="text-muted-foreground flex items-center gap-1.5">
          <MapPin className="size-4" />
          {listing.address}, {listing.city}, {listing.state} {listing.zipCode}
        </p>
        <p className="text-3xl font-bold">
          {formatPrice(listing.price, listing.listingStatus)}
        </p>
      </header>

      <PropertyImageGallery images={listing.images} title={listing.title} />

      <div className="grid md:grid-cols-[1fr_320px] gap-8">
        <div className="space-y-6">
          <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Stat icon={<BedDouble className="size-5" />} label="Bedrooms" value={formatBeds(listing.bedrooms)} />
            <Stat icon={<Bath className="size-5" />} label="Bathrooms" value={formatBaths(listing.bathrooms)} />
            <Stat icon={<Ruler className="size-5" />} label="Size" value={formatSqft(listing.squareFeet)} />
            <Stat
              icon={<Calendar className="size-5" />}
              label="Year built"
              value={listing.yearBuilt ? String(listing.yearBuilt) : "—"}
            />
          </section>

          <Separator />

          <section className="space-y-2">
            <h2 className="text-xl font-semibold">About this property</h2>
            <p className="text-muted-foreground whitespace-pre-line leading-relaxed">
              {listing.description}
            </p>
          </section>

          <Separator />

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">Property details</h2>
            <dl className="grid grid-cols-2 sm:grid-cols-3 gap-y-3 gap-x-6 text-sm">
              <Detail icon={<Building className="size-4" />} label="Type" value={formatPropertyType(listing.propertyType)} />
              <Detail
                icon={<Trees className="size-4" />}
                label="Lot size"
                value={listing.lotSize ? `${listing.lotSize.toLocaleString()} sqft` : "—"}
              />
              <Detail icon={<MapPin className="size-4" />} label="ZIP" value={listing.zipCode} />
            </dl>
          </section>

          {listing.latitude !== null && listing.longitude !== null && (
            <>
              <Separator />
              <section className="space-y-3">
                <h2 className="text-xl font-semibold">Location</h2>
                <PropertyMap
                  latitude={listing.latitude}
                  longitude={listing.longitude}
                  popup={`${listing.address}, ${listing.city}`}
                />
              </section>
            </>
          )}
        </div>

        <aside className="md:sticky md:top-20 h-fit border rounded-lg p-5 space-y-4 bg-card">
          <div>
            <p className="text-sm text-muted-foreground">Price</p>
            <p className="text-2xl font-semibold">
              {formatPrice(listing.price, listing.listingStatus)}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <FavoriteButton
              listingId={listing.id}
              initialFavorited={isFavorited}
              variant="full"
            />
          </div>

          <Separator />

          <div className="space-y-3">
            <h3 className="font-semibold">Contact about this property</h3>
            <InquiryForm
              listingId={listing.id}
              defaultName={user?.name ?? undefined}
              defaultEmail={user?.email ?? undefined}
            />
          </div>
        </aside>
      </div>
    </article>
  );
}

function Stat({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="border rounded-lg p-4">
      <div className="flex items-center gap-2 text-muted-foreground text-sm">
        {icon}
        {label}
      </div>
      <p className="mt-1 font-semibold text-lg">{value}</p>
    </div>
  );
}

function Detail({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div>
      <dt className="flex items-center gap-1.5 text-muted-foreground text-xs uppercase tracking-wide">
        {icon}
        {label}
      </dt>
      <dd className="mt-0.5 font-medium">{value}</dd>
    </div>
  );
}