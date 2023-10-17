const mongoose = require('mongoose');
const cryptoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    image: {
        type: String,
        required:  [true, ' Image is required'],
        match: [/^https?:\/\//,'Invalid image! url'],
    },
    price: {
        type: Number,
        required: [true, 'Price is required']
    },
    description:{
        type: String,
        required: [true, 'Description is required']
    },
    payment:{
        type: String,
        required: [true, 'Payment Method is required']
    },
    owner: {
    type: mongoose.Types.ObjectId, ref: 'User',
    },
    boughtCrypto:[{ type: mongoose.Types.ObjectId, ref: 'User' }]
});

const Crypto = mongoose.model('Crypto', cryptoSchema);
module.exports = Crypto;