const express = require('express');
const SavedBlueprint = require('../models/SavedBlueprint');

const router = express.Router();  // Define router here once

// Define routes (CRUD)
router.post('/', async (req, res) => {
  try {
    const { examName, examDate, seatArrangement } = req.body;
    const newBlueprint = new SavedBlueprint({ examName, examDate, seatArrangement });
    await newBlueprint.save();
    res.status(201).json({ message: 'Blueprint saved successfully', newBlueprint });
  } catch (err) {
    res.status(500).json({ message: 'Error saving blueprint', error: err });
  }
});

// Export the router


// CREATE: Add a new seating blueprint
router.post('/', async (req, res) => {
  try {
    console.log("Request received:", req.body);  // Log the request body
    const { examName, examDate, seatArrangement } = req.body;
    const newBlueprint = new SavedBlueprint({ examName, examDate, seatArrangement });
    await newBlueprint.save();
    res.status(201).json({ message: 'Blueprint saved successfully', newBlueprint });
  } catch (err) {
    console.error("Error saving blueprint:", err);  // Log the error
    res.status(500).json({ message: 'Error saving blueprint', error: err });
  }
});

// READ: Get all saved seating blueprints
router.get('/', async (req, res) => {
  try {
    const blueprints = await SavedBlueprint.find();
    res.status(200).json(blueprints);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching blueprints', error: err });
  }
});

// UPDATE: Update a specific blueprint by ID
router.put('/:id', async (req, res) => {
  try {
    const { examName, examDate, seatArrangement } = req.body;
    const updatedBlueprint = await SavedBlueprint.findByIdAndUpdate(
      req.params.id,
      { examName, examDate, seatArrangement },
      { new: true }
    );
    if (!updatedBlueprint) {
      return res.status(404).json({ message: 'Blueprint not found' });
    }
    res.status(200).json(updatedBlueprint);
  } catch (err) {
    res.status(500).json({ message: 'Error updating blueprint', error: err });
  }
});

// DELETE: Delete a specific blueprint by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedBlueprint = await SavedBlueprint.findByIdAndDelete(req.params.id);
    if (!deletedBlueprint) {
      return res.status(404).json({ message: 'Blueprint not found' });
    }
    res.status(200).json({ message: 'Blueprint deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting blueprint', error: err });
  }
});

module.exports = router;
