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
const sendEmail = async (to, subject, html) => {
  const msg = {
    to, // Dirección de destino
    from: process.env.MAIL_USER, // Correo verificado en SendGrid
    subject, // Asunto del correo
    html, // Cuerpo del correo en HTML
  };

  try {
    // Enviar el correo usando la API de SendGrid
    await sgMail.send(msg);
    console.log('Correo enviado exitosamente');
  } catch (error) {
    console.error('Error al enviar el correo:', error);
  }
};

export default sendEmail;

