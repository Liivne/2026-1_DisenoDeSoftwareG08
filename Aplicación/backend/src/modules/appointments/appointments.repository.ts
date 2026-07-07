import prisma from "../../config/prisma.js";

export class AppointmentsRepository {
  async findByUserId(userId: number) {
    return prisma.appointment.findMany({
      where: { userId },
      orderBy: {
        appointmentDate: "asc",
      },
      include: {
        campaign: {
          include: {
            vaccine: true,
          },
        },
        vaccinationPoint: true,
      },
    });
  }
}

export default new AppointmentsRepository();