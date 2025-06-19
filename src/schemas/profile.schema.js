import { z } from "zod";

export const updateProfileSchema = z
  .object({
    email: z.string().email(),
    name: z.string().max(50).default("Unknown"),
    phone: z.string().max(20).optional(),
  })
  .partial();
