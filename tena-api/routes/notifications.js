var express = require('express');
var router = express.Router(); 

const NotificationController = require('../controllers/NotificationController');
const AuthController = require('../controllers/AuthController');


/**
 * @api {get} /notifications  Get rates and offers by users
 * @apiName getNotifications
 * @apiGroup Notifications
 *
 *
 * @apiSuccess {Object} data Contains the offer and rates.
 * @apiSuccess {String} type Describes if the data is offer object or rate object.
 * @apiSuccess {Object} provider Contains the provider associated with the request.
 * @apiSuccess {Object} request Contains the request associated with the object represented in the data.
 * @apiSuccess {Object} user Contains the user associated with the rate.
 * @apiSuccess {Number} status  Contains the status of the request.
 * 
 * @apiSuccessExample Success-Response:
 * 
 *     HTTP/1.1 200 OK
 *      
 * [
 *   {
 *       "data": {
 *           "createdAt": "2019-10-27T18:28:27.834Z",
 *           "_id": "5db5e1cfbe9615073fac89cc",
 *           "accountNumber": "12387896456",
 *           "paymentOption": "MasterCard",
 *           "fundAmount": 100,
 *           "providerId": "5db5d7b60ed99405ce9a9e1b",
 *           "requestId": "5db5d7b50ed99405ce9a9e1a",
 *           "__v": 0
 *       },
 *       "type": "offer",
 *       "provider": {
 *           "status": "Active",
 *           "_id": "5db5d7b60ed99405ce9a9e1b",
 *           "fullName": "Meron",
 *           "email": "abc@gmail.com",
 *           "phoneNo": "1234567",
 *           "password": "$2b$10$GKzqj4CLS/XSD7AuhFl8bOEe6WhXCF6lP24QlwOdVdOj6ay216xvO",
 *           "role": "provider",
 *           "createdAt": "2019-10-27T17:45:26.450Z",
 *           "modifiedAt": "2019-10-27T17:45:26.450Z",
 *           "__v": 0
 *       },
 *       "request": {
 *           "status": "pending",
 *           "progress": 600,
 *           "progressPercent": 60,
 *           "rateAmount": 0,
 *           "_id": "5db5d7b50ed99405ce9a9e1a",
 *           "age": 12,
 *           "gender": "F",
 *           "maritalStatus": "married",
 *           "diagnosis": "Cancer",
 *           "description": "blablabla",
 *           "photo": "2019-10-29T13:39:52.551Z-4-up on 10-29-18 at 7.09 PM.jpg",
 *           "verificationFile": "2019-10-20T10:16:04.631Z-index.js",
 *           "recoveryCost": 1000,
 *           "patientId": "5db5d7b30ed99405ce9a9e19",
 *           "requestedAt": "2019-10-27T17:45:25.400Z",
 *           "__v": 0
 *       },
 *       "patient": {
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
 *       },
 *       "status": 200
 *       }
 *   ]
 * 
 * @apiError {Object} error Contains the error object sent for the request or description if object is not found.
 * @apiError {Number} status  Contains the status of the response.
 * 
 * @apiErrorExample Error-Response:
 * 
 *  HTTP/1.1 404 Not Found
 * 
 *      {
 *          error: 'No offer and rates found', 
 *          status: 404
 *       }
 * 
 * 
 **/
router.get('/', AuthController.verifyToken, NotificationController.getNotifications);

module.exports = router;