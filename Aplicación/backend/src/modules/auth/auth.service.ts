import bcrypt from "bcrypt";
import authRepository from "./auth.repository.js";

import { UnauthorizedError } from "../../shared/errors/UnauthorizedError.js";
import { generateAccessToken } from "../../shared/utils/jwt.js";

export class AuthService {
  async login(email: string, password: string) {
    const user = await authRepository.findUserByEmail(email);

    if (!user) {
      throw new UnauthorizedError();
    }

    const passwordMatch = await bcrypt.compare(
      password,
      user.password
    );

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
        user: {
            id: user.id,
            rut: user.rut,
            name: user.name,
            email: user.email,
            phone: user.phone,
            role: user.role,
        },
    };
  }
}

export default new AuthService();