const {Schema, model} = require('mongoose');
const mongoose = require('mongoose');

const accessorySchema = new Schema({
  name:{
    type: String,
    required:true
  },
  imageUrl:{
    type:String,
    required: true,
  },
  description:{
    type:String,
    required: true,
    maxLength:50
  }
})

const Accessory = mongoose.model('Accessory', accessorySchema);

module.exports = Accessory;