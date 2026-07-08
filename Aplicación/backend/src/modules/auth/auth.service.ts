import bcrypt from "bcrypt";

import { UnauthorizedError } from "../../shared/errors/UnauthorizedError.js";
import { generateAccessToken } from "../../shared/utils/jwt.js";

import authRepository from "./auth.repository.js";
import { toUserResponse } from "../users/mappers/user.mapper.js";

export class AuthService {
  async login(email: string, password: string) {
    const user = await authRepository.findUserByEmail(email);

    if (!user) {
      throw new UnauthorizedError();
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new UnauthorizedError();
    }

    const accessToken = generateAccessToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    return {
      accessToken,
      user: toUserResponse(user),
    };
  }
}

export default new AuthService();