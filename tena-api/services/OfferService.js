const FundOffer = require('../models/FundOffer');
const BankService = require('./BankService');
const UserService = require('./UserService');
const RequestService = require('./RequestService');

function debitAmountFromProvider(bankType, amount, accountNo, requestId, providerId, returnFn){
    BankService.debitAmount(bankType,amount,accountNo, (result)=>{
        if(!result.error){
            let fundOffer = new FundOffer({accountNumber: accountNo, paymentOption: bankType, fundAmount: amount, providerId: providerId, requestId: requestId});
            fundOffer.save(function(err, result){
                if(err)
                    return returnFn({error: err, status: 400});
                else{
                    RequestService.updateProgress(requestId,amount, (updateReq)=>{
                            if(updateReq.error){
                                return returnFn(updateReq);
                            }
                            returnFn(result);
                    });
                }
            })
        }else
            returnFn(result);
    })
}

exports.offerFund = function(bankType, amount, accountNo, requestId, providerId, returnFn){
    UserService.findUserById(providerId, (result)=>{
        if(!result.error){
            RequestService.getRequestById(requestId, (result)=>{
                if(!result.error){
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
         else if(results.length)   
            return returnFn({data: (results.sort((a,b)=>(a.createdAt > b.createdAt) ? 1 : -1)), status: 200});
        returnFn({error: 'No offers found', status: 404});
    })
}

exports.getAllOffers = function(returnFn){
    FundOffer.find({}, function(err, offers){
        if(err)
            return returnFn({error: err, status: 500});
        else if(offers.length>0)
            return returnFn({data: offers, status: 200});
        else
            return returnFn({error: 'No offers found', status: 404});
    })
}