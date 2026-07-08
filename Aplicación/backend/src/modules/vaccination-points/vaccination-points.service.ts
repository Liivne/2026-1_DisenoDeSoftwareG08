import { NotFoundError } from "../../shared/errors/NotFoundError.js";

import vaccinationPointsRepository from "./vaccination-points.repository.js";
import { toVaccinationPointResponse } from "./mappers/vaccination-point.mapper.js";

type CreateVaccinationPointInput = {
  name: string;
  address: string;
  city?: string;
  commune?: string;
};

type UpdateVaccinationPointInput = Partial<CreateVaccinationPointInput>;

export class VaccinationPointsService {
  async getVaccinationPoints() {
    const points = await vaccinationPointsRepository.findAll();

    return points.map(toVaccinationPointResponse);
  }

  async getVaccinationPointById(id: number) {
    const point = await vaccinationPointsRepository.findById(id);

    if (!point) {
      throw new NotFoundError("El punto de vacunación no existe.");
    }

    return toVaccinationPointResponse(point);
  }

  async createVaccinationPoint(data: CreateVaccinationPointInput) {
    const point = await vaccinationPointsRepository.create(data);

    return toVaccinationPointResponse(point);
  }

  async updateVaccinationPoint(
    id: number,
    data: UpdateVaccinationPointInput
  ) {
    await this.getVaccinationPointById(id);

    const point = await vaccinationPointsRepository.update(id, data);

    return toVaccinationPointResponse(point);
  }

  async deleteVaccinationPoint(id: number) {
    await this.getVaccinationPointById(id);

    await vaccinationPointsRepository.delete(id);

    return {
      message: "Punto de vacunación eliminado correctamente.",
    };
  }
}

export default new VaccinationPointsService();