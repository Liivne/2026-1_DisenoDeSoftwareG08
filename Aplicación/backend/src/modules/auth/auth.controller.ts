import { NextFunction, Request, Response } from "express";
import authService from "./auth.service.js";
import { asyncHandler } from "../../shared/utils/catchAsync.js";

export class AuthController {
    login = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const { email, password } = req.body;

            const user = await authService.login(email, password);

        res.json(user);
    });
}

export default new AuthController();