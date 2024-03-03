import { Request, Response } from "express";

import MailSender from "@src/mail-sender";
import userService from "@src/services/user-service";
import { generateToken } from "@src/utils/reset-password-utils";

const sendResetPasswordMail = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    const user = await userService.getByEmail(email);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const token = generateToken(email, `${process.env.PASSWORD_RESET_SECRET}`);

    const mailSender = MailSender(
      `${process.env.EMAIL_APP_ACCOUNT}`,
      `${process.env.EMAIL_APP_PASSWORD}`
    );

    const mailData = {
      from: "igorsrajer123@gmail.com",
      to: email,
      subject: "Password reset",
      html: `<b>Reset your password here:</b> <a href="http://localhost:3000/reset-password?token=${token}&email=${email}">password reset form<3</a>`,
    };

    mailSender.sendMail(mailData, (err: any) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      }

      return res.status(200).json({
        message: "Mail sent successfully!",
      });
    });

    // mailSender.close();
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};

export default { sendResetPasswordMail };
