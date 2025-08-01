import { z } from "zod";

export const enumPaymentMethod = z.enum(["CASH", "TRANSFER", "CARD"]);

export const createPaymentSchema = z.object({
  id_accounts_receivable: z.number().int().positive(), // ID válido y positivo
  amount_paid: z.coerce.number().positive(), // Monto positivo, coerción por si viene como string
  payment_date: z.coerce.date().optional(), // Opcional ya que Prisma usa `@default(now())`
  payment_method: enumPaymentMethod, // Enum basado en tu modelo de Prisma
});
