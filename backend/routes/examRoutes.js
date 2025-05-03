const express = require('express');
const Exam = require('../models/exam');
const router = express.Router();


// Admin: Add exam seating arrangement
router.post('/add', async (req, res) => {
  const { examId, examDate, roomNumber, seatingArrangement } = req.body;

  try {
    // Create a new exam seating arrangement
    const newExam = new Exam({
      examId,
      examDate,
      roomNumber,
      seatingArrangement,
    });

    await newExam.save();
    res.status(201).json({ success: true, message: 'Exam seating arrangement saved successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error saving seating arrangement', error: error.message });
  }
});



router.post('/', async (req, res) => {
  const exam = new Exam(req.body);
  await exam.save();
  res.json(exam);
});

router.get('/', async (req, res) => {
  const exams = await Exam.find();
  res.json(exams);
});

module.exports = router;


// Admin: Get all exam seating arrangements
router.get('/', async (req, res) => {
  try {
    const exams = await Exam.find();
    res.json({ success: true, exams });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error fetching seating arrangements', error: error.message });
  }
});

// Student: Get seating arrangement by enrollment number
router.get('/:enrollment', async (req, res) => {
  const { enrollment } = req.params;

  try {
    // Find the exam seating arrangement by student enrollment number
    const exam = await Exam.findOne({ 'seatingArrangement.studentEnrollment': enrollment });

    if (!exam) {
      return res.status(404).json({ success: false, message: 'No seating found for this student' });
    }

    // Find the seat number for the specific student
    const studentSeat = exam.seatingArrangement.find(
      (arrangement) => arrangement.studentEnrollment === enrollment
    );

    res.json({ success: true, seatNumber: studentSeat.seatNumber, examDate: exam.examDate, roomNumber: exam.roomNumber });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error fetching seating information', error: error.message });
  }
});

module.exports = router;
