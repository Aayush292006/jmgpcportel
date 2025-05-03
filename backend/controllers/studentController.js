const Student = require("../models/Student");
const Exam = require("../models/exam");

// ✅ Add a new student
exports.addStudent = async (req, res) => {
  try {
    const { name, enrollment, branch, semester, year } = req.body;
    const photo = req.file?.filename || null; // optional photo handling

    const newStudent = new Student({
      name,
      enrollmentNumber: enrollment,
      branch,
      semester,
      year,
      photo,
    });

    await newStudent.save();
    res.status(201).json({ message: "Student added successfully!", student: newStudent });
  } catch (error) {
    console.error("Error adding student:", error);
    res.status(500).json({ message: "Something went wrong while adding student!" });
  }
};

// ✅ Get all students
exports.getStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json({ students });
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).json({ message: "Something went wrong while fetching students!" });
  }
};

// ✅ Delete student by enrollment number
exports.deleteStudent = async (req, res) => {
  const { enrollment } = req.body;
  try {
    const deleted = await Student.findOneAndDelete({ enrollmentNumber: enrollment });
    if (!deleted) return res.status(404).json({ message: "Student not found" });

    res.status(200).json({ success: true, message: "Student deleted successfully." });
  } catch (error) {
    console.error("Error deleting student:", error);
    res.status(500).json({ message: "Something went wrong while deleting student!" });
  }
};

// ✅ Get student seating (visible only 30 minutes before exam)
exports.getSeating = async (req, res) => {
  const { enrollment, examId } = req.params;

  try {
    const student = await Student.findOne({ enrollmentNumber: enrollment });
    const exam = await Exam.findOne({ examId });

    if (!student || !exam) {
      return res.status(404).json({ message: "Student or exam not found" });
    }

    const examTime = new Date(`${exam.date}T${exam.time}:00`);
    const now = new Date();
    const diffMinutes = (examTime - now) / 60000;

    if (diffMinutes > 30) {
      return res.status(403).json({ message: "Seating will be available 30 minutes before the exam" });
    }

    const seating = student.seating.find(s => s.examId === examId);

    if (!seating) {
      return res.status(404).json({ message: "No seating found for this exam" });
    }

    res.status(200).json(seating);
  } catch (error) {
    console.error("Error fetching seating:", error);
    res.status(500).json({ message: "Something went wrong while fetching seating!" });
  }
};
