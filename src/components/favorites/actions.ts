"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";

export type ToggleFavoriteResult =
  | { ok: true; favorited: boolean }
  | { ok: false; error: string; needsAuth?: boolean };

export async function toggleFavorite(listingId: string): Promise<ToggleFavoriteResult> {
  const user = await getCurrentUser();
  if (!user) {
    return { ok: false, error: "Sign in to save listings.", needsAuth: true };
  }

  const existing = await prisma.favorite.findUnique({
    where: {
      userId_listingId: { userId: user.id, listingId },
    },
  });

  if (existing) {
    await prisma.favorite.delete({ where: { id: existing.id } });
    revalidatePath("/favorites");
    return { ok: true, favorited: false };
  } else {
    await prisma.favorite.create({
      data: { userId: user.id, listingId },
    });
    revalidatePath("/favorites");
    return { ok: true, favorited: true };
  }
}