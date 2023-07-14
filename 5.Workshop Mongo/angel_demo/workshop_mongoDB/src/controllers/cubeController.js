const Cube = require('../models/Cube');

exports.getCreateCube = (req, res) => {
    res.render('create');
};

exports.postCreateCube = async (req, res) => {
    console.log(req.body)
    const {name, description, difficultyLevel, imageUrl} = req.body;
    let cube = new Cube({name, description, imageUrl, difficultyLevel});
    await cube.save();
    res.redirect('/');
};

exports.getDetails = async (req, res)=>{

    let cube;
      try{
        cube = await Cube.findById(req.params.cubeId).lean();
      } catch (err){
          console.error(`No cube with id: ${req.params.cubeId}`);
      }

    if (!cube) {
        return res.redirect('/404');
    }

    res.render('details', {cube});
};