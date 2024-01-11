import * as Joi from "joi";

export const userCreateSchema = Joi.object()
  .keys({
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .message("email|The email is incorrect or empty.")
      .required(),
    firstName: Joi.string()
      .max(100)
      .message("name|The name is incorrect or empty.")
      .required(),
    password: Joi.string()
      .regex(/(?=.*\d)(?=.*[A-Z])[A-Za-z\d]{8,30}/)
      .message(
        "password|Password may have a minimum of 8 characters, including at least one capital letter and one number",
      )
      .required(),
  })
  .options({ stripUnknown: true });

export const userLoginSchema = Joi.object()
  .keys({
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .message("email|The email is incorrect or empty.")
      .required(),
    password: Joi.string()
      .min(8)
      .message("password|Password is incorrect or empty.")
      .required(),
  })
  .options({ stripUnknown: true });
