const FundOffer = require('../models/FundOffer');
const BankService = require('./BankService');
const UserService = require('./UserService');
const RequestService = require('./RequestService');

function debitAmountFromProvider(bankType, amount, accountNo, requestId, providerId, returnFn){
    BankService.debitAmount(bankType,amount,accountNo, (result)=>{
        if(!result.error || !result.message){
            let fundOffer = new FundOffer({accountNumber: accountNo, paymentOption: bankType, fundAmount: amount, providerId: providerId, requestId: requestId});
            fundOffer.save(function(err, result){
                if(err)
                    return returnFn({error: err, status: 400});
                else{
                    RequestService.updateProgress(requestId,amount, (updateReq)=>{
                            if(updateReq.error || updateReq.message){
                                return returnFn(updateReq);
                            }
                            returnFn({data: result, status: 200});
                    });
                }
            })
        }else
            returnFn(result);
    })
}


function addPatientToOffer(patientId, offer, returnFn){
    UserService.findUserById(patientId, (user)=>{
        if(user.data){
            offer.patient = user.data;
            returnFn(offer);
        }
        else{
            returnFn(user);
        }
            
    })
}

function addProviderToOffer(providerId, offer, returnFn){
    UserService.findUserById(providerId, (user)=>{
        if(user.data){
            offer.provider = user.data;
            returnFn(offer);
        }
        else
            returnFn(user);
            
    })
}

exports.offerFund = function(bankType, amount, accountNo, requestId, providerId, returnFn){
    UserService.findUserById(providerId, (result)=>{
        if(!result.error || !result.message){
            RequestService.getRequestById(requestId, (result)=>{
                if(!result.error || !result.message){
                    debitAmountFromProvider(bankType, amount, accountNo, requestId, providerId,(debitRes)=>{
                        returnFn(debitRes);
                    })
                }
                else{
                    returnFn(result);
                } 
            })
        }else
            returnFn(result);
    })
   
}


exports.getOffersByProviderId = function(providerId, returnFn){
    FundOffer.find({providerId: providerId}, function(err, results){
        if(err)
            return returnFn({error: err, status: 400});
        else if(results.length){
             let offers = [];
             results.forEach((result)=>{
                 let offerObj = {};
                 offerObj.data = result.toObject();
                 RequestService.getRequestById(result.requestId, (request)=>{
                    if(request.data){
                        offerObj.request = request.data;
                        addPatientToOffer(request.data.patientId, offerObj, (newOffer)=>{
                            if(newOffer.patient){
                                newOffer.status = 200;
                                offers.push(newOffer);
                                if(result === results[results.length - 1])
                                    return returnFn(offers.sort((a,b) => (a.data.createdAt < b.data.createdAt) ? 1 : -1))
                            }
                            else
                                return returnFn(newOffer);
                        })
                    }
                    else
                        return returnFn(request);
                })
            })
        }   
        else
            returnFn({message: 'No offers found', status: 404});
        
    })
}

exports.getAllOffers = function(returnFn){
    FundOffer.find({}, function(err, offers){
        if(err)
            return returnFn({error: err, status: 500});
        else if(offers.length > 0)
            return returnFn({data: offers, status: 200});
        else
            return returnFn({message: 'No offers found', status: 404});
    })
}


exports.getOffersForPatient = function(patientId, returnFn){
    RequestService.getRequestByPatientId(patientId, (requests)=>{
        let newList = [];
        if(requests.data){
            let requestList = requests.data;
            requestList.forEach((request)=>{
                FundOffer.find({requestId: request._id}, function(err, result){
                    if(err)
                        return returnFn({error: err});
                    else if(result.length){
                        result.forEach((offer) => {
                            let offerObj = {};
                            offerObj.data = offer.toObject(); 
                            addProviderToOffer(offer.providerId, offerObj, (newOffer)=>{
                                if(newOffer.provider){
                                    newOffer.status = 200;
                                    newList.push(newOffer);
                                    if(offer === result[result.length - 1])
                                        returnFn(newList);
                                }
                                else
                                    return returnFn(newOffer);
                            })
                        })
                    }
                    else
                        return returnFn({message: 'No offers found for request', status: 200});
                })
            })
        }
        else
            return returnFn(requests);
    })
}