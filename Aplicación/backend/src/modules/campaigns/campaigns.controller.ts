import { Request, Response } from "express";

import { asyncHandler } from "../../shared/utils/catchAsync.js";
import campaignsService from "./campaigns.service.js";

export class CampaignsController {
  getAll = asyncHandler(async (_req: Request, res: Response) => {
    const campaigns = await campaignsService.getCampaigns();

    res.json(campaigns);
  });

  getActive = asyncHandler(async (_req: Request, res: Response) => {
    const campaigns = await campaignsService.getActiveCampaigns();

    res.json(campaigns);
  });

  getById = asyncHandler(async (req: Request, res: Response) => {
    const campaign = await campaignsService.getCampaignById(
      Number(req.params.id)
    );

    res.json(campaign);
  });

  create = asyncHandler(async (req: Request, res: Response) => {
    const campaign = await campaignsService.createCampaign(req.body);

    res.status(201).json(campaign);
  });

  update = asyncHandler(async (req: Request, res: Response) => {
    const campaign = await campaignsService.updateCampaign(
      Number(req.params.id),
      req.body
    );

    res.json(campaign);
  });

  delete = asyncHandler(async (req: Request, res: Response) => {
    const result = await campaignsService.deleteCampaign(Number(req.params.id));

    res.json(result);
  });
}

export default new CampaignsController();