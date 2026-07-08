export class EmailService {
  /**
   * Enviar un correo de bienvenida al usuario registrado utilizando Brevo.
   */
  async sendWelcomeEmail(to: string, name: string) {
    if (!process.env.BREVO_API_KEY) {
      console.warn("BREVO_API_KEY no está configurada. Saltando envío de correo.");
      return;
    }

    try {
      const response = await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: {
          "accept": "application/json",
          "api-key": process.env.BREVO_API_KEY,
          "content-type": "application/json",
        },
        body: JSON.stringify({
          sender: { name: "Plataforma de Vacunación", email: "crfigueroa2024@inf.udec.cl" },
          to: [{ email: to, name }],
          subject: "¡Bienvenido a la Plataforma de Vacunación!",
          htmlContent: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eaeaec; border-radius: 8px;">
              <h1 style="color: #2c3e50; text-align: center;">¡Hola, ${name}! 👋</h1>
              <p style="font-size: 16px; color: #555;">
                Nos alegra mucho tenerte con nosotros. Tu cuenta ha sido creada exitosamente.
              </p>
              <p style="font-size: 16px; color: #555;">
                A partir de ahora podrás agendar y revisar el estado de tus vacunas de manera rápida y segura.
              </p>
              <hr style="border: none; border-top: 1px solid #eaeaea; margin: 20px 0;" />
              <p style="font-size: 12px; color: #999; text-align: center;">
                Si no solicitaste este registro, por favor ignora este correo.
              </p>
            </div>
          `,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error desde Brevo:", errorData);
        return;
      }

      const data = await response.json();
      console.log("Correo enviado exitosamente con Brevo:", data);
      return data;
    } catch (error) {
      console.error("Error enviando correo de bienvenida:", error);
    }
  }
  /**
   * Enviar una notificación por correo.
   */
  async sendNotificationEmail(to: string, name: string, title: string, description: string) {
    if (!process.env.BREVO_API_KEY) {
      console.warn("BREVO_API_KEY no está configurada. Saltando envío de correo de notificación.");
      return;
    }

    try {
      const response = await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: {
          "accept": "application/json",
          "api-key": process.env.BREVO_API_KEY,
          "content-type": "application/json",
        },
        body: JSON.stringify({
          sender: { name: "Plataforma de Vacunación", email: "crfigueroa2024@inf.udec.cl" },
          to: [{ email: to, name }],
          subject: title,
          htmlContent: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eaeaec; border-radius: 8px;">
              <h1 style="color: #2c3e50; text-align: center;">Nueva Notificación</h1>
              <h2 style="color: #1565C0; text-align: center;">${title}</h2>
              <p style="font-size: 16px; color: #555;">Hola ${name}, tienes un nuevo aviso en el sistema:</p>
              <div style="background-color: #f5f5f5; padding: 15px; border-left: 4px solid #1565C0; margin-bottom: 20px;">
                <p style="font-size: 16px; color: #333; margin: 0;">${description}</p>
              </div>
              <p style="font-size: 14px; color: #555;">Ingresa a la plataforma para ver más detalles.</p>
              <hr style="border: none; border-top: 1px solid #eaeaea; margin: 20px 0;" />
              <p style="font-size: 12px; color: #999; text-align: center;">
                Este es un mensaje automático, por favor no respondas a este correo.
              </p>
            </div>
          `,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error desde Brevo (notificación):", errorData);
        return;
      }

      const data = await response.json();
      console.log("Correo de notificación enviado exitosamente con Brevo:", data);
      return data;
    } catch (error) {
      console.error("Error enviando correo de notificación:", error);
    }
  }
}

export default new EmailService();
