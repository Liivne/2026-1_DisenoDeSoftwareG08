import { Router } from "express";
import usersController from "./users.controller.js";
import { validate } from "../../shared/middlewares/validation.middleware.js";
import { createUserSchema } from "./users.schema.js";

const router = Router();

router.get("/", usersController.getAll);

router.post(
  "/",
  validate(createUserSchema),
  usersController.create
);

export default router;