const FundRequest = require('../models/FundRequest');
const Rate = require('../models/Rate');
const UserService = require('../services/UserService');

exports.getRequestsByStatus = function(status, returnFn){
    FundRequest.find({status: status}, function(err, results){
        if(err)
            return returnFn(err);
        returnFn(results);
    });
}

exports.getAllRequests = function(returnFn){
    FundRequest.find({}, function(err, results){
        if(err)
            return returnFn(err);
        returnFn(results);
    });
}

// might be interested in suggestion
exports.getRequestsByDiagnosis = function(diagnosis, returnFn){
    FundRequest.find({diagnosis: diagnosis}, function(err, results){
        if(err)
            return returnFn(err);
        returnFn(results);
    });
}

exports.createRequest = function(age, gender, cost, martialStatus, description, photo, diagnosis, verificationFile, patientId, returnFn){
    UserService.findUserById(patientId, (result)=>{
        if(!result.error){
            let request = new FundRequest({age: age, gender: gender, martialStatus: martialStatus, diagnosis: diagnosis, description: description, photo: photo, verificationFile: verificationFile, recoveryCost: cost, patientId: patientId});
            request.save(function(err, result){
            if(err)
                return returnFn(err);
            returnFn(result);
    });
        }
    })
    
}

exports.rateRequest = function(requestId, userId, returnFn){
    let rate = new Rate({requestId: requestId, userId: userId});
    rate.save(function(err, result){
        if(err)
            return returnFn(err);
        else{
            FundRequest.findById(requestId, function(err, result){
                if(err)
                    return returnFn(err);
                else{
                    FundRequest.updateOne({_id: requestId}, {rateAmount: result.rateAmount + 1}, {new: true}, function(err){
                        if(err)
                            return returnFn(err);
                        returnFn({message: 'Request has been rated'});
                    });
                }
            });
        }
    });
}

exports.updateProgress = function(requestId, progressAmount, returnFn){
    FundRequest.findByIdAndUpdate({_id: requestId}, {progress: progressAmount}, {new: true}, function(err, result){
        if(err)
            return returnFn(err);
        returnFn(result);
    });
}

exports.updateStatus = function(requestId, status, returnFn){
    FundRequest.findByIdAndUpdate({_id: requestId}, {status: status}, {new: true}, function(err, result){
        if(err)
            return returnFn(err);
        returnFn(result);
    });
}

exports.updateRequest = function(requestId, age, gender, martialStatus, diagnosis, description, photo, verificationFile, returnFn){
    FundRequest.findByIdAndUpdate({_id: requestId}, {age: age, gender: gender, martialStatus: martialStatus, diagnosis: diagnosis, description: description, photo: photo, verificationFile: verificationFile}, {new: true}, function(err, result){
        if(err)
            return returnFn(err);
        returnFn(result);
    });
}

exports.deleteRequest = function(requestId, returnFn){
    FundRequest.findByIdAndDelete({_id: requestId}, function(err, result){
            if(err)
                return returnFn(err);
            returnFn(result);
    });
}

exports.getRequestByPatient = function(patientId, returnFn){
    FundRequest.find({patientId: patientId}, function(err, results){
        if(err)
            return returnFn(err);
        returnFn(results);
    })
}
exports.getRequestById = function(id, returnFn){
    FundRequest.find({_id: id}, function(err, results){
        if(err)
            return returnFn({error: err});
        returnFn({success: 'Request found'});
    })
}