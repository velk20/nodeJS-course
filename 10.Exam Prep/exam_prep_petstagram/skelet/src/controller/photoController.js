const router = require('express').Router();
const photoManager = require('../managers/photoManager');
const {getErrorMessage} = require('../util/errorHelpers');
const {isAuth} = require('../middlewares/authMiddleware');

router.get('/', async (req, res) => {
  const photos = await photoManager.getAll();

  res.render('photos/index', {photos});
});

router.get('/create', isAuth,(req, res) => {
  res.render('photos/create');
});

router.post('/create', isAuth,async (req, res) => {
  const photoData = {
    ...req.body, owner: req.user._id,
  };

  try {
    await photoManager.create(photoData);

    res.redirect('/photos');
  } catch (e) {
    res.render('photos/create', {error: getErrorMessage(e)});
  }

});

router.get('/:photoId/details', async (req, res) => {
  const photoId = req.params.photoId;
  const photo = await photoManager.getOne(photoId).populate('commentList.user').lean();
  const isOwner = req.user?._id == photo.owner._id;

  res.render('photos/details', {photo, isOwner});
});

router.get('/:photoId/delete', isAuth,async (req, res) => {
  try {
    const photoId = req.params.photoId;
    await photoManager.deletePhoto(photoId);

    res.redirect('/photos/');
  } catch (e) {
    res.render(`photos/details`, {error: 'Unsuccessful deletion'});

  }
});

router.get('/:photoId/edit', isAuth,async (req, res) => {
  try {
    const photoId = req.params.photoId;
    const photo = await photoManager.getOne(photoId);

    res.render('photos/edit', {photo});
  } catch (e) {
    res.render(`photos/edit`, {error: 'Unsuccessful editing'});

  }
});

router.post('/:photoId/edit', isAuth,async (req, res) => {
  const photoData = req.body;
  try {
    const photoId = req.params.photoId;
    const photo = await photoManager.edit(photoId, photoData);

    res.redirect(`/photos/${photoId}/details`);
  } catch (e) {
    res.render(`photos/edit`, {error: 'Unsuccessful editing', ...photoData});

  }
});

router.post('/:photoId/comment',isAuth, async  (req,res)=>{
  const photoId = req.params.photoId;
  const {message} = req.body;
  const user = req?.user?._id;

  try {
    const photo = await photoManager.addComment(photoId, { user, message});

    res.redirect(`/photos/${photoId}/details`);
  }catch (e) {

  }

})
module.exports = router;