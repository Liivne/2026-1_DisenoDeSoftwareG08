import { z } from "zod";

export const createAppointmentSchema = z.object({
  campaignId: z.number().int().positive(),
  vaccinationPointId: z.number().int().positive(),
  appointmentDate: z.coerce.date(),
});