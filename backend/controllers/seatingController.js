const Room = require('../models/Room');
const Seating = require('../models/Seating');
const SeatingBlueprint = require('../models/SeatingBlueprint');

// Create new seating arrangement with a room blueprint
exports.createSeating = async (req, res) => {
  const { roomId, studentCount, branches } = req.body;

  try {
    // Find the room by ID
    const room = await Room.findById(roomId);
    if (!room) return res.status(404).json({ message: "Room not found" });

    const { rows, cols } = room;
    let blueprint = [];
    let count = 1;

    // Create a seating blueprint with the given student count
    for (let r = 0; r < rows; r++) {
      let row = [];
      for (let c = 0; c < cols; c++) {
        row.push({
          seatNumber: `R${r + 1}-C${c + 1}`,
          student: count <= studentCount ? `Student ${count++}` : null
        });
      }
      blueprint.push(row);
    }

    // Create the seating arrangement document in the database
    const newSeating = await Seating.create({
      room: roomId,
      blueprint,
      studentCount,
      branches
    });

    // Respond with the newly created seating arrangement
    res.status(201).json(newSeating);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Update seating blueprint manually (Admin)
exports.updateBlueprint = async (req, res) => {
  const { blueprint } = req.body;

  try {
    // Update the blueprint of a specific seating arrangement
    const seating = await Seating.findByIdAndUpdate(req.params.id, { blueprint }, { new: true });
    res.json(seating);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating seating blueprint.' });
  }
};

// View all seatings
exports.getAllSeating = async (req, res) => {
  try {
    const seatings = await Seating.find().populate('room');
    res.json(seatings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching seating data.' });
  }
};

// Search student seat by enrollment number
exports.getSeatByEnrollment = async (req, res) => {
  const { enrollment } = req.params;

  try {
    // Find all seating arrangements
    const seatings = await Seating.find();

    // Loop through the seating arrangements to find the student's seat
    for (const seating of seatings) {
      for (const row of seating.blueprint) {
        const seat = row.find(s => s.student === `Student ${enrollment}`);
        if (seat) {
          return res.json({
            room: seating.room,
            seat,
          });
        }
      }
    }

    // If no seat is found
    res.status(404).json({ message: 'Seating not found for this enrollment number.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get seating information by student enrollment number
exports.getStudentSeating = async (req, res) => {
  try {
    const enrollment = req.params.enrollment;
    const studentSeating = await Seating.find({ 'blueprint.student': `Student ${enrollment}` });

    if (studentSeating.length === 0) {
      return res.status(404).json({ message: 'No seating info found for this enrollment number.' });
    }

    return res.json(studentSeating);
  } catch (err) {
    console.error('Error fetching seating info:', err);
    return res.status(500).json({ message: 'Error retrieving seating data from the database.' });
  }
};

// Update student seating by enrollment number (new seat assignment)
exports.updateStudentSeating = async (req, res) => {
  const { enrollment, newSeat } = req.body;

  try {
    // Find seating arrangement
    const seating = await Seating.findOne({ 'blueprint.student': `Student ${enrollment}` });

    if (!seating) {
      return res.status(404).json({ message: 'Seating arrangement not found for this student.' });
    }

    // Find the row and seat to update
    let seatUpdated = false;
    for (let r = 0; r < seating.blueprint.length; r++) {
      for (let c = 0; c < seating.blueprint[r].length; c++) {
        if (seating.blueprint[r][c].student === `Student ${enrollment}`) {
          seating.blueprint[r][c].student = null; // Remove the current student
          // Assign the new seat
          const newSeatRow = seating.blueprint[newSeat.row];
          const newSeatCol = newSeat.col;
          newSeatRow[newSeatCol].student = `Student ${enrollment}`;
          seatUpdated = true;
          break;
        }
      }
      if (seatUpdated) break;
    }

    if (!seatUpdated) {
      return res.status(404).json({ message: 'No matching seat found for update.' });
    }

    // Save the updated seating arrangement
    const updatedSeating = await seating.save();

    return res.status(200).json(updatedSeating);
  } catch (err) {
    console.error('Error updating student seating:', err);
    return res.status(500).json({ message: 'Error updating seating data.' });
  }
};

// Save student exam seating info
exports.saveStudentExamSeating = async (req, res) => {
  try {
    const { enrollment, exams } = req.body;

    if (!enrollment || !Array.isArray(exams) || exams.length === 0) {
      return res.status(400).json({ message: 'Enrollment and valid exams are required' });
    }

    // Save each exam (or all in one document, depending on your schema)
    const newSeating = await Seating.create({ enrollment, exams });

    return res.status(200).json(newSeating);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error saving student seating info.' });
  }
};


module.exports = {
  createSeating,
  updateBlueprint,
  getAllSeating,
  getSeatByEnrollment,
  getStudentSeating,
  updateStudentSeating, // New update function
};
