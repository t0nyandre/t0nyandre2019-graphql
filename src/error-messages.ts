import { User } from "./entity/User";

export const verificationEmailNotSentError = (user: User) => {
  const error = {
    errors: [
      {
        message: "user registered but email could not be sent",
        path: "register",
      },
    ],
    user,
  };
  return error;
};

export const notLoggedInError = {
  errors: [
    {
      message: "you are not logged in",
      path: "me",
    },
  ],
  user: undefined,
};

export const userNotExistError = {
  errors: [
    {
      message: "user not exist",
    },
  ],
  user: undefined,
};

export const accountAlreadyVerifiedError = {
  errors: [
    {
      message: "account already verified",
      path: "verify",
    },
  ],
};

export const invalidVerificationToken = {
  errors: [
    {
      message: "invalid verification token",
      path: "verify",
    },
  ],
};

export const accountNotVerifiedError = {
  errors: [
    {
      message: "account not verified. please check your email",
      path: "login",
    },
  ],
  user: undefined,
};
