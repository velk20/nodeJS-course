const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const userSchema = new mongoose.Schema({
  email:{
    type:String,
    required: [true, 'Email is required'],
    unique: true,
    min: 10
  },
  password:{
    type:String,
    required: [true, 'Password is required'],
    min: 4
  },
})

userSchema.pre('save', async function () {
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.virtual('repeatPassword')
  .set((function (value) {
    if (this.password !== value) {
      throw new Error('Passwords mismatch!');
    }
  }))

const User = mongoose.model('User', userSchema);
module.exports = User;