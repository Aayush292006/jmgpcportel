const Seating = require("../models/Seating");

exports.assignSeating = async (req, res) => {
  const { examId, studentsSeating } = req.body;

  try {
    await Seating.deleteMany({ examId }); // clean existing
    await Seating.insertMany(
      studentsSeating.map((s) => ({
        enrollmentNumber: s.enrollmentNumber,
        seatNumber: s.seatNumber,
        roomNumber: s.roomNumber,
        examId,
      }))
    );
    res.status(200).json({ message: "Seating assigned successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
};
