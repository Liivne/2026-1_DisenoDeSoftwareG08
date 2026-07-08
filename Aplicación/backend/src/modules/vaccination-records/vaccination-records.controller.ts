import { Request, Response } from "express";

import { asyncHandler } from "../../shared/utils/catchAsync.js";
import { UnauthorizedError } from "../../shared/errors/UnauthorizedError.js";

import vaccinationRecordsService from "./vaccination-records.service.js";

export class VaccinationRecordsController {
  getAll = asyncHandler(async (_req: Request, res: Response) => {
    const records = await vaccinationRecordsService.getVaccinationRecords();

    res.json(records);
  });

  getMine = asyncHandler(async (req: Request, res: Response) => {
    if (!req.user) {
      throw new UnauthorizedError();
    }

    const records = await vaccinationRecordsService.getMyVaccinationRecords(
      req.user.id
    );

    res.json(records);
  });

  getByUserId = asyncHandler(async (req: Request, res: Response) => {
    const records =
      await vaccinationRecordsService.getVaccinationRecordsByUserId(
        Number(req.params.userId)
      );

    res.json(records);
  });

  getById = asyncHandler(async (req: Request, res: Response) => {
    const record = await vaccinationRecordsService.getVaccinationRecordById(
      Number(req.params.id)
    );

    res.json(record);
  });
}

export default new VaccinationRecordsController();