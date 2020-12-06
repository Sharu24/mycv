const nodemailer = require("nodemailer");
const config = require("./config");

const verifyEmail = async user => {
  let transporter = nodemailer.createTransport({
    host: "smtp.hostinger.in",
    port: 587,
    secure: false,
    auth: {
      user: config.smtpUser,
      pass: config.smtpPass
    }
  });

  let info = await transporter.sendMail({
    from: '"iSharu Enterprises" <admin@isharu.in>',
    to: user.email,
    subject: "Welcome to myCV. This is a Email Verification Email",
    text: "Please click on the following click to verify your email with us",
    html: config.domain + user.uriToken
  });

  console.log("Message Sent %s", info.messageId);
};

module.exports = verifyEmail;
