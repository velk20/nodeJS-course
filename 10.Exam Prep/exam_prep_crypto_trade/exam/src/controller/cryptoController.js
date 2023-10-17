const router = require('express').Router();
const cryptoManager = require('../managers/cryptoManager');
const {getErrorMessage} = require('../util/errorHelpers');
const {isAuth} = require('../middlewares/authMiddleware');
const crypto = require("crypto");

router.get('/create', isAuth, (req,res)=>{
    res.render('crypto/create');
})

router.post('/create', isAuth, async (req,res) =>{
    const cryptoData = {
        ...req.body,
        owner: req.user?._id,
    }

    try {
        await cryptoManager.create(cryptoData);

        res.redirect('/crypto/catalog');
    }catch (e) {
        res.render('crypto/create', {error: getErrorMessage(e)});
    }
})

router.get('/catalog',async (req,res)=>{
    const cryptos =await cryptoManager.getAll();
    res.render('crypto/catalog', {cryptos});
})

router.get('/:cryptoId/details', async (req, res) => {
    const userId = req.user?._id;
    const cryptoId = req.params.cryptoId;
    const crypto = await cryptoManager.getOne(cryptoId).populate('boughtCrypto').lean();
    const isOwner =  userId == crypto.owner._id
    const hasBought = crypto.boughtCrypto.filter(x=> x._id == userId)

    res.render('crypto/details', {...crypto, isOwner, hasBought});
});

router.get('/:cryptoId/delete', isAuth, async (req, res) => {
    try {
        const cryptoId = req.params.cryptoId;
        await cryptoManager.deleteCrypto(cryptoId);

        res.redirect('/crypto/catalog');

    } catch (e) {
        res.render(`cryptoId/details`, {error: 'Unsuccessful deletion!'});
    }
});

router.get('/:cryptoId/edit', isAuth, async (req,res)=>{
    const cryptoId = req.params.cryptoId;
    const crypto = await cryptoManager.getOne(cryptoId).populate('boughtCrypto').lean();

    res.render('crypto/edit', {...crypto})

})

router.post('/:cryptoId/edit', isAuth, async (req,res)=>{
    const cryptoId = req.params.cryptoId;
    const cryptoData = req.body;

    try {
        await cryptoManager.edit(cryptoId, cryptoData);

        res.redirect(`/crypto/${cryptoId}/details`);
    }catch (e){
        res.render('crypto/edit', {error: getErrorMessage(e), ...cryptoData});
    }
})

router.get('/search', async (req,res)=>{
    const cryptos = await cryptoManager.getAll();
    res.render('crypto/search', {cryptos});
})
router.post('/search', async (req,res)=>{
    const searchText = req.body.searchText.toLowerCase();
    const payment = req.body.payment;

    const cryptos = await cryptoManager.search(searchText, payment);
    res.render('crypto/search', {cryptos});
})

router.get('/:cryptoId/buy', async (req,res)=>{
    const cryptoId = req.params.cryptoId;
    const userId = req.user?._id;

    await cryptoManager.buyCrypto(cryptoId, userId);
    res.redirect(`/crypto/${cryptoId}/details`);
})

module.exports = router;
