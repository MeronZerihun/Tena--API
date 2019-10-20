var express = require('express');
var router = express.Router();

var OfferController = require('../controllers/OfferController');

router.post('/fund', OfferController.offerFund);

router.get('/:id', OfferController.getOffersByProvider);

module.exports = router;