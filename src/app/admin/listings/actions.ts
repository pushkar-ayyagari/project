"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/session";
import { listingFormSchema, type ListingFormValues } from "@/lib/schemas/listing";

export type ListingActionResult =
  | { ok: true; id: string }
  | { ok: false; error: string };

export async function createListingAction(
  values: ListingFormValues
): Promise<ListingActionResult> {
  const admin = await requireAdmin();
  const parsed = listingFormSchema.safeParse(values);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }
  const data = parsed.data;

  const created = await prisma.listing.create({
    data: {
      ...data,
      createdById: admin.id,
      images: {
        create: data.images.map((img, i) => ({
          imageUrl: img.imageUrl,
          altText: img.altText,
          sortOrder: i,
        })),
      },
    },
  });

  revalidatePath("/admin/listings");
  revalidatePath("/listings");
  return { ok: true, id: created.id };
}

export async function updateListingAction(
  id: string,
  values: ListingFormValues
): Promise<ListingActionResult> {
  await requireAdmin();
  const parsed = listingFormSchema.safeParse(values);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }
  const data = parsed.data;

  await prisma.$transaction(async (tx) => {
    await tx.listing.update({
      where: { id },
      data: {
        title: data.title,
        description: data.description,
        address: data.address,
        city: data.city,
        state: data.state,
        zipCode: data.zipCode,
        latitude: data.latitude,
        longitude: data.longitude,
        price: data.price,
        bedrooms: data.bedrooms,
        bathrooms: data.bathrooms,
        squareFeet: data.squareFeet,
        propertyType: data.propertyType,
        listingStatus: data.listingStatus,
        yearBuilt: data.yearBuilt,
        lotSize: data.lotSize,
      },
    });

    await tx.listingImage.deleteMany({ where: { listingId: id } });
    if (data.images.length > 0) {
      await tx.listingImage.createMany({
        data: data.images.map((img, i) => ({
          listingId: id,
          imageUrl: img.imageUrl,
          altText: img.altText,
          sortOrder: i,
        })),
      });
    }
  });

  revalidatePath("/admin/listings");
  revalidatePath(`/admin/listings/${id}/edit`);
  revalidatePath(`/listings/${id}`);
  revalidatePath("/listings");
  return { ok: true, id };
}

export async function deleteListingAction(id: string) {
  await requireAdmin();
  await prisma.listing.delete({ where: { id } });
  revalidatePath("/admin/listings");
  revalidatePath("/listings");
  redirect("/admin/listings");
}