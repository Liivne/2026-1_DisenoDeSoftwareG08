import { Request, Response } from "express";

import { asyncHandler } from "../../shared/utils/catchAsync.js";
import vaccinesService from "./vaccines.service.js";

export class VaccinesController {
  getAll = asyncHandler(async (_req: Request, res: Response) => {
    const vaccines = await vaccinesService.getVaccines();

    res.json(vaccines);
  });

  getById = asyncHandler(async (req: Request, res: Response) => {
    const vaccine = await vaccinesService.getVaccineById(
      Number(req.params.id)
    );

    res.json(vaccine);
  });

  create = asyncHandler(async (req: Request, res: Response) => {
    const vaccine = await vaccinesService.createVaccine(req.body);

    res.status(201).json(vaccine);
  });

  update = asyncHandler(async (req: Request, res: Response) => {
    const vaccine = await vaccinesService.updateVaccine(
      Number(req.params.id),
      req.body
    );

    res.json(vaccine);
  });

  delete = asyncHandler(async (req: Request, res: Response) => {
    const result = await vaccinesService.deleteVaccine(
      Number(req.params.id)
    );

    res.json(result);
  });
}

export default new VaccinesController();