import { Router } from "express";
import usersController from "./users.controller.js";
import { validate } from "../../shared/middlewares/validation.middleware.js";
import { createUserSchema } from "./users.schema.js";
import { authenticate } from "../../shared/middlewares/authenticate.middleware.js";
import { Role } from "@prisma/client/wasm.js";
import { authorize } from "../../shared/middlewares/authorize.middleware.js";

const router = Router();

router.get(
    "/",
    authenticate,
    authorize([Role.ADMINISTRADOR]),
    usersController.getAll);

router.post(
    "/",
    authenticate,
    authorize([Role.ADMINISTRADOR]),
    validate(createUserSchema),
    usersController.create
);

export default router;