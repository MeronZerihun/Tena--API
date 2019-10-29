var express = require('express');
var router = express.Router();

var UserController = require('../controllers/UserController');

/**
 * @api {get} ?username=:name  request all users information or by username
 * @apiName GetAllUsersOrByUsername
 * @apiGroup Users
 *
 * @apiParam {String} username user's name [optional parameter]
 *
 * @apiSuccess {Array} data Contains a list of user object.
 * @apiSuccess {Number} status  Contains the status of the request.
 * 
 * @apiSuccess {Array} error Contains description if object is not found.
 * 
 * @apiError {Object} error Contains the error object sent in the request.
 * @apiError {Number} status  Contains the status of the request.
 */
router.get('/',  UserController.getAllOrByUsername);

/**
 * @api {post}  /signup Signup users 
 * @apiName SignUpUser
 * @apiGroup Users
 *
 * @apiSuccess {Object} data Contains the new user object.
 * @apiSuccess {Number} status  Contains the status of the request.
 * 
 * 
 * @apiError {Object} error Contains the error object sent in the request.
 * @apiError {Number} status  Contains the status of the request.
 */
router.post('/signup', UserController.signUpUser);

/**
 * @api {post}  /login Login users 
 * @apiName LoginUser
 * @apiGroup Users
 *
 * @apiSuccess {Object} data Contains the signed in user object.
 * @apiSuccess {Number} status  Contains the status of the request.
 * 
 * @apiSuccess {String} error Contains error for invalid login.
 * 
 * @apiError {Object} error Contains the error object sent in the request.
 * @apiError {Number} status  Contains the status of the request.
 */
router.post('/login', UserController.loginUser);

/**
 * @api {get}  /:role Get users by role [receiver or provider] 
 * @apiName GetUsersByRole
 * @apiGroup Users
 * 
 * @apiParam {role} role user's role [receiver or provider] 
 *
 * @apiSuccess {Array} data Contains a list of user object.
 * @apiSuccess {Number} status  Contains the status of the request.
 * 
 * @apiSuccess {String} error Contains description if object is not found.
 * 
 * @apiError {Object} error Contains the error object sent in the request.
 * @apiError {Number} status  Contains the status of the request.
 */
router.get('/:role', UserController.getUsersByRole);

/**
 * @api {put}  updateAccount/:id Update user 
 * @apiName UpdateUser
 * @apiGroup Users
 * 
 * @apiParam {id} id user's id
 *
 * @apiSuccess {Object} data Contains the user's updated object.
 * @apiSuccess {Number} status  Contains the status of the request.
 * 
 * 
 * @apiError {Object} error Contains the error object sent in the request.
 * @apiError {Number} status  Contains the status of the request.
 */
router.put('/updateAccount/:id', UserController.updateUser);

/**
 * @api {put} /block/:id Block user
 * @apiName BlockUser
 * @apiGroup Users
 *
 * @apiParam {id} id user's id
 *
 * @apiSuccess {Object} data Contains user's updated object object.
 * @apiSuccess {Number} status  Contains the status of the request.
 * 
 * @apiSuccess {Array} error Contains description if object is not found.
 * 
 * @apiError {Object} error Contains the error object sent in the request.
 * @apiError {Number} status  Contains the status of the request.
 */
router.put('/block/:id', UserController.blockUser);


module.exports = router;
