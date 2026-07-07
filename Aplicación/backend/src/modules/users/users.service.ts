import bcrypt from "bcrypt";
import { Role } from "@prisma/client";

import usersRepository from "./users.repository.js";
import { toUserResponse } from "./mappers/user.mapper.js";

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
    const users = await usersRepository.findAll();

    return users.map(toUserResponse);
  }

  async createUser(data: CreateUserInput) {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await usersRepository.create({
      ...data,
      password: hashedPassword,
    });

    return toUserResponse(user);
  }
}

export default new UsersService();