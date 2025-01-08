// models/News.js

const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  category: { type: String, required: true }, // Ensure category is included
});

const News = mongoose.model("News", newsSchema);

module.exports = News;
