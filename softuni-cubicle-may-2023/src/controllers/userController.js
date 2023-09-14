const router = require('express').Router();
const userManager = require('../managers/userManager');
const {extractErrorMessages} = require('../util/errorHelpers');
router.get('/register',(req,res)=>{
  res.render('users/register');
});

router.post('/register',async (req,res)=>{
  const {username, password, repeatPassword} = req.body;

  try {
    await userManager.register({username, password, repeatPassword});
    res.redirect('/users/login');
  } catch (err) {
    const errorMessages = extractErrorMessages(err);
    res.status(400).render('users/register', {errorMessages: errorMessages});
  }
});

router.get('/login',  (req,res) =>{
  res.render('users/login');
})

router.post('/login', async (req,res, next)=>{
  const {username, password} = req.body;

  try {
    const token = await userManager.login(username, password);

    res.cookie('auth', token, {httpOnly: true});

    res.redirect('/');
  } catch (err) {
    next(err);
  }
})

router.get('/logout',(req,res)=>{
  res.clearCookie('auth');
  res.redirect('/');
})

module.exports = router;