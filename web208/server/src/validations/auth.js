import Joi from "joi";

const registerValidator = Joi.object({
  username: Joi.string().min(3).max(50).required().messages({
    "any.required": "Username thieu roi",
    "string.min": "Username phai nhieu hon 3 ky tu",
    "string.max": "Username khong duoc qua 50 ky tu", 
  }),
  email: Joi.string().email().required().messages({
    "string.email": "Ko dung dinh dang email",
    "any.required": "Email thieu roi",
  }),
  password: Joi.string().required(),
  confirmPassword: Joi.string().valid(Joi.ref('password')).required().messages({
    "any.only": "Password va Confirm Password phai khop",
    "any.required": "Confirm Password thieu roi",
  }),
}).options({
  abortEarly: false,
});

const loginValidator = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
}).options({
  abortEarly: false,
});

export { registerValidator, loginValidator };