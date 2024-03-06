import express, { Router } from "express";

import mailController from "@src/controllers/mail-controller";
import userMiddleware from "@src/middlewares/user-middleware";

export const router: Router = express.Router();

router.post(
  "/:email/reset-password",
  userMiddleware.checkUserNotFoundByEmail,
  mailController.sendResetPasswordMail
);
