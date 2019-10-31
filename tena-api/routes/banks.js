var express = require('express');
var router = express.Router();
const BankController = require('../controllers/BankController');
const AuthController = require('../controllers/AuthController');


/**
 * @api {get} /adminAccount  Get admin's account
 * @apiName showAdminAccount
 * @apiGroup Banks
 *
 *
 * @apiSuccess {Object} data Contains the admin's bank object.
 * @apiSuccess {Number} status  Contains the status of the response.
 * 
 * @apiSuccessExample Success-Response:
 * 
 *     HTTP/1.1 200 OK
 * {
 *   "data": [
 *       {
 *           "_id": "5db5d7b60ed99405ce9a9e1c",
 *           "type": "Express",
 *           "accountNumber": "8238968969",
 *           "deposit": 13030,
 *           "__v": 0
 *       }
 *   ],
 *   "status": 200
 *   }
 * 
 * @apiError {Object} error Contains the error object sent for the request or description if object is not found.
 * @apiError {Number} status  Contains the status of the response.
 * 
 * @apiErrorExample Error-Response:
 * 
 *  HTTP/1.1 404 Not Found
 * 
 *      { 
 *      error: 'No such bank account found', 
 *      status: 404
 *      }
 * 
 * 
 **/
router.get('/adminAccount', AuthController.verifyToken,  BankController.showAdminAccount);

module.exports = router;