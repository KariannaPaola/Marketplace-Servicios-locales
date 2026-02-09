/**
 * Configuración del transporter de Nodemailer para el envío de correos electrónicos.
 *
 * Este módulo:
 * - Crea un transporter usando Nodemailer
 * - Utiliza variables de entorno para la configuración del servidor SMTP
 * - Permite enviar correos electrónicos desde la aplicación
 *
 * Requiere las siguientes variables de entorno:
 * - MAIL_HOST: Host del servidor SMTP
 * - MAIL_PORT: Puerto del servidor SMTP
 * - MAIL_USER: Usuario del correo
 * - MAIL_PASS: Contraseña del correo
 *
 * Uso típico:
 *   import transporterEmail from "./mailer.js";
 *   transporterEmail.sendMail({ ... });
 *
 * @module transporterEmail
 */


import nodemailer from 'nodemailer';

const transporterEmail = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: Number(process.env.MAIL_PORT),
  secure: false, 
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
});

export default transporterEmail;