var express = require('express');
var imageController = require('../controllers/imageController');
var router = express.Router();

router.post('/addImage', imageController.createApp);

module.exports = router