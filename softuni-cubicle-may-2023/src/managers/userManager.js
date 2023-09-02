const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('../lib/jwt');

const SECRET = 'eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTY5MzY1MzQ4NCwiaWF0IjoxNjkzNjUzNDg0fQ';
exports.register = (userData) => User.create(userData);

exports.login = async (username,password) => {
  //find user
  const user = await User.findOne({username});

  if (!user){
    throw new Error('Cannot find username or password!');
  }

  //validate password
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid){
    throw new Error('Cannot find username or password');
  }

  const  payload = {
    _id: user._id,
     username: user.username
  }

  const token = await jwt.sign(payload, SECRET, {expiresIn: '2d'});

  return token;
}