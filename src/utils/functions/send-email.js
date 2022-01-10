const nodemailer = require("nodemailer");

function sendEmail(email, text) {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_HOST,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  return transporter.sendMail({
    from: '<noreply@twitter-clone.com>',
    to: `${email}`,
    subject: "Password Reset Link",
    text: `${text}`,
  });
} 

module.exports = sendEmail;