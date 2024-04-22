import nodemailer from "nodemailer";
import dotenv from "dotenv";
import ejs from "ejs";

dotenv.config();

export async function sendVerificationEmail(email:string , verificationLink:string) {
    // Create a Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.USER,
        pass: process.env.PASSWORD,
      },
    });
  
    // Email content
    const mailOptions = {
      from: process.env.USER,
      to: email,
      subject: "Verify your email address",
      html: await ejs.renderFile(__dirname + '/../views/email.ejs', {link : verificationLink})
    };
  
    // Send email
    await transporter.sendMail(mailOptions);
  }
  