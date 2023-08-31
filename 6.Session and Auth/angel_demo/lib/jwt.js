const util = require('util');
const jwt = require('jsonwebtoken');

//! callback to promises based functions
const jwtPromises = {
  sign: util.promisify(jwt.sign),
  verify: util.promisify(jwt.verify),
}

module.exports = jwtPromises;