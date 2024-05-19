import Joi from "joi";

const name = Joi.string().max(255).trim().required();
const email = Joi.string().email().trim().required();
const password = Joi.string()
  .min(8)
  .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
  .required();

const RegisterUserSchema = Joi.object({
  firstName: name,
  lastName: name,
  password: password,
  otp: name,
  email: email,
  role: name,
  createAt: Joi.date().default(Date.now),
  lastUpdateAt: Joi.date().default(Date.now),
});

const OtpSchema = Joi.object({
  email: name,
  otp: Joi.string().optional(),
  createAt: Joi.date().default(Date.now),
  lastUpdateAt: Joi.date().default(Date.now),
});

const AuthenticateUserSchema = Joi.object({
  email: email,
  password: password,
});

const ContactOurSupportSchema = Joi.object({
  fullName: name,
  email: email,
  message: name,
  createAt: Joi.date().default(Date.now),
});

const MailingListSchema = Joi.object({
  email: email,
  createAt: Joi.date().default(Date.now),
});

const ChangePasswordSchema = Joi.object({
  userId: name,
  oldPassword: password,
  newPassword: password,
});

const PasswordResetSchema = Joi.object({
  userId: name,
  resetString: name,
  newPassword: password,
});

const RequestPasswordResetSchema = Joi.object({
  redirectUrl: name,
  email: email,
});

const SearchUserSchema = Joi.object({
  userId: name,
  searchKey: name,
});

async function RegisterUserValidationMW(req, res, next) {
  const userPayLoad = req.body;

  try {
    await RegisterUserSchema.validateAsync(userPayLoad);
    next();
  } catch (error) {
    next({
      message: error.details[0].message,
      status: 400,
    });
  }
}

async function AuthenticateUserValidationMW(req, res, next) {
  const userPayLoad = req.body;

  try {
    await AuthenticateUserSchema.validateAsync(userPayLoad);
    next();
  } catch (error) {
    next({
      message: error.details[0].message,
      status: 400,
    });
  }
}

async function ChangePasswordValidationMW(req, res, next) {
  const userPayLoad = req.body;

  try {
    await ChangePasswordSchema.validateAsync(userPayLoad);
    next();
  } catch (error) {
    next({
      message: error.details[0].message,
      status: 400,
    });
  }
}

async function OtpValidationMW(req, res, next) {
  const userPayLoad = req.body;

  try {
    await OtpSchema.validateAsync(userPayLoad);
    next();
  } catch (error) {
    next({
      message: error.details[0].message,
      status: 400,
    });
  }
}

async function MailingListValidationMW(req, res, next) {
  const mailListPayLoad = req.body;
  try {
    await MailingListSchema.validateAsync(mailListPayLoad);
    next();
  } catch (error) {
    next({
      message: error.details[0].message,
      status: 400,
    });
  }
}

async function RequestPasswordResetMW(req, res, next) {
  const userPayLoad = req.body;

  try {
    await RequestPasswordResetSchema.validateAsync(userPayLoad);
    next();
  } catch (error) {
    next({
      message: error.details[0].message,
      status: 400,
    });
  }
}

async function PasswordResetMW(req, res, next) {
  const userPayLoad = req.body;

  try {
    await PasswordResetSchema.validateAsync(userPayLoad);
    next();
  } catch (error) {
    next({
      message: error.details[0].message,
      status: 400,
    });
  }
}

async function ContactOurSupportMW(req, res, next) {
  const contactOurSupportPayLoad = req.body;
  try {
    await ContactOurSupportSchema.validateAsync(contactOurSupportPayLoad);
    next();
  } catch (error) {
    next({
      message: error.details[0].message,
      status: 400,
    });
  }
}

async function SearchUserValidationMW(req, res, next) {
  const searchPayload = { searchKey: req.query.query };

  try {
    await SearchUserSchema.validateAsync(searchPayload);
    next();
  } catch (error) {
    next({
      message: error.details[0].message,
      status: 400,
    });
  }
}

export {
  RegisterUserValidationMW,
  OtpValidationMW,
  RequestPasswordResetMW,
  PasswordResetMW,
  ChangePasswordValidationMW,
  AuthenticateUserValidationMW,
  MailingListValidationMW,
  ContactOurSupportMW,
  SearchUserValidationMW,
};
