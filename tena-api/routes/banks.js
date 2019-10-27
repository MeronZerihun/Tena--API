var express = require('express');
var router = express.Router();
const BankController = require('../controllers/BankController');

//router.post('/debit', BankController.debit);
router.get('/adminAccount', BankController.showAdminAccount);

module.exports = router;