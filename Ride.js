const mongoose = require('mongoose');

const rideSchema = new mongoose.Schema({
    description: { type: String, required: true },
    contact: { type: String, required: true },
});

module.exports = mongoose.model('Ride', rideSchema);
