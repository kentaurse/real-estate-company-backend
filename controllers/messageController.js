const jwt = require('jsonwebtoken');
const Message = require('../models/Message');

exports.getMessages = async (req, res) => {
  try {
    const messages = await Message.find({ receiver: req.user.userId });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getMessagesById = async (req, res) => {
  try {
    const messages = await Message.findOne({ _id: req.params.msgId });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.setMessages = async (req, res) => {
  const messageInfo = req.body;
  try {
    const message = new Message(messageInfo);
    await message.save();
    res.status(200).json({message: 'Successfull.'});
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateMessages = async (req, res) => {
  const userInfo = req.body;
  try {
    const existingUser = await Message.findOne({ email: userInfo.email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email address is already registered.' });
    }
    const user = new Message(userInfo);
    await user.save();
    res.status(200).json({message: 'Successfull.'});
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteMessages = async (req, res) => {
  const userInfo = req.body;
  try {
    const existingUser = await Message.findOne({ email: userInfo.email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email address is already registered.' });
    }
    const user = new Message(userInfo);
    await user.save();
    res.status(200).json({message: 'Successfull.'});
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};