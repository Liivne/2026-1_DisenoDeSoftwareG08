import { z } from "zod";

export const createCampaignSchema = z.object({
  name: z.string().min(3, "El nombre debe tener al menos 3 caracteres."),
  description: z.string().optional(),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  active: z.boolean().optional(),
  vaccineId: z.number().int().positive(),
});

export const updateCampaignSchema = createCampaignSchema.partial();