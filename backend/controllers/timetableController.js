const Timetable = require("../models/Timetable");

// Controller functions
const getTimetables = async (req, res) => {
  try {
    const timetables = await Timetable.find();
    res.json({ timetables });
  } catch (err) {
    res.status(500).json({ message: "Error fetching timetables" });
  }
};

const createTimetable = async (req, res) => {
  const { branch, semester, subjects } = req.body;
  const newTimetable = new Timetable({ branch, semester, subjects });

  try {
    await newTimetable.save();
    res.status(201).json({ message: "Timetable created", timetable: newTimetable });
  } catch (err) {
    res.status(500).json({ message: "Error saving timetable" });
  }
};

// Export controller functions
module.exports = {
  getTimetables,
  createTimetable,
};
