import { z } from "zod";

export const enumStatus = z.enum(["PENDING", "COMPLETED"]);
export const enumPaymentMethod = z.enum(["CASH", "TRANSFER", "CARD"]); // ← agrega esto si no lo tenías

export const createSaleSchema = z.object({
  id: z.number().int().optional(),
  date: z.string().datetime({ offset: true }).or(z.date()).optional(), // ← ya no es obligatorio
  total: z.number().nonnegative(),
  description: z.string().nullable().optional(),
  status: enumStatus,
  payment_method: enumPaymentMethod,
  id_user: z.number().int().positive(),
});
