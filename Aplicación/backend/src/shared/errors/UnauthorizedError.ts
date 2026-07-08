import { AppError } from "./AppError.js";

export class UnauthorizedError extends AppError {
  constructor(message = "Credenciales inválidas.") {
    super(message, 401);
  }
}