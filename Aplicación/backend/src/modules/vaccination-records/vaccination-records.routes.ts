import { Router } from "express";
import { Role } from "@prisma/client";

import vaccinationRecordsController from "./vaccination-records.controller.js";
import { authenticate } from "../../shared/middlewares/authenticate.middleware.js";
import { authorize } from "../../shared/middlewares/authorize.middleware.js";

const router = Router();

router.get(
  "/my",
  authenticate,
  authorize([Role.PACIENTE]),
  vaccinationRecordsController.getMine
);

router.get(
  "/",
  authenticate,
  authorize([Role.ADMINISTRADOR]),
  vaccinationRecordsController.getAll
);

router.get(
  "/user/:userId",
  authenticate,
  authorize([Role.ADMINISTRADOR, Role.PERSONAL_SALUD]),
  vaccinationRecordsController.getByUserId
);

router.get(
  "/:id",
  authenticate,
  authorize([Role.ADMINISTRADOR, Role.PERSONAL_SALUD]),
  vaccinationRecordsController.getById
);

export default router;