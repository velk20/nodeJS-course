const {Schema, model} = require('mongoose');
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
    imageUrl:{
        type:String,
        required: true,
        //todo add http validation
    },
    difficultyLevel:{
        type: Number,
        required: true,
        max: 6,
        min: 1,
    }
})
const Cube = model('Cube', cubeSchema);

module.exports = Cube;