import appointmentsRepository from "./appointments.repository.js";
import { toAppointmentResponse } from "./mappers/appointment.mapper.js";

export class AppointmentsService {
  async getMyAppointments(userId: number) {
    const appointments =
      await appointmentsRepository.findByUserId(userId);

    return appointments.map(toAppointmentResponse);
  }
}

export default new AppointmentsService();