const Rate = require('../services/RequestService');
const FundOffer = require('../models/FundOffer');

exports.getNotifications = function(returnFn){
    Rate.find({}, function(err, rates){
        if(err)
            return returnFn(err);
        else{
            FundOffer.find({}, function(err, offers){
                if(err)
                    return returnFn(err);
                else{
                    let offersAndRates = offers.concat(rates);
                    offersAndRates.sort((a,b)=>(a.createdAt > b.createdAt) ? 1 : -1); 
                    returnFn({offers: offers, rates: rates});
                }
            })
        }
    })

}