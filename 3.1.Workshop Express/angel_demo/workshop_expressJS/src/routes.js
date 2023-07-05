const cubeController = require('./controllers/cubeController');
const homeController = require('./controllers/homeController');
const router = require('express').Router();
// const express = require('express');
// const Router = express.Router;
//
// const router = Router();

router.get('/',homeController.getHomePage);
router.get('/about',homeController.getAboutPage)

router.get('/create',cubeController.getCreateCube);
router.post('/create', cubeController.postCreateCube)
module.exports = router;
