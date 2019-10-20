const RequestService = require('../services/RequestService');

exports.makeFundRequest = function(req, res, next){
    let uploads = req.files;
    let requestObj = req.body;
    
    RequestService.createRequest(requestObj.age,requestObj.gender, requestObj.recoveryCost, requestObj.maritalStatus, requestObj.description, uploads.photo[0].filename, requestObj.diagnosis, uploads.verificationFile[0].filename, requestObj.patientId,(result)=>{
        res.status(res.statusCode).json(result);
    });
}

exports.getPendingRequest = function(req, res, next){
    RequestService.getRequestsByStatus('pending', (result)=>{
        res.status(res.statusCode).json(result);
    })
}

exports.getAcceptedRequest = function(req, res, next){
    RequestService.getRequestsByStatus('accepted', (result)=>{
        res.status(res.statusCode).json(result);
    })
}

exports.getDeclinedRequest = function(req, res, next){
    RequestService.getRequestsByStatus('declined', (result)=>{
        res.status(res.statusCode).json(result);
    })
}

exports.getRequestsByDiagnosis = function(req, res, next){
    RequestService.getRequestsByDiagnosis(req.body.diagnosis, (result)=>{
        res.status(res.statusCode).json(result);
    })
}

exports.rateRequest = function(req,res, next){
    RequestService.rateRequest(req.body.requestId, req.body.userId, (result)=>{
        res.status(res.statusCode).json(result);
    })
}


exports.unrateRequest = function(req,res, next){
    RequestService.unrateRequest(req.body.requestId, req.body.userId, (result)=>{
        res.status(res.statusCode).json(result);
    })
}

exports.updateProgress = function(req,res,next){
    RequestService.updateProgress(req.params.id, req.body.progressAmount, (result)=>{
        res.status(res.statusCode).json(result);
    });
}

exports.acceptRequest = function(req, res, next){
    RequestService.updateStatus(req.params.id, 'accepted', (result)=>{
        res.status(res.statusCode).json(result);
    })
}

exports.declineRequest = function(req, res, next){
    RequestService.updateStatus(req.params.id, 'declined', (result)=>{
        res.status(res.statusCode).json(result);
    })
}

exports.editRequest = function(req, res, next){
    let uploads = req.files;
    RequestService.updateRequest(req.params.id, req.body.age,req.body.gender,req.body.maritalStatus,req.body.diagnosis,req.body.description,req.body.cost,uploads.photo[0].filename,uploads.verificationFile[0].filename,(result)=>{
        res.status(res.statusCode).json(result);
    });
}

exports.deleteRequest = function(req, res, next){
    RequestService.deleteRequest(req.params.id,(result)=>{
        res.status(res.statusCode).json(result);
    })
}

exports.searchRequestByPatientName = function(req, res, next){
    RequestService.getRequestByPatient(req.params.name,(result)=>{
        res.status(res.statusCode).json(result);
    })
}

