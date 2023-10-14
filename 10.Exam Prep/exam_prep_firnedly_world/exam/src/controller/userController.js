const router = require('express').Router();
const userManager = require('../managers/userManager');
const {getErrorMessage} = require('../util/errorHelpers');
const {isAuth} = require('../middlewares/authMiddleware');

router.get('/login', (req, res) => {
  res.render('users/login');
});

router.post('/login', async (req, res) => {
  const {email, password} = req.body;
  try {
    const token = await userManager.login(email, password);

    res.cookie('token', token);
    res.redirect('/');
  } catch (e) {
    res.render('users/login', {error: getErrorMessage(e)});
  }
});
router.get('/register', (req, res) => {
  res.render('users/register');
});


router.post('/register', async (req, res) => {
  const {email, password, repeatPassword} = req.body;

  try {
    const token = await userManager.register({email, password, repeatPassword});

    res.cookie('token', token);
    res.redirect('/');
  } catch (e) {
    res.render('users/register', {error: getErrorMessage(e), email});
  }

});

router.get('/logout', isAuth, (req, res) => {
  res.clearCookie('token');

  res.redirect('/');
});


module.exports = router;