var express = require('express');
var router = express.Router();

var OfferController = require('../controllers/OfferController');
const AuthController = require('../controllers/AuthController');

/**
 * @api {post}  /fund Fund a request
 * @apiName OfferFund
 * @apiGroup Offers
 * 
 * @apiParam {String} type of the bank 
 * @apiParam {Number} amount amount of money to be funded
 * @apiParam {String} accountNo phone number of the user 
 * @apiParam {String} requestId id of the request to be funded 
 *
 * @apiSuccess {Object} data Contains the new offer object.
 * @apiSuccess {Number} status  Contains the status of the request.
 * 
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 201 Created
 * 
 *      {
 *          "data": {
 *              "createdAt": "2019-10-30T09:19:12.459Z",
 *              "_id": "5db9559425cd631569f09126",
 *              "accountNumber": "12387896456",
 *              "paymentOption": "MasterCard",
 *              "fundAmount": 200,
 *              "providerId": "5db5d7b60ed99405ce9a9e1b",
 *              "requestId": "5db5d7b50ed99405ce9a9e1a",
 *              "__v": 0
 *          },
 *          "status": 201
 *      }
 * 
 * @apiError {Object} error Contains the error object sent for the request or description if object is not found.
 * @apiError {Number} status Contains status of the response.
 * 
 * @apiErrorExample Error-Response:
 * 
 *    HTTP/1.1 400 Bad Request
 *      {
 *           "error": {
 *               "message": "Cast to ObjectId failed for value \"5db5d7b6ed99405ce9a9e1b\" at path \"_id\" for model \"User\"",
 *               "name": "CastError",
 *               "stringValue": "\"5db5d7b6ed99405ce9a9e1b\"",
 *               "kind": "ObjectId",
 *               "value": "5db5d7b6ed99405ce9a9e1b",
 *               "path": "_id"
 *           },
 *           "status": 400
 *       }
 * 
 *    HTTP/1.1 404 Not Found
 * 
 *      {
 *          "error": {
 *              "message": "Cast to ObjectId failed for value \"5db5d7b6ed99405ce9a9e1b\" at path \"_id\" for model \"User\"",
 *              "name": "CastError",
 *              "stringValue": "\"5db5d7b6ed99405ce9a9e1b\"",
 *              "kind": "ObjectId",
 *              "value": "5db5d7b6ed99405ce9a9e1b",
 *              "path": "_id"
 *          },
 *          "status": 400
 *      }
 * 
 *     
 * 
 * 
 **/
router.post('/fund', AuthController.verifyToken, OfferController.offerFund);

/**
 * @api {get}  / Get offers by a provider
 * @apiName GetOffersByProvider
 * @apiGroup Offers
 * 
 *
 * @apiSuccess {Object} data Contains the new offer object.
 * @apiSuccess {Number} status  Contains the status of the request.
 * 
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 Ok
 * 
 *      {
 *          "data": {
 *              "createdAt": "2019-10-30T09:19:12.459Z",
 *              "_id": "5db9559425cd631569f09126",
 *              "accountNumber": "12387896456",
 *              "paymentOption": "MasterCard",
 *              "fundAmount": 200,
 *              "providerId": "5db5d7b60ed99405ce9a9e1b",
 *              "requestId": "5db5d7b50ed99405ce9a9e1a",
 *              "__v": 0
 *          },
 *          "status": 200
 *      }
 * 
 * @apiError {Object} error Contains the error object sent for the request or description if object is not found.
 * @apiError {Number} status Contains status of the response.
 * 
 * @apiErrorExample Error-Response:
 * 
 *    HTTP/1.1 400 Bad Request
 *      {
 *           "error": {
 *               "message": "Cast to ObjectId failed for value \"5db5d7b6ed99405ce9a9e1b\" at path \"_id\" for model \"User\"",
 *               "name": "CastError",
 *               "stringValue": "\"5db5d7b6ed99405ce9a9e1b\"",
 *               "kind": "ObjectId",
 *               "value": "5db5d7b6ed99405ce9a9e1b",
 *               "path": "_id"
 *           },
 *           "status": 400
 *       }
 * 
 *    HTTP/1.1 404 Not Found
 * 
 *      {
 *          "error": "No user found",
 *          "status": 404
 *      }
 * 
 *     
 * 
 * 
 **/
router.get('/', OfferController.getOffersByProvider);

/**
 * @api {get}  /all Get all offers
 * @apiName GetAllOffers
 * @apiGroup Offers
 * 
 *
 * @apiSuccess {Array} data Contains all offer objects.
 * @apiSuccess {Number} status  Contains the status of the request.
 * 
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 Ok
 * 
 *      {
 *          "data": [ 
 *              {
 *                  "createdAt": "2019-10-30T09:19:12.459Z",
 *                  "_id": "5db9559425cd631569f09126",
 *                  "accountNumber": "12387896456",
 *                  "paymentOption": "MasterCard",
 *                  "fundAmount": 200,
 *                  "providerId": "5db5d7b60ed99405ce9a9e1b",
 *                  "requestId": "5db5d7b50ed99405ce9a9e1a",
 *                  "__v": 0
 *              }
 *          ],
 *          "status": 200
 *      }
 * 
 * @apiError {Object} error Contains the error object sent for the request or description if object is not found.
 * @apiError {Number} status Contains status of the response.
 * 
 * @apiErrorExample Error-Response:
 * 
 * 
 *    HTTP/1.1 404 Not Found
 * 
 *      {
 *          "error":  'No offers found',
 *          "status": 404
 *      }
 * 
 *     
 * 
 * 
 **/
router.get('/all', OfferController.getAllOffers);
/**
 * @api {get}  /patient/:id Get offers for a patient
 * @apiName GetOffersToPatient
 * @apiGroup Offers
 * 
 * @apiParam {String} id id of the patient[receiver]
 *
 * @apiSuccess {Object} data Contains a list of offers to patients.
 * @apiSuccess {Object} provider Contains the user object of the provider.
 * @apiSuccess {Number} status  Contains the status of the request.
 * 
 * @apiSuccessExample Success-Response:
 *      HTTP/1.1 200 Ok
 * 
 *      [
 *           {
 *               "data": {
 *                   "createdAt": "2019-10-27T18:23:54.466Z",
 *                   "_id": "5db5e0fed821f20711e03cf3",
 *                   "accountNumber": "12387896456",
 *                   "paymentOption": "MasterCard",
 *                   "fundAmount": 100,
 *                   "providerId": "5db5d7b60ed99405ce9a9e1b",
 *                   "requestId": "5db5d7b50ed99405ce9a9e1a",
 *                   "__v": 0
 *               },
 *               "provider": {
 *                   "status": "Active",
 *                   "_id": "5db5d7b60ed99405ce9a9e1b",
 *                   "fullName": "Meron",
 *                   "email": "abc@gmail.com",
 *                   "phoneNo": "1234567",
 *                   "password": "$2b$10$GKzqj4CLS/XSD7AuhFl8bOEe6WhXCF6lP24QlwOdVdOj6ay216xvO",
 *                   "role": "provider",
 *                   "createdAt": "2019-10-27T17:45:26.450Z",
 *                   "modifiedAt": "2019-10-27T17:45:26.450Z",
 *                   "__v": 0
 *               },
 *               "status": 200
 *           }
 *       ]
 * 
 * @apiError {Object} error Contains the error object sent for the request or description if object is not found.
 * @apiError {Number} status Contains status of the response.
 * 
 * @apiErrorExample Error-Response:
 * 
 *    HTTP/1.1 400 Bad Request
 *      {
 *           "error": {
 *               "message": "Cast to ObjectId failed for value \"5db5d7b6ed99405ce9a9e1b\" at path \"_id\" for model \"User\"",
 *               "name": "CastError",
 *               "stringValue": "\"5db5d7b6ed99405ce9a9e1b\"",
 *               "kind": "ObjectId",
 *               "value": "5db5d7b6ed99405ce9a9e1b",
 *               "path": "_id"
 *           },
 *           "status": 400
 *       }
 * 
 *    HTTP/1.1 404 Not Found
 * 
 *      {
 *          "error": "No user found",
 *          "status": 404
 *      }
 * 
 * 
 * 
 **/

router.get('/patients', AuthController.verifyToken, OfferController.getOffersToPatient);

module.exports = router;