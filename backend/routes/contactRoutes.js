const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

// POST request to save contact message
router.post('/', async (req, res) => {
  const { name, email, message } = req.body;

  const newMessage = new Contact({
    name,
    email,
    message,
    created_at: new Date(), // Automatically add timestamp
  });

  try {
    const savedMessage = await newMessage.save();
    res.json({ success: true, message: savedMessage });
  } catch (error) {
    console.error('Error saving message:', error);
    res.status(500).json({ success: false, message: 'Error saving message' });
  }
});

// GET request to fetch all messages
router.get('/', async (req, res) => {
  try {
    const messages = await Contact.find();
    res.json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ success: false, message: 'Error fetching messages' });
  }
});

// DELETE request to remove a message by ID
router.delete('/:id', async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting message:', error);
    res.status(500).json({ success: false, message: 'Error deleting message' });
  }
});

module.exports = router;
