const router = require('express').Router();
const Accessory = require('../models/Accessory');

//URL: /accessory/create
router.get('/create',(req,res)=>{
  res.render('accessory/create');
});

router.post('/create',async (req,res)=>{
  const {name, description, imageUrl} = req.body;

  const savedAccessory = await Accessory.create({name,description, imageUrl })
  console.log(`Accessory with id:${savedAccessory._id} was saved`);

  res.redirect('/');
});



module.exports = router;