import Joi from "joi";

export const loginRequestSchema = Joi.object({
  email: Joi.string().required().email(),
  password: Joi.string().min(8).trim().required(),
});
