import Joi from "joi";

export const addUserSchema = Joi.object({
  email: Joi.string().required().email(),
  password: Joi.string().min(8).required(),
  fullName: Joi.string().min(3).required(),
  phoneNumber: Joi.string().required(),
});

export const updatePasswordSchema = Joi.object({
  oldPassword: Joi.string().min(8).required(),
  newPassword: Joi.string().min(8).required(),
});

export const resetPasswordSchema = Joi.object({
  email: Joi.string().required().email(),
  password: Joi.string().min(8).required(),
  token: Joi.string().required(),
});
