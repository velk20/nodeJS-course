const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: String, password: {
    type: String,
    // validate: {
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
      throw new mongoose.MongooseError('Password mismatch!');
    }
  });

//! Validate if username already exists
userSchema.pre('validate', async function(){
  const username = this.username;
  const user = await User.findOne({username});
  if (user != null) {
    throw new mongoose.MongooseError('Username already exists!');
  }
})


//! Hashing the password
userSchema.pre('save',async function (){
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
})

const User = mongoose.model('User', userSchema);

module.exports = User;