const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  type: String,
  read: { type: Boolean, default: false },
  sender: { type: String, required: true },
  answer: { type: Boolean, default: false },
  file: String
});

module.exports = mongoose.model('Message', messageSchema);