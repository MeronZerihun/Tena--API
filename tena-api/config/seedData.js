const UserService = require('../services/UserService');
const OfferService = require('../services/OfferService');
const RequestService = require('../services/RequestService');
const BankService = require('../services/BankService');
var ObjectId = require('mongoose').SchemaTypes.ObjectId;

UserService.findUsersByRole('admin',(results)=>{
    if(results.error){
        // Receiver
        UserService.insertUser("Abebe","abebe@gmail.com","1234567","abcde","receiver",(receiver)=>{
            console.log(receiver)
            // Request
            RequestService.createRequest(10, "F" , 1000, "married" , "blablabla", "2019-10-20T10:16:04.632Z-tena_logo.jpg", "Cancer","2019-10-20T10:16:04.631Z-index.js",receiver.data._id,(request)=>{
                console.log(request)
                // Provider
                UserService.insertUser("Meron","abc@gmail.com","1234567","abcde","provider",(provider)=>{
                    // Admin account
                    BankService.addBank("Express",12430,"8238968969",(result)=>{
                        // User account
                        BankService.addBank("MasterCard", 5940, "12387896456",(result)=>{
                            // Offer
                            OfferService.offerFund("MasterCard", 100, "12387896456",request.data._id,provider.data._id,(offer)=>{
                               
                                
                            });
                        });
                    });
                });
            });
        });
        
        // Admin
        UserService.insertUser("admin","tena-admin@gmail.com","1234567","abcde","admin",(result)=>{
        });
        
        // User account
        BankService.addBank("Express",5940, "82389684769",(result)=>{
        });
    }
})



