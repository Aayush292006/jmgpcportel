const express = require('express');
const mongoose = require('mongoose');
const Room = require('./models/Room'); // Replace with your actual path to the Room model
const cors = require('cors');
const app = express();

// Middleware for parsing JSON
app.use(express.json());
app.use(cors()); // Enable CORS

const roomRoutes = express.Router();

// Get all rooms (admin)
roomRoutes.get('/', async (req, res) => {
  try {
    const rooms = await Room.find();
    res.json({ success: true, rooms });
  } catch (error) {
    console.error('Error fetching rooms:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch rooms' });
  }
});

// Get a single room by ID
roomRoutes.get('/:id', async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) {
      return res.status(404).json({ success: false, message: 'Room not found' });
    }
    res.json({ success: true, room });
  } catch (error) {
    console.error('Error fetching room:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch room' });
  }
});

// Add a new room
roomRoutes.post('/', async (req, res) => {
  const { roomNumber, floor, rows, columns } = req.body;

  try {
    const newRoom = new Room({ roomNumber, floor, rows, columns });
    await newRoom.save();
    res.status(201).json({ success: true, message: 'Room added successfully!' });
  } catch (error) {
    console.error('Error adding room:', error);
    res.status(500).json({ success: false, message: 'Failed to add room' });
  }
});

// Update a room by ID
roomRoutes.put('/:id', async (req, res) => {
  const { roomNumber, floor, rows, columns } = req.body;

  try {
    const updatedRoom = await Room.findByIdAndUpdate(
      req.params.id,
      { roomNumber, floor, rows, columns, total_seats: rows * columns },
      { new: true }
    );

    if (!updatedRoom) {
      return res.status(404).json({ success: false, message: 'Room not found' });
    }

    res.json({ success: true, message: 'Room updated successfully!', room: updatedRoom });
  } catch (error) {
    console.error('Error updating room:', error);
    res.status(500).json({ success: false, message: 'Failed to update room' });
  }
});

// Delete a room by ID
roomRoutes.delete('/:id', async (req, res) => {
  console.log('Deleting room with ID:', req.params.id); // Log room ID being deleted
  try {
    const deletedRoom = await Room.findByIdAndDelete(req.params.id);
    if (!deletedRoom) {
      return res.status(404).json({ success: false, message: 'Room not found' });
    }

    res.json({ success: true, message: 'Room deleted successfully!' });
  } catch (error) {
    console.error('Error deleting room:', error);
    res.status(500).json({ success: false, message: 'Failed to delete room' });
  }
});

// Use the roomRoutes for /api/rooms path
app.use('/api/rooms', roomRoutes);

module.exports = app;
