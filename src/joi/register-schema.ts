import * as Joi from "joi";

export const userCreateSchema = Joi.object({
  email: Joi.string().email().required(),
  firstName: Joi.string().max(100).required(),
  password: Joi.string()
    .regex(/(?=.*\d)(?=.*[A-Z])[A-Za-z\d]{8,30}/)
    .required(),
});
