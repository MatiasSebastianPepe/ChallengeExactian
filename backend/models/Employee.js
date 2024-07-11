const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  status: { type: String, enum: ['in', 'out'], default: 'out' },
  entryTime: { type: Date },
  exitTime: { type: Date },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Employee', employeeSchema);
