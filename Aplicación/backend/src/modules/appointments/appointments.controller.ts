import { NextFunction, Request, Response } from "express";
import appointmentsService from "./appointments.service.js";
import { UnauthorizedError } from "../../shared/errors/UnauthorizedError.js";

export class AppointmentsController {
  async getMyAppointments(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      if (!req.user) {
        throw new UnauthorizedError();
      }

      const appointments = await appointmentsService.getMyAppointments(
        req.user.id
      );

      res.json(appointments);
    } catch (error) {
      next(error);
    }
  }
}

export default new AppointmentsController();