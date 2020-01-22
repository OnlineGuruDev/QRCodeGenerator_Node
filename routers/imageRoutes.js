var express = require('express');
var imageController = require('../controllers/imageController');
var router = express.Router();

router.post('/addQRCodeImage', imageController.createApp);

module.exports = router