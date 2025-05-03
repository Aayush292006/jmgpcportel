// routes/roomBlueprintRoutes.js

const express = require('express');
const router = express.Router();
const Room = require('../models/RoomModel'); // adjust path if needed

// @desc   Get all rooms for seating blueprint
// @route  GET /api/roomdata
// @access Public or Authenticated (as needed)
router.get('/roomdata', async (req, res) => {
  try {
    const rooms = await Room.find().sort({ roomNumber: 1 }); // Optional: sort by room number
    res.status(200).json(rooms);
  } catch (error) {
    console.error('Error fetching rooms:', error);
    res.status(500).json({ message: 'Server error while fetching rooms' });
  }
});

module.exports = router;
