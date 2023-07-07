const db = require('../db.json');

exports.getHomePage = (req,res) => {
    console.log(req.query);
    const {search, from: difficultyFrom, difficultyTo} = req.query;
    let cubes = db.cubes;
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

