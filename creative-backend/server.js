const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const postRoutes = require("./routes/posts");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/posts", postRoutes);

// MongoDB connection
mongoose
  .connect("mongodb+srv://thelocaltales98_db_user:Prathamda2510@my-post-backend.wqvmzlc.mongodb.net/creative")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


