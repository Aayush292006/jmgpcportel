// routes/studentRoutes.js
const express = require('express');
const router = express.Router();
const Student = require('../models/Student');
const Seating = require('../models/Seating');

// Get all students
router.get('/', async (req, res) => {
  try {
    const students = await Student.find();
    res.json({ students });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a new student
router.post('/', async (req, res) => {
  try {
    const newStudent = new Student(req.body);
    await newStudent.save();
    res.json({ success: true, student: newStudent });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update student
router.put('/:enrollment', async (req, res) => {
  try {
    const updatedStudent = await Student.findOneAndUpdate(
      { enrollment: req.params.enrollment },
      req.body,
      { new: true }
    );
    res.json({ success: true, student: updatedStudent });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete student
router.delete('/:enrollment', async (req, res) => {
  try {
    await Student.findOneAndDelete({ enrollment: req.params.enrollment });
    res.json({ success: true, message: 'Student deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get seating info for a student by enrollment number
router.get('/seating/:enrollment', async (req, res) => {
  const { enrollment } = req.params;

  try {
    // Fetch seating entries for this enrollment
    const seatingData = await Seating.find({ enrollment });

    if (!seatingData || seatingData.length === 0) {
      return res.status(404).json('No seating found for this enrollment number.');
    }

    res.status(200).json(seatingData);
  } catch (error) {
    console.error('Error fetching seating:', error.message);
    res.status(500).json('Server error. Please try again later.');
  }
});

module.exports = router;
