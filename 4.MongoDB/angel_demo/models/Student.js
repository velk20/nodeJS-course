const mongoose = require('mongoose');
const {Schema} = require('mongoose');

const studentSchema = new mongoose.Schema({
  name:String,
  age:Number,
  cats: [{type:Schema.Types.ObjectId, ref: ' Cat'}]
})

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;