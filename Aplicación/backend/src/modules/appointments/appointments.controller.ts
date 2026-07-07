import { NextFunction, Request, Response } from "express";

import { UnauthorizedError } from "../../shared/errors/UnauthorizedError.js";
import appointmentsService from "./appointments.service.js";
import { asyncHandler } from "../../shared/utils/catchAsync.js";

export class AppointmentsController {
  getMyAppointments = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
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
  });

  create = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        throw new UnauthorizedError();
      }

      const appointment = await appointmentsService.createAppointment({
        userId: req.user.id,
        campaignId: req.body.campaignId,
        vaccinationPointId: req.body.vaccinationPointId,
        appointmentDate: req.body.appointmentDate,
      });

      res.status(201).json(appointment);
    } catch (error) {
      next(error);
    }
  });

  cancel = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        throw new UnauthorizedError();
      }

      const appointment = await appointmentsService.cancelAppointment(
        Number(req.params.id),
        req.user.id
      );

      res.json(appointment);
    } catch (error) {
      next(error);
    }
  });
}

export default new AppointmentsController();