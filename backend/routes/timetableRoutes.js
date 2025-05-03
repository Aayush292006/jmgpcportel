const express = require("express");
const Timetable = require("../models/Timetable");
const router = express.Router();

// GET timetable by branch and semester
router.get("/timetables", async (req, res) => {
  const { branch, semester } = req.query;

  try {
    if (branch && semester) {
      const filtered = await Timetable.findOne({ branch, semester });
      if (!filtered) {
        return res.status(404).json({ message: "No timetable found" });
      }

      console.log('Fetched timetable:', filtered); // Log the timetable for debugging
      return res.json({ success: true, timetables: filtered.subjects }); // Return subjects only
    }

    // If no filters, return all timetables
    const all = await Timetable.find();
    console.log('All timetables:', all); // Log all timetables for debugging
    res.json({ success: true, timetables: all });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching timetables" });
  }
});

// POST a new timetable
router.post("/timetables", async (req, res) => {
  const { branch, semester, subjects } = req.body;
  const newTimetable = new Timetable({ branch, semester, subjects });

  try {
    await newTimetable.save();
    res.status(201).json({ message: "Timetable created", timetable: newTimetable });
  } catch (err) {
    res.status(500).json({ message: "Error saving timetable" });
  }
});

// PUT (update) a timetable
router.put("/timetables/:id", async (req, res) => {
  const { id } = req.params;
  const { branch, semester, subjects } = req.body;

  try {
    const updatedTimetable = await Timetable.findByIdAndUpdate(
      id,
      { branch, semester, subjects },
      { new: true }
    );
    res.json({ message: "Timetable updated", timetable: updatedTimetable });
  } catch (err) {
    res.status(500).json({ message: "Error updating timetable" });
  }
});

// DELETE a timetable
router.delete("/timetables/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await Timetable.findByIdAndDelete(id);
    res.json({ message: "Timetable deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting timetable" });
  }
});

module.exports = router;
