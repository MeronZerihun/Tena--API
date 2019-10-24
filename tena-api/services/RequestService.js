const FundRequest = require('../models/FundRequest');
const Rate = require('../models/Rate');
const UserService = require('./UserService');


function addUserAndRateObj(results, userId, returnFn){
    let requests = [];
    results.forEach((result)=>{
        let patientId = result.patientId;
        UserService.findUserById(patientId, (patient)=>{
            if(patient.success){
                let obj = result.toObject();
                obj.user = patient.success;
                Rate.find({requestId: result._id, userId: userId}, function(err, rate){
                    if(err)
                        return returnFn({error: err, status:400});
                    else if(rate.length > 0)
                        obj.rate = true;
                    else
                        obj.rate = false;
                    requests.push(obj);
                    if(results.length === requests.length){
                        returnFn({success: requests, status: 200});
                    }
                });
            }
            else{
                    return patient;
            }
        })
    })
}

function addOnRate(request, userId, returnFn){
    Rate.find({requestId: request._id, userId: userId}, function(err, result){
        if(err)
            return returnFn({error: err, status: 400});
        else if(result.length === 0){
            FundRequest.updateOne({_id: request._id}, {rateAmount: request.rateAmount + 1}, {new: true}, function(err){
                if(err)
                    return returnFn({error: err, status: 400});
                else{    
                    let rate = new Rate({requestId: request._id, userId: userId});
                    rate.save(function(err, result){
                    if(err)
                        return returnFn({error: err, status: 400});
                    returnFn({success: 'Request has been rated', status: 200});
                    });
                }
            })
        }
        else{
            returnFn({error: 'Request has already been rated by the user', status: 400});
        }
    })
}

function subtractOnRate(requestId, userId, returnFn){
    FundRequest.findById({_id: requestId}, function(err, request){
        if(err)
            return returnFn({error: err, status: 400});
        else{
            FundRequest.updateOne({_id: requestId}, {rateAmount: request.rateAmount - 1}, {new: true}, function(err,res){
                if(err)
                    returnFn({error: err, status: 400});
                else{
                    Rate.findOneAndDelete({requestId: request._id, userId: userId}, function(err, res){
                        if(err)
                            return returnFn({error: err, status: 400});
                        returnFn({success: 'Request has been unrated', status: 200});
                    });
                }
            })
        }
    });
}

function requestsByPatient(results, loggedUserId, returnFn){
    let users = [];
            results.forEach(result => {
                FundRequest.find({patientId: result._id}, function(err, res){
                    if(err)
                        return returnFn({error: err, status: 400});
                    else if(res.length > 0){
                        addUserAndRateObj(res, loggedUserId,(newRes)=>{
                            if(newRes.error)
                                return returnFn(newRes);
                            else{
                                users = users.concat(newRes);
                                if(results[results.length-1] === result){
                                    if(users.length === 0)
                                        return returnFn({error: 'No requests found by the user', status: 200});
                                    else
                                        return returnFn(users);
                                }
                            }
                        })
                    }
                })
            });
}

exports.createRequest = function(age, gender, cost, maritalStatus, description, photo, diagnosis, verificationFile, patientId, returnFn){
    UserService.findUserById(patientId, (result)=>{
        if(result.success){
            let request = new FundRequest({age: age, gender: gender, maritalStatus: maritalStatus, diagnosis: diagnosis, description: description, photo: photo, verificationFile: verificationFile, recoveryCost: cost, patientId: patientId});
            request.save(function(err, newRequest){
            if(err)
                return returnFn({error: err, status: 400});
            returnFn({success: newRequest, status: 201});
            });
        }
        else{
            returnFn(result);
        }
        
    })
}

exports.getRequestsByStatus = function(status, loggedUserId, returnFn){
    FundRequest.find({status: status, progressPercent: {'$gte': 0 , '$lt': 100}}, function(err, results){
        if(err)
            return returnFn({error: err, status: 500});
        else if(results.length === 0)
            return returnFn({error: 'No such request', status: 404});
        else{
            addUserAndRateObj(results, loggedUserId, (results)=>{
                returnFn(results);
            });
        }
        
    });
}


// might be interested in suggestion
exports.getRequestsByDiagnosis = function(diagnosis, loggedUserId, returnFn){
    FundRequest.find({diagnosis: {$regex: new RegExp(`^${diagnosis}`, 'i') }, progressPercent: {'$gte': 0 , '$lt': 100}}, function(err, results){
        if(err)
            return returnFn({error: err, status: 500});
        else if(results.length === 0)
            return returnFn({error: 'No such request', status: 404});    
        else{
            addUserAndRateObj(results, loggedUserId, (results)=>{
                returnFn(results);
            });
        }
    });
}


exports.rateRequest = function(requestId, userId, returnFn){
    UserService.findUserById(userId,(result)=>{
        if(result.success){
            FundRequest.find({_id: requestId}, function(err, resultReq){
                if(err)
                    return returnFn({error: err, status: 400});
                else if(resultReq.length > 0){
                    addOnRate(resultReq[0],userId,(result)=>{
                        return returnFn(result);
                    })
                }
                else{
                    return returnFn({error: 'No request found', status: 404});
                }
            })
        }
        else{
            return returnFn(result);
        }
    })
    
}

exports.unrateRequest = function(requestId, userId, returnFn){
    UserService.findUserById(userId,(result)=>{
        if(result.success){
                Rate.find({requestId: requestId, userId: userId}, function(err, result){
                    if(err)
                        return returnFn({error: err, status: 400});
                    else if(result.length > 0){
                        subtractOnRate(requestId, userId,(reqResults)=>{
                            return returnFn(reqResults)
                        })
                    }
                else
                    returnFn({error: 'User has not rated such a request', status: 400});
            });
        }
        else
            returnFn(result);
    });
}

exports.updateProgress = function(requestId, progressAmount, returnFn){
    FundRequest.findById({_id: requestId}, function(err, result){
        if(err)
            return returnFn({error: err, status: 400});
        else if(result){
            let progress = result.progress + progressAmount;
            let inPercent = (progress / result.recoveryCost) * 100;
            FundRequest.findByIdAndUpdate({_id: requestId}, {progress: progress, progressPercent: inPercent}, {new: true}, function(err, newResult){
                if(err)
                    return returnFn({error: err, status: 400});
                returnFn({success: newResult, status: 204});
            });
        }
        else{
            returnFn({error: 'No request found', status: 404});
        }    
        
    });
}

exports.updateStatus = function(requestId, status, returnFn){
    FundRequest.findByIdAndUpdate({_id: requestId}, {status: status}, {new: true}, function(err, result){
        if(err)
            return returnFn({error: err, status: 400});
        else if(!result)
            return returnFn({error: 'No request found', status: 404});
        returnFn({success: result, status: 200});
    });
}

exports.updateRequest = function(requestId, age, gender, maritalStatus, diagnosis, description, cost, photo, verificationFile, returnFn){
    FundRequest.findByIdAndUpdate({_id: requestId}, {age: age, gender: gender, maritalStatus: maritalStatus, diagnosis: diagnosis, description: description, photo: photo, verificationFile: verificationFile, recoveryCost: cost}, {new: true}, function(err, result){
        if(err)
            return returnFn({error: err, status: 400});
        else if(!result)
            return returnFn({error: 'No request found', status: 404});
        returnFn({success: result, status: 204});
    });
}

exports.deleteRequest = function(requestId, returnFn){
    FundRequest.findByIdAndDelete({_id: requestId}, function(err, result){
            if(err)
                return returnFn({error: err, status: 400});
            else if(!result)
                return returnFn({error: 'No request found', status: 404});
            returnFn({success: result, status: 201});
    });
}

// for the search bar
exports.getRequestByPatient = function(patientName, loggedUserId, returnFn){
    UserService.findUserByName(patientName, (results)=>{
        if(!results.error){
            requestsByPatient(results.success, loggedUserId, (reqList)=> {
                return returnFn(reqList);
            })
        }
        else{
            returnFn({error: 'No such patient', status: 404});
        }
    })
}

// Activities
exports.getRequestById = function(id, returnFn){
    FundRequest.find({_id: id}, function(err, results){
        if(err)
            return returnFn({error: err, status: 400});
        else if(results.length > 0)
            return returnFn({success: results[0], status: 200});
        returnFn({error: 'No request found', status: 404});
    })
}

