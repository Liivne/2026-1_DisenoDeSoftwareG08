import { Router } from "express";

import dashboardController from "./dashboard.controller.js";
import { authenticate } from "../../shared/middlewares/authenticate.middleware.js";

const router = Router();

router.get(
  "/summary",
  authenticate,
  dashboardController.getSummary
);

export default router;