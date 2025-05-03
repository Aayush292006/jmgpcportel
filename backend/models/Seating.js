const mongoose = require('mongoose');

// Define the schema for an exam
const examSchema = new mongoose.Schema({
  subject: { type: String, required: true },
  paperCode: { type: String, required: true },
  subjectCode: { type: String, required: true },
  seatNumber: { type: String, required: true },
  roomNumber: { type: String, required: true },
  date: { type: Date, required: true },
  time: {
    type: String,
    required: true,
    match: /^([01]?[0-9]|2[0-3]):([0-5][0-9])$/,  // HH:mm format
  },
}, { _id: false });  // Prevent creation of individual _id for each exam

// Define the schema for seating
const seatingSchema = new mongoose.Schema({
  enrollment: { type: String, required: true },
  exams: [examSchema],  // Array of exams
});

// Ensure the model is not redefined on each require
const Seating = mongoose.models.Seating || mongoose.model('Seating', seatingSchema);

module.exports = Seating;
