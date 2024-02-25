import * as Joi from "joi";

export const userCreateSchema = Joi.object()
  .keys({
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required()
      .messages({
        "string.email": "email|The email is incorrect",
        "string.empty": "email|The email is empty.",
      }),
    firstName: Joi.string().min(2).max(30).required().messages({
      "string.empty": "name|The name is empty.",
      "string.min": "name|The name cannot be less than 2 characters",
      "string.max": "name|The name cannot be more than 30 characters",
    }),
    password: Joi.string()
      .regex(/(?=.*\d)(?=.*[A-Z])[A-Za-z\d]{8,30}/)
      .required()
      .messages({
        "string.empty": "password|The password is empty.",
        "string.pattern.base":
          "password|Password may have a minimum of 8 characters, including at least one capital letter and one number",
      }),
  })
  .options({ stripUnknown: true });

export const userLoginSchema = Joi.object()
  .keys({
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required()
      .messages({
        "string.email": "email|The email is incorrect",
        "string.empty": "email|The email is empty.",
      }),
    password: Joi.string().min(8).required().messages({
      "string.empty": "password|The password is empty.",
      "string.min": "password|The password cannot be less than 8 characters",
    }),
  })
  .options({ stripUnknown: true });

export const userEmailSchema = Joi.object()
  .keys({
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required()
      .messages({
        "string.email": "email|The email is incorrect",
        "string.empty": "email|The email is empty.",
      }),
  })
  .options({ stripUnknown: true });

export const userCodeSchema = Joi.object().keys({
  code: Joi.string().min(2).max(30).required().messages({
    "string.empty": "code|The code is empty.",
    "string.min": "code|The code cannot be less than 1 characters",
    "string.max": "code|The code cannot be more than 10 characters",
  }),
});

export const userResetPassSchema = Joi.object()
  .keys({
    code: Joi.string().min(2).max(30).required().messages({
      "string.empty": "code|The code is empty.",
      "string.min": "code|The code cannot be less than 1 characters",
      "string.max": "code|The code cannot be more than 10 characters",
    }),
    password: Joi.string()
      .regex(/(?=.*\d)(?=.*[A-Z])[A-Za-z\d]{8,30}/)
      .required()
      .messages({
        "string.empty": "password|The password is empty.",
        "string.pattern.base":
          "password|Password may have a minimum of 8 characters, including at least one capital letter and one number",
      }),
  })
  .options({ stripUnknown: true });
