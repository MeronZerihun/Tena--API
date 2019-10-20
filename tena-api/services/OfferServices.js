const FundOffer = require('../models/FundOffer');
const BankService = require('../services/BankService');
const UserService = require('../services/UserService');
const RequestService = require('../services/RequestService');

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
                                    return returnFn(err);
                                returnFn(result);
                            })
                        }
                    })
                } 
            })
        }
    })
   
}

/*exports.getOffersAndUpdateProgress = function(requestId, returnFn){
    RequestService.getRequestById(requestId, (result)=>{
        if(!result.error){
            FundOffer.find({requestId: requestId}, function(err, results){
                if(err)
                    return returnFn(err);
                let sum = 0;
                results.forEach((offer) => {
                    sum += offer;
                });
                let progress = (sum / result.recoveryCost) * 100;
                RequestService.updateProgress(requestId, progress, (newResult) => {
                    returnFn(newResult);
                })
            })
        }
    })
}*/

exports.getOffersByProviderId = function(providerId, returnFn){
    FundOffer.find({providerId: providerId}, {sort: '-createdAt'}, function(err, results){
        if(err)
            return returnFn(err);
        returnFn(results);
    })
}