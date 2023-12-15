const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();

// Create a transporter object using SMTP
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

// Email options
const mailOptions = {
  from: process.env.EMAIL,
  to: "",
  subject: "Test Email",
  text: "",
};

// Send email
const sendMail = (text, email) => {
  mailOptions.to = email;
  mailOptions.text = text;
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("Error sending email:", error);
        } else {
            console.log("Email sent:", info.response);
        }
    });
}
module.exports = { sendMail };