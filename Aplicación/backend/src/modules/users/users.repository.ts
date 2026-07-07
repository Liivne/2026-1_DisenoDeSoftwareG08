import prisma from "../../config/prisma.js";
import { Role } from "@prisma/client";

type CreateUserData = {
    rut: string;
    name: string;
    email: string;
    password: string;
    phone?: string;
    role?: Role;
};

export class UsersRepository {
    async findAll() {
        return prisma.user.findMany({
            orderBy: { id: "asc" },
            select: {
            id: true,
            rut: true,
            name: true,
            email: true,
            phone: true,
            role: true,
            createdAt: true,
            updatedAt: true,
            },
        });
    }

    async create(data: CreateUserData) {
        return prisma.user.create({
            data,
            select: {
            id: true,
            rut: true,
            name: true,
            email: true,
            phone: true,
            role: true,
            createdAt: true,
            updatedAt: true,
            },
        });
    }
}

export default new UsersRepository();