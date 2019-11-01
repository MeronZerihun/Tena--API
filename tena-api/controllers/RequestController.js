const RequestService = require('../services/RequestService');

exports.makeFundRequest = function(req, res, next){
    let uploads = req.files;
    let requestObj = req.body;
    
    RequestService.createRequest(requestObj.age, requestObj.gender, requestObj.cost, requestObj.maritalStatus, requestObj.description, uploads.photo[0].path, requestObj.diagnosis, uploads.verificationFile[0].path, req.userId, (result)=>{
        res.status(result.status).json(result);
    });
}

exports.getPendingRequest = function(req, res, next){
    RequestService.getRequestsByStatus('pending', req.userId,(result)=>{
        res.status(result.status).json(result);
    })
}

exports.getAcceptedRequest = function(req, res, next){
    RequestService.getRequestsByStatus('accepted', req.userId, (result)=>{
        res.status(result.status).json(result);
    })
}

exports.getDeclinedRequest = function(req, res, next){
    RequestService.getRequestsByStatus('declined', req.userId, (result)=>{
        res.status(result.status).json(result);
    })
}

exports.getRequestsByDiagnosis = function(req, res, next){
    RequestService.getRequestsByDiagnosis(req.body.diagnosis, req.userId, (result)=>{
        res.status(result.status).json(result);
    })
}

exports.rateRequest = function(req,res, next){
    RequestService.rateRequest(req.body.requestId, req.userId, (result)=>{
        res.status(result.status).json(result);
    })
}


exports.unrateRequest = function(req,res, next){
    RequestService.unrateRequest(req.body.requestId, req.userId, (result)=>{
        res.status(result.status).json(result);
    })
}

exports.updateProgress = function(req,res,next){
    RequestService.updateProgress(req.params.id, req.body.progressAmount, (result)=>{
        res.status(result.status).json(result);
    });
}

exports.acceptRequest = function(req, res, next){
    RequestService.updateStatus(req.params.id, 'accepted', (result)=>{
        res.status(result.status).json(result);
    })
}

exports.declineRequest = function(req, res, next){
    RequestService.updateStatus(req.params.id, 'declined', (result)=>{
        res.status(result.status).json(result);
    })
}

exports.editRequest = function(req, res, next){
    let uploads = req.files;
    
    let request = req.body;
    if(uploads){
        if(uploads.photo)
            request.photo = uploads.photo[0].path;
        
        if(uploads.verificationFile)
            request.verificationFile = uploads.verificationFile[0].path;
        
    }


    RequestService.updateRequest(req.params.id, request, (result)=>{
        res.status(result.status).json(result);
    });
}

exports.deleteRequest = function(req, res, next){
    RequestService.deleteRequest(req.params.id,(result)=>{
        res.status(result.status).json(result);
    })
}

exports.searchRequestByPatientName = function(req, res, next){
    RequestService.getRequestByPatient(req.params.name, req.userId, (result)=>{
        if(result.length)
            res.status(result[0].status).json(result);
        else
            res.status(result.status).json(result);
    })
}

exports.getRequestsByPatientId = function(req, res, next){
    RequestService.getRequestByPatientId(req.userId, (requests)=>{
        res.status(requests.status).json(requests);
        
    })
}