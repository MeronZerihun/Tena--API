const FundRequest = require('../models/FundRequest');
const Rate = require('../models/Rate');
const UserService = require('./UserService');


exports.createRequest = function(age, gender, cost, maritalStatus, description, photo, diagnosis, verificationFile, patientId, returnFn){
    UserService.findUserById(patientId, (result)=>{
        if(result.success){
            let request = new FundRequest({age: age, gender: gender, maritalStatus: maritalStatus, diagnosis: diagnosis, description: description, photo: photo, verificationFile: verificationFile, recoveryCost: cost, patientId: patientId});
            request.save(function(err, newRequest){
            if(err)
                return returnFn({error: err});
            returnFn(newRequest);
            });
        }
        else{
            returnFn(result);
        }
        
    })
}

exports.getRequestsByStatus = function(status, returnFn){
    FundRequest.find({status: status, progressPercent: {$lte: 100}}, function(err, results){
        if(err)
            return returnFn({error: err});
        else if(!results)
            return returnFn({error: 'No such request'});
        else{
            let requests = [];
            results.forEach((result)=>{
                let patientId = result.patientId;
                UserService.findUserById(patientId, (patient)=>{
                    if(patient.success){
                        let obj = result.toObject();
                        obj.user = patient.success;
                        Rate.find({requestId: result._id, userId: patient.success._id}, function(err, rate){
                            if(err){
                                returnFn({error: err});
                            }
                            else if(rate.length > 0){
                                obj.rate = true;
                            }
                            else{
                                obj.rate = false;
                            }
                            requests.push(obj);
                            if(results.length === requests.length){
                            returnFn(requests);
                        }
                        });
                        
                    }
                    else{
                        return patient;
                    }
                })
                
            })
        }
        
    });
}


// might be interested in suggestion
exports.getRequestsByDiagnosis = function(diagnosis, returnFn){
    FundRequest.find({diagnosis: {$regex: `${diagnosis}` , $options:'i'}}, function(err, results){
        if(err)
            return returnFn({error: err});
        else if(results.length === 0)
            return returnFn({error: 'No such request'});    
        else{
            let requests = [];
            results.forEach((result)=>{
                let patientId = result.patientId;
                UserService.findUserById(patientId, (patient)=>{
                    if(patient.success){
                        let obj = result.toObject();
                        obj.user = patient.success;
                        Rate.find({requestId: result._id, userId: patient.success._id}, function(err, rate){
                            if(err){
                                returnFn({error: err});
                            }
                            else if(rate.length > 0){
                                obj.rate = true;
                            }
                            else{
                                obj.rate = false;
                            }
                            requests.push(obj);
                            if(results.length === requests.length){
                            returnFn(requests);
                        }
                        });
                        
                    }
                })
                
            })
        }
    });
}


exports.rateRequest = function(requestId, userId, returnFn){
    UserService.findUserById(userId,(result)=>{
        if(result.success){
            FundRequest.find({_id: requestId}, function(err, resultReq){
                if(err)
                    returnFn({error: err});
                else if(resultReq.length > 0){
                    Rate.find({requestId: requestId, userId: userId}, function(err, result){
                        if(err)
                            return returnFn({error: err});
                        else if(result.length === 0){
                            FundRequest.updateOne({_id: requestId}, {rateAmount: resultReq[0].rateAmount + 1}, {new: true}, function(err){
                                if(err)
                                    return returnFn({error: err});
                                else{    
                                    let rate = new Rate({requestId: requestId, userId: userId});
                                    rate.save(function(err, result){
                                    if(err)
                                        return returnFn({error: err});
                                    returnFn({message: 'Request has been rated'});
                                    });
                                }
                            })
                        }
                        else{
                            returnFn({message: 'Request has already been rated by the user'});
                        }
                    })
                }
                else{
                    returnFn({error: 'No request found'});
                }
            })
        }
        else{
            returnFn(result);
        }
    })
    
}

exports.unrateRequest = function(requestId, userId, returnFn){
    UserService.findUserById(userId,(result)=>{
        if(result.success){
                Rate.find({requestId: requestId, userId: userId}, function(err, result){
                    if(err)
                        return returnFn({error: err});
                    else if(result.length > 0){
                        FundRequest.findById({_id: requestId}, function(err, request){
                            if(err)
                                return returnFn({error: err});
                            else{
                                FundRequest.updateOne({_id: requestId}, {rateAmount: request.rateAmount - 1}, {new: true}, function(err){
                                    if(err)
                                        returnFn({error: err});
                                    else{
                                        Rate.findOneAndDelete({requestId: requestId, userId: userId}, function(err, res){
                                            if(err)
                                                return returnFn({error: err});
                                            returnFn({message: 'Request has been unrated'});
                                        });
                                    }
                                })
                            }
                    });
                }
                else{
                    returnFn({error: 'User has not rated such a request'});
                }
            });
        }
        else{
            returnFn(result);
        }
    });
}

exports.updateProgress = function(requestId, progressAmount, returnFn){
    FundRequest.findById({_id: requestId}, function(err, result){
        if(err)
            return returnFn({error: err});
        else if(result){
            let progress = result.progress + progressAmount;
            let inPercent = (progress / result.recoveryCost) * 100;
            FundRequest.findByIdAndUpdate({_id: requestId}, {progress: progress, progressPercent: inPercent}, {new: true}, function(err, newResult){
                if(err)
                    return returnFn({error: err});
                returnFn(newResult);
            });
        }
        else{
            returnFn({error: 'No request found'});
        }    
        
    });
}

exports.updateStatus = function(requestId, status, returnFn){
    FundRequest.findByIdAndUpdate({_id: requestId}, {status: status}, {new: true}, function(err, result){
        if(err)
            return returnFn({error: err});
        else if(!result)
            return returnFn({error: 'No request found'});
        returnFn(result);
    });
}

exports.updateRequest = function(requestId, age, gender, maritalStatus, diagnosis, description, cost, photo, verificationFile, returnFn){
    FundRequest.findByIdAndUpdate({_id: requestId}, {age: age, gender: gender, maritalStatus: maritalStatus, diagnosis: diagnosis, description: description, photo: photo, verificationFile: verificationFile, recoveryCost: cost}, {new: true}, function(err, result){
        if(err)
            return returnFn({error: err});
        else if(!result)
            return returnFn({error: 'No request found'});
        returnFn(result);
    });
}

exports.deleteRequest = function(requestId, returnFn){
    FundRequest.findByIdAndDelete({_id: requestId}, function(err, result){
            if(err)
                return returnFn({error: err});
            else if(!result)
                return returnFn({error: 'No request found'});
            returnFn(result);
    });
}


// add regularExpression
exports.getRequestByPatient = function(patientName, returnFn){
    UserService.findUserByName(patientName, (results)=>{
        if(!results.error){
            let users = [];
            results.forEach(result => {
                FundRequest.find({patientId: result._id}, function(err, res){
                    if(err){
                        return returnFn({error: err});
                    }
                    else if(res){
                        users = users.concat(res);
                    }
                    if(results[results.length-1]===result){
                        if(users.length===0){
                            return returnFn({error: 'No requests found by the user'});
                        }
                        returnFn(users);
                    }
                })
            });
        }
        else{
            returnFn({error: 'No such patient'});
        }
    })
}
exports.getRequestById = function(id, returnFn){
    FundRequest.find({_id: id}, function(err, results){
        if(err)
            return returnFn({error: err});
        else if(results.length > 0)
            return returnFn({success: 'Request found'});
        returnFn({error: 'No request found'});
    })
}

