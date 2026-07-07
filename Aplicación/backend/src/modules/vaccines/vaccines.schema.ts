import { z } from "zod";

export const createVaccineSchema = z.object({
    name: z.string().min(2, "El nombre debe tener al menos 2 caracteres."),
    laboratory: z.string().optional(),
    description: z.string().optional(),
    stock: z.number().int().min(0, "El stock no puede ser negativo.").optional(),
});

export const updateVaccineSchema = createVaccineSchema.partial();