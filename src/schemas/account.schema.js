import { z } from "zod";

export const createAccountSchema = z.object({
  expiration_date: z.coerce.date(),
  id_sale: z.number().int().positive(),
});
