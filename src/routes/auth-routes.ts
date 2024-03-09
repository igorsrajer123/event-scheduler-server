import express, { Router } from "express";

import { loginRequestSchema } from "@src/request-validators/auth-requests-validators";
import authController from "@src/controllers/auth-controller";
import userMiddleware from "@src/middlewares/user-middleware";
import authMiddleware from "@src/middlewares/auth-middleware";

export const router: Router = express.Router();

router.post(
  "/signin",
  userMiddleware.validateRequestSchema(loginRequestSchema),
  userMiddleware.checkUserNotFoundByEmail,
  authController.signIn
);
router.post("/refresh-access-token", authController.refreshAccessToken);
router.get("/me", authMiddleware.authenticateToken, authController.me);
router.post(
  "/signout",
  authMiddleware.authenticateToken,
  authController.signOut
);
