import { Router } from "express";
import usersRoutes from "../modules/users/users.routes.js";
import authRoutes from "../modules/auth/auth.routes.js";
import appointmentsRoutes from "../modules/appointments/appointments.routes.js";

const router = Router();

router.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

router.use("/users", usersRoutes);
router.use("/auth", authRoutes);
router.use("/appointments", appointmentsRoutes);

export default router;