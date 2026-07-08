import { Router } from "express";
import { Role } from "@prisma/client";

import vaccinesController from "./vaccines.controller.js";
import { authenticate } from "../../shared/middlewares/authenticate.middleware.js";
import { authorize } from "../../shared/middlewares/authorize.middleware.js";
import { validate } from "../../shared/middlewares/validation.middleware.js";
import {
  createVaccineSchema,
  updateVaccineSchema,
} from "./vaccines.schema.js";

const router = Router();

router.get(
  "/",
  authenticate,
  vaccinesController.getAll
);

router.get(
  "/:id",
  authenticate,
  vaccinesController.getById
);

router.post(
  "/",
  authenticate,
  authorize([Role.ADMINISTRADOR]),
  validate(createVaccineSchema),
  vaccinesController.create
);

router.patch(
  "/:id",
  authenticate,
  authorize([Role.ADMINISTRADOR]),
  validate(updateVaccineSchema),
  vaccinesController.update
);

router.delete(
  "/:id",
  authenticate,
  authorize([Role.ADMINISTRADOR]),
  vaccinesController.delete
);

export default router;