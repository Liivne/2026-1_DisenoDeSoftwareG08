import { Request, Response } from "express";

import { asyncHandler } from "../../shared/utils/catchAsync.js";
import vaccinationPointsService from "./vaccination-points.service.js";

export class VaccinationPointsController {
  getAll = asyncHandler(async (_req: Request, res: Response) => {
    const points = await vaccinationPointsService.getVaccinationPoints();

    res.json(points);
  });

  getById = asyncHandler(async (req: Request, res: Response) => {
    const point = await vaccinationPointsService.getVaccinationPointById(
      Number(req.params.id)
    );

    res.json(point);
  });

  create = asyncHandler(async (req: Request, res: Response) => {
    const point = await vaccinationPointsService.createVaccinationPoint(
      req.body
    );

    res.status(201).json(point);
  });

  update = asyncHandler(async (req: Request, res: Response) => {
    const point = await vaccinationPointsService.updateVaccinationPoint(
      Number(req.params.id),
      req.body
    );

    res.json(point);
  });

  delete = asyncHandler(async (req: Request, res: Response) => {
    const result =
      await vaccinationPointsService.deleteVaccinationPoint(
        Number(req.params.id)
      );

    res.json(result);
  });
}

export default new VaccinationPointsController();