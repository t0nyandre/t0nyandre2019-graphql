export const verifyAccountMail = (email: string, hashedId: string) => {
  const mailBody = {
    from: "Tony André Haugen <no-reply@tonyandre.co>",
    to: email,
    subject: "Thanks for signing up. Please verify your account!",
    html: `
<p>Hi there,</p><br>
<p>Thank you for signing up to my website. It's just one final step before you can start
commenting on my posts and projects.</p>
<p><strong>CLICK ON THIS LINK TO ACTIVATE YOUR ACCOUNT:</strong></p>
<p><a href="${process.env.URL}/user/verify/${hashedId}" target="_BLANK">${process.env.URL}/user/verify/${hashedId}</a>
</p><br>
<p>Thanks,</p>
<br><br>
<p>Tony André Haugen<br>
- <a href="https://tonyandre.co">tonyandre.co</a></p>
`,
  };

  return mailBody;
};
