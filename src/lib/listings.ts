import { Prisma, PropertyType, ListingStatus } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export type SortKey = "newest" | "price-asc" | "price-desc" | "sqft-desc";

export type ListingFilters = {
  q?: string;
  city?: string;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  bathrooms?: number;
  propertyType?: PropertyType;
  listingStatus?: ListingStatus;
  sort?: SortKey;
};

function getOrderBy(sort: SortKey | undefined): Prisma.ListingOrderByWithRelationInput {
  switch (sort) {
    case "price-asc":
      return { price: "asc" };
    case "price-desc":
      return { price: "desc" };
    case "sqft-desc":
      return { squareFeet: "desc" };
    case "newest":
    default:
      return { createdAt: "desc" };
  }
}

export async function getListings(filters: ListingFilters = {}) {
  const where: Prisma.ListingWhereInput = {};

  if (filters.q) {
    where.OR = [
      { title: { contains: filters.q, mode: "insensitive" } },
      { address: { contains: filters.q, mode: "insensitive" } },
      { city: { contains: filters.q, mode: "insensitive" } },
      { zipCode: { contains: filters.q, mode: "insensitive" } },
    ];
  }
  if (filters.city) {
    where.city = { equals: filters.city, mode: "insensitive" };
  }
  if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
    where.price = {
      ...(filters.minPrice !== undefined && { gte: filters.minPrice }),
      ...(filters.maxPrice !== undefined && { lte: filters.maxPrice }),
    };
  }
  if (filters.bedrooms !== undefined) {
    where.bedrooms = { gte: filters.bedrooms };
  }
  if (filters.bathrooms !== undefined) {
    where.bathrooms = { gte: filters.bathrooms };
  }
  if (filters.propertyType) {
    where.propertyType = filters.propertyType;
  }
  if (filters.listingStatus) {
    where.listingStatus = filters.listingStatus;
  }

  return prisma.listing.findMany({
    where,
    orderBy: getOrderBy(filters.sort),
    include: {
      images: { orderBy: { sortOrder: "asc" }, take: 1 },
    },
  });
}

export async function getListingById(id: string) {
  return prisma.listing.findUnique({
    where: { id },
    include: {
      images: { orderBy: { sortOrder: "asc" } },
      createdBy: { select: { id: true, name: true, email: true } },
    },
  });
}

export async function getFeaturedListings(limit = 6) {
  return prisma.listing.findMany({
    where: { listingStatus: { in: ["FOR_SALE", "FOR_RENT"] } },
    orderBy: { createdAt: "desc" },
    take: limit,
    include: { images: { orderBy: { sortOrder: "asc" }, take: 1 } },
  });
}

export function parseFiltersFromSearchParams(
  params: Record<string, string | string[] | undefined>
): ListingFilters {
  const getOne = (k: string) => {
    const v = params[k];
    return Array.isArray(v) ? v[0] : v;
  };
  const toInt = (v: string | undefined) => {
    if (!v) return undefined;
    const n = parseInt(v, 10);
    return Number.isFinite(n) ? n : undefined;
  };
  const toFloat = (v: string | undefined) => {
    if (!v) return undefined;
    const n = parseFloat(v);
    return Number.isFinite(n) ? n : undefined;
  };
  const propertyTypes: PropertyType[] = [
    "HOUSE",
    "APARTMENT",
    "CONDO",
    "TOWNHOUSE",
    "LAND",
    "COMMERCIAL",
  ];
  const listingStatuses: ListingStatus[] = ["FOR_SALE", "FOR_RENT", "PENDING", "SOLD"];
  const sortKeys: SortKey[] = ["newest", "price-asc", "price-desc", "sqft-desc"];

  const propertyType = getOne("propertyType");
  const listingStatus = getOne("listingStatus");
  const sort = getOne("sort");

  return {
    q: getOne("q") || undefined,
    city: getOne("city") || undefined,
    minPrice: toInt(getOne("minPrice")),
    maxPrice: toInt(getOne("maxPrice")),
    bedrooms: toInt(getOne("bedrooms")),
    bathrooms: toFloat(getOne("bathrooms")),
    propertyType:
      propertyType && propertyTypes.includes(propertyType as PropertyType)
        ? (propertyType as PropertyType)
        : undefined,
    listingStatus:
      listingStatus && listingStatuses.includes(listingStatus as ListingStatus)
        ? (listingStatus as ListingStatus)
        : undefined,
    sort: sort && sortKeys.includes(sort as SortKey) ? (sort as SortKey) : undefined,
  };
}