import prisma from "../../config/prisma.js";

const vaccinationRecordInclude = {
  user: true,
  vaccine: true,
  appointment: {
    include: {
      vaccinationPoint: true,
      campaign: true,
    },
  },
};

export class VaccinationRecordsRepository {
  // Queries

  async findAll() {
    return prisma.vaccinationRecord.findMany({
      orderBy: {
        appliedAt: "desc",
      },
      include: vaccinationRecordInclude,
    });
  }

  async findByUserId(userId: number) {
    return prisma.vaccinationRecord.findMany({
      where: {
        userId,
      },
      orderBy: {
        appliedAt: "desc",
      },
      include: vaccinationRecordInclude,
    });
  }

  async findById(id: number) {
    return prisma.vaccinationRecord.findUnique({
      where: {
        id,
      },
      include: vaccinationRecordInclude,
    });
  }
}

export default new VaccinationRecordsRepository();