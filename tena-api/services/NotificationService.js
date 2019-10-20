const Rate = require('../models/Rate');
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
                    returnFn({offersAndRates: offersAndRates});
                }
            })
        }
    })

}