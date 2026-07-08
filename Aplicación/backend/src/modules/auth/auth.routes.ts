import { Router } from "express";
import authController from "./auth.controller.js";
import { validate } from "../../shared/middlewares/validation.middleware.js";
import { loginSchema, registerSchema } from "./auth.schema.js";

const router = Router();

router.post("/login", validate(loginSchema), authController.login);
router.post("/register", validate(registerSchema), authController.register);

export default router;