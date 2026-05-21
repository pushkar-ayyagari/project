"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/session";
import { inquirySchema, INQUIRY_STATUSES } from "@/lib/schemas/inquiry";

export type CreateInquiryResult = { ok: true } | { ok: false; error: string };

export async function createInquiryAction(
  listingId: string,
  values: { name: string; email: string; phone?: string; message: string }
): Promise<CreateInquiryResult> {
  const parsed = inquirySchema.safeParse(values);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }
  const data = parsed.data;

  const listing = await prisma.listing.findUnique({
    where: { id: listingId },
    select: { id: true },
  });
  if (!listing) {
    return { ok: false, error: "This listing is no longer available." };
  }

  await prisma.inquiry.create({
    data: {
      listingId,
      name: data.name,
      email: data.email,
      phone: data.phone || null,
      message: data.message,
    },
  });

  revalidatePath("/admin/inquiries");
  return { ok: true };
}

export async function updateInquiryStatusAction(id: string, status: string) {
  await requireAdmin();
  if (!INQUIRY_STATUSES.includes(status as (typeof INQUIRY_STATUSES)[number])) {
    return { ok: false as const, error: "Invalid status" };
  }
  await prisma.inquiry.update({
    where: { id },
    data: { status: status as (typeof INQUIRY_STATUSES)[number] },
  });
  revalidatePath("/admin/inquiries");
  revalidatePath("/admin");
  return { ok: true as const };
}