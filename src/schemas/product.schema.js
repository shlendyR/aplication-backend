import { z } from "zod";

export const createProductSchema = z.object({
  price_sale: z
    .number({ invalid_type_error: "El precio de venta debe ser un número" })
    .positive({ message: "El precio de venta debe ser positivo" }),
  cost_price: z
    .number({ invalid_type_error: "El costo debe ser un número" })
    .positive({ message: "El costo debe ser positivo" }),
  stock: z
    .number({ invalid_type_error: "El stock debe ser un número" })
    .int({ message: "El stock debe ser un número entero" })
    .min(0, { message: "El stock no puede ser negativo" }),
  description: z
    .string()
    .max(100, {
      message: "La descripción debe tener como máximo 100 caracteres",
    })
    .optional(),
});

export const updateProductSchema = createProductSchema.partial();
