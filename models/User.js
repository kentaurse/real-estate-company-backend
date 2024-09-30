const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: String,
  userId: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  googleId: { type: String },
  role: { type: String, required: true },
  relateUser: String
});

userSchema.pre('save', async function(next) {
  const user = this;
  if (!user.isModified('password')) return next();
  const hash = await bcrypt.hash(user.password, 10);
  user.password = hash;
  next();
});

userSchema.methods.validPassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', userSchema);

const init = async () => {
  const UserModel = require('./User');
  var user = await UserModel.find({ email: "kentaurse0212@gmail.com" });
  var admin = new UserModel({
    name: "ヒトシ ササキ",
    userId: "kentaurse",
    email: "kentaurse0212@gmail.com",
    password: "123456",
    role: "admin",
  });
  if (!user[0]) admin.save();
};

init();