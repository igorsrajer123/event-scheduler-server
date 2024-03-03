import express, { Router } from "express";

import userController from "@src/controllers/user-controller";
import userMiddleware from "@src/middlewares/user-middleware";

export const router: Router = express.Router();

router.get("/", userController.getAll);
router.get("/:id", userController.getById);
router.post(
  "/",
  userMiddleware.validateAddUserSchema,
  userMiddleware.userAlreadyExistsValidation,
  userController.addUser
);
router.patch(
  "/:id/password",
  userMiddleware.updatePasswordValidation,
  userController.updatePassword
);
router.post("/reset-password", userController.resetPassword);
