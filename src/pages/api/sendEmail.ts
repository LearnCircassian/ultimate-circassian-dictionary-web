import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { email, subject, message } = req.body;

    // Create a transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
      host: "smtp.example.com", // Replace with your mail server details
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER, // Your email id
        pass: process.env.EMAIL_PASS, // Your password
      },
    });

    // Send mail with defined transport object
    const info = await transporter.sendMail({
      from: email, // Sender address
      to: "learncircassian@gmail.com", // List of receivers
      subject: subject, // Subject line
      text: message, // Plain text body
    });

    res.status(200).json({ status: "Email Sent", info });
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
