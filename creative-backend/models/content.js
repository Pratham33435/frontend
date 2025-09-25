const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: String,
  category: String,
  image: String,
  
  instagram: { type: String }, // optional
  facebook: { type: String },  // optional
  youtube: { type: String },   // optional
  published: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Post", postSchema);
