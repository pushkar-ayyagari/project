import { ListingForm } from "@/components/admin/listing-form";
import { createListingAction } from "@/app/admin/listings/actions";

export const metadata = {
  title: "New listing",
};

export default function NewListingPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">New listing</h1>
        <p className="text-sm text-muted-foreground">
          Fill in the details to publish a new property.
        </p>
      </div>
      <ListingForm onSubmit={createListingAction} submitLabel="Create listing" />
    </div>
  );
}