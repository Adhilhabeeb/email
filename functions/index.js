/* eslint-disable no-undef */

const functions = require("firebase-functions");
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

// Load Firebase Config
const gmailEmail = functions.config().gmail.email;
const gmailPassword = functions.config().gmail.password;

const app = express();
app.use(cors({ origin: true }));

app.get("/", (req, res) => {
  res.send("Hello from Firebase!");
});

// Example email function
app.post("/send-email", async (req, res) => {
  const { to, subject, text } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: gmailEmail,
      pass: gmailPassword,
    },
  });

  const mailOptions = {
    from: gmailEmail,
    to,
    subject,
    text,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send("Email sent successfully!");
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

// Export Firebase function
exports.api = functions.https.onRequest(app);
