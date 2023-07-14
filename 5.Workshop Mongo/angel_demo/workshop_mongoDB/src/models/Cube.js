const {Schema, model, Types, SchemaTypes} = require('mongoose');
const cubeSchema = new Schema({
    name:{
        type:String,
        required:true,
    },
    description:{
        type: String,
        required: true,
        maxLength:50
    },
    imageUrl: {
        type: String,
        required: true,
        // match: [/^https?:\/\//,'Invalid URL!']
        validate: {
            validator: function (v) {
                return v.startWith('http://') || v.startWith('https://');
            },
            message: 'URL is invalid!',
        }
    },
    difficultyLevel:{
        type: Number,
        required: true,
        max: 6,
        min: 1,
    },
    accessories: [{
        type: Types.ObjectId,
        ref: 'Accessory'
    }]
})
const Cube = model('Cube', cubeSchema);

module.exports = Cube;