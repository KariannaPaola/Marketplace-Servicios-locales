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

import sgMail from '@sendgrid/mail';

// Configura tu clave de API de SendGrid
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Función para enviar correos
const sendEmail = async ({ to, subject, html }) => {
  const msg = {
    to,
    from: process.env.MAIL_USER,
    subject,
    html,
  };

  try {
    await sgMail.send(msg);
    console.log('Correo enviado exitosamente');
  } catch (error) {
    console.error('Error al enviar el correo:', error);
    throw error; // importante para que el controlador capture el error
  }
};

export default sendEmail;

