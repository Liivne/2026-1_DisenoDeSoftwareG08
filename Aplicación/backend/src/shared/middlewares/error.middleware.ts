import { NextFunction, Request, Response } from "express";
import { Prisma } from "@prisma/client";
import { AppError } from "../errors/AppError.js";

export function errorHandler(
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  console.error(error);

  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      message: error.message,
    });
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === "P2002") {
      return res.status(409).json({
        message: "Ya existe un registro con ese valor único.",
      });
    }

    if (error.code === "P2025") {
      return res.status(404).json({
        message: "Registro no encontrado.",
      });
    }
  }

  return res.status(500).json({
    message: "Error interno del servidor.",
  });
}