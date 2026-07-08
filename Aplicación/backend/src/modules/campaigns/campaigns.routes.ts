import { Router } from "express";
import { Role } from "@prisma/client";

import campaignsController from "./campaigns.controller.js";
import { authenticate } from "../../shared/middlewares/authenticate.middleware.js";
import { authorize } from "../../shared/middlewares/authorize.middleware.js";
import { validate } from "../../shared/middlewares/validation.middleware.js";
import {
  createCampaignSchema,
  updateCampaignSchema,
} from "./campaigns.schema.js";

const router = Router();

router.get(
  "/",
  authenticate,
  campaignsController.getAll
);

router.get(
  "/active",
  authenticate,
  campaignsController.getActive
);

router.get(
  "/:id",
  authenticate,
  campaignsController.getById
);

router.post(
  "/",
  authenticate,
  authorize([Role.ADMINISTRADOR]),
  validate(createCampaignSchema),
  campaignsController.create
);

router.patch(
  "/:id",
  authenticate,
  authorize([Role.ADMINISTRADOR]),
  validate(updateCampaignSchema),
  campaignsController.update
);

router.delete(
  "/:id",
  authenticate,
  authorize([Role.ADMINISTRADOR]),
  campaignsController.delete
);

export default router;