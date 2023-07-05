const Cube = require('../models/Cube');

exports.getCreateCube = (req, res) => {
    res.render('create');
};

exports.postCreateCube = (req, res) => {
    console.log(req.body)
    let cube = new Cube(req.body);
    res.redirect('/');
};