const router = require('express').Router();

const accessoryManager = require('../managers/accessoryManager');
const {isAuth} = require('../middlewares/authMiddleware');

router.get('/create', isAuth, (req, res) => {
    res.render('accessory/create');
});

router.post('/create', isAuth, async (req, res) => {
    const { name, description, imageUrl } = req.body;

    await accessoryManager.create({ name, description, imageUrl });

    res.redirect('/');
});

module.exports = router;
