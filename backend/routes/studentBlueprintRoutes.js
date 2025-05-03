// routes/studentBlueprintRoutes.js

const express = require('express');
const router = express.Router();
const Student = require('../models/StudentModel'); // adjust path if needed

// @desc   Get all students for seating blueprint
// @route  GET /api/students
// @access Public or Authenticated (as needed)
router.get('/students', async (req, res) => {
  try {
    const students = await Student.find().sort({ name: 1 }); // Sort by name (optional)
    res.status(200).json(students);
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({ message: 'Server error while fetching students' });
  }
});

module.exports = router;
