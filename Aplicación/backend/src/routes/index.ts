import { Router } from "express";
import usersRoutes from "../modules/users/users.routes.js";
import authRoutes from "../modules/auth/auth.routes.js";
import appointmentsRoutes from "../modules/appointments/appointments.routes.js";
import vaccinesRoutes from "../modules/vaccines/vaccines.routes.js";
import campaignsRoutes from "../modules/campaigns/campaigns.routes.js";

const router = Router();

router.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

router.use("/users", usersRoutes);
router.use("/auth", authRoutes);
router.use("/appointments", appointmentsRoutes);
router.use("/vaccines", vaccinesRoutes);
router.use("/campaigns", campaignsRoutes);

export default router;