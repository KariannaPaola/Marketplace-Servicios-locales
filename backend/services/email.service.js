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