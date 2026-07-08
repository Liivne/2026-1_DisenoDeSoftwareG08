import { NotFoundError } from "../../shared/errors/NotFoundError.js";

import vaccinesRepository from "./vaccines.repository.js";
import { toVaccineResponse } from "./mappers/vaccine.mapper.js";

type CreateVaccineInput = {
  name: string;
  laboratory?: string;
  description?: string;
  stock?: number;
};

type UpdateVaccineInput = Partial<CreateVaccineInput>;

export class VaccinesService {
  async getVaccines() {
    const vaccines = await vaccinesRepository.findAll();

    return vaccines.map(toVaccineResponse);
  }

  async getVaccineById(id: number) {
    const vaccine = await vaccinesRepository.findById(id);

    if (!vaccine) {
      throw new NotFoundError("La vacuna no existe.");
    }

    return toVaccineResponse(vaccine);
  }

  async createVaccine(data: CreateVaccineInput) {
    const vaccine = await vaccinesRepository.create(data);

    return toVaccineResponse(vaccine);
  }

  async updateVaccine(id: number, data: UpdateVaccineInput) {
    await this.getVaccineById(id);

    const vaccine = await vaccinesRepository.update(id, data);

    return toVaccineResponse(vaccine);
  }

  async deleteVaccine(id: number) {
    await this.getVaccineById(id);

    await vaccinesRepository.delete(id);

    return {
      message: "Vacuna eliminada correctamente.",
    };
  }
}

export default new VaccinesService();