import { NextFunction, Request, Response } from "express";
import { Role } from "@prisma/client";

import { ForbiddenError } from "../errors/ForbiddenError.js";

export function authorize(allowedRoles: Role[]) {
  return (
    req: Request,
    _res: Response,
    next: NextFunction
  ) => {
    if (!req.user) {
      return next(new ForbiddenError());
    }

    if (!allowedRoles.includes(req.user.role)) {
      return next(
        new ForbiddenError(
          "No tienes permisos para acceder a este recurso."
        )
      );
    }

    next();
  };
}