const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const News = require("./models/News"); // Ensure correct path to your News model
const app = express();
app.use(cors());

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/inshorts")
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(5000, () => console.log("Server running on port 5000"));
  })
  .catch((err) => console.log(err));

// GET route to fetch all news
app.get("/api/news", async (req, res) => {
  try {
    const news = await News.find();
    res.json(news);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST route to add news
app.post("/api/news", async (req, res) => {
  const { title, content, category } = req.body;

  if (!title || !content || !category) {
    return res
      .status(400)
      .json({ message: "Title, content, and category are required" });
  }

  try {
    const newNews = new News({
      title,
      content,
      category,
    });

    const savedNews = await newNews.save();
    res.status(201).json(savedNews); // Return the saved news item as a response
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT route to update news by id
app.put("/api/news/:id", async (req, res) => {
  const { id } = req.params;
  const { title, content, category } = req.body;

  try {
    const updatedNews = await News.findByIdAndUpdate(
      id,
      { title, content, category },
      { new: true }
    );

    if (!updatedNews) {
      return res.status(404).json({ message: "News not found" });
    }

    res.json(updatedNews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE route to delete news by id
app.delete("/api/news/:id", async (req, res) => {
  const { id } = req.params;

  try {
    console.log(`Attempting to delete news with ID: ${id}`); // Log the ID being deleted

    const deletedNews = await News.findByIdAndDelete(id);

    if (!deletedNews) {
      return res.status(404).json({ message: "News not found" });
    }

    res.json({ message: "News deleted successfully" });
  } catch (err) {
    console.error("Error deleting news:", err);
    res.status(500).json({ message: err.message });
  }
});

// Search route (if you want to search by title/category)
app.get("/api/news/search", async (req, res) => {
  const searchQuery = req.query.query; // Get search term from query params
  if (!searchQuery) {
    return res.status(400).json({ message: "Search query is required" });
  }

  try {
    const results = await News.find({
      $or: [
        { title: { $regex: searchQuery, $options: "i" } }, // Case-insensitive regex search
        { category: { $regex: searchQuery, $options: "i" } },
      ],
    });

    if (results.length === 0) {
      return res.status(404).json({ message: "No matching news found" });
    }

    res.json(results);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
