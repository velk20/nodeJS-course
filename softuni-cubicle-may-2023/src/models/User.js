const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    minLength: 5,
    match: [/^[A-Za-z0-9]+$/, 'Username must be alphanumeric'],
    unique: true
  },

  password: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return /^[A-Za-z0-9]+$/.test(value);
      }, message: `Invalid Password!`,
    },
    minLength: 8,
  },
});

//! Property does not persist in the DB, just stays in the Schema
userSchema.virtual('repeatPassword')
  .set(function (value) {
    if (value !== this.password) {
      throw new mongoose.MongooseError('Password mismatch!');
    }
  });

//! Validate if username already exists
userSchema.pre('validate', async function () {
  const username = this.username;
  const user = await User.findOne({username});
  if (user != null) {
    throw new mongoose.MongooseError('Username already exists!');
  }
});


//! Hashing the password before save
userSchema.pre('save', async function () {
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
});

const User = mongoose.model('User', userSchema);

module.exports = User;