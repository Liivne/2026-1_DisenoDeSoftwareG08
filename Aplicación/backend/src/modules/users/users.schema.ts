import { z } from "zod";

export const createUserSchema = z.object({
  rut: z.string().min(1, "El RUT es obligatorio."),
  name: z.string().min(3, "El nombre debe tener al menos 3 caracteres."),
  email: z.email("Correo electrónico inválido."),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres."),
  phone: z.string().optional(),
  role: z.enum(["PACIENTE", "PERSONAL_SALUD", "ADMINISTRADOR"]).optional(),
});