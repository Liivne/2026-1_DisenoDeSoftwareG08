import { Router } from "express";
import appointmentsController from "./appointments.controller.js";
import { authenticate } from "../../shared/middlewares/authenticate.middleware.js";

const router = Router();

router.get(
  "/my",
  authenticate,
  appointmentsController.getMyAppointments
);

export default router;