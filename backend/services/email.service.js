/**
 * Utilidad para el envío de correos electrónicos.
 *
 * Este módulo centraliza el envío de emails utilizando un transporter
 * previamente configurado (Nodemailer).
 *
 * Se utiliza para notificaciones automáticas del sistema, tales como:
 * - Confirmaciones de acciones
 * - Alertas
 * - Comunicaciones transaccionales
 *
 * El remitente se define automáticamente usando la variable de entorno `MAIL_USER`.
 *
 * @module SendEmail
 */

import transporterEmail from '../config/mailer.js';

const sendEmail = async ({ to, subject, html }) => {
  await transporterEmail.sendMail({
    from: `"ServiYa" <${process.env.MAIL_USER}>`,
    to,
    subject,
    html
  });
};

export default sendEmail;