// models/content.js
const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: { type: String },
    content: { type: String, required: true },
    category: { type: String },
    image: { type: String },
    instagram: { type: String },
    facebook: { type: String },
    youtube: { type: String },
  },
  { timestamps: true, collection: "posts" } // explicitly use "posts" collection
);

module.exports = mongoose.model("Post", postSchema);
