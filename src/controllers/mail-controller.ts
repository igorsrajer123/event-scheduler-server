import { Request, Response } from "express";

import MailSender from "@src/mail-sender";
import { User } from "@src/types/user-types";
import { generateToken } from "@src/utils/reset-password-utils";

//minutes
const TOKEN_EXPIRES_IN = 5;

const sendResetPasswordMail = async (_req: Request, res: Response) => {
  try {
    const user: User = res.locals.user;

    const token = generateToken(
      user.email,
      `${process.env.PASSWORD_RESET_SECRET}`,
      TOKEN_EXPIRES_IN
    );

    const mailSender = MailSender(
      `${process.env.EMAIL_APP_ACCOUNT}`,
      `${process.env.EMAIL_APP_PASSWORD}`
    );

    const mailData = {
      from: `${process.env.EMAIL_APP_ACCOUNT}`,
      to: user.email,
      subject: "Password reset",
      html: `<b>Reset your password here:</b> <a href="http://localhost:3000/reset-password?token=${token}&email=${user.email}">password reset form<3</a>`,
    };

    mailSender.sendMail(mailData, (err: any) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      }

      return res.status(200).json({
        message: "Mail sent successfully!",
      });
    });
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};

export default { sendResetPasswordMail };
