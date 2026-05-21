import { z } from "zod";

export const PROPERTY_TYPES = [
  "HOUSE",
  "APARTMENT",
  "CONDO",
  "TOWNHOUSE",
  "LAND",
  "COMMERCIAL",
] as const;

export const LISTING_STATUSES = ["FOR_SALE", "FOR_RENT", "PENDING", "SOLD"] as const;

export const listingFormSchema = z.object({
  title: z.string().min(3, "Title is too short").max(120),
  description: z.string().min(10, "Description is too short").max(5000),
  address: z.string().min(2, "Address required"),
  city: z.string().min(1, "City required"),
  state: z.string().min(1, "State required"),
  zipCode: z.string().min(3).max(10),
  latitude: z.number().min(-90).max(90).nullable(),
  longitude: z.number().min(-180).max(180).nullable(),
  price: z.number().int().min(0),
  bedrooms: z.number().int().min(0),
  bathrooms: z.number().min(0),
  squareFeet: z.number().int().min(0),
  propertyType: z.enum(PROPERTY_TYPES),
  listingStatus: z.enum(LISTING_STATUSES),
  yearBuilt: z.number().int().min(1700).max(new Date().getFullYear() + 1).nullable(),
  lotSize: z.number().int().min(0).nullable(),
  images: z
    .array(
      z.object({
        imageUrl: z.string().url("Must be a valid URL"),
        altText: z.string().optional(),
      })
    )
    .max(20),
});

export type ListingFormValues = z.infer<typeof listingFormSchema>;