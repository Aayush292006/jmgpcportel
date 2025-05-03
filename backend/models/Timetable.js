const mongoose = require('mongoose');

const timetableSchema = new mongoose.Schema({
  branch: { type: String, required: true },
  semester: { type: String, required: true },
  subjects: [
    {
      subjectName: { type: String, required: true },
      subjectCode: { type: String, required: true },
      date: { type: String, required: true },
      time: { type: String, required: true },
    },
  ],
});

const Timetable = mongoose.model('Timetable', timetableSchema);
module.exports = Timetable;
