const express = require('express');
const router = express.Router();
const Seating = require('../models/Seating'); // Ensure you have the Seating model defined

// POST: Add new seating data
router.post('/api/seating', async (req, res) => {
  try {
    const {
      examName,
      examDate,
      startTime,
      endTime,
      block,
      roomNumber,
      rollStart,
      rollEnd,
    } = req.body;

    // Validation (optional but recommended)
    if (!examName || !examDate || !startTime || !endTime || !block || !roomNumber || !rollStart || !rollEnd) {
      return res.status(400).json({ message: 'Please fill all required fields' });
    }

    // Create new seating document
    const newSeating = new Seating({
      examName,
      examDate,
      startTime,
      endTime,
      block,
      roomNumber,
      rollStart,
      rollEnd,
    });

    // Save to MongoDB
    const savedSeating = await newSeating.save();
    res.status(201).json(savedSeating);

  } catch (error) {
    console.error('Error saving seating:', error);
    res.status(500).json({ message: 'Server error while saving seating' });
  }
});

module.exports = router;
