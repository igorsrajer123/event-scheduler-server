import Joi from "joi";

export const addUserRequestSchema = Joi.object({
  email: Joi.string().required().email(),
  password: Joi.string().min(8).trim().required(),
  fullName: Joi.string().min(3).trim().required(),
  phoneNumber: Joi.string().trim().required(),
});

export const updatePasswordRequestSchema = Joi.object({
  oldPassword: Joi.string().min(8).trim().required(),
  newPassword: Joi.string().min(8).trim().required(),
});

export const resetPasswordRequestSchema = Joi.object({
  password: Joi.string().min(8).trim().required(),
  token: Joi.string().trim().required(),
});