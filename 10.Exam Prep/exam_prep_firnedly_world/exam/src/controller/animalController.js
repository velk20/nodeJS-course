const router = require('express').Router();
const animalManager = require('../managers/animalManager');
const {getErrorMessage} = require('../util/errorHelpers');
const {isAuth} = require('../middlewares/authMiddleware');

router.get('/create', isAuth, (req, res) => {
    res.render('animals/create');
});

router.post('/create', isAuth, async (req, res) => {
    const animalData = {
        ...req.body, owner: req.user?._id,
    };

    try {
        await animalManager.create(animalData);

        res.redirect('/animals/dashboard');
    } catch (e) {
        res.render('animals/create', {error: getErrorMessage(e)});
    }
});

router.get('/dashboard', async (req, res) => {
    const animals = await animalManager.getAll();
    res.render('animals/dashboard', {animals});
});

router.get('/:animalId/details', async (req, res) => {
    const animalId = req.params.animalId;
    const animal = await animalManager.getOne(animalId).populate('donations.user').lean();
    const userId = req.user?._id;
    const isOwner = userId == animal.owner._id;
    const hasDonation = animal.donations.map(x => x.user._id == userId);

    res.render('animals/details', {...animal, isOwner, hasDonation});
});

router.get('/:animalId/delete', isAuth, async (req, res) => {
    try {
        const animalId = req.params.animalId;
        await animalManager.deleteAnimal(animalId);

        res.redirect('/animals/dashboard');

    } catch (e) {
        res.render(`photos/details`, {error: 'Unsuccessful deletion!'});
    }
});

router.get('/:animalId/edit', isAuth, async (req, res) => {

    const animalId = req.params.animalId;
    const animal = await animalManager.getOne(animalId);
    res.render('animals/edit', {...animal});

});

router.post('/:animalId/edit', isAuth, async (req, res) => {
    const animalData = req.body;
    try {
        const animalId = req.params.animalId;
        const animal = await animalManager.edit(animalId, animalData);

        res.redirect(`/animals/${animalId}/details`);
    }catch (e){
        res.render('animals/edit', {error: getErrorMessage(e)});
    }
});

router.get('/search', async (req,res)=>{
    const animals = await animalManager.getAll();
    res.render('animals/search', {animals});
})

router.post('/search', async (req,res)=>{
    const searchText = req.body.searchText;
    const animals = await animalManager.search(searchText);
    res.render('animals/search', {animals});
})

module.exports = router;
