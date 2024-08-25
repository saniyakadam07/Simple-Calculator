const express = require('express');
const router = express.Router();
const Career = require('../models/Career');

// Get all careers
router.get('/', async (req, res) => {
  try {
    const careers = await Career.find();
    res.json(careers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a career by ID
router.get('/:id', async (req, res) => {
  try {
    const career = await Career.findById(req.params.id);
    if (!career) {
      return res.status(404).json({ message: 'Career not found' });
    }
    res.json(career);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new career
router.post('/', async (req, res) => {
  const career = new Career({
    title: req.body.title,
    description: req.body.description,
    requiredSkills: req.body.requiredSkills,
    salaryRange: req.body.salaryRange,
    jobOutlook: req.body.jobOutlook
  });

  try {
    const newCareer = await career.save();
    res.status(201).json(newCareer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
