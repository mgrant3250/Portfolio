const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      replyTo: email,
      to: process.env.EMAIL_USER,
      subject: `Message from ${name}`,
      text: message
    });

    res.status(200).json({ success: true });
  } catch (err) {
    console.error("CONTACT ERROR:", err);

  return res.status(500).json({
    success: false,
    error: err.message
  });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log("Server running"));