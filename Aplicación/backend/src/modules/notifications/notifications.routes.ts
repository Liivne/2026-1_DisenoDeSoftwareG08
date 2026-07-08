import { Router } from "express";
import notificationsController from "./notifications.controller.js";

const router = Router();

router.post("/send-email", notificationsController.sendEmail);

export default router;
