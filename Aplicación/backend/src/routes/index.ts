import { Router } from "express";
import usersRoutes from "../modules/users/users.routes.js";

const router = Router();

router.get("/health", (_req, res) => {
    res.json({ status: "ok" });
});

router.use("/users", usersRoutes);

export default router;