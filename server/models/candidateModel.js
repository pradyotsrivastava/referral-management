const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  jobTitle: { type: String, required: true },
  status: { type: String, enum: ['Pending', 'Reviewed', 'Hired'], default: 'Pending' },
  resume: { type: String, required: false },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('Candidate', candidateSchema);
