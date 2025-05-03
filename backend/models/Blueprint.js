const mongoose = require('mongoose');

const BlueprintSchema = new mongoose.Schema({
  roomId: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true },
  roomNumber: String,
  floor: String,
  rows: Number,
  columns: Number,
  branches: [
    {
      branch: String,
      students: Number,
      year: String,
    },
  ],
  blueprint: [
    [
      {
        booked: Boolean,
        row: Number,
        col: Number,
        branch: String,
        student: String,
      },
    ],
  ],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Blueprint', BlueprintSchema);
