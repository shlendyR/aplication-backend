import { z } from "zod";

export const createDetailSchema = z.object({
  amount: z.number().int().positive(),
  subtotal: z.coerce.number().nonnegative(),
  id_product: z.number().int(),
  id_sale: z.number().int(),
});
