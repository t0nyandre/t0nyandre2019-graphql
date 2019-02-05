import { serverURL } from "../../../config/defaults";
import { User } from "../../models/user";

// tslint:disable-next-line
require("dotenv").config();

export const forgotPasswordMail = (user: User, token: string) => {
  const mail = {
    from: `${process.env.FROM_NAME} <${process.env.FROM_MAIL}>`,
    to: user.email,
    subject: `Forgot your password? No worres, I've got you covered!`,
    html: `<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd"><html lang="en"><head> <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"> <meta name="viewport" content="width=device-width, initial-scale=1"> <meta http-equiv="X-UA-Compatible" content="IE=edge"> <title>Forgot password? No worries!</title> <style type="text/css">a:hover{color:red}</style> </head><body style="margin:0;padding:0;background-color:#f2f2f2;margin-top:35px"> <center> <table width="640" cellspacing="0" cellpadding="0" border="0" align="center" style="max-width:640px;width:100%" bgcolor="#FFFFFF"> <tr> <td align="center" valign="top" style="padding:10px"> <table width="650" cellspacing="0" cellpadding="0" border="0" align="center" style="max-width:650px;width:100%"> <tr> <td align="center" valign="top" style="padding:10px"> <p> Forgot your password? No worries! You're not the only one and in fact; it just means you've got a really <strong>secure password</strong> - which is <strong>awesome</strong>! </p> <p style="padding-bottom:15px"> Just click the button and I'll open a new page for you where you can specify a new password! </p> <a href="${serverURL}/user/changepass/${token}" target="_BLANK" style="padding:15px;cursor:pointer;background-color:cyan;font-weight:bold;color:#000;font-size:16px;text-decoration:none;border:1px solid #222"> CHANGE PASSWORD </a> <p style="font-size:9px;padding-top:20px"> Button doesn't work? Copy & paste this into your browser:<br>${serverURL}/user/changepass/${token} </p> </td> </tr> </table> </td> </tr></table> </center></body></html>`,
  };
  return mail;
};
