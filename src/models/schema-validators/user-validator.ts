import Joi from "joi";

import User from "@src/models/user-model";

export const validateUser = (user: typeof User) => {
  const schema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().min(8).required(),
    fullName: Joi.string().min(3).required(),
    phoneNumber: Joi.string().required(),
  });
  return schema.validate(user);
};
