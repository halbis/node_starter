const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: process.env.MAIL_SERVICE,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

module.exports = (email, message) => {
  const options = {
    from: "mailer_id here",
    to: email,
    subject: "mail subject here",
    text: message,
  };

  transporter.sendMail(options, function (err, info) {
    if (err) {
      console.log(err);
      return;
    }
    console.log(info.response);
    return info.response;
  });
};
