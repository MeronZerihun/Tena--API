const Rate = require('../models/Rate');
const FundOffer = require('../models/FundOffer');
const UserService = require('../services/UserService');

exports.getNotifications = function(returnFn){
    Rate.find({}, function(err, rates){
        let newRates = [];
        if(err)
            return returnFn({error: err});
        else if(rates.length >0) {
            rates.forEach((rate)=>{
                let rateObj = rate.toObject();
                UserService.findUserById(rate.userId,(user)=>{
                    if(user.success){
                        rateObj.user = user.success;
                        console.log(rateObj);
                        newRates.push = rateObj;
                    }
                    else{
                        return returnFn(user);
                    }
                    
                })
            })
        }
        else{
            FundOffer.find({}, function(err, offers){
                if(err)
                    return returnFn({error: err});
                else if(offers.length > 0){
                    let newOffers = [];
                    offers.forEach((offer)=>{
                        let newOffer = offer.toObject();
                        UserService.findUserById(offer.providerId, (user)=>{
                            if(user.success){
                                newOffer.user = user.success;
                                console.log(newOffer)
                                newOffers.push(newOffer);
                                if(newRates.length === rates.length && offers.length === newOffers.length){
                                        let offersAndRates = newOffers.concat(newRates);
                                        offersAndRates.sort((a,b)=>(a.createdAt > b.createdAt) ? 1 : -1); 
                                        return returnFn(offersAndRates);
                                }
                            }
                            else{
                                return returnFn(offer);
                            }
                            
                            
                        })
                        

                    })
                    
                    
                }
            })
        }
    })

}