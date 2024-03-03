import { NextFunction, Request, Response } from "express";

import {
  addUserSchema,
  resetPasswordSchema,
} from "@src/request-validators/user-schema-validators";
import userService from "@src/services/user-service";

const bcrypt = require("bcrypt");

const validateAddUserSchema = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = addUserSchema.validate(req.body);

  if (error) {
    return res.status(400).send({ message: error.details[0].message });
  }

  next();
};

const userAlreadyExistsValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.body;
  const user = await userService.getByEmail(email);

  if (user) {
    return res
      .status(400)
      .send({ message: "User already exisits. Please sign in" });
  }

  next();
};

const updatePasswordValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const { newPassword, oldPassword } = req.body;

  const user = await userService.getById(id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const isMatch = await bcrypt.compare(oldPassword, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Old password is incorrect" });
  }

  if (oldPassword === newPassword) {
    return res.status(400).json({ message: "You entered an old password" });
  }

  next();
};

const resetPasswordValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = resetPasswordSchema.validate(req.body);

  if (error) {
    return res.status(400).send({ message: error.details[0].message });
  }

  const { email } = req.body;

  const user = await userService.getByEmail(email);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  next();
};

export default {
  validateAddUserSchema,
  userAlreadyExistsValidation,
  updatePasswordValidation,
  resetPasswordValidation,
};
