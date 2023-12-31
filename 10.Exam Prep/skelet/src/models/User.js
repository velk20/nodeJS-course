const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const userSchema = new mongoose.Schema({
  username:{
    type: String,
    required: [true, 'Username is required'],
    unique: true,
  },
  password:{
    type:String,
    required: [true, 'Password is required'],
  },
  email:{
    type:String,
    required: [true, 'Email is required'],
    unique: true,
 },
  // owner: {
//   type: mongoose.Types.ObjectId, ref: 'User',
// },
// commentList: [
//   {
//     user: {
//       type: mongoose.Types.ObjectId,
//       required: true,
//       ref: 'User',
//     },
//     message: {
//       type: String,
//       required: [true, 'Comment message is required!']
//     },
//   }
// ]
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