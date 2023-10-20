const router = require('express').Router();
const gameManager = require('../managers/gameManager');
const {getErrorMessage} = require('../util/errorHelpers');
const {isAuth} = require('../middlewares/authMiddleware');

router.get('/create', isAuth, (req,res)=>{
    res.render('games/create');
})

router.post('/create', isAuth, async (req,res) =>{
    const gameData = {
        ...req.body,
        owner: req.user?._id,
    }

    try {
        await gameManager.create(gameData);

        res.redirect('/games/catalog');
    }catch (e) {
        res.render('games/create', {error: getErrorMessage(e)});
    }
})

router.get('/catalog', async (req,res)=>{
    const games = await gameManager.getAll();
    res.render('games/catalog', {games})
})

router.get('/:gameId/details', async (req,res)=>{
    const {gameId} = req.params;
    const userId = req.user?._id;
    const game = await gameManager.getOne(gameId).populate('boughtBy').lean();
    const isOwner =  userId == game.owner._id
    const hasBought = game.boughtBy.filter(x=> x._id == userId)

    res.render('games/details', {...game, isOwner, hasBought})
})

router.get('/:gameId/delete', isAuth, async (req, res) => {
    try {
        const {gameId} = req.params;
        await gameManager.deleteGame(gameId);

        res.redirect('/games/catalog');

    } catch (e) {
        res.render(`games/details`, {error: 'Unsuccessful deletion!'});
    }
});

router.get('/:gameId/buy', isAuth, async (req,res)=>{
    const {gameId} = req.params;
    const userId = req.user?._id;

    await gameManager.buyGame(gameId, userId);
    res.redirect(`/games/${gameId}/details`);
})

router.get('/:gameId/edit', isAuth, async (req,res)=>{
    const {gameId} = req.params
    const game = await gameManager.getOne(gameId).lean();

    res.render('games/edit', {...game});
})

router.post('/:gameId/edit', isAuth, async (req,res)=>{
    const {gameId} = req.params
    const gameData = req.body;

    try {
        await gameManager.edit(gameId, gameData);

        res.redirect(`/games/${gameId}/details`);
    }catch (e) {
        res.render('games/edit', {error: getErrorMessage(e), ...gameData});
    }
})

router.get('/search', async (req,res)=>{
    const games = await gameManager.getAll();
    res.render('games/search', {games});
})
router.post('/search', async (req,res)=>{
    const searchText = req.body.searchText.toLowerCase();
    const {platform} = req.body;

    const games = await gameManager.search(searchText, platform);
    res.render('games/search', {games});
})

module.exports = router;
