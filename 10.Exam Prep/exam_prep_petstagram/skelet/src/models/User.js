const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const userSchema = new mongoose.Schema({
  username:{
    type: String,
    required: [true, 'Username is required'],
    unique: true,
    minLength:2
  },
  password:{
    type:String,
    minLength:4,
    required: [true, 'Password is required'],
  },
  email:{
    type:String,
    minLength:10,
    required: [true, 'Email is required'],
    unique: true,
  }
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