const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const BlueprintSchema = new mongoose.Schema({
  title: String,
  data: Array, // Adjust based on your blueprint structure
});

const Blueprint = mongoose.model("Blueprint", BlueprintSchema);

// Get all blueprints
router.get("/api/blueprints", async (req, res) => {
  const blueprints = await Blueprint.find();
  res.json(blueprints);
});

// Get blueprint by ID
router.get("/api/blueprints/:id", async (req, res) => {
  try {
    const blueprint = await Blueprint.findById(req.params.id);
    if (!blueprint) return res.status(404).json({ message: "Not found" });
    res.json(blueprint);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Save new blueprint
router.post("/api/blueprints", async (req, res) => {
  try {
    const newBlueprint = new Blueprint({
      title: req.body.title,
      data: req.body.data,
    });
    await newBlueprint.save();
    res.status(201).json(newBlueprint);
  } catch (err) {
    res.status(500).json({ message: "Failed to save blueprint" });
  }
});



// Update a blueprint by ID
// Update a blueprint by ID
router.put('/api/blueprints/:id', async (req, res) => {
  try {
    const blueprint = await Blueprint.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!blueprint) return res.status(404).json({ error: 'Blueprint not found' });
    res.status(200).json(blueprint);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a blueprint by ID
router.delete('/api/blueprints/:id', async (req, res) => {
  try {
    const blueprint = await Blueprint.findByIdAndDelete(req.params.id);
    if (!blueprint) return res.status(404).json({ error: 'Blueprint not found' });
    res.status(200).json({ message: 'Blueprint deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
