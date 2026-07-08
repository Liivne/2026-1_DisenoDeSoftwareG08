import prisma from "../../config/prisma.js";

export class DashboardRepository {
  async getSummary() {
    const [
      users,
      campaigns,
      activeCampaigns,
      vaccines,
      vaccinationPoints,
      appointments,
      completedAppointments,
      vaccinationRecords,
    ] = await Promise.all([
      prisma.user.count(),
      prisma.campaign.count(),
      prisma.campaign.count({ where: { active: true } }),
      prisma.vaccine.count(),
      prisma.vaccinationPoint.count(),
      prisma.appointment.count(),
      prisma.appointment.count({
        where: { status: "COMPLETADA" },
      }),
      prisma.vaccinationRecord.count(),
    ]);

    return {
      users,
      campaigns,
      activeCampaigns,
      vaccines,
      vaccinationPoints,
      appointments,
      completedAppointments,
      vaccinationRecords,
    };
  }
}

export default new DashboardRepository();