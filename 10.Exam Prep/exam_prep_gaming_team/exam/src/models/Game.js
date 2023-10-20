const mongoose = require('mongoose');
const gameSchema = new mongoose.Schema({
    name: {
        type: String, required: [true, 'Name is required'], min: [4, 'Username must be at least 4 characters']
    }, image: {
        type: String, required: [true, ' Image is required'], match: [/^https?:\/\//, 'Invalid image url'],
    }, price: {
        type: Number, required: [true, 'Price is required'], min: [1, 'Price must be positive number']
    }, description: {
        type: String, required: [true, 'Description is required'], min: [10, 'Username must be at least 10 characters']
    }, genre: {
        type: String, required: [true, 'Genre in required'], min: [2, 'Username must be at least 2 characters']
    }, platform: {
        type: String, enum: ['PC', 'Nintendo', 'PS4', 'PS5', 'XBOX'], required: [true, 'Platform is required']
    }, owner: {
        type: mongoose.Types.ObjectId, ref: 'User',
    }, boughtBy: [{type: mongoose.Types.ObjectId, ref: 'User'}]
});

const Game = mongoose.model('Game', gameSchema);
module.exports = Game;