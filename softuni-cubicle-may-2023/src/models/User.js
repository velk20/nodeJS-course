const mongoose = require('mongoose');
const {MongooseError} = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String, password: {
    type: String, // validate: {
    //   validator: function (value) {
    //     return this.repeatPassword === value; repeatPassword is UNDEFINED
    //   }, message: `Password mismatch!`,
    // }
  },
});

//! Property does not persist in the DB, just stays in the Schema
userSchema.virtual('repeatPassword')
  .set(function (value) {
    if (value !== this.password) {
      throw new MongooseError('Password mismatch!');
    }
  });

const User = mongoose.model('User', userSchema);

module.exports = User;