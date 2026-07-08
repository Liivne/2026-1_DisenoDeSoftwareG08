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
  async getAppointments() {
    const appointments = await appointmentsRepository.findAll();

    return appointments.map(toAppointmentResponse);
  }

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

    return this.changeStatus(appointmentId, AppointmentStatus.CANCELADA);
  }

  async confirmAppointment(appointmentId: number) {
    return this.changeStatus(appointmentId, AppointmentStatus.CONFIRMADA);
  }

  async startAppointment(appointmentId: number) {
    return this.changeStatus(appointmentId, AppointmentStatus.EN_PROCESO);
  }

  async markNoShow(appointmentId: number) {
    return this.changeStatus(appointmentId, AppointmentStatus.AUSENTE);
  }

  async completeAppointment(appointmentId: number) {
    const appointment = await appointmentsRepository.findById(appointmentId);

    if (!appointment) {
      throw new NotFoundError("La cita no existe.");
    }

    if (appointment.status === AppointmentStatus.COMPLETADA) {
      throw new ForbiddenError("La cita ya fue completada.");
    }

    const completed = await appointmentsRepository.completeWithRecord(
      appointmentId
    );

    if (!completed) {
      throw new NotFoundError("La cita no existe.");
    }

    return toAppointmentResponse(completed);
  }

  private async changeStatus(
    appointmentId: number,
    status: AppointmentStatus
  ) {
    const appointment = await appointmentsRepository.findById(appointmentId);

    if (!appointment) {
      throw new NotFoundError("La cita no existe.");
    }

    if (appointment.status === AppointmentStatus.COMPLETADA) {
      throw new ForbiddenError("La cita ya fue completada.");
    }

    const updated = await appointmentsRepository.updateStatus(
      appointmentId,
      status
    );

    return toAppointmentResponse(updated);
  }
}

export default new AppointmentsService();