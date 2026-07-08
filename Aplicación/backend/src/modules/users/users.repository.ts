import { Role } from "@prisma/client";
import prisma from "../../config/prisma.js";

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
      orderBy: {
        id: "asc",
      },
    });
  }

  async findById(id: number) {
    return prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  async findByEmail(email: string) {
    return prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  async create(data: CreateUserData) {
    return prisma.user.create({
      data,
    });
  }
}

export default new UsersRepository();