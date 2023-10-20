const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const userSchema = new mongoose.Schema({
  username:{
    type: String,
    required: [true, 'Username is required'],
    unique: true,
    min: [5, 'Username must be at least 5 characters']
  },
  password:{
    type:String,
    required: [true, 'Password is required'],
    min: [4, 'Username must be at least 4 characters']
  },
  email:{
    type:String,
    required: [true, 'Email is required'],
    unique: true,
    min: [10, 'Username must be at least 10 characters']
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