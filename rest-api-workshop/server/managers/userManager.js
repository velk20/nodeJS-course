const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (userData) => {
  const user = await User.create(userData);
  return getAuthResult(user);
}
exports.login = async ({email, password}) => {
  const user = await User.findOne({email});

  if (!user){
    throw new Error('Invalid username or password!');
  }

  const isValid = await bcrypt.compare(password, user.password);

  if (!isValid){
    throw new Error('Invalid username or password!');
  }


  return getAuthResult(user);
}

function getAuthResult(user) {
  const payload = {
    _id: user._id,
    email: user.email,
  }
  const token = jwt.sign(payload, 'SECRET', {expiresIn: '2d'})

  const result = {
    email: user.email,
    _id: user._id,
    accessToken: token,
  }

  return result;
}