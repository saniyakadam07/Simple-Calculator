const mongoose = require('mongoose');

const StreamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  careers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Career' }]
});

module.exports = mongoose.model('Stream', StreamSchema);
