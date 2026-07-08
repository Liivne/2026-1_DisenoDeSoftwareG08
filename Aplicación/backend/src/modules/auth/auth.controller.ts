import { NextFunction, Request, Response } from "express";
import authService from "./auth.service.js";
import usersService from "../users/users.service.js";
import { asyncHandler } from "../../shared/utils/catchAsync.js";
import { Role } from "@prisma/client";

export class AuthController {
    login = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const { email, password } = req.body;

        const user = await authService.login(email, password);

        res.json(user);
    });

    register = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const { rut, name, email, password, phone } = req.body;
        const newUser = await usersService.createUser({
            rut,
            name,
            email,
            password,
            phone,
            role: Role.PACIENTE
        });

        const user = await authService.login(email, password);
        res.status(201).json(user);
    });
}

export default new AuthController();