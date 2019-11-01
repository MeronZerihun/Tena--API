var express = require('express');
var router = express.Router();

const fs = require('fs');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        if(file.fieldname==='verificationFile'){
            fs.exists('./tena-uploads/files/',(exists)=>{
                if(!exists){
                    fs.mkdir('./tena-uploads/files/',(err)=>{
                        if(err){
                            cb(new Error('error in directory'),err);
                        }
                    });
                }
                cb(null,'./tena-uploads/files/');
            })
        }
        else if(file.fieldname==='photo'){
            fs.exists('./tena-uploads/photo/',(exists)=>{
                if(!exists){
                    fs.mkdir('./tena-uploads/photo/',(err)=>{
                        if(err){
                            cb(new Error('error in directory'),err);
                        }
                    });
                }
                cb(null,'./tena-uploads/photo/');
            })
        }
    }, 
    filename: function(req, file, cb){
        cb(null, new Date().toISOString()+'-'+file.originalname);
    }
})

const uploads = multer({storage: storage});

var RequestController = require('../controllers/RequestController');
const AuthController = require('../controllers/AuthController');

/**
 * @api {post} /new Make a fund request
 * @apiName MakeFundRequest
 * @apiGroup Requests
 *
 * @apiParam {Number} age age of the user
 * @apiParam  {String} gender gender of the user
 * @apiParams {String} maritalStatus  marital status of the user
 * @apiParams {String} diagnosis the case the user is diagnosed with
 * @apiParams {String} description description on the user's diagnosis
 * @apiParams {String} photo path to the location of the picture,
 * @apiParams {String} verificationFile path to the location of the verification file,
 * @apiParams {Number} recoveryCost const for the medical recovery
 * 
 * @apiSuccess {Object} data Contains the new request object.
 * @apiSuccess {Number} status  Contains the status of the response.
 * 
 * @apiSuccessExample Success-Response:
 * 
 *     HTTP/1.1 201 Created
 * 
 *      {
 *          "data": {
 *              "status": "pending",
 *              "progress": 0,
 *              "progressPercent": 0,
 *               "rateAmount": 0,
 *              "_id": "5dbb4fc1695ef2067d4e1f3f",
 *              "age": 46,
 *              "gender": "M",
 *              "maritalStatus": "Divorced",
 *              "diagnosis": "Hepatatis",
 *              "description": "melkam neger yihun",
 *              "photo": "tena-uploads/photo/2019-10-31T21:18:57.137Z-4-up on 10-29-18 at 7.09 PM.jpg",
 *              "verificationFile": "tena-uploads/files/2019-10-31T21:18:57.139Z-stream.js",
 *              "recoveryCost": 3460,
 *              "patientId": "5db5d7b30ed99405ce9a9e19",
 *              "requestedAt": "2019-10-31T21:18:57.156Z",
 *              "__v": 0
 *          },
 *          "status": 201
 *       }
 * 
 * @apiError {Object} error Contains the error object sent for the request.
 * @apiError {Number} status  Contains the status of the response.
 * 
 * @apiErrorExample Error-Response: 
 *      HTTP/1.1 400 Bad Request
 * 
 *      {
 *          "error": {
 *              "errors": {
 *                  "description": {
 *                      "message": "Path `description` is required.",
 *                      "name": "ValidatorError",
 *                      "properties": {
 *                      "message": "Path `description` is required.",
 *                      "type": "required",
 *                      "path": "description"
 *                    },
 *               "kind": "required",
 *               "path": "description"
 *           }
 *       },
 *          "_message": "FundRequest validation failed",
 *          "message": "FundRequest validation failed: description: Path `description` is required.",
 *          "name": "ValidationError"
 *              },
 *      "status": 400
 *   }
 * 
 * 
 *  HTTP/1.1 403 Forbidden 
 *      Forbidden
 * 
 * 
 *
 **/

router.post('/new', AuthController.verifyToken, uploads.fields([{name: 'photo', maxCount: 1},{name: 'verificationFile', maxCount: 1}]), RequestController.makeFundRequest);

/**
 * @api {get} /pending Get pending request
 * @apiName GetPendingRequest
 * @apiGroup Requests
 * 
 * @apiSuccess {Array} data Contains a list of pending requests
 * @apiSuccess {Number} status Contains status of the response
 * 
 * 
 * @apiSuccessExample Success-Response:
 * 
 *      HTTP/1.1 200 Ok
 * 
 *          {
 *   "data": [
 *       {
 *           "status": "pending",
 *           "progress": 800,
 *           "progressPercent": 80,
 *           "rateAmount": 1,
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
 *           "__v": 0,
 *           "user": {
 *               "status": "Active",
 *               "_id": "5db5d7b30ed99405ce9a9e19",
 *               "fullName": "Melat",
 *               "email": "abebech@gmail.com",
 *               "phoneNo": "1234567",
 *               "password": "$2b$10$5oalvdOF5ltPlCcz9KKXzegEeMLT5Co9qitEhmJ7nN6msIuNl1Xwu",
 *               "role": "receiver",
 *               "createdAt": "2019-10-27T17:45:23.953Z",
 *               "modifiedAt": "2019-10-31T17:15:54.512Z",
 *               "__v": 0
 *           },
 *           "rate": false
 *       }
 *   ], 
 *   status: 200
 *   }
 *
 * @apiError {Object} error Contains the error object sent for the request or message for invalid login.
 * @apiError {Number} status  Contains the status of the response.
 * 
 * @apiErrorExample Error-Response:
 * 
 *     HTTP/1.1 404 Not Found
 * 
 *  {
 *   "error": "No such request",
 *   "status": 404
 *   }
 * 
 * 
 * 
 * 
 **/

router.get('/pending', RequestController.getPendingRequest);

/**
 * @api {get} /accepted Get accepted request
 * @apiName GetAcceptedRequest
 * @apiGroup Requests
 * 
 * @apiSuccess {Array} data Contains a list of accepted requests
 * @apiSuccess {Number} status Contains status of the response
 * 
 * @apiSuccessExample Success-Response:
 *      Refer /pending route
 * 
 * 
 * 
 * @apiError {Object} error Contains the error object sent for the request or message for invalid login.
 * @apiError {Number} status  Contains the status of the response.
 * 
 * @apiErrorExample Error-Response:
 *      Refer /pending route
 * 
 **/

router.get('/accepted', RequestController.getAcceptedRequest);

/**
 * @api {get} /declined Get declined request
 * @apiName GetDeclinedRequest
 * @apiGroup Requests
 * 
 * @apiSuccess {Array} data Contains a list of declined requests
 * @apiSuccess {Number} status Contains status of the response
 * 
 * @apiSuccessExample Success-Response:
 *      Refer /pending route
 * 
 * 
 * 
 * @apiError {Object} error Contains the error object sent for the request or message for invalid login.
 * @apiError {Number} status  Contains the status of the response.
 * 
 * @apiErrorExample Error-Response:
 *      Refer /pending route
 * 
 **/
router.get('/declined', RequestController.getDeclinedRequest);

/**
 * @api {get} /diagnosis Get request by diagnosis
 * @apiName GetRequestsByDiagnosis
 * @apiGroup Requests
 * 
 * @apiSuccess {Array} data Contains a list of requests with related diagnosis
 * @apiSuccess {Number} status Contains status of the response
 * 
 * @apiSuccessExample Success-Response:
 *     
 *      HTTP/1.1 200 Ok
 * 
 *      {
 *   "data": [
 *       {
 *           "status": "pending",
 *           "progress": 800,
 *           "progressPercent": 80,
 *           "rateAmount": 1,
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
 *           "__v": 0,
 *           "user": {
 *               "status": "Active",
 *               "_id": "5db5d7b30ed99405ce9a9e19",
 *               "fullName": "Melat",
 *               "email": "abebech@gmail.com",
 *               "phoneNo": "1234567",
 *               "password": "$2b$10$5oalvdOF5ltPlCcz9KKXzegEeMLT5Co9qitEhmJ7nN6msIuNl1Xwu",
 *               "role": "receiver",
 *               "createdAt": "2019-10-27T17:45:23.953Z",
 *               "modifiedAt": "2019-10-31T17:15:54.512Z",
 *               "__v": 0
 *           },
 *           "rate": true
 *       }
 *   ],
 *   "status": 200
 *   }
 * 
 * @apiError {Object} error Contains the error object sent for the request or message for invalid login.
 * @apiError {Number} status  Contains the status of the response.
 * 
 * @apiErrorExample Error-Response:
 * 
 *     HTTP/1.1 404 Not Found
 *      {
 *           "error": "No such request",
 *           "status": 404
 *      }
 *      
 * 
 * 
 * 
 **/ 
router.get('/diagnosis', AuthController.verifyToken, RequestController.getRequestsByDiagnosis);

router.put('/rate', AuthController.verifyToken, RequestController.rateRequest);

router.put('/unrate',AuthController.verifyToken, RequestController.unrateRequest);

router.put('/updateRequest/:id', AuthController.verifyToken, uploads.fields([{name: 'photo', maxCount: 1},{name: 'verificationFile', maxCount: 1}]), RequestController.editRequest);

router.put('/updateProgress/:id', AuthController.verifyToken, RequestController.updateProgress);

router.put('/updateStatus/accept/:id', AuthController.verifyToken, RequestController.acceptRequest);

router.put('/updateStatus/decline/:id', AuthController.verifyToken, RequestController.declineRequest);

router.put('/delete/:id', AuthController.verifyToken, RequestController.deleteRequest);

router.get('/search/:name', AuthController.verifyToken, RequestController.searchRequestByPatientName);

router.get('/patients', AuthController.verifyToken, RequestController.getRequestsByPatientId);


module.exports = router; 