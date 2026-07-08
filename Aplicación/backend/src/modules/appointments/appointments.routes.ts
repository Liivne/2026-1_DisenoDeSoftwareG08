import { Router } from "express";
import appointmentsController from "./appointments.controller.js";
import { authenticate } from "../../shared/middlewares/authenticate.middleware.js";
import { createAppointmentSchema } from "./appointments.schema.js";
import { validate } from "../../shared/middlewares/validation.middleware.js";
import { authorize } from "../../shared/middlewares/authorize.middleware.js";
import { Role } from "@prisma/client";

const router = Router();

router.get(
  "/my",
  authenticate,
  authorize([Role.PACIENTE]),
  appointmentsController.getMyAppointments
);

router.post(
  "/",
  authenticate,
  authorize([Role.PACIENTE]),
  validate(createAppointmentSchema),
  appointmentsController.create
);

router.get(
  "/",
  authenticate,
  authorize([Role.ADMINISTRADOR, Role.PERSONAL_SALUD]),
  appointmentsController.getAll
);

router.patch(
  "/:id/cancel",
  authenticate,
  authorize([Role.PACIENTE]),
  appointmentsController.cancel
);

router.patch(
  "/:id/confirm",
  authenticate,
  authorize([Role.ADMINISTRADOR, Role.PERSONAL_SALUD]),
  appointmentsController.confirm
);

router.patch(
  "/:id/start",
  authenticate,
  authorize([Role.PERSONAL_SALUD]),
  appointmentsController.start
);

router.patch(
  "/:id/no-show",
  authenticate,
  authorize([Role.PERSONAL_SALUD]),
  appointmentsController.markNoShow
);

router.patch(
  "/:id/complete",
  authenticate,
  authorize([Role.PERSONAL_SALUD]),
  appointmentsController.complete
);

export default router;