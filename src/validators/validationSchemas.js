import Joi from "joi";

const RegisterUserSchema = Joi.object({
  firstName: Joi.string().max(255).trim().required(),
  lastName: Joi.string().max(255).trim().required(),
  password: Joi.string()
    .min(8)
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    )
    .required(),
  otp: Joi.string().max(255).trim().required(),
  email: Joi.string().email().trim().required(),
  role: Joi.string().max(255).trim().required(),
  createAt: Joi.date().default(Date.now),
  lastUpdateAt: Joi.date().default(Date.now),
});

const OtpSchema = Joi.object({
  email: Joi.string().email().trim().required(),
  otp: Joi.string().optional(),
  createAt: Joi.date().default(Date.now),
  lastUpdateAt: Joi.date().default(Date.now),
});

const AuthenticateUserSchema = Joi.object({
  email: Joi.string().email().trim().required(),
  password: Joi.string()
    .min(8)
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    )
    .required(),
});

const ContactOurSupportSchema = Joi.object({
  fullName: Joi.string().email().trim().required(),
  email: Joi.string().email().trim().required(),
  message: Joi.string().email().trim().required(),
  createAt: Joi.date().default(Date.now),
});

const MailingListSchema = Joi.object({
  email: Joi.string().email().trim().required(),
  createAt: Joi.date().default(Date.now),
});

const ChangePasswordSchema = Joi.object({
  userId: Joi.string().email().trim().required(),
  oldPassword: Joi.string()
    .min(8)
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    )
    .required(),
  newPassword: Joi.string()
    .min(8)
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    )
    .required(),
});

const PasswordResetSchema = Joi.object({
  userId: Joi.string().email().trim().required(),
  resetString: Joi.string().email().trim().required(),
  newPassword: Joi.string()
    .min(8)
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    )
    .required(),
});

const RequestPasswordResetSchema = Joi.object({
  redirectUrl: Joi.string().email().trim().required(),
  email: Joi.string().email().trim().required(),
});

const SearchUserSchema = Joi.object({
  userId: Joi.string().email().trim().required(),
  searchKey: Joi.string().email().trim().required(),
});

export {
  RegisterUserSchema,
  OtpSchema,
  AuthenticateUserSchema,
  ContactOurSupportSchema,
  MailingListSchema,
  ChangePasswordSchema,
  PasswordResetSchema,
  RequestPasswordResetSchema,
  SearchUserSchema,
};
