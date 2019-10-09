var express = require('express');
var router = express.Router();

var UserController = require('../controllers/UserController');


router.get('/',  UserController.getAllOrByUsername);

router.post('/signup', UserController.signUpUser);

router.post('/login', UserController.loginUser);

router.get('/:role', UserController.getUsersByRole);

router.put('/updateAccount/:id', UserController.updateUser);


module.exports = router;
