import { AppointmentStatus } from "@prisma/client";
import prisma from "../../config/prisma.js";

const appointmentInclude = {
  campaign: {
    include: {
      vaccine: true,
    },
  },
  vaccinationPoint: true,
};

type CreateAppointmentData = {
  userId: number;
  campaignId: number;
  vaccinationPointId: number;
  appointmentDate: Date;
};

export class AppointmentsRepository {
  // Queries
  async findById(id: number) {
    return prisma.appointment.findUnique({
      where: { id },
      include: appointmentInclude,
    });
  }

  async findByUserId(userId: number) {
    return prisma.appointment.findMany({
      where: { userId },
      orderBy: { appointmentDate: "asc" },
      include: appointmentInclude,
    });
  }

  // Commands
  async create(data: CreateAppointmentData) {
    return prisma.appointment.create({
      data,
      include: appointmentInclude,
    });
  }

  async updateStatus(id: number, status: AppointmentStatus) {
    return prisma.appointment.update({
      where: { id },
      data: { status },
      include: appointmentInclude,
    });
  }
}

export default new AppointmentsRepository();