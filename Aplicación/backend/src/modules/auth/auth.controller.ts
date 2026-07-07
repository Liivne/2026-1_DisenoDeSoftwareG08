import { NextFunction, Request, Response } from "express";
import authService from "./auth.service.js";

export class AuthController {
    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body;

            const user = await authService.login(email, password);

            res.json(user);
        } catch (error) {
            next(error);
        }
    }
}

export default new AuthController();