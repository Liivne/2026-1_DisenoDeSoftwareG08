import { NextFunction, Request, Response } from "express";
import usersService from "./users.service.js";
import { asyncHandler } from "../../shared/utils/catchAsync.js";

export class UsersController {
    getAll = asyncHandler(async (_req: Request, res: Response) => {
        const users = await usersService.getUsers();

        res.json(users);
    });
    
    create = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user = await usersService.createUser(req.body);

            res.status(201).json(user);
        } catch (error) {
        next(error);
        }
    });
}

export default new UsersController();