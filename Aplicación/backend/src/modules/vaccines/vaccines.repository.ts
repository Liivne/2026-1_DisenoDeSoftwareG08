import prisma from "../../config/prisma.js";

type CreateVaccineData = {
    name: string;
    laboratory?: string;
    description?: string;
    stock?: number;
};

type UpdateVaccineData = Partial<CreateVaccineData>;

export class VaccinesRepository {
    async findAll() {
        return prisma.vaccine.findMany({
            orderBy: {
                id: "asc",
            },
        });
  }

  async findById(id: number) {
        return prisma.vaccine.findUnique({
            where: {
                id,
            },
        });
  }

  async create(data: CreateVaccineData) {
    return prisma.vaccine.create({
        data,
    });
  }

  async update(id: number, data: UpdateVaccineData) {
    return prisma.vaccine.update({
        where: {
            id,
        },
        data,
    });
  }

    async delete(id: number) {
        return prisma.vaccine.delete({
            where: {
                id,
            },
        });
    }
}

export default new VaccinesRepository();