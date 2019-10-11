const FundRequest = require('../models/FundRequest');
const Rate = require('../models/Rate');

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
exports.getRequestsByDescription = function(){

}

exports.createRequest = function(age, gender, martialStatus, description, photo, verificationFile, patientId, returnFn){
    let request = new FundRequest({age: age, gender: gender, martialStatus: martialStatus, description: description, photo: photo, verificationFile: verificationFile, patientId: patientId});
    request.save(function(err, result){
        if(err)
            return returnFn(err);
        returnFn(result);
    });
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

exports.updateRequest = function(requestId, age, gender, martialStatus, description, photo, verificationFile, returnFn){
    FundRequest.findByIdAndUpdate({_id: requestId}, {age: age, gender: gender, martialStatus: martialStatus, description: description, photo: photo, verificationFile: verificationFile}, {new: true}, function(err, result){
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