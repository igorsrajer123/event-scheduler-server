import express, { Router } from "express";

import userController from "@src/controllers/user-controller";
import userMiddleware from "@src/middlewares/user-middleware";
import {
  addUserRequestSchema,
  resetPasswordRequestSchema,
  updatePasswordRequestSchema,
} from "@src/request-validators/user-requests-validators";

export const router: Router = express.Router();

router.get("/", userController.getAll);
router.get(
  "/:id",
  userMiddleware.checkUserNotFoundById,
  userController.getById
);
router.post(
  "/",
  userMiddleware.validateRequestSchema(addUserRequestSchema),
  userMiddleware.checkUserExistsByEmail,
  userController.addUser
);
router.patch(
  "/:email/password",
  userMiddleware.validateRequestSchema(updatePasswordRequestSchema),
  userMiddleware.checkUserNotFoundByEmail,
  userMiddleware.comparePasswords,
  userController.updatePassword
);
router.post(
  "/:email/reset-password",
  userMiddleware.validateRequestSchema(resetPasswordRequestSchema),
  userMiddleware.checkUserNotFoundByEmail,
  userController.resetPassword
);
