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

router.patch(
  "/:id/cancel",
  authenticate,
  authorize([Role.PACIENTE]),
  appointmentsController.cancel
);

export default router;