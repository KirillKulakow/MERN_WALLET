const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.SendVerificationMail = async (verificationToken, email) => {

const msg = {
    to: email,
    from: 'kirillkulakow31@gmail.com',
    subject: 'Verification',
    text: 'Verify your email',
    html: `<a href="${location.origin}/auth/verify/${verificationToken}">Confirm your account</a>`, 
  };
  return await sgMail.send(msg);
};
