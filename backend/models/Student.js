const mongoose = require('mongoose');

// Define schema with validation
const studentSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  enrollment: { 
    type: String, 
    required: true, 
    unique: true 
  },
  branch: { 
    type: String, 
    required: true 
  },
  semester: { 
    type: String, 
    required: true 
  },
  photo: { 
    type: String, 
    required: true 
  }
});

// Only define the model if it hasn't been defined already
const Student = mongoose.models.Student || mongoose.model('Student', studentSchema);

module.exports = Student;
