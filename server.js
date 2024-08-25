const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Routes
const streamRoutes = require('./routes/streamRoutes');
const careerRoutes = require('./routes/careerRoutes');
const blogRoutes = require('./routes/blogRoutes');
const contactRoutes = require('./routes/contactRoutes');

app.use('/api/streams', streamRoutes);
app.use('/api/careers', careerRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/contact', contactRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
