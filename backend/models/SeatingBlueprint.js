const mongoose = require('mongoose');

const seatSchema = new mongoose.Schema({
  row: Number,
  col: Number,
  enrollment: String,
  branch: String
});

const seatingBlueprintSchema = new mongoose.Schema({
  room: String,
  floor: String,
  seatMap: [seatSchema]
});

module.exports = mongoose.model('SeatingBlueprint', seatingBlueprintSchema);
