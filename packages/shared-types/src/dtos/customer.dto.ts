import { z } from "zod";

export const CustomerSchema = z.object({
  id: z.string().uuid(),
  fullName: z.string().min(1),
  email: z.string().email(),
  phone: z.string(),
  panNumber: z.string().optional(),
  aadhaarNumber: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  pincode: z.string().optional(),
  kycVerified: z.boolean().default(false),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type Customer = z.infer<typeof CustomerSchema>;
