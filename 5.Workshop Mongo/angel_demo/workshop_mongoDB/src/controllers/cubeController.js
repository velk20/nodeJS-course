const Cube = require('../models/Cube');
const Accessory = require('../models/Accessory');

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
        cube = await Cube.findById(req.params.cubeId).populate('accessories').lean();
      } catch (err){
          console.error(`No cube with id: ${req.params.cubeId}`);
      }

    if (!cube) {
        return res.redirect('/404');
    }

    res.render('cube/details', {cube});
};

exports.getAttachAccessory =async (req,res)=>{
  const cube = await Cube.findById(req.params.cubeId).lean();
  const accessories = await Accessory.find({_id:{$nin: cube.accessories}}).lean();

  res.render('cube/attach',{cube, accessories});
}

exports.postAttachAccessory = async (req,res)=>{
  const cube = await Cube.findById(req.params.cubeId);
  const accessoryID = req.body.accessory;

  cube.accessories.push(accessoryID);

  await cube.save();

  res.redirect(`/cubes/${cube._id}/details`);
}