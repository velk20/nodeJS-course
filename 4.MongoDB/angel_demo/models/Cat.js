const mongoose = require('mongoose');

const catSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required!!'],
    minLength: [3, 'Min Length is 3 symbols'],
    maxLength: [20, 'Max Length is 20 symbols'],
    trim: true,
  },
  age: Number,
  breed: {
    type:String,
    enum: ['Persian', 'Street Cat', 'Angora'],

  },
});

//Method
catSchema.methods.makeSound = function () {
  console.log(`Hello from ${this.name}`);
};

//Virtual property
catSchema.virtual('info').get(function () {
  return `${this.name} - ${this.age} - ${this.breed}`;
});

//custom Validation methods
catSchema.path('name').validate(function () {
  return this.name.startsWith('N');
}, 'Name must start with `N`')

const Cat = mongoose.model('Cat', catSchema);

module.exports = Cat;