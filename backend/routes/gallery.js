// routes/gallery.js
const express = require("express");
const multer = require("multer");
const path = require("path");
const Gallery = require("../models/Gallery");

const router = express.Router();

// Multer setup for image upload (adjust storage path and options)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Set the upload directory
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Save file with timestamp
  },
});
const upload = multer({ storage: storage });

// Get all gallery events
router.get("/", async (req, res) => {
  try {
    const events = await Gallery.find();
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch gallery events." });
  }
});

// Add a new gallery event
router.post("/", upload.single("imageFile"), async (req, res) => {
  const { title, description, link } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : req.body.image; // Use the uploaded image URL or the passed image URL

  try {
    const newEvent = new Gallery({
      title,
      description,
      image,
      link,
    });
    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (err) {
    res.status(500).json({ message: "Failed to add event." });
  }
});

// Delete a gallery event
router.post("/delete", async (req, res) => {
  const { id } = req.body;
  try {
    await Gallery.findByIdAndDelete(id);
    res.status(200).json({ message: "Event deleted successfully." });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete event." });
  }
});

// Update a gallery event
router.post("/update", upload.single("imageFile"), async (req, res) => {
  const { id, title, description, link } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : req.body.image; // Image update logic

  try {
    const updatedEvent = await Gallery.findByIdAndUpdate(
      id,
      { title, description, image, link },
      { new: true }
    );
    res.json(updatedEvent);
  } catch (err) {
    res.status(500).json({ message: "Failed to update event." });
  }
});

module.exports = router;
