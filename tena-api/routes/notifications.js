var express = require('express');
var router = express.Router(); 

const NotificationController = require('../controllers/NotificationController');

router.get('/', NotificationController.getNotifications);

module.exports = router;