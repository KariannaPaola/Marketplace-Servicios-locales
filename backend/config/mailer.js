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
console.log (process.env.SENDGRID_API_KEY)
const transporter = nodemailer.createTransport({
  host: 'smtp.sendgrid.net',
  port: 587,
  auth: {
    user: 'apikey',                 
    pass: process.env.SENDGRID_API_KEY
  }
});

export default transporter;