var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');  

const AuthController = require('../controllers/AuthController');
var UserController = require('../controllers/UserController');

/**
 * @api {get} ?username=:name  Request users information
 * @apiName GetAllUsersOrByUsername
 * @apiGroup Users
 *
 * @apiParam {String} username user's name [optional parameter]
 *
 * @apiSuccess {Array} data Contains a list of user object.
 * @apiSuccess {Number} status  Contains the status of the response.
 * 
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *  "data": [
 *      {
 *          "status": "Active",
 *            "_id": "5db5d7b30ed99405ce9a9e18",
 *          "fullName": "admin",
 *          "email": "tena-admin@gmail.com",
 *           "phoneNo": "1234567",
 *          "password": "$2b$10$MuZI4jYuwlxH9SKxWVBPWuE1JJ.nFSSV2CQ/5jLsfvNYwTvy0xB7.",
 *           "role": "admin",
 *           "createdAt": "2019-10-27T17:45:23.919Z",
 *           "modifiedAt": "2019-10-27T17:45:23.919Z",
 *           "__v": 0
 *       },
 *       {
 *           "status": "Active",
 *           "_id": "5db5d7b30ed99405ce9a9e19",
 *           "fullName": "Melat",
 *           "email": "abebe@gmail.com",
 *           "phoneNo": "1234567",
 *           "password": "$2b$10$WWX9pqvl6gDOeXRp4WnHb.ZILq8sWJ69snNJncWn7LZEuUWHaYD.e",
 *           "role": "receiver",
 *           "createdAt": "2019-10-27T17:45:23.953Z",
 *           "modifiedAt": "2019-10-29T13:17:41.707Z",
 *           "__v": 0
 *       } ],
 *   "status": 200
 *      }
 * 
 * 
 * @apiError {Object} error Contains the error object sent for the request or description if object is not found.
 * @apiError {Number} status  Contains the status of the response.
 * 
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *          error: "No users found", 
 *          status: 404
 *     }
 * 
 * 
 */
router.get('/', AuthController.verifyToken,  UserController.getAllOrByUsername);

/**
 * @api {post}  /signup Signup users 
 * @apiName SignUpUser
 * @apiGroup Users
 * 
 * @apiParam {String} fullName full name of the user 
 * @apiParam {String} email email of the user 
 * @apiParam {String} phoneNo phone number of the user 
 * @apiParam {String} password password of the user 
 * @apiParam {String} role role of the user [provider, receiver, admin]
 *
 * @apiSuccess {Object} data Contains the new user object.
 * @apiSuccess {Number} status  Contains the status of the response.
 * 
 * @apiSuccessExample Success-Response:
 * 
 *     HTTP/1.1 201 Created
 *      {
 *  "data": [
 *       {
 *           "status": "Active",
 *           "_id": "5db5d7b30ed99405ce9a9e18",
 *           "fullName": "admin",
 *           "email": "tena-admin@gmail.com",
 *           "phoneNo": "133258685834",
 *           "password": "$2b$10$MuZI4jYuwlxH9SKxWVBPWuE1JJ.nFSSV2CQ/5jLsfvNYwTvy0xB7.",
 *           "role": "admin",
 *           "createdAt": "2019-10-27T17:45:23.919Z",
 *           "modifiedAt": "2019-10-29T16:38:09.393Z",
 *           "__v": 0
 *       },
 *  "status" : 201
 *      }
 * 
 * 
 * @apiError {Object} error Contains the error object sent for the request.
 * @apiError {Number} status  Contains the status of the response.
 * 
 * @apiErrorExample Error-Response
 *      HTTP/1.1 400 Bad Request
 *      {
 *   "error": {
 *       "errors": {
 *           "fullName": {
 *               "message": "Path `fullName` is required.",
 *               "name": "ValidatorError",
 *               "properties": {
 *                   "message": "Path `fullName` is required.",
 *                   "type": "required",
 *                   "path": "fullName"
 *               },
 *               "kind": "required",
 *               "path": "fullName"
 *          },
 *          "email": {
 *               "message": "Path `email` is required.",
 *               "name": "ValidatorError",
 *               "properties": {
 *                   "message": "Path `email` is required.",
 *                   "type": "required",
 *                   "path": "email"
 *               },
 *             "kind": "required",
 *               "path": "email"
 *           },
 *           "role": {
 *               "message": "Path `role` is required.",
 *               "name": "ValidatorError",
 *               "properties": {
 *                   "message": "Path `role` is required.",
 *                   "type": "required",
 *                   "path": "role"
 *               },
 *               "kind": "required",
 *               "path": "role"
 *           }
 *       },
 *       "_message": "User validation failed",
 *       "message": "User validation failed: fullName: Path `fullName` is required., email: Path `email` is required., role: Path `role` is required.",
 *      "name": "ValidationError"
 *   },
 *  "status": 400
 *  }
 *  
 * 
 * 
 */
router.post('/signup', UserController.signUpUser);

/**
 * @api {post}  /login Login users 
 * @apiName LoginUser
 * @apiGroup Users
 * 
 * @apiParam {String} email email of the user
 * @apiParam {String} password password of the user
 *
 * @apiSuccess {Object} data Contains the signed in user object.
 * @apiSuccess {Number} status  Contains the status of the response.
 * 
 * @apiSuccessExample Success-Response:
 * 
 *     HTTP/1.1 200 OK
 *      {
 *  "data": 
 *       {
 *           "status": "Active",
 *           "_id": "5db5d7b30ed99405ce9a9e18",
 *           "fullName": "admin",
 *           "email": "tena-admin@gmail.com",
 *           "phoneNo": "133258685834",
 *           "password": "$2b$10$MuZI4jYuwlxH9SKxWVBPWuE1JJ.nFSSV2CQ/5jLsfvNYwTvy0xB7.",
 *           "role": "admin",
 *           "createdAt": "2019-10-27T17:45:23.919Z",
 *           "modifiedAt": "2019-10-29T16:38:09.393Z",
 *           "__v": 0
 *       },
 *   "token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1NzI1MTM4NDQsImV4cCI6MTU3MjUyMTA0NH0.jldFwt80l0O2iJdov7x8QNucoY6EgRt71bVR47EW0Ao",
 *  "status" : 200
 *      }
 * 
 * 
 * @apiError {Object} error Contains the error object sent for the request or message for invalid login.
 * @apiError {Number} status  Contains the status of the response.
 * 
 * @apiErrorExample Error-Response:
 * 
 *     HTTP/1.1 400 Not Found
 *     {
 *          error: "Invalid email or password", 
 *          status: 400
 *     }
 * 
 * 
 * 
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
 * @apiSuccess {Number} status  Contains the status of the response.
 * 
 * @apiSuccessExample Success-Response:
 * 
 *     HTTP/1.1 200 OK
 *      {
 *  "data": [
 *       {
 *           "status": "Active",
 *           "_id": "5db5d7b30ed99405ce9a9e18",
 *           "fullName": "admin",
 *           "email": "tena-admin@gmail.com",
 *           "phoneNo": "133258685834",
 *           "password": "$2b$10$MuZI4jYuwlxH9SKxWVBPWuE1JJ.nFSSV2CQ/5jLsfvNYwTvy0xB7.",
 *           "role": "admin",
 *           "createdAt": "2019-10-27T17:45:23.919Z",
 *           "modifiedAt": "2019-10-29T16:38:09.393Z",
 *           "__v": 0
 *       },
 *  "status" : 200
 *      }
 * 
 * 
 * 
 * @apiError {Object} error Contains the error object sent for the request or description if object is not found.
 * @apiError {Number} status  Contains the status of the response.
 * 
 * @apiErrorExample Error-Response:
 * 
 *      HTTP/1.1 404 Not Found
 *   {
 *   "error": "No user found",
 *   "status": 404
 *   }
 * 
 * 
 * 
 */
router.get('/:role', UserController.getUsersByRole);

/**
 * @api {put}  updateAccount/:id Update user 
 * @apiName UpdateUser
 * @apiGroup Users
 * 
 * 
 * @apiSuccessExample Success-Response:
 * 
 *      HTTP/1.1 204 No Content
 *
 * 
 * @apiError {Object} error Contains the error object sent for the request.
 * @apiError {Number} status  Contains the status of the response.
 * 
 * @apiErrorExample Error-Response:
 * 
 *  HTTP/1.1 404 Not Found
 *  {
 *   "error": {
 *       "message": "Cast to ObjectId failed for value \"{ _id: '5daf7d31e25f5e1ae808fa0' }\" at path \"_id\" for model \"User\"",
 *       "name": "CastError",
 *       "stringValue": "\"{ _id: '5daf7d31e25f5e1ae808fa0' }\"",
 *       "kind": "ObjectId",
 *       "value": {
 *
 *
 *   "_id": "5daf7d31e25f5e1ae808fa0"
 *       },
 *       "path": "_id"
 *   },
 *   "status": 400
 *   }
 * 
 *      HTTP/1.1 404 Not Found
 *   {
 *   "error": "No user found",
 *   "status": 404
 *   }
 * 
 * 
 * 
 * 
 */
router.put('/updateAccount', AuthController.verifyToken, UserController.updateUser);

/**
 * @api {put} /block/:id Block user
 * @apiName BlockUser
 * @apiGroup Users
 *
 * @apiParam {String} id user's id to be blocked
 *
 * 
 * @apiSuccessExample Success-Response:
 * 
 *      HTTP/1.1 204 No Content
 *
 * 
 * @apiError {Object} error Contains the error object sent for the request.
 * @apiError {Number} status  Contains the status of the response.
 * 
 * @apiErrorExample Error-Response:
 * 
 *  HTTP/1.1 404 Not Found
 *  {
 *   "error": {
 *       "message": "Cast to ObjectId failed for value \"{ _id: '5daf7d31e25f5e1ae808fa0' }\" at path \"_id\" for model \"User\"",
 *       "name": "CastError",
 *       "stringValue": "\"{ _id: '5daf7d31e25f5e1ae808fa0' }\"",
 *       "kind": "ObjectId",
 *       "value": {
 *   "_id": "5daf7d31e25f5e1ae808fa0"
 *       },
 *       "path": "_id"
 *   },
 *   "status": 400
 *   }
 * 
 *      HTTP/1.1 404 Not Found
 *   {
 *   "error": "No user found",
 *   "status": 404
 *   }
 * 
 * 
 * 
 */
router.put('/block/:id', AuthController.verifyToken, UserController.blockUser);


module.exports = router;
