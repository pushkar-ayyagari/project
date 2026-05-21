import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ListingForm } from "@/components/admin/listing-form";
import { updateListingAction } from "@/app/admin/listings/actions";
import type { ListingFormValues } from "@/lib/schemas/listing";

export const metadata = {
  title: "Edit listing",
};

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditListingPage({ params }: PageProps) {
  const { id } = await params;
  const listing = await prisma.listing.findUnique({
    where: { id },
    include: { images: { orderBy: { sortOrder: "asc" } } },
  });
  if (!listing) notFound();

  const defaultValues: ListingFormValues = {
    title: listing.title,
    description: listing.description,
    address: listing.address,
    city: listing.city,
    state: listing.state,
    zipCode: listing.zipCode,
    latitude: listing.latitude,
    longitude: listing.longitude,
    price: listing.price,
    bedrooms: listing.bedrooms,
    bathrooms: listing.bathrooms,
    squareFeet: listing.squareFeet,
    propertyType: listing.propertyType,
    listingStatus: listing.listingStatus,
    yearBuilt: listing.yearBuilt,
    lotSize: listing.lotSize,
    images: listing.images.map((i) => ({
      imageUrl: i.imageUrl,
      altText: i.altText ?? undefined,
    })),
  };

  const boundUpdate = updateListingAction.bind(null, id);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Edit listing</h1>
        <p className="text-sm text-muted-foreground">
          Update the details for <span className="font-medium">{listing.title}</span>.
        </p>
      </div>
      <ListingForm
        defaultValues={defaultValues}
        onSubmit={boundUpdate}
        submitLabel="Save changes"
      />
    </div>
  );
}