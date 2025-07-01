const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config(); // For .env file

// Routes
const authRoutes = require("./routes/auth");
const menuRoutes = require("./routes/menu");
const orderRoutes = require("./routes/orders");

const app = express();

// Utility Functions
const AppError = require("./utils/AppError");

// Cors Settings
const allowedOrigins = [
    "http://localhost:5173", // Local frontend URL
    "https://biterunner.vercel.app", // Deployed frontend
];
app.use(
    cors({
        origin: allowedOrigins,
        credentials: true,
    })
);

// Only start the server after DB connection is successful
mongoose;
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("✅ MongoDB connected");

        // Start Express server only after DB is connected
        app.listen(3000, () => {
            console.log("🚀 Server listening on Port 3000");
        });
    })
    .catch((err) => {
        console.error("❌ MongoDB connection error:", err);
    });

// Middleware
app.use(express.json());

// Routes

// To keep Render API awake using UptimeRobot
app.get("/api/ping", (req, res) => {
    res.status(200).send("pong");
});

// Auth Routes
app.use("/api/auth", authRoutes);

// Menu Routes
app.use("/api/menu", menuRoutes);

// Order Routes
app.use("/api/orders", orderRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    let { message = "Something went wrong", statusCode = 500 } = err;

    // If the error is an instance of AppError, use its properties for message and status code
    if (err instanceof AppError) {
        message = err.message || message; // Error message from AppError instance
        statusCode = err.statusCode || statusCode; // Status code from AppError instance
    }

    // Logging operational erros or bugs for debugging
    if (err.isOperational) {
        console.error("Operational Error: ", err);
    } else {
        console.error("Non-Operational Error (Bug): ", err);
    }

    // Sending error responses with status code to client
    res.status(statusCode).json({
        status: statusCode < 500 ? "fail" : "error",
        error: message,
    });
});
