const router = require('express').Router();
const animalManager = require('../managers/animalManager');
router.get('/',async (req,res)=>{
  const animals = await animalManager.getLatestAnimals();

  res.render('home', {animals});
})

router.get('/404',(req,res)=>{
  res.render('404');
})
module.exports = router;