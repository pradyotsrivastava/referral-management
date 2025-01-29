// backend/app.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const candidateRoutes = require("./routes/candidateRoutes");
const connectDB = require("./config/db");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const app = express();

const FRONTEND_URL = process.env.FRONTEND_URL;

// Middleware
app.use(express.json());

// Middleware for CORS
const allowedOrigins = [
  "http://localhost:3000",
  "https://referral-management-seven.vercel.app/",
  "*",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        return callback(new Error("Not allowed by CORS"));
      }
      return callback(null, true);
    },
    credentials: true,
  })
);

const uploadsDir = path.join(__dirname, "uploads");

// Check if the 'uploads' directory exists, if not create it
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
  console.log("Uploads directory created");
}

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/candidates", candidateRoutes);

// Connect to MongoDB
connectDB();

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
