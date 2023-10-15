const mongoose = require('mongoose');

const animalSchema = new mongoose.Schema({
    name: {
        type: String, required: [true, 'Animal name is required'], min: 2
    }, years: {
        type: Number, required: [true, 'Animal years is required'], min:1 , max:100
    }, kind: {
        type: String, required: [true, 'Animal kind is required'], min: 3
    }, image: {
        type: String, required: [true, 'Animal image is required'], match: [/^https?:\/\//,'Invalid image! url'],
    }, need: {
        type: String, required: [true, 'Animal need is required'], min:3 , max:20
    }, location: {
        type: String, required: [true, 'Animal location is required'], min:5, max: 15,
    }, description: {
        type: String, required: [true, 'Animal description is required'], min:5, max:50
    }, owner: {
        type: mongoose.Types.ObjectId, required: true, ref: 'User'
    }, donations: [{ type: mongoose.Types.ObjectId, ref: 'User' }]
});

const Animal = mongoose.model('Animal', animalSchema);
module.exports = Animal;