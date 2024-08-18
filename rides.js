const express = require('express');
const router = express.Router();
const Ride = require('../models/Ride');

// Get all rides
router.get('/', async (req, res) => {
    try {
        const rides = await Ride.find();
        res.json(rides);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Post a new ride
router.post('/', async (req, res) => {
    const { description, contact } = req.body;
    const newRide = new Ride({ description, contact });

    try {
        const savedRide = await newRide.save();
        res.status(201).json(savedRide);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;
