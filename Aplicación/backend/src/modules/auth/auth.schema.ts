import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Correo inválido."),
  password: z.string().min(1, "La contraseña es obligatoria."),
});

export const registerSchema = z.object({
  rut: z.string().min(1, "El RUT es obligatorio."),
  name: z.string().min(3, "El nombre debe tener al menos 3 caracteres."),
  email: z.string().email("Correo electrónico inválido."),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres."),
  phone: z.string().optional(),
});