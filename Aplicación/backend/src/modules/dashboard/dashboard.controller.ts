import { Request, Response } from "express";

import { asyncHandler } from "../../shared/utils/catchAsync.js";
import dashboardService from "./dashboard.service.js";

export class DashboardController {
  getSummary = asyncHandler(async (_req: Request, res: Response) => {
    const summary = await dashboardService.getSummary();

    res.json(summary);
  });
}

export default new DashboardController();