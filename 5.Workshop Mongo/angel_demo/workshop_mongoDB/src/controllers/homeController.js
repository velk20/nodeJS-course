const Cube = require('../models/Cube');

exports.getHomePage = async (req,res) => {
    console.log(req.query);
    const {search, from: difficultyFrom, difficultyTo} = req.query;

    let cubes = await Cube.find().lean();

    //TODO use db search
    if (search) {
        cubes = cubes.filter(cube => cube.name.toLowerCase().includes(search.toLowerCase()));
    }

    if (difficultyFrom) {
        cubes = cubes.filter(cube => cube.difficultyLevel >= difficultyFrom);
    }

    if (difficultyTo) {
        cubes = cubes.filter(cube => cube.difficultyLevel <= difficultyTo);
    }

    res.render('index',{cubes, search});
}

exports.getAboutPage = ( req,res)=>{
    res.render('about');
}

exports.getError = (req, res) => {
    res.render('404');
};

