const express = require("express");
const Post = require("../models/content");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const router = express.Router();

// =================== Cloudinary Config ===================
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// Cloudinary storage
const cloudStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "posts",           // folder in Cloudinary
    allowed_formats: ["jpg", "jpeg", "png"],
  },
});

// Multer upload middleware
const cloudUpload = multer({ storage: cloudStorage });

// =================== Routes ===================

// Create new post with optional image and social links
router.post("/", cloudUpload.single("image"), async (req, res) => {
  try {
    const { title, content, category, instagram, facebook, youtube } = req.body;
    const image = req.file ? req.file.path : null; // Cloudinary URL

    const newPost = new Post({
      title,
      content,
      category,
      image,
      instagram,
      facebook,
      youtube,
    });

    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all posts (optional filter by category)
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

// Get a single post by ID
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: "Post not found" });
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a post by ID with optional image and social links
router.put("/:id", cloudUpload.single("image"), async (req, res) => {
  try {
    const updatedData = { ...req.body };
    if (req.file) updatedData.image = req.file.path; // Cloudinary URL

    const updatedPost = await Post.findByIdAndUpdate(req.params.id, updatedData, {
      new: true,
    });

    if (!updatedPost) return res.status(404).json({ error: "Post not found" });
    res.json(updatedPost);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a post by ID
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
