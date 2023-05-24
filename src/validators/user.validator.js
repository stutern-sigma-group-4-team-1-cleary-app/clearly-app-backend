import Joi from "joi";

export const createUserValidator = Joi.object({
  fullName: Joi.string().required(),
  email: Joi.string()
    .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
    .required()
    .messages({
      "string.pattern.base": "Email is not a valid email address",
    }),
  password: Joi.string()
    .regex(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/
    )
    .required()
    .messages({
      "string.pattern.base":
        "Your password must contain at least one digit, one lowercase letter, one uppercase letter, and one special character. it should be at least 8 characters long",
    }),
  confirmPassword: Joi.string().required().valid(Joi.ref("password")).messages({
    "any.only": "Confirm password must be the same as the password",
  }),
  phoneNumber: Joi.string()
    .required()
    .pattern(/^[0-9]{10}$/)
    .messages({
      "string.pattern.base": "Phone number must consist of 10 digit",
    }),
  resetCode: Joi.string().required(),
}).strict();

export const loginValidator = Joi.object({
  email: Joi.string()
    .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
    .required()
    .messages({
      "string.pattern.base": "Email is not a valid email address",
    }),
  password: Joi.string().required(),
}).strict();
