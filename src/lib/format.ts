import { ListingStatus } from "@prisma/client";

const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const number = new Intl.NumberFormat("en-US");

export function formatPrice(price: number, status: ListingStatus): string {
  if (status === "FOR_RENT") return `${usd.format(price)}/mo`;
  return usd.format(price);
}

export function formatSqft(sqft: number): string {
  if (!sqft) return "—";
  return `${number.format(sqft)} sqft`;
}

export function formatBeds(beds: number): string {
  if (beds === 0) return "Studio";
  return `${beds} bd`;
}

export function formatBaths(baths: number): string {
  return `${baths} ba`;
}

export function formatPropertyType(type: string): string {
  return type
    .toLowerCase()
    .replace(/_/g, " ")
    .replace(/^\w/, (c) => c.toUpperCase());
}

export function formatListingStatus(status: ListingStatus): string {
  switch (status) {
    case "FOR_SALE":
      return "For Sale";
    case "FOR_RENT":
      return "For Rent";
    case "PENDING":
      return "Pending";
    case "SOLD":
      return "Sold";
  }
}