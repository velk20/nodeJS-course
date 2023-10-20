const router = require('express').Router();

const homeController = require('./controller/homeController');
const userController = require('./controller/userController');
const gameController = require('./controller/gameController');

router.use(homeController);
router.use('/users', userController);
router.use('/games', gameController);
router.get('*', (req,res)=>{
  res.redirect('/404');
})
module.exports = router