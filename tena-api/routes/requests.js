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
//const fileUploads = multer({dest: './tena-uploads/ver-files/'}); 

var RequestController = require('../controllers/RequestController');

router.post('/new', uploads.fields([{name: 'photo', maxCount: 1},{name: 'verificationFile', maxCount: 1}]), RequestController.makeFundRequest);

router.get('/pending', RequestController.getPendingRequest);

router.get('/accepted', RequestController.getAcceptedRequest);

router.get('/declined', RequestController.getDeclinedRequest);

router.get('/diagnosis', RequestController.getRequestsByDiagnosis);

router.get('/rate',RequestController.rateRequest);

router.get('/unrate',RequestController.unrateRequest);

router.put('/updateRequest/:id', uploads.fields([{name: 'photo', maxCount: 1},{name: 'verificationFile', maxCount: 1}]), RequestController.editRequest);

router.put('/updateProgress/:id', RequestController.updateProgress);

router.put('/updateStatus/accept/:id', RequestController.acceptRequest);

router.put('/updateStatus/decline/:id', RequestController.declineRequest);

router.put('/delete/:id', RequestController.deleteRequest);

router.get('/search/:name', RequestController.searchRequestByPatientName);

module.exports = router; 