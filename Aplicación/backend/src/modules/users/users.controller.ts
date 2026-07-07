import { NextFunction, Request, Response } from "express";
import usersService from "./users.service.js";

export class UsersController {
    async getAll(_req: Request, res: Response, next: NextFunction) {
        try {
            const users = await usersService.getUsers();
            res.json(users);
        } catch (error) {
            next(error);
        }
    }

    async create(req: Request, res: Response, next: NextFunction) {
    try {
        const user = await usersService.createUser(req.body);

        res.status(201).json(user);
    } catch (error) {
        next(error);
    }
}
}

export default new UsersController();