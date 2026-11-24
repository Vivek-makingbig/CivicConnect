
const nodemailer = require("nodemailer");

console.log("EMAIL_USER loaded:", !!process.env.EMAIL_USER);
console.log("EMAIL_PASS loaded:", !!process.env.EMAIL_PASS);
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Send email
const sendEmail = async (to, subject, message) => {
  try {
    const info = await transporter.sendMail({
      from: `"LocalConnect" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text: message
    });

    console.log("Email sent:", info.messageId);
    return true;

  } catch (error) {
    console.error("Email sending failed:", error.message);
    return false;
  }
};

module.exports = sendEmail;
