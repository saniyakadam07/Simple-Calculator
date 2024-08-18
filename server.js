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

// Routes
const rideRoutes = require('./routes/rides');
app.use('/rides', rideRoutes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
