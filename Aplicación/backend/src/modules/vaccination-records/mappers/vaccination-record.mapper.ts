import { Prisma } from "@prisma/client";

import { VaccinationRecordResponseDto } from "../dto/vaccination-record-response.dto.js";

type VaccinationRecordWithRelations =
  Prisma.VaccinationRecordGetPayload<{
    include: {
      user: true;
      vaccine: true;
      appointment: {
        include: {
          vaccinationPoint: true;
          campaign: true;
        };
      };
    };
  }>;

export function toVaccinationRecordResponse(
  record: VaccinationRecordWithRelations
): VaccinationRecordResponseDto {
  return {
    id: record.id,
    doseNumber: record.doseNumber,
    appliedAt: record.appliedAt,
    notes: record.notes,

    user: {
      id: record.user.id,
      rut: record.user.rut,
      name: record.user.name,
    },

    vaccine: {
      id: record.vaccine.id,
      name: record.vaccine.name,
    },

    appointment: {
      id: record.appointment.id,
      date: record.appointment.appointmentDate,
      status: record.appointment.status,
      vaccinationPoint: record.appointment.vaccinationPoint.name,
      campaign: record.appointment.campaign.name,
    },
  };
}