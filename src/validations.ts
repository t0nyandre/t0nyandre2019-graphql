import * as Joi from "joi";

const username = Joi.string()
    .min(3)
    .max(25)
    .regex(/^[a-zA-Z][a-zA-Z0-9]*[_-]?[a-zA-Z0-9]*$/)
    .trim()
    .label("username").options({
        language: {
            string: {
                regex: {
                    base: "has to start with a letter, contain letters and numbers and can only seperate a\
 word with - or _ once",
                },
                invalid: {
                    base: "username exist",
                },
            },
        },
    });

const email = Joi.string()
    .email()
    .trim()
    .required();

const password = Joi.string()
    .min(6)
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/)
    .trim()
    .required()
    .label("password").options({
        language: {
            string: {
                regex: {
                    base: "has to consist of at least one uppercase and lowercase character, one number and a\
 special character",
                },
            },
        },
    });

export const registerValidation = Joi.object().keys({
    username,
    email,
    password,
});
