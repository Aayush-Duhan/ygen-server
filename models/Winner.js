const mongoose = require('mongoose');

const winnerSchema = new mongoose.Schema({
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    required: true
  },
  first: {
    type: String,
    required: true
  },
  second: {
    type: String,
    required: true
  },
  third: {
    type: String,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Winner', winnerSchema); 