const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  method: String,
  read: { type: Boolean, default: false },
  sender: { type: String, required: true },
  receiver: { type: String, required: true },
  answer: { type: Boolean, default: false },
  deliverDate: { type: Date, default: Date.now },
  file: String
});

module.exports = mongoose.model('Message', messageSchema);