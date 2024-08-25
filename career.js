const mongoose = require('mongoose');

const CareerSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  requiredSkills: [String],
  salaryRange: { type: String },
  jobOutlook: { type: String }
});

module.exports = mongoose.model('Career', CareerSchema);
