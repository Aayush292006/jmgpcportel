const express = require('express');
const router = express.Router();
const Gallery = require('../models/Gallery');

// GET all gallery events
router.get('/', async (req, res) => {
  try {
    const galleryItems = await Gallery.find();
    const formattedItems = galleryItems.map(item => ({
      ...item._doc,
      imageUrl: `/uploads/gallery/${item.image}`
    }));
    res.json({ galleryItems: formattedItems });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching gallery items.' });
  }
});

module.exports = router;
