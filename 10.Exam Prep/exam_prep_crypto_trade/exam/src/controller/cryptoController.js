const router = require('express').Router();
const cryptoManager = require('../managers/cryptoManager');
const {getErrorMessage} = require('../util/errorHelpers');
const {isAuth} = require('../middlewares/authMiddleware');

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

        res.redirect('/animals/catalog');
    }catch (e) {
        res.render('crypto/create', {error: getErrorMessage(e)});
    }
})

router.get('/catalog',async (req,res)=>{
    const cryptos =await cryptoManager.getAll();
    res.render('crypto/catalog', {cryptos});
})

router.get('/:cryptoId/details', async (req, res) => {
    const cryptoId = req.params.cryptoId;
    const crypto = await cryptoManager.getOne(cryptoId).populate('boughtCrypto').lean();

    res.render('crypto/details', {...crypto});
});


module.exports = router;
