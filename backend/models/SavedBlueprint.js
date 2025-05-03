const mongoose = require('mongoose');

const blueprintSchema = new mongoose.Schema({
  examName: {
    type: String,
    required: true
  },
  examDate: {
    type: Date,
    required: true
  },
  seatArrangement: {
    type: String,
    required: true
  }
});

const SavedBlueprint = mongoose.model('SavedBlueprint', blueprintSchema);

module.exports = SavedBlueprint;
