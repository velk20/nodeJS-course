const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('../lib/jwt');

exports.login = async (username, password) => {
  const user = await User.findOne({username});
  if (!user) {
    throw new Error('Invalid username or password');
  }

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    throw new Error('Invalid username or password');
  }

  return await generateToken(user);

}

exports.register = async (userData) => {
  const user = await User.findOne({username: userData.username});
  if (user) {
    throw  new Error('Username already exit');
  }
  const userPromise = User.create(userData);
  return await generateToken(userPromise);
};

async function generateToken(user) {
  const payload = {
    _id: user._id,
    username: user.username,
    email: user.email,
  };

  const token = await jwt.sign(payload, jwt.SECRET, {expiresIn: '2d'});

  return token;
}
