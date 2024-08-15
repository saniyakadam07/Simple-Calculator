const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// Connect to MongoDB
mongoose.connect('mongodb://localhost/student-auto-share', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).catch(err => console.error('MongoDB connection error:', err));

// Define MongoDB Schemas
const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

const RideSchema = new mongoose.Schema({
    startLocation: String,
    endLocation: String,
    departureTime: Date,
    driver: String // store username of driver
});

const User = mongoose.model('User', UserSchema);
const Ride = mongoose.model('Ride', RideSchema);

// Middleware for authentication
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.status(401).send('Token required');
    jwt.verify(token, 'secret_key', (err, user) => {
        if (err) return res.status(403).send('Invalid token');
        req.user = user;
        next();
    });
}

// Routes

// Register a new user
app.post('/api/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, password: hashedPassword });
        await user.save();
        res.status(201).send('User registered');
    } catch (err) {
        res.status(400).send('Error registering user: ' + err.message);
    }
});

// Login user
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (user && await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({ username: user.username }, 'secret_key', { expiresIn: '1h' });
        res.json({ token });
    } else {
        res.status(400).send('Invalid credentials');
    }
});

// Post a new ride
app.post('/api/rides', authenticateToken, async (req, res) => {
    const ride = new Ride({
        startLocation: req.body.startLocation,
        endLocation: req.body.endLocation,
        departureTime: req.body.departureTime,
        driver: req.user.username
    });
    try {
        await ride.save();
        res.status(201).json(ride);
    } catch (err) {
        res.status(400).send('Error creating ride: ' + err.message);
    }
});

// Get all rides
app.get('/api/rides', async (req, res) => {
    try {
        const rides = await Ride.find();
        res.json(rides);
    } catch (err) {
        res.status(500).send('Error fetching rides: ' + err.message);
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
