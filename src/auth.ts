import { notLoggedInError, alreadyLoggedInError } from "./error-messages";

const signedIn = (req: any) => req.session.userId;

export const checkSignedIn = (req: any) => {
    if (!signedIn(req)) {
        throw notLoggedInError;
    }
};

export const checkSignedOut = (req: any) => {
   if (signedIn(req)) {
       throw alreadyLoggedInError;
   }
};
