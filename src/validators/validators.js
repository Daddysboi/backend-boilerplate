import {
  RegisterUserSchema,
  OtpSchema,
  AuthenticateUserSchema,
  ContactOurSupportSchema,
  MailingListSchema,
  ChangePasswordSchema,
  PasswordResetSchema,
  RequestPasswordResetSchema,
  SearchUserSchema,
} from "./validationSchemas.js";

async function RegisterUserValidationMW(req, res, next) {
  const userPayLoad = req.body;

  try {
    await RegisterUserSchema.validateAsync(userPayLoad, { abortEarly: false });

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
