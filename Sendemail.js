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
  to: "henryhoangduong@gmail.com",
  subject: "Test Email",
  text: "This is a test email sent from Node.js using Nodemailer.",
};

// Send email
const sendMail = () => {
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("Error sending email:", error);
        } else {
            console.log("Email sent:", info.response);
        }
    });
}
module.exports = { sendMail };