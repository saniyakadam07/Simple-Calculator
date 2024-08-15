const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

mongoose.connect('mongodb://localhost/student-auto-share', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

const RideSchema = new mongoose.Schema({
    startLocation: String,
    endLocation: String,
    departureTime: Date,
    driver: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

const User = mongoose.model('User', UserSchema);
const Ride = mongoose.model('Ride', RideSchema);

// Middleware to check authentication
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);
    jwt.verify(token, 'secret_key', (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

// User registration
app.post('/api/register', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    try {
        await user.save();
        res.status(201).send('User created');
    } catch {
        res.status(400).send('User already exists');
    }
});

// User login
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (user && await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({ username: user.username }, 'secret_key');
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
    } catch {
        res.status(400).send('Failed to create ride');
    }
});

// Get all rides
app.get('/api/rides', async (req, res) => {
    const rides = await Ride.find().populate('driver');
    res.json(rides);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
