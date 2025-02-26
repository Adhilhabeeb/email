import express from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import cors from "cors"; // ✅ Import CORS

dotenv.config();

const app = express();

// ✅ Enable CORS (Allow localhost:5173)
// app.use(cors());
app.use(cors({ origin: "https://boatproj-fa315.web.app/" }));


app.use(express.json());

app.post("/send-email", async (req, res) => {
    const { to, subject, message } = req.body;

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD,
        },
    });

    const mailOptions = {
        from: process.env.EMAIL,
        to,
        subject,
        text: message,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.json({ message: "Email sent successfully!" });
    } catch (error) {
        res.status(500).json({ error: "Failed to send email", details: error.message });
    }
});

// ✅ Test route
app.get("/", (req, res) => {
    res.send("Email Server is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
