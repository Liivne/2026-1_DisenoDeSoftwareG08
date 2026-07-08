import { z } from "zod";

export const createVaccinationPointSchema = z.object({
  name: z.string().min(3, "El nombre debe tener al menos 3 caracteres."),
  address: z.string().min(3, "La dirección debe tener al menos 3 caracteres."),
  city: z.string().optional(),
  commune: z.string().optional(),
});

export const updateVaccinationPointSchema =
  createVaccinationPointSchema.partial();