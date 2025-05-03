const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  roomNumber: { type: String, required: true },
  floor: String,
  rows: Number,
  columns: Number,
});

// Prevent OverwriteModelError
const Room = mongoose.models.Room || mongoose.model('Room', roomSchema);

module.exports = Room;
