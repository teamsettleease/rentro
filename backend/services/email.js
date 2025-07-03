const nodemailer = require("nodemailer");

const sendEmail = async (option) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    }
  })

  //define emailOption
  const emailOption = {
    from: `rento support <support@rento.com>`,
    to: option.email,
    subject: option.subject,
    text: option.message
  }

  await transporter.sendMail(emailOption);
};


module.exports = sendEmail;