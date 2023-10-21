const router = require('express').Router();

const homeController = require('./controller/homeController');
const userController = require('./controller/userController');
const electronicController = require('./controller/electronicController');

router.use(homeController);
router.use('/users', userController);
router.use('/electronics', electronicController);
router.get('*', (req,res)=>{
  res.redirect('/404');
})
module.exports = router