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
    });
  }

  async create(data: CreateUserData) {
    return prisma.user.create({
      data,
    });
  }

  async findByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email },
    });
  }

  async findById(id: number) {
    return prisma.user.findUnique({
      where: { id },
    });
  }
}

export default new UsersRepository();