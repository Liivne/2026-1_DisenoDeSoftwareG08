import { Prisma } from "@prisma/client";
import { AppointmentResponseDto } from "../dto/appointment-response.dto.js";

type AppointmentWithRelations = Prisma.AppointmentGetPayload<{
  include: {
    campaign: {
      include: {
        vaccine: true;
      };
    };
    vaccinationPoint: true;
  };
}>;

export function toAppointmentResponse(
  appointment: AppointmentWithRelations
): AppointmentResponseDto {
  return {
    id: appointment.id,
    date: appointment.appointmentDate,
    status: appointment.status,
    campaign: appointment.campaign.name,
    vaccine: appointment.campaign.vaccine.name,
    vaccinationPoint: appointment.vaccinationPoint.name,
    address: appointment.vaccinationPoint.address,
  };
}