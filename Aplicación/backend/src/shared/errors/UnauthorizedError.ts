import { AppError } from "./AppError.js";

export class UnauthorizedError extends AppError {
  constructor(message = "No autenticado.") {
    super(message, 401);
  }
}