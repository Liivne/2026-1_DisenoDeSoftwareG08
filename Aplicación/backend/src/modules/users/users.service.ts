import bcrypt from "bcrypt";
import usersRepository from "./users.repository.js";
import { Role } from "@prisma/client";

type CreateUserInput = {
    rut: string;
    name: string;
    email: string;
    password: string;
    phone?: string;
    role?: Role;
};

export class UsersService {
    async getUsers() {
        return usersRepository.findAll();
    }

    async createUser(data: CreateUserInput) {
        const hashedPassword = await bcrypt.hash(data.password, 10);

        return usersRepository.create({
        ...data,
        password: hashedPassword,
        });
    }
}

export default new UsersService();