// routes/posts.js
const express = require("express");
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;
const Post = require("../models/content");

const router = express.Router();

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "posts",
    allowed_formats: ["jpg", "jpeg", "png"],
  },
});
const upload = multer({ storage });

// Create post
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { title, content, category, instagram, facebook, youtube } = req.body;
    if (!content) return res.status(400).json({ error: "Content is required" });

    const image = req.file ? req.file.path : null;

    const newPost = new Post({ title, content, category, instagram, facebook, youtube, image });
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all posts
router.get("/", async (req, res) => {
  try {
    const { category } = req.query;
    const filter = category ? { category } : {};
    const posts = await Post.find(filter).sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get post by ID
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: "Post not found" });
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update post
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const updatedData = { ...req.body };
    if (req.file) updatedData.image = req.file.path;

    const updatedPost = await Post.findByIdAndUpdate(req.params.id, updatedData, { new: true });
    if (!updatedPost) return res.status(404).json({ error: "Post not found" });
    res.json(updatedPost);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete post
router.delete("/:id", async (req, res) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.id);
    if (!deletedPost) return res.status(404).json({ error: "Post not found" });
    res.json({ message: "Post deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
