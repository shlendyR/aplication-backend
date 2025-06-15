import { z } from "zod";

export const createCategorySchema = z.object({
  name: z
    .string()
    .min(3, { message: "El nombre debe tener al menos 3 caracteres" })
    .max(50, { message: "El nombre debe tener como máximo 50 caracteres" }),
});

export const updateCategorySchema = createCategorySchema.partial();
