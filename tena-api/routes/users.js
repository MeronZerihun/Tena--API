var express = require('express');
var router = express.Router();

var UserController = require('../controllers/UserController');

/**
 * @api {get} / or ?username= Request User information
 * @apiName GetAllUsersOrByUsername
 * @apiGroup User
 *
 * @apiParam {String} username User's name.
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */

router.get('/',  UserController.getAllOrByUsername);

router.post('/signup', UserController.signUpUser);

router.post('/login', UserController.loginUser);

router.get('/:role', UserController.getUsersByRole);

router.put('/updateAccount/:id', UserController.updateUser);


module.exports = router;
