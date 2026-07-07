import { NextFunction, Request, Response } from "express";
import { JwtPayload as JsonWebTokenPayload } from "jsonwebtoken";
import { Role } from "@prisma/client";

import { UnauthorizedError } from "../errors/UnauthorizedError.js";
import { verifyAccessToken } from "../utils/jwt.js";

type AccessTokenPayload = JsonWebTokenPayload & {
  id: number;
  email: string;
  role: Role;
};

export function authenticate(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(new UnauthorizedError("Token no proporcionado."));
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = verifyAccessToken(token) as AccessTokenPayload;

    req.user = {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role,
    };

    next();
  } catch {
    next(new UnauthorizedError("Token inválido o expirado."));
  }
}