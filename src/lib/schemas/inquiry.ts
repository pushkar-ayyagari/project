import { z } from "zod";

export const inquirySchema = z.object({
  name: z.string().min(1, "Name is required").max(80),
  email: z.string().email("Enter a valid email"),
  phone: z.string().max(40).optional().or(z.literal("")),
  message: z.string().min(10, "Message is too short").max(2000),
});

export type InquiryFormValues = z.infer<typeof inquirySchema>;

export const INQUIRY_STATUSES = ["NEW", "CONTACTED", "CLOSED"] as const;