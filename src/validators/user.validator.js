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
  resetCode: Joi.string(),
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

export const passwordEmailValidator = Joi.object({
  email: Joi.string()
    .required()
    .email()
    .messages({ "any.required": "email field cannot be empty" }),
});

export const verifyCode = Joi.object({
  resetCode: Joi.string().required().min(4).max(4).messages({
    "any.required": "the reset code field cannot be empty",
    "string.min": "code cannot be less than 4",
    "string.max": "code cannot be more than 4",
  }),
});

export const verifyPasswordField = Joi.object({
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
});

export const covertToFavourite = Joi.object({
  sentence: Joi.string().required().messages({
    "any.required": "The sentence field cannot be left empty",
  }),
  option: Joi.string().required().messages({
    "any.required": "The option field cannot be left empty",
  }),
});
export const signLanguageOption = Joi.object({
  sentence: Joi.string().required().messages({
    "any.required": "The sentence field cannot be left empty",
  }),
  option: Joi.string().required().messages({
    "any.required": "The option field cannot be left empty",
  }),
  country: Joi.string().required().messages({
    "any.required": "The country field cannot be left empty",
  }),
});

