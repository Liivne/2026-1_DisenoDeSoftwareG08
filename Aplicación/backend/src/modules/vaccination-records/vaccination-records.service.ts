import { NotFoundError } from "../../shared/errors/NotFoundError.js";

import vaccinationRecordsRepository from "./vaccination-records.repository.js";
import { toVaccinationRecordResponse } from "./mappers/vaccination-record.mapper.js";

export class VaccinationRecordsService {
  async getVaccinationRecords() {
    const records = await vaccinationRecordsRepository.findAll();

    return records.map(toVaccinationRecordResponse);
  }

  async getMyVaccinationRecords(userId: number) {
    const records = await vaccinationRecordsRepository.findByUserId(userId);

    return records.map(toVaccinationRecordResponse);
  }

  async getVaccinationRecordsByUserId(userId: number) {
    const records = await vaccinationRecordsRepository.findByUserId(userId);

    return records.map(toVaccinationRecordResponse);
  }

  async getVaccinationRecordById(id: number) {
    const record = await vaccinationRecordsRepository.findById(id);

    if (!record) {
      throw new NotFoundError("El registro de vacunación no existe.");
    }

    return toVaccinationRecordResponse(record);
  }
}

export default new VaccinationRecordsService();