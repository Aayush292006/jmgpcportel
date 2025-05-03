const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  roomNumber: { type: String, required: false }, // Made optional
  floor: { type: String, required: true },
  rows: { type: Number, required: true },
  columns: { type: Number, required: true },
  total_seats: { type: Number, default: 0 }, // Optional, will be calculated before saving
});

// Pre-save hook to calculate total_seats based on rows and columns
roomSchema.pre('save', function (next) {
  if (this.rows && this.columns) {
    this.total_seats = this.rows * this.columns; // Calculate total seats
  }
  next();
});

const Room = mongoose.model('Room', roomSchema);
module.exports = Room;
