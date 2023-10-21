const mongoose = require('mongoose');
const electronicSchema = new mongoose.Schema({
    name: {
        type: String, required: [true, 'Name is required'], min: [10, 'Name must have at least 10 characters']
    }, type: {
        type: String, required: [true, 'Type is required'], min: [2, 'Type must have at least 2 characters']
    }, damages: {
        type: String, required: [true, 'Damages is required'], min: [10, 'Damages must have at least 10 characters']
    }, image: {
        type: String, required: [true, ' Image is required'], match: [/^https?:\/\//, 'Invalid image! url'],
    }, price: {
        type: Number, required: [true, 'Price is required'], min: [1, 'Price must be positive number']
    }, production: {
        type: Number, required: [true, 'Production is required'],
        min: [1900, 'Production must be between 1900 and 2023'],
        max: [2023, 'Production must be between 1900 and 2023']
    }, exploitation: {
        type: Number, required: [true, 'Exploitation is required'], min: [1, 'Exploitation must be positive number']
    }, description: {
        type: String, required: [true, 'Description is required'],
        min: [10, 'Description must have at least 10 characters'],
        max: [200, 'Description must have at most 200 characters']
    }, owner: {
        type: mongoose.Types.ObjectId, ref: 'User',
    }, buyingList: [{type: mongoose.Types.ObjectId, ref: 'User'}]
});

const Electronic = mongoose.model('Electronic', electronicSchema);
module.exports = Electronic;