const OfferService = require('../services/OfferService');

exports.offerFund = function(req, res, next){
    OfferService.offerFund(req.body.type,req.body.amount,req.body.accountNo, req.body.requestId, req.userId, (result)=>{
        res.status(result.status).json(result);
    })
}

exports.getOffersByProvider = function(req,res,next){
    OfferService.getOffersByProviderId(req.userId,(results)=>{
        if(results.length)
            res.status(results[0].status).json(results);
        else
            res.status(results.status).json(results);
    })
}

exports.getAllOffers = function(req, res, next){
    OfferService.getAllOffers((results)=>{
        res.status(results.status).json(results);
    })
}

exports.getOffersToPatient = function(req, res, next){
    OfferService.getOffersForPatient(req.userId, (results)=>{
        if(results.length)
            res.status(results[0].status).json(results);
        else
            res.status(results.status).json(results);
    })
}