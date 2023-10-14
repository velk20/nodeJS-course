const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('../lib/jwt');

exports.login = async (email, password) => {
  const user = await User.findOne({email});
  if (!email) {
    throw new Error('Invalid email or password');
  }

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    throw new Error('Invalid email or password');
  }

  return await generateToken(user);

}

exports.register = async (userData) => {
  const user = await User.findOne({email: userData.email});
  if (user) {
    throw  new Error('Email already exit');
  }
  const userPromise = User.create(userData);
  return await generateToken(userPromise);
};

async function generateToken(user) {
  const payload = {
    _id: user._id,
    email: user.email,
  };

  const token = await jwt.sign(payload, jwt.SECRET, {expiresIn: '2d'});

  return token;
}
