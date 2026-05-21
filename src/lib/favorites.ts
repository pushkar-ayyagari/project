import { prisma } from "@/lib/prisma";

export async function getUserFavoriteIds(userId: string): Promise<Set<string>> {
  const favorites = await prisma.favorite.findMany({
    where: { userId },
    select: { listingId: true },
  });
  return new Set(favorites.map((f) => f.listingId));
}

export async function getUserFavoriteListings(userId: string) {
  const favorites = await prisma.favorite.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    include: {
      listing: {
        include: {
          images: { orderBy: { sortOrder: "asc" }, take: 1 },
        },
      },
    },
  });
  return favorites.map((f) => f.listing);
}