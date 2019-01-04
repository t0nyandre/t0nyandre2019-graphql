import { notLoggedInError, alreadyLoggedInError } from "./error-messages";

const loggedIn = (req: any) => req.session.userId;

export const ensureLoggedIn = (req: any) => {
    if (!loggedIn(req)) {
        throw notLoggedInError();
    }
};

export const ensureLoggedOut = (req: any) => {
   if (loggedIn(req)) {
       throw alreadyLoggedInError();
   }
};
