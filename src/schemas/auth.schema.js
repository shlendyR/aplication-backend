import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email({ message: "Correo inválido" }),
  password: z.string().min(1, { message: "La contraseña es requerida" }),
});

export const registerSchema = z.object({
  name: z
    .string()
    .min(3, { message: "El nombre debe tener al menos 3 caracteres" })
    .max(50, { message: "El nombre debe tener como máximo 50 caracteres" }),
  email: z
    .string()
    .email({ message: "Debes proporcionar un correo electrónico válido" }),
  password: z
    .string()
    .min(6, { message: "La contraseña debe tener al menos 6 caracteres" }),
  phone: z.string().optional(),
  birthdate: z.preprocess((arg) => {
    if (typeof arg === "string" || arg instanceof Date) return new Date(arg);
  }, z.date({ required_error: "La fecha de nacimiento es requerida" })),
  id_rol: z
    .number()
    .int({ message: "El ID del rol debe ser un número entero" }),
});
