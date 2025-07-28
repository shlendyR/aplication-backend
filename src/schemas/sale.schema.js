import { z } from "zod";

export const enumStatus = z.enum(["PENDING", "COMPLETED"]);
export const enumPaymentMethod = z.enum(["TRANSFER", "CASH", "CARD"]);

export const createSaleSchema = z.object({
  id: z.number().int().optional(), // auto-increment, no requerido al crear
  date: z.string().datetime({ offset: true }).or(z.date()), // admite ISO string o Date
  total: z.number().nonnegative(), // no puede ser negativo
  description: z.string().nullable(), // si puede ser nulo
  status: enumStatus,
  payment_method: enumPaymentMethod,
  id_user: z.number().int().positive(),
});
