// server.js
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const postRoutes = require("./routes/posts");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads")); // serve uploaded images

// MongoDB connection
const mongoURI = process.env.MONGO_URI;

if (!mongoURI) {
  console.error("MongoDB connection string (MONGO_URI) is missing!");
  process.exit(1);
}

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 10000, // 10s timeout
  })
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Routes
app.use("/api/posts", postRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
