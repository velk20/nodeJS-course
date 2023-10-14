const router = require('express').Router();

const homeController = require('./controller/homeController');
const userController = require('./controller/userController');
const animalController = require('./controller/animalController');

router.use(homeController);
router.use('/users', userController);
router.use('/animals', animalController);
router.get('*', (req,res)=>{
  res.redirect('/404');
})
module.exports = router