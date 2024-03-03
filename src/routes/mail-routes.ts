import express, { Router } from "express";

import mailController from "@src/controllers/mail-controller";

export const router: Router = express.Router();

router.post("/reset-password", mailController.sendResetPasswordMail);
