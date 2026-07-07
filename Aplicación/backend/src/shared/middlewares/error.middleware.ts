import { NextFunction, Request, Response } from "express";
import { Prisma } from "@prisma/client";

export function errorHandler(
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  console.error(error);

  // Error de Prisma
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case "P2002":
        return res.status(409).json({
          message: "Ya existe un registro con ese valor único.",
        });

      case "P2025":
        return res.status(404).json({
          message: "Registro no encontrado.",
        });
    }
  }

  // Error genérico
  return res.status(500).json({
    message: "Error interno del servidor.",
  });
}