const router = require('express').Router();
const electronicManager = require('../managers/electronicManager');
const {getErrorMessage} = require('../util/errorHelpers');
const {isAuth} = require('../middlewares/authMiddleware');

router.get('/create', isAuth, (req,res)=>{
    res.render('electronics/create');
});

router.post('/create', isAuth, async (req,res) =>{
    const electronicData = {
        ...req.body,
        owner: req.user?._id,
    }

    try {
        await electronicManager.create(electronicData);

        res.redirect('/electronics/catalog');
    }catch (e) {
        res.render('electronics/create', {error: getErrorMessage(e), ...electronicData});
    }
});

router.get('/catalog', async (req,res)=>{
    const electronics = await electronicManager.getAll();
    res.render('electronics/catalog',{electronics});
})

router.get('/:electronicId/details', async (req, res) => {
    const userId = req.user?._id;
    const {electronicId} = req.params;
    const electronic = await electronicManager
      .getOne(electronicId)
      .populate('buyingList')
      .lean();
    const isOwner = userId == electronic.owner._id;
    const hasBought = electronic.buyingList.filter((x) => x._id == userId);

    res.render('electronics/details', { ...electronic, isOwner, hasBought });
});

router.get('/:electronicId/delete', isAuth, async (req, res) => {
    try {
        const {electronicId} = req.params;
        const userId = req.user?._id;
        let electronic = await electronicManager.getOne(electronicId);
        if (electronic.owner._id != userId) {
            res.render('404', {error: 'Unauthorized deletion of electronic'});
            return;
        }

        await electronicManager.deleteCrypto(electronicId);

        res.redirect('/electronics/catalog');
    } catch (e) {
        res.render(`electronics/details`, { error: 'Unsuccessful deletion!' });
    }
});

router.get('/:electronicId/buy', isAuth, async (req, res) => {
    const {electronicId} = req.params;
    const userId = req.user?._id;

    await electronicManager.buy(electronicId, userId);
    res.redirect(`/electronics/${electronicId}/details`);
});

router.get('/:electronicId/edit', isAuth, async (req, res) => {
    const electronicId = req.params.electronicId;
    const electronic = await electronicManager
      .getOne(electronicId)
      .populate('buyingList')
      .lean();

    res.render('electronics/edit', { ...electronic });
});

router.post('/:electronicId/edit', isAuth, async (req, res) => {
    const electronicId = req.params.electronicId;
    const electronicData = req.body;

    try {
        await electronicManager.edit(electronicId, electronicData);

        res.redirect(`/electronics/${electronicId}/details`);
    } catch (e) {
        res.render('electronics/edit', { error: getErrorMessage(e), ...electronicData });
    }
});

router.get('/search', isAuth, async (req, res) => {
    const electronics = await electronicManager.getAll();
    res.render('electronics/search', { electronics });
});
router.post('/search', isAuth, async (req, res) => {
    const searchText = req.body.searchText.toLowerCase();
    const type = req.body.type;

    const electronics = await electronicManager.search(searchText, type);
    res.render('electronics/search', { electronics });
});

module.exports = router;