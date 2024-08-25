const express = require('express');
const router = express.Router();
const Stream = require('../models/Stream');

// Get all streams
router.get('/', async (req, res) => {
  try {
    const streams = await Stream.find().populate('careers');
    res.json(streams);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a stream by ID
router.get('/:id', async (req, res) => {
  try {
    const stream = await Stream.findById(req.params.id).populate('careers');
    if (!stream) {
      return res.status(404).json({ message: 'Stream not found' });
    }
    res.json(stream);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new stream
router.post('/', async (req, res) => {
  const stream = new Stream({
    name: req.body.name,
    description: req.body.description,
    careers: req.body.careers
  });

  try {
    const newStream = await stream.save();
    res.status(201).json(newStream);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
