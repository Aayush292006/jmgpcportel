const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Define the Room Schema
const roomSchema = new mongoose.Schema({
  roomNumber: String,
  floor: String,
  rows: Number,
  columns: Number
});

const Room = mongoose.model('Room', roomSchema);

const app = express();
app.use(bodyParser.json());

// Route to fetch all rooms
app.get('/api/rooms', async (req, res) => {
  try {
    const rooms = await Room.find();
    res.json({ success: true, rooms });
  } catch (err) {
    console.error('Error fetching rooms:', err);
    res.status(500).json({ success: false, message: 'Failed to fetch rooms' });
  }
});

// Route to add a new room
app.post('/api/rooms', async (req, res) => {
  const { roomNumber, floor, rows, columns } = req.body;
  if (!roomNumber || !floor || !rows || !columns) {
    return res.status(400).json({ success: false, message: 'All fields are required' });
  }

  const room = new Room({ roomNumber, floor, rows, columns });
  try {
    await room.save();
    res.json({ success: true, room });
  } catch (err) {
    console.error('Error adding room:', err);
    res.status(500).json({ success: false, message: 'Failed to add room' });
  }
});

// Route to update a room
app.put('/api/rooms/:id', async (req, res) => {
  const { id } = req.params;
  const { roomNumber, floor, rows, columns } = req.body;

  if (!roomNumber || !floor || !rows || !columns) {
    return res.status(400).json({ success: false, message: 'All fields are required' });
  }

  try {
    const room = await Room.findByIdAndUpdate(id, { roomNumber, floor, rows, columns }, { new: true });
    if (!room) {
      return res.status(404).json({ success: false, message: 'Room not found' });
    }
    res.json({ success: true, room });
  } catch (err) {
    console.error('Error updating room:', err);
    res.status(500).json({ success: false, message: 'Failed to update room' });
  }
});

// Route to delete a room
app.delete('/api/rooms/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const room = await Room.findByIdAndDelete(id);
    if (!room) {
      return res.status(404).json({ success: false, message: 'Room not found' });
    }
    res.json({ success: true, message: 'Room deleted successfully' });
  } catch (err) {
    console.error('Error deleting room:', err);
    res.status(500).json({ success: false, message: 'Failed to delete room' });
  }
});

// Connect to MongoDB and start the server
mongoose.connect('mongodb://localhost:27017/roomsDB', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(3000, () => console.log('Server is running on port 3000'));
  })
  .catch(err => {
    console.error('Failed to connect to MongoDB', err);
  });
