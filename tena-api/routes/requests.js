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


router.post('/new', AuthController.verifyToken, uploads.fields([{name: 'photo', maxCount: 1},{name: 'verificationFile', maxCount: 1}]), RequestController.makeFundRequest);

router.get('/pending', RequestController.getPendingRequest);

router.get('/accepted', RequestController.getAcceptedRequest);

router.get('/declined', RequestController.getDeclinedRequest);

router.get('/diagnosis', AuthController.verifyToken, RequestController.getRequestsByDiagnosis);

router.put('/rate', AuthController.verifyToken, RequestController.rateRequest);

router.put('/unrate',AuthController.verifyToken, RequestController.unrateRequest);

router.put('/updateRequest/:id', uploads.fields([{name: 'photo', maxCount: 1},{name: 'verificationFile', maxCount: 1}]), AuthController.verifyToken, RequestController.editRequest);

router.put('/updateProgress/:id', AuthController.verifyToken, RequestController.updateProgress);

router.put('/updateStatus/accept/:id', AuthController.verifyToken, RequestController.acceptRequest);

router.put('/updateStatus/decline/:id', AuthController.verifyToken, RequestController.declineRequest);

router.put('/delete/:id', AuthController.verifyToken, RequestController.deleteRequest);

router.get('/search/:name', AuthController.verifyToken, RequestController.searchRequestByPatientName);

router.get('/patients', AuthController.verifyToken, RequestController.getRequestsByPatientId);


module.exports = router; 