const mongoose = require('mongoose');

const workerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  profession: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  charges: {
    type: Number,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  }
}, { timestamps: true });

const Worker = mongoose.model('Worker', workerSchema);

module.exports = Worker;