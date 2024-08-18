const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost/auto-share', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Ride schema and model
const rideSchema = new mongoose.Schema({
    description: String,
});
const Ride = mongoose.model('Ride', rideSchema);

// API Endpoints
app.get('/rides', async (req, res) => {
    try {
        const rides = await Ride.find();
        res.json(rides);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/rides', async (req, res) => {
    try {
        const newRide = new Ride(req.body);
        await newRide.save();
        res.json(newRide);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
