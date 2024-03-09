import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import Joi from "joi";

import { User } from "@src/types/user-types";
import userService from "@src/services/user-service";

const bcrypt = require("bcrypt");

const validateRequestSchema = (schema: Joi.Schema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }

    next();
  };
};

const checkUserExistsByEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.body;

  const user: User | null = await userService.getByEmail(email);
  if (user) {
    return res
      .status(400)
      .send({ message: "User already exists. Please sign in." });
  }

  next();
};

const checkUserNotFoundByEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.body;

  const user = await userService.getByEmail(email);
  if (!user) {
    return res.status(404).send({ message: "User not found." });
  }

  res.locals.user = user;
  next();
};

const checkUserNotFoundById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid user ID." });
  }

  const user: User | null = await userService.getById(id);
  if (!user) {
    return res.status(404).send({ message: "User not found." });
  }

  res.locals.user = user;
  next();
};

//Refactor this function
const comparePasswords = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user: User = res.locals.user;
  const { newPassword, oldPassword } = req.body;

  const isOldPassValid = await bcrypt.compare(oldPassword, user.password);
  if (!isOldPassValid) {
    return res.status(400).json({ message: "Old password is incorrect." });
  }

  const isNewPassInvalid = await bcrypt.compare(newPassword, user.password);
  if (isNewPassInvalid) {
    return res.status(400).json({ message: "You entered an old password." });
  }

  next();
};

export default {
  validateRequestSchema,
  checkUserExistsByEmail,
  checkUserNotFoundById,
  checkUserNotFoundByEmail,
  comparePasswords,
};
