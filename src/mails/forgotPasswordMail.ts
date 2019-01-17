export const forgotPasswordMail = (email: string, hashedId: string) => {
  const mailBody = {
    from: "Tony André Haugen <no-reply@tonyandre.co>",
    to: email,
    subject: "Forgot your password? No worries!",
    html: `
<p>Someone used your email to request a password change on <a href="${process.env.URL}" target="_BLANK">
${process.env.URL}</a>. If you never requested this email, just ignore the mail. This token will expire in
 <strong>1 day</strong> and will render useless.</p>
<p><strong>CLICK ON THIS LINK TO CHANGE YOUR PASSWORD:</strong></p>
<p><a href="${process.env.URL}/user/change-password/${hashedId}" target="_BLANK">${
      process.env.URL
    }/user/change-password/${hashedId}</a></p>
<br>
<p>Thanks,</p>
<br><br>
<p>Tony André Haugen<br>
- <a href="https://tonyandre.co">tonyandre.co</a></p>
`,
  };

  return mailBody;
};
