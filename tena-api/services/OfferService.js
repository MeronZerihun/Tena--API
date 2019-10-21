const FundOffer = require('../models/FundOffer');
const BankService = require('./BankService');
const UserService = require('./UserService');
const RequestService = require('./RequestService');

exports.offerFund = function(bankType, amount, accountNo, requestId, providerId, returnFn){
    UserService.findUserById(providerId, (result)=>{
        if(!result.error){
            RequestService.getRequestById(requestId, (result)=>{
                if(!result.error){
                    BankService.debitAmount(bankType,amount,accountNo, (result)=>{
                        if(!result.error){
                            let fundOffer = new FundOffer({accountNumber: accountNo, paymentOption: bankType, fundAmount: amount, providerId: providerId, requestId: requestId});
                            fundOffer.save(function(err, result){
                                if(err)
                                    return returnFn({error: err});
                                else{
                                    returnFn(result);
                                    RequestService.updateProgress(requestId,amount,(updateReq)=>{
                                            console.log(updateReq);
                                    });
                                }
                            })
                        }else{
                            returnFn(result);
                        }
                    })
                }
                else{
                    returnFn(result);
                } 
            })
        }else{
            returnFn(result);
        }
    })
   
}


exports.getOffersByProviderId = function(providerId, returnFn){
    FundOffer.find({providerId: providerId}, function(err, results){
        if(err)
            return returnFn({error: err});
         else if(results.length)   
            return returnFn(results.sort((a,b)=>(a.createdAt > b.createdAt) ? 1 : -1));
        returnFn({error: 'User has no offers'});
    })
}