import { Request, Response } from "express";
import { asyncHandler } from "../../shared/utils/catchAsync.js";
import emailService from "../../shared/services/email.service.js";

export class NotificationsController {
  sendEmail = asyncHandler(async (req: Request, res: Response) => {
    const { userEmail, userName, title, description } = req.body;

    if (!userEmail || !title || !description) {
      res.status(400).json({ message: "Faltan datos requeridos (userEmail, title, description)." });
      return;
    }

    try {
      const name = userName || "Usuario";

      // Enviamos el correo de forma asíncrona
      emailService.sendNotificationEmail(userEmail, name, title, description);
      
      res.status(200).json({ message: "Notificación procesada y correo enviado exitosamente." });
    } catch (error) {
      console.error("Error al procesar la notificación de correo:", error);
      res.status(500).json({ message: "Error interno del servidor." });
    }
  });
}

export default new NotificationsController();
