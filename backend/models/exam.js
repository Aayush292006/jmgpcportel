const mongoose = require('mongoose');

const examSchema = new mongoose.Schema({
  name: String,
  examId: String,
  branch: String,
  semester: String,
  date: String,
  time: String
});

module.exports = mongoose.model('Exam', examSchema);
