const express = require('express');
const router = express.Router();
const Seating = require('../models/Seating');

// POST: Add Seating
router.post('/seatings', async (req, res) => {
  try {
    const { enrollment, exams } = req.body;
    const seating = new Seating({ enrollment, exams });

    await seating.save();
    res.status(200).json(seating);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET: Fetch all Seatings
router.get('/seatings', async (req, res) => {
  try {
    const seatings = await Seating.find();
    res.status(200).json({ seatings });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT: Update Seating
router.put('/seatings/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { enrollment, exams } = req.body;

    const seating = await Seating.findByIdAndUpdate(id, { enrollment, exams }, { new: true });
    res.status(200).json(seating);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE: Delete Seating
router.delete('/seatings/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Seating.findByIdAndDelete(id);
    res.status(200).json({ message: 'Seating deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
