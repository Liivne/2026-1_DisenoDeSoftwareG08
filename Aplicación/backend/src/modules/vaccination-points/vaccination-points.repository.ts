import prisma from "../../config/prisma.js";

type CreateVaccinationPointData = {
  name: string;
  address: string;
  city?: string;
  commune?: string;
};

type UpdateVaccinationPointData = Partial<CreateVaccinationPointData>;

export class VaccinationPointsRepository {
  // Queries

  async findAll() {
    return prisma.vaccinationPoint.findMany({
      orderBy: {
        id: "asc",
      },
    });
  }

  async findById(id: number) {
    return prisma.vaccinationPoint.findUnique({
      where: {
        id,
      },
    });
  }

  // Commands

  async create(data: CreateVaccinationPointData) {
    return prisma.vaccinationPoint.create({
      data,
    });
  }

  async update(id: number, data: UpdateVaccinationPointData) {
    return prisma.vaccinationPoint.update({
      where: {
        id,
      },
      data,
    });
  }

  async delete(id: number) {
    return prisma.vaccinationPoint.delete({
      where: {
        id,
      },
    });
  }
}

export default new VaccinationPointsRepository();