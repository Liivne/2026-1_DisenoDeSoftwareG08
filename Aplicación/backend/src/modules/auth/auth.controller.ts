import { Request, Response } from "express";
import { Role } from "@prisma/client";

import authService from "./auth.service.js";
import usersService from "../users/users.service.js";
import { asyncHandler } from "../../shared/utils/catchAsync.js";

export class AuthController {
  login = asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = await authService.login(email, password);

    res.json(user);
  });

  register = asyncHandler(async (req: Request, res: Response) => {
    const { rut, name, email, password, phone } = req.body;

    await usersService.createUser({
      rut,
      name,
      email,
      password,
      phone,
      role: Role.PACIENTE,
    });

    const user = await authService.login(email, password);

    res.status(201).json(user);
  });
}

export default new AuthController();