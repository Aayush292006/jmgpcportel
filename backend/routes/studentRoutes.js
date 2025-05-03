const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Student = require('../models/Student');
const seatingPlanController = require('../controllers/seatingPlanController');

// Multer config for photo upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads'); // make sure this folder exists
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  },
});
const upload = multer({ storage });

// POST route to add new student
router.post('/api/students', upload.single('photo'), async (req, res) => {
  const { name, enrollment, branch, semester, year } = req.body;

  if (!req.file) return res.status(400).json({ message: 'Photo is required.' });

  try {
    const existing = await Student.findOne({ enrollment });
    if (existing) {
      return res.status(400).json({ message: 'Enrollment number already exists.' });
    }

    const newStudent = new Student({
      name,
      enrollment,
      branch,
      semester,
      year,
      photo: `/uploads/${req.file.filename}`, // relative URL
    });

    await newStudent.save();
    res.status(201).json({ message: 'Student added successfully!' });
  } catch (error) {
    console.error('Error saving student:', error);
    res.status(500).json({ message: 'Server error. Failed to add student.' });
  }
});


// 📋 Get All Students
router.get('/', async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json({ students });
  } catch (err) {
    console.error('Error fetching students:', err);
    res.status(500).json({ message: 'Failed to fetch students.' });
  }
});

// ✏️ Update Student
router.put('/:enrollment', upload.single('photo'), async (req, res) => {
  const { enrollment } = req.params;
  const { name, branch, semester, year } = req.body;
  const photo = req.file ? `/uploads/${req.file.filename}` : '';

  try {
    const student = await Student.findOne({ enrollment });
    if (!student) return res.status(404).json({ message: 'Student not found' });

    student.name = name || student.name;
    student.branch = branch || student.branch;
    student.semester = semester || student.semester;
    student.year = year || student.year;
    student.photo = photo || student.photo;

    const updatedStudent = await student.save();
    res.status(200).json({ message: 'Student updated successfully!', student: updatedStudent });
  } catch (err) {
    console.error('Error updating student:', err);
    res.status(500).json({ message: 'Failed to update student' });
  }
});

// ❌ Delete Student
router.delete('/', async (req, res) => {
  const { enrollment } = req.body;
  try {
    const deletedStudent = await Student.findOneAndDelete({ enrollment });
    if (!deletedStudent) return res.status(404).json({ message: 'Student not found' });

    await seatingPlanController.deleteSeatingPlan(enrollment);

    res.status(200).json({ message: 'Student deleted successfully!' });
  } catch (err) {
    console.error('Error deleting student:', err);
    res.status(500).json({ message: 'Failed to delete student' });
  }
});

// 👥 Get students for seating plan
router.get("/get_students", seatingPlanController.getStudents);

// 🪑 Get seating plan for a specific student
router.get("/seating/:enrollment", seatingPlanController.getSeatingByEnrollment);

module.exports = router;
