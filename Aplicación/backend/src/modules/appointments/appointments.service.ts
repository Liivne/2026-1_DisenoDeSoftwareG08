import { AppointmentStatus } from "@prisma/client";

import { ForbiddenError } from "../../shared/errors/ForbiddenError.js";
import { NotFoundError } from "../../shared/errors/NotFoundError.js";

import appointmentsRepository from "./appointments.repository.js";
import { toAppointmentResponse } from "./mappers/appointment.mapper.js";

type CreateAppointmentInput = {
  userId: number;
  campaignId: number;
  vaccinationPointId: number;
  appointmentDate: Date;
};

export class AppointmentsService {
  async getMyAppointments(userId: number) {
    const appointments = await appointmentsRepository.findByUserId(userId);

    return appointments.map(toAppointmentResponse);
  }

  async createAppointment(data: CreateAppointmentInput) {
    const appointment = await appointmentsRepository.create(data);

    return toAppointmentResponse(appointment);
  }

  async cancelAppointment(appointmentId: number, userId: number) {
    const appointment = await appointmentsRepository.findById(appointmentId);

    if (!appointment) {
      throw new NotFoundError("La cita no existe.");
    }

    if (appointment.userId !== userId) {
      throw new ForbiddenError("No puedes cancelar esta cita.");
    }

    if (appointment.status === AppointmentStatus.COMPLETADA) {
      throw new ForbiddenError("La cita ya fue completada.");
    }

    const cancelled = await appointmentsRepository.updateStatus(
      appointmentId,
      AppointmentStatus.CANCELADA
    );

    return toAppointmentResponse(cancelled);
  }
}

export default new AppointmentsService();