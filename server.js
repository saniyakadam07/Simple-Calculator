// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost/railway_lost_found', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const ItemSchema = new mongoose.Schema({
  name: String,
  description: String,
  dateLost: Date,
  contactInfo: String,
});

const Item = mongoose.model('Item', ItemSchema);

// Routes
app.post('/api/items', async (req, res) => {
  const { name, description, dateLost, contactInfo } = req.body;
  const newItem = new Item({ name, description, dateLost, contactInfo });
  await newItem.save();
  res.status(201).json(newItem);
});

app.get('/api/items', async (req, res) => {
  const items = await Item.find();
  res.status(200).json(items);
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
