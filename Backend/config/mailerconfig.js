const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.office365.com", // Update to the correct Outlook SMTP server
  port: 587,
  secure: false, // Set to false for TLS
  auth: {
    user: "sanket1test@outlook.com",
    pass: "Sanket@30",
  },
});

const sender = async (to, otp) => {
  let mail = {
    from: "sanket1test@outlook.com",
    to,
    subject: "Reset Password OTP",
    text: "Not Meant to be shared",
    html: `<p>This is your OTP to reset password ${otp}</p><br>
                <p>It will expire in 5 minutes</p>`,
  };
  await transporter.sendMail(mail);
};

module.exports = sender;
