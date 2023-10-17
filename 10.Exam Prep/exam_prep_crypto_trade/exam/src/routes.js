const router = require('express').Router();

const homeController = require('./controller/homeController');
const userController = require('./controller/userController');
const cryptoController = require('./controller/cryptoController');

router.use(homeController);
router.use('/users', userController);
router.use('/crypto', cryptoController);
router.get('*', (req,res)=>{
  res.redirect('/404');
})
module.exports = router