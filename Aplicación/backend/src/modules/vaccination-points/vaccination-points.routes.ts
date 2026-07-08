import { Router } from "express";
import { Role } from "@prisma/client";

import vaccinationPointsController from "./vaccination-points.controller.js";
import { authenticate } from "../../shared/middlewares/authenticate.middleware.js";
import { authorize } from "../../shared/middlewares/authorize.middleware.js";
import { validate } from "../../shared/middlewares/validation.middleware.js";
import {
  createVaccinationPointSchema,
  updateVaccinationPointSchema,
} from "./vaccination-points.schema.js";

const router = Router();

router.get(
  "/",
  authenticate,
  vaccinationPointsController.getAll
);

router.get(
  "/:id",
  authenticate,
  vaccinationPointsController.getById
);

router.post(
  "/",
  authenticate,
  authorize([Role.ADMINISTRADOR]),
  validate(createVaccinationPointSchema),
  vaccinationPointsController.create
);

router.patch(
  "/:id",
  authenticate,
  authorize([Role.ADMINISTRADOR]),
  validate(updateVaccinationPointSchema),
  vaccinationPointsController.update
);

router.delete(
  "/:id",
  authenticate,
  authorize([Role.ADMINISTRADOR]),
  vaccinationPointsController.delete
);

export default router;