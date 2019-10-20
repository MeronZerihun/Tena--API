const OfferService = require('../services/OfferService');

exports.offerFund = function(req, res, next){
    OfferService.offerFund(req.body.type,req.body.amount,req.body.accountNo, req.body.requestId, req.body.providerId, (result)=>{
        res.status(res.statusCode).json(result);
    })
}

exports.getOffersByProvider = function(req,res,next){
    OfferService.getOffersByProviderId(req.params.id,(results)=>{
        res.status(res.statusCode).json(results);
    })
}