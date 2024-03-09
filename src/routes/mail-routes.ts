import express, { Router } from "express";

import mailController from "@src/controllers/mail-controller";
import userMiddleware from "@src/middlewares/user-middleware";

export const router: Router = express.Router();

router.post(
  "/:id/password-reset",
  userMiddleware.checkUserNotFoundById,
  mailController.sendResetPasswordMail
);
