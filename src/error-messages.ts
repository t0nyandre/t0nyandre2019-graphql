import { AuthenticationError, ApolloError } from "apollo-server-express";

export const verificationEmailNotSentError = () => {
  return new ApolloError(
    "successfully signed up but verification email could not be sent",
    "VERIFICATION_EMAIL_NOT_SENT",
  );
};

export const notLoggedInError = () => {
  return new AuthenticationError("you are not logged in");
};

export const invalidLoginError = () => {
  return new AuthenticationError("password invalid");
};

export const userNotExistError = () => {
  return new ApolloError("user does not exist", "USER_NOT_EXIST");
};

export const postNotExist = () => {
  return new ApolloError("post does not exist", "POST_NOT_EXIST");
};

export const usernameTakenError = () => {
  return new ApolloError("username already taken", "USERNAME_TAKEN");
};

export const alreadyLoggedInError = () => {
  return new ApolloError("you are already logged in", "ALREADY_LOGGED_IN");
};

export const emailExistError = () => {
  return new ApolloError("email already exist in our database", "EMAIL_EXIST");
};

export const accountAlreadyVerifiedError = () => {
  return new ApolloError(
    "account already verified",
    "ACCOUNT_ALREADY_VERIFIED",
  );
};

export const invalidTokenError = () => {
  return new ApolloError(
    "invalid token",
    "INVALID_TOKEN",
  );
};

export const accountNotVerifiedError = () => {
  return new AuthenticationError("account not verified. please check your email or request a new verification code");
};
