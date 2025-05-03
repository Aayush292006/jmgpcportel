const express = require('express');
const router = express.Router();
const Seating = require('../models/Seating');

// POST: Add new seating
router.post('/', async (req, res) => {
  try {
    const { enrollment, subject, paperCode, subjectCode, date, time, seatNumber, roomNumber } = req.body;

    // Validate required fields
    if (!enrollment || !subject || !paperCode || !subjectCode || !date || !time || !seatNumber || !roomNumber) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if seating already exists for this enrollment and subject on this date
    const existingSeating = await Seating.findOne({
      enrollment,
      'exams.subject': subject,
      'exams.date': new Date(date)
    });

    if (existingSeating) {
      return res.status(400).json({ message: 'Seating already exists for this student in this subject on this date' });
    }

    // Check if enrollment already exists
    let studentSeating = await Seating.findOne({ enrollment });

    if (studentSeating) {
      // If student already exists, add new exam to exams array
      studentSeating.exams.push({
        subject,
        paperCode,
        subjectCode,
        date: new Date(date),
        time,
        seatNumber,
        roomNumber
      });
    } else {
      // Create new student seating record
      studentSeating = new Seating({
        enrollment,
        exams: [{
          subject,
          paperCode,
          subjectCode,
          date: new Date(date),
          time,
          seatNumber,
          roomNumber
        }]
      });
    }

    await studentSeating.save();
    res.status(201).json({ message: 'Seating saved successfully', seating: studentSeating });

  } catch (error) {
    console.error('Error in POST /seating:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
});

// GET: Fetch seating by enrollment number
router.get('/:enrollment', async (req, res) => {
  try {
    const enrollment = req.params.enrollment;

    const seating = await Seating.findOne({ enrollment });
    if (!seating) {
      return res.status(404).json({ success: false, message: 'No seating data found for this student' });
    }

    res.status(200).json({ success: true, data: seating });

  } catch (error) {
    console.error('Error in GET /seating/:enrollment:', error);
    res.status(500).json({ success: false, error: 'Server error while fetching seating' });
  }
});

module.exports = router;
