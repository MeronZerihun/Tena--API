const Rate = require('../models/Rate');
const FundOffer = require('../models/FundOffer');
const UserService = require('../services/UserService');
const RequestService = require('../services/RequestService');

const EventEmitter = require('events');
class ObjEvents extends EventEmitter{}

let objEvent = new ObjEvents();

objEvent.on('addProvider', function(newOffers, offer, returnFn){
    let newOffer = {};
    newOffer.data = offer.toObject();
    newOffer.type = 'offer';
    UserService.findUserById(offer.providerId, (user)=>{
        if(user.data){
            newOffer.provider = user.data;
            objEvent.emit('addRequest', newOffers, newOffer,(results)=>{
                returnFn(results);
            })
        }
        else{
            return returnFn(user);
        }
    })
})

objEvent.on('addRequest', function(newOffers, offer, returnFn){
    RequestService.getRequestById(offer.data.requestId, (request)=>{
        if(request.error || request.message)
            return returnFn(request);
        offer.request = request.data;
        objEvent.emit('addPatient', newOffers, offer, (results)=>{
            returnFn(results);
        })
    })
})

objEvent.on('addPatient', function(newOffers, offer, returnFn){
    UserService.findUserById(offer.request.patientId, (patient)=>{
        if(patient.error || patient.message)
            return returnFn(patient);
        offer.patient = patient.data;
        offer.status = 200
        newOffers.push(offer);
        returnFn(newOffers);
        
    })
})

objEvent.on('addUser', function(newRates, rate, returnFn){
    let rateObj = {};
    rateObj.data = rate.toObject();

    rateObj.type = 'rate';
    UserService.findUserById(rate.userId, (user)=>{
        if(user.data){
            rateObj.user = user.data;
            objEvent.emit('addRequestToRate', newRates, rateObj, (results)=>{
                returnFn(results);
            })
        }
        else{
            return returnFn(user);
        }
        
    })
})

objEvent.on('addRequestToRate', function(newRates, rate, returnFn){
    RequestService.getRequestById(rate.data.requestId, (request)=>{
        if(request.error || request.message)
            return returnFn(request);
        rate.request = request.data;
        rate.status = 200;
        newRates.push(rate)
        returnFn(newRates);
    })
})


function addOffersToNotifications(newRates, returnFn){
    FundOffer.find({}, function(err, offers){
        if(err)
            return returnFn({error: err, status: 500});
        else if(offers.length > 0){
            let newOffers = [];
            offers.forEach((offer)=>{
                objEvent.emit('addProvider', newOffers, offer, (results)=>{
                    if(offer === offers[offers.length - 1]){
                        if(results.error){
                            return returnFn(results);
                        }
                        returnFn(results.concat(newRates));
                    }
                })
            })
        }
    })

}



exports.getNotifications = function(returnFn){
    Rate.find({}, function(err, rates){
        let newRates = [];
        if(err)
            return returnFn({error: err, status: 500});
        else if(rates.length >0) {
            rates.forEach((rate)=>{
                objEvent.emit('addUser', newRates, rate, (newRatesArr)=>{
                    if(rates[rates.length-1]===rate){
                        addOffersToNotifications(newRatesArr, (results)=>{
                            return returnFn(results);
                        })
                    }
                })
            })
        }
        else{
            addOffersToNotifications(newRates, (results)=>{
                if(results.length){
                    results = results.sort((a,b) => 
                        (a.data.createdAt< b.data.createdAt) ? 1 : (a.data.createdAt > b.data.createdAt) ? -1 : 0);
                    return returnFn(results);
                }
                return returnFn(results);
            });
        }        
    })
}