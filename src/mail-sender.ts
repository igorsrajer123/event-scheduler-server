const nodemailer = require("nodemailer");

const MailSender = (accountEmail: string, accountPassword: string) => {
  return nodemailer.createTransport({
    pool: true,
    port: 465,
    host: "smtp.gmail.com",
    secure: true,
    auth: {
      user: accountEmail,
      pass: accountPassword,
    },
  });
};

export default MailSender;
