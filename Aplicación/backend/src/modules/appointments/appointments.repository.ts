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

  async findAll() {
    return prisma.appointment.findMany({
      orderBy: { appointmentDate: "asc" },
      include: appointmentInclude,
    });
  }

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

  async completeWithRecord(id: number) {
    return prisma.$transaction(async (tx) => {
      const appointment = await tx.appointment.findUnique({
        where: { id },
        include: appointmentInclude,
      });

      if (!appointment) {
        return null;
      }

      await tx.vaccinationRecord.create({
        data: {
          appointmentId: appointment.id,
          userId: appointment.userId,
          vaccineId: appointment.campaign.vaccine.id,
          doseNumber: 1,
        },
      });

      return tx.appointment.update({
        where: { id },
        data: {
          status: AppointmentStatus.COMPLETADA,
        },
        include: appointmentInclude,
      });
    });
  }
}

export default new AppointmentsRepository();