const Rate = require('../models/Rate');
const FundOffer = require('../models/FundOffer');
const UserService = require('../services/UserService');
const RequestService = require('../services/RequestService');

const EventEmitter = require('events');
class ObjEvents extends EventEmitter{}

let objEvent = new ObjEvents();

objEvent.on('addProvider', function(newOffers, offer, returnFn){
    let newOffer = offer.toObject();
    newOffer.type = 'offer';
    UserService.findUserById(offer.providerId, (user)=>{
        if(user.success){
            newOffer.provider = user.success;
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
    RequestService.getRequestById(offer.requestId, (request)=>{
        if(request.error)
            return returnFn(request);
        offer.request = request.success;
        objEvent.emit('addPatient', newOffers, offer, (results)=>{
            returnFn(results);
        })
    })
})

objEvent.on('addPatient', function(newOffers, offer, returnFn){
    UserService.findUserById(offer.request.patientId, (patient)=>{
        if(patient.error)
            return returnFn(patient);
        offer.patient = patient;
        newOffers.push(offer);
        returnFn(newOffers);
        
    })
})

objEvent.on('addUser', function(newRates, rate, returnFn){
    let rateObj = rate.toObject();
    rateObj.type = 'rate';
    UserService.findUserById(rate.userId, (user)=>{
        if(user.success){
            rateObj.user = user.success;
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
    RequestService.getRequestById(rate.requestId, (request)=>{
        if(request.error)
            return returnFn(request);
        rate.request = request.success;
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
                        returnFn(results.concat(newRates))
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
                    console.log(newRatesArr)
                    if(rates[rates.length-1]===rate){
                        addOffersToNotifications(newRatesArr, (results)=>{
                            return returnFn(results)
                        })
                    }
                })
            })
        }        
    })
}